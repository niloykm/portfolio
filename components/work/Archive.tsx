import type { Project } from '@/data/projects';
import { TextLink } from '@/components/ui/TextLink';
import { isFilled } from '@/lib/filled';
import Link from 'next/link';

type ArchiveProps = {
  projects: Project[];
};

export function Archive({ projects }: ArchiveProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-label text-muted">Archive ({projects.length})</h3>
        <span className="text-meta text-muted">Additional builds & tools</span>
      </div>

      {/* Desktop semantic table */}
      <div className="hidden md:block border-y border-border">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">
            Archive of non-featured engineering projects
          </caption>
          <thead>
            <tr className="border-b border-border text-label text-muted">
              <th scope="col" className="py-2.5 pr-4 font-normal w-[28%]">
                Project
              </th>
              <th scope="col" className="py-2.5 px-4 font-normal w-[16%]">
                Kind
              </th>
              <th scope="col" className="py-2.5 px-4 font-normal w-[40%]">
                Stack
              </th>
              <th
                scope="col"
                className="py-2.5 pl-4 text-right font-normal w-[16%]"
              >
                Links
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-secondary">
            {projects.map((project) => (
              <tr
                key={project.slug}
                className="group transition-colors duration-[120ms] hover:bg-surface"
              >
                <th scope="row" className="py-3.5 pr-4 font-medium text-ink">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-ink"
                  >
                    <span className="row-underline">{project.title}</span>
                  </Link>
                  <p className="mt-0.5 text-xs font-normal text-muted line-clamp-1">
                    {project.summary}
                  </p>
                </th>
                <td className="py-3.5 px-4 text-meta text-muted align-top">
                  {project.kind}
                </td>
                <td className="py-3.5 px-4 text-meta text-ink-2 align-top">
                  {project.stack.join(' · ')}
                </td>
                <td className="py-3.5 pl-4 text-right align-top">
                  <div className="inline-flex items-center justify-end gap-3">
                    {isFilled(project.links.live) && (
                      <TextLink
                        href={project.links.live}
                        mono
                        aria-label={`Open live app for ${project.title}`}
                      >
                        Live
                      </TextLink>
                    )}
                    {isFilled(project.links.repo) && (
                      <TextLink
                        href={project.links.repo}
                        mono
                        aria-label={`View source code for ${project.title}`}
                      >
                        Source
                      </TextLink>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile (<md) stacked definition blocks */}
      <div className="md:hidden divide-y divide-border border-y border-border">
        {projects.map((project) => (
          <dl key={project.slug} className="py-4 space-y-2">
            <div className="flex items-baseline justify-between gap-2">
              <dt className="sr-only">Project</dt>
              <dd className="font-sans text-base font-medium text-ink">
                <Link
                  href={`/work/${project.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {project.title}
                </Link>
              </dd>
              <dt className="sr-only">Kind</dt>
              <dd className="text-meta text-muted">{project.kind}</dd>
            </div>

            <div>
              <dt className="sr-only">Summary</dt>
              <dd className="text-secondary text-ink-2">{project.summary}</dd>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
              <div>
                <dt className="sr-only">Stack</dt>
                <dd className="text-meta text-muted">
                  {project.stack.join(' · ')}
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="sr-only">Links</dt>
                <dd className="flex items-center gap-3">
                  {isFilled(project.links.live) && (
                    <TextLink
                      href={project.links.live}
                      mono
                      aria-label={`Open live app for ${project.title}`}
                    >
                      Live
                    </TextLink>
                  )}
                  {isFilled(project.links.repo) && (
                    <TextLink
                      href={project.links.repo}
                      mono
                      aria-label={`View source code for ${project.title}`}
                    >
                      Source
                    </TextLink>
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
