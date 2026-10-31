'use client';

import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';

type CopyEmailProps = {
  email: string;
  label?: string;
  className?: string;
  variant?: 'inline' | 'button' | 'pill';
  showEmailText?: boolean;
};

export function CopyEmail({
  email,
  label = 'Copy Email',
  className = '',
  variant = 'pill',
  showEmailText = false,
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
    const id = window.setTimeout(() => setCopied(false), 2400);
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
      ? 'inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2 text-sm font-medium text-ink shadow-sm transition-all duration-150 hover:border-ink/40 hover:bg-bg-sunken'
      : variant === 'pill'
        ? 'inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2 text-xs sm:text-sm font-medium text-ink shadow-sm transition-all duration-150 hover:border-ink/40 hover:bg-bg-sunken'
        : 'inline-flex min-h-[38px] items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 text-xs font-medium text-ink transition-all duration-150 hover:border-ink/40 hover:bg-bg-sunken';

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy email address ${email}`}
        className={`${baseClass} ${className}`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Copied to clipboard!
            </span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 text-muted shrink-0" aria-hidden="true" />
            <span>{showEmailText ? `Copy Email (${email})` : label}</span>
          </>
        )}
      </button>

      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-zinc-900/95 px-4 py-2.5 text-xs font-medium text-zinc-100 shadow-lg backdrop-blur-md dark:bg-zinc-100/95 dark:text-zinc-900"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span>
            Copied <strong className="font-mono">{email}</strong>
          </span>
        </div>
      )}
    </>
  );
}
