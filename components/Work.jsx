"use client";

import { assets } from "@/assets/assets";
import { projects as defaultProjects, filterCategories } from "@/data/projects";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useMemo } from "react";
import { TAB_LAYOUT_TRANSITION } from "@/lib/motion";
import {
  Github,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Lock,
  X,
  FileCode2,
  ExternalLink,
} from "lucide-react";
import ProjectModal from "@/components/ui/ProjectModal";
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from "@/lib/github";

function isPublicProject(project) {
  return (
    project &&
    project.id !== "tithyniloy" &&
    project.slug !== "tithyniloy" &&
    !(project.url && project.url.includes("tithyniloy")) &&
    !(project.liveUrl && project.liveUrl.includes("tithyniloy"))
  );
}

function getProjectDomainCategory(project) {
  if (project.filterCategory) return project.filterCategory;
  const cat = (project.category || "").toLowerCase();
  if (cat.includes("edtech") || cat.includes("health")) return "EdTech & Health";
  if (cat.includes("cloud") || cat.includes("devops") || cat.includes("security") || cat.includes("workflow")) {
    return "Systems & DevOps";
  }
  if (cat.includes("fintech") || cat.includes("operation") || cat.includes("commerce") || cat.includes("enterprise")) {
    return "Enterprise & Operations";
  }
  return "Consumer & Utilities";
}

const Work = ({
  workData,
  activeStackTag = "",
  onClearStackTag,
  onSelectStackTag,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const publicProjects = useMemo(() => {
    const source =
      workData && workData.length > 0 ? workData : defaultProjects;
    return source.filter(isPublicProject);
  }, [workData]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllArchive, setShowAllArchive] = useState(false);

  const categoryCounts = useMemo(() => {
    const counts = { All: publicProjects.length };
    filterCategories.forEach((cat) => {
      if (cat !== "All") counts[cat] = 0;
    });
    publicProjects.forEach((project) => {
      const domain = getProjectDomainCategory(project);
      counts[domain] = (counts[domain] || 0) + 1;
    });
    return counts;
  }, [publicProjects]);

  const filteredProjects = useMemo(() => {
    return publicProjects.filter((project) => {
      const domain = getProjectDomainCategory(project);
      const matchesCategory =
        activeCategory === "All" || domain === activeCategory;
      const matchesTag =
        !activeStackTag ||
        (Array.isArray(project.techStack) &&
          project.techStack.some((t) =>
            t.toLowerCase().includes(activeStackTag.toLowerCase())
          ));
      return matchesCategory && matchesTag;
    });
  }, [publicProjects, activeCategory, activeStackTag]);

  const isFilteredView = activeCategory !== "All" || Boolean(activeStackTag);

  const featuredProjects = useMemo(() => {
    if (isFilteredView) return filteredProjects;
    const curated = filteredProjects.filter((p) => p.featured);
    return curated.length > 0 ? curated : filteredProjects.slice(0, 6);
  }, [filteredProjects, isFilteredView]);

  const archiveProjects = useMemo(() => {
    if (isFilteredView) return [];
    const featuredIds = new Set(featuredProjects.map((p) => p.id || p.slug));
    return filteredProjects.filter((p) => !featuredIds.has(p.id || p.slug));
  }, [filteredProjects, featuredProjects, isFilteredView]);

  const visibleArchiveProjects = showAllArchive
    ? archiveProjects
    : archiveProjects.slice(0, 4);

  const handleOpenSpecs = (project, resolvedImage, resolvedTeardown, resolvedStack) => {
    setSelectedProject({
      ...project,
      teardown: resolvedTeardown,
      techStack: resolvedStack,
      image: resolvedImage,
    });
  };

  const handleCtaClick = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] relative"
    >
      {/* Legacy #work anchor alias */}
      <div id="work" className="absolute -top-20 left-0" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header + Domain Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 mb-8 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-1.5">
              01 // Shipped Work &amp; Case Studies
            </div>
            <h2
              id="projects-heading"
              className="fluid-h2 font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              Featured Engineering Projects
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mt-2 leading-relaxed">
              Production SaaS applications, full-stack RBAC systems, and technical tools with concrete problem, architecture, and outcome breakdowns.
            </p>
          </div>

          {/* Domain Filter Strip with Smooth layoutId Active Pill */}
          <div
            role="tablist"
            aria-label="Filter projects by engineering domain"
            className="flex flex-wrap items-center gap-1.5"
          >
            {filterCategories.map((category) => {
              const isActive = activeCategory === category;
              const count = categoryCounts[category] || 0;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-3 py-2 min-h-[38px] rounded-md font-mono text-xs interactive-btn border inline-flex items-center gap-2 ${
                    isActive
                      ? "text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-semibold"
                      : "bg-zinc-50 dark:bg-[#111114] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-project-filter"
                      transition={TAB_LAYOUT_TRANSITION}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[5px] bg-zinc-950 dark:bg-zinc-100"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                  <span
                    className={`relative z-10 font-mono tabular-nums text-xs px-1.5 py-0.5 rounded transition-colors duration-150 ${
                      isActive
                        ? "bg-white/20 text-white dark:bg-zinc-950/15 dark:text-zinc-950"
                        : "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stack Filter Banner */}
        {activeStackTag && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 mb-6 rounded-md bg-emerald-500/10 border border-emerald-600/30 text-emerald-900 dark:text-emerald-300 text-xs font-mono">
            <span>
              Filtered by stack: <strong>{activeStackTag}</strong> (
              <span className="tabular-nums">{filteredProjects.length}</span>{" "}
              {filteredProjects.length === 1 ? "project" : "projects"})
            </span>
            <button
              type="button"
              onClick={() => onClearStackTag?.()}
              aria-label={`Clear ${activeStackTag} stack filter`}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600/15 hover:bg-emerald-600/25 font-semibold transition-colors duration-150"
            >
              <span>Clear filter</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Primary Balanced 2-Column Showcase Grid */}
        {featuredProjects.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#111114] p-10 text-center space-y-3">
            <p className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
              No projects match the current filter combination.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                onClearStackTag?.();
              }}
              className="px-4 py-2 rounded-md bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => {
              const projectId = project.id || project.slug || String(index);
              const projectImg =
                project.image ||
                project.bgImage ||
                (project.bgImageName && assets[project.bgImageName]) ||
                `/projects/${project.slug || project.id}.webp`;

              const teardown = project.teardown || {
                problemSolved: project.longDescription || project.tagline,
                architecture:
                  "Full-stack Next.js/TypeScript architecture with typed API contracts and indexed data stores.",
                performanceChallenges:
                  "Optimized Core Web Vitals, query latency, and zero-CLS responsive layouts.",
              };

              const techList =
                project.techStack && project.techStack.length > 0
                  ? project.techStack
                  : ["Next.js", "TypeScript", "Tailwind CSS"];

              const liveUrl = project.liveUrl || project.url;
              const githubUrl = project.githubUrl ?? null;
              const indexLabel = String(index + 1).padStart(2, "0");

              return (
                <article
                  key={projectId}
                  className="group rounded-lg bg-[#fafafa] dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800 interactive-card overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* 16:9 Preview Frame with High-Contrast Opaque Badges */}
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={projectImg}
                        alt={`${project.title} live interface preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index < 2}
                        className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/15 to-zinc-950/30 pointer-events-none" />

                      {/* Solid High-Contrast Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono tabular-nums text-xs font-bold px-2 py-0.5 rounded bg-zinc-950 text-zinc-100 border border-zinc-700">
                            {indexLabel}
                          </span>
                          <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-zinc-950 text-emerald-400 border border-zinc-700">
                            {project.category || "Full-Stack"}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Live Domain Pill */}
                      {liveUrl && (
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-200 bg-zinc-950/95 px-2.5 py-1 rounded border border-zinc-700 max-w-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                            <span className="truncate">
                              {liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Structured Engineering Summary */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenSpecs(project, projectImg, teardown, techList)
                            }
                            className="text-left hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-150 focus-visible:underline"
                          >
                            {project.title}
                          </button>
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                          {project.tagline || project.description}
                        </p>
                      </div>

                      {/* Concrete Architecture & Outcome Ledger */}
                      <dl className="p-3.5 rounded-md bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs leading-relaxed">
                        <div>
                          <dt className="inline font-mono font-semibold text-zinc-900 dark:text-zinc-200">
                            Architecture:{" "}
                          </dt>
                          <dd className="inline text-zinc-600 dark:text-zinc-400">
                            {teardown.architecture}
                          </dd>
                        </div>
                        <div>
                          <dt className="inline font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                            Outcome:{" "}
                          </dt>
                          <dd className="inline text-zinc-600 dark:text-zinc-400">
                            {teardown.performanceChallenges}
                          </dd>
                        </div>
                      </dl>

                      {/* Clickable Stack Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {techList.slice(0, 6).map((tech) => (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => onSelectStackTag?.(tech)}
                            aria-label={`Filter projects by ${tech}`}
                            className="text-xs font-mono font-medium px-2.5 py-1 bg-white dark:bg-zinc-900 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-800 dark:text-zinc-200 rounded border border-zinc-200 dark:border-zinc-800 interactive-btn"
                          >
                            {tech}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Single-Purpose Card Footer Actions */}
                  <div className="px-5 sm:px-6 py-4 bg-white dark:bg-[#0d0d10] border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live deployment for ${project.title}`}
                          className="group/live inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 rounded-md font-mono text-xs font-semibold interactive-btn"
                        >
                          <span>Live App</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 ease-out group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                        </a>
                      )}

                      {githubUrl ? (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code on GitHub`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-md font-mono text-xs font-semibold interactive-btn"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[38px] text-zinc-600 dark:text-zinc-400 font-mono text-xs border border-dashed border-zinc-300 dark:border-zinc-700 rounded-md">
                          <Lock className="w-3 h-3" />
                          <span>Private Repo</span>
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenSpecs(project, projectImg, teardown, techList)
                      }
                      aria-label={`Inspect technical teardown for ${project.title}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400 interactive-btn py-1.5"
                    >
                      <FileCode2 className="w-3.5 h-3.5" />
                      <span>Teardown →</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Compact Archive of Additional Shipped Deployments (Only in unfiltered "All" view) */}
        {!isFilteredView && archiveProjects.length > 0 && (
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                  Additional Shipped Applications
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  Production web tools, LMS workspaces, and domain utilities deployed live.
                </p>
              </div>
              <span className="font-mono tabular-nums text-xs text-zinc-600 dark:text-zinc-400">
                Showing {visibleArchiveProjects.length} of {archiveProjects.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleArchiveProjects.map((project, idx) => {
                const projectId = project.id || project.slug || String(idx);
                const projectImg =
                  project.image ||
                  project.bgImage ||
                  `/projects/${project.slug || project.id}.webp`;
                const teardown = project.teardown;
                const techList = project.techStack || [];
                const liveUrl = project.liveUrl || project.url;
                const githubUrl = project.githubUrl ?? null;

                return (
                  <article
                    key={projectId}
                    className="rounded-lg bg-[#fafafa] dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800 interactive-card p-5 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            {project.category}
                          </span>
                          <h4 className="text-base font-bold text-zinc-950 dark:text-zinc-50 tracking-tight mt-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenSpecs(project, projectImg, teardown, techList)
                              }
                              className="text-left hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-150"
                            >
                              {project.title}
                            </button>
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenSpecs(project, projectImg, teardown, techList)
                          }
                          aria-label={`View technical teardown for ${project.title}`}
                          className="font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 flex-shrink-0"
                        >
                          Specs →
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {project.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {techList.slice(0, 4).map((tech) => (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => onSelectStackTag?.(tech)}
                            className="text-xs font-mono px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                          >
                            {tech}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2 flex-wrap text-xs font-mono">
                      <div className="flex items-center gap-3">
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open live app for ${project.title}`}
                            className="inline-flex items-center gap-1 font-semibold text-zinc-950 dark:text-zinc-100 hover:text-emerald-700 dark:hover:text-emerald-400"
                          >
                            <span>Live App</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {githubUrl ? (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View source code for ${project.title} on GitHub`}
                            className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Source</span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                            <Lock className="w-3 h-3" />
                            <span>Private Repo</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {archiveProjects.length > 4 && (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllArchive((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-md bg-white dark:bg-[#111114] hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors duration-150 active:scale-[0.98]"
                >
                  {showAllArchive ? (
                    <>
                      <span>Show Fewer Projects</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Show All {publicProjects.length} Verified Deployments</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom Repository Archive & Direct Inquiry Strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-lg bg-[#fafafa] dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800">
          <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-950 dark:text-zinc-100 tabular-nums">
              {publicProjects.length}
            </strong>{" "}
            live production &amp; web deployments verified across Vercel and GitHub.
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Explore all public repositories on GitHub (@${GITHUB_USERNAME})`}
              className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[38px] bg-white dark:bg-[#09090b] hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono font-semibold rounded-md text-xs transition-colors duration-150 active:scale-[0.98]"
            >
              <Github className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>GitHub (@{GITHUB_USERNAME})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[38px] bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold rounded-md text-xs transition-colors duration-150 active:scale-[0.98]"
            >
              <span>Discuss a Project</span>
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
