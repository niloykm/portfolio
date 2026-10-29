'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Kbd } from '@/components/ui/Kbd';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { NavLinks, type NavItem } from './NavLinks';
import { MobileMenu } from './MobileMenu';

type HeaderProps = {
  availability?: 'open' | 'limited' | 'closed';
  showNotes?: boolean;
};

const DEFAULT_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'notes', label: 'Notes' },
  { id: 'contact', label: 'Contact' },
];

export function Header({
  availability = 'open',
  showNotes = false,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = showNotes
    ? DEFAULT_ITEMS
    : DEFAULT_ITEMS.filter((item) => item.id !== 'notes');

  const triggerPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <header
      className={`sticky top-0 z-40 h-14 bg-bg transition-colors duration-[120ms] ${
        scrolled ? 'border-b border-border' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2.5 focus:z-50 focus:rounded-control focus:bg-ink focus:px-3 focus:py-1.5 focus:font-mono focus:text-xs focus:text-bg"
      >
        Skip to main content
      </a>

      <Container className="flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Link
            href="/#top"
            className="font-sans text-base font-medium tracking-tight text-ink hover:text-accent transition-colors"
          >
            Niloy
          </Link>
          {availability === 'open' && (
            <span
              className="inline-flex items-center gap-1.5"
              title="Open to work"
            >
              <span
                className="h-2 w-2 rounded-full bg-success ring-2 ring-accent/25"
                aria-hidden="true"
              />
              <span className="sr-only">Open to work</span>
            </span>
          )}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <NavLinks items={navItems} />
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <button
            type="button"
            onClick={triggerPalette}
            aria-label="Search and commands (Command K)"
            className="inline-flex h-11 items-center gap-2 rounded-control border border-border bg-surface px-3 text-meta text-muted transition-colors hover:border-border-strong hover:text-ink active:scale-[0.98]"
          >
            <span>Search</span>
            <Kbd>⌘K</Kbd>
          </button>
          <ThemeToggle />
        </div>

        <MobileMenu items={navItems} onOpenPalette={triggerPalette} />
      </Container>
    </header>
  );
}
