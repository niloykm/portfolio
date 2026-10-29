'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { dur, ease } from '@/lib/motion';

type LineRevealProps = {
  lines: ReactNode[];
  id?: string;
  className?: string;
};

export function LineReveal({ lines, id, className = '' }: LineRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return (
      <h1 id={id} className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <m.span
            className="block"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: dur.reveal,
              ease: ease.out,
              delay: i * 0.07,
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </h1>
  );
}
