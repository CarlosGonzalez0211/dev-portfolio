'use client';

import { tripsData } from '@/data/content';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export function GalleryView() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-2 gap-4">
        {tripsData.map((trip, i) => (
          <SpotlightCard key={i} className="rounded-xl">
            <div className="rounded-xl bg-surface-alt border border-chrome/20 overflow-hidden group h-full">
              {/* Photo placeholder */}
              <div className="h-36 bg-chrome/20 flex items-center justify-center relative">
                <span className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">📸</span>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-text-muted bg-surface/70 px-2 py-0.5 rounded">
                  {trip.date}
                </span>
              </div>

              <div className="p-3 space-y-1">
                <h3 className="text-sm font-bold text-text-primary">{trip.title}</h3>
                <p className="text-xs text-accent font-medium">📍 {trip.location}</p>
                <p className="text-xs text-text-muted leading-relaxed">{trip.description}</p>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
