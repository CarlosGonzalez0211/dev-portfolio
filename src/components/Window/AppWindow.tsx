'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore, type WindowState } from '@/store/useWindowStore';
import { TASKBAR_HEIGHT } from '@/components/TaskBar/TaskBar';

interface AppWindowProps {
  window: WindowState;
  children: React.ReactNode;
}

const openSpring = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 24,
  mass: 0.8,
  opacity: { duration: 0.25, ease: 'easeOut' as const },
};

export function AppWindow({ window: win, children }: AppWindowProps) {
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize, updatePosition } =
    useWindowStore();

  const dragRef = useRef<{ startX: number; startY: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState(win.position);

  useEffect(() => {
    if (!dragging) {
      setPos(win.position);
    }
  }, [win.position, dragging]);

  const handlePointerDown = useCallback(() => {
    focusWindow(win.id);
  }, [focusWindow, win.id]);

  const handleTitleBarPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (win.maximized) return;
      e.preventDefault();
      dragRef.current = {
        startX: e.clientX - pos.x,
        startY: e.clientY - pos.y,
      };
      setDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [win.maximized, pos]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const x = e.clientX - dragRef.current.startX;
      const y = Math.max(0, e.clientY - dragRef.current.startY);
      setPos({ x, y });
    },
    []
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const x = e.clientX - dragRef.current.startX;
      const y = Math.max(0, e.clientY - dragRef.current.startY);
      updatePosition(win.id, { x, y });
      dragRef.current = null;
      setDragging(false);
    },
    [updatePosition, win.id]
  );

  const handleDoubleClickTitleBar = useCallback(() => {
    toggleMaximize(win.id);
  }, [toggleMaximize, win.id]);

  const isMaximized = win.maximized;
  const style: React.CSSProperties = isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
        zIndex: win.zIndex,
      }
    : {
        top: pos.y,
        left: pos.x,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      };

  // Open/close animations scale from the desktop icon that launched the window.
  const baseX = isMaximized ? 0 : pos.x;
  const baseY = isMaximized ? 0 : pos.y;
  const originX = win.originRect
    ? win.originRect.x + win.originRect.width / 2 - baseX
    : (isMaximized ? 0 : win.size.width / 2);
  const originY = win.originRect
    ? win.originRect.y + win.originRect.height / 2 - baseY
    : (isMaximized ? 0 : win.size.height / 2);

  const minimizeY =
    typeof window !== 'undefined' ? window.innerHeight - baseY - 60 : 600;

  return (
    <motion.div
      ref={windowRef}
      className="fixed select-none"
      style={{
        ...style,
        transformOrigin: `${originX}px ${originY}px`,
        pointerEvents: win.minimized ? 'none' : 'auto',
      }}
      initial={{ opacity: 0, scale: 0.12 }}
      animate={
        win.minimized
          ? {
              opacity: 0,
              scale: 0.15,
              y: minimizeY,
              transition: { duration: 0.3, ease: 'easeIn' },
              transitionEnd: { visibility: 'hidden' },
            }
          : {
              visibility: 'visible',
              opacity: 1,
              scale: 1,
              y: 0,
              transition: openSpring,
            }
      }
      exit={{
        opacity: 0,
        scale: 0.12,
        transition: { duration: 0.25, ease: 'easeIn' },
      }}
      onPointerDown={handlePointerDown}
    >
      <div
        className={`flex flex-col h-full bg-surface border border-chrome/50 shadow-2xl overflow-hidden ${
          isMaximized ? '' : 'rounded-xl'
        }`}
      >
        {/* Title Bar */}
        <div
          className={`flex items-center h-11 px-3 bg-chrome shrink-0 ${
            isMaximized ? '' : 'rounded-t-xl'
          } ${isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
          onPointerDown={handleTitleBarPointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onDoubleClick={handleDoubleClickTitleBar}
        >
          {/* Traffic Lights */}
          <div className="flex items-center gap-2 mr-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(win.id);
              }}
              className="w-3 h-3 rounded-full bg-[#e74c3c] hover:brightness-110 transition-all"
              aria-label="Close"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(win.id);
              }}
              className="w-3 h-3 rounded-full bg-[#f39c12] hover:brightness-110 transition-all"
              aria-label="Minimize"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize(win.id);
              }}
              className="w-3 h-3 rounded-full bg-[#2ecc71] hover:brightness-110 transition-all"
              aria-label="Maximize"
            />
          </div>

          {/* Window Title */}
          <div className="flex-1 text-center pointer-events-none">
            <span className="text-sm font-medium text-text-primary/80">
              {win.icon} {win.title}
            </span>
          </div>

          {/* Spacer to balance traffic lights */}
          <div className="w-14" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-surface">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
