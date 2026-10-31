'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { profile } from '@/data/profile';
import { NavLinks, type NavItem } from './NavLinks';
import { MobileMenu } from './MobileMenu';

type HeaderProps = {
  availability?: 'open' | 'limited' | 'closed';
  showNotes?: boolean;
};

const DEFAULT_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'AI & Architecture' },
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
    <header className="sticky top-0 z-40 w-full px-4 pt-3 sm:px-6">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-bg"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-zinc-200/80 bg-white/80 px-4 shadow-sm backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-zinc-900/80 sm:px-5">
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href="/#top"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-ink transition-colors hover:text-accent truncate"
          >
            <span className="truncate">Niloy Kumar Mohonta</span>
          </Link>
          {availability === 'open' && (
            <span
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 shrink-0"
              title="Available for Senior / Lead Roles"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
                aria-hidden="true"
              />
              <span>Available</span>
            </span>
          )}
        </div>

        <NavLinks items={navItems} />

        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={triggerPalette}
            aria-label="Search and commands (Command K)"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 font-mono text-xs text-muted transition-all duration-150 hover:border-ink/40 hover:text-ink"
          >
            <span>⌘K</span>
          </button>
          <ThemeToggle />
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-3.5 text-xs font-medium text-bg transition-opacity hover:opacity-90"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Resume PDF</span>
            </a>
          )}
        </div>

        <MobileMenu items={navItems} onOpenPalette={triggerPalette} />
      </div>
    </header>
  );
}
