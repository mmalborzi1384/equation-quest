import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const PREFERENCES_KEY = 'equation-quest-preferences';
type Preferences = { reduceMotion: boolean; toggleMotion: () => void; reset: () => void };
export const usePreferences = create<Preferences>()(
  persist(
    (set) => ({
      reduceMotion: false,
      toggleMotion: () => set((state) => ({ reduceMotion: !state.reduceMotion })),
      reset: () => {
        set({ reduceMotion: false });
        usePreferences.persist.clearStorage();
      },
    }),
    {
      name: PREFERENCES_KEY,
      version: 1,
      partialize: (state) => ({ reduceMotion: state.reduceMotion }),
      migrate: (saved) => ({
        reduceMotion: (saved as { reduceMotion?: unknown })?.reduceMotion === true,
      }),
      merge: (saved, current) => ({
        ...current,
        reduceMotion: (saved as { reduceMotion?: unknown })?.reduceMotion === true,
      }),
      onRehydrateStorage: () => (_state, error) => {
        if (error && typeof localStorage !== 'undefined') localStorage.removeItem(PREFERENCES_KEY);
      },
    },
  ),
);
