import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { emptyRewards, type RewardState } from '../features/progression/rewards';
import { safeWorkshopRewards } from '../features/progression/saved';
import { grantWorkshop } from '../features/progression/workshop';
export const WORKSHOP_KEY = 'equation-quest-workshop-progress';
type WorkshopProgress = {
  rewards: RewardState;
  grantVerified: (id: string) => void;
  reset: () => void;
};
export const useWorkshopProgress = create<WorkshopProgress>()(
  persist(
    (set) => ({
      rewards: emptyRewards,
      grantVerified: (id) => set((state) => ({ rewards: grantWorkshop(state.rewards, id) })),
      reset: () => {
        set({ rewards: emptyRewards });
        useWorkshopProgress.persist.clearStorage();
      },
    }),
    {
      name: WORKSHOP_KEY,
      version: 1,
      partialize: (state) => ({ rewards: state.rewards }),
      migrate: (saved) => ({
        rewards: safeWorkshopRewards((saved as { rewards?: unknown })?.rewards ?? saved),
      }),
      merge: (saved, current) => ({
        ...current,
        rewards: safeWorkshopRewards((saved as { rewards?: unknown })?.rewards),
      }),
      onRehydrateStorage: () => (_state, error) => {
        if (error && typeof localStorage !== 'undefined') localStorage.removeItem(WORKSHOP_KEY);
      },
    },
  ),
);
