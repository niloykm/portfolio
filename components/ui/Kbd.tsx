import type { ReactNode } from 'react';

type KbdProps = {
  children: ReactNode;
  className?: string;
};

export function Kbd({ children, className = '' }: KbdProps) {
  return (
    <kbd
      className={`inline-flex items-center justify-center rounded-tag border border-border bg-bg-sunken px-1.5 py-0.5 font-mono text-[11px] leading-none text-ink-2 tabular-nums ${className}`}
    >
      {children}
    </kbd>
  );
}
