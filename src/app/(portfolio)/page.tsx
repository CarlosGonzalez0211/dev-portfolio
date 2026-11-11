'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import { useModeStore } from '@/store/useModeStore';
import { AppWindow } from '@/components/Window/AppWindow';
import { AppContent } from '@/components/apps/AppContent';
import { Desktop } from '@/components/Desktop/Desktop';
import { TaskBar } from '@/components/TaskBar/TaskBar';
import { ScrollPortfolio } from '@/components/ScrollMode/ScrollPortfolio';
import { useMobileDetect } from '@/hooks/useMobileDetect';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { WelcomeDialog } from '@/components/Desktop/WelcomeDialog';

export default function Home() {
  const windows = useWindowStore((s) => s.windows);
  const portfolioMode = useModeStore((s) => s.mode);
  useMobileDetect();
  useKeyboardShortcuts();

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-mode',
      portfolioMode === 'scroll' ? 'scroll' : 'desktop'
    );
  }, [portfolioMode]);

  if (portfolioMode === 'scroll') {
    return <ScrollPortfolio />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Desktop />
      <WelcomeDialog />

      <AnimatePresence>
        {windows.map((win) => (
          <AppWindow key={win.id} window={win}>
            <AppContent appType={win.appType} fileId={win.fileId} />
          </AppWindow>
        ))}
      </AnimatePresence>

      <TaskBar />
    </div>
  );
}
