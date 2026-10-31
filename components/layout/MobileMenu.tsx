'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X, FileText, Command as CommandIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { profile } from '@/data/profile';
import type { NavItem } from './NavLinks';

type MobileMenuProps = {
  items: NavItem[];
  onOpenPalette?: () => void;
};

export function MobileMenu({ items, onOpenPalette }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusables = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden flex items-center gap-2">
      <ThemeToggle />
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu-sheet"
        aria-label="Open navigation menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-ink transition-colors hover:bg-bg-sunken"
      >
        <Menu className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={dialogRef}
          id="mobile-menu-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col bg-bg-primary/95 p-4 text-ink backdrop-blur-xl"
        >
          <div className="flex items-center justify-between rounded-2xl border border-border-subtle bg-surface px-4 py-3">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted">
              Navigation
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-bg-sunken text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="mt-4 flex flex-1 flex-col justify-between rounded-2xl border border-border-subtle bg-surface p-5"
          >
            <ul className="divide-y divide-border-subtle/70">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 text-base font-medium text-ink transition-colors hover:text-accent"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-muted">→</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="space-y-2.5 pt-4">
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-bg"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <span>Resume PDF</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  if (onOpenPalette) {
                    onOpenPalette();
                  } else {
                    window.dispatchEvent(new CustomEvent('open-command-palette'));
                  }
                }}
                className="flex w-full items-center justify-between rounded-full border border-border-subtle bg-bg-sunken px-4 py-2.5 text-xs font-medium text-ink"
              >
                <span className="inline-flex items-center gap-1.5">
                  <CommandIcon className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                  <span>Command Menu</span>
                </span>
                <kbd className="font-mono text-[11px] text-muted">⌘K</kbd>
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
