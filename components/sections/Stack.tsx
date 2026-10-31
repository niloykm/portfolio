'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Layers,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { stackLayers, coreStackMatrix } from '@/data/stack';

const AI_PIPELINE_NODES = [
  {
    step: '01',
    title: 'Webhook / Trigger',
    detail: 'REST Event / Client Payload',
    badge: 'Ingest',
  },
  {
    step: '02',
    title: 'n8n / Orchestrator',
    detail: 'Routing, Retries & Context',
    badge: 'Workflow',
  },
  {
    step: '03',
    title: 'OpenAI / Gemini API',
    detail: 'Tool Calling & Strict JSON Schema',
    badge: 'LLM Engine',
  },
  {
    step: '04',
    title: 'PostgreSQL / Action',
    detail: 'Validated State & Dispatch',
    badge: 'Persist',
  },
];

export function Stack() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...coreStackMatrix.map((c) => c.category)];

  return (
    <Section
      id="stack"
      badge="02 // AI & Architecture"
      label="Engineering Impact & Capabilities Bento"
      subtitle="Production AI pipelines, measurable Core Web Vitals & database latency wins, and full-stack SaaS leadership."
    >
      {/* Top Bento Row: AI Pipeline (Span 7) + Performance & Leadership (Span 5) */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Card 1: AI & Agentic Workflows Card */}
        <div className="bento-card flex flex-col justify-between p-6 sm:p-7 lg:col-span-7">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-0.5 font-mono text-xs font-medium text-purple-700 dark:text-purple-300">
                <Bot className="h-3.5 w-3.5" aria-hidden="true" />
                <span>AI &amp; Agentic Workflows</span>
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <Zap className="h-3 w-3" aria-hidden="true" />
                <span>-40% Manual Triage Time</span>
              </span>
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight text-ink">
                Deterministic LLM Pipelines &amp; n8n Webhook Automation
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Architecting production AI features that move beyond raw chat
                wrappers—using strict JSON schema enforcement, function calling,
                and automated n8n webhook pipelines.
              </p>
            </div>

            {/* Visual Node Pipeline */}
            <div className="rounded-2xl border border-zinc-200/80 bg-bg-sunken/60 p-4 dark:border-zinc-800/80">
              <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Workflow className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  <span>PRODUCTION ORCHESTRATION PIPELINE</span>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  ● SCHEMA_VALIDATED
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-4">
                {AI_PIPELINE_NODES.map((node, index) => (
                  <div
                    key={node.step}
                    className="relative flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-surface p-3 shadow-sm dark:border-zinc-800"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-accent">
                        {node.step}
                      </span>
                      <span className="rounded bg-bg-sunken px-1.5 py-0.5 font-mono text-[10px] text-muted">
                        {node.badge}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-ink">
                        {node.title}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-muted">
                        {node.detail}
                      </p>
                    </div>
                    {index < AI_PIPELINE_NODES.length - 1 && (
                      <ArrowRight
                        className="hidden sm:block absolute -right-2.5 top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 text-muted"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-1.5 pt-2">
            {[
              'OpenAI API',
              'Gemini API',
              'Structured JSON Outputs',
              'Function Calling',
              'RAG Concepts',
              'n8n Workflows',
              'Webhooks',
            ].map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-zinc-200/80 bg-bg-sunken px-2.5 py-1 font-mono text-[11px] text-ink dark:border-zinc-800"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column (Span 5): Performance Engineering Card + Technical Leadership Card */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          {/* Card 2: Performance Engineering Card */}
          <div className="bento-card flex-1 p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-0.5 font-mono text-xs font-medium text-blue-700 dark:text-blue-300">
                <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Performance Engineering</span>
              </span>
              <span className="font-mono text-xs text-muted">Core Web Vitals &amp; DB</span>
            </div>

            <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">
              Measurable Speed &amp; Query Optimization
            </h3>

            <div className="mt-4 space-y-3.5">
              {/* LCP Metric Comparison */}
              <div className="rounded-xl border border-zinc-200/80 bg-bg-sunken/50 p-3.5 dark:border-zinc-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-ink">
                    Largest Contentful Paint (LCP)
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    3.2s → 1.5s (-53%)
                  </span>
                </div>
                <div className="mt-2 space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-14 text-muted">Before</span>
                    <div className="h-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                      <div className="h-full w-full rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    </div>
                    <span className="w-8 text-right text-muted">3.2s</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-14 text-ink font-semibold">After</span>
                    <div className="h-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                      <div className="h-full w-[47%] rounded-full bg-emerald-500" />
                    </div>
                    <span className="w-8 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                      1.5s
                    </span>
                  </div>
                </div>
              </div>

              {/* MongoDB Aggregation Latency */}
              <div className="rounded-xl border border-zinc-200/80 bg-bg-sunken/50 p-3.5 dark:border-zinc-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-ink">
                    MongoDB Aggregation Latency
                  </span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    -30% Response Time
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  Compound indexing &amp; pipeline projection pruning across
                  ScholarPASS enrollment and governance portals.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Technical Leadership Card */}
          <div className="bento-card flex-1 p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-0.5 font-mono text-xs font-medium text-amber-700 dark:text-amber-300">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Technical Leadership</span>
              </span>
              <span className="font-mono text-xs text-muted">Gen Stella IT</span>
            </div>

            <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">
              Co-Founder &amp; End-to-End SaaS Architect
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted">
              Leading product architecture from zero-to-one MVP to production
              across Healthcare, EdTech, and Travel SaaS with modular Next.js,
              NestJS, PostgreSQL, Playwright E2E, and automated Vercel CI/CD.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Card Engineering Architecture Domains */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {stackLayers.map((domain, idx) => (
          <div
            key={domain.id}
            className="bento-card min-w-0 flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {domain.code}
                </span>
                <span className="rounded-full border border-zinc-200/80 bg-bg-sunken px-2.5 py-0.5 font-mono text-[11px] font-medium text-ink dark:border-zinc-800">
                  {domain.highlightMetric}
                </span>
              </div>

              <h3 className="mt-3 text-base font-semibold text-ink flex items-center gap-2">
                {idx === 0 && (
                  <Sparkles className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                )}
                {idx === 1 && (
                  <Layers className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                )}
                {idx === 2 && (
                  <Database className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                )}
                <span>{domain.layer}</span>
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {domain.usage}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-zinc-200/70 pt-4 dark:border-zinc-800/70">
              {domain.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-zinc-200/80 bg-bg-sunken px-2.5 py-1 font-mono text-[11px] text-ink dark:border-zinc-800"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Card 4: Categorized Interactive Core Stack Pill Matrix */}
      <div className="bento-card mt-5 p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200/80 bg-bg-sunken text-accent dark:border-zinc-800">
              <Cpu className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-ink">
                Core Stack Pill Matrix
              </h3>
              <p className="text-xs text-muted">
                Filter technologies across AI, Frontend, Backend/Data, and DevOps
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                    active
                      ? 'bg-ink text-bg font-medium'
                      : 'border border-zinc-200/80 bg-bg-sunken text-muted hover:text-ink dark:border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreStackMatrix
            .filter(
              (group) =>
                selectedCategory === 'All' ||
                group.category === selectedCategory
            )
            .map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-zinc-200/70 bg-bg-sunken/40 p-4 dark:border-zinc-800/70"
              >
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink flex items-center gap-1.5">
                  <GitBranch className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  <span>{group.category}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-zinc-200/80 bg-surface px-2.5 py-1 font-mono text-xs text-ink shadow-sm dark:border-zinc-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
}
