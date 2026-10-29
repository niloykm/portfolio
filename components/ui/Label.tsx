import type { ReactNode } from 'react';

type LabelProps = {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'p' | 'div' | 'dt' | 'h3' | 'h4';
};

export function Label({
  children,
  className = '',
  as: Component = 'span',
}: LabelProps) {
  return (
    <Component className={`text-label text-muted ${className}`}>
      {children}
    </Component>
  );
}
