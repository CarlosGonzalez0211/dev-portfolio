'use client';

import { useState } from 'react';
import { CRAVINGS, HABITS, MEALS, PROFILE, TIPS, UI } from './content';
import { EMPTY_DAY, useLuisStore } from './store';
import { CheckIcon, ProgressRing, SectionTitle, dayScore, useToday } from './shared';
import { InstallCard } from './InstallCard';

function minutesOf(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function TodayTab() {
  const today = useToday();
  const day = useLuisStore((s) => s.days[today]) ?? EMPTY_DAY;
  const toggleMeal = useLuisStore((s) => s.toggleMeal);
  const toggleHabit = useLuisStore((s) => s.toggleHabit);
  const setWater = useLuisStore((s) => s.setWater);
  const [openMeal, setOpenMeal] = useState<string | null>(null);
  const [craving, setCraving] = useState(false);

  const now = new Date();
  const hour = now.getHours();
  const nowMin = hour * 60 + now.getMinutes();
  const greeting = hour < 12 ? UI.greeting.morning : hour < 19 ? UI.greeting.afternoon : UI.greeting.evening;
  const dateLabel = now.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  // Next meal = first pending meal whose time hasn't passed by more than 90 min.
  const pending = MEALS.filter((m) => !day.meals.includes(m.id));
  const nextMeal = pending.find((m) => minutesOf(m.time) + 90 >= nowMin) ?? pending[0];

  const startOfYear = new Date(now.getFullYear(), 0, 0).getTime();
  const tip = TIPS[Math.floor((now.getTime() - startOfYear) / 86_400_000) % TIPS.length];

  const score = dayScore(day);

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-l-muted first-letter:uppercase">{dateLabel}</p>
          <h1 className="text-2xl font-bold leading-tight md:text-3xl">
            {greeting}, {PROFILE.name}
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <ProgressRing value={score} size={76} />
          <span className="mt-1 text-xs text-l-muted">{UI.todayProgress}</span>
        </div>
      </header>

      <InstallCard />

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {nextMeal && (
            <section className="rounded-[1.25rem] bg-l-primary p-5 text-l-on-primary shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide opacity-80">
                {UI.next} · {nextMeal.time}
              </p>
              <h2 className="mt-1 text-2xl font-bold">{nextMeal.name}</h2>
              <ul className="mt-3 space-y-1.5">
                {nextMeal.ideas.slice(0, 2).map((idea, i) => (
                  <li key={i} className="flex gap-2 text-[0.95rem] leading-snug">
                    <span aria-hidden>•</span>
                    {idea}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => toggleMeal(today, nextMeal.id)}
                className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-l-on-primary font-semibold text-l-primary"
              >
                <CheckIcon /> {UI.markDone}
              </button>
            </section>
          )}

          <section>
            <SectionTitle>{UI.meals}</SectionTitle>
            <ul className="l-card divide-y divide-l-border overflow-hidden">
              {MEALS.map((meal) => {
                const done = day.meals.includes(meal.id);
                const open = openMeal === meal.id;
                return (
                  <li key={meal.id}>
                    <div className="flex items-center gap-3 p-3 pl-4">
                      <button
                        onClick={() => toggleMeal(today, meal.id)}
                        aria-pressed={done}
                        aria-label={`${meal.name} ${meal.time}`}
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          done ? 'border-l-primary bg-l-primary text-l-on-primary' : 'border-l-border text-transparent'
                        }`}
                      >
                        <CheckIcon />
                      </button>
                      <button
                        onClick={() => setOpenMeal(open ? null : meal.id)}
                        aria-expanded={open}
                        className="flex min-h-11 flex-1 items-center justify-between gap-2 text-left"
                      >
                        <span>
                          <span className={`block font-semibold ${done ? 'text-l-muted line-through' : ''}`}>
                            {meal.name}
                          </span>
                          <span className="text-sm text-l-muted">{meal.time}</span>
                        </span>
                        <span className="flex items-center gap-1 text-sm font-medium text-l-primary">
                          {UI.ideas}
                          <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                    </div>
                    {open && (
                      <ul className="space-y-2 bg-l-card-alt px-4 py-3">
                        {meal.ideas.map((idea, i) => (
                          <li key={i} className="flex gap-2 text-[0.95rem] leading-snug">
                            <span className="text-l-primary" aria-hidden>•</span>
                            {idea}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="space-y-5">
          <section className="l-card p-4">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-lg font-bold">💧 {UI.water}</h2>
              <span className="text-sm text-l-muted">
                <strong className="text-l-water">{day.water}</strong> / {PROFILE.waterGoal} {UI.glasses}
              </span>
            </div>
            <div className="grid grid-cols-8 gap-1.5">
              {Array.from({ length: PROFILE.waterGoal }, (_, i) => {
                const filled = i < day.water;
                return (
                  <button
                    key={i}
                    onClick={() => setWater(today, filled && day.water === i + 1 ? i : i + 1)}
                    aria-label={`${i + 1} ${UI.glasses}`}
                    className={`flex aspect-[3/4] items-end justify-center rounded-lg border-2 transition-colors ${
                      filled ? 'border-l-water bg-l-water' : 'border-l-water/40 bg-l-water-soft'
                    }`}
                  />
                );
              })}
            </div>
          </section>

          <section className="l-card p-4">
            <h2 className="mb-3 text-lg font-bold">{UI.habits}</h2>
            <ul className="space-y-2">
              {HABITS.map((h) => {
                const done = day.habits.includes(h.id);
                return (
                  <li key={h.id}>
                    <button
                      onClick={() => toggleHabit(today, h.id)}
                      aria-pressed={done}
                      className={`flex min-h-12 w-full items-center gap-3 rounded-xl border-2 px-3 text-left transition-colors ${
                        done ? 'border-l-primary bg-l-primary-soft' : 'border-l-border'
                      }`}
                    >
                      <span className="text-xl" aria-hidden>{h.emoji}</span>
                      <span className="flex-1 font-medium">{h.label}</span>
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full ${
                          done ? 'bg-l-primary text-l-on-primary' : 'border-2 border-l-border text-transparent'
                        }`}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <button
            onClick={() => setCraving(true)}
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-[1.25rem] border-2 border-dashed border-l-primary bg-l-primary-soft px-4 font-semibold text-l-primary"
          >
            🍎 {UI.craving}
          </button>

          <section className="rounded-[1.25rem] bg-l-yellow-soft p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-l-yellow">💡 {UI.tipOfDay}</p>
            <p className="mt-1 leading-snug">{tip}</p>
          </section>
        </div>
      </div>

      {craving && <CravingSheet onClose={() => setCraving(false)} />}
    </div>
  );
}

function CravingSheet({ onClose }: { onClose: () => void }) {
  const groups: [string, string[]][] = [
    [UI.cravingSweet, CRAVINGS.sweet],
    [UI.cravingSalty, CRAVINGS.salty],
    [UI.cravingFilling, CRAVINGS.filling],
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center" onClick={onClose} role="dialog" aria-modal aria-label={UI.cravingTitle}>
      <div
        className="l-sheet pb-safe max-h-[88dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-l-card md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-l-border md:hidden" />
          <h2 className="text-xl font-bold">{UI.cravingTitle}</h2>
          <ol className="mt-3 space-y-2">
            {UI.cravingSteps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-l-primary text-sm font-bold text-l-on-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-snug">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 space-y-4">
            {groups.map(([title, items]) => (
              <div key={title}>
                <h3 className="mb-2 font-semibold text-l-primary">{title}</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {items.map((item, i) => (
                    <li key={i} className="rounded-xl bg-l-card-alt px-3 py-2.5 text-[0.95rem] leading-snug">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={onClose} className="mt-6 min-h-12 w-full rounded-xl bg-l-primary font-semibold text-l-on-primary">
            {UI.close}
          </button>
        </div>
      </div>
    </div>
  );
}
