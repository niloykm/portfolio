"use client";

import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Layout,
  Server,
  Database,
  Gauge,
} from "lucide-react";

const ARCHITECTURAL_DOMAINS = [
  {
    num: "01",
    icon: Layout,
    title: "Frontend Systems & UI Architecture",
    tag: "React 19 • Next.js App Router • TypeScript • Tailwind CSS",
    description:
      "Engineering SSR/ISR web applications, deterministic client state machines, and accessible component libraries with zero cumulative layout shift.",
    deliverables: [
      "Server-First Next.js App Router & Streaming SSR",
      "Strict TypeScript contracts & modular design systems",
      "Sub-1.5s LCP & zero-CLS responsive viewports (360px–1440px+)",
    ],
  },
  {
    num: "02",
    icon: Server,
    title: "Backend & Distributed Services",
    tag: "NestJS • Node.js • Express.js • RBAC Auth",
    description:
      "Designing modular backend architectures, multi-role JWT/OAuth 2.0 security guards, concurrency-safe transactional locks, and webhook automations.",
    deliverables: [
      "Multi-tenant RBAC guards (Admin, Instructor, Doctor, Patient)",
      "RESTful API validation, rate limiting & error boundaries",
      "n8n workflow automation & asynchronous event webhooks",
    ],
  },
  {
    num: "03",
    icon: Database,
    title: "Database Modeling & Query Optimization",
    tag: "PostgreSQL • MongoDB • Prisma • TypeORM",
    description:
      "Structuring normalized relational schemas and compound-indexed document collections for high-concurrency read/write workloads.",
    deliverables: [
      "ACID transactions preventing concurrent slot/stock race conditions",
      "Covered MongoDB aggregation pipelines (-30% query latency)",
      "Schema migrations, indexing strategies & relational ledgers",
    ],
  },
  {
    num: "04",
    icon: Gauge,
    title: "Infrastructure, DevOps & E2E QA",
    tag: "Docker • GitHub Actions • Playwright E2E • WCAG AA",
    description:
      "Hardening production deployments with containerized environments, automated CI/CD verification suites, and strict accessibility compliance.",
    deliverables: [
      "Dockerized multi-service builds & Vercel/Cloud CI/CD",
      "Automated Playwright E2E specs for critical user journeys",
      "WCAG AA contrast ratios & full keyboard navigation",
    ],
  },
];

const STACK_SPECIFICATION_ROWS = [
  {
    category: "LANGUAGES & RUNTIME",
    items: ["TypeScript", "JavaScript (ES2024)", "Node.js", "SQL", "C++", "HTML5 / CSS3"],
  },
  {
    category: "FRONTEND ARCHITECTURE",
    items: ["Next.js (App Router)", "React 19", "Tailwind CSS", "Framer Motion", "Zustand", "Redux Toolkit"],
  },
  {
    category: "BACKEND & SECURITY",
    items: ["NestJS", "Express.js", "RESTful APIs", "JWT / OAuth 2.0 RBAC", "WebSockets", "n8n Automation"],
  },
  {
    category: "DATABASES & STORAGE",
    items: ["PostgreSQL", "MongoDB", "Prisma ORM", "TypeORM", "Mongoose", "Aggregation Pipelines"],
  },
  {
    category: "DEVOPS, QA & TOOLING",
    items: ["Docker", "Git & GitHub Actions", "Playwright E2E", "Linux / Bash", "Vercel Edge", "Postman"],
  },
];

const Services = () => {
  const shouldReduceMotion = useReducedMotion();

  const handleCtaClick = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16 border-b border-neutral-200 dark:border-neutral-800 relative"
    >
      {/* Alias anchor for #expertise */}
      <div id="expertise" className="absolute -top-20 left-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-12 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
              <span>02 // ARCHITECTURE &amp; CAPABILITIES</span>
            </div>
            <h2
              id="services-heading"
              className="fluid-h2 font-extrabold tracking-tight text-zinc-950 dark:text-white"
            >
              Technical Expertise &amp; Skills Matrix
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            End-to-end systems engineering across client rendering pipelines, modular backend services, and transactional data stores.
          </p>
        </div>

        {/* 2x2 Architectural Domain Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {ARCHITECTURAL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.num}
                className="rounded-lg bg-white dark:bg-zinc-900/40 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors duration-150 ease-out"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 text-zinc-900 dark:text-zinc-100">
                        <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        {domain.tag}
                      </span>
                    </div>
                    <span className="font-mono tabular-nums text-sm font-bold text-zinc-400 dark:text-zinc-500">
                      {domain.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight mb-2">
                    {domain.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                  {domain.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Density Tabular Skills Specification Matrix */}
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-zinc-900/40 overflow-hidden">
          <div className="px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/80 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              PRODUCTION STACK SPECIFICATION MATRIX
            </span>
            <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 tabular-nums">
              5 CORE LAYERS
            </span>
          </div>

          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {STACK_SPECIFICATION_ROWS.map((row) => (
              <div
                key={row.category}
                className="p-4 sm:px-6 sm:py-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
              >
                <div className="md:col-span-4 font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {row.category}
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-1.5">
                  {row.items.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded-md bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 border border-neutral-200 dark:border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Direct Action */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Need a full-stack system architected or scaled?
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              Available for full-time engineering roles, technical leadership, and high-impact contracts.
            </div>
          </div>
          <button
            type="button"
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold text-xs rounded-md transition-all duration-150 ease-out active:scale-[0.98] flex-shrink-0"
          >
            <span>Discuss Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
