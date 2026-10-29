import Link from 'next/link';
import Image from 'next/image';
import { STATIC_PROJECT_IMAGES } from '@/components/work/PreviewFrame';
import { ArchDiagram, type ArchLayer } from '@/components/work/ArchDiagram';
import { isFilled } from '@/lib/filled';

export type ProjectItemProps = {
  slug?: string;
  index?: number;
  title: string;
  year?: string;
  role?: string;
  kind?: string;
  description: string;
  problem?: string;
  approach?: string[];
  tradeoffs?: { decision: string; alternative: string; why: string }[];
  impact?: { label: string; value: string; source: string }[];
  architecture?: { layers: ArchLayer[] };
  stack: string[];
  links: { live?: string; repo?: string };
  imageSrc?: string;
  imageAlt?: string;
};

export function ProjectItem({
  slug,
  index = 0,
  title,
  year,
  role,
  kind,
  description,
  problem,
  approach,
  tradeoffs,
  impact,
  architecture,
  stack,
  links,
  imageSrc,
  imageAlt,
}: ProjectItemProps) {
  const num = String(index + 1).padStart(2, '0');
  const hasProblem = isFilled(problem);
  const hasApproach = isFilled(approach);
  const hasTradeoffs = isFilled(tradeoffs);
  const hasImpact = isFilled(impact);

  const metaTokens = [
    isFilled(year) ? year : null,
    isFilled(role) ? role.toUpperCase() : null,
    isFilled(kind) ? kind.toUpperCase() : null,
  ].filter(Boolean);

  return (
    <article
      id={slug ? `case-${slug}` : undefined}
      aria-labelledby={slug ? `case-title-${slug}` : undefined}
      className="group border-b border-border-subtle bg-bg-primary transition-colors duration-100"
    >
      {/* Top Project Header Bar — inverts colors on article hover */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle bg-bg-primary px-4 py-4 transition-colors duration-100 group-hover:bg-ink group-hover:text-bg sm:px-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-xs font-medium text-accent group-hover:text-bg">
            [{num}]
          </span>
          <h3
            id={slug ? `case-title-${slug}` : undefined}
            className="font-sans text-xl font-semibold tracking-tight text-ink group-hover:text-bg sm:text-2xl"
          >
            {slug ? (
              <Link href={`/work/${slug}`} className="hover:underline">
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
          {metaTokens.length > 0 && (
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted group-hover:text-bg/80">
              {"// "}{metaTokens.join(' :: ')}
            </span>
          )}
        </div>

        {/* Raw, unadorned monospace action links */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {slug && (
            <Link
              href={`/work/${slug}`}
              aria-label={`Read full case study for ${title}`}
              className="border border-border-subtle px-2.5 py-1 uppercase tracking-wider text-ink transition-colors duration-100 group-hover:border-bg/40 group-hover:text-bg hover:!bg-accent hover:!text-white hover:!border-accent"
            >
              [SPEC_FILE -&gt;]
            </Link>
          )}
          {isFilled(links.live) && (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live site for ${title}`}
              className="border border-border-subtle px-2.5 py-1 uppercase tracking-wider text-ink transition-colors duration-100 group-hover:border-bg/40 group-hover:text-bg hover:!bg-accent hover:!text-white hover:!border-accent"
            >
              [LIVE -&gt;]
            </a>
          )}
          {isFilled(links.repo) && (
            <a
              href={links.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source repository for ${title}`}
              className="border border-border-subtle px-2.5 py-1 uppercase tracking-wider text-ink transition-colors duration-100 group-hover:border-bg/40 group-hover:text-bg hover:!bg-accent hover:!text-white hover:!border-accent"
            >
              [SOURCE -&gt;]
            </a>
          )}
        </div>
      </div>

      {/* Main Project Body Grid */}
      <div className="grid grid-cols-1 divide-y divide-border-subtle lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
        {/* Left Column: Problem Statement, Engineering Architecture, Impact, Stack */}
        <div className="min-w-0 p-4 sm:p-6 lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {"// "}PROBLEM_STATEMENT
            </p>
            <p className="text-body text-ink measure">
              {hasProblem ? problem : description}
            </p>
          </div>

          {hasApproach && approach && (
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {"// "}TECHNICAL_ARCHITECTURE &amp; EXECUTION
              </p>
              <ul className="space-y-1.5 text-secondary text-ink">
                {approach.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="font-mono text-xs text-accent shrink-0 pt-0.5"
                      aria-hidden="true"
                    >
                      -&gt;
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasTradeoffs && tradeoffs && (
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {"// "}ARCHITECTURAL_TRADEOFFS
              </p>
              <div className="overflow-x-auto border border-border-subtle">
                <table className="w-full text-left text-secondary">
                  <thead className="border-b border-border-subtle font-mono text-[11px] uppercase text-muted">
                    <tr>
                      <th className="p-2 font-normal">Decision</th>
                      <th className="p-2 font-normal">Alternative</th>
                      <th className="p-2 font-normal">Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {tradeoffs.map((t, i) => (
                      <tr key={i} className="align-top">
                        <td className="p-2 font-medium text-ink">
                          {t.decision}
                        </td>
                        <td className="p-2 text-muted">{t.alternative}</td>
                        <td className="p-2 text-ink">{t.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {hasImpact && impact && (
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {"// "}MEASURABLE_IMPACT
              </p>
              <dl className="grid grid-cols-2 gap-px bg-border-subtle border border-border-subtle sm:grid-cols-3">
                {impact.map((metric, i) => (
                  <div key={i} className="bg-bg-primary p-3">
                    <dt className="font-mono text-[11px] uppercase text-muted">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 font-mono text-lg font-semibold text-ink tabular-nums">
                      {metric.value}
                    </dd>
                    <dd className="font-mono text-[10px] text-muted">
                      {metric.source}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="space-y-2 pt-1">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {"// "}STACK_SPEC
            </p>
            <div className="flex flex-wrap gap-1.5">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border-subtle bg-bg-primary px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Raw Unframed Screenshot (Monochrome -> Color on Hover) + Topology */}
        <div className="flex flex-col divide-y divide-border-subtle lg:col-span-5">
          {imageSrc && (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-primary">
              <Image
                src={STATIC_PROJECT_IMAGES[imageSrc] ?? imageSrc}
                alt={imageAlt || `${title} interface screenshot`}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 600px, 100vw"
                placeholder={
                  STATIC_PROJECT_IMAGES[imageSrc] ? 'blur' : 'empty'
                }
                className="object-cover object-top grayscale contrast-125 transition-all duration-100 group-hover:grayscale-0 group-hover:contrast-100"
              />
              <div className="pointer-events-none absolute bottom-0 left-0 border-t border-r border-border-subtle bg-bg-primary px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                RAW_UI // {title.toUpperCase()}
              </div>
            </div>
          )}

          {architecture?.layers && (
            <ArchDiagram layers={architecture.layers} />
          )}
        </div>
      </div>
    </article>
  );
}
