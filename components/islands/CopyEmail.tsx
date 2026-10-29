'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { dur } from '@/lib/motion';

type CopyEmailProps = {
  email: string;
  label?: string;
  className?: string;
  variant?: 'inline' | 'button';
};

export function CopyEmail({
  email,
  label = 'Copy email',
  className = '',
  variant = 'inline',
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onExternalCopy = () => {
      navigator.clipboard?.writeText(email).catch(() => {});
      setCopied(true);
    };
    window.addEventListener('trigger-copy-email', onExternalCopy);
    return () =>
      window.removeEventListener('trigger-copy-email', onExternalCopy);
  }, [email]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(true);
    }
  };

  const baseClass =
    variant === 'button'
      ? 'inline-flex min-h-[44px] items-center justify-center rounded-control border border-border bg-surface px-4 py-2 text-meta text-ink transition-colors duration-[120ms] hover:border-border-strong hover:bg-surface-raised active:scale-[0.98]'
      : 'inline-flex min-h-[44px] items-center text-meta text-ink-2 underline decoration-border-strong underline-offset-[3px] transition-colors duration-[120ms] hover:text-accent hover:decoration-accent active:scale-[0.98]';

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy email address ${email}`}
      className={`${baseClass} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <m.span
            key="copied"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: dur.hover }}
            className="text-success"
          >
            Copied ✓
          </m.span>
        ) : (
          <m.span
            key="copy"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: dur.hover }}
          >
            {label}
          </m.span>
        )}
      </AnimatePresence>
    </button>
  );
}
