import type { ReactNode } from 'react';
import { GridSection } from '@/components/GridContainer';

type SectionProps = {
  id: string;
  index: string;
  label: string;
  meta?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  index,
  label,
  meta,
  children,
  className = '',
}: SectionProps) {
  return (
    <GridSection
      id={id}
      index={index}
      label={label}
      meta={meta}
      className={className}
    >
      {children}
    </GridSection>
  );
}
