'use client';

import { motion } from 'framer-motion';

interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function ScrollSection({ id, children, className = '' }: ScrollSectionProps) {
  return (
    <motion.section
      id={id}
      className={`px-6 py-16 max-w-4xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
