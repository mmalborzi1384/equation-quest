import { isUnlocked } from '../level-manager/workshop';
import { stageFor, stageOrder } from '../level-manager/stages';
import { recordVerified, type RewardState } from './rewards';
/** This reducer accepts only the verified final-stage event from advanceStage's caller. */
export function grantLevel(state: RewardState, id: string): RewardState {
  const stage = stageFor(id);
  if (!stage || !isUnlocked(id, stageOrder, new Set(state.completedIds))) return state;
  return recordVerified(state, id, stage.points);
}
export function islandStatus(firstId: string, completed: readonly string[]) {
  const index = stageOrder.indexOf(firstId);
  if (index < 0 || index % 2 !== 0) return 'locked' as const;
  const done = new Set(completed);
  if (done.has(stageOrder[index]) && done.has(stageOrder[index + 1])) return 'restored' as const;
  return isUnlocked(firstId, stageOrder, done) ? ('open' as const) : ('locked' as const);
}
