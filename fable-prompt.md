# FABLE IMPLEMENTATION PROMPT — Premium Portfolio Upgrade

You are implementing three major upgrades to an existing Next.js developer portfolio that simulates a desktop operating system. The portfolio has two modes: a desktop OS mode (default) with draggable windows, and a scroll mode (traditional one-page portfolio). It uses a Mexican desert theme with day/night switching via CSS custom properties.

**IMPORTANT**: Read the Next.js docs at `node_modules/next/dist/docs/` before writing any code — this version has breaking changes from what you may know.

## TECH STACK
- Next.js 16.2.9 (App Router) + React 19.2.4 + TypeScript
- Tailwind CSS 4 (uses `@theme inline` block in globals.css and CSS custom properties — NOT tailwind.config)
- Framer Motion 12.40.0 (already installed)
- Zustand 5.0.14 (state management with persist middleware)
- Geist Sans + Geist Mono fonts

---

## THREE FEATURES TO IMPLEMENT

### FEATURE 1: Premium UI Effects (Build from scratch with Framer Motion)

Do NOT install any new npm packages. Build all effects using Framer Motion (already installed), React, and CSS. Inspired by components from motion-primitives, magicui, and aceternity — but built inline to integrate with the existing CSS variable theme system.

#### 1A) Shooting Stars + Drifting Clouds (Wallpaper enhancement)

Add animated elements to the `Wallpaper.tsx` SVG, BEHIND the desert scene (pyramids/cacti/sand stay unchanged):

**Night mode — Shooting stars:**
- Render 1 shooting star at a time using Framer Motion `motion.line` inside the SVG
- Each star: a short line (40px long) at a random angle (-30° to -60° from horizontal), starting from a random position in the sky zone (x: 200–1700, y: 50–400)
- Animation: translate along its angle over 0.8s with `ease: "easeIn"`, fade from `opacity: 0.8` to `0` simultaneously  
- After each star completes, wait 2–5 seconds (random), then spawn a new one at a different random position
- Line stroke: `var(--celestial)` with `strokeWidth: 1.5`
- Only visible when `star-opacity` CSS var is 1 (night mode)

**Day mode — Drifting clouds:**
- The existing static SVG `<ellipse>` clouds should slowly drift right using Framer Motion
- Wrap each cloud group in `motion.g` with `animate={{ x: [0, 60, 0] }}` over 30–50 seconds (each cloud group at different speed), `repeat: Infinity`, `ease: "easeInOut"`
- Only visible when `cloud-opacity` CSS var is 1 (day mode)

#### 1B) Text Animations for Scroll Mode Hero

In `ScrollPortfolio.tsx`, upgrade the hero section:

**Name — Staggered word reveal:**
- Split `aboutContent.headline` ("Carlos Gonzalez") into words
- Wrap each word in `motion.span` with `initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}`, `animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}`
- Stagger: second word delays by 0.15s
- Transition: `duration: 0.6, ease: 'easeOut'`

**Subtitle — Flip words:**
- Cycle through: `["Software Engineer", "AI Builder", "Full-Stack Developer", "GDG President"]`
- Use `useState` + `useEffect` with `setInterval(4000)` to increment index
- Wrap in `AnimatePresence mode="wait"`: exiting word `animate={{ opacity: 0, y: -20 }}`, entering word `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`
- Each word uses `motion.span` with `key={currentIndex}` for AnimatePresence to detect changes

#### 1C) Spotlight Card Hover Effect

Create a reusable `SpotlightCard` wrapper component at `src/components/ui/SpotlightCard.tsx`:

```
- Track mouse position relative to card via onMouseMove
- Render a div overlay with `pointer-events-none` and `background: radial-gradient(300px circle at ${x}px ${y}px, var(--accent) / 0.12, transparent 70%)`
- Show overlay only on hover (track with useState)
- Also add `hover:scale-[1.02] hover:shadow-xl` via Tailwind transition
```

Use this `SpotlightCard` in:
- `ExplorerView.tsx` — wrap each project card
- `ScrollPortfolio.tsx` — wrap each project card in the projects section
- `GalleryView.tsx` — wrap each trip card

#### 1D) macOS-Style Floating Dock (TaskBar upgrade)

Replace the flat `TaskBar.tsx` with a floating dock that has icon magnification:

**Visual:**
- Dock floats 12px above the bottom edge, centered horizontally
- Shape: `rounded-2xl bg-surface/60 backdrop-blur-xl border border-chrome/30 shadow-2xl`
- Horizontal padding: 12px, vertical padding: 8px
- Max-width: fit-content (not full width anymore)

**Magnification on hover:**
- Each window pill (and the CG logo, theme toggle, mode switch) uses Framer Motion's `useMotionValue` for mouseX tracking
- On the dock container: `onMouseMove` updates a shared `mouseX` motion value
- Each pill: calculate distance from mouseX to pill center. Use `useTransform` to map distance [0, 100] → scale [1.4, 1.0]. Items nearest to cursor are 1.4x, items 100+px away are 1.0x
- Apply via `motion.button` with `style={{ scale: scaleTransform }}`
- Transition: use `type: "spring", stiffness: 300, damping: 20`

**On mouse leave dock:** All items snap back to scale 1.0 (set mouseX to a value far away like -1000)

Export `TASKBAR_HEIGHT = 72` (taller to accommodate magnification)

#### 1E) Infinite Marquee for Tech Stack

Create `src/components/ui/Marquee.tsx`:
- Props: `children: React.ReactNode`, `speed?: number` (default 40), `pauseOnHover?: boolean` (default true)
- Render: an `overflow-hidden` container with a `flex` inner track. Duplicate `children` twice side by side
- Animate the track with `motion.div` using `animate={{ x: ['0%', '-50%'] }}`, `transition={{ duration: totalWidth / speed, repeat: Infinity, ease: 'linear' }}`
- On hover: set `transition` speed to 0 (or very slow) to pause

Use this Marquee in:
- `VisualGridView.tsx` — each tech category's items scroll horizontally
- `ScrollPortfolio.tsx` techstack section — each category row is a marquee

---

### FEATURE 2: Draggable Sun/Moon Day-Night Cycle

**Replace the button-based theme toggle with an interactive celestial body that traverses the sky in an arc and can be grabbed/dragged.**

#### 2A) New Store: `src/store/useTimeStore.ts`

```typescript
interface TimeState {
  progress: number;      // 0.0 → 1.0, represents position along the arc
  isDragging: boolean;
  isDay: boolean;        // derived: true when progress is in the day range
  setProgress: (p: number) => void;
  setDragging: (d: boolean) => void;
}
```

- `progress` goes from 0.0 (left horizon) to 1.0 (right horizon)
- When progress reaches 1.0, it wraps to 0.0 and `isDay` toggles
- `isDay` starts as `false` (night mode default)
- Auto-advance: when NOT dragging, increment progress by ~0.00008 per frame via `requestAnimationFrame` (full traversal ≈ 3.5 minutes)

#### 2B) Theme Interpolation: Update `ThemeProvider.tsx`

Instead of the binary `data-theme="night"/"day"` attribute:

- Subscribe to `useTimeStore` progress
- Define a `getThemeProgress()` function: 
  - When `isDay`: all values are day palette. But near edges (progress 0.0–0.12 and 0.88–1.0), interpolate between night and day palettes
  - When `!isDay`: all values are night palette. Same edge interpolation
- Interpolate each CSS variable between night and day values using a `lerpColor(nightHex, dayHex, t)` function where t is 0 (night) to 1 (day)
- Set all CSS vars directly on `document.documentElement.style` via `requestAnimationFrame`
- Remove the `data-theme` attribute approach — all theming is now continuous
- Remove `[data-theme-transitioning]` mechanism — transitions are continuous now

Keep `data-theme` as either "night" or "day" for Tailwind utility classes that depend on it (just set it based on `isDay` without transitions).

#### 2C) Celestial Body in `Wallpaper.tsx`

Replace the static celestial body with a dynamic one:

**Position calculation:**
```
x = lerp(100, 1820, progress)  // left edge to right edge of viewport
y = 750 - Math.sin(progress * Math.PI) * 550  // parabolic arc: starts at y=750, peaks at y=200 at progress=0.5
```

**Rendering:**
- When `isDay`: sun — a circle with `fill: var(--celestial)` plus small ray lines
- When `!isDay`: moon — circle with crescent mask (as current code does)
- Glow: a larger circle behind with `fill: var(--celestial-glow)` and a subtle `animate={{ scale: [1, 1.15, 1] }}` pulse over 4 seconds

**Drag interaction:**
- Wrap celestial body elements in `motion.g` with:
  - `cursor: isDragging ? 'grabbing' : 'grab'`
  - `onPointerDown`: set `isDragging: true`, capture pointer on the SVG element
  - SVG-level `onPointerMove` (when dragging): convert `clientX` to progress: `progress = clamp((clientX - svgRect.left) / svgRect.width, 0, 1)`
  - `onPointerUp`: set `isDragging: false`
- While dragging, the celestial body follows the mouse horizontally along the arc (y is always calculated from x via the sine formula)

#### 2D) Update TaskBar

- Remove the sun/moon emoji toggle button
- Replace with a small time-of-day label that shows the period based on progress ranges:
  - 0.0–0.12: "Dawn" / "Dusk" (depending on isDay toggle direction)
  - 0.12–0.38: "Morning" / "Evening"  
  - 0.38–0.62: "Noon" / "Midnight"
  - 0.62–0.88: "Afternoon" / "Late Night"
  - 0.88–1.0: "Dusk" / "Dawn"
- Clicking the label jumps progress by +0.5 (quick half-cycle toggle)
- Keep the mode switch button as-is

#### 2E) Update `useThemeStore.ts`

The theme store still tracks `mode: 'night' | 'day'` for compatibility but now derives it from `useTimeStore.isDay`. The `toggleTheme` function now calls `useTimeStore.getState().setProgress(progress + 0.5)` instead of directly toggling. The store is still persisted so the last theme preference survives reload — on mount, set `useTimeStore.isDay` from the persisted theme mode.

---

### FEATURE 3: macOS-Style Window Open/Close/Minimize Animations

**Windows should animate as if expanding FROM the icon that opened them, and collapse BACK to the icon when closing or minimizing.**

#### 3A) Track Icon Positions

In `DesktopIcon.tsx`:
- Add a `useRef<HTMLButtonElement>` to the icon button
- On double-click, before calling `openWindow()`, get the icon's bounding rect:
  ```
  const rect = iconRef.current.getBoundingClientRect();
  ```
- Pass `originRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }` to `openWindow()`

#### 3B) Update `useWindowStore.ts`

- Add `originRect?: { x: number; y: number; width: number; height: number }` to `WindowState`
- Update `openWindow` to accept and store `originRect`

#### 3C) Animate `AppWindow.tsx`

Replace the current `initial/animate/exit` animation:

**Open animation — scale from icon origin:**
```tsx
// Calculate transform origin based on where the icon is relative to the window
const originX = win.originRect 
  ? win.originRect.x + win.originRect.width / 2 
  : pos.x + win.size.width / 2;
const originY = win.originRect 
  ? win.originRect.y + win.originRect.height / 2 
  : pos.y + win.size.height / 2;

// Transform origin relative to the window element
const toX = originX - (isMaximized ? 0 : pos.x);
const toY = originY - (isMaximized ? 0 : pos.y);

<motion.div
  style={{ 
    ...style, 
    transformOrigin: `${toX}px ${toY}px` 
  }}
  initial={{ opacity: 0, scale: 0.12 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.12 }}
  transition={{ 
    type: 'spring',
    stiffness: 280,
    damping: 24,
    mass: 0.8,
  }}
/>
```

**Minimize animation:**
When `minimized` changes to `true`, animate to:
- `scale: 0.15, y: window.innerHeight - 60, opacity: 0` over 0.3s
- THEN set display: none (or return null)

When un-minimized, animate FROM that position back to normal.

Implementation approach: use `useAnimationControls()` from Framer Motion:
- On minimize click, call `controls.start({ scale: 0.15, y: viewportHeight - 60, opacity: 0 })` then after it resolves, call `minimizeWindow(win.id)`
- On un-minimize (from TaskBar click), the window is added back and the `initial` animation plays from the bottom

---

## COMPLETE CODEBASE

Below is every source file in the project. When you edit a file, output the COMPLETE file — never use "..." or "rest unchanged" shortcuts.

### File: `package.json`
```json
{
  "name": "dev-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "framer-motion": "^12.40.0",
    "next": "16.2.9",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.9",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### File: `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".next/dev/types/**/*.ts", "**/*.mts"],
  "exclude": ["node_modules"]
}
```

### File: `next.config.ts`
```typescript
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
```

### File: `src/app/globals.css`
```css
@import "tailwindcss";

:root {
  --sky-top: #1a0a2e;
  --sky-mid: #2d1b4e;
  --sky-bottom: #c2724a;
  --accent: #c2724a;
  --surface: #1c1216;
  --surface-alt: #2a1a1e;
  --chrome: #3d2a2a;
  --text: #f5e6c8;
  --text-muted: #a08070;
  --sand: #8b5e3c;
  --sand-light: #a0714f;
  --pyramid: #6b4226;
  --pyramid-shadow: #5a3720;
  --pyramid-highlight: #6b4226;
  --cactus: #2d4a2d;
  --celestial: #f5e6c8;
  --celestial-glow: rgba(245, 230, 200, 0.15);
  --cloud-opacity: 0;
  --star-opacity: 1;
  --theme-transition: 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="day"] {
  --sky-top: #1e6091;
  --sky-mid: #74b9e0;
  --sky-bottom: #f5d4a0;
  --accent: #c2724a;
  --surface: #faf5ed;
  --surface-alt: #efe6d6;
  --chrome: #efe6d6;
  --text: #3a2a1a;
  --text-muted: #8a7a6a;
  --sand: #d4a56a;
  --sand-light: #e8be82;
  --pyramid: #c49a6c;
  --pyramid-shadow: #a07d55;
  --pyramid-highlight: #d4ac7a;
  --cactus: #4a7a3a;
  --celestial: #f5d060;
  --celestial-glow: rgba(245, 208, 96, 0.15);
  --cloud-opacity: 1;
  --star-opacity: 0;
}

@theme inline {
  --color-accent: var(--accent);
  --color-surface: var(--surface);
  --color-surface-alt: var(--surface-alt);
  --color-chrome: var(--chrome);
  --color-text-primary: var(--text);
  --color-text-muted: var(--text-muted);
  --color-sky-top: var(--sky-top);
  --color-sky-mid: var(--sky-mid);
  --color-sky-bottom: var(--sky-bottom);
  --color-sand: var(--sand);
  --color-sand-light: var(--sand-light);
  --color-pyramid: var(--pyramid);
  --color-cactus: var(--cactus);
  --color-celestial: var(--celestial);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

* {
  transition-property: background-color, border-color, color, fill, stroke, opacity;
  transition-duration: 0s;
}

[data-theme-transitioning] * {
  transition-duration: var(--theme-transition);
}

html, body {
  margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden;
}

html[data-mode="scroll"] {
  overflow-y: auto !important; height: auto !important; scroll-behavior: smooth;
}
html[data-mode="scroll"] body {
  overflow-y: auto !important; height: auto !important;
}

body {
  background: var(--surface);
  color: var(--text);
  font-family: system-ui, -apple-system, sans-serif;
}

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: var(--surface-alt); border-radius: 4px; }
::-webkit-scrollbar-thumb { background: var(--chrome); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }
::selection { background: var(--accent); color: white; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

### File: `src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carlos Gonzalez | Developer Portfolio",
  description: "Developer portfolio — explore my work, experience, and projects in an interactive desktop environment.",
  keywords: ["developer", "portfolio", "full-stack", "software engineer", "Carlos Gonzalez", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Carlos Gonzalez" }],
  openGraph: {
    title: "Carlos Gonzalez | Developer Portfolio",
    description: "Interactive OS-themed developer portfolio. Explore projects, experience, and more.",
    type: "website", locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Gonzalez | Developer Portfolio",
    description: "Interactive OS-themed developer portfolio. Explore projects, experience, and more.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### File: `src/app/page.tsx`
```tsx
'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import { useModeStore } from '@/store/useModeStore';
import { AppWindow } from '@/components/Window/AppWindow';
import { AppContent } from '@/components/apps/AppContent';
import { Desktop } from '@/components/Desktop/Desktop';
import { TaskBar } from '@/components/TaskBar/TaskBar';
import { ScrollPortfolio } from '@/components/ScrollMode/ScrollPortfolio';
import { useMobileDetect } from '@/hooks/useMobileDetect';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Home() {
  const windows = useWindowStore((s) => s.windows);
  const portfolioMode = useModeStore((s) => s.mode);
  useMobileDetect();
  useKeyboardShortcuts();

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', portfolioMode === 'scroll' ? 'scroll' : 'desktop');
  }, [portfolioMode]);

  if (portfolioMode === 'scroll') return <ScrollPortfolio />;

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Desktop />
      <AnimatePresence>
        {windows.map((win) => (
          <AppWindow key={win.id} window={win}>
            <AppContent appType={win.appType} fileId={win.fileId} />
          </AppWindow>
        ))}
      </AnimatePresence>
      <TaskBar />
    </div>
  );
}
```

### File: `src/theme/colors.ts`
```typescript
export const nightPalette = {
  skyTop: '#1a0a2e', skyMid: '#2d1b4e', skyBottom: '#c2724a',
  accent: '#c2724a', surface: '#1c1216', surfaceAlt: '#2a1a1e',
  chrome: '#3d2a2a', text: '#f5e6c8', textMuted: '#a08070',
  sand: '#8b5e3c', sandLight: '#a0714f', pyramid: '#6b4226',
  pyramidShadow: '#5a3720', cactus: '#2d4a2d', moon: '#f5e6c8',
} as const;

export const dayPalette = {
  skyTop: '#1e6091', skyMid: '#74b9e0', skyBottom: '#f5d4a0',
  accent: '#c2724a', surface: '#faf5ed', surfaceAlt: '#efe6d6',
  chrome: '#efe6d6', text: '#3a2a1a', textMuted: '#8a7a6a',
  sand: '#d4a56a', sandLight: '#e8be82', pyramid: '#c49a6c',
  pyramidShadow: '#a07d55', pyramidHighlight: '#d4ac7a',
  cactus: '#4a7a3a', sun: '#f5d060',
} as const;

export type ThemeMode = 'night' | 'day';
```

### File: `src/store/useThemeStore.ts`
```typescript
'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode } from '@/theme/colors';

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'night',
      toggleTheme: () => set((state) => ({ mode: state.mode === 'night' ? 'day' : 'night' })),
      setTheme: (mode) => set({ mode }),
    }),
    { name: 'portfolio-theme' }
  )
);
```

### File: `src/store/useWindowStore.ts`
```typescript
'use client';
import { create } from 'zustand';
import type { AppType } from '@/data/desktopFiles';

export interface WindowState {
  id: string; fileId: string; title: string; icon: string;
  appType: AppType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number; minimized: boolean; maximized: boolean;
}

const DEFAULT_SIZE = { width: 680, height: 480 };
let nextZIndex = 1;

function getDefaultPosition(existingCount: number) {
  const offset = existingCount * 30;
  return { x: 250 + offset, y: 60 + offset };
}

function getDefaultSize(appType: AppType) {
  switch (appType) {
    case 'editor': return { width: 600, height: 450 };
    case 'explorer': return { width: 750, height: 520 };
    case 'timeline': return { width: 700, height: 500 };
    case 'visualGrid': return { width: 720, height: 480 };
    case 'gallery': return { width: 780, height: 540 };
    case 'listView': return { width: 600, height: 420 };
    case 'folder': return { width: 500, height: 380 };
    default: return DEFAULT_SIZE;
  }
}

interface WindowStore {
  windows: WindowState[];
  openWindow: (params: { fileId: string; title: string; icon: string; appType: AppType }) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  openWindow: ({ fileId, title, icon, appType }) => {
    const existing = get().windows.find((w) => w.fileId === fileId);
    if (existing) {
      get().focusWindow(existing.id);
      if (existing.minimized) set((state) => ({ windows: state.windows.map((w) => w.id === existing.id ? { ...w, minimized: false } : w) }));
      return;
    }
    const id = `window-${fileId}-${Date.now()}`;
    nextZIndex++;
    set((state) => ({ windows: [...state.windows, { id, fileId, title, icon, appType, position: getDefaultPosition(state.windows.length), size: getDefaultSize(appType), zIndex: nextZIndex, minimized: false, maximized: false }] }));
  },
  closeWindow: (id) => set((state) => ({ windows: state.windows.filter((w) => w.id !== id) })),
  focusWindow: (id) => { nextZIndex++; set((state) => ({ windows: state.windows.map((w) => w.id === id ? { ...w, zIndex: nextZIndex } : w) })); },
  minimizeWindow: (id) => set((state) => ({ windows: state.windows.map((w) => w.id === id ? { ...w, minimized: true } : w) })),
  toggleMaximize: (id) => set((state) => ({ windows: state.windows.map((w) => w.id === id ? { ...w, maximized: !w.maximized } : w) })),
  updatePosition: (id, position) => set((state) => ({ windows: state.windows.map((w) => w.id === id ? { ...w, position } : w) })),
  updateSize: (id, size) => set((state) => ({ windows: state.windows.map((w) => w.id === id ? { ...w, size } : w) })),
}));
```

### File: `src/store/useModeStore.ts`
```typescript
'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PortfolioMode = 'desktop' | 'scroll';
interface ModeState {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      mode: 'desktop',
      setMode: (mode) => set({ mode }),
      toggleMode: () => set((state) => ({ mode: state.mode === 'desktop' ? 'scroll' : 'desktop' })),
    }),
    { name: 'portfolio-mode' }
  )
);
```

### File: `src/components/ThemeProvider.tsx`
```tsx
'use client';
import { useEffect, useRef } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((s) => s.mode);
  const prevMode = useRef(mode);
  useEffect(() => {
    const html = document.documentElement;
    if (prevMode.current !== mode) {
      html.setAttribute('data-theme-transitioning', '');
      setTimeout(() => html.removeAttribute('data-theme-transitioning'), 1500);
    }
    html.setAttribute('data-theme', mode);
    prevMode.current = mode;
  }, [mode]);
  return <>{children}</>;
}
```

### File: `src/data/desktopFiles.ts`
```typescript
export type AppType = 'editor' | 'explorer' | 'timeline' | 'visualGrid' | 'gallery' | 'listView' | 'folder' | 'download';

export interface DesktopFile {
  id: string; name: string; icon: string; appType: AppType; downloadUrl?: string;
}

export const desktopFiles: DesktopFile[] = [
  { id: 'about', name: 'about_me.md', icon: '📄', appType: 'editor' },
  { id: 'experience', name: 'experience/', icon: '💼', appType: 'timeline' },
  { id: 'projects', name: 'projects/', icon: '🚀', appType: 'explorer' },
  { id: 'resume', name: 'resume.pdf', icon: '🎓', appType: 'download', downloadUrl: '/resume.pdf' },
  { id: 'trips', name: 'trips/', icon: '✈️', appType: 'gallery' },
  { id: 'techstack', name: 'tech_stack/', icon: '🛠️', appType: 'visualGrid' },
  { id: 'interests', name: 'interests.txt', icon: '🎮', appType: 'editor' },
  { id: 'testimonials', name: 'testimonials/', icon: '💬', appType: 'listView' },
  { id: 'certs', name: 'certs/', icon: '📜', appType: 'listView' },
  { id: 'contact', name: 'contact.md', icon: '📬', appType: 'editor' },
  { id: 'trash', name: 'Trash', icon: '🗑️', appType: 'folder' },
];
```

### File: `src/data/content.ts`
(Keep this file EXACTLY as-is — do not modify content data. Only modify the components that render this data.)

### File: `src/components/Desktop/Wallpaper.tsx`
```tsx
'use client';
import { useThemeStore } from '@/store/useThemeStore';

export function Wallpaper() {
  const mode = useThemeStore((s) => s.mode);
  const isDay = mode === 'day';

  return (
    <svg className="fixed inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: -1 }}>
      <defs>
        <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sky-top)" style={{ transition: 'stop-color var(--theme-transition)' }} />
          <stop offset="55%" stopColor="var(--sky-mid)" style={{ transition: 'stop-color var(--theme-transition)' }} />
          <stop offset="100%" stopColor="var(--sky-bottom)" style={{ transition: 'stop-color var(--theme-transition)' }} />
        </linearGradient>
        <radialGradient id="celestialGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--celestial)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--celestial)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#skyGradient)" />

      {/* Stars */}
      <g style={{ opacity: 'var(--star-opacity)', transition: 'opacity var(--theme-transition)' }}>
        {[[180,80,2.5],[420,50,1.5],[650,110,2],[900,40,1.5],[1100,90,2],[1350,60,1.5],[1550,120,2],[1750,45,1.5],[300,150,1],[550,180,1.5],[780,70,1],[1000,160,1],[1200,130,1.5],[1450,100,1],[1650,170,1.5],[250,200,1],[500,30,1],[1300,200,1],[1700,80,1],[850,190,1.5]].map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="var(--celestial)" opacity={0.3+(i%3)*0.25} />
        ))}
      </g>

      {/* Clouds */}
      <g style={{ opacity: 'var(--cloud-opacity)', transition: 'opacity var(--theme-transition)' }}>
        <ellipse cx="350" cy="150" rx="100" ry="30" fill="white" opacity="0.35" />
        <ellipse cx="390" cy="140" rx="70" ry="25" fill="white" opacity="0.25" />
        <ellipse cx="1200" cy="120" rx="120" ry="35" fill="white" opacity="0.3" />
        <ellipse cx="1260" cy="110" rx="80" ry="28" fill="white" opacity="0.22" />
        <ellipse cx="800" cy="180" rx="90" ry="25" fill="white" opacity="0.2" />
        <ellipse cx="1600" cy="160" rx="70" ry="22" fill="white" opacity="0.25" />
      </g>

      {/* Celestial body */}
      <circle cx="350" cy="200" r="60" fill="var(--celestial-glow)" style={{ transition: 'fill var(--theme-transition)' }} />
      <circle cx="350" cy="200" r={isDay ? 45 : 38} fill="var(--celestial)" style={{ transition: 'fill var(--theme-transition)' }} />
      {!isDay && <circle cx="368" cy="188" r="34" fill="var(--sky-top)" />}

      {/* Mountains */}
      <path d="M0 750 Q200 680 400 720 Q600 650 800 700 Q1000 640 1200 690 Q1400 660 1600 710 Q1800 670 1920 700 L1920 1080 L0 1080Z" fill="var(--sand)" opacity="0.5" style={{ transition: 'fill var(--theme-transition)' }} />

      {/* Main pyramid */}
      <polygon points="1250,480 1420,780 1080,780" fill="var(--pyramid)" style={{ transition: 'fill var(--theme-transition)' }} />
      <polygon points="1250,480 1420,780 1250,780" fill="var(--pyramid-shadow)" style={{ transition: 'fill var(--theme-transition)' }} />
      <polygon points="1250,480 1080,780 1165,780" fill="var(--pyramid-highlight)" style={{ opacity: isDay ? 0.4 : 0, transition: 'opacity var(--theme-transition), fill var(--theme-transition)' }} />

      {/* Small pyramid */}
      <polygon points="1550,620 1630,780 1470,780" fill="var(--pyramid)" opacity="0.6" style={{ transition: 'fill var(--theme-transition)' }} />
      <polygon points="1550,620 1630,780 1550,780" fill="var(--pyramid-shadow)" opacity="0.6" style={{ transition: 'fill var(--theme-transition)' }} />

      {/* Sand */}
      <path d="M0 780 Q480 750 960 775 Q1440 800 1920 770 L1920 1080 L0 1080Z" fill="var(--sand)" style={{ transition: 'fill var(--theme-transition)' }} />
      <path d="M0 820 Q480 800 960 815 Q1440 835 1920 810 L1920 1080 L0 1080Z" fill="var(--sand-light)" style={{ transition: 'fill var(--theme-transition)' }} />

      {/* Cacti */}
      <g style={{ transition: 'fill var(--theme-transition)' }}>
        <rect x="150" y="710" width="14" height="70" rx="7" fill="var(--cactus)" opacity="0.7" />
        <rect x="138" y="722" width="12" height="30" rx="6" fill="var(--cactus)" opacity="0.7" transform="rotate(-30 144 722)" />
        <rect x="158" y="716" width="12" height="35" rx="6" fill="var(--cactus)" opacity="0.7" transform="rotate(25 164 716)" />
        <rect x="1700" y="700" width="12" height="80" rx="6" fill="var(--cactus)" opacity="0.6" />
        <rect x="1690" y="714" width="10" height="28" rx="5" fill="var(--cactus)" opacity="0.6" transform="rotate(-35 1695 714)" />
        <rect x="1708" y="720" width="10" height="32" rx="5" fill="var(--cactus)" opacity="0.6" transform="rotate(30 1713 720)" />
        <rect x="1400" y="740" width="10" height="40" rx="5" fill="var(--cactus)" opacity="0.5" />
        <rect x="1393" y="748" width="8" height="20" rx="4" fill="var(--cactus)" opacity="0.5" transform="rotate(-25 1397 748)" />
      </g>
    </svg>
  );
}
```

### File: `src/components/Desktop/Desktop.tsx`
```tsx
'use client';
import { desktopFiles } from '@/data/desktopFiles';
import { Wallpaper } from './Wallpaper';
import { DesktopIcon } from './DesktopIcon';

const TASKBAR_HEIGHT = 48;

export function Desktop() {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ paddingBottom: TASKBAR_HEIGHT }}>
      <Wallpaper />
      <div className="absolute top-4 left-4 flex flex-col flex-wrap gap-1 content-start max-w-[200px]" style={{ height: `calc(100vh - ${TASKBAR_HEIGHT + 32}px)` }}>
        {desktopFiles.map((file) => <DesktopIcon key={file.id} file={file} />)}
      </div>
    </div>
  );
}
```

### File: `src/components/Desktop/DesktopIcon.tsx`
```tsx
'use client';
import { useCallback } from 'react';
import type { DesktopFile } from '@/data/desktopFiles';
import { useWindowStore } from '@/store/useWindowStore';

export function DesktopIcon({ file }: { file: DesktopFile }) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const handleDoubleClick = useCallback(() => {
    if (file.appType === 'download') {
      const a = document.createElement('a');
      a.href = file.downloadUrl || '/resume.pdf';
      a.download = file.name;
      a.click();
      return;
    }
    openWindow({ fileId: file.id, title: file.name, icon: file.icon, appType: file.appType });
  }, [file, openWindow]);

  return (
    <button onDoubleClick={handleDoubleClick} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors w-20 group" title={file.name}>
      <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-2xl group-hover:bg-accent/30 transition-colors">{file.icon}</div>
      <span className="text-[10px] font-mono text-text-primary/90 text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{file.name}</span>
    </button>
  );
}
```

### File: `src/components/Window/AppWindow.tsx`
```tsx
'use client';
import { useRef, useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore, type WindowState } from '@/store/useWindowStore';

const TASKBAR_HEIGHT = 48;

export function AppWindow({ window: win, children }: { window: WindowState; children: React.ReactNode }) {
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize, updatePosition } = useWindowStore();
  const dragRef = useRef<{ startX: number; startY: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState(win.position);

  useEffect(() => { if (!dragging) setPos(win.position); }, [win.position, dragging]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => { focusWindow(win.id); }, [focusWindow, win.id]);

  const handleTitleBarPointerDown = useCallback((e: React.PointerEvent) => {
    if (win.maximized) return;
    e.preventDefault();
    dragRef.current = { startX: e.clientX - pos.x, startY: e.clientY - pos.y };
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [win.maximized, pos]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setPos({ x: e.clientX - dragRef.current.startX, y: Math.max(0, e.clientY - dragRef.current.startY) });
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    updatePosition(win.id, { x: e.clientX - dragRef.current.startX, y: Math.max(0, e.clientY - dragRef.current.startY) });
    dragRef.current = null;
    setDragging(false);
  }, [updatePosition, win.id]);

  if (win.minimized) return null;

  const isMaximized = win.maximized;
  const style: React.CSSProperties = isMaximized
    ? { top: 0, left: 0, width: '100vw', height: `calc(100vh - ${TASKBAR_HEIGHT}px)`, zIndex: win.zIndex }
    : { top: pos.y, left: pos.x, width: win.size.width, height: win.size.height, zIndex: win.zIndex };

  return (
    <motion.div ref={windowRef} className="fixed select-none" style={style}
      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2, ease: 'easeOut' }} onPointerDown={handlePointerDown}>
      <div className={`flex flex-col h-full bg-surface border border-chrome/50 shadow-2xl overflow-hidden ${isMaximized ? '' : 'rounded-xl'}`}>
        <div className={`flex items-center h-11 px-3 bg-chrome shrink-0 ${isMaximized ? '' : 'rounded-t-xl'} ${isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
          onPointerDown={handleTitleBarPointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
          onDoubleClick={() => toggleMaximize(win.id)}>
          <div className="flex items-center gap-2 mr-3">
            <button onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }} className="w-3 h-3 rounded-full bg-[#e74c3c] hover:brightness-110 transition-all" aria-label="Close" />
            <button onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }} className="w-3 h-3 rounded-full bg-[#f39c12] hover:brightness-110 transition-all" aria-label="Minimize" />
            <button onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }} className="w-3 h-3 rounded-full bg-[#2ecc71] hover:brightness-110 transition-all" aria-label="Maximize" />
          </div>
          <div className="flex-1 text-center pointer-events-none">
            <span className="text-sm font-medium text-text-primary/80">{win.icon} {win.title}</span>
          </div>
          <div className="w-14" />
        </div>
        <div className="flex-1 overflow-auto bg-surface">{children}</div>
      </div>
    </motion.div>
  );
}
```

### File: `src/components/TaskBar/TaskBar.tsx`
```tsx
'use client';
import { useWindowStore } from '@/store/useWindowStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useModeStore } from '@/store/useModeStore';

export const TASKBAR_HEIGHT = 48;

export function TaskBar() {
  const windows = useWindowStore((s) => s.windows);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const { mode, toggleTheme } = useThemeStore();
  const toggleMode = useModeStore((s) => s.toggleMode);

  const handleWindowPillClick = (windowId: string, minimized: boolean) => {
    if (minimized) {
      useWindowStore.setState((state) => ({ windows: state.windows.map((w) => w.id === windowId ? { ...w, minimized: false } : w) }));
      focusWindow(windowId);
    } else {
      const topWindow = [...windows].sort((a, b) => b.zIndex - a.zIndex)[0];
      if (topWindow?.id === windowId) minimizeWindow(windowId);
      else focusWindow(windowId);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center px-3 gap-2 bg-surface/85 backdrop-blur-md border-t border-accent/15 z-[9000]" style={{ height: TASKBAR_HEIGHT }}>
      <div className="flex items-center gap-1.5 px-2 shrink-0"><span className="text-sm font-bold text-accent tracking-wide">CG</span></div>
      <div className="w-px h-6 bg-accent/20 shrink-0" />
      <div className="flex-1 flex items-center gap-1.5 overflow-x-auto min-w-0">
        {windows.map((win) => {
          const isTop = !win.minimized && win.zIndex === Math.max(...windows.map((w) => w.zIndex));
          return (
            <button key={win.id} onClick={() => handleWindowPillClick(win.id, win.minimized)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 max-w-[160px] ${isTop ? 'bg-accent/25 text-text-primary' : win.minimized ? 'bg-chrome/30 text-text-muted' : 'bg-chrome/60 text-text-primary/80 hover:bg-chrome/80'}`}>
              <span>{win.icon}</span><span className="truncate">{win.title}</span>
            </button>
          );
        })}
      </div>
      <div className="w-px h-6 bg-accent/20 shrink-0" />
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={toggleTheme} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-chrome/60 transition-colors text-base"
          aria-label={mode === 'night' ? 'Switch to day' : 'Switch to night'}>
          <span className="inline-block transition-transform duration-500" style={{ transform: mode === 'night' ? 'rotate(0deg)' : 'rotate(180deg)' }}>
            {mode === 'night' ? '☀️' : '🌙'}
          </span>
        </button>
        <div className="w-px h-6 bg-accent/20" />
        <button onClick={toggleMode} className="px-3 py-1.5 rounded-md text-[10px] font-medium text-text-muted hover:text-accent hover:bg-chrome/40 transition-colors">↕ Scroll Mode</button>
      </div>
    </div>
  );
}
```

### File: `src/components/ScrollMode/ScrollPortfolio.tsx`
```tsx
'use client';

import { useModeStore } from '@/store/useModeStore';
import { useThemeStore } from '@/store/useThemeStore';
import { ScrollSection } from './ScrollSection';
import {
  aboutContent,
  experienceData,
  projectsData,
  techStackData,
  tripsData,
  testimonialsData,
  certsData,
  interestsContent,
} from '@/data/content';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'techstack', label: 'Stack' },
  { id: 'trips', label: 'Trips' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'certs', label: 'Certs' },
  { id: 'interests', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
];

export function ScrollPortfolio() {
  const toggleMode = useModeStore((s) => s.toggleMode);
  const { mode: theme, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-surface overflow-y-auto">
      {/* Skip to content */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm"
      >
        Skip to content
      </a>

      {/* Floating Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[8000] bg-surface/80 backdrop-blur-md border-b border-chrome/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 h-12">
          <span className="text-sm font-bold text-accent">CG</span>
          <div className="flex items-center gap-4 overflow-x-auto">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs text-text-muted hover:text-accent transition-colors shrink-0"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleTheme}
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-chrome/40 transition-colors text-sm"
            >
              {theme === 'night' ? '☀️' : '🌙'}
            </button>
            <button
              onClick={toggleMode}
              className="text-[10px] text-accent hover:underline shrink-0"
            >
              Desktop Mode
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-4xl mx-auto mb-4">
          👨‍💻
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          {aboutContent.headline}
        </h1>
        <p className="text-lg text-accent font-medium mb-4">
          {aboutContent.subtitle}
        </p>
        <p className="text-text-muted max-w-lg mx-auto text-sm leading-relaxed">
          {aboutContent.bio.split('\n\n')[0]}
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <a
            href="/resume.pdf"
            download
            className="px-5 py-2 rounded-lg bg-accent text-white font-medium text-sm hover:brightness-110 transition-all"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg border border-accent/40 text-accent font-medium text-sm hover:bg-accent/10 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* About */}
      <ScrollSection id="about">
        <SectionHeading emoji="📄" title="About Me" />
        <div className="space-y-3">
          {aboutContent.bio.split('\n\n').map((p, i) => (
            <p key={i} className="text-sm text-text-primary/85 leading-relaxed">{p}</p>
          ))}
        </div>
      </ScrollSection>

      {/* Experience */}
      <ScrollSection id="experience">
        <SectionHeading emoji="💼" title="Experience" />
        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-accent/30" />
          <div className="space-y-8">
            {experienceData.map((job, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-5 top-1.5 w-4 h-4 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-text-primary">{job.role}</h3>
                  <span className="text-xs text-text-muted font-mono shrink-0">{job.period}</span>
                </div>
                <p className="text-xs font-medium text-accent mb-1">{job.company}</p>
                <p className="text-xs text-text-muted mb-2">{job.description}</p>
                <ul className="space-y-1">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="text-xs text-text-primary/80 pl-3 relative before:content-['→'] before:absolute before:left-0 before:text-accent">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Projects */}
      <ScrollSection id="projects">
        <SectionHeading emoji="🚀" title="Projects" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projectsData.map((project) => (
            <div
              key={project.name}
              className="rounded-xl bg-surface-alt border border-chrome/20 overflow-hidden"
            >
              <div className="h-32 bg-chrome/20 flex items-center justify-center">
                <span className="text-4xl opacity-30">🖼️</span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-text-primary">{project.name}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-1">
                  {project.link && <a href={project.link} className="text-accent text-xs hover:underline">Live ↗</a>}
                  {project.github && <a href={project.github} className="text-accent text-xs hover:underline">Code ↗</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Tech Stack */}
      <ScrollSection id="techstack">
        <SectionHeading emoji="🛠️" title="Tech Stack" />
        <div className="space-y-5">
          {techStackData.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-alt border border-chrome/20">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs font-medium text-text-primary">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Trips */}
      <ScrollSection id="trips">
        <SectionHeading emoji="✈️" title="Professional Trips" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tripsData.map((trip, i) => (
            <div key={i} className="rounded-xl bg-surface-alt border border-chrome/20 overflow-hidden">
              <div className="h-28 bg-chrome/20 flex items-center justify-center relative">
                <span className="text-4xl opacity-30">📸</span>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-text-muted bg-surface/70 px-2 py-0.5 rounded">{trip.date}</span>
              </div>
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-bold text-text-primary">{trip.title}</h3>
                <p className="text-xs text-accent">📍 {trip.location}</p>
                <p className="text-xs text-text-muted">{trip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Testimonials */}
      <ScrollSection id="testimonials">
        <SectionHeading emoji="💬" title="Testimonials" />
        <div className="space-y-4">
          {testimonialsData.map((t, i) => (
            <div key={i} className="p-4 rounded-xl bg-surface-alt border border-chrome/20">
              <p className="text-sm text-text-primary/90 italic leading-relaxed mb-3">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">{t.name.charAt(0)}</div>
                <div>
                  <p className="text-xs font-bold text-text-primary">{t.name}</p>
                  <p className="text-[10px] text-text-muted">{t.role} @ {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Certifications */}
      <ScrollSection id="certs">
        <SectionHeading emoji="📜" title="Certifications & Education" />
        <div className="space-y-3">
          {certsData.map((cert, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-surface-alt border border-chrome/20">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-xl shrink-0">📜</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-text-primary">{cert.name}</h3>
                <p className="text-xs text-text-muted">{cert.issuer}</p>
              </div>
              <span className="text-xs font-mono text-text-muted">{cert.date}</span>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Interests */}
      <ScrollSection id="interests">
        <SectionHeading emoji="🎮" title="Interests" />
        <div className="space-y-1 font-mono text-sm">
          {interestsContent.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return null;
            if (line.startsWith('## '))
              return <h3 key={i} className="text-base font-semibold text-accent pt-3 pb-1">{line.slice(3)}</h3>;
            if (line === '') return <div key={i} className="h-2" />;
            return <p key={i} className="text-text-primary/85 leading-relaxed">{line}</p>;
          })}
        </div>
      </ScrollSection>

      {/* Contact */}
      <ScrollSection id="contact">
        <SectionHeading emoji="📬" title="Get in Touch" />
        <div className="max-w-md mx-auto space-y-3">
          <input type="text" placeholder="Your name" className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent" />
          <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent" />
          <textarea placeholder="Your message..." rows={4} className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent resize-none" />
          <button className="w-full px-5 py-2.5 rounded-lg bg-accent text-white font-medium text-sm hover:brightness-110 transition-all">
            Send Message
          </button>
          <div className="flex justify-center gap-6 pt-3">
            <a href={aboutContent.github} className="text-accent hover:underline text-sm">GitHub ↗</a>
            <a href={aboutContent.linkedin} className="text-accent hover:underline text-sm">LinkedIn ↗</a>
            <span className="text-text-muted text-sm">{aboutContent.email}</span>
          </div>
        </div>
      </ScrollSection>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-text-muted border-t border-chrome/20">
        <p>Built with Next.js, Tailwind, and Framer Motion</p>
        <button onClick={toggleMode} className="mt-2 text-accent hover:underline">
          Switch to Desktop Mode ↗
        </button>
      </footer>
    </div>
  );
}

function SectionHeading({ emoji, title }: { emoji: string; title: string }) {
  return (
    <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
      <span>{emoji}</span> {title}
    </h2>
  );
}
```

### File: `src/components/ScrollMode/ScrollSection.tsx`
```tsx
'use client';
import { motion } from 'framer-motion';

export function ScrollSection({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.section id={id} className={`px-6 py-16 max-w-4xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, ease: 'easeOut' }}>
      {children}
    </motion.section>
  );
}
```

### File: `src/components/apps/AppContent.tsx`
```tsx
'use client';

import type { AppType } from '@/data/desktopFiles';
import { EditorView } from './EditorView';
import { ExplorerView } from './ExplorerView';
import { TimelineView } from './TimelineView';
import { VisualGridView } from './VisualGridView';
import { GalleryView } from './GalleryView';
import { ListView } from './ListView';
import { FolderView } from './FolderView';

interface AppContentProps {
  appType: AppType;
  fileId: string;
}

export function AppContent({ appType, fileId }: AppContentProps) {
  switch (appType) {
    case 'editor':
      return <EditorView fileId={fileId} />;
    case 'explorer':
      return <ExplorerView />;
    case 'timeline':
      return <TimelineView />;
    case 'visualGrid':
      return <VisualGridView />;
    case 'gallery':
      return <GalleryView />;
    case 'listView':
      return <ListView fileId={fileId} />;
    case 'folder':
      return <FolderView />;
    default:
      return (
        <div className="p-6 text-text-muted text-sm">
          Unknown app type: {appType}
        </div>
      );
  }
}
```

### File: `src/components/apps/EditorView.tsx`
```tsx
'use client';

import { aboutContent, interestsContent } from '@/data/content';

interface EditorViewProps {
  fileId: string;
}

export function EditorView({ fileId }: EditorViewProps) {
  if (fileId === 'about') return <AboutEditor />;
  if (fileId === 'interests') return <InterestsEditor />;
  if (fileId === 'contact') return <ContactEditor />;
  return <div className="p-6 text-text-muted">Unknown file</div>;
}

function AboutEditor() {
  return (
    <div className="p-6 space-y-4 font-mono text-sm">
      <div className="flex items-center gap-3 pb-3 border-b border-chrome/30">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-3xl">
          👨‍💻
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary">{aboutContent.headline}</h1>
          <p className="text-accent font-medium">{aboutContent.subtitle}</p>
          <p className="text-text-muted text-xs">📍 {aboutContent.location}</p>
        </div>
      </div>

      {aboutContent.bio.split('\n\n').map((paragraph, i) => (
        <p key={i} className="text-text-primary/85 leading-relaxed">
          {paragraph}
        </p>
      ))}

      <div className="flex gap-4 pt-3 border-t border-chrome/30">
        <a href={aboutContent.github} className="text-accent hover:underline text-xs">GitHub ↗</a>
        <a href={aboutContent.linkedin} className="text-accent hover:underline text-xs">LinkedIn ↗</a>
        <span className="text-text-muted text-xs">{aboutContent.email}</span>
      </div>
    </div>
  );
}

function InterestsEditor() {
  const lines = interestsContent.split('\n');
  return (
    <div className="p-6 font-mono text-sm space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith('# '))
          return <h1 key={i} className="text-lg font-bold text-text-primary pt-2">{line.slice(2)}</h1>;
        if (line.startsWith('## '))
          return <h2 key={i} className="text-base font-semibold text-accent pt-3 pb-1">{line.slice(3)}</h2>;
        if (line === '')
          return <div key={i} className="h-2" />;
        return <p key={i} className="text-text-primary/85 leading-relaxed">{line}</p>;
      })}
    </div>
  );
}

function ContactEditor() {
  return (
    <div className="p-6 space-y-5">
      <h2 className="text-lg font-bold text-text-primary">Get in touch</h2>
      <p className="text-text-muted text-sm">I&apos;d love to hear from you. Drop me a line!</p>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent"
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent"
        />
        <textarea
          placeholder="Your message..."
          rows={4}
          className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent resize-none"
        />
        <button className="px-5 py-2 rounded-lg bg-accent text-white font-medium text-sm hover:brightness-110 transition-all">
          Send Message
        </button>
      </div>

      <div className="flex gap-6 pt-3 border-t border-chrome/30">
        <a href={aboutContent.github} className="text-accent hover:underline text-sm">GitHub ↗</a>
        <a href={aboutContent.linkedin} className="text-accent hover:underline text-sm">LinkedIn ↗</a>
        <span className="text-text-muted text-sm">{aboutContent.email}</span>
      </div>
    </div>
  );
}
```

### File: `src/components/apps/ExplorerView.tsx`
```tsx
'use client';

import { projectsData } from '@/data/content';

export function ExplorerView() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-2 gap-4">
        {projectsData.map((project) => (
          <div
            key={project.name}
            className="rounded-xl bg-surface-alt border border-chrome/20 overflow-hidden hover:border-accent/40 transition-colors group"
          >
            {/* Project thumbnail placeholder */}
            <div className="h-32 bg-chrome/30 flex items-center justify-center">
              <span className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">🖼️</span>
            </div>

            <div className="p-3 space-y-2">
              <h3 className="text-sm font-bold text-text-primary">{project.name}</h3>
              <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                {project.link && (
                  <a href={project.link} className="text-accent text-xs hover:underline">
                    Live ↗
                  </a>
                )}
                {project.github && (
                  <a href={project.github} className="text-accent text-xs hover:underline">
                    Code ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### File: `src/components/apps/TimelineView.tsx`
```tsx
'use client';

import { experienceData } from '@/data/content';

export function TimelineView() {
  return (
    <div className="p-6">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-accent/30" />

        <div className="space-y-8">
          {experienceData.map((job, i) => (
            <div key={i} className="relative pl-10">
              {/* Dot on timeline */}
              <div className="absolute left-1 top-1.5 w-5 h-5 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-text-primary">{job.role}</h3>
                  <span className="text-xs text-text-muted shrink-0 font-mono">{job.period}</span>
                </div>
                <p className="text-xs font-medium text-accent">{job.company}</p>
                <p className="text-xs text-text-muted leading-relaxed">{job.description}</p>
                <ul className="space-y-1">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="text-xs text-text-primary/80 pl-3 relative before:content-['→'] before:absolute before:left-0 before:text-accent">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### File: `src/components/apps/VisualGridView.tsx`
```tsx
'use client';

import { techStackData } from '@/data/content';

export function VisualGridView() {
  return (
    <div className="p-6 space-y-6">
      {techStackData.map((category) => (
        <div key={category.category}>
          <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-3">
            {category.category}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {category.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-alt border border-chrome/20 hover:border-accent/40 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-medium text-text-primary">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### File: `src/components/apps/GalleryView.tsx`
```tsx
'use client';

import { tripsData } from '@/data/content';

export function GalleryView() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-2 gap-4">
        {tripsData.map((trip, i) => (
          <div
            key={i}
            className="rounded-xl bg-surface-alt border border-chrome/20 overflow-hidden group"
          >
            {/* Photo placeholder */}
            <div className="h-36 bg-chrome/20 flex items-center justify-center relative">
              <span className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">📸</span>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-text-muted bg-surface/70 px-2 py-0.5 rounded">
                {trip.date}
              </span>
            </div>

            <div className="p-3 space-y-1">
              <h3 className="text-sm font-bold text-text-primary">{trip.title}</h3>
              <p className="text-xs text-accent font-medium">📍 {trip.location}</p>
              <p className="text-xs text-text-muted leading-relaxed">{trip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### File: `src/components/apps/ListView.tsx`
```tsx
'use client';

import { testimonialsData, certsData } from '@/data/content';

interface ListViewProps {
  fileId: string;
}

export function ListView({ fileId }: ListViewProps) {
  if (fileId === 'testimonials') return <TestimonialsView />;
  if (fileId === 'certs') return <CertsView />;
  return <div className="p-6 text-text-muted">Unknown list</div>;
}

function TestimonialsView() {
  return (
    <div className="p-6 space-y-4">
      {testimonialsData.map((t, i) => (
        <div
          key={i}
          className="p-4 rounded-xl bg-surface-alt border border-chrome/20 space-y-3"
        >
          <p className="text-sm text-text-primary/90 italic leading-relaxed">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-text-primary">{t.name}</p>
              <p className="text-[10px] text-text-muted">
                {t.role} @ {t.company}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CertsView() {
  return (
    <div className="p-6 space-y-3">
      {certsData.map((cert, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-xl bg-surface-alt border border-chrome/20"
        >
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-xl shrink-0">
            📜
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-text-primary">{cert.name}</h3>
            <p className="text-xs text-text-muted">{cert.issuer}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-mono text-text-muted">{cert.date}</span>
            {cert.credential && (
              <p className="text-[10px] text-accent">ID: {cert.credential}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### File: `src/components/apps/FolderView.tsx`
```tsx
'use client';

import { useState } from 'react';
import { trashFiles } from '@/data/content';

export function FolderView() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const selected = trashFiles.find((f) => f.name === selectedFile);

  return (
    <div className="flex h-full">
      {/* File list sidebar */}
      <div className="w-48 border-r border-chrome/20 p-2 shrink-0">
        <p className="text-[10px] font-mono text-text-muted px-2 py-1 uppercase tracking-wider">
          Recently Deleted
        </p>
        {trashFiles.map((file) => (
          <button
            key={file.name}
            onClick={() => setSelectedFile(file.name)}
            className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-colors ${
              selectedFile === file.name
                ? 'bg-accent/20 text-accent'
                : 'text-text-primary/80 hover:bg-chrome/30'
            }`}
          >
            🗑️ {file.name}
          </button>
        ))}
      </div>

      {/* File content preview */}
      <div className="flex-1 p-4">
        {selected ? (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-text-primary font-mono">
              {selected.name}
            </h3>
            <pre className="text-xs text-text-muted whitespace-pre-wrap font-mono leading-relaxed">
              {selected.content}
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-muted text-sm">
            Select a file to preview
          </div>
        )}
      </div>
    </div>
  );
}
```

### File: `src/hooks/useMobileDetect.ts`
```tsx
'use client';

import { useEffect } from 'react';
import { useModeStore } from '@/store/useModeStore';

export function useMobileDetect() {
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');

    if (mq.matches) {
      useModeStore.getState().setMode('scroll');
    }

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        useModeStore.getState().setMode('scroll');
      }
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
}
```

### File: `src/hooks/useKeyboardShortcuts.ts`
```tsx
'use client';

import { useEffect } from 'react';
import { useWindowStore } from '@/store/useWindowStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useModeStore } from '@/store/useModeStore';

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const state = useWindowStore.getState();
      const topWindow = [...state.windows]
        .filter((w) => !w.minimized)
        .sort((a, b) => b.zIndex - a.zIndex)[0];

      if (e.key === 'Escape' && topWindow) {
        state.closeWindow(topWindow.id);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        useThemeStore.getState().toggleTheme();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        useModeStore.getState().toggleMode();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}
```

---

## NEW FILES TO CREATE

1. `src/store/useTimeStore.ts` — Time/progress state for celestial body
2. `src/components/ui/SpotlightCard.tsx` — Reusable mouse-tracking glow card
3. `src/components/ui/Marquee.tsx` — Infinite horizontal scroll component
4. `src/components/ui/FlipWords.tsx` — Cycling text animation component

---

## IMPLEMENTATION ORDER

1. **Feature 3** (window animations) — edit DesktopIcon, useWindowStore, AppWindow
2. **Feature 1** (premium effects) — create SpotlightCard, Marquee, FlipWords; edit Wallpaper, TaskBar, ExplorerView, VisualGridView, GalleryView, ScrollPortfolio
3. **Feature 2** (draggable sun/moon) — create useTimeStore; edit ThemeProvider, Wallpaper, TaskBar, globals.css

## CONSTRAINTS
- All effects must use the existing CSS custom property theme system so they work in both day and night modes
- Do NOT install any new npm packages — build everything with Framer Motion + React + CSS
- Build must compile clean with `npx next build`
- Preserve all existing functionality: window management, mode switching, keyboard shortcuts, mobile detection, localStorage persistence
- When you edit a file, output the COMPLETE file — never abbreviate with "..." or "rest unchanged"
- Keep the desert aesthetic: warm earth tones, terracotta accent (#c2724a)
- The `src/data/content.ts` file must NOT be modified — only change the components that render the data
