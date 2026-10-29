import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Rule } from '@/components/ui/Rule';
import { Label } from '@/components/ui/Label';
import { Tag } from '@/components/ui/Tag';
import { TextLink } from '@/components/ui/TextLink';
import { ArchDiagram } from '@/components/work/ArchDiagram';
import { PreviewFrame } from '@/components/work/PreviewFrame';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { socialLinks } from '@/data/links';
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
    title: `${project.title} — Case File`,
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
    <>
      <Header availability={profile.availability} showNotes={false} />
      <main id="main" className="py-12 sm:py-16 lg:py-24">
        <Container className="space-y-12 sm:space-y-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-meta text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/#work"
                  className="underline decoration-border-strong underline-offset-[3px] hover:text-accent"
                >
                  ← Selected work
                </Link>
              </li>
              <li aria-hidden="true" className="text-faint">
                /
              </li>
              <li className="text-ink" aria-current="page">
                {project.title}
              </li>
            </ol>
          </nav>

          {/* Title & Summary */}
          <header className="space-y-6">
            <div className="space-y-3">
              <Label as="p">
                Case file · {String(index + 1).padStart(2, '0')}
              </Label>
              <h1 className="text-display text-ink">{project.title}</h1>
            </div>
            <p className="text-lead text-muted measure">{project.summary}</p>
          </header>

          {/* Ledger */}
          <dl className="grid grid-cols-1 gap-6 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4 text-meta">
            {isFilled(project.role) && (
              <div className="space-y-1">
                <dt className="text-label text-muted">Role</dt>
                <dd className="text-ink">{project.role}</dd>
              </div>
            )}

            <div className="space-y-1">
              <dt className="text-label text-muted">Kind</dt>
              <dd className="text-ink">{project.kind}</dd>
            </div>

            {isFilled(project.year) && (
              <div className="space-y-1">
                <dt className="text-label text-muted">Year</dt>
                <dd className="text-ink">{project.year}</dd>
              </div>
            )}

            <div className="space-y-1 sm:col-span-2 lg:col-span-1">
              <dt className="text-label text-muted">Links</dt>
              <dd className="flex flex-wrap items-center gap-4">
                {isFilled(project.links.live) && (
                  <TextLink
                    href={project.links.live}
                    mono
                    aria-label={`Open live deployment of ${project.title}`}
                  >
                    Live deployment
                  </TextLink>
                )}
                {isFilled(project.links.repo) && (
                  <TextLink
                    href={project.links.repo}
                    mono
                    aria-label={`View source repository for ${project.title}`}
                  >
                    Source code
                  </TextLink>
                )}
              </dd>
            </div>

            <div className="space-y-2 sm:col-span-2 lg:col-span-4 border-t border-border pt-4">
              <dt className="text-label text-muted">Stack</dt>
              <dd className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </dd>
            </div>
          </dl>

          {/* Narrative & Evidence Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7 space-y-10">
              {hasProblem && (
                <section aria-labelledby="problem-heading" className="space-y-2">
                  <h2 id="problem-heading" className="text-label text-muted">
                    Problem
                  </h2>
                  <p className="text-body text-ink measure">
                    {project.problem}
                  </p>
                </section>
              )}

              {hasApproach && project.approach && (
                <section
                  aria-labelledby="approach-heading"
                  className="space-y-3"
                >
                  <h2 id="approach-heading" className="text-label text-muted">
                    Approach
                  </h2>
                  <ul className="space-y-2 text-body text-ink-2 measure list-disc pl-5">
                    {project.approach.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {hasTradeoffs && project.tradeoffs && (
                <section
                  aria-labelledby="tradeoffs-heading"
                  className="space-y-3"
                >
                  <h2 id="tradeoffs-heading" className="text-label text-muted">
                    Trade-offs
                  </h2>
                  <div className="overflow-x-auto border-y border-border">
                    <table className="w-full text-left text-secondary">
                      <thead className="border-b border-border text-label text-muted">
                        <tr>
                          <th className="py-2 pr-4 font-normal">Decision</th>
                          <th className="py-2 px-4 font-normal">Considered</th>
                          <th className="py-2 pl-4 font-normal">Why</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {project.tradeoffs.map((t, i) => (
                          <tr key={i} className="align-top">
                            <td className="py-3 pr-4 font-medium text-ink">
                              {t.decision}
                            </td>
                            <td className="py-3 px-4 text-muted">
                              {t.alternative}
                            </td>
                            <td className="py-3 pl-4 text-ink-2">{t.why}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {hasImpact && project.impact && (
                <section aria-labelledby="impact-heading" className="space-y-3">
                  <h2 id="impact-heading" className="text-label text-muted">
                    Impact
                  </h2>
                  <dl className="grid grid-cols-2 gap-4 border-y border-border py-4 sm:grid-cols-3">
                    {project.impact.map((metric, i) => (
                      <div key={i}>
                        <dt className="text-label text-muted">{metric.label}</dt>
                        <dd className="mt-1 font-mono text-xl text-ink tabular-nums">
                          {metric.value}
                        </dd>
                        <dd className="text-meta text-muted">{metric.source}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>

            <div className="lg:col-span-5 space-y-6">
              {hasArchitecture && project.architecture && (
                <section aria-label="System architecture">
                  <ArchDiagram
                    layers={project.architecture.layers}
                    title="System architecture"
                  />
                </section>
              )}

              {hasPreview && (
                <section aria-label="Application preview" className="space-y-2">
                  <Label as="p">Preview</Label>
                  <PreviewFrame
                    title={project.title}
                    liveUrl={project.links.live}
                    imageSrc={project.preview?.src}
                    imageAlt={project.preview?.alt}
                    allowIframe={project.preview?.kind === 'iframe'}
                  />
                </section>
              )}
            </div>
          </div>

          <Rule />

          {/* Prev / Next Navigation */}
          <nav
            aria-label="Project pagination"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <Link
              href={`/work/${prevProject.slug}`}
              className="group rounded-control border border-border bg-surface p-4 transition-colors hover:border-border-strong"
            >
              <span className="text-label text-muted block">← Previous</span>
              <span className="mt-1 font-sans text-base font-medium text-ink block">
                <span className="row-underline">{prevProject.title}</span>
              </span>
            </Link>

            <Link
              href={`/work/${nextProject.slug}`}
              className="group rounded-control border border-border bg-surface p-4 text-left sm:text-right transition-colors hover:border-border-strong"
            >
              <span className="text-label text-muted block">Next →</span>
              <span className="mt-1 font-sans text-base font-medium text-ink block">
                <span className="row-underline">{nextProject.title}</span>
              </span>
            </Link>
          </nav>
        </Container>
      </main>
      <Footer
        name={profile.name}
        timeZone={profile.timeZone}
        showNotes={false}
        elsewhere={socialLinks.map((s) => ({ label: s.label, href: s.href }))}
      />
    </>
  );
}
