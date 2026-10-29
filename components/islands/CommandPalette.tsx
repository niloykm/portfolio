'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const CommandPaletteDialog = dynamic(() => import('./CommandPaletteDialog'), {
  ssr: false,
});

type CommandPaletteProps = {
  notes?: { slug: string; title: string }[];
  showNotesSection?: boolean;
};

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable
  );
}

export function CommandPalette({
  notes = [],
  showNotesSection = false,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      const id = win.requestIdleCallback(() => setShouldLoad(true));
      return () => win.cancelIdleCallback?.(id);
    } else {
      const id = window.setTimeout(() => setShouldLoad(true), 1500);
      return () => window.clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    const handleOpenEvent = () => {
      setShouldLoad(true);
      setOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShouldLoad(true);
        setOpen((prev) => !prev);
        return;
      }

      if (
        e.key === '/' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !isEditableTarget(e.target)
      ) {
        e.preventDefault();
        setShouldLoad(true);
        setOpen(true);
      }
    };

    window.addEventListener('open-command-palette', handleOpenEvent);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-command-palette', handleOpenEvent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!shouldLoad && !open) return null;

  return (
    <CommandPaletteDialog
      open={open}
      onOpenChange={setOpen}
      notes={notes}
      showNotesSection={showNotesSection}
    />
  );
}
