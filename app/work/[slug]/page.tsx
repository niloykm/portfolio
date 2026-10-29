import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { Heading, Body } from '@/components/Typography';
import { Tag } from '@/components/ui/Tag';
import { ArchDiagram } from '@/components/work/ArchDiagram';
import { PreviewFrame } from '@/components/work/PreviewFrame';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { isFilled } from '@/lib/filled';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} — Spec File`,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) {
    notFound();
  }

  const project = projects[index];
  const prevProject =
    projects[(index - 1 + projects.length) % projects.length];
  const nextProject = projects[(index + 1) % projects.length];

  const hasProblem = isFilled(project.problem);
  const hasApproach = isFilled(project.approach);
  const hasArchitecture = Boolean(project.architecture?.layers?.length);
  const hasTradeoffs = isFilled(project.tradeoffs);
  const hasImpact = isFilled(project.impact);
  const hasPreview = Boolean(project.preview || isFilled(project.links.live));

  return (
    <Layout showNotes={false}>
      {/* Top Breadcrumb Bar */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle px-4 py-3 sm:px-6 font-mono text-xs uppercase tracking-wider text-muted"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/#work"
              className="text-ink hover:text-accent transition-colors duration-100"
            >
              [&lt;- SELECTED_WORK]
            </Link>
          </li>
          <li aria-hidden="true">{"//"}</li>
          <li className="text-ink" aria-current="page">
            {project.title}
          </li>
        </ol>
        <span>SPEC_FILE :: {String(index + 1).padStart(2, '0')}</span>
      </nav>

      {/* Monolithic Title Header */}
      <header className="border-b border-border-subtle p-6 sm:p-8 lg:p-10 space-y-4">
        <div className="font-mono text-xs uppercase tracking-widest text-muted">
          {"// "}CASE_FILE [{String(index + 1).padStart(2, '0')}] ::{' '}
          {project.kind.toUpperCase()}
        </div>
        <Heading as="h1" size="display">
          {project.title}
        </Heading>
        <Body size="lead" muted measure>
          {project.summary}
        </Body>
      </header>

      {/* Blueprint Metadata Ledger */}
      <dl className="grid grid-cols-1 divide-y divide-border-subtle border-b border-border-subtle sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 lg:divide-x font-mono text-xs">
        <div className="p-4 sm:px-6 space-y-1">
          <dt className="uppercase tracking-wider text-muted">{"// "}ROLE</dt>
          <dd className="font-medium text-ink">
            {isFilled(project.role) ? project.role : 'Full-stack engineer'}
          </dd>
        </div>

        <div className="p-4 sm:px-6 space-y-1">
          <dt className="uppercase tracking-wider text-muted">{"// "}KIND</dt>
          <dd className="font-medium uppercase text-ink">[{project.kind}]</dd>
        </div>

        <div className="p-4 sm:px-6 space-y-1">
          <dt className="uppercase tracking-wider text-muted">{"// "}STATUS</dt>
          <dd className="font-medium text-ink">
            {isFilled(project.year) ? project.year : 'PRODUCTION'}
          </dd>
        </div>

        <div className="p-4 sm:px-6 space-y-1">
          <dt className="uppercase tracking-wider text-muted">{"// "}ENDPOINTS</dt>
          <dd className="flex flex-wrap items-center gap-3">
            {isFilled(project.links.live) && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live deployment of ${project.title}`}
                className="uppercase text-ink underline hover:text-accent"
              >
                [LIVE -&gt;]
              </a>
            )}
            {isFilled(project.links.repo) && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source repository for ${project.title}`}
                className="uppercase text-ink underline hover:text-accent"
              >
                [SOURCE -&gt;]
              </a>
            )}
          </dd>
        </div>
      </dl>

      {/* Stack Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border-subtle px-4 py-3 sm:px-6">
        <span className="font-mono text-xs uppercase tracking-wider text-muted mr-2">
          {"// "}STACK_SPEC:
        </span>
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      {/* Narrative & Evidence 12-Col Blueprint */}
      <div className="grid grid-cols-1 divide-y divide-border-subtle border-b border-border-subtle lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
        <div className="p-6 sm:p-8 lg:col-span-7 space-y-8">
          {hasProblem && (
            <section aria-labelledby="problem-heading" className="space-y-2">
              <h2
                id="problem-heading"
                className="font-mono text-xs uppercase tracking-widest text-muted"
              >
                {"// "}01 [PROBLEM_STATEMENT]
              </h2>
              <p className="text-body text-ink measure">{project.problem}</p>
            </section>
          )}

          {hasApproach && project.approach && (
            <section aria-labelledby="approach-heading" className="space-y-3">
              <h2
                id="approach-heading"
                className="font-mono text-xs uppercase tracking-widest text-muted"
              >
                {"// "}02 [TECHNICAL_ARCHITECTURE &amp; EXECUTION]
              </h2>
              <ul className="space-y-2 text-body text-ink measure">
                {project.approach.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="font-mono text-xs text-accent shrink-0 pt-1"
                      aria-hidden="true"
                    >
                      -&gt;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasTradeoffs && project.tradeoffs && (
            <section aria-labelledby="tradeoffs-heading" className="space-y-3">
              <h2
                id="tradeoffs-heading"
                className="font-mono text-xs uppercase tracking-widest text-muted"
              >
                {"// "}03 [ARCHITECTURAL_TRADEOFFS]
              </h2>
              <div className="overflow-x-auto border border-border-subtle">
                <table className="w-full text-left text-secondary">
                  <thead className="border-b border-border-subtle font-mono text-xs uppercase text-muted">
                    <tr>
                      <th className="p-3 font-normal">Decision</th>
                      <th className="p-3 font-normal">Considered</th>
                      <th className="p-3 font-normal">Why</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {project.tradeoffs.map((t, i) => (
                      <tr key={i} className="align-top">
                        <td className="p-3 font-medium text-ink">
                          {t.decision}
                        </td>
                        <td className="p-3 text-muted">{t.alternative}</td>
                        <td className="p-3 text-ink">{t.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {hasImpact && project.impact && (
            <section aria-labelledby="impact-heading" className="space-y-3">
              <h2
                id="impact-heading"
                className="font-mono text-xs uppercase tracking-widest text-muted"
              >
                {"// "}04 [MEASURABLE_IMPACT]
              </h2>
              <dl className="grid grid-cols-2 gap-px border border-border-subtle bg-border-subtle sm:grid-cols-3">
                {project.impact.map((metric, i) => (
                  <div key={i} className="bg-bg-primary p-4">
                    <dt className="font-mono text-xs uppercase text-muted">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 font-mono text-xl font-semibold text-ink tabular-nums">
                      {metric.value}
                    </dd>
                    <dd className="font-mono text-xs text-muted">
                      {metric.source}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>

        <div className="divide-y divide-border-subtle lg:col-span-5">
          {hasPreview && (
            <section aria-label="Application preview" className="p-4 sm:p-6">
              <PreviewFrame
                title={project.title}
                liveUrl={project.links.live}
                imageSrc={project.preview?.src}
                imageAlt={project.preview?.alt}
                allowIframe={project.preview?.kind === 'iframe'}
              />
            </section>
          )}

          {hasArchitecture && project.architecture && (
            <section aria-label="System architecture">
              <ArchDiagram
                layers={project.architecture.layers}
                title="SYSTEM_TOPOLOGY"
              />
            </section>
          )}
        </div>
      </div>

      {/* Prev / Next Navigation */}
      <nav
        aria-label="Project pagination"
        className="grid grid-cols-1 divide-y divide-border-subtle sm:grid-cols-2 sm:divide-y-0 sm:divide-x"
      >
        <Link
          href={`/work/${prevProject.slug}`}
          className="group p-6 transition-colors duration-100 hover:bg-ink hover:text-bg"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted group-hover:text-bg/80 block">
            [&lt;- PREVIOUS_SPEC]
          </span>
          <span className="mt-1 font-sans text-lg font-semibold text-ink group-hover:text-bg block">
            {prevProject.title}
          </span>
        </Link>

        <Link
          href={`/work/${nextProject.slug}`}
          className="group p-6 text-left sm:text-right transition-colors duration-100 hover:bg-ink hover:text-bg"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted group-hover:text-bg/80 block">
            [NEXT_SPEC -&gt;]
          </span>
          <span className="mt-1 font-sans text-lg font-semibold text-ink group-hover:text-bg block">
            {nextProject.title}
          </span>
        </Link>
      </nav>
    </Layout>
  );
}
