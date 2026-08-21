'use client';

import { create } from 'zustand';

export interface TimeState {
  /** 0.0 (left horizon) → 1.0 (right horizon). Wraps and flips isDay when crossing 1.0. */
  progress: number;
  /** Whether the current half-cycle is daytime (sun) or nighttime (moon). */
  isDay: boolean;
  isDragging: boolean;
  setProgress: (p: number) => void;
  setDragging: (dragging: boolean) => void;
  setIsDay: (isDay: boolean) => void;
}

export const useTimeStore = create<TimeState>((set) => ({
  progress: 0.3,
  isDay: false,
  isDragging: false,

  setProgress: (p) =>
    set((state) => {
      let progress = p;
      let isDay = state.isDay;
      while (progress >= 1) {
        progress -= 1;
        isDay = !isDay;
      }
      while (progress < 0) {
        progress += 1;
        isDay = !isDay;
      }
      return { progress, isDay };
    }),

  setDragging: (isDragging) => set({ isDragging }),
  setIsDay: (isDay) => set({ isDay }),
}));

export function getPeriodLabel(progress: number, isDay: boolean): string {
  if (progress < 0.12) return isDay ? 'Dawn' : 'Dusk';
  if (progress < 0.38) return isDay ? 'Morning' : 'Evening';
  if (progress < 0.62) return isDay ? 'Noon' : 'Midnight';
  if (progress < 0.88) return isDay ? 'Afternoon' : 'Late Night';
  return isDay ? 'Dusk' : 'Dawn';
}
