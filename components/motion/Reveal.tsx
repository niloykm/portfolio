'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      variants={fadeUp}
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={
        delay > 0
          ? { ...fadeUp.show.transition, delay }
          : fadeUp.show.transition
      }
    >
      {children}
    </m.div>
  );
}
