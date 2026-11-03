import { stages, stageOrder } from '../level-manager/stages';
import { challenges, workshopOrder } from '../level-manager/workshop';
import { deserialize, serialize, type Rational } from '../equation-engine/rational';
import { fromStrings, solution } from '../equation-engine/equation';
import { generate } from '../equation-engine/generate';
import { lessons } from '../../data/lessons';
import { emptyRewards, type RewardState } from './rewards';

export type SerializedAnswer = { numerator: string; denominator: string };
export type LevelRecord = {
  rewards: RewardState;
  lastLevelId: string | null;
  bestAttempts: Record<string, number>;
  verifiedAnswers: Record<string, SerializedAnswer>;
};
export const emptyLevelRecord = (): LevelRecord => ({
  rewards: emptyRewards,
  lastLevelId: null,
  bestAttempts: {},
  verifiedAnswers: {},
});
export type PracticeRecord = { verifiedCount: number; lastAnswer: SerializedAnswer | null };
export const emptyPracticeRecord = (): PracticeRecord => ({ verifiedCount: 0, lastAnswer: null });
const object = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
function prefix(value: unknown, order: readonly string[]) {
  const ids = Array.isArray(value) ? value : [];
  const result: string[] = [];
  for (const id of order) {
    if (ids[result.length] !== id) break;
    result.push(id);
  }
  return result;
}
/** Never trust saved points/IDs: recalculate from contiguous verified achievements. */
export function safeRewards(
  value: unknown,
  order: readonly string[],
  points: readonly number[],
): RewardState {
  const saved = object(value);
  const completedIds = prefix(saved.completedIds, order);
  return {
    completedIds,
    earnedIds: [...completedIds],
    points: completedIds.reduce((sum, _, i) => sum + points[i], 0),
  };
}
export function safeLevelRecord(value: unknown): LevelRecord {
  const saved = object(value);
  const claimed = safeRewards(
    saved.rewards,
    stageOrder,
    stages.map((s) => s.points),
  );
  const attempts = object(saved.bestAttempts);
  const answers = object(saved.verifiedAnswers);
  const completedIds: string[] = [];
  const bestAttempts: Record<string, number> = {};
  const verifiedAnswers: Record<string, SerializedAnswer> = {};
  for (const id of claimed.completedIds) {
    try {
      const answer = deserialize(object(answers[id]) as { numerator: string; denominator: string });
      const expected = solution(stages[stageOrder.indexOf(id)].problems.at(-1)!.equation);
      if (answer.numerator !== expected.numerator || answer.denominator !== expected.denominator)
        break;
      verifiedAnswers[id] = serialize(answer);
      completedIds.push(id);
      const count = attempts[id];
      if (Number.isSafeInteger(count) && (count as number) >= 0 && (count as number) <= 10000)
        bestAttempts[id] = count as number;
    } catch {
      // A missing or malformed verified answer cannot unlock this or later stages.
      break;
    }
  }
  const rewards = safeRewards(
    { completedIds },
    stageOrder,
    stages.map((s) => s.points),
  );
  const lastLevelId =
    typeof saved.lastLevelId === 'string' && completedIds.includes(saved.lastLevelId)
      ? saved.lastLevelId
      : null;
  return { rewards, lastLevelId, bestAttempts, verifiedAnswers };
}
export function safeWorkshopRewards(value: unknown): RewardState {
  return safeRewards(
    value,
    workshopOrder,
    challenges.map((c) => c.points),
  );
}
function practiceAnswer(index: number): Rational {
  const authored = lessons.fractions.exercise;
  return solution(
    index < authored.length
      ? fromStrings(...authored[index])
      : generate(index - authored.length, 'fraction'),
  );
}
export function safePracticeRecord(value: unknown): PracticeRecord {
  const saved = object(value);
  const verifiedCount = saved.verifiedCount;
  if (
    !Number.isSafeInteger(verifiedCount) ||
    (verifiedCount as number) < 0 ||
    (verifiedCount as number) > 10000
  )
    return emptyPracticeRecord();
  if (verifiedCount === 0) return emptyPracticeRecord();
  try {
    const answer = deserialize(
      object(saved.lastAnswer) as { numerator: string; denominator: string },
    );
    const expected = practiceAnswer((verifiedCount as number) - 1);
    if (answer.numerator !== expected.numerator || answer.denominator !== expected.denominator)
      return emptyPracticeRecord();
    return { verifiedCount: verifiedCount as number, lastAnswer: serialize(answer) };
  } catch {
    return emptyPracticeRecord();
  }
}
export function recordStage(
  record: LevelRecord,
  id: string,
  attempts: number,
  answer: Rational,
): LevelRecord {
  const stage = stages.find((s) => s.id === id);
  if (!stage || !Number.isSafeInteger(attempts) || attempts < 0 || attempts > 10000) return record;
  const expected = solution(stage.problems.at(-1)!.equation);
  if (answer.numerator !== expected.numerator || answer.denominator !== expected.denominator)
    return record;
  const index = stageOrder.indexOf(id);
  if (
    stageOrder.slice(0, index).some((previous) => !record.rewards.completedIds.includes(previous))
  )
    return record;
  const already = record.rewards.completedIds.includes(id);
  const rewards = already
    ? record.rewards
    : {
        completedIds: [...record.rewards.completedIds, id],
        earnedIds: [...record.rewards.earnedIds, id],
        points: record.rewards.points + stage.points,
      };
  const best = record.bestAttempts[id];
  return {
    rewards,
    lastLevelId: id,
    bestAttempts: {
      ...record.bestAttempts,
      [id]: best === undefined ? attempts : Math.min(best, attempts),
    },
    verifiedAnswers: { ...record.verifiedAnswers, [id]: serialize(answer) },
  };
}
export function recordPractice(
  record: PracticeRecord,
  index: number,
  answer: Rational,
): PracticeRecord {
  if (index !== record.verifiedCount || index < 0 || index >= 10000) return record;
  const expected = practiceAnswer(index);
  if (answer.numerator !== expected.numerator || answer.denominator !== expected.denominator)
    return record;
  return { verifiedCount: index + 1, lastAnswer: serialize(answer) };
}
