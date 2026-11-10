"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Terminal,
  Clock,
  Globe2,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Download,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import DevTerminal from "@/components/ui/DevTerminal";
import { useGitHubStats } from "@/lib/useGitHubStats";
import { FALLBACK_METRICS } from "@/lib/github";

const EXPERIENCE_TIMELINE = [
  {
    period: "2026 — PRESENT",
    role: "Co-Founder & Technical Lead",
    organization: "Gen Stella IT",
    type: "Leadership & Architecture",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Docker", "n8n"],
    summary:
      "Directing full-stack SaaS architecture, multi-tenant database design, and automated deployment pipelines.",
    metrics: [
      "Architected modular Next.js & NestJS/PostgreSQL production systems with strict multi-role RBAC",
      "Engineered n8n webhook automation pipelines reducing manual operational triage by 40%",
    ],
  },
  {
    period: "2025 — PRESENT",
    role: "Full-Stack Software Engineer",
    organization: "ScholarPASS",
    type: "EdTech Platform",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "OAuth / JWT"],
    summary:
      "Engineered multi-tenant LMS portals, custom RBAC authentication engines, and scholarship workflow pipelines.",
    metrics: [
      "Built compound-indexed MongoDB aggregation pipelines cutting curriculum & catalog query latency by 30%",
      "Implemented role-isolated student, instructor, and administrator portals with JWT session guards",
    ],
  },
  {
    period: "2025 — 2026",
    role: "Frontend Engineer",
    organization: "TripBooking.ai",
    type: "Travel & AI SaaS",
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    summary:
      "Architected high-concurrency travel search, itinerary filtering, and multi-step booking interfaces.",
    metrics: [
      "Optimized Core Web Vitals across dynamic search feeds, reducing Largest Contentful Paint (LCP) from 3.2s to 1.5s",
      "Eliminated redundant client re-renders using memoized state selectors and deterministic caching",
    ],
  },
  {
    period: "2025",
    role: "Frontend Engineer",
    organization: "TutorsPlan",
    type: "EdTech SaaS",
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    summary:
      "Developed interactive tutor scheduling matrices, real-time analytics dashboards, and accessible UI components.",
    metrics: [
      "Delivered WCAG AA compliant, zero-CLS dashboard layouts across mobile (360px+) and desktop viewports",
      "Standardized reusable form validation and asynchronous data-fetching patterns",
    ],
  },
  {
    period: "2022 — 2026",
    role: "B.Sc. in Computer Science & Engineering (CSE)",
    organization: "Daffodil International University (DIU)",
    type: "Academic Foundation",
    stack: ["C++", "Data Structures", "Algorithms", "OS", "DBMS"],
    summary:
      "Rigorous computer science foundation in algorithmic complexity, relational database systems, and software engineering.",
    metrics: [
      "Solved 200+ algorithmic and data-structure problems in C++ across competitive programming judges",
      "Led full-stack capstone systems integrating relational schemas, REST APIs, and modern web clients",
    ],
  },
];

const About = () => {
  const [timeString, setTimeString] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeConsole, setActiveConsole] = useState(true);
  const [userToggledConsole, setUserToggledConsole] = useState(false);

  const githubStats = useGitHubStats(FALLBACK_METRICS);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      try {
        const options = {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        setTimeString(
          new Intl.DateTimeFormat("en-US", options).format(new Date())
        );
      } catch {
        setTimeString(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleTerminal = () => {
    setUserToggledConsole(true);
    setActiveConsole((prev) => !prev);
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16 border-b border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header — Editorial Left-Aligned */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-12 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
              <span>01 // EXPERIENCE &amp; TELEMETRY</span>
            </div>
            <h2
              id="about-heading"
              className="fluid-h2 font-extrabold tracking-tight text-zinc-950 dark:text-white"
            >
              Engineering Track Record
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            Production leadership across SaaS platforms, multi-tenant EdTech architectures, and high-concurrency web applications.
          </p>
        </div>

        {/* Asymmetric 12-Column Layout: 7-Col Experience Timeline + 5-Col Telemetry & CLI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (7 Cols): Structured Tabular Experience Timeline */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Chronological Career &amp; Academic Ledger</span>
              </span>
              <a
                href="/niloy.pdf"
                download="Niloy_Kumar_Mohonta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-150"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Full CV (PDF)</span>
              </a>
            </div>

            <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-zinc-900/40 overflow-hidden">
              {EXPERIENCE_TIMELINE.map((item, idx) => {
                const isAcademic = item.organization.includes("University");
                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/80 transition-colors duration-150 ease-out"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isAcademic ? (
                          <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        )}
                        <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
                          {item.role}
                        </h3>
                        <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          @ {item.organization}
                        </span>
                      </div>
                      <span className="font-mono tabular-nums text-xs text-zinc-500 dark:text-zinc-400 flex-shrink-0">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3">
                      {item.summary}
                    </p>

                    <ul className="space-y-1.5 mb-3.5">
                      {item.metrics.map((metric, mIdx) => (
                        <li
                          key={mIdx}
                          className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-neutral-200 dark:border-neutral-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (5 Cols): Telemetry Counters, Workstation Clock & CLI Trigger */}
          <div className="lg:col-span-5 space-y-6">
            {/* High-Density Engineering Telemetry Card */}
            <div className="rounded-lg bg-white dark:bg-zinc-900/40 border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-700 dark:text-zinc-300">
                  LIVE TELEMETRY &amp; METRICS
                </span>
                <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  VERIFIED
                </span>
              </div>

              {/* 3 Key Metrics Grid — Zero CLS */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tabular-nums">
                    <AnimatedCounter
                      value={githubStats.publicRepos}
                      fallbackValue={50}
                      suffix="+"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
                    GitHub Repos
                  </div>
                </div>

                <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tabular-nums">
                    <AnimatedCounter
                      value={githubStats.experienceYears}
                      fallbackValue={3}
                      suffix="+ Yrs"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
                    Development Exp
                  </div>
                </div>

                <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    <AnimatedCounter
                      value={githubStats.commitmentPct}
                      fallbackValue={100}
                      suffix="%"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
                    Commitment to Craft
                  </div>
                </div>
              </div>

              {/* Workstation Time & Availability Ledger */}
              <div className="p-4 rounded-md bg-zinc-950 border border-neutral-800 text-zinc-100 font-mono space-y-2.5">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dhaka, Bangladesh</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>UTC+6</span>
                  </span>
                </div>
                <div
                  suppressHydrationWarning
                  className="text-xl sm:text-2xl font-bold text-white tracking-wider tabular-nums"
                >
                  {mounted && timeString ? timeString : "06:00:00 PM"}
                </div>
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400">STATUS</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Ready for immediate onboarding</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive CLI Control Card */}
            <div className="rounded-lg bg-white dark:bg-zinc-900/40 border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Interactive Workstation CLI</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold">
                  zsh v3.0
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Inspect stack specifications, work history, and project links directly via terminal commands (
                <code className="font-mono text-zinc-900 dark:text-zinc-200">help</code>,{" "}
                <code className="font-mono text-zinc-900 dark:text-zinc-200">skills</code>,{" "}
                <code className="font-mono text-zinc-900 dark:text-zinc-200">projects</code>,{" "}
                <code className="font-mono text-zinc-900 dark:text-zinc-200">cat resume</code>).
              </p>

              <button
                type="button"
                onClick={handleToggleTerminal}
                aria-label={
                  activeConsole
                    ? "Hide interactive developer terminal"
                    : "Launch interactive developer terminal"
                }
                aria-expanded={activeConsole}
                aria-controls="interactive-dev-terminal"
                className="w-full py-2 px-4 min-h-[38px] bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold text-xs rounded-md transition-all duration-150 ease-out active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{activeConsole ? "Hide Terminal" : "Launch Terminal"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Live Developer Console View */}
        <AnimatePresence initial={false}>
          {activeConsole && (
            <motion.div
              id="interactive-dev-terminal"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-8 overflow-hidden"
            >
              <DevTerminal autoFocusOnMount={userToggledConsole} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;
