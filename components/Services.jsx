"use client";

import {
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
    title: "Frontend Systems & UI Engineering",
    tag: "React 19 • Next.js App Router • TypeScript",
    description:
      "Building SSR/ISR web applications, deterministic client state flows, and accessible component libraries with zero layout shift.",
    deliverables: [
      "Server-first Next.js App Router & streaming SSR interfaces",
      "Strict TypeScript contracts and modular Tailwind design systems",
      "Sub-1.5s LCP and zero-CLS responsive layouts (360px–1440px+)",
    ],
  },
  {
    num: "02",
    icon: Server,
    title: "Backend Services & Auth Architecture",
    tag: "NestJS • Node.js • Express • JWT RBAC",
    description:
      "Designing modular REST APIs, multi-role JWT/OAuth 2.0 security guards, concurrency-safe endpoints, and webhook pipelines.",
    deliverables: [
      "Multi-tenant RBAC guards (Admin, Instructor, Doctor, Patient)",
      "Typed request validation, rate limiting, and structured error handling",
      "Asynchronous webhook processing and reliable retry flows",
    ],
  },
  {
    num: "03",
    icon: Database,
    title: "Database Modeling & Query Tuning",
    tag: "PostgreSQL • MongoDB • Prisma • TypeORM",
    description:
      "Structuring normalized relational schemas and compound-indexed document collections for concurrent read/write workloads.",
    deliverables: [
      "ACID transactional locks preventing slot and inventory race conditions",
      "Covered MongoDB aggregation pipelines cutting query latency by 30%",
      "Schema migrations, indexing strategies, and audit-ready ledgers",
    ],
  },
  {
    num: "04",
    icon: Gauge,
    title: "Infrastructure, CI/CD & E2E Quality",
    tag: "Docker • GitHub Actions • Playwright • WCAG AA",
    description:
      "Hardening production releases with containerized environments, automated browser tests, and verified accessibility compliance.",
    deliverables: [
      "Dockerized multi-service builds and automated Vercel/GitHub CI/CD",
      "Playwright E2E test suites verifying critical user journeys",
      "WCAG AA contrast compliance and complete keyboard navigation",
    ],
  },
];

const STACK_SPECIFICATION_ROWS = [
  {
    category: "Languages & Core",
    items: ["TypeScript", "JavaScript (ES2024)", "Node.js", "SQL", "C++", "HTML5 / CSS3"],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React 19", "Tailwind CSS", "Framer Motion", "Zustand", "Redux Toolkit"],
  },
  {
    category: "Backend & Auth",
    items: ["NestJS", "Express.js", "REST APIs", "JWT / OAuth 2.0", "WebSockets"],
  },
  {
    category: "Databases & ORMs",
    items: ["PostgreSQL", "MongoDB", "Prisma", "TypeORM", "Mongoose"],
  },
  {
    category: "DevOps & QA",
    items: ["Docker", "GitHub Actions", "Playwright", "Linux / Bash", "Vercel"],
  },
];

const Services = ({ onSelectStackTag }) => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] relative"
    >
      {/* Alias anchor for #expertise */}
      <div id="expertise" className="absolute -top-20 left-0" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-1.5">
              03 // Capabilities &amp; Stack
            </div>
            <h2
              id="services-heading"
              className="fluid-h2 font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              Technical Capabilities &amp; Stack Matrix
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-prose leading-relaxed">
            End-to-end engineering across client rendering, modular backend services, transactional databases, and automated QA.
          </p>
        </div>

        {/* 2x2 Architectural Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {ARCHITECTURAL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.num}
                className="rounded-lg bg-[#fafafa] dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors duration-[220ms] p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-md bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                        <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 truncate">
                        {domain.tag}
                      </span>
                    </div>
                    <span className="font-mono tabular-nums text-xs font-bold text-zinc-500 dark:text-zinc-400 flex-shrink-0">
                      {domain.num}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50 tracking-tight mb-2">
                    {domain.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {domain.description}
                  </p>
                </div>

                <ul className="pt-3.5 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                  {domain.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* High-Density Interactive Stack Matrix */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-[#fafafa] dark:bg-[#111114] overflow-hidden">
          <div className="px-5 py-3.5 bg-zinc-100/80 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Production Stack Matrix
            </span>
            <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
              Select a technology to filter projects
            </span>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {STACK_SPECIFICATION_ROWS.map((row) => (
              <div
                key={row.category}
                className="p-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
              >
                <div className="md:col-span-3 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  {row.category}
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-1.5">
                  {row.items.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => onSelectStackTag?.(tech.split(" ")[0])}
                      className="font-mono text-xs px-2.5 py-1 rounded-md bg-white dark:bg-[#09090b] hover:bg-zinc-950 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-950 hover:border-zinc-950 dark:hover:border-zinc-100 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 interactive-btn"
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
