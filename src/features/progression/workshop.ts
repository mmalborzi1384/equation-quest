import { challenges, isUnlocked, workshopOrder } from '../level-manager/workshop';
import { emptyRewards, recordVerified, type RewardState } from './rewards';
/** The caller must supply a verified puzzle event; this reducer also rejects locked IDs. */
export function grantWorkshop(state: RewardState = emptyRewards, id: string): RewardState {
  const challenge = challenges.find((item) => item.id === id);
  if (!challenge || !isUnlocked(id, workshopOrder, new Set(state.completedIds))) return state;
  return recordVerified(state, id, challenge.points);
}
