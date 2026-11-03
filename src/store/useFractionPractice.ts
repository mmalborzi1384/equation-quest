import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Rational } from '../features/equation-engine/rational';
import {
  emptyPracticeRecord,
  recordPractice,
  safePracticeRecord,
  type PracticeRecord,
} from '../features/progression/saved';
export const PRACTICE_KEY = 'equation-quest-fraction-practice';
type FractionPractice = {
  record: PracticeRecord;
  markVerified: (index: number, answer: Rational) => void;
  reset: () => void;
};
export const useFractionPractice = create<FractionPractice>()(
  persist(
    (set) => ({
      record: emptyPracticeRecord(),
      markVerified: (index, answer) =>
        set((state) => ({ record: recordPractice(state.record, index, answer) })),
      reset: () => {
        set({ record: emptyPracticeRecord() });
        useFractionPractice.persist.clearStorage();
      },
    }),
    {
      name: PRACTICE_KEY,
      version: 1,
      partialize: (state) => ({ record: state.record }),
      migrate: (saved) => ({
        record: safePracticeRecord((saved as { record?: unknown })?.record ?? saved),
      }),
      merge: (saved, current) => ({
        ...current,
        record: safePracticeRecord((saved as { record?: unknown })?.record),
      }),
      onRehydrateStorage: () => (_state, error) => {
        if (error && typeof localStorage !== 'undefined') localStorage.removeItem(PRACTICE_KEY);
      },
    },
  ),
);
