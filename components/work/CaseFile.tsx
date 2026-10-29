import Link from 'next/link';
import type { Project } from '@/data/projects';
import { Label } from '@/components/ui/Label';
import { Tag } from '@/components/ui/Tag';
import { TextLink } from '@/components/ui/TextLink';
import { ArchDiagram } from './ArchDiagram';
import { PreviewFrame } from './PreviewFrame';
import { isFilled } from '@/lib/filled';

type CaseFileProps = {
  project: Project;
  index: number;
};

export function CaseFile({ project, index }: CaseFileProps) {
  const num = String(index + 1).padStart(2, '0');
  const hasProblem = isFilled(project.problem);
  const hasApproach = isFilled(project.approach);
  const hasTradeoffs = isFilled(project.tradeoffs);
  const hasImpact = isFilled(project.impact);
  const hasNarrative = hasProblem || hasApproach || hasTradeoffs || hasImpact;

  const metaParts = [
    isFilled(project.year) ? project.year : null,
    isFilled(project.role) ? project.role : null,
    project.kind,
  ].filter(Boolean);

  return (
    <article
      id={`case-${project.slug}`}
      aria-labelledby={`case-title-${project.slug}`}
      className="border-t border-border pt-8 sm:pt-10"
    >
      {/* Header row */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-border">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-meta text-muted">{num}</span>
          <h3 id={`case-title-${project.slug}`} className="text-h3 text-ink">
            <Link
              href={`/work/${project.slug}`}
              className="hover:text-accent transition-colors"
            >
              {project.title}
            </Link>
          </h3>
          {metaParts.length > 0 && (
            <span className="text-meta text-muted">
              {metaParts.join(' · ')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <TextLink
            href={`/work/${project.slug}`}
            mono
            aria-label={`Read full case study for ${project.title}`}
          >
            Case file →
          </TextLink>
          {isFilled(project.links.live) && (
            <TextLink
              href={project.links.live}
              mono
              aria-label={`Open live site for ${project.title}`}
            >
              Live
            </TextLink>
          )}
          {isFilled(project.links.repo) && (
            <TextLink
              href={project.links.repo}
              mono
              aria-label={`View source repository for ${project.title}`}
            >
              Source
            </TextLink>
          )}
        </div>
      </div>

      {hasNarrative ? (
        <div className="grid grid-cols-1 gap-8 pt-6 lg:grid-cols-9 lg:gap-6">
          {/* Left column (cols 4-8 of the 12-col page grid = 5 of 9 cols inside Section) */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-body text-ink-2 measure">{project.summary}</p>

            {hasProblem && (
              <div className="space-y-1.5">
                <Label as="p">Problem</Label>
                <p className="text-body text-ink measure">{project.problem}</p>
              </div>
            )}

            {hasApproach && project.approach && (
              <div className="space-y-2">
                <Label as="p">Approach</Label>
                <ul className="space-y-1.5 text-secondary text-ink-2 measure list-disc pl-4">
                  {project.approach.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}

            {hasTradeoffs && project.tradeoffs && (
              <div className="space-y-2">
                <Label as="p">Trade-offs</Label>
                <div className="overflow-x-auto border-y border-border">
                  <table className="w-full text-left text-secondary">
                    <thead className="border-b border-border text-label text-muted">
                      <tr>
                        <th className="py-2 pr-3 font-normal">Decision</th>
                        <th className="py-2 px-3 font-normal">Considered</th>
                        <th className="py-2 pl-3 font-normal">Why</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {project.tradeoffs.map((t, i) => (
                        <tr key={i} className="align-top">
                          <td className="py-2.5 pr-3 font-medium text-ink">
                            {t.decision}
                          </td>
                          <td className="py-2.5 px-3 text-muted">
                            {t.alternative}
                          </td>
                          <td className="py-2.5 pl-3 text-ink-2">{t.why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {hasImpact && project.impact && (
              <div className="space-y-2">
                <Label as="p">Impact</Label>
                <dl className="grid grid-cols-2 gap-4 border-y border-border py-3 sm:grid-cols-3">
                  {project.impact.map((metric, i) => (
                    <div key={i}>
                      <dt className="text-label text-muted">{metric.label}</dt>
                      <dd className="mt-1 font-mono text-lg text-ink tabular-nums">
                        {metric.value}
                      </dd>
                      <dd className="text-[11px] font-mono text-muted">
                        {metric.source}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="space-y-2 pt-1">
              <Label as="p">Stack</Label>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </div>

          {/* Right column (cols 9-12 of the 12-col page grid = 4 of 9 cols inside Section) */}
          <div className="lg:col-span-4 space-y-4">
            {project.architecture?.layers && (
              <ArchDiagram layers={project.architecture.layers} />
            )}

            {(project.preview || project.links.live) && (
              <PreviewFrame
                title={project.title}
                liveUrl={project.links.live}
                imageSrc={project.preview?.src}
                imageAlt={project.preview?.alt}
                allowIframe={project.preview?.kind === 'iframe'}
              />
            )}
          </div>
        </div>
      ) : (
        /* Compact variant when narrative fields are missing */
        <div className="pt-4 space-y-3">
          <p className="text-body text-ink-2 measure">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
