import Link from 'next/link';
import type { Project } from '@/data/projects';
import { isFilled } from '@/lib/filled';

type WorkIndexProps = {
  projects: Project[];
};

export function WorkIndex({ projects }: WorkIndexProps) {
  const showYear = projects.some((p) => isFilled(p.year));

  return (
    <div className="border-y border-border">
      <div className="hidden sm:grid sm:grid-cols-12 sm:gap-4 border-b border-border py-2 text-label text-muted">
        <div className="sm:col-span-1">No.</div>
        <div className="sm:col-span-3">Title</div>
        <div className={showYear ? 'sm:col-span-2' : 'sm:col-span-3'}>Role</div>
        {showYear && <div className="sm:col-span-1">Year</div>}
        <div className="sm:col-span-4">Stack</div>
        <div className="sm:col-span-1 text-right" aria-hidden="true">
          →
        </div>
      </div>

      <ul className="divide-y divide-border">
        {projects.map((project, idx) => {
          const num = String(idx + 1).padStart(2, '0');
          return (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid grid-cols-1 gap-1 py-3.5 px-2 -mx-2 transition-colors duration-[120ms] hover:bg-surface sm:grid-cols-12 sm:items-baseline sm:gap-4"
              >
                <div className="flex items-baseline justify-between sm:col-span-4 sm:grid sm:grid-cols-4 sm:gap-4">
                  <span className="text-meta text-muted sm:col-span-1">
                    {num}
                  </span>
                  <span className="font-sans text-base font-medium text-ink sm:col-span-3">
                    <span className="row-underline">{project.title}</span>
                  </span>
                </div>

                <div
                  className={`text-meta text-ink-2 ${
                    showYear ? 'sm:col-span-2' : 'sm:col-span-3'
                  }`}
                >
                  {isFilled(project.role) ? project.role : project.kind}
                </div>

                {showYear && (
                  <div className="text-meta text-muted sm:col-span-1">
                    {isFilled(project.year) ? project.year : '—'}
                  </div>
                )}

                <div className="text-meta text-muted sm:col-span-4 truncate">
                  {project.stack.slice(0, 4).join(' · ')}
                </div>

                <div
                  className="hidden sm:block sm:col-span-1 text-right font-mono text-sm text-muted transition-transform duration-[160ms] group-hover:translate-x-[2px] group-hover:text-ink"
                  aria-hidden="true"
                >
                  →
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
