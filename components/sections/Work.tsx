'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Cpu,
  ExternalLink,
  FolderGit2,
  Github,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { ProjectCaseStudyDrawer } from '@/components/work/ProjectCaseStudyDrawer';
import {
  projects,
  featuredProjects,
  archiveProjects,
  type Project,
  type ProjectCategory,
} from '@/data/projects';

const FILTER_TABS: ('All' | ProjectCategory)[] = [
  'All',
  'Full-Stack SaaS',
  'AI & Automation',
  'Frontend Architecture',
];

function ProjectVisualPreview({ project }: { project: Project }) {
  if (project.preview?.src) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-200/80 bg-bg-sunken dark:border-zinc-800/80">
        <div className="flex items-center justify-between border-b border-zinc-200/70 bg-surface/90 px-3.5 py-2 dark:border-zinc-800/80">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-400/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-[11px] text-muted truncate">
              {project.links.live
                ? project.links.live.replace(/^https?:\/\//, '')
                : `${project.slug}.app`}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {project.year}
          </span>
        </div>
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={project.preview.src}
            alt={project.preview.alt ?? project.title}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>
    );
  }

  // Interactive visual architecture mockup for projects without static screenshot
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-200/80 bg-bg-sunken p-4 dark:border-zinc-800/80 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-mono text-[11px] text-muted">
            {project.slug} {'//'} system.topology
          </span>
        </div>
        <span className="rounded-full border border-zinc-300/80 bg-surface px-2 py-0.5 font-mono text-[10px] text-ink dark:border-zinc-700">
          {project.metricBadge}
        </span>
      </div>

      {/* Interactive Layer Pipeline Graphic */}
      <div className="my-auto grid grid-cols-3 gap-2 pt-2">
        {project.architecture.layers.map((layer, i) => (
          <div
            key={layer.name}
            className="rounded-xl border border-zinc-200/90 bg-surface p-2.5 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 dark:border-zinc-800"
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
              0{i + 1} • {layer.name.replace(' Layer', '')}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-ink truncate">
              {layer.role}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {layer.nodes.slice(0, 2).map((n) => (
                <span
                  key={n}
                  className="rounded bg-bg-sunken px-1.5 py-0.5 font-mono text-[10px] text-muted truncate"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] text-muted pt-1">
        <span>ROLE: {project.role.toUpperCase()}</span>
        <span className="text-accent group-hover:underline">
          INSPECT_TOPOLOGY →
        </span>
      </div>
    </div>
  );
}

export function Work() {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>(
    'All'
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [archiveExpanded, setArchiveExpanded] = useState(false);

  const displayedProjects =
    activeCategory === 'All'
      ? featuredProjects
      : projects.filter((p) => p.categories.includes(activeCategory));

  return (
    <Section
      id="work"
      badge="01 // Selected Work"
      label="Featured Production Systems"
      subtitle="Scannable in 3 seconds. Click any system card to inspect its full architecture, database topology, and engineering trade-offs."
    >
      {/* Category Filter Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Filter projects by engineering domain"
          className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-zinc-200/80 bg-surface p-1.5 dark:border-zinc-800/80"
        >
          {FILTER_TABS.map((tab) => {
            const active = activeCategory === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(tab)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all duration-150 ${
                  active
                    ? 'bg-ink text-bg shadow-sm'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs text-muted">
          Showing {displayedProjects.length} of {projects.length} systems
        </span>
      </div>

      {/* 2x2 Interactive Bento Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {displayedProjects.map((project) => (
          <article
            key={project.slug}
            className="bento-card group flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Visual Preview Mockup (Clickable to open Architecture Drawer) */}
              <div
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
              >
                <ProjectVisualPreview project={project} />
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Category & Key Impact Metric Pill */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-bg-sunken px-2.5 py-0.5 font-mono text-[11px] font-medium text-muted dark:border-zinc-800">
                    <Layers className="h-3 w-3 text-accent" aria-hidden="true" />
                    <span>{project.category}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    <span>{project.metricBadge}</span>
                  </span>
                </div>

                {/* Title + Quick External Links */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-ink">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-muted">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo of ${project.title}`}
                        title="Open Live Demo"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-bg-sunken text-muted transition-colors hover:border-ink/40 hover:text-ink dark:border-zinc-800"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository for ${project.title}`}
                        title="View GitHub Source"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-bg-sunken text-muted transition-colors hover:border-ink/40 hover:text-ink dark:border-zinc-800"
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 1-Sentence Punchy Summary */}
                <p className="text-sm leading-relaxed text-muted line-clamp-2">
                  {project.summary}
                </p>

                {/* 3 Key Highlight Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-md border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 font-mono text-[11px] font-medium text-blue-700 dark:text-blue-300"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer: Core Tech Pills + Progressive Disclosure Trigger */}
            <div className="border-t border-zinc-200/70 bg-bg-sunken/30 px-6 py-4 dark:border-zinc-800/70 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-zinc-200/80 bg-surface px-2.5 py-0.5 font-mono text-[11px] text-muted dark:border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="flex w-full items-center justify-between rounded-xl border border-zinc-200/90 bg-surface px-4 py-2.5 text-xs font-semibold text-ink shadow-sm transition-all duration-150 hover:border-ink hover:bg-ink hover:text-bg dark:border-zinc-800"
              >
                <span className="inline-flex items-center gap-2">
                  <Cpu className="h-3.5 w-3.5 text-accent group-hover:text-current" aria-hidden="true" />
                  <span>Inspect Architecture &amp; Case Study</span>
                </span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Compact "More Engineering Archive" Accordion */}
      <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-surface dark:border-zinc-800/80 overflow-hidden">
        <button
          type="button"
          onClick={() => setArchiveExpanded((prev) => !prev)}
          aria-expanded={archiveExpanded}
          aria-controls="engineering-archive-panel"
          className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-bg-sunken/60"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-bg-sunken text-ink dark:border-zinc-800">
              <FolderGit2 className="h-4 w-4 text-accent" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">
                View More Engineering Archive ({archiveProjects.length} Projects)
              </p>
              <p className="text-xs text-muted">
                Velora E-Commerce, Ndemy LMS, Nobot AI Client, Inventory Ledger, QR Studio &amp; URL Shortener
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-bg-sunken px-3 py-1 font-mono text-xs font-medium text-ink dark:border-zinc-800">
            <span>{archiveExpanded ? 'Hide Archive' : 'Expand'}</span>
            {archiveExpanded ? (
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </span>
        </button>

        {archiveExpanded && (
          <div
            id="engineering-archive-panel"
            className="divide-y divide-zinc-200/70 border-t border-zinc-200/80 dark:divide-zinc-800/70 dark:border-zinc-800/80"
          >
            {archiveProjects.map((item) => (
              <div
                key={item.slug}
                className="flex flex-col justify-between gap-4 px-6 py-4 transition-colors hover:bg-bg-sunken/40 sm:flex-row sm:items-center"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-ink">
                      {item.title}
                    </h4>
                    <span className="rounded-full border border-zinc-200/80 bg-bg-sunken px-2 py-0.5 font-mono text-[10px] text-muted dark:border-zinc-800">
                      {item.category}
                    </span>
                    <span className="font-mono text-[11px] text-accent">
                      • {item.metricBadge}
                    </span>
                  </div>
                  <p className="text-xs text-muted max-w-2xl">{item.summary}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] text-muted"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(item)}
                    className="rounded-full border border-zinc-200/80 bg-surface px-3 py-1.5 font-mono text-xs font-medium text-ink transition-colors hover:border-ink/40 hover:bg-bg-sunken dark:border-zinc-800"
                  >
                    Architecture →
                  </button>
                  {item.links.live && (
                    <a
                      href={item.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 font-mono text-xs font-medium text-bg hover:opacity-90"
                    >
                      <span>Live</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                  {item.links.repo && (
                    <a
                      href={item.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.title} GitHub repository`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-surface text-muted hover:text-ink dark:border-zinc-800"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progressive Disclosure Slide-Over Drawer */}
      <ProjectCaseStudyDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Section>
  );
}
