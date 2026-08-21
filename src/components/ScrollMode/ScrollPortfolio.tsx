'use client';

import { motion } from 'framer-motion';
import { useModeStore } from '@/store/useModeStore';
import { useThemeStore } from '@/store/useThemeStore';
import { ScrollSection } from './ScrollSection';
import { FlipWords } from '@/components/ui/FlipWords';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Marquee } from '@/components/ui/Marquee';
import {
  aboutContent,
  experienceData,
  projectsData,
  techStackData,
  tripsData,
  testimonialsData,
  certsData,
  interestsContent,
} from '@/data/content';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'techstack', label: 'Stack' },
  { id: 'trips', label: 'Trips' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'certs', label: 'Certs' },
  { id: 'interests', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
];

export function ScrollPortfolio() {
  const toggleMode = useModeStore((s) => s.toggleMode);
  const { mode: theme, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-surface overflow-y-auto">
      {/* Skip to content */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm"
      >
        Skip to content
      </a>

      {/* Floating Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[8000] bg-surface/80 backdrop-blur-md border-b border-chrome/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 h-12">
          <span className="text-sm font-bold text-accent">CG</span>
          <div className="flex items-center gap-4 overflow-x-auto">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs text-text-muted hover:text-accent transition-colors shrink-0"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleTheme}
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-chrome/40 transition-colors text-sm"
            >
              {theme === 'night' ? '☀️' : '🌙'}
            </button>
            <button
              onClick={toggleMode}
              className="text-[10px] text-accent hover:underline shrink-0"
            >
              Desktop Mode
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-4xl mx-auto mb-4">
          👨‍💻
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          {aboutContent.headline.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em] last:mr-0"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.15 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <p className="text-lg text-accent font-medium mb-4">
          <FlipWords
            words={[
              'Software Engineer',
              'AI Builder',
              'Full-Stack Developer',
              'GDG President',
            ]}
          />
        </p>
        <p className="text-text-muted max-w-lg mx-auto text-sm leading-relaxed">
          {aboutContent.bio.split('\n\n')[0]}
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <a
            href="/resume.pdf"
            download
            className="px-5 py-2 rounded-lg bg-accent text-white font-medium text-sm hover:brightness-110 transition-all"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg border border-accent/40 text-accent font-medium text-sm hover:bg-accent/10 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* About */}
      <ScrollSection id="about">
        <SectionHeading emoji="📄" title="About Me" />
        <div className="space-y-3">
          {aboutContent.bio.split('\n\n').map((p, i) => (
            <p key={i} className="text-sm text-text-primary/85 leading-relaxed">{p}</p>
          ))}
        </div>
      </ScrollSection>

      {/* Experience */}
      <ScrollSection id="experience">
        <SectionHeading emoji="💼" title="Experience" />
        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-accent/30" />
          <div className="space-y-8">
            {experienceData.map((job, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-5 top-1.5 w-4 h-4 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-text-primary">{job.role}</h3>
                  <span className="text-xs text-text-muted font-mono shrink-0">{job.period}</span>
                </div>
                <p className="text-xs font-medium text-accent mb-1">{job.company}</p>
                <p className="text-xs text-text-muted mb-2">{job.description}</p>
                <ul className="space-y-1">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="text-xs text-text-primary/80 pl-3 relative before:content-['→'] before:absolute before:left-0 before:text-accent">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Projects */}
      <ScrollSection id="projects">
        <SectionHeading emoji="🚀" title="Projects" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projectsData.map((project) => (
            <SpotlightCard key={project.name} className="rounded-xl">
              <div className="rounded-xl bg-surface-alt border border-chrome/20 overflow-hidden h-full">
                <div className="h-32 bg-chrome/20 flex items-center justify-center">
                  <span className="text-4xl opacity-30">🖼️</span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-text-primary">{project.name}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-1">
                    {project.link && <a href={project.link} className="text-accent text-xs hover:underline">Live ↗</a>}
                    {project.github && <a href={project.github} className="text-accent text-xs hover:underline">Code ↗</a>}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </ScrollSection>

      {/* Tech Stack */}
      <ScrollSection id="techstack">
        <SectionHeading emoji="🛠️" title="Tech Stack" />
        <div className="space-y-5">
          {techStackData.map((cat, i) => (
            <div key={cat.category}>
              <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{cat.category}</h3>
              <Marquee speed={30 + (i % 3) * 10}>
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-alt border border-chrome/20 whitespace-nowrap shrink-0">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs font-medium text-text-primary">{item.name}</span>
                  </div>
                ))}
              </Marquee>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Trips */}
      <ScrollSection id="trips">
        <SectionHeading emoji="✈️" title="Professional Trips" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tripsData.map((trip, i) => (
            <div key={i} className="rounded-xl bg-surface-alt border border-chrome/20 overflow-hidden">
              <div className="h-28 bg-chrome/20 flex items-center justify-center relative">
                <span className="text-4xl opacity-30">📸</span>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-text-muted bg-surface/70 px-2 py-0.5 rounded">{trip.date}</span>
              </div>
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-bold text-text-primary">{trip.title}</h3>
                <p className="text-xs text-accent">📍 {trip.location}</p>
                <p className="text-xs text-text-muted">{trip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Testimonials */}
      <ScrollSection id="testimonials">
        <SectionHeading emoji="💬" title="Testimonials" />
        <div className="space-y-4">
          {testimonialsData.map((t, i) => (
            <div key={i} className="p-4 rounded-xl bg-surface-alt border border-chrome/20">
              <p className="text-sm text-text-primary/90 italic leading-relaxed mb-3">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">{t.name.charAt(0)}</div>
                <div>
                  <p className="text-xs font-bold text-text-primary">{t.name}</p>
                  <p className="text-[10px] text-text-muted">{t.role} @ {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Certifications */}
      <ScrollSection id="certs">
        <SectionHeading emoji="📜" title="Certifications & Education" />
        <div className="space-y-3">
          {certsData.map((cert, i) => (
            <div key={i} className="pixel-panel flex flex-col gap-3 bg-surface-alt p-4 sm:flex-row sm:items-start">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-xl shrink-0">📜</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-text-primary">{cert.name}</h3>
                <p className="text-xs text-text-muted">{cert.issuer}</p>
                <p className="mt-2 text-xs leading-relaxed text-text-primary/80">{cert.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => <span key={skill} className="pixel-tag">{skill}</span>)}
                </div>
              </div>
              <span className="text-xs font-mono text-text-muted sm:text-right">{cert.date}</span>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Interests */}
      <ScrollSection id="interests">
        <SectionHeading emoji="🎮" title="Interests" />
        <div className="space-y-1 font-mono text-sm">
          {interestsContent.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return null;
            if (line.startsWith('## '))
              return <h3 key={i} className="text-base font-semibold text-accent pt-3 pb-1">{line.slice(3)}</h3>;
            if (line === '') return <div key={i} className="h-2" />;
            return <p key={i} className="text-text-primary/85 leading-relaxed">{line}</p>;
          })}
        </div>
      </ScrollSection>

      {/* Contact */}
      <ScrollSection id="contact">
        <SectionHeading emoji="📬" title="Get in Touch" />
        <div className="max-w-md mx-auto space-y-3">
          <input type="text" placeholder="Your name" className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent" />
          <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent" />
          <textarea placeholder="Your message..." rows={4} className="w-full px-3 py-2 rounded-lg bg-surface-alt border border-chrome/30 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent resize-none" />
          <button className="w-full px-5 py-2.5 rounded-lg bg-accent text-white font-medium text-sm hover:brightness-110 transition-all">
            Send Message
          </button>
          <div className="flex justify-center gap-6 pt-3">
            <a href={aboutContent.github} className="text-accent hover:underline text-sm">GitHub ↗</a>
            <a href={aboutContent.linkedin} className="text-accent hover:underline text-sm">LinkedIn ↗</a>
            <span className="text-text-muted text-sm">{aboutContent.email}</span>
          </div>
        </div>
      </ScrollSection>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-text-muted border-t border-chrome/20">
        <p>Built with Next.js, Tailwind, and Framer Motion</p>
        <button onClick={toggleMode} className="mt-2 text-accent hover:underline">
          Switch to Desktop Mode ↗
        </button>
      </footer>
    </div>
  );
}

function SectionHeading({ emoji, title }: { emoji: string; title: string }) {
  return (
    <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
      <span>{emoji}</span> {title}
    </h2>
  );
}
