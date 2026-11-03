import { generate, type Band } from '../equation-engine/generate';
import type { Equation } from '../equation-engine/equation';

export type Challenge = Readonly<{
  id: string;
  title: string;
  objective: string;
  band: Band;
  seed: number;
  points: number;
}>;
/** These are mechanics trials, not any of the eight authored game levels. */
export const challenges: readonly Challenge[] = [
  {
    id: 'trial-integer',
    title: 'تعادل عددهای صحیح',
    objective: 'ابتدا جملهٔ ثابت و بعد ضریب را در هر دو طرف حذف کن.',
    band: 'integer',
    seed: 0,
    points: 10,
  },
  {
    id: 'trial-signed',
    title: 'علامت‌ها را نگه دار',
    objective: 'ضریب منفی را با وارون درست از هر دو طرف حذف کن.',
    band: 'signed',
    seed: 0,
    points: 10,
  },
  {
    id: 'trial-fraction',
    title: 'سهم دقیق',
    objective: 'کسرها را بدون گردکردن حل کن و در معادلهٔ اصلی بررسی کن.',
    band: 'fraction',
    seed: 2,
    points: 10,
  },
];
export function challengeEquation(challenge: Challenge): Equation {
  return generate(challenge.seed, challenge.band);
}
/** A generic ordered-gate primitive; game levels are not populated until Phase 7. */
export function isUnlocked(
  id: string,
  order: readonly string[],
  completed: ReadonlySet<string>,
): boolean {
  const index = order.indexOf(id);
  return index >= 0 && order.slice(0, index).every((previous) => completed.has(previous));
}
export const workshopOrder = challenges.map(({ id }) => id);
