"use client";

import { assets, workData as defaultWorkData } from "@/assets/assets";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Database,
  Server,
  Code2,
  Cpu,
  Gauge,
  AlertTriangle,
  Layers,
  X,
} from "lucide-react";
import ProjectModal from "@/components/ui/ProjectModal";

const getTechChipIcon = (tech) => {
  const lower = tech.toLowerCase();
  if (
    lower.includes("postgres") ||
    lower.includes("mongo") ||
    lower.includes("sql")
  ) {
    return Database;
  }
  if (
    lower.includes("node") ||
    lower.includes("nest") ||
    lower.includes("express") ||
    lower.includes("docker")
  ) {
    return Server;
  }
  if (
    lower.includes("react") ||
    lower.includes("next") ||
    lower.includes("type") ||
    lower.includes("tailwind")
  ) {
    return Code2;
  }
  return Cpu;
};

const Work = ({
  workData,
  activeStackTag = "",
  onClearStackTag,
  onSelectStackTag,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const displayWorkData =
    workData && workData.length > 0 ? workData : defaultWorkData;

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedTeardownId, setExpandedTeardownId] = useState(null);

  const categories = [
    "All",
    "Full-Stack",
    "Frontend & Tools",
    "AI & Utilities",
  ];

  const filteredProjects = useMemo(() => {
    return displayWorkData.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const matchesTag =
        !activeStackTag ||
        (Array.isArray(project.techStack) &&
          project.techStack.some((t) =>
            t.toLowerCase().includes(activeStackTag.toLowerCase())
          ));
      return matchesCategory && matchesTag;
    });
  }, [displayWorkData, activeCategory, activeStackTag]);

  const handleCtaClick = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const toggleInlineTeardown = (projectId) => {
    setExpandedTeardownId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16 border-b border-neutral-200 dark:border-neutral-800 relative"
    >
      {/* Legacy #work anchor alias */}
      <div id="work" className="absolute -top-20 left-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-10 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
              <span>03 // PRODUCTION SYSTEMS &amp; CASE STUDIES</span>
            </div>
            <h2
              id="projects-heading"
              className="fluid-h2 font-extrabold tracking-tight text-zinc-950 dark:text-white"
            >
              Featured Engineering Projects
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mt-2 leading-relaxed">
              Full-stack SaaS platforms, multi-role RBAC portals, and zero-latency developer utilities with complete architectural breakdowns.
            </p>
          </div>

          {/* Crisp Monospace Category Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 min-h-[36px] rounded-md font-mono text-xs font-medium transition-all duration-150 ease-out active:scale-[0.98] border ${
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 font-semibold"
                      : "bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-neutral-200 dark:border-neutral-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stack Tag Filter Pill */}
        {activeStackTag && (
          <div className="flex items-center justify-between px-4 py-2.5 mb-8 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono">
            <span>
              FILTERED BY STACK TAG: <strong>{activeStackTag}</strong> (
              {filteredProjects.length} matching)
            </span>
            <button
              type="button"
              onClick={() => onClearStackTag?.()}
              aria-label={`Clear ${activeStackTag} stack filter`}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors duration-150"
            >
              <span>Clear</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Asymmetric Editorial Projects Grid (Flagship Span + 2-Column Technical Ledger) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            const projectId = project.id || project.title || String(index);
            const isExpanded = expandedTeardownId === projectId;
            const isFlagship = index === 0 && activeCategory === "All" && !activeStackTag;

            const projectImg =
              project.bgImage ||
              (project.bgImageName && assets[project.bgImageName]) ||
              assets.handsOn;

            const matchedStatic = defaultWorkData.find(
              (s) => s.id === project.id || s.title === project.title
            );
            const teardown = project.teardown ||
              matchedStatic?.teardown || {
                problemSolved:
                  project.longDescription ||
                  "Solved workflow bottlenecks with a modern full-stack web architecture.",
                architecture:
                  "RESTful Node.js/NestJS backend services paired with indexed MongoDB/PostgreSQL schemas and JWT RBAC.",
                performanceChallenges:
                  "Optimized Core Web Vitals, state synchronization, and sub-second query response times.",
              };

            const techList =
              project.techStack && project.techStack.length > 0
                ? project.techStack
                : matchedStatic?.techStack || [
                    "React.js",
                    "Next.js",
                    "Node.js",
                    "MongoDB",
                  ];

            const indexLabel = String(index + 1).padStart(2, "0");

            return (
              <article
                key={projectId}
                className={`${
                  isFlagship ? "lg:col-span-12" : "lg:col-span-6"
                } rounded-lg bg-white dark:bg-zinc-900/40 border border-neutral-200 dark:border-neutral-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors duration-150 ease-out overflow-hidden flex flex-col justify-between`}
              >
                <div
                  className={
                    isFlagship
                      ? "grid grid-cols-1 lg:grid-cols-12"
                      : "flex flex-col flex-1"
                  }
                >
                  {/* Visual Preview Header */}
                  <div
                    className={`relative overflow-hidden bg-zinc-950 border-b ${
                      isFlagship
                        ? "lg:col-span-5 h-56 sm:h-72 lg:h-full lg:border-b-0 lg:border-r"
                        : "h-48 sm:h-52 w-full"
                    } border-neutral-200 dark:border-neutral-800`}
                  >
                    <Image
                      src={projectImg}
                      alt={project.title}
                      fill
                      sizes={
                        isFlagship
                          ? "(max-width: 1024px) 100vw, 45vw"
                          : "(max-width: 1024px) 100vw, 50vw"
                      }
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono tabular-nums text-[11px] font-bold px-2 py-0.5 rounded bg-zinc-950/90 text-zinc-200 border border-neutral-700">
                          {indexLabel}
                        </span>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-zinc-950/90 text-emerald-400 border border-emerald-500/40">
                          {project.category || "Full-Stack"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProject({
                            ...matchedStatic,
                            ...project,
                            teardown,
                            techStack: techList,
                          })
                        }
                        aria-label={`Open full technical teardown modal for ${project.title}`}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-zinc-100 bg-zinc-950/90 hover:bg-zinc-800 px-2.5 py-1 rounded border border-neutral-700 transition-colors duration-150 active:scale-[0.98]"
                      >
                        <Layers className="w-3 h-3 text-emerald-400" />
                        <span>Specs Modal</span>
                      </button>
                    </div>
                  </div>

                  {/* Architectural Summary Body */}
                  <div
                    className={`${
                      isFlagship ? "lg:col-span-7 p-6 sm:p-7" : "p-5 sm:p-6"
                    } flex flex-col justify-between flex-1`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3
                          onClick={() =>
                            setSelectedProject({
                              ...matchedStatic,
                              ...project,
                              teardown,
                              techStack: techList,
                            })
                          }
                          className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-150 cursor-pointer"
                        >
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                        {project.longDescription || project.description}
                      </p>

                      {/* Always-Visible System Architecture Preview */}
                      <div className="p-3.5 rounded-md bg-zinc-50 dark:bg-zinc-950/90 border border-neutral-200 dark:border-neutral-800 mb-4 space-y-2 text-xs">
                        <div>
                          <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-200">
                            ARCHITECTURE:{" "}
                          </span>
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {teardown.architecture}
                          </span>
                        </div>
                        <div>
                          <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                            SCALE &amp; PERF:{" "}
                          </span>
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {teardown.performanceChallenges}
                          </span>
                        </div>
                      </div>

                      {/* Real Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {techList.map((tech, tIdx) => {
                          const ChipIcon = getTechChipIcon(tech);
                          return (
                            <button
                              key={tIdx}
                              type="button"
                              onClick={() => onSelectStackTag?.(tech)}
                              aria-label={`Filter projects by ${tech}`}
                              className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded border border-neutral-200 dark:border-neutral-800 transition-colors duration-150 active:scale-[0.98]"
                            >
                              <ChipIcon className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                              <span>{tech}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Expandable Full Problem & Deliverables Teardown */}
                      <div className="mb-2">
                        <button
                          type="button"
                          onClick={() => toggleInlineTeardown(projectId)}
                          aria-expanded={isExpanded}
                          aria-label={`Toggle technical teardown for ${project.title}`}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-zinc-100/80 dark:bg-zinc-900 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200 transition-colors duration-150"
                        >
                          <span className="flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Problem Statement &amp; Deliverables</span>
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 p-3.5 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 space-y-2.5 text-xs">
                                <div>
                                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1 mb-0.5">
                                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                                    <span>Problem Solved:</span>
                                  </span>
                                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {teardown.problemSolved}
                                  </p>
                                </div>

                                {project.highlights &&
                                  project.highlights.length > 0 && (
                                    <div>
                                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1 mb-1">
                                        <Gauge className="w-3 h-3 text-emerald-500" />
                                        <span>Key Engineering Deliverables:</span>
                                      </span>
                                      <ul className="space-y-1 pl-4 list-disc text-zinc-600 dark:text-zinc-400">
                                        {project.highlights.map((h, hIdx) => (
                                          <li key={hIdx}>{h}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Card Footer Action Bar */}
                    <div className="pt-4 mt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open live demo for ${project.title}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 rounded-md font-mono text-xs font-semibold transition-all duration-150 ease-out active:scale-[0.98]"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} repository on GitHub (niloydiu)`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-neutral-200 dark:border-neutral-800 rounded-md font-mono text-xs font-semibold transition-all duration-150 ease-out active:scale-[0.98]"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProject({
                            ...matchedStatic,
                            ...project,
                            teardown,
                            techStack: techList,
                          })
                        }
                        aria-label={`View full technical teardown modal for ${project.title}`}
                        className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-150"
                      >
                        Full Specs →
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Repository Archive & CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-neutral-200 dark:border-neutral-800">
          <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
            Showing <strong className="text-zinc-900 dark:text-zinc-100">{filteredProjects.length}</strong> production case studies • 50+ additional open-source repositories on GitHub.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/niloydiu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore all public repositories on GitHub (@niloydiu)"
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[38px] bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-neutral-800 text-zinc-800 dark:text-zinc-200 font-mono font-semibold rounded-md text-xs transition-all duration-150 ease-out active:scale-[0.98]"
            >
              <Github className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>All Repositories (@niloydiu)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[38px] bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold rounded-md text-xs transition-all duration-150 ease-out active:scale-[0.98]"
            >
              <span>Discuss an Engineering Project</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Deep Dive Technical Teardown Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Work;
