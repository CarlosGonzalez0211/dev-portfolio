'use client';

import { useState } from 'react';
import { UI } from './content';
import { dateKey, useLuisStore, type WeightEntry } from './store';
import { SectionTitle, dayScore, useToday } from './shared';

function WeightChart({ weights, goal }: { weights: WeightEntry[]; goal: number | null }) {
  const W = 320;
  const H = 150;
  const pad = 14;
  const values = weights.map((w) => w.kg).concat(goal ? [goal] : []);
  const min = Math.min(...values) - 1;
  const max = Math.max(...values) + 1;
  const x = (i: number) => (weights.length === 1 ? W / 2 : pad + (i * (W - pad * 2)) / (weights.length - 1));
  const y = (kg: number) => pad + ((max - kg) * (H - pad * 2)) / (max - min);
  const line = weights.map((w, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(w.kg)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Gráfica de peso">
      {goal && (
        <>
          <line x1={0} x2={W} y1={y(goal)} y2={y(goal)} stroke="var(--l-primary)" strokeDasharray="5 5" strokeWidth={1.5} />
          <text x={W - 4} y={y(goal) - 5} textAnchor="end" fontSize="11" fill="var(--l-primary)">
            {goal} kg
          </text>
        </>
      )}
      <path d={line} fill="none" stroke="var(--l-text)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {weights.map((w, i) => (
        <circle key={w.date} cx={x(i)} cy={y(w.kg)} r={4} fill="var(--l-card)" stroke="var(--l-text)" strokeWidth={2} />
      ))}
    </svg>
  );
}

export function ProgressTab() {
  const weights = useLuisStore((s) => s.weights);
  const goalKg = useLuisStore((s) => s.goalKg);
  const days = useLuisStore((s) => s.days);
  const addWeight = useLuisStore((s) => s.addWeight);
  const removeWeight = useLuisStore((s) => s.removeWeight);
  const setGoal = useLuisStore((s) => s.setGoal);
  const today = useToday();
  const [kg, setKg] = useState('');
  const [goalInput, setGoalInput] = useState('');

  const locale = 'es-MX';
  const fmtDate = (d: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${d}T12:00:00`).toLocaleDateString(locale, opts);

  const first = weights[0];
  const last = weights[weights.length - 1];
  const lost = first && last ? first.kg - last.kg : 0;
  const toGo = goalKg && last ? last.kg - goalKg : null;

  // Last 7 days of daily completion.
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(`${today}T12:00:00`);
    d.setDate(d.getDate() - (6 - i));
    const key = dateKey(d);
    return { key, score: dayScore(days[key]) };
  });

  // Streak: consecutive days at ≥50%, counting back from today (or yesterday if today isn't there yet).
  let streak = 0;
  const cursor = new Date(`${today}T12:00:00`);
  if (dayScore(days[today]) < 0.5) cursor.setDate(cursor.getDate() - 1);
  while (dayScore(days[dateKey(cursor)]) >= 0.5) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  const submitWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseFloat(kg.replace(',', '.'));
    if (!Number.isFinite(n) || n < 30 || n > 300) return;
    addWeight({ date: today, kg: Math.round(n * 10) / 10 });
    setKg('');
  };

  const submitGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseFloat(goalInput.replace(',', '.'));
    if (!Number.isFinite(n) || n < 30 || n > 300) return;
    setGoal(Math.round(n * 10) / 10);
    setGoalInput('');
  };

  const stat = (label: string, value: string, accent = false) => (
    <div className="rounded-xl bg-l-card-alt p-3 text-center">
      <p className="text-xs uppercase tracking-wide text-l-muted">{label}</p>
      <p className={`mt-0.5 text-xl font-bold ${accent ? 'text-l-primary' : ''}`}>{value}</p>
    </div>
  );

  const inputCls =
    'min-h-12 w-full min-w-0 flex-1 rounded-xl border-2 border-l-border bg-l-card px-3 text-lg text-l-text placeholder:text-l-muted';
  const btnCls = 'min-h-12 shrink-0 rounded-xl bg-l-primary px-5 font-semibold text-l-on-primary';

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold md:text-3xl">{UI.tabs.progress}</h1>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="l-card p-4">
          <SectionTitle>⚖️ {UI.addWeight}</SectionTitle>
          <form onSubmit={submitWeight} className="flex gap-2">
            <input
              inputMode="decimal"
              placeholder="kg"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              className={inputCls}
              aria-label={UI.weight}
            />
            <button type="submit" className={btnCls}>
              {UI.save}
            </button>
          </form>
          <p className="mt-2 text-sm text-l-muted">{UI.weightHint}</p>

          <form onSubmit={submitGoal} className="mt-4 flex gap-2">
            <input
              inputMode="decimal"
              placeholder={goalKg ? `${UI.goal}: ${goalKg} kg` : `${UI.goal} (kg)`}
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className={inputCls}
              aria-label={UI.goal}
            />
            <button type="submit" className="min-h-12 shrink-0 rounded-xl border-2 border-l-primary px-4 font-semibold text-l-primary">
              {UI.setGoal}
            </button>
          </form>
        </section>

        <section className="l-card p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-bold">{UI.last7}</h2>
            <span className="text-sm text-l-muted">
              🔥 {UI.streak}: <strong className="text-l-text">{streak}</strong> {UI.days}
            </span>
          </div>
          <div className="flex h-36 items-end gap-2">
            {week.map((d) => (
              <div key={d.key} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <div className="relative w-full flex-1 overflow-hidden rounded-lg bg-l-card-alt">
                  <div
                    className="absolute inset-x-0 bottom-0 rounded-lg bg-l-primary transition-all"
                    style={{ height: `${Math.round(d.score * 100)}%` }}
                  />
                </div>
                <span className={`text-xs capitalize ${d.key === today ? 'font-bold text-l-text' : 'text-l-muted'}`}>
                  {fmtDate(d.key, { weekday: 'narrow' })}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="l-card p-4">
        <SectionTitle>{UI.weight}</SectionTitle>
        {weights.length === 0 ? (
          <p className="text-l-muted">{UI.noWeights}</p>
        ) : (
          <>
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {stat(UI.start, `${first.kg} kg`)}
              {stat(UI.current, `${last.kg} kg`)}
              {stat(UI.lost, `${lost > 0 ? '-' : ''}${Math.abs(lost).toFixed(1)} kg`, lost > 0)}
              {stat(UI.toGo, toGo !== null ? `${Math.max(0, toGo).toFixed(1)} kg` : '—')}
            </div>
            <WeightChart weights={weights} goal={goalKg} />
            <h3 className="mb-2 mt-4 font-semibold">{UI.history}</h3>
            <ul className="divide-y divide-l-border">
              {[...weights].reverse().map((w) => (
                <li key={w.date} className="flex min-h-11 items-center justify-between gap-2">
                  <span className="text-l-muted first-letter:uppercase">{fmtDate(w.date, { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                  <span className="flex items-center gap-3">
                    <strong>{w.kg} kg</strong>
                    <button onClick={() => removeWeight(w.date)} className="min-h-10 px-2 text-sm text-l-red">
                      {UI.remove}
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
