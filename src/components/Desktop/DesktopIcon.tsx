'use client';

import { useCallback, useRef, useState } from 'react';
import type { DesktopFile } from '@/data/desktopFiles';
import { useWindowStore } from '@/store/useWindowStore';

interface DesktopIconProps {
  file: DesktopFile;
  position: { x: number; y: number };
  grid: { x: number; y: number; width: number; bottom: number };
  onMove: (x: number, y: number) => void;
}

export function DesktopIcon({ file, position, grid, onMove }: DesktopIconProps) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const iconRef = useRef<HTMLButtonElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ clientX: number; clientY: number; x: number; y: number } | null>(null);

  const handleDoubleClick = useCallback(() => {
    if (file.appType === 'download') {
      const a = document.createElement('a');
      a.href = file.downloadUrl || '/resume.pdf';
      a.download = file.name;
      a.click();
      return;
    }

    const rect = iconRef.current?.getBoundingClientRect();

    openWindow({
      fileId: file.id,
      title: file.name,
      icon: file.icon,
      appType: file.appType,
      originRect: rect
        ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
        : undefined,
    });
  }, [file, openWindow]);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    dragStart.current = { clientX: event.clientX, clientY: event.clientY, x: position.x, y: position.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const start = dragStart.current;
    if (!start) return;
    if (Math.hypot(event.clientX - start.clientX, event.clientY - start.clientY) <= 5) return;
    setDragging(true);
    const maxX = Math.max(0, Math.floor((window.innerWidth - grid.width - 16) / grid.x));
    const maxY = Math.max(0, Math.floor((window.innerHeight - grid.bottom - grid.y) / grid.y));
    const nextX = Math.min(maxX, Math.max(0, Math.round((start.x * grid.x + event.clientX - start.clientX) / grid.x)));
    const nextY = Math.min(maxY, Math.max(0, Math.round((start.y * grid.y + event.clientY - start.clientY) / grid.y)));
    if (nextX !== position.x || nextY !== position.y) onMove(nextX, nextY);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragStart.current = null;
    window.setTimeout(() => setDragging(false), 0);
  };

  return (
    <button
      ref={iconRef}
      onDoubleClick={handleDoubleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ left: position.x, top: position.y, touchAction: 'none' }}
      className={`absolute flex w-20 select-none flex-col items-center gap-1.5 p-2 group transition-colors hover:bg-white/10 ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      title={file.name}
    >
      <div className="w-12 h-12 rounded-lg bg-surface/45 border border-white/10 backdrop-blur-[2px] flex items-center justify-center text-2xl shadow-lg group-hover:bg-accent/30 transition-colors">
        {file.icon}
      </div>
      <span className="max-w-[4.75rem] rounded-[4px] border border-white/10 bg-surface/70 px-1 py-0.5 text-center font-mono text-[10px] font-semibold leading-tight text-text-primary shadow-[0_2px_8px_rgba(0,0,0,0.35)] backdrop-blur-[2px]">
        {file.name}
      </span>
    </button>
  );
}
