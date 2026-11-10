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
  Shield,
  Activity,
  Sparkles,
  Terminal,
} from "lucide-react";
import ProjectModal from "@/components/ui/ProjectModal";

const getTechChipIcon = (tech) => {
  const lower = tech.toLowerCase();
  if (
    lower.includes("postgres") ||
    lower.includes("mongo") ||
    lower.includes("sql") ||
    lower.includes("prisma") ||
    lower.includes("supabase")
  ) {
    return Database;
  }
  if (
    lower.includes("node") ||
    lower.includes("nest") ||
    lower.includes("express") ||
    lower.includes("docker") ||
    lower.includes("otel") ||
    lower.includes("prometheus")
  ) {
    return Server;
  }
  if (
    lower.includes("react") ||
    lower.includes("next") ||
    lower.includes("type") ||
    lower.includes("tailwind") ||
    lower.includes("vite")
  ) {
    return Code2;
  }
  if (
    lower.includes("security") ||
    lower.includes("fingerprint") ||
    lower.includes("tls") ||
    lower.includes("jwt")
  ) {
    return Shield;
  }
  return Cpu;
};

const FILTER_CATEGORIES = [
  "All",
  "Systems & DevOps",
  "Enterprise & Operations",
  "EdTech & Health",
  "Consumer & Utilities",
];

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

  const filteredProjects = useMemo(() => {
    return displayWorkData.filter((project) => {
      // Critical Exclusion Rule Guard: never render private partner app
      if (
        project.id === "tithyniloy" ||
        project.slug === "tithyniloy" ||
        (project.url && project.url.includes("tithyniloy"))
      ) {
        return false;
      }

      let matchesCategory = activeCategory === "All";
      if (!matchesCategory) {
        if (project.filterCategory === activeCategory) {
          matchesCategory = true;
        } else if (
          activeCategory === "Systems & DevOps" &&
          (project.category?.includes("Cloud") ||
            project.category?.includes("DevOps") ||
            project.category?.includes("Security") ||
            project.category?.includes("AI"))
        ) {
          matchesCategory = true;
        } else if (
          activeCategory === "Enterprise & Operations" &&
          (project.category?.includes("FinTech") ||
            project.category?.includes("Operations") ||
            project.category?.includes("Commerce"))
        ) {
          matchesCategory = true;
        } else if (
          activeCategory === "EdTech & Health" &&
          (project.category?.includes("EdTech") ||
            project.category?.includes("Healthcare"))
        ) {
          matchesCategory = true;
        } else if (
          activeCategory === "Consumer & Utilities" &&
          (project.category?.includes("Consumer") ||
            project.category?.includes("Transit") ||
            project.category?.includes("Tools"))
        ) {
          matchesCategory = true;
        }
      }

      const matchesTag =
        !activeStackTag ||
        (Array.isArray(project.techStack) &&
          project.techStack.some((t) =>
            t.toLowerCase().includes(activeStackTag.toLowerCase())
          ));

      return matchesCategory && matchesTag;
    });
  }, [displayWorkData, activeCategory, activeStackTag]);

  const categoryCounts = useMemo(() => {
    const counts = { All: 0 };
    FILTER_CATEGORIES.forEach((cat) => {
      counts[cat] = 0;
    });

    displayWorkData.forEach((project) => {
      if (
        project.id === "tithyniloy" ||
        project.slug === "tithyniloy" ||
        (project.url && project.url.includes("tithyniloy"))
      ) {
        return;
      }
      counts["All"]++;
      if (
        project.filterCategory === "Systems & DevOps" ||
        project.category?.includes("Cloud") ||
        project.category?.includes("Security")
      ) {
        counts["Systems & DevOps"] = (counts["Systems & DevOps"] || 0) + 1;
      } else if (
        project.filterCategory === "Enterprise & Operations" ||
        project.category?.includes("FinTech") ||
        project.category?.includes("Commerce")
      ) {
        counts["Enterprise & Operations"] =
          (counts["Enterprise & Operations"] || 0) + 1;
      } else if (
        project.filterCategory === "EdTech & Health" ||
        project.category?.includes("EdTech") ||
        project.category?.includes("Healthcare")
      ) {
        counts["EdTech & Health"] = (counts["EdTech & Health"] || 0) + 1;
      } else if (
        project.filterCategory === "Consumer & Utilities" ||
        project.category?.includes("Consumer") ||
        project.category?.includes("Transit") ||
        project.category?.includes("Tools")
      ) {
        counts["Consumer & Utilities"] =
          (counts["Consumer & Utilities"] || 0) + 1;
      }
    });

    return counts;
  }, [displayWorkData]);

  const handleCtaClick = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const toggleInlineTeardown = (projectId) => {
    setExpandedTeardownId((prev) => (prev === projectId ? null : projectId));
  };

  // Asymmetric Bento Grid Column Span Calculator
  const getBentoColSpan = (project, index) => {
    if (activeCategory !== "All" || activeStackTag) {
      // In filtered views, use balanced 2-column or prominent wide for featured
      return project.featured ? "lg:col-span-12" : "lg:col-span-6";
    }

    // Flagship asymmetric editorial layout
    if (index === 0) return "lg:col-span-12"; // Primary Flagship (NexusOps)
    if (index === 1) return "lg:col-span-7"; // Flagship 2 (SynapFlow)
    if (index === 2) return "lg:col-span-5"; // Flagship 3 (Niloy Inventory or NoBot)
    if (index === 3) return "lg:col-span-5"; // Flagship 4
    if (index === 4) return "lg:col-span-7"; // Flagship 5
    if (index === 5) return "lg:col-span-6"; // ECWearable / Mid
    if (index === 6) return "lg:col-span-6"; // HandsOn / Mid
    return "lg:col-span-4"; // High-density utility cards (NRL, NQR, WhatToCook)
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16 border-b border-neutral-200 dark:border-neutral-800 relative bg-white dark:bg-[#09090b]"
    >
      {/* Legacy #work anchor alias */}
      <div id="work" className="absolute -top-20 left-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-10 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>03 // PRODUCTION SYSTEMS &amp; CASE STUDIES</span>
            </div>
            <h2
              id="projects-heading"
              className="fluid-h2 font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              Featured Engineering Projects
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mt-2 leading-relaxed">
              Full-stack cloud architectures, Kubernetes telemetry planes, DAG orchestration studios, and low-latency client utilities with verified production deployments.
            </p>
          </div>

          {/* Crisp Monospace Interactive Domain Filter Strip */}
          <div
            role="tablist"
            aria-label="Filter projects by engineering domain"
            className="flex flex-wrap items-center gap-1.5"
          >
            {FILTER_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count = categoryCounts[category] || 0;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 min-h-[38px] rounded-md font-mono text-xs transition-all duration-150 ease-out active:scale-[0.98] border inline-flex items-center gap-2 ${
                    isActive
                      ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-semibold shadow-xs"
                      : "bg-zinc-50 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border-neutral-200 dark:border-neutral-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`font-mono tabular-nums text-[10px] px-1.5 py-0.2 rounded ${
                      isActive
                        ? "bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-950"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
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

        {/* Asymmetric Bento Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            const projectId = project.id || project.slug || String(index);
            const isExpanded = expandedTeardownId === projectId;
            const colSpan = getBentoColSpan(project, index);
            const isPrimaryWide = colSpan === "lg:col-span-12";
            const isMediumWide = colSpan === "lg:col-span-7";
            const isCompact = colSpan === "lg:col-span-4";

            // Resolve screenshot image asset
            const projectImg =
              project.image ||
              project.bgImage ||
              (project.bgImageName && assets[project.bgImageName]) ||
              `/projects/${project.slug || project.id}.webp`;

            const teardown = project.teardown || {
              problemSolved:
                project.longDescription ||
                project.tagline ||
                "Engineered high-performance web systems resolving latency and concurrency bottlenecks.",
              architecture:
                "Next.js/React full-stack architecture coupled with indexed database models and deterministic state pipelines.",
              performanceChallenges:
                "Optimized Core Web Vitals, sub-millisecond query responses, and client-side rendering.",
            };

            const techList =
              project.techStack && project.techStack.length > 0
                ? project.techStack
                : ["Next.js", "TypeScript", "Tailwind CSS"];

            const liveUrl = project.liveUrl || project.url;
            const githubUrl =
              project.githubUrl !== undefined
                ? project.githubUrl
                : project.github;
            const indexLabel = String(index + 1).padStart(2, "0");

            return (
              <article
                key={projectId}
                className={`${colSpan} group rounded-lg bg-white dark:bg-zinc-950/70 border border-neutral-200 dark:border-neutral-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200 ease-out overflow-hidden flex flex-col justify-between shadow-xs`}
              >
                <div
                  className={
                    isPrimaryWide
                      ? "grid grid-cols-1 lg:grid-cols-12 h-full"
                      : "flex flex-col flex-1"
                  }
                >
                  {/* Visual Preview Frame with Smooth Hover Zoom & 1px Boundary */}
                  <div
                    className={`relative overflow-hidden bg-zinc-950 border-b border-neutral-200 dark:border-neutral-800 ${
                      isPrimaryWide
                        ? "lg:col-span-6 h-64 sm:h-80 lg:h-full lg:border-b-0 lg:border-r"
                        : isMediumWide
                        ? "h-56 sm:h-64 w-full"
                        : isCompact
                        ? "h-44 sm:h-48 w-full"
                        : "h-52 sm:h-60 w-full"
                    }`}
                  >
                    <Image
                      src={projectImg}
                      alt={`${project.title} live interface preview`}
                      fill
                      sizes={
                        isPrimaryWide
                          ? "(max-width: 1024px) 100vw, 50vw"
                          : isMediumWide
                          ? "(max-width: 1024px) 100vw, 60vw"
                          : "(max-width: 1024px) 100vw, 33vw"
                      }
                      className="object-cover object-top scale-[1.0] group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                    />

                    {/* Gradient Overlay for Top/Bottom Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/15 to-transparent pointer-events-none" />

                    {/* 1px Inner Frame Ring so light/dark screenshots never bleed */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none" />

                    {/* Header Chips & Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono tabular-nums text-[11px] font-bold px-2 py-0.5 rounded bg-zinc-950/95 text-zinc-200 border border-neutral-700/80 backdrop-blur-xs">
                          {indexLabel}
                        </span>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-zinc-950/95 text-emerald-400 border border-emerald-500/40 backdrop-blur-xs">
                          {project.category || "Full-Stack"}
                        </span>
                        {project.featured && (
                          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-xs">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Flagship</span>
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProject({
                            ...project,
                            teardown,
                            techStack: techList,
                            image: projectImg,
                          })
                        }
                        aria-label={`Open technical specifications modal for ${project.title}`}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-zinc-100 bg-zinc-950/95 hover:bg-zinc-800 px-2.5 py-1 rounded border border-neutral-700/80 transition-colors duration-150 active:scale-[0.98] backdrop-blur-xs"
                      >
                        <Layers className="w-3 h-3 text-emerald-400" />
                        <span className="hidden sm:inline">Specs</span>
                      </button>
                    </div>

                    {/* Bottom Screenshot Bar: Production Domain */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 bg-zinc-950/90 px-2 py-0.5 rounded border border-neutral-800 backdrop-blur-xs">
                        <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                        <span className="tabular-nums truncate max-w-[200px] sm:max-w-xs">
                          {liveUrl?.replace(/^https?:\/\//, "")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Architectural Summary & Engineering Ledger Body */}
                  <div
                    className={`${
                      isPrimaryWide
                        ? "lg:col-span-6 p-6 sm:p-8"
                        : isMediumWide
                        ? "p-6 sm:p-7"
                        : "p-5 sm:p-6"
                    } flex flex-col justify-between flex-1`}
                  >
                    <div>
                      {/* Title & Tagline */}
                      <div className="mb-3">
                        <div className="flex items-start justify-between gap-3">
                          <h3
                            onClick={() =>
                              setSelectedProject({
                                ...project,
                                teardown,
                                techStack: techList,
                                image: projectImg,
                              })
                            }
                            className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-150 cursor-pointer"
                          >
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                          {project.tagline ||
                            project.longDescription ||
                            project.description}
                        </p>
                      </div>

                      {/* Technical Architecture Strip */}
                      <div className="p-3.5 rounded-md bg-zinc-50 dark:bg-zinc-900/60 border border-neutral-200 dark:border-neutral-800 mb-4 space-y-2 text-xs">
                        <div>
                          <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-200">
                            SYSTEM:{" "}
                          </span>
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {teardown.architecture}
                          </span>
                        </div>
                        <div>
                          <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                            PERFORMANCE:{" "}
                          </span>
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {teardown.performanceChallenges}
                          </span>
                        </div>
                      </div>

                      {/* Clean Monochrome Tech Stack Pills */}
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

                      {/* Expandable Architecture Problem Statement & Deliverables */}
                      <div className="mb-2">
                        <button
                          type="button"
                          onClick={() => toggleInlineTeardown(projectId)}
                          aria-expanded={isExpanded}
                          aria-label={`Toggle technical teardown for ${project.title}`}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200 transition-colors duration-150"
                        >
                          <span className="flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Architecture Highlights &amp; Specs</span>
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
                              <div className="mt-2 p-3.5 rounded-md bg-zinc-50 dark:bg-zinc-900/90 border border-neutral-200 dark:border-neutral-800 space-y-2.5 text-xs">
                                <div>
                                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1 mb-0.5">
                                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                                    <span>Problem Solved:</span>
                                  </span>
                                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {teardown.problemSolved}
                                  </p>
                                </div>

                                {((project.architectureHighlights &&
                                  project.architectureHighlights.length > 0) ||
                                  (project.highlights &&
                                    project.highlights.length > 0)) && (
                                  <div>
                                    <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1 mb-1">
                                      <Gauge className="w-3 h-3 text-emerald-500" />
                                      <span>Key Technical Challenges Solved:</span>
                                    </span>
                                    <ul className="space-y-1 pl-4 list-disc text-zinc-600 dark:text-zinc-400">
                                      {(
                                        project.architectureHighlights ||
                                        project.highlights
                                      ).map((highlight, hIdx) => (
                                        <li key={hIdx}>{highlight}</li>
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
                    <div className="pt-4 mt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open live demo for ${project.title}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 rounded-md font-mono text-xs font-semibold transition-all duration-150 ease-out active:scale-[0.98] shadow-xs"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {githubUrl ? (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} repository on GitHub`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-neutral-200 dark:border-neutral-800 rounded-md font-mono text-xs font-semibold transition-all duration-150 ease-out active:scale-[0.98]"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Source Code</span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] text-zinc-500 font-mono text-[11px] border border-dashed border-neutral-300 dark:border-neutral-800 rounded-md">
                            <Server className="w-3 h-3 text-zinc-400" />
                            <span>Internal Fleet</span>
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProject({
                            ...project,
                            teardown,
                            techStack: techList,
                            image: projectImg,
                          })
                        }
                        aria-label={`View complete specifications modal for ${project.title}`}
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
            Showing <strong className="text-zinc-900 dark:text-zinc-100 tabular-nums">{filteredProjects.length}</strong> functional production deployments • All verified across Vercel and GitHub.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/niloykm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore all public repositories on GitHub (@niloykm)"
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[38px] bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-neutral-800 text-zinc-800 dark:text-zinc-200 font-mono font-semibold rounded-md text-xs transition-all duration-150 ease-out active:scale-[0.98]"
            >
              <Github className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>All Repositories (@niloykm)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[38px] bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold rounded-md text-xs transition-all duration-150 ease-out active:scale-[0.98]"
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
