# Project Handoff

Last updated: 2026-08-21

## 1. Purpose

This repo is a personal developer portfolio for Carlos Gonzalez. The main experience is an interactive OS-style desktop with draggable windows, an animated day/night wallpaper, a dock/taskbar, and desktop icons that open portfolio content (about, projects, experience, tech stack, trips, testimonials, certifications, contact). A scroll-based portfolio mode is available for mobile screens and can also be toggled manually, switching the whole app between `desktop` and `scroll` layouts.

## 2. Status

**Active — in progress.** Current branch: `main`. The repo has a single commit (`28cc39f`, `Initial commit`, dated 2026-06-18), but the working tree currently carries substantial uncommitted work — `package.json`, all of `src/`, `public/`, `AGENTS.md`, `CLAUDE.md`, config files, etc. are untracked (`git status --short`), and `README.md` is modified. In other words, nearly the entire application as it exists today has not yet been committed to git history. Treat the worktree as the source of truth, not the git log, and do not run destructive git commands (`checkout .`, `reset --hard`, `clean -f`) without explicit user direction.

## 3. Stack

Read directly from `package.json`:

- Next.js `16.2.9` (App Router)
- React `19.2.4` / React DOM `19.2.4`
- TypeScript `^5` (strict mode; see `tsconfig.json`)
- Tailwind CSS `^4` via `@tailwindcss/postcss`
- Zustand `^5.0.14` (state stores)
- Framer Motion `^12.40.0` (animation)
- ESLint `^9` with `eslint-config-next` `16.2.9`
- Fonts: `next/font/google` Geist and Geist Mono

No `.nvmrc` and no `engines` field in `package.json` — Node version is UNKNOWN (not pinned anywhere in the repo).

## 4. Setup & Commands

```bash
npm install
npm run dev     # next dev
npm run build   # next build
npm run start   # next start
npm run lint    # eslint
```

No test script defined — there is no `npm test` / `npm run test` entry in `package.json`.

Expected local dev URL is `http://localhost:3000`, but the port will shift (e.g. `3002`) if something else is already bound.

## 5. Architecture Map

```
src/app/
  layout.tsx        Root layout: metadata, Geist fonts, global CSS, wraps app in ThemeProvider
  page.tsx           Client component; mode switch between desktop and scroll (see section 6)
  globals.css         Global styles, theme CSS variable defaults, pixel-panel/pixel-button/pixel-tag utility classes

src/components/
  Desktop/
    Desktop.tsx        Desktop shell, wallpaper, icon grid
    DesktopIcon.tsx      Opens windows or triggers resume download
    Wallpaper.tsx        Animated desert/pixel scene, sun/moon cycle, draggable celestial body
    PixelSprite.tsx      Shared pixel sprite primitives
    WelcomeDialog.tsx    First-visit dialog offering "Explore desktop" / "Open scroll mode";
                         dismissal stored in localStorage key `portfolio-welcome-seen`
  Window/AppWindow.tsx  Draggable window frame; focus, close, minimize, maximize, open/close animation
  TaskBar/TaskBar.tsx    Dock/taskbar: branding, open-window pills, day/night toggle, mode toggle
  apps/
    AppContent.tsx      Maps AppType -> view component
    EditorView.tsx       About / interests / contact views (contact form lives here, see section 9)
    ExplorerView.tsx     Projects grid
    TimelineView.tsx     Experience timeline
    VisualGridView.tsx   Tech stack display
    GalleryView.tsx      Trips / professional-journey cards
    ListView.tsx         Testimonials and certifications
    FolderView.tsx       Trash folder contents
  ScrollMode/
    ScrollPortfolio.tsx  Single-page scroll version of the portfolio
    ScrollSection.tsx    Reusable scroll section wrapper
  ui/
    FlipWords.tsx, Marquee.tsx, SpotlightCard.tsx  Reusable motion/UI effects
  ThemeProvider.tsx      Animates theme CSS variables every frame from useTimeStore

src/store/
  useWindowStore.ts   Open windows: one window per fileId, position/size/z-index/minimized/maximized,
                       launch-icon origin rect, default size per AppType
  useModeStore.ts     Persists `desktop`/`scroll` mode, localStorage key `portfolio-mode`
  useThemeStore.ts    Persists `night`/`day`, localStorage key `portfolio-theme`; toggleTheme() flips
                       useTimeStore.isDay, ThemeProvider syncs the actual theme back
  useTimeStore.ts     Sun/moon arc progress, day/night half-cycle, drag state; getPeriodLabel()
                       returns labels like Dawn/Evening/Midnight

src/data/
  content.ts          Most portfolio copy: aboutContent, experienceData, projectsData, techStackData,
                       tripsData, testimonialsData, certsData, interestsContent, trashFiles
  desktopFiles.ts      Desktop icon registry and app-routing metadata

src/hooks/
  useKeyboardShortcuts.ts, useMobileDetect.ts

src/theme/colors.ts
```

To add a new desktop icon/window: add an item to `desktopFiles` in `src/data/desktopFiles.ts`, ensure its `appType` exists in the `AppType` union, route that app type in `src/components/apps/AppContent.tsx`, then add/update the view component.

Styling/theme notes: static theme defaults live in `src/app/globals.css`; `ThemeProvider.tsx` interpolates the same CSS variables every animation frame from `useTimeStore`, so the theme behaves as a continuous cycle rather than a static light/dark toggle. The palette is desert-inspired with night/day variants. Scroll mode is gated on `html[data-mode="scroll"]`; desktop mode keeps the viewport locked via `overflow: hidden`.

## 6. Entry Points — Read These First

1. `AGENTS.md` — repo-specific agent rules; points at `node_modules/next/dist/docs/` before touching Next-facing code (see section 7).
2. `package.json` — authoritative scripts and dependency versions; confirm before trusting anything above.
3. `src/app/page.tsx` — client component that reads `useModeStore`, calls `useMobileDetect()`/`useKeyboardShortcuts()`, sets `document.documentElement[data-mode]`, and renders either `ScrollPortfolio` or the `Desktop` + `AppWindow` + `TaskBar` trio. This is the main mode switch for the whole app.
4. `src/data/content.ts` — nearly all portfolio copy and structured content; touch this for content changes.
5. `src/data/desktopFiles.ts` — desktop icon registry and app routing metadata; touch this to add/remove desktop items.
6. `src/store/useWindowStore.ts` — window lifecycle (open/focus/minimize/maximize/position/size); central to how the desktop UI behaves.

## 7. Conventions & Gotchas

- **This project uses Next.js `16.2.9`.** `AGENTS.md` states this is *not* the Next.js in most training data — breaking changes to APIs/conventions/file structure are likely. **Before changing any Next-framework-facing code, check the relevant guide under `node_modules/next/dist/docs/`** (confirmed present locally) and heed any deprecation notices there.
- TypeScript strict mode is enabled (`tsconfig.json`) — expect stricter type-checking than a default Next.js scaffold.
- Two theme layers exist simultaneously: static CSS variable defaults in `globals.css` and a continuous per-frame interpolation in `ThemeProvider.tsx`. When debugging theme/color issues, check both.
- Several localStorage keys drive persistent UI state: `portfolio-welcome-seen`, `portfolio-desktop-icon-positions`, `portfolio-mode`, `portfolio-theme`. Clearing these resets first-visit/layout behavior.
- Desktop icons are pointer-draggable and snap to a grid; positions persist in localStorage and are bounded above the taskbar.
- Keyboard shortcuts: `Escape` closes the top non-minimized window; `Ctrl/Cmd+D` toggles day/night; `Ctrl/Cmd+M` toggles desktop/scroll mode.
- Mobile detection switches to scroll mode at viewport `max-width: 768px`.
- Pixel-styled shared UI classes (`pixel-panel`, `pixel-button`, `pixel-tag`) live in `src/app/globals.css` and are the intended direction for non-wallpaper UI (8bitcn-inspired).
- Window drag in `AppWindow.tsx` only clamps the vertical position to `>= 0` (`Math.max(0, ...)`) — there is no left/right/bottom clamping against the viewport, so windows can be dragged fully or partially off-screen.
- `useWindowStore.ts` has `updateSize`/`WindowState.size` support, but no resize-handle UI was found in `AppWindow.tsx` — resizing is not currently exposed to the user.

## 8. External Dependencies & Environment

No `.env`/`.env.local` file or `process.env.*` usage was found in `src/`. No third-party API calls, auth providers, or backend services are wired up.

- No environment variables identified as required. If any are added later (analytics, form backend, etc.), document the variable **names** here — never values.
- The contact form in `EditorView.tsx` (`ContactEditor`) renders raw `<input>` fields with no submit handler, `mailto:` fallback, or backend wired up (see section 9).
- Resume download in `DesktopIcon.tsx` points at `/resume.pdf`; **no `public/resume.pdf` exists in `public/`** (verified — `public/` only contains `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`).

## 9. Known Issues & TODOs

- `public/resume.pdf` is referenced by the resume-download icon but the file does not exist in `public/`.
- `README.md` is still the default `create-next-app` boilerplate text and does not describe this portfolio (confirmed by reading it).
- Testimonials in `src/data/content.ts` use literal `name: 'Placeholder'` entries (3 occurrences) — real testimonial content is still needed.
- Project cards mostly link to the GitHub profile rather than specific repos or live demos (per prior developer notes; verify against current `projectsData` before relying on this).
- Window drag has no left/right/bottom viewport clamping (see section 7).
- `WindowState.size` has store-level update support (`updateSize`), but no resize-handle UI is implemented in `AppWindow.tsx`.
- The contact form (`ContactEditor` in `EditorView.tsx`) has no backend, `mailto:` fallback, validation, or success/error states — it is static UI only.
- A prior handoff (2026-08-12) noted mojibake (encoding corruption) in some source strings/icons; a scan of `src/**/*.ts(x)` for non-ASCII characters found none as of this update, so that issue appears resolved or was not reproducible — verify visually in the rendered UI before assuming it's fully gone.

## 10. Fast Orientation for a New Agent

1. Run `git status --short` and `git log --oneline -10` yourself first — do not trust any git-state description in this document, since the worktree changes constantly (see section 2).
2. A graphify knowledge graph exists at `graphify-out/`. Orient with:
   ```bash
   export PATH="$HOME/.local/bin:$PATH"
   graphify query "what is the entry point and architecture of this project"
   graphify god-nodes --top 15
   ```
   The most useful first question for this repo is: `graphify query "how does the desktop mode open and manage windows"` — it surfaces the `useWindowStore` / `AppWindow` / `TaskBar` relationships that drive most of the interactive UI.
3. Read `AGENTS.md`, this file, then `src/app/page.tsx` to see the desktop/scroll mode switch live.
4. Before editing any Next.js-framework-facing code (routing, config, data fetching, server/client boundaries), check `node_modules/next/dist/docs/` for the `16.2.9`-specific guide — do not rely on general Next.js knowledge, since the framework here may diverge from training data.
5. Run `npm run lint` and `npm run build` after meaningful changes; there is no test suite to run. For UI changes, manually verify: desktop mode at desktop viewport, scroll mode at mobile width and via the taskbar toggle, window open/focus/minimize/maximize/close, the day/night toggle and animated wallpaper, and the resume download path if resume-related work changed.
