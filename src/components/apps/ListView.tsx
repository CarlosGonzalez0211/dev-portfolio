'use client';

import { testimonialsData, certsData } from '@/data/content';

interface ListViewProps {
  fileId: string;
}

export function ListView({ fileId }: ListViewProps) {
  if (fileId === 'testimonials') return <TestimonialsView />;
  if (fileId === 'certs') return <CertsView />;
  return <div className="p-6 text-text-muted">Unknown list</div>;
}

function TestimonialsView() {
  return (
    <div className="p-6 space-y-4">
      {testimonialsData.map((t, i) => (
        <div
          key={i}
          className="p-4 rounded-xl bg-surface-alt border border-chrome/20 space-y-3"
        >
          <p className="text-sm text-text-primary/90 italic leading-relaxed">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-text-primary">{t.name}</p>
              <p className="text-[10px] text-text-muted">
                {t.role} @ {t.company}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CertsView() {
  return (
    <div className="p-6 space-y-3">
      {certsData.map((cert, i) => (
        <div
          key={i}
          className="pixel-panel flex flex-col gap-3 bg-surface-alt p-4 sm:flex-row sm:items-start"
        >
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-xl shrink-0">
            📜
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-text-primary">{cert.name}</h3>
            <p className="text-xs text-text-muted">{cert.issuer}</p>
            <p className="mt-2 text-xs leading-relaxed text-text-primary/80">{cert.description}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {cert.skills.map((skill) => <span key={skill} className="pixel-tag">{skill}</span>)}
            </div>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <span className="text-xs font-mono text-text-muted">{cert.date}</span>
            {cert.credential && (
              <p className="text-[10px] text-accent">ID: {cert.credential}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
