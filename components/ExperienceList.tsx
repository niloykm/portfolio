import type { ExperienceEntry } from '@/data/experience';
import { isFilled } from '@/lib/filled';

type ExperienceListProps = {
  items: ExperienceEntry[];
};

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <div className="divide-y divide-border-subtle">
      {items.map((entry, idx) => {
        const hasLink = isFilled(entry.href);
        const hasPeriod = isFilled(entry.period);
        const indexCode = String(idx + 1).padStart(2, '0');

        return (
          <div
            key={`${entry.organisation}-${entry.role}`}
            className="grid grid-cols-1 divide-y divide-border-subtle md:grid-cols-12 md:divide-y-0 md:divide-x"
          >
            {/* Left Column: Year / Period & Kind (Monospace) */}
            <div className="flex flex-row items-baseline justify-between p-4 sm:px-6 md:col-span-4 md:flex-col md:justify-start md:gap-1.5">
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-ink tabular-nums">
                {hasPeriod
                  ? entry.period
                  : entry.kind === 'education'
                    ? '[ACADEMIC_RECORD]'
                    : `[ROLE_${indexCode}]`}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {"// "}{entry.kind.toUpperCase()}
                {isFilled(entry.location)
                  ? ` :: ${entry.location.toUpperCase()}`
                  : ''}
              </span>
            </div>

            {/* Right Column: Role, Company, and Engineering Impact */}
            <div className="p-4 sm:px-6 md:col-span-8 space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-sans text-base font-semibold tracking-tight text-ink sm:text-lg">
                  <span>{entry.role}</span>
                  <span className="mx-2 font-mono text-xs text-muted">{"//"}</span>
                  {hasLink && entry.href ? (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-border-subtle underline-offset-4 hover:text-accent hover:decoration-accent"
                    >
                      {entry.organisation} -&gt;
                    </a>
                  ) : (
                    <span>{entry.organisation}</span>
                  )}
                </h3>
              </div>

              <p className="text-secondary text-muted measure">
                {entry.summary}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
