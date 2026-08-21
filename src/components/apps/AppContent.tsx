'use client';

import type { AppType } from '@/data/desktopFiles';
import { EditorView } from './EditorView';
import { ExplorerView } from './ExplorerView';
import { TimelineView } from './TimelineView';
import { VisualGridView } from './VisualGridView';
import { GalleryView } from './GalleryView';
import { ListView } from './ListView';
import { FolderView } from './FolderView';

interface AppContentProps {
  appType: AppType;
  fileId: string;
}

export function AppContent({ appType, fileId }: AppContentProps) {
  switch (appType) {
    case 'editor':
      return <EditorView fileId={fileId} />;
    case 'explorer':
      return <ExplorerView />;
    case 'timeline':
      return <TimelineView />;
    case 'visualGrid':
      return <VisualGridView />;
    case 'gallery':
      return <GalleryView />;
    case 'listView':
      return <ListView fileId={fileId} />;
    case 'folder':
      return <FolderView />;
    default:
      return (
        <div className="p-6 text-text-muted text-sm">
          Unknown app type: {appType}
        </div>
      );
  }
}
