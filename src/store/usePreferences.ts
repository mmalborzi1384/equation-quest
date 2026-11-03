import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Preferences = {
  reduceMotion: boolean;
  toggleMotion: () => void;
};

export const usePreferences = create<Preferences>()(
  persist(
    (set) => ({
      reduceMotion: false,
      toggleMotion: () => set((state) => ({ reduceMotion: !state.reduceMotion })),
    }),
    {
      name: 'equation-quest-preferences',
      version: 1,
      partialize: (state) => ({ reduceMotion: state.reduceMotion }),
    },
  ),
);
