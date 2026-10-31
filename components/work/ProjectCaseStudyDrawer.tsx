'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Layers,
  CheckCircle2,
  ArrowDown,
  Cpu,
  Sparkles,
  FileCode2,
} from 'lucide-react';
import type { Project } from '@/data/projects';

type ProjectCaseStudyDrawerProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectCaseStudyDrawer({
  project,
  onClose,
}: ProjectCaseStudyDrawerProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const prevFocus = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      prevFocus?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-drawer-title"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-10 flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-zinc-200/80 bg-surface text-ink shadow-2xl dark:border-zinc-800"
          >
            {/* Sticky Drawer Header */}
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200/80 bg-surface/90 px-6 py-4 backdrop-blur-md dark:border-zinc-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-blue-700 dark:text-blue-300">
                  <Layers className="h-3 w-3" aria-hidden="true" />
                  <span>{project.category}</span>
                </span>
                <span className="font-mono text-xs text-muted">
                  • {project.role} ({project.year})
                </span>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close architecture case study"
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-bg-sunken px-3 py-1.5 font-mono text-xs font-medium text-ink transition-colors hover:border-ink/40 dark:border-zinc-800"
              >
                <span>ESC</span>
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Case Study Content */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
              {/* Title & Summary */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-0.5 font-mono text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  <span>{project.metricBadge}</span>
                </div>

                <h3
                  id="case-study-drawer-title"
                  className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink"
                >
                  {project.title}{' '}
                  <span className="text-muted font-normal">
                    — {project.subtitle}
                  </span>
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-muted">
                  {project.summary}
                </p>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-bg transition-opacity hover:opacity-90"
                    >
                      <span>Live Production App</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-surface px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-bg-sunken dark:border-zinc-700"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Source Code</span>
                    </a>
                  )}
                  <Link
                    href={`/work/${project.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-bg-sunken/70 px-3.5 py-2 font-mono text-xs text-muted transition-colors hover:text-ink dark:border-zinc-800"
                  >
                    <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Standalone Spec Page →</span>
                  </Link>
                </div>
              </div>

              {/* Screenshot Preview if available */}
              {project.preview?.src && (
                <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-bg-sunken dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 border-b border-zinc-200/80 bg-surface px-3.5 py-2 dark:border-zinc-800">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 font-mono text-[11px] text-muted truncate">
                      {project.links.live ?? `${project.slug}.app`}
                    </span>
                  </div>
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={project.preview.src}
                      alt={project.preview.alt ?? project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              )}

              {/* Measurable Impact Metrics */}
              {project.impact && project.impact.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.impact.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-zinc-200/80 bg-bg-sunken/50 p-4 dark:border-zinc-800"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 font-mono text-lg font-bold text-ink">
                        {item.value}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{item.source}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem & Engineering Solution */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200/80 bg-bg-sunken/40 p-5 dark:border-zinc-800">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                    01 {'//'} The Problem
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {project.problem}
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 dark:border-blue-500/20">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    02 {'//'} Engineering Solution
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Visual System Architecture Flow */}
              <div className="rounded-2xl border border-zinc-200/80 bg-bg-sunken/40 p-5 dark:border-zinc-800">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-accent" aria-hidden="true" />
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                      03 {'//'} System Architecture Topology
                    </h4>
                  </div>
                  <span className="font-mono text-[11px] text-muted">
                    Client → API / AI → Data
                  </span>
                </div>

                <div className="space-y-2.5">
                  {project.architecture.layers.map((layer, idx) => (
                    <div key={layer.name}>
                      <div className="rounded-xl border border-zinc-200/80 bg-surface p-4 dark:border-zinc-800">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                          <span className="font-mono text-xs font-semibold text-ink">
                            {layer.name}
                          </span>
                          <span className="font-mono text-[11px] text-muted">
                            {layer.role}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.nodes.map((node) => (
                            <span
                              key={node}
                              className="rounded-lg border border-zinc-200/80 bg-bg-sunken px-2.5 py-1 font-mono text-xs text-ink dark:border-zinc-700/80"
                            >
                              {node}
                            </span>
                          ))}
                        </div>
                      </div>
                      {idx < project.architecture.layers.length - 1 && (
                        <div
                          className="flex justify-center py-1 text-muted"
                          aria-hidden="true"
                        >
                          <ArrowDown className="h-4 w-4 text-accent" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Execution & Decisions */}
              <div className="rounded-2xl border border-zinc-200/80 bg-surface p-5 dark:border-zinc-800">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                  04 {'//'} Key Technical Decisions &amp; Execution
                </h4>
                <ul className="space-y-2.5 text-sm text-ink">
                  {project.approach.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architectural Tradeoffs */}
              {project.tradeoffs && project.tradeoffs.length > 0 && (
                <div className="rounded-2xl border border-zinc-200/80 bg-surface p-5 dark:border-zinc-800">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                    05 {'//'} Architectural Trade-Offs
                  </h4>
                  <div className="space-y-3">
                    {project.tradeoffs.map((t, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-zinc-200/70 bg-bg-sunken/50 p-3.5 text-xs dark:border-zinc-800"
                      >
                        <p className="font-semibold text-ink">
                          Decision: {t.decision}
                        </p>
                        <p className="mt-1 text-muted">
                          Instead of: {t.alternative}
                        </p>
                        <p className="mt-1 text-ink">Why: {t.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Stack Tags */}
              <div className="space-y-2 pt-2">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  Complete Technology Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-200/80 bg-bg-sunken px-3 py-1 font-mono text-xs text-ink dark:border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
