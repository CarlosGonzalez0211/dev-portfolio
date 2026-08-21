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
