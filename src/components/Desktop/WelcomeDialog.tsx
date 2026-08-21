'use client';

import { useEffect, useState } from 'react';
import { useModeStore } from '@/store/useModeStore';

const STORAGE_KEY = 'portfolio-welcome-seen';

export function WelcomeDialog() {
  const [open, setOpen] = useState<boolean | null>(null);
  const toggleMode = useModeStore((state) => state.toggleMode);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(window.localStorage.getItem(STORAGE_KEY) !== 'true');
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, 'true');
    setOpen(false);
  };

  if (open !== true) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/45 p-5 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div className="pixel-panel w-full max-w-md bg-surface p-1 shadow-2xl">
        <div className="border border-accent/50 bg-surface-alt px-5 py-5 sm:px-6">
          <div className="mb-4 flex items-center gap-3 border-b border-chrome/40 pb-3">
            <span className="text-2xl" aria-hidden="true">🖥️</span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">CarlosOS // boot complete</p>
              <h1 id="welcome-title" className="font-mono text-lg font-bold text-text-primary">Welcome to my desktop</h1>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-text-primary/90">This desktop view is a playful way for me to showcase my skills and creativity. Open the icons, move them around, and explore.</p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">Prefer a traditional portfolio? Switch to scroll mode below.</p>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={dismiss} className="pixel-button text-text-muted hover:text-text-primary">Explore desktop</button>
            <button type="button" onClick={() => { dismiss(); toggleMode(); }} className="pixel-button pixel-button-primary">Open scroll mode</button>
          </div>
        </div>
      </div>
    </div>
  );
}
