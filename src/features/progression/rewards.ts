export type RewardState = Readonly<{
  completedIds: readonly string[];
  earnedIds: readonly string[];
  points: number;
}>;
export const emptyRewards: RewardState = { completedIds: [], earnedIds: [], points: 0 };
/** Only a verified completion event can call this reducer; repeats are idempotent. */
export function recordVerified(state: RewardState, id: string, points: number): RewardState {
  if (!id || !Number.isSafeInteger(points) || points < 0) throw new RangeError('invalid reward');
  if (state.earnedIds.includes(id)) return state;
  return {
    completedIds: [...state.completedIds, id],
    earnedIds: [...state.earnedIds, id],
    points: state.points + points,
  };
}
