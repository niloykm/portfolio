import type { ReactNode } from 'react';

type TagProps = {
  children: ReactNode;
  className?: string;
};

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-tag border border-border bg-surface px-2 py-0.5 text-meta text-ink-2 ${className}`}
    >
      {children}
    </span>
  );
}
