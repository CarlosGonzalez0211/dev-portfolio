'use client';

import { techStackData } from '@/data/content';
import { Marquee } from '@/components/ui/Marquee';

export function VisualGridView() {
  return (
    <div className="p-6 space-y-6">
      {techStackData.map((category, i) => (
        <div key={category.category}>
          <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-3">
            {category.category}
          </h3>
          <Marquee speed={30 + (i % 3) * 10}>
            {category.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-alt border border-chrome/20 hover:border-accent/40 transition-colors whitespace-nowrap shrink-0"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-medium text-text-primary">{item.name}</span>
              </div>
            ))}
          </Marquee>
        </div>
      ))}
    </div>
  );
}
