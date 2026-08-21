'use client';

import { aboutContent, interestsContent } from '@/data/content';

interface EditorViewProps {
  fileId: string;
}

export function EditorView({ fileId }: EditorViewProps) {
  if (fileId === 'about') return <AboutEditor />;
  if (fileId === 'interests') return <InterestsEditor />;
  if (fileId === 'contact') return <ContactEditor />;
  return <div className="p-6 text-text-muted">Unknown file</div>;
}

function AboutEditor() {
  return (
    <div className="p-6 space-y-4 font-mono text-sm">
      <div className="flex items-center gap-3 pb-3 border-b border-chrome/30">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-3xl">
          👨‍💻
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary">{aboutContent.headline}</h1>
          <p className="text-accent font-medium">{aboutContent.subtitle}</p>
          <p className="text-text-muted text-xs">📍 {aboutContent.location}</p>
        </div>
      </div>

      {aboutContent.bio.split('\n\n').map((paragraph, i) => (
        <p key={i} className="text-text-primary/85 leading-relaxed">
          {paragraph}
        </p>
      ))}

      <div className="flex gap-4 pt-3 border-t border-chrome/30">
        <a href={aboutContent.github} className="text-accent hover:underline text-xs">GitHub ↗</a>
        <a href={aboutContent.linkedin} className="text-accent hover:underline text-xs">LinkedIn ↗</a>
        <span className="text-text-muted text-xs">{aboutContent.email}</span>
      </div>
    </div>
  );
}

function InterestsEditor() {
  const lines = interestsContent.split('\n');
  return (
    <div className="p-6 font-mono text-sm space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith('# '))
          return <h1 key={i} className="text-lg font-bold text-text-primary pt-2">{line.slice(2)}</h1>;
        if (line.startsWith('## '))
          return <h2 key={i} className="text-base font-semibold text-accent pt-3 pb-1">{line.slice(3)}</h2>;
        if (line === '')
          return <div key={i} className="h-2" />;
        return <p key={i} className="text-text-primary/85 leading-relaxed">{line}</p>;
      })}
    </div>
  );
}

function ContactEditor() {
  return (
    <div className="p-6 space-y-5">
      <h2 className="text-lg font-bold text-text-primary">Get in touch</h2>
      <p className="text-text-muted text-sm">I&apos;d love to hear from you. Drop me a line!</p>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent"
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent"
        />
        <textarea
          placeholder="Your message..."
          rows={4}
          className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent resize-none"
        />
        <button className="px-5 py-2 rounded-lg bg-accent text-white font-medium text-sm hover:brightness-110 transition-all">
          Send Message
        </button>
      </div>

      <div className="flex gap-6 pt-3 border-t border-chrome/30">
        <a href={aboutContent.github} className="text-accent hover:underline text-sm">GitHub ↗</a>
        <a href={aboutContent.linkedin} className="text-accent hover:underline text-sm">LinkedIn ↗</a>
        <span className="text-text-muted text-sm">{aboutContent.email}</span>
      </div>
    </div>
  );
}
