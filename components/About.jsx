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
  ArrowUpRight,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import DevTerminal from "@/components/ui/DevTerminal";
import { useGitHubStats } from "@/lib/useGitHubStats";
import { FALLBACK_METRICS, GITHUB_PROFILE_URL, GITHUB_USERNAME } from "@/lib/github";
import { MODAL_TRANSITION } from "@/lib/motion";

const EXPERIENCE_TIMELINE = [
  {
    period: "2025 — PRESENT",
    role: "Full-Stack Software Engineer",
    organization: "ScholarPASS",
    type: "EdTech Platform",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "OAuth / JWT"],
    summary:
      "Engineering multi-tenant LMS portals, role-isolated authentication engines, and scholarship workflow pipelines.",
    metrics: [
      "Built compound-indexed MongoDB aggregation pipelines cutting curriculum and catalog query latency by 30%",
      "Implemented role-isolated student, sponsor, instructor, and admin portals with JWT session guards",
    ],
  },
  {
    period: "2025 — 2026",
    role: "Frontend Engineer",
    organization: "TripBooking.ai",
    type: "Travel & AI SaaS",
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    summary:
      "Architected multi-vertical travel search, itinerary filtering, and booking interfaces across hotels, flights, and tours.",
    metrics: [
      "Optimized Core Web Vitals across dynamic search feeds, reducing Largest Contentful Paint (LCP) from 3.2s to 1.5s",
      "Eliminated redundant client re-renders using memoized state selectors and deterministic client caching",
    ],
  },
  {
    period: "2025",
    role: "Frontend Engineer",
    organization: "TutorsPlan",
    type: "EdTech SaaS",
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    summary:
      "Built interactive tutor scheduling matrices, live analytics dashboards, and reusable accessible UI components.",
    metrics: [
      "Delivered WCAG AA compliant, zero-CLS dashboard layouts across mobile (360px+) and desktop viewports",
      "Standardized shared form validation and asynchronous data-fetching patterns across product modules",
    ],
  },
  {
    period: "2022 — 2026",
    role: "B.Sc. in Computer Science & Engineering (CSE)",
    organization: "Daffodil International University (DIU)",
    type: "Academic Foundation",
    stack: ["C++", "Data Structures", "Algorithms", "OS", "DBMS"],
    summary:
      "Computer science degree grounded in algorithmic problem solving, relational database modeling, and systems design.",
    metrics: [
      "Solved 200+ algorithmic and data-structure problems in C++ across competitive programming judges",
      "Led full-stack capstone projects integrating relational schemas, REST APIs, and responsive Next.js frontends",
    ],
  },
];

const About = ({ projectCount = 14 }) => {
  const [timeString, setTimeString] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeConsole, setActiveConsole] = useState(false);
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
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-1.5">
              02 // Experience &amp; Track Record
            </div>
            <h2
              id="about-heading"
              className="fluid-h2 font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              Engineering Career Ledger
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            Production delivery across multi-tenant EdTech platforms, travel SaaS interfaces, and full-stack TypeScript systems.
          </p>
        </div>

        {/* Asymmetric 12-Column Layout: 7-Col Career Timeline + 5-Col Verified Metrics & Opt-In CLI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 Cols): Chronological Career & Academic Ledger */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-semibold flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Roles &amp; Education</span>
              </span>
              <a
                href="/niloy.pdf"
                download="Niloy_Kumar_Mohonta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-150"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV (PDF)</span>
              </a>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-[#111114] overflow-hidden">
              {EXPERIENCE_TIMELINE.map((item, idx) => {
                const isAcademic = item.organization.includes("University");
                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50 transition-colors duration-150 ease-out"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isAcademic ? (
                          <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        )}
                        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                          {item.role}
                        </h3>
                        <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          @ {item.organization}
                        </span>
                      </div>
                      <span className="font-mono tabular-nums text-xs text-zinc-600 dark:text-zinc-400 flex-shrink-0">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3">
                      {item.summary}
                    </p>

                    <ul className="space-y-1.5 mb-3.5">
                      {item.metrics.map((metric, mIdx) => (
                        <li
                          key={mIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
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

          {/* Right Column (5 Cols): Verified Engineering Metrics, Timezone & Opt-In CLI */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-lg bg-white dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800">
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-800 dark:text-zinc-200">
                  Verified Engineering Metrics
                </span>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                >
                  <span>@{GITHUB_USERNAME}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 3 Verified Real Metrics — Zero Vanity Counters */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-md bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tabular-nums">
                    <AnimatedCounter
                      value={githubStats.publicRepos}
                      fallbackValue={FALLBACK_METRICS.publicRepos}
                    />
                  </div>
                  <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Public Repos
                  </div>
                </div>

                <div className="p-3 rounded-md bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tabular-nums">
                    <AnimatedCounter
                      value={githubStats.experienceYears}
                      fallbackValue={3}
                      suffix="+"
                    />
                  </div>
                  <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Years Exp
                  </div>
                </div>

                <div className="p-3 rounded-md bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                    <AnimatedCounter
                      value={projectCount}
                      fallbackValue={14}
                    />
                  </div>
                  <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Live Apps
                  </div>
                </div>
              </div>

              {/* Local Timezone & Availability Card */}
              <div className="p-4 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono space-y-2.5">
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
                  {mounted && timeString ? timeString : "12:00:00 PM"}
                </div>
                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs">
                  <span className="text-zinc-400">AVAILABILITY</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Remote / Hybrid Ready</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Opt-in Interactive Developer CLI Card */}
            <div className="rounded-lg bg-white dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Interactive Workstation CLI</span>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-semibold">
                  Optional
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Prefer a shell? Query skills, project URLs, and resume summary directly with commands like{" "}
                <code className="font-mono text-zinc-900 dark:text-zinc-200">skills</code>,{" "}
                <code className="font-mono text-zinc-900 dark:text-zinc-200">projects</code>, and{" "}
                <code className="font-mono text-zinc-900 dark:text-zinc-200">cat resume</code>.
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
                className="w-full py-2.5 px-4 min-h-[40px] bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold text-xs rounded-md interactive-btn flex items-center justify-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{activeConsole ? "Hide Terminal" : "Launch Interactive CLI"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Interactive Developer Console (GPU-composited transform/opacity only) */}
        <AnimatePresence initial={false}>
          {activeConsole && (
            <motion.div
              id="interactive-dev-terminal"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={MODAL_TRANSITION}
              className="mt-8"
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
