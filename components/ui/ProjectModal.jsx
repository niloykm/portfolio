"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  X,
  ExternalLink,
  Github,
  Layers,
  Cpu,
  CheckCircle2,
  ArrowUpRight,
  Database,
  Gauge,
  AlertTriangle,
  Code2,
  Server,
} from "lucide-react";
import { assets } from "@/assets/assets";

const getTechBadgeIcon = (tech) => {
  const lower = tech.toLowerCase();
  if (lower.includes("postgres") || lower.includes("mongo") || lower.includes("sql")) {
    return Database;
  }
  if (lower.includes("node") || lower.includes("nest") || lower.includes("express") || lower.includes("docker")) {
    return Server;
  }
  if (lower.includes("react") || lower.includes("next") || lower.includes("type") || lower.includes("tailwind")) {
    return Code2;
  }
  return Cpu;
};

const ProjectModal = ({ project, isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  const projectImg =
    project.bgImage ||
    (project.bgImageName && assets[project.bgImageName]) ||
    null;

  const teardown = project.teardown || {
    problemSolved:
      project.longDescription ||
      "Addressed workflow bottlenecks with a unified full-stack web architecture.",
    architecture:
      "Modular RESTful Node.js/NestJS backend services paired with indexed MongoDB/PostgreSQL schemas and JWT RBAC.",
    performanceChallenges:
      "Optimized Core Web Vitals, state synchronization, and sub-second query response times.",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#09090b] rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden text-zinc-900 dark:text-zinc-100 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header / Preview Image */}
            <div className="relative w-full h-44 sm:h-52 bg-zinc-950 flex-shrink-0 border-b border-neutral-200 dark:border-neutral-800">
              {projectImg ? (
                <Image
                  src={projectImg}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover object-top opacity-85"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                  <Layers className="w-10 h-10 text-zinc-600" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close technical teardown modal"
                className="absolute top-3.5 right-3.5 p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md bg-zinc-950/90 hover:bg-zinc-800 text-white border border-neutral-700 transition-colors duration-150 z-10 active:scale-[0.98]"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Technical Teardown
                  </span>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-zinc-200 border border-neutral-700">
                    {project.category || project.description || "Web Application"}
                  </span>
                </div>
                <h3
                  id="project-modal-title"
                  className="text-xl sm:text-2xl font-bold text-white mt-1.5 tracking-tight"
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-1 gap-3.5">
                <div className="p-4 rounded-md bg-zinc-50 dark:bg-zinc-900/60 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>01 // Problem Solved</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {teardown.problemSolved}
                  </p>
                </div>

                <div className="p-4 rounded-md bg-zinc-50 dark:bg-zinc-900/60 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-1.5 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-500" />
                    <span>02 // Database &amp; Backend Architecture</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {teardown.architecture}
                  </p>
                </div>

                <div className="p-4 rounded-md bg-zinc-50 dark:bg-zinc-900/60 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-1.5 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-emerald-500" />
                    <span>03 // Scale &amp; Performance Engineering</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {teardown.performanceChallenges}
                  </p>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2.5 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Core Tech Stack</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    project.techStack || [
                      "React.js",
                      "TypeScript",
                      "Tailwind CSS",
                      "REST API",
                    ]
                  ).map((tech, idx) => {
                    const Icon = getTechBadgeIcon(tech);
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-neutral-200 dark:border-neutral-800"
                      >
                        <Icon className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Key Engineering Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Engineering Deliverables</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-900/90 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 flex-wrap">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live demo for ${project.title}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[38px] bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono text-xs font-semibold rounded-md transition-all duration-150 active:scale-[0.98]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub (niloydiu)`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[38px] bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-neutral-200 dark:border-neutral-800 font-mono text-xs font-medium rounded-md transition-all duration-150 active:scale-[0.98]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub (@niloydiu)</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
              >
                ESC
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
