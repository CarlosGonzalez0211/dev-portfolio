'use client';

import { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

interface MarqueeProps {
  children: React.ReactNode;
  /** Scroll speed in px per second */
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 40,
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -half) next += half;
    x.set(next);
  });

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div ref={trackRef} className="flex w-max" style={{ x }}>
        <div className="flex gap-2.5 pr-2.5 shrink-0">{children}</div>
        <div className="flex gap-2.5 pr-2.5 shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
