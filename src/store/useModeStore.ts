'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PortfolioMode = 'desktop' | 'scroll';

interface ModeState {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      mode: 'desktop',
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === 'desktop' ? 'scroll' : 'desktop',
        })),
    }),
    { name: 'portfolio-mode' }
  )
);
