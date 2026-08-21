'use client';

import { useEffect, useMemo, useState } from 'react';
import { desktopFiles } from '@/data/desktopFiles';
import { Wallpaper } from './Wallpaper';
import { DesktopIcon } from './DesktopIcon';
import { TASKBAR_HEIGHT } from '@/components/TaskBar/TaskBar';

const GRID_X = 104;
const GRID_Y = 88;
const ICON_WIDTH = 80;
const STORAGE_KEY = 'portfolio-desktop-icon-positions';
type Position = { x: number; y: number };
type PositionMap = Record<string, Position>;

export function Desktop() {
  const [positions, setPositions] = useState<PositionMap>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setPositions(JSON.parse(saved) as PositionMap);
      } catch {
        // Ignore malformed local desktop state and use the default grid.
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const defaultPositions = useMemo(() => Object.fromEntries(
    desktopFiles.map((file, index) => [file.id, { x: Math.floor(index / 8), y: index % 8 }])
  ) as PositionMap, []);

  const moveIcon = (id: string, x: number, y: number) => {
    setPositions((current) => {
      const next = { ...defaultPositions, ...current, [id]: { x, y } };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ paddingBottom: TASKBAR_HEIGHT }}
    >
      <Wallpaper />

      <div className="absolute inset-0" aria-label="Desktop icons">
        {desktopFiles.map((file) => {
          const position = { ...defaultPositions[file.id], ...positions[file.id] };
          return (
            <DesktopIcon
              key={file.id}
              file={file}
              position={{ x: 16 + position.x * GRID_X, y: 16 + position.y * GRID_Y }}
              grid={{ x: GRID_X, y: GRID_Y, width: ICON_WIDTH, bottom: TASKBAR_HEIGHT + 16 }}
              onMove={(x, y) => moveIcon(file.id, x, y)}
            />
          );
        })}
      </div>
    </div>
  );
}
