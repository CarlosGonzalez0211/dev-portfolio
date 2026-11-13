'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { UI } from './content';
import { TabIcons } from './shared';
import { TodayTab } from './TodayTab';
import { EatingOutTab } from './EatingOutTab';
import { GuideTab } from './GuideTab';
import { ProgressTab } from './ProgressTab';

type Tab = keyof typeof UI.tabs;
const TABS: Tab[] = ['today', 'out', 'guide', 'progress'];

const noopSubscribe = () => () => {};

function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') return;
  navigator.serviceWorker
    .register('/luis/sw.js', { scope: '/luis/' })
    .then(async (reg) => {
      await navigator.serviceWorker.ready;
      // The first visit loads JS/CSS before the worker exists; hand those URLs
      // over so the app also opens offline right after installing.
      const urls = performance
        .getEntriesByType('resource')
        .map((e) => e.name)
        .filter((u) => u.startsWith(location.origin));
      reg.active?.postMessage({ type: 'CACHE_URLS', urls: [location.href, ...urls] });
    })
    .catch(() => {});
}

export function LuisApp() {
  // Local data lives in localStorage, so render only on the client.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [tab, setTab] = useState<Tab>('today');

  useEffect(registerServiceWorker, []);

  const go = (next: Tab) => {
    setTab(next);
    window.scrollTo({ top: 0 });
  };

  if (!mounted) {
    return <div className="min-h-dvh bg-l-bg" />;
  }

  return (
    <div className="min-h-dvh md:flex">
      {/* Sidebar (tablet / laptop) */}
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-l-border bg-l-card p-4 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-l-primary text-xl" aria-hidden>🥗</span>
          <span className="text-lg font-bold">{UI.appName}</span>
        </div>
        <nav className="flex flex-col gap-1">
          {TABS.map((id) => (
            <button
              key={id}
              onClick={() => go(id)}
              aria-current={tab === id ? 'page' : undefined}
              className={`flex min-h-12 items-center gap-3 rounded-xl px-3 font-semibold transition-colors ${
                tab === id ? 'bg-l-primary-soft text-l-primary' : 'text-l-muted hover:bg-l-card-alt'
              }`}
            >
              {TabIcons[id]('h-6 w-6')}
              {UI.tabs[id]}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar (phone) */}
        <div className="pt-safe sticky top-0 z-30 border-b border-l-border bg-l-bg/90 backdrop-blur md:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <span className="flex items-center gap-2 font-bold">
              <span aria-hidden>🥗</span> {UI.appName}
            </span>
          </div>
        </div>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-5 md:px-8 md:pb-10 md:pt-8">
          {tab === 'today' && <TodayTab />}
          {tab === 'out' && <EatingOutTab />}
          {tab === 'guide' && <GuideTab />}
          {tab === 'progress' && <ProgressTab />}
          <p className="mt-8 text-center text-xs leading-relaxed text-l-muted">{UI.disclaimer}</p>
        </main>
      </div>

      {/* Bottom tab bar (phone) */}
      <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-l-border bg-l-card md:hidden">
        <div className="grid grid-cols-4">
          {TABS.map((id) => (
            <button
              key={id}
              onClick={() => go(id)}
              aria-current={tab === id ? 'page' : undefined}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold ${
                tab === id ? 'text-l-primary' : 'text-l-muted'
              }`}
            >
              <span className={`flex h-8 w-14 items-center justify-center rounded-full ${tab === id ? 'bg-l-primary-soft' : ''}`}>
                {TabIcons[id]('h-6 w-6')}
              </span>
              {UI.tabs[id]}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
