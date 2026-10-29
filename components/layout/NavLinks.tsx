'use client';

import { useEffect, useState } from 'react';

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
    <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`/#${item.id}`}
            aria-current={isActive ? 'location' : undefined}
            className={`px-2.5 py-1.5 font-mono text-[12px] uppercase tracking-wider transition-colors duration-100 ${
              isActive
                ? 'bg-ink text-bg font-medium'
                : 'text-muted hover:bg-ink hover:text-bg'
            }`}
          >
            [{item.label}]
          </a>
        );
      })}
    </nav>
  );
}
