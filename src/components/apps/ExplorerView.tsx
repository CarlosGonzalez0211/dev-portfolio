'use client';

import { projectsData } from '@/data/content';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export function ExplorerView() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-2 gap-4">
        {projectsData.map((project) => (
          <SpotlightCard key={project.name} className="rounded-xl">
            <div className="rounded-xl bg-surface-alt border border-chrome/20 overflow-hidden hover:border-accent/40 transition-colors group h-full">
              {/* Project thumbnail placeholder */}
              <div className="h-32 bg-chrome/30 flex items-center justify-center">
                <span className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">🖼️</span>
              </div>

              <div className="p-3 space-y-2">
                <h3 className="text-sm font-bold text-text-primary">{project.name}</h3>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-1">
                  {project.link && (
                    <a href={project.link} className="text-accent text-xs hover:underline">
                      Live ↗
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} className="text-accent text-xs hover:underline">
                      Code ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
