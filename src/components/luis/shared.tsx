'use client';

import { useCallback, useEffect, useState } from 'react';
import { HABITS, MEALS, PROFILE, type L } from './content';
import { dateKey, useLuisStore, type DayLog } from './store';

export function useT() {
  const lang = useLuisStore((s) => s.lang);
  return useCallback((l: L) => l[lang], [lang]);
}

/** Today's date key; refreshes when the app is reopened or the day rolls over. */
export function useToday() {
  const [today, setToday] = useState(() => dateKey());
  useEffect(() => {
    const refresh = () => setToday(dateKey());
    const id = window.setInterval(refresh, 60_000);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  return today;
}

/** 0–1 completion for a day: meals + habits + hitting the water goal. */
export function dayScore(day: DayLog | undefined): number {
  if (!day) return 0;
  const total = MEALS.length + HABITS.length + 1;
  const done =
    day.meals.filter((id) => MEALS.some((m) => m.id === id)).length +
    day.habits.filter((id) => HABITS.some((h) => h.id === id)).length +
    (day.water >= PROFILE.waterGoal ? 1 : 0);
  return done / total;
}

export function ProgressRing({ value, size = 88 }: { value: number; size?: number }) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--l-primary-soft)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--l-primary)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 400ms ease' }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="var(--l-text)"
        fontSize={size * 0.24}
        fontWeight={700}
      >
        {Math.round(value * 100)}%
      </text>
    </svg>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 text-lg font-bold text-l-text">{children}</h2>;
}

export function CheckIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const TabIcons = {
  today: (c: string) => (
    <svg className={c} {...iconProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  out: (c: string) => (
    <svg className={c} {...iconProps}>
      <path d="M7 2v8a2 2 0 002 2h0a2 2 0 002-2V2M9 12v10M17 2c-1.7 0-3 2-3 5s1.3 4 3 4v11" />
    </svg>
  ),
  guide: (c: string) => (
    <svg className={c} {...iconProps}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14zM4 19.5A2.5 2.5 0 006.5 22H20v-5" />
    </svg>
  ),
  progress: (c: string) => (
    <svg className={c} {...iconProps}>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </svg>
  ),
};
