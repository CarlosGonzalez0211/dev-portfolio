'use client';

import { useState } from 'react';
import { HAND, PLATE, SHOPPING, TRAFFIC, UI } from './content';
import { CheckIcon, SectionTitle, useT } from './shared';
import { useLuisStore } from './store';

function PlateDiagram() {
  // Left half = veggies, top-right quarter = protein, bottom-right quarter = carbs.
  const [veg, protein, carbs] = PLATE.parts;
  return (
    <svg viewBox="0 0 200 200" className="h-44 w-44 shrink-0" aria-hidden>
      <circle cx="100" cy="100" r="98" fill="var(--l-card-alt)" stroke="var(--l-border)" strokeWidth="2" />
      <path d="M100 14 A86 86 0 0 0 100 186 Z" fill={veg.color} />
      <path d="M100 100 L100 14 A86 86 0 0 1 186 100 Z" fill={protein.color} />
      <path d="M100 100 L186 100 A86 86 0 0 1 100 186 Z" fill={carbs.color} />
      <path d="M100 14 V186 M100 100 H186" stroke="var(--l-card)" strokeWidth="3" />
      <text x="57" y="104" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">½</text>
      <text x="136" y="68" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">¼</text>
      <text x="136" y="144" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">¼</text>
    </svg>
  );
}

export function GuideTab() {
  const t = useT();
  const lang = useLuisStore((s) => s.lang);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const lights = [
    { ...TRAFFIC.green, bg: 'bg-l-green-soft', fg: 'text-l-green', dot: 'bg-l-green' },
    { ...TRAFFIC.yellow, bg: 'bg-l-yellow-soft', fg: 'text-l-yellow', dot: 'bg-l-yellow' },
    { ...TRAFFIC.red, bg: 'bg-l-red-soft', fg: 'text-l-red', dot: 'bg-l-red' },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold md:text-3xl">{t(UI.tabs.guide)}</h1>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="l-card p-4">
          <SectionTitle>🍽️ {t(PLATE.title)}</SectionTitle>
          <p className="mb-4 text-l-muted">{t(PLATE.intro)}</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <PlateDiagram />
            <ul className="w-full space-y-3">
              {PLATE.parts.map((p) => (
                <li key={p.label.en} className="flex gap-3">
                  <span className="mt-1 h-4 w-4 shrink-0 rounded-full" style={{ background: p.color }} />
                  <span>
                    <span className="font-semibold">
                      {t(p.label)} · {p.pct}%
                    </span>
                    <span className="block text-sm leading-snug text-l-muted">{t(p.examples)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="l-card p-4">
          <SectionTitle>{t(HAND.title)}</SectionTitle>
          <ul className="grid grid-cols-2 gap-3">
            {HAND.items.map((h) => (
              <li key={h.label.en} className="rounded-xl bg-l-card-alt p-3">
                <span className="text-3xl" aria-hidden>{h.emoji}</span>
                <p className="mt-1 font-semibold">{t(h.label)}</p>
                <p className="text-sm leading-snug text-l-muted">{t(h.desc)}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <SectionTitle>🚦 {t(TRAFFIC.title)}</SectionTitle>
        <div className="grid gap-3 md:grid-cols-3">
          {lights.map((l) => (
            <div key={l.label.en} className={`rounded-[1.25rem] p-4 ${l.bg}`}>
              <h3 className={`flex items-center gap-2 font-bold ${l.fg}`}>
                <span className={`h-3.5 w-3.5 rounded-full ${l.dot}`} />
                {t(l.label)}
              </h3>
              <p className="mt-2 leading-snug">{t(l.items)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="l-card p-4">
        <SectionTitle>🛒 {t(SHOPPING.title)}</SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          {SHOPPING.groups.map((g) => (
            <div key={g.name.en}>
              <h3 className="mb-2 font-semibold text-l-primary">{t(g.name)}</h3>
              <ul className="space-y-1">
                {g.items[lang].map((item, i) => {
                  const key = `${g.name.en}-${i}`;
                  const on = !!checked[key];
                  return (
                    <li key={key}>
                      <button
                        onClick={() => setChecked((c) => ({ ...c, [key]: !on }))}
                        aria-pressed={on}
                        className="flex min-h-10 w-full items-center gap-3 text-left"
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                            on ? 'border-l-primary bg-l-primary text-l-on-primary' : 'border-l-border text-transparent'
                          }`}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </span>
                        <span className={on ? 'text-l-muted line-through' : ''}>{item}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
