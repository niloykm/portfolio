import type { ReactNode, HTMLAttributes } from 'react';
import { Section } from '@/components/layout/Section';

type GridContainerProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
  children: ReactNode;
  borderedTop?: boolean;
  borderedBottom?: boolean;
};

export function GridContainer({
  as: Component = 'div',
  children,
  className = '',
  ...rest
}: GridContainerProps) {
  return (
    <Component className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
}

type GridSectionProps = {
  id: string;
  index: string;
  label: string;
  meta?: string;
  children: ReactNode;
  className?: string;
};

export function GridSection({
  id,
  index,
  label,
  meta,
  children,
  className = '',
}: GridSectionProps) {
  return (
    <Section
      id={id}
      index={index}
      label={label.replace(/_/g, ' ')}
      meta={meta}
      className={className}
    >
      {children}
    </Section>
  );
}
