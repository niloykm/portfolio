import type { ReactNode } from 'react';

type KbdProps = {
  children: ReactNode;
  className?: string;
};

export function Kbd({ children, className = '' }: KbdProps) {
  return (
    <kbd
      className={`inline-flex items-center justify-center border border-border-subtle bg-bg-primary px-1.5 py-0.5 font-mono text-[11px] leading-none text-muted tabular-nums ${className}`}
    >
      {children}
    </kbd>
  );
}
