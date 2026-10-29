'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="inline-flex h-11 min-w-[78px] items-center justify-center border border-border-subtle bg-bg-primary px-3 font-mono text-[12px] tracking-wider text-muted"
        aria-hidden="true"
      >
        [THEME]
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
      className="inline-flex h-11 min-h-[44px] min-w-[78px] items-center justify-center border border-border-subtle bg-bg-primary px-3 font-mono text-[12px] font-medium tracking-wider text-ink transition-colors duration-100 hover:border-ink hover:bg-ink hover:text-bg"
    >
      {isDark ? '[LIGHT]' : '[DARK]'}
    </button>
  );
}
