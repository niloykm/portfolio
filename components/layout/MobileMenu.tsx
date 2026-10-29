'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Kbd } from '@/components/ui/Kbd';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
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
        className="inline-flex min-h-[44px] items-center gap-2 rounded-control border border-border bg-surface px-3 py-1.5 text-meta text-ink transition-colors hover:border-border-strong active:scale-[0.98]"
      >
        <span>Menu</span>
        <Kbd>⌘K</Kbd>
      </button>

      {open && (
        <div
          ref={dialogRef}
          id="mobile-menu-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col bg-bg text-ink"
        >
          <div className="flex h-14 items-center justify-between border-b border-border px-4 sm:px-6">
            <span className="text-label text-muted">Navigation</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-control border border-border bg-surface text-ink hover:border-border-strong"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-between p-6"
          >
            <ul className="divide-y divide-border border-y border-border">
              {items.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[52px] items-center justify-between py-3 text-h3 text-ink transition-colors hover:text-accent"
                  >
                    <span>{item.label}</span>
                    <span className="text-meta text-muted">
                      0{idx + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="space-y-3 pt-6">
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
                className="flex w-full min-h-[44px] items-center justify-between rounded-control border border-border bg-surface px-4 py-2.5 text-meta text-ink hover:border-border-strong"
              >
                <span>Open command palette</span>
                <Kbd>⌘K</Kbd>
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
