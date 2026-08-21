'use client';

import { experienceData } from '@/data/content';

export function TimelineView() {
  return (
    <div className="p-6">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-accent/30" />

        <div className="space-y-8">
          {experienceData.map((job, i) => (
            <div key={i} className="relative pl-10">
              {/* Dot on timeline */}
              <div className="absolute left-1 top-1.5 w-5 h-5 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-text-primary">{job.role}</h3>
                  <span className="text-xs text-text-muted shrink-0 font-mono">{job.period}</span>
                </div>
                <p className="text-xs font-medium text-accent">{job.company}</p>
                <p className="text-xs text-text-muted leading-relaxed">{job.description}</p>
                <ul className="space-y-1">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="text-xs text-text-primary/80 pl-3 relative before:content-['→'] before:absolute before:left-0 before:text-accent">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
