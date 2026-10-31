import {
  Briefcase,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Sparkles,
} from 'lucide-react';
import type { ExperienceEntry } from '@/data/experience';

export type ExperienceListProps = {
  items: ExperienceEntry[];
};

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <div className="relative space-y-5 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800 sm:before:left-6">
      {items.map((item) => {
        const isEducation = item.kind === 'education';
        return (
          <article
            key={item.id}
            className="relative pl-12 sm:pl-16"
          >
            {/* Timeline Stepper Node */}
            <div
              aria-hidden="true"
              className={`absolute left-1.5 top-6 flex h-7 w-7 items-center justify-center rounded-full border shadow-sm sm:left-2.5 ${
                item.current
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'border-zinc-200 bg-surface text-muted dark:border-zinc-800'
              }`}
            >
              {isEducation ? (
                <GraduationCap className="h-3.5 w-3.5" />
              ) : (
                <Briefcase className="h-3.5 w-3.5" />
              )}
            </div>

            <div className="bento-card p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {item.role}
                    </h3>
                    <span className="text-muted">•</span>
                    <span className="text-base font-medium text-accent">
                      {item.organisation}
                    </span>
                    {item.current && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                    <span>{item.period}</span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                {item.metricBadge && (
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 font-mono text-xs font-medium text-blue-700 dark:text-blue-300 shrink-0">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    <span>{item.metricBadge}</span>
                  </span>
                )}
              </div>

              <ul className="mt-4 space-y-2 text-sm text-muted">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/80"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-ink/90">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-zinc-200/70 pt-3.5 dark:border-zinc-800/70">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200/80 bg-bg-sunken px-2.5 py-0.5 font-mono text-[11px] text-muted dark:border-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
