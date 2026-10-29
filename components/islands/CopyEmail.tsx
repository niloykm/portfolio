'use client';

import { useEffect, useState } from 'react';

type CopyEmailProps = {
  email: string;
  label?: string;
  className?: string;
  variant?: 'inline' | 'button';
};

export function CopyEmail({
  email,
  label = '[COPY_EMAIL]',
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
      ? 'inline-flex min-h-[44px] items-center justify-center border border-border-subtle bg-bg-primary px-4 py-2 font-mono text-[12px] font-medium uppercase tracking-wider text-ink transition-colors duration-100 hover:border-ink hover:bg-ink hover:text-bg'
      : 'inline-flex min-h-[44px] items-center border border-border-subtle bg-bg-primary px-3 py-2 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors duration-100 hover:border-ink hover:bg-ink hover:text-bg';

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy email address ${email}`}
      className={`${baseClass} ${className}`}
    >
      {copied ? (
        <span className="text-success">[COPIED_OK]</span>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
