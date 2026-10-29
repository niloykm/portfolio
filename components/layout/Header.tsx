'use client';

import Link from 'next/link';
import { Kbd } from '@/components/ui/Kbd';
import { ThemeToggle } from '@/components/ThemeToggle';
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
  const navItems = showNotes
    ? DEFAULT_ITEMS
    : DEFAULT_ITEMS.filter((item) => item.id !== 'notes');

  const triggerPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-border-subtle bg-bg-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2.5 focus:z-50 focus:bg-ink focus:px-3 focus:py-1.5 focus:font-mono focus:text-xs focus:text-bg"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-full w-full max-w-container items-center justify-between gap-4 border-x border-border-subtle px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/#top"
            className="font-mono text-sm font-semibold uppercase tracking-wider text-ink transition-colors duration-100 hover:text-accent"
          >
            {"// "}NILOY_KM
          </Link>
          {availability === 'open' && (
            <span
              className="hidden sm:inline-flex items-center gap-1.5 border border-border-subtle px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ink"
              title="Open to work"
            >
              <span
                className="h-2 w-2 bg-success"
                aria-hidden="true"
              />
              <span>OPEN_TO_WORK</span>
            </span>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <NavLinks items={navItems} />
          <div className="mx-1 h-4 w-px bg-border-subtle" aria-hidden="true" />
          <button
            type="button"
            onClick={triggerPalette}
            aria-label="Search and commands (Command K)"
            className="inline-flex h-11 min-h-[44px] items-center gap-2 border border-border-subtle bg-bg-primary px-3 font-mono text-[12px] uppercase tracking-wider text-muted transition-colors duration-100 hover:border-ink hover:bg-ink hover:text-bg"
          >
            <span>[CMD]</span>
            <Kbd>⌘K</Kbd>
          </button>
          <ThemeToggle />
        </div>

        <MobileMenu items={navItems} onOpenPalette={triggerPalette} />
      </div>
    </header>
  );
}
