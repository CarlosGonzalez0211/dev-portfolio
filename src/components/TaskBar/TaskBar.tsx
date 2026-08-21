'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useModeStore } from '@/store/useModeStore';
import { useTimeStore, getPeriodLabel } from '@/store/useTimeStore';

export const TASKBAR_HEIGHT = 72;

interface DockItemProps {
  mouseX: MotionValue<number>;
  onClick: () => void;
  className?: string;
  title?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

function DockItem({ mouseX, onClick, className = '', title, ariaLabel, children }: DockItemProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 1000;
    return val - (bounds.x + bounds.width / 2);
  });
  const scale = useSpring(useTransform(distance, [-100, 0, 100], [1, 1.4, 1]), {
    stiffness: 300,
    damping: 20,
  });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      style={{ scale, transformOrigin: 'bottom center' }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function TaskBar() {
  const windows = useWindowStore((s) => s.windows);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const toggleMode = useModeStore((s) => s.toggleMode);
  const period = useTimeStore((s) => getPeriodLabel(s.progress, s.isDay));

  const mouseX = useMotionValue(-1000);

  const handleWindowPillClick = (windowId: string, minimized: boolean) => {
    if (minimized) {
      useWindowStore.setState((state) => ({
        windows: state.windows.map((w) =>
          w.id === windowId ? { ...w, minimized: false } : w
        ),
      }));
      focusWindow(windowId);
    } else {
      const topWindow = [...windows].sort((a, b) => b.zIndex - a.zIndex)[0];
      if (topWindow?.id === windowId) minimizeWindow(windowId);
      else focusWindow(windowId);
    }
  };

  return (
    <div
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9000] flex items-end gap-1.5 rounded-2xl bg-surface/60 backdrop-blur-xl border border-chrome/30 shadow-2xl px-3 py-2 max-w-[calc(100vw-24px)]"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(-1000)}
    >
      <div className="px-2 py-1.5 text-sm font-bold text-accent tracking-wide shrink-0">
        CG
      </div>
      <div className="w-px self-stretch bg-accent/20 shrink-0" />

      {windows.map((win) => {
        const isTop =
          !win.minimized &&
          win.zIndex === Math.max(...windows.map((w) => w.zIndex));
        return (
          <DockItem
            key={win.id}
            mouseX={mouseX}
            onClick={() => handleWindowPillClick(win.id, win.minimized)}
            title={win.title}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 max-w-[160px] ${
              isTop
                ? 'bg-accent/25 text-text-primary'
                : win.minimized
                  ? 'bg-chrome/30 text-text-muted'
                  : 'bg-chrome/60 text-text-primary/80 hover:bg-chrome/80'
            }`}
          >
            <span>{win.icon}</span>
            <span className="truncate">{win.title}</span>
          </DockItem>
        );
      })}
      {windows.length > 0 && <div className="w-px self-stretch bg-accent/20 shrink-0" />}

      <DockItem
        mouseX={mouseX}
        onClick={toggleTheme}
        title="Toggle day / night"
        ariaLabel="Toggle day and night"
        className="px-3 py-1.5 rounded-md text-[10px] font-mono font-medium text-text-muted hover:text-accent hover:bg-chrome/40 transition-colors shrink-0"
      >
        {period}
      </DockItem>
      <DockItem
        mouseX={mouseX}
        onClick={toggleMode}
        title="Switch to scroll mode"
        ariaLabel="Switch to scroll mode"
        className="px-3 py-1.5 rounded-md text-[10px] font-medium text-text-muted hover:text-accent hover:bg-chrome/40 transition-colors shrink-0"
      >
        ↕ Scroll Mode
      </DockItem>
    </div>
  );
}
