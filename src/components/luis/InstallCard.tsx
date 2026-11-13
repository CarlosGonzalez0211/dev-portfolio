'use client';

import { useSyncExternalStore } from 'react';
import { UI } from './content';
import { useLuisStore } from './store';

type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

// Chrome/Android fire `beforeinstallprompt` early, so capture it at module load.
let deferred: InstallPromptEvent | null = null;
const listeners = new Set<() => void>();
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e as InstallPromptEvent;
    listeners.forEach((l) => l());
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    listeners.forEach((l) => l());
  });
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function InstallCard() {
  const dismissed = useLuisStore((s) => s.installDismissed);
  const dismiss = useLuisStore((s) => s.dismissInstall);
  const prompt = useSyncExternalStore(subscribe, () => deferred, () => null);

  // Rendered client-side only (LuisApp waits for mount), so window is safe here.
  if (dismissed || isStandalone()) return null;

  const ua = navigator.userAgent;
  const isIos = /iPhone|iPad|iPod/.test(ua) || (ua.includes('Mac') && navigator.maxTouchPoints > 1);
  const isMobile = isIos || /Android|Mobi/.test(ua);
  if (!prompt && !isMobile) return null;

  const install = async () => {
    if (!prompt) return;
    await prompt.prompt();
    await prompt.userChoice;
    deferred = null;
    listeners.forEach((l) => l());
  };

  return (
    <section className="l-card flex flex-col gap-3 border-2 border-l-primary p-4">
      <div className="flex gap-3">
        <span className="text-3xl" aria-hidden>📲</span>
        <div>
          <h2 className="font-bold">{UI.installTitle}</h2>
          <p className="text-sm leading-snug text-l-muted">{UI.installBody}</p>
        </div>
      </div>
      {!prompt && (
        <p className="rounded-xl bg-l-card-alt p-3 text-[0.95rem] leading-snug">
          {isIos ? UI.installIos : UI.installOther}
        </p>
      )}
      <div className="flex gap-2">
        {prompt && (
          <button onClick={install} className="min-h-12 flex-1 rounded-xl bg-l-primary font-semibold text-l-on-primary">
            {UI.installButton}
          </button>
        )}
        <button onClick={dismiss} className="min-h-12 flex-1 rounded-xl border-2 border-l-border font-semibold text-l-muted">
          {UI.later}
        </button>
      </div>
    </section>
  );
}
