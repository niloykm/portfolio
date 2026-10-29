import Link from 'next/link';
import type { Project } from '@/data/projects';
import { isFilled } from '@/lib/filled';

type WorkIndexProps = {
  projects: Project[];
};

export function WorkIndex({ projects }: WorkIndexProps) {
  const showYear = projects.some((p) => isFilled(p.year));

  return (
    <div className="border-b border-border-subtle">
      <div className="hidden sm:grid sm:grid-cols-12 sm:gap-4 border-b border-border-subtle bg-bg-primary px-4 py-2.5 sm:px-6 font-mono text-[11px] uppercase tracking-wider text-muted">
        <div className="sm:col-span-1">ID</div>
        <div className="sm:col-span-3">SYSTEM</div>
        <div className={showYear ? 'sm:col-span-2' : 'sm:col-span-3'}>ROLE</div>
        {showYear && <div className="sm:col-span-1">YEAR</div>}
        <div className="sm:col-span-4">STACK</div>
        <div className="sm:col-span-1 text-right">SPEC</div>
      </div>

      <ul className="divide-y divide-border-subtle">
        {projects.map((project, idx) => {
          const num = String(idx + 1).padStart(2, '0');
          return (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid grid-cols-1 gap-1 px-4 py-3.5 transition-colors duration-100 hover:bg-ink hover:text-bg sm:grid-cols-12 sm:items-baseline sm:gap-4 sm:px-6"
              >
                <div className="flex items-baseline justify-between sm:col-span-4 sm:grid sm:grid-cols-4 sm:gap-4">
                  <span className="font-mono text-xs text-muted group-hover:text-bg/70 sm:col-span-1">
                    [{num}]
                  </span>
                  <span className="font-sans text-base font-semibold text-ink group-hover:text-bg sm:col-span-3">
                    {project.title}
                  </span>
                </div>

                <div
                  className={`font-mono text-xs text-muted group-hover:text-bg/80 ${
                    showYear ? 'sm:col-span-2' : 'sm:col-span-3'
                  }`}
                >
                  {isFilled(project.role) ? project.role : project.kind}
                </div>

                {showYear && (
                  <div className="font-mono text-xs text-muted group-hover:text-bg/80 sm:col-span-1">
                    {isFilled(project.year) ? project.year : '--'}
                  </div>
                )}

                <div className="min-w-0 font-mono text-xs text-muted group-hover:text-bg/80 sm:col-span-4 truncate">
                  {project.stack.slice(0, 4).join(' / ')}
                </div>

                <div
                  className="hidden sm:block sm:col-span-1 text-right font-mono text-xs text-ink group-hover:text-bg"
                  aria-hidden="true"
                >
                  -&gt;
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
