'use client';

import { useState } from 'react';
import { GOLDEN_RULES, PLACES, UI } from './content';
import { SectionTitle } from './shared';

export function EatingOutTab() {
  const [placeId, setPlaceId] = useState<string | null>(null);
  const place = PLACES.find((p) => p.id === placeId);

  if (place) {
    const sections: [string, string[], string, string, string][] = [
      [UI.best, place.best, 'bg-l-green-soft', 'text-l-green', '✓'],
      [UI.ok, place.ok, 'bg-l-yellow-soft', 'text-l-yellow', '~'],
      [UI.avoid, place.avoid, 'bg-l-red-soft', 'text-l-red', '✕'],
    ];
    return (
      <div className="space-y-4">
        <button
          onClick={() => setPlaceId(null)}
          className="flex min-h-11 items-center gap-1 font-semibold text-l-primary"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {UI.back}
        </button>
        <h1 className="flex items-center gap-3 text-2xl font-bold md:text-3xl">
          <span className="text-4xl" aria-hidden>{place.emoji}</span>
          {place.name}
        </h1>
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map(([title, items, bg, fg, mark]) => (
            <section key={title} className={`rounded-[1.25rem] p-4 ${bg}`}>
              <h2 className={`mb-2 text-lg font-bold ${fg}`}>{title}</h2>
              <ul className="space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="flex gap-2 leading-snug">
                    <span className={`font-bold ${fg}`} aria-hidden>{mark}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <section className="l-card p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-l-primary">💡 {UI.trick}</p>
          <p className="mt-1 leading-snug">{place.trick}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold md:text-3xl">{UI.tabs.out}</h1>
        <p className="mt-1 text-l-muted">{UI.outIntro}</p>
      </header>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {PLACES.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => {
                setPlaceId(p.id);
                window.scrollTo({ top: 0 });
              }}
              className="l-card flex h-full min-h-28 w-full flex-col items-center justify-center gap-2 p-3 text-center transition-transform active:scale-95"
            >
              <span className="text-4xl" aria-hidden>{p.emoji}</span>
              <span className="font-semibold leading-tight">{p.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <section className="l-card p-4">
        <SectionTitle>⭐ {UI.goldenRules}</SectionTitle>
        <ol className="space-y-2.5">
          {GOLDEN_RULES.map((r, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-l-primary-soft text-sm font-bold text-l-primary">
                {i + 1}
              </span>
              <span className="pt-0.5 leading-snug">{r}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
