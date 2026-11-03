import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  emptyLevelRecord,
  recordStage,
  safeLevelRecord,
  type LevelRecord,
} from '../features/progression/saved';
import type { Rational } from '../features/equation-engine/rational';
export const LEVEL_KEY = 'equation-quest-level-progress';
type LevelProgress = {
  record: LevelRecord;
  grantVerifiedStage: (id: string, attempts: number, answer: Rational) => void;
  reset: () => void;
};
/** Save only validated, verified stage facts; rebuild rewards/derived values on load. */
export const useLevelProgress = create<LevelProgress>()(
  persist(
    (set) => ({
      record: emptyLevelRecord(),
      grantVerifiedStage: (id, attempts, answer) =>
        set((state) => ({ record: recordStage(state.record, id, attempts, answer) })),
      reset: () => {
        set({ record: emptyLevelRecord() });
        useLevelProgress.persist.clearStorage();
      },
    }),
    {
      name: LEVEL_KEY,
      version: 1,
      partialize: (state) => ({ record: state.record }),
      migrate: (saved) => ({
        record: safeLevelRecord((saved as { record?: unknown })?.record ?? saved),
      }),
      merge: (saved, current) => ({
        ...current,
        record: safeLevelRecord((saved as { record?: unknown })?.record),
      }),
      onRehydrateStorage: () => (_state, error) => {
        if (error && typeof localStorage !== 'undefined') localStorage.removeItem(LEVEL_KEY);
      },
    },
  ),
);
