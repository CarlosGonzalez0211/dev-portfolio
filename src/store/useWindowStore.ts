'use client';

import { create } from 'zustand';
import type { AppType } from '@/data/desktopFiles';

export interface OriginRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  fileId: string;
  title: string;
  icon: string;
  appType: AppType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  originRect?: OriginRect;
}

const DEFAULT_SIZE = { width: 680, height: 480 };

let nextZIndex = 1;

function getDefaultPosition(existingCount: number): { x: number; y: number } {
  const offset = existingCount * 30;
  return { x: 250 + offset, y: 60 + offset };
}

function getDefaultSize(appType: AppType): { width: number; height: number } {
  switch (appType) {
    case 'editor':
      return { width: 600, height: 450 };
    case 'explorer':
      return { width: 750, height: 520 };
    case 'timeline':
      return { width: 700, height: 500 };
    case 'visualGrid':
      return { width: 720, height: 480 };
    case 'gallery':
      return { width: 780, height: 540 };
    case 'listView':
      return { width: 600, height: 420 };
    case 'folder':
      return { width: 500, height: 380 };
    default:
      return DEFAULT_SIZE;
  }
}

interface WindowStore {
  windows: WindowState[];

  openWindow: (params: {
    fileId: string;
    title: string;
    icon: string;
    appType: AppType;
    originRect?: OriginRect;
  }) => void;

  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],

  openWindow: ({ fileId, title, icon, appType, originRect }) => {
    const existing = get().windows.find((w) => w.fileId === fileId);
    if (existing) {
      get().focusWindow(existing.id);
      if (existing.minimized) {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === existing.id ? { ...w, minimized: false } : w
          ),
        }));
      }
      return;
    }

    const id = `window-${fileId}-${Date.now()}`;
    nextZIndex++;

    const newWindow: WindowState = {
      id,
      fileId,
      title,
      icon,
      appType,
      position: getDefaultPosition(get().windows.length),
      size: getDefaultSize(appType),
      zIndex: nextZIndex,
      minimized: false,
      maximized: false,
      originRect,
    };

    set((state) => ({ windows: [...state.windows, newWindow] }));
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }));
  },

  focusWindow: (id) => {
    nextZIndex++;
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      ),
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w
      ),
    }));
  },

  toggleMaximize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      ),
    }));
  },

  updatePosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },
}));
