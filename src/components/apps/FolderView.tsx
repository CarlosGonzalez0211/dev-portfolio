'use client';

import { useState } from 'react';
import { trashFiles } from '@/data/content';

export function FolderView() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const selected = trashFiles.find((f) => f.name === selectedFile);

  return (
    <div className="flex h-full">
      {/* File list sidebar */}
      <div className="w-48 border-r border-chrome/20 p-2 shrink-0">
        <p className="text-[10px] font-mono text-text-muted px-2 py-1 uppercase tracking-wider">
          Recently Deleted
        </p>
        {trashFiles.map((file) => (
          <button
            key={file.name}
            onClick={() => setSelectedFile(file.name)}
            className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-colors ${
              selectedFile === file.name
                ? 'bg-accent/20 text-accent'
                : 'text-text-primary/80 hover:bg-chrome/30'
            }`}
          >
            🗑️ {file.name}
          </button>
        ))}
      </div>

      {/* File content preview */}
      <div className="flex-1 p-4">
        {selected ? (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-text-primary font-mono">
              {selected.name}
            </h3>
            <pre className="text-xs text-text-muted whitespace-pre-wrap font-mono leading-relaxed">
              {selected.content}
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-muted text-sm">
            Select a file to preview
          </div>
        )}
      </div>
    </div>
  );
}
