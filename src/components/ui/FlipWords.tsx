'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface FlipWordsProps {
  words: string[];
  /** Time each word stays on screen, in ms */
  interval?: number;
  className?: string;
}

export function FlipWords({ words, interval = 4000, className = '' }: FlipWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
