'use client';

import { useEffect, useRef, useState } from 'react';
import { Kbd } from '@/components/ui/Kbd';
import { ThemeToggle } from '@/components/ThemeToggle';
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
    <div className="lg:hidden flex items-center gap-2">
      <ThemeToggle />
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu-sheet"
        className="inline-flex min-h-[44px] items-center gap-2 border border-border-subtle bg-bg-primary px-3 py-1.5 font-mono text-[12px] font-medium uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg"
      >
        <span>[MENU]</span>
      </button>

      {open && (
        <div
          ref={dialogRef}
          id="mobile-menu-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col bg-bg-primary text-ink"
        >
          <div className="flex h-14 items-center justify-between border-b border-border-subtle px-4 sm:px-6">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {"// "}NAVIGATION_INDEX
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex min-h-[44px] items-center justify-center border border-border-subtle bg-bg-primary px-3 font-mono text-xs uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg"
            >
              [CLOSE_X]
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-between p-6"
          >
            <ul className="divide-y divide-border-subtle border-y border-border-subtle">
              {items.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[52px] items-center justify-between px-3 py-3 font-mono text-base uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg"
                  >
                    <span>[{item.label}]</span>
                    <span className="font-mono text-xs text-muted">
                      {"// "}0{idx + 1} -&gt;
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
                className="flex w-full min-h-[44px] items-center justify-between border border-border-subtle bg-bg-primary px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg"
              >
                <span>[OPEN_COMMAND_PALETTE]</span>
                <Kbd>⌘K</Kbd>
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
