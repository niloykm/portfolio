import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Rule } from '@/components/ui/Rule';

type SectionProps = {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  index,
  label,
  children,
  className = '',
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-20 ${className}`}
    >
      <Container>
        <Rule />
        <div className="section-pad grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3 lg:sticky lg:top-20 lg:self-start">
            <h2
              id={headingId}
              className="text-label text-muted flex items-center gap-2"
            >
              <span className="text-ink tabular-nums">{index}</span>
              <span aria-hidden="true" className="text-faint">
                —
              </span>
              <span>{label}</span>
            </h2>
          </div>
          <div className="lg:col-span-9 min-w-0">{children}</div>
        </div>
      </Container>
    </section>
  );
}
