'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { useTimeStore } from '@/store/useTimeStore';

// [night hex, day hex] for every themed CSS variable.
const PALETTE: Record<string, [string, string]> = {
  '--sky-top': ['#1a0a2e', '#1e6091'],
  '--sky-mid': ['#2d1b4e', '#74b9e0'],
  '--sky-bottom': ['#c2724a', '#f5d4a0'],
  '--surface': ['#1c1216', '#faf5ed'],
  '--surface-alt': ['#2a1a1e', '#efe6d6'],
  '--chrome': ['#3d2a2a', '#efe6d6'],
  '--text': ['#f5e6c8', '#3a2a1a'],
  '--text-muted': ['#a08070', '#8a7a6a'],
  '--sand': ['#8b5e3c', '#d4a56a'],
  '--sand-light': ['#a0714f', '#e8be82'],
  '--pyramid': ['#6b4226', '#c49a6c'],
  '--pyramid-shadow': ['#5a3720', '#a07d55'],
  '--pyramid-highlight': ['#6b4226', '#d4ac7a'],
  '--pyramid-outline': ['#3f2717', '#7a5c3c'],
  '--pyramid-band': ['#4a2e1c', '#8a6a48'],
  '--cactus': ['#2d4a2d', '#4a7a3a'],
  '--cactus-dark': ['#1d321d', '#356028'],
  '--celestial': ['#f5e6c8', '#f5d060'],
  '--celestial-outline': ['#9a7a4a', '#b5831f'],
  '--sun-highlight': ['#fffaf0', '#fff4c2'],
  '--moon-crater': ['#cdbb92', '#d9c15a'],
};

// Full traversal of the sky takes ~3.5 minutes.
const CYCLE_SECONDS = 210;
// Fraction of the arc near each horizon where palettes blend (dawn/dusk).
const EDGE = 0.12;

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function lerpColor(nightHex: string, dayHex: string, t: number): [number, number, number] {
  const a = hexToRgb(nightHex);
  const b = hexToRgb(dayHex);
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

/**
 * Blend factor toward the day palette (0 = night, 1 = day).
 * Mid-arc is fully day or night; near the horizons it blends toward 0.5
 * so the moment the body sets and the opposite one rises is continuous.
 */
function targetT(progress: number, isDay: boolean): number {
  let f = 1;
  if (progress < EDGE) f = progress / EDGE;
  else if (progress > 1 - EDGE) f = (1 - progress) / EDGE;
  return isDay ? 0.5 + 0.5 * f : 0.5 - 0.5 * f;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Restore the persisted day/night preference into the time cycle.
    useTimeStore
      .getState()
      .setIsDay(useThemeStore.getState().mode === 'day');

    const html = document.documentElement;
    const initial = useTimeStore.getState();
    let currentT = targetT(initial.progress, initial.isDay);
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const delta = Math.min(0.1, (now - last) / 1000);
      last = now;

      const state = useTimeStore.getState();
      if (!state.isDragging) {
        state.setProgress(state.progress + delta / CYCLE_SECONDS);
      }

      const { progress, isDay } = useTimeStore.getState();
      const t = targetT(progress, isDay);
      // Ease toward the target so drags and toggles transition smoothly.
      currentT += (t - currentT) * Math.min(1, delta * 4);
      if (Math.abs(t - currentT) < 0.0005) currentT = t;

      for (const [cssVar, [night, day]] of Object.entries(PALETTE)) {
        const [r, g, b] = lerpColor(night, day, currentT);
        html.style.setProperty(cssVar, `rgb(${r}, ${g}, ${b})`);
      }
      const [gr, gg, gb] = lerpColor(
        PALETTE['--celestial'][0],
        PALETTE['--celestial'][1],
        currentT
      );
      html.style.setProperty('--celestial-glow', `rgba(${gr}, ${gg}, ${gb}, 0.15)`);
      html.style.setProperty(
        '--cloud-opacity',
        String(Math.max(0, (currentT - 0.5) * 2))
      );
      html.style.setProperty(
        '--star-opacity',
        String(Math.max(0, (0.5 - currentT) * 2))
      );

      const mode = isDay ? 'day' : 'night';
      if (html.getAttribute('data-theme') !== mode) {
        html.setAttribute('data-theme', mode);
      }
      if (useThemeStore.getState().mode !== mode) {
        useThemeStore.getState().setTheme(mode);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <>{children}</>;
}
