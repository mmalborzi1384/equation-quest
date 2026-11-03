import { describe, expect, it } from 'vitest';
import { levels, islands } from '../../data/levels';
import { solution, substitute } from '../equation-engine/equation';
import { equals, parseRational, text } from '../equation-engine/rational';
import { isUnlocked } from './workshop';
import { islandStatus, grantLevel } from '../progression/levels';
import { emptyRewards } from '../progression/rewards';
import { stageFor, stageOrder, stages } from './stages';
import { advanceStage, startStage, type StageSession } from './stage-session';
function solve(stage: (typeof stages)[number], state: StageSession) {
  let s = state;
  for (let i = 0; i < stage.problems.length; i++) {
    const eq = stage.problems[i].equation;
    s = advanceStage(stage, s, {
      type: 'puzzle',
      event: { type: 'step', action: { operation: 'subtract', amount: eq.b, sides: 'both' } },
    }).session;
    expect(['coefficient', 'answer']).toContain(s.puzzle.phase);
    if (s.puzzle.phase === 'coefficient')
      s = advanceStage(stage, s, {
        type: 'puzzle',
        event: { type: 'step', action: { operation: 'divide', amount: eq.a, sides: 'both' } },
      }).session;
    expect(s.puzzle.phase).toBe('answer');
    s = advanceStage(stage, s, {
      type: 'puzzle',
      event: { type: 'answer', input: text(solution(eq)) },
    }).session;
    expect(s.puzzle.phase).toBe('verify');
    const verified = advanceStage(stage, s, {
      type: 'puzzle',
      event: { type: 'verify', claim: 'equal' },
    });
    expect(verified.completedNow).toBe(i === stage.problems.length - 1);
    s = verified.session;
    if (i < stage.problems.length - 1) s = advanceStage(stage, s, { type: 'next' }).session;
  }
  return s;
}
describe('eight authored levels, verified stages and one-time unlocks', () => {
  it('matches eight routes and four distinct pairs without a workshop ID', () => {
    expect(stageOrder).toEqual(levels.map((entry) => entry.id));
    expect(islands.map((island) => island.level)).toEqual(['01', '03', '05', '07']);
    expect(new Set(stages.map((stage) => stage.concept.prompt)).size).toBe(8);
    expect(stageFor('trial-fraction')).toBeUndefined();
    for (const stage of stages) {
      expect(stage.concept.choices[stage.concept.correct]).toBeDefined();
      expect(stage.problems.length).toBeGreaterThan(0);
      for (const p of stage.problems)
        expect(substitute(p.equation, solution(p.equation)).equal).toBe(true);
    }
  });
  it.each(stages)(
    'requires concept and every original-equation verification for stage $id',
    (stage) => {
      const start = startStage();
      expect(
        advanceStage(stage, start, { type: 'puzzle', event: { type: 'answer', input: '3' } })
          .session,
      ).toBe(start);
      expect(advanceStage(stage, start, { type: 'next' }).session).toBe(start);
      const wrong = (stage.concept.correct + 1) % 3;
      const rejected = advanceStage(stage, start, { type: 'concept', choice: wrong }).session;
      expect(rejected.conceptPassed).toBe(false);
      expect(rejected.conceptAttempts).toBe(1);
      const opened = advanceStage(stage, rejected, {
        type: 'concept',
        choice: stage.concept.correct,
      }).session;
      expect(opened.conceptPassed).toBe(true);
      const eq = stage.problems[0].equation;
      expect(
        advanceStage(stage, opened, {
          type: 'puzzle',
          event: { type: 'answer', input: text(solution(eq)) },
        }).session.puzzle.feedback,
      ).toBe('answer-only');
      const done = solve(stage, opened);
      expect(done.done).toBe(true);
      expect(advanceStage(stage, done, { type: 'next' }).session).toBe(done);
      expect(
        advanceStage(stage, done, { type: 'puzzle', event: { type: 'verify', claim: 'equal' } })
          .completedNow,
      ).toBe(false);
      expect(advanceStage(stage, done, { type: 'restart' }).session.done).toBe(false);
    },
  );
  it('requires fractional coefficient and answer in 06–08, plus mixed independent verification', () => {
    for (const id of ['06', '07', '08']) {
      const stage = stageFor(id)!;
      expect(stage.problems.some((p) => p.equation.a.denominator !== 1n)).toBe(true);
      expect(stage.problems.some((p) => solution(p.equation).denominator !== 1n)).toBe(true);
    }
    expect(stageFor('07')!.problems.length).toBeGreaterThanOrEqual(3);
    expect(stageFor('08')!.problems.length).toBeGreaterThanOrEqual(3);
    const fraction = stageFor('08')!.problems.at(-1)!.equation;
    expect(equals(solution(fraction), parseRational('-1/2'))).toBe(true);
  });
  it('locks out-of-order direct routes and grants one reward per verified stage only', () => {
    let rewards = emptyRewards;
    expect(grantLevel(rewards, '08')).toBe(rewards);
    expect(isUnlocked('02', stageOrder, new Set(rewards.completedIds))).toBe(false);
    expect(islandStatus('03', rewards.completedIds)).toBe('locked');
    for (const stage of stages) {
      expect(isUnlocked(stage.id, stageOrder, new Set(rewards.completedIds))).toBe(true);
      rewards = grantLevel(rewards, stage.id);
      expect(grantLevel(rewards, stage.id)).toBe(rewards);
    }
    expect(rewards.completedIds).toEqual(stageOrder);
    expect(rewards.points).toBe(stages.reduce((sum, stage) => sum + stage.points, 0));
    expect(
      islands.every((island) => islandStatus(island.level, rewards.completedIds) === 'restored'),
    ).toBe(true);
    expect(islandStatus('not-an-island', rewards.completedIds)).toBe('locked');
  });
});
