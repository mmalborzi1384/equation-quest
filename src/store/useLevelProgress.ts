import { create } from 'zustand';
import { emptyRewards, type RewardState } from '../features/progression/rewards';
import { grantLevel } from '../features/progression/levels';
/** Separate from the mechanics trial store. No persisted level save until Phase 8. */
type LevelProgress = { rewards: RewardState; grantVerifiedStage: (id: string) => void };
export const useLevelProgress = create<LevelProgress>((set) => ({
  rewards: emptyRewards,
  grantVerifiedStage: (id) => set((state) => ({ rewards: grantLevel(state.rewards, id) })),
}));
