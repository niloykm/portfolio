import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  index?: string;
  badge?: string;
  label: string;
  subtitle?: string;
  meta?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  badge,
  label,
  subtitle,
  meta,
  children,
  className = '',
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-20 py-12 sm:py-16 ${className}`.trim()}
    >
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div className="space-y-2">
          {(badge || meta) && (
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-surface px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-muted dark:border-zinc-800/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span>{badge ?? meta}</span>
            </div>
          )}
          <h2
            id={headingId}
            className="text-h2 font-semibold tracking-tight text-ink"
          >
            {label}
          </h2>
        </div>
        {subtitle && (
          <p className="max-w-md text-sm text-muted sm:text-right">{subtitle}</p>
        )}
      </div>

      <div>{children}</div>
    </section>
  );
}
