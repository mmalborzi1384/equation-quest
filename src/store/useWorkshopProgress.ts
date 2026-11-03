import { create } from 'zustand';
import { emptyRewards, type RewardState } from '../features/progression/rewards';
import { grantWorkshop } from '../features/progression/workshop';
/** Deliberately ephemeral until the separately authorized persisted-progress phase. */
type WorkshopProgress = { rewards: RewardState; grantVerified: (id: string) => void };
export const useWorkshopProgress = create<WorkshopProgress>((set) => ({
  rewards: emptyRewards,
  grantVerified: (id) => set((state) => ({ rewards: grantWorkshop(state.rewards, id) })),
}));
