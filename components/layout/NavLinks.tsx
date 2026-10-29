'use client';

import { useEffect, useState } from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';

export type NavItem = {
  id: string;
  label: string;
};

type NavLinksProps = {
  items: NavItem[];
};

export function NavLinks({ items }: NavLinksProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const ids = items.map((i) => i.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <LazyMotion features={domAnimation}>
      <nav aria-label="Primary" className="hidden md:flex items-center gap-5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={`relative py-1.5 text-meta transition-colors duration-[120ms] ${
                isActive ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <span>{item.label}</span>
              {isActive && (
                <m.span
                  layoutId="nav-active"
                  className="absolute inset-x-0 bottom-0 h-[1.5px] bg-accent"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 38,
                    mass: 0.8,
                  }}
                />
              )}
            </a>
          );
        })}
      </nav>
    </LazyMotion>
  );
}
