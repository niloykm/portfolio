import type { Project } from '@/data/projects';
import { isFilled } from '@/lib/filled';
import Link from 'next/link';

type ArchiveProps = {
  projects: Project[];
};

export function Archive({ projects }: ArchiveProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="bg-bg-primary">
      <div className="flex items-baseline justify-between border-b border-border-subtle px-4 py-3 sm:px-6 font-mono text-xs uppercase tracking-wider">
        <h3 className="font-medium text-ink">
          {"// "}ARCHIVE_INDEX [{projects.length}_ENTRIES]
        </h3>
        <span className="text-muted">ADDITIONAL_BUILDS &amp; TOOLS</span>
      </div>

      {/* Desktop semantic table */}
      <div className="hidden md:block">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">
            Archive of non-featured engineering projects
          </caption>
          <thead>
            <tr className="border-b border-border-subtle font-mono text-[11px] uppercase tracking-wider text-muted">
              <th scope="col" className="py-2.5 pl-6 pr-4 font-normal w-[30%]">
                Project
              </th>
              <th scope="col" className="py-2.5 px-4 font-normal w-[14%]">
                Kind
              </th>
              <th scope="col" className="py-2.5 px-4 font-normal w-[38%]">
                Stack
              </th>
              <th
                scope="col"
                className="py-2.5 pl-4 pr-6 text-right font-normal w-[18%]"
              >
                Links
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-secondary">
            {projects.map((project) => (
              <tr
                key={project.slug}
                className="group transition-colors duration-100 hover:bg-ink hover:text-bg"
              >
                <th scope="row" className="py-3.5 pl-6 pr-4 font-semibold text-ink group-hover:text-bg align-top">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <span>{project.title}</span>
                  </Link>
                  <p className="mt-0.5 text-xs font-normal text-muted group-hover:text-bg/80 line-clamp-1">
                    {project.summary}
                  </p>
                </th>
                <td className="py-3.5 px-4 font-mono text-xs uppercase text-muted group-hover:text-bg/80 align-top">
                  [{project.kind}]
                </td>
                <td className="py-3.5 px-4 font-mono text-xs text-ink group-hover:text-bg/90 align-top">
                  {project.stack.join(' / ')}
                </td>
                <td className="py-3.5 pl-4 pr-6 text-right font-mono text-xs align-top">
                  <div className="inline-flex items-center justify-end gap-3">
                    {isFilled(project.links.live) && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live app for ${project.title}`}
                        className="uppercase text-ink group-hover:text-bg hover:!text-accent underline underline-offset-2"
                      >
                        [LIVE -&gt;]
                      </a>
                    )}
                    {isFilled(project.links.repo) && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${project.title}`}
                        className="uppercase text-ink group-hover:text-bg hover:!text-accent underline underline-offset-2"
                      >
                        [SRC -&gt;]
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile (<md) stacked definition blocks */}
      <div className="md:hidden divide-y divide-border-subtle">
        {projects.map((project) => (
          <dl key={project.slug} className="p-4 space-y-2">
            <div className="flex items-baseline justify-between gap-2">
              <dt className="sr-only">Project</dt>
              <dd className="font-sans text-base font-semibold text-ink">
                <Link
                  href={`/work/${project.slug}`}
                  className="hover:text-accent transition-colors duration-100"
                >
                  {project.title}
                </Link>
              </dd>
              <dt className="sr-only">Kind</dt>
              <dd className="font-mono text-xs uppercase text-muted">
                [{project.kind}]
              </dd>
            </div>

            <div>
              <dt className="sr-only">Summary</dt>
              <dd className="text-secondary text-muted">{project.summary}</dd>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1 font-mono text-xs">
              <div>
                <dt className="sr-only">Stack</dt>
                <dd className="text-ink">{project.stack.join(' / ')}</dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="sr-only">Links</dt>
                <dd className="flex items-center gap-3">
                  {isFilled(project.links.live) && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live app for ${project.title}`}
                      className="uppercase text-ink hover:text-accent underline"
                    >
                      [LIVE -&gt;]
                    </a>
                  )}
                  {isFilled(project.links.repo) && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.title}`}
                      className="uppercase text-ink hover:text-accent underline"
                    >
                      [SRC -&gt;]
                    </a>
                  )}
                </dd>
              </div>
            </div>
          </dl>
        ))}
      </div>
    </div>
  );
}
