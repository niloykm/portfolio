import type { ReactNode } from 'react';

type TagProps = {
  children: ReactNode;
  className?: string;
};

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center border border-border-subtle bg-bg-primary px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ink ${className}`}
    >
      {children}
    </span>
  );
}
