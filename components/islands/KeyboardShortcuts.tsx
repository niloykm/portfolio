'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Kbd } from '@/components/ui/Kbd';
import { Label } from '@/components/ui/Label';
import { profile } from '@/data/profile';

type KeyboardShortcutsProps = {
  showNotesSection?: boolean;
};

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable
  ) {
    return true;
  }
  if (target.closest('[role="dialog"]')) {
    return true;
  }
  return false;
}

const SHORTCUT_ROWS = [
  { keys: ['⌘K', '/'], description: 'Open command palette' },
  { keys: ['t'], description: 'Toggle light / dark theme' },
  { keys: ['e'], description: 'Copy email address' },
  { keys: ['g', 'w'], description: 'Jump to Selected work' },
  { keys: ['g', 's'], description: 'Jump to Stack' },
  { keys: ['g', 'x'], description: 'Jump to Experience' },
  { keys: ['g', 'n'], description: 'Jump to Notes & Activity' },
  { keys: ['g', 'c'], description: 'Jump to Contact' },
  { keys: ['?'], description: 'Show keyboard shortcuts' },
];

export function KeyboardShortcuts({
  showNotesSection = false,
}: KeyboardShortcutsProps) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [helpOpen, setHelpOpen] = useState(false);
  const chordActiveRef = useRef(false);
  const chordTimeoutRef = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (helpOpen) {
      closeButtonRef.current?.focus();
    }
  }, [helpOpen]);

  useEffect(() => {
    const clearChord = () => {
      chordActiveRef.current = false;
      if (chordTimeoutRef.current !== null) {
        window.clearTimeout(chordTimeoutRef.current);
        chordTimeoutRef.current = null;
      }
    };

    const jumpToSection = (sectionId: string) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/#${sectionId}`);
      }
    };

    const onOpenShortcuts = () => setHelpOpen(true);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && helpOpen) {
        e.preventDefault();
        setHelpOpen(false);
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditableTarget(e.target)) return;

      const key = e.key.toLowerCase();

      if (chordActiveRef.current) {
        clearChord();
        if (key === 'w') {
          e.preventDefault();
          jumpToSection('work');
          return;
        }
        if (key === 's') {
          e.preventDefault();
          jumpToSection('stack');
          return;
        }
        if (key === 'x') {
          e.preventDefault();
          jumpToSection('experience');
          return;
        }
        if (key === 'n' && showNotesSection) {
          e.preventDefault();
          jumpToSection('notes');
          return;
        }
        if (key === 'c') {
          e.preventDefault();
          jumpToSection('contact');
          return;
        }
      }

      if (key === 'g' && !e.shiftKey) {
        chordActiveRef.current = true;
        chordTimeoutRef.current = window.setTimeout(clearChord, 800);
        return;
      }

      if (key === 't' && !e.shiftKey) {
        e.preventDefault();
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        return;
      }

      if (key === 'e' && !e.shiftKey) {
        e.preventDefault();
        navigator.clipboard?.writeText(profile.email).catch(() => {});
        window.dispatchEvent(new CustomEvent('trigger-copy-email'));
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setHelpOpen((prev) => !prev);
      }
    };

    window.addEventListener('open-shortcuts-sheet', onOpenShortcuts);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearChord();
      window.removeEventListener('open-shortcuts-sheet', onOpenShortcuts);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [helpOpen, resolvedTheme, router, setTheme, showNotesSection]);

  if (!helpOpen) return null;

  const visibleRows = showNotesSection
    ? SHORTCUT_ROWS
    : SHORTCUT_ROWS.filter((r) => !(r.keys[0] === 'g' && r.keys[1] === 'n'));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-ink/35"
        onClick={() => setHelpOpen(false)}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-panel border border-border-strong bg-surface p-6 text-ink shadow-palette">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
          <Label as="h3" className="text-ink">
            <span id="shortcuts-dialog-title">Keyboard shortcuts</span>
          </Label>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setHelpOpen(false)}
            aria-label="Close keyboard shortcuts"
          >
            <Kbd>Esc</Kbd>
          </button>
        </div>

        <dl className="divide-y divide-border text-secondary">
          {visibleRows.map((row) => (
            <div
              key={row.description}
              className="flex items-center justify-between gap-4 py-2.5"
            >
              <dt className="text-ink-2">{row.description}</dt>
              <dd className="flex items-center gap-1 shrink-0">
                {row.keys.map((k, idx) => (
                  <Kbd key={idx}>{k}</Kbd>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
