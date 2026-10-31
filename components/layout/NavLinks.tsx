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
    <nav
      aria-label="Primary"
      className="hidden md:flex items-center gap-1 rounded-full border border-border-subtle/80 bg-bg-sunken/70 p-1"
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`/#${item.id}`}
            aria-current={isActive ? 'location' : undefined}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 ${
              isActive
                ? 'bg-ink text-bg shadow-sm'
                : 'text-muted hover:text-ink'
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
