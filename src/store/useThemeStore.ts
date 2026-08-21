'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode } from '@/theme/colors';
import { useTimeStore } from './useTimeStore';

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'night',
      // Flips the day/night half of the time cycle; ThemeProvider eases the
      // CSS variables toward the new palette and syncs `mode` back here.
      toggleTheme: () => {
        const time = useTimeStore.getState();
        time.setIsDay(!time.isDay);
      },
      setTheme: (mode) => set({ mode }),
    }),
    { name: 'portfolio-theme' }
  )
);
