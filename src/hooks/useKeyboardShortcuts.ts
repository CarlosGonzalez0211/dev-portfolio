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
