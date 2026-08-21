'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTimeStore } from '@/store/useTimeStore';
import { PixelSprite, PixelPyramid } from './PixelSprite';

/* ------------------------------------------------------------------ *
 * Pixel-art sprites. '.' is transparent; other chars map via palette.
 * All fills are CSS variables so sprites recolor with the theme cycle.
 * ------------------------------------------------------------------ */

const SUN = [
  '....YYY....',
  '..YYYYYYY..',
  '.YHYYYYYYY.',
  '.YHYYYYYYY.',
  'YHHYYYYYYYY',
  'YHYYYYYYYYY',
  'YYYYYYYYYYY',
  '.YYYYYYYYY.',
  '.YYYYYYYYY.',
  '..YYYYYYY..',
  '....YYY....',
];
const SUN_PAL = { Y: 'var(--celestial)', H: 'var(--sun-highlight)' };

const MOON = [
  '....MMM....',
  '..MMMMMMM..',
  '.MMMMMMMMM.',
  '.MMcMMMMMM.',
  'MMMMMMMcMMM',
  'MMMMMMMMMMM',
  'MMMcMMMMMMM',
  '.MMMMMMMcM.',
  '.MMMMMMMMM.',
  '..MMMMMMM..',
  '....MMM....',
];
const MOON_PAL = { M: 'var(--celestial)', c: 'var(--moon-crater)' };

const SAGUARO = [
  '....G....',
  '....G....',
  '.G..G....',
  '.G..G..G.',
  '.G..G..G.',
  '.GG.G.GG.',
  '..GGGGG..',
  '....G....',
  '....G....',
  '....G....',
  '....G....',
  '....G....',
  '....G....',
  '...GGG...',
  '...GGG...',
];
const BARREL = [
  '..GGG..',
  '.GGGGG.',
  'GGGGGGG',
  'GGGGGGG',
  '.GGGGG.',
  '..GGG..',
];
const CACTUS_PAL = { G: 'var(--cactus)' };

const CLOUD = [
  '...WWWW.....',
  '..WWWWWWWW..',
  '.WWWWWWWWWWW',
  'WWWWWWWWWWWW',
];
const CLOUD_PAL = { W: '#fdf6e8' };

const STARS: [number, number, number][] = [
  [180, 80, 2.5], [420, 50, 1.5], [650, 110, 2], [900, 40, 1.5], [1100, 90, 2],
  [1350, 60, 1.5], [1550, 120, 2], [1750, 45, 1.5], [300, 150, 1], [550, 180, 1.5],
  [780, 70, 1], [1000, 160, 1], [1200, 130, 1.5], [1450, 100, 1], [1650, 170, 1.5],
  [250, 200, 1], [500, 30, 1], [1300, 200, 1], [1700, 80, 1], [850, 190, 1.5],
];

/* ------------------------------------------------------------------ *
 * Shooting stars (night) — a short pixel streak that fades out.
 * ------------------------------------------------------------------ */

interface Meteor {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

function spawnMeteor(): Meteor {
  const angle = ((30 + Math.random() * 30) * Math.PI) / 180;
  const dist = 260 + Math.random() * 140;
  return {
    id: Date.now(),
    x: 200 + Math.random() * 1500,
    y: 50 + Math.random() * 350,
    dx: -Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist,
  };
}

function ShootingStars() {
  const [meteor, setMeteor] = useState<Meteor | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timer.current = setTimeout(() => setMeteor(spawnMeteor()), 1500);
    return () => clearTimeout(timer.current);
  }, []);

  const handleDone = () => {
    setMeteor(null);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMeteor(spawnMeteor()), 2000 + Math.random() * 3000);
  };

  if (!meteor) return null;

  const norm = Math.hypot(meteor.dx, meteor.dy);
  const ux = -meteor.dx / norm;
  const uy = -meteor.dy / norm;
  // Tail = 4 shrinking pixels trailing behind the head.
  const segs = [
    { d: 0, s: 7 },
    { d: 12, s: 6 },
    { d: 24, s: 5 },
    { d: 36, s: 4 },
  ];

  return (
    <motion.g
      key={meteor.id}
      initial={{ x: meteor.x, y: meteor.y, opacity: 0.85 }}
      animate={{ x: meteor.x + meteor.dx, y: meteor.y + meteor.dy, opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeIn' }}
      onAnimationComplete={handleDone}
      shapeRendering="crispEdges"
    >
      {segs.map((seg, i) => (
        <rect
          key={i}
          x={Math.round(ux * seg.d - seg.s / 2)}
          y={Math.round(uy * seg.d - seg.s / 2)}
          width={seg.s}
          height={seg.s}
          fill="var(--celestial)"
          opacity={1 - i * 0.2}
        />
      ))}
    </motion.g>
  );
}

/* ------------------------------------------------------------------ *
 * Night sky — pixel stars + shooting stars. Static, so memoized.
 * ------------------------------------------------------------------ */

const Stars = React.memo(function Stars() {
  return (
    <g style={{ opacity: 'var(--star-opacity)' }} shapeRendering="crispEdges">
      {STARS.map(([x, y, r], i) => {
        const s = r >= 2 ? 6 : r >= 1.5 ? 5 : 4;
        return (
          <rect
            key={i}
            x={Math.round(x - s / 2)}
            y={Math.round(y - s / 2)}
            width={s}
            height={s}
            fill="var(--celestial)"
            opacity={0.35 + (i % 3) * 0.22}
          />
        );
      })}
      <ShootingStars />
    </g>
  );
});

/* ------------------------------------------------------------------ *
 * Day sky — pixel clouds drifting at different speeds. Static, memoized.
 * ------------------------------------------------------------------ */

const Clouds = React.memo(function Clouds() {
  return (
    <g style={{ opacity: 'var(--cloud-opacity)' }}>
      <motion.g animate={{ x: [0, 60, 0] }} transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}>
        <PixelSprite grid={CLOUD} palette={CLOUD_PAL} x={300} y={120} pixel={11} opacity={0.85} />
      </motion.g>
      <motion.g animate={{ x: [0, 45, 0] }} transition={{ duration: 47, repeat: Infinity, ease: 'easeInOut' }}>
        <PixelSprite grid={CLOUD} palette={CLOUD_PAL} x={1150} y={95} pixel={13} opacity={0.8} />
      </motion.g>
      <motion.g animate={{ x: [0, 70, 0] }} transition={{ duration: 31, repeat: Infinity, ease: 'easeInOut' }}>
        <PixelSprite grid={CLOUD} palette={CLOUD_PAL} x={1560} y={165} pixel={9} opacity={0.75} />
      </motion.g>
    </g>
  );
});

/* ------------------------------------------------------------------ *
 * Sun rays — 8 pixel nubs around the sun body.
 * ------------------------------------------------------------------ */

function SunRays({ cx, cy }: { cx: number; cy: number }) {
  const P = 9;
  const rad = (11 * P) / 2 + 8;
  return (
    <g shapeRendering="crispEdges">
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <rect
            key={i}
            x={Math.round(cx + Math.cos(a) * rad - P / 2)}
            y={Math.round(cy + Math.sin(a) * rad - P / 2)}
            width={P}
            height={P}
            fill="var(--celestial)"
          />
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------------ *
 * Celestial body — the only piece that re-renders every frame, since
 * it follows the time cycle along its arc. Grab and drag it.
 * ------------------------------------------------------------------ */

function Celestial({ onGrab }: { onGrab: (e: React.PointerEvent) => void }) {
  const progress = useTimeStore((s) => s.progress);
  const isDay = useTimeStore((s) => s.isDay);
  const isDragging = useTimeStore((s) => s.isDragging);

  const cx = Math.round(100 + 1720 * progress);
  const cy = Math.round(750 - Math.sin(progress * Math.PI) * 550);
  const P = 9;
  const half = Math.round((11 * P) / 2);
  const x = cx - half;
  const y = cy - half;

  return (
    <g style={{ cursor: isDragging ? 'grabbing' : 'grab', pointerEvents: 'all' }} onPointerDown={onGrab}>
      <motion.circle
        cx={cx}
        cy={cy}
        fill="var(--celestial-glow)"
        animate={{ r: [72, 84, 72] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {isDay && <SunRays cx={cx} cy={cy} />}
      {isDay ? (
        <PixelSprite grid={SUN} palette={SUN_PAL} x={x} y={y} pixel={P} outline="var(--celestial-outline)" />
      ) : (
        <PixelSprite grid={MOON} palette={MOON_PAL} x={x} y={y} pixel={P} outline="var(--celestial-outline)" />
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ *
 * Static desert — dunes, pyramids, cacti. Never depends on the frame
 * clock; recolors purely through CSS variables. Built once.
 * ------------------------------------------------------------------ */

function StaticScene() {
  // Distant rolling dunes (deterministic — no random, to stay SSR-safe).
  const farDunes: React.ReactElement[] = [];
  for (let i = 0; i <= 48; i++) {
    const x = i * 40;
    const top = Math.round(700 + Math.sin(i * 0.6) * 30 + Math.sin(i * 1.7) * 15);
    farDunes.push(
      <rect key={`fd-${i}`} x={x} y={top} width={41} height={1080 - top} fill="var(--sand)" opacity={0.5} />
    );
  }

  // Near dune highlight band with a gently stepped top edge.
  const nearDunes: React.ReactElement[] = [];
  for (let i = 0; i <= 48; i++) {
    const x = i * 40;
    const top = Math.round(830 + Math.sin(i * 0.8 + 1) * 12 + Math.sin(i * 2.1) * 6);
    nearDunes.push(
      <rect key={`nd-${i}`} x={x} y={top} width={41} height={1080 - top} fill="var(--sand-light)" />
    );
  }

  const P = 'var(--pyramid)';
  const PS = 'var(--pyramid-shadow)';
  const PO = 'var(--pyramid-outline)';
  const PB = 'var(--pyramid-band)';

  return (
    <g shapeRendering="crispEdges">
      {farDunes}

      {/* Pyramids */}
      <PixelPyramid cx={1250} baseY={782} rows={22} pixel={13} light={P} dark={PS} outline={PO} band={PB} />
      <g opacity={0.7}>
        <PixelPyramid cx={1560} baseY={782} rows={13} pixel={11} light={P} dark={PS} outline={PO} band={PB} />
      </g>

      {/* Near sand covers the pyramid footings */}
      <rect x={0} y={782} width={1920} height={298} fill="var(--sand)" />
      {nearDunes}

      {/* Cacti */}
      <PixelSprite grid={SAGUARO} palette={CACTUS_PAL} x={110} y={782 - 15 * 8} pixel={8} outline="var(--cactus-dark)" opacity={0.95} />
      <PixelSprite grid={BARREL} palette={CACTUS_PAL} x={300} y={782 - 6 * 7} pixel={7} outline="var(--cactus-dark)" opacity={0.9} />
      <PixelSprite grid={SAGUARO} palette={CACTUS_PAL} x={1700} y={786 - 15 * 7} pixel={7} outline="var(--cactus-dark)" opacity={0.85} />
      <PixelSprite grid={BARREL} palette={CACTUS_PAL} x={1410} y={788 - 6 * 6} pixel={6} outline="var(--cactus-dark)" opacity={0.8} />
    </g>
  );
}

/* ------------------------------------------------------------------ */

export function Wallpaper() {
  const svgRef = useRef<SVGSVGElement>(null);

  const grab = (e: React.PointerEvent) => {
    e.preventDefault();
    useTimeStore.getState().setDragging(true);
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const move = (e: React.PointerEvent) => {
    if (!useTimeStore.getState().isDragging) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const p = Math.min(0.999, Math.max(0.001, (e.clientX - rect.left) / rect.width));
    useTimeStore.getState().setProgress(p);
  };

  const release = () => {
    if (useTimeStore.getState().isDragging) useTimeStore.getState().setDragging(false);
  };

  const scene = useMemo(() => <StaticScene />, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ zIndex: -1 }}
      onPointerMove={move}
      onPointerUp={release}
      onPointerCancel={release}
    >
      <defs>
        <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sky-top)" />
          <stop offset="55%" stopColor="var(--sky-mid)" />
          <stop offset="100%" stopColor="var(--sky-bottom)" />
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#skyGradient)" />

      <Stars />
      <Clouds />
      <Celestial onGrab={grab} />
      {scene}
    </svg>
  );
}
