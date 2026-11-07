"use client";

import { assets, workData as defaultWorkData } from "@/assets/assets";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  ExternalLink,
  Github,
  Eye,
  Briefcase,
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
import SpotlightCard from "@/components/ui/SpotlightCard";
import MagneticButton from "@/components/ui/MagneticButton";
import ProjectModal from "@/components/ui/ProjectModal";
import { fadeUp, staggerContainer } from "@/lib/motion";

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
  isDarkMode,
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
      className="py-24 px-4 sm:px-6 lg:px-12 scroll-mt-20 relative overflow-hidden"
    >
      {/* Legacy #work anchor alias for backward-compatible links */}
      <div id="work" className="absolute -top-20 left-0" aria-hidden="true" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 cyber-grid pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-12" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-3 shadow-sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Unified Engineering Showcase</span>
          </div>
          <h2
            id="projects-heading"
            className="fluid-h2 font-extrabold gradient-text mb-4"
          >
            Featured Engineering Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
            Production-grade web applications and open-source systems built with
            Next.js, React, NestJS/Node.js, and resilient database architectures.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          variants={fadeUp}
          role="tablist"
          aria-label="Filter projects by category"
          className="flex justify-center items-center gap-2 mb-8 flex-wrap"
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
                className={`relative px-4 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-md"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-slate-900/90 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800/80"
                }`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl -z-10"
                    layoutId="activeCategoryPill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Active Stack Tag Filter Pill (when filtered via Command Palette or chip click) */}
        {activeStackTag && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-mono font-semibold">
              <span>Filtered by Stack: {activeStackTag}</span>
              <button
                type="button"
                onClick={() => onClearStackTag?.()}
                aria-label={`Clear ${activeStackTag} stack filter`}
                className="p-0.5 rounded-full hover:bg-blue-500/20 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const projectId = project.id || project.title || String(index);
              const isExpanded = expandedTeardownId === projectId;
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

              return (
                <motion.article
                  key={projectId}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl flex"
                >
                  <SpotlightCard
                    spotlightColor="rgba(16, 185, 129, 0.2)"
                    className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/80 dark:border-slate-800/90 transition-all duration-300 bg-white dark:bg-slate-900/90 w-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Preview Image Header */}
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/80">
                        <Image
                          src={projectImg}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent pointer-events-none" />

                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                            {project.category || "Full-Stack"}
                          </span>

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
                            className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-white bg-slate-950/80 hover:bg-emerald-600 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/20 transition-colors"
                          >
                            <Layers className="w-3 h-3 text-emerald-400" />
                            <span>Modal View</span>
                          </button>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6">
                        <h3
                          onClick={() =>
                            setSelectedProject({
                              ...matchedStatic,
                              ...project,
                              teardown,
                              techStack: techList,
                            })
                          }
                          className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                          {project.longDescription || project.description}
                        </p>

                        {/* Core Tech Stack Chips with Iconography */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {techList.map((tech, tIdx) => {
                            const ChipIcon = getTechChipIcon(tech);
                            return (
                              <button
                                key={tIdx}
                                type="button"
                                onClick={() => onSelectStackTag?.(tech)}
                                aria-label={`Filter projects by ${tech}`}
                                className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800/90 hover:bg-emerald-500/15 dark:hover:bg-emerald-500/20 text-slate-700 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700/80 transition-colors"
                              >
                                <ChipIcon className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                                <span>{tech}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Expandable Inline Technical Teardown Section */}
                        <div className="mb-4">
                          <button
                            type="button"
                            onClick={() => toggleInlineTeardown(projectId)}
                            aria-expanded={isExpanded}
                            aria-label={`Toggle technical teardown for ${project.title}`}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-950/70 hover:bg-slate-200/70 dark:hover:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300 transition-colors"
                          >
                            <span className="flex items-center gap-1.5">
                              <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Technical Teardown</span>
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
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
                                  <div>
                                    <span className="font-mono font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 mb-0.5">
                                      <AlertTriangle className="w-3 h-3" />
                                      <span>Problem Solved:</span>
                                    </span>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                      {teardown.problemSolved}
                                    </p>
                                  </div>

                                  <div>
                                    <span className="font-mono font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1 mb-0.5">
                                      <Database className="w-3 h-3" />
                                      <span>Database / Backend Architecture:</span>
                                    </span>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                      {teardown.architecture}
                                    </p>
                                  </div>

                                  <div>
                                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mb-0.5">
                                      <Gauge className="w-3 h-3" />
                                      <span>Key Performance Challenges:</span>
                                    </span>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                      {teardown.performanceChallenges}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Action Buttons */}
                    <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open live demo for ${project.title}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all duration-200"
                          >
                            <Eye className="w-3.5 h-3.5" />
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
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold transition-all duration-200"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
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
                        className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        Full Specs →
                      </button>
                    </div>
                  </SpotlightCard>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA & GitHub Profile Link */}
        <motion.div
          className="text-center mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
        >
          <MagneticButton strength={0.25}>
            <motion.button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Discuss an Engineering Project</span>
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <a
              href="https://github.com/niloydiu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore all public repositories on GitHub (@niloydiu)"
              className="inline-flex items-center gap-2 px-6 py-4 min-h-[48px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 text-slate-800 dark:text-slate-200 font-semibold rounded-xl shadow-sm transition-all text-sm sm:text-base"
            >
              <Github className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>All Repositories (@niloydiu)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

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
