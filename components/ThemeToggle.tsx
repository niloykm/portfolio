'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-muted"
        aria-hidden="true"
      >
        <span className="sr-only">Theme</span>
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme (t)' : 'Switch to dark theme (t)'}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 font-mono text-xs font-medium text-ink transition-all duration-150 hover:border-ink/40 hover:bg-bg-sunken"
    >
      {isDark ? (
        <>
          <Sun className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">[LIGHT]</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-zinc-600" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">[DARK]</span>
        </>
      )}
    </button>
  );
}
