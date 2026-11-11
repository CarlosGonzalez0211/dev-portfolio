'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from './content';

export type DayLog = { meals: string[]; habits: string[]; water: number };
export type WeightEntry = { date: string; kg: number };

interface LuisState {
  lang: Lang;
  days: Record<string, DayLog>;
  weights: WeightEntry[];
  goalKg: number | null;
  installDismissed: boolean;
  setLang: (lang: Lang) => void;
  toggleMeal: (date: string, id: string) => void;
  toggleHabit: (date: string, id: string) => void;
  setWater: (date: string, water: number) => void;
  addWeight: (entry: WeightEntry) => void;
  removeWeight: (date: string) => void;
  setGoal: (kg: number | null) => void;
  dismissInstall: () => void;
}

export const EMPTY_DAY: DayLog = { meals: [], habits: [], water: 0 };

const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

export const useLuisStore = create<LuisState>()(
  persist(
    (set) => ({
      lang: 'es',
      days: {},
      weights: [],
      goalKg: null,
      installDismissed: false,
      setLang: (lang) => set({ lang }),
      toggleMeal: (date, id) =>
        set((s) => {
          const day = s.days[date] ?? EMPTY_DAY;
          return { days: { ...s.days, [date]: { ...day, meals: toggle(day.meals, id) } } };
        }),
      toggleHabit: (date, id) =>
        set((s) => {
          const day = s.days[date] ?? EMPTY_DAY;
          return { days: { ...s.days, [date]: { ...day, habits: toggle(day.habits, id) } } };
        }),
      setWater: (date, water) =>
        set((s) => {
          const day = s.days[date] ?? EMPTY_DAY;
          return { days: { ...s.days, [date]: { ...day, water: Math.max(0, water) } } };
        }),
      addWeight: (entry) =>
        set((s) => ({
          weights: [...s.weights.filter((w) => w.date !== entry.date), entry].sort((a, b) =>
            a.date.localeCompare(b.date)
          ),
        })),
      removeWeight: (date) => set((s) => ({ weights: s.weights.filter((w) => w.date !== date) })),
      setGoal: (goalKg) => set({ goalKg }),
      dismissInstall: () => set({ installDismissed: true }),
    }),
    { name: 'luis-health-v1' }
  )
);

/** Local-time YYYY-MM-DD key. */
export function dateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
