"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import MagneticButton from "@/components/ui/MagneticButton";
import { assets } from "@/assets/assets";

const getTechBadgeMeta = (tech) => {
  const lower = tech.toLowerCase();
  if (lower.includes("postgres") || lower.includes("mongo") || lower.includes("sql")) {
    return {
      icon: Database,
      color: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    };
  }
  if (lower.includes("node") || lower.includes("nest") || lower.includes("express") || lower.includes("docker")) {
    return {
      icon: Server,
      color: "text-purple-600 dark:text-purple-300 border-purple-500/30 bg-purple-500/10",
    };
  }
  if (lower.includes("react") || lower.includes("next") || lower.includes("type") || lower.includes("tailwind")) {
    return {
      icon: Code2,
      color: "text-blue-600 dark:text-blue-300 border-blue-500/30 bg-blue-500/10",
    };
  }
  return {
    icon: Cpu,
    color: "text-cyan-700 dark:text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
  };
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header / Preview Image */}
            <div className="relative w-full h-44 sm:h-56 bg-slate-950 flex-shrink-0">
              {projectImg ? (
                <Image
                  src={projectImg}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover object-top opacity-85"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center">
                  <Layers className="w-12 h-12 text-blue-400 opacity-50" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close technical teardown modal"
                className="absolute top-4 right-4 p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-500/30 backdrop-blur-md text-emerald-200 border border-emerald-400/40">
                    Technical Teardown
                  </span>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-500/30 backdrop-blur-md text-blue-200 border border-blue-400/30">
                    {project.category || project.description || "Web Application"}
                  </span>
                </div>
                <h3
                  id="project-modal-title"
                  className="text-xl sm:text-2xl font-bold text-white mt-1.5"
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {/* Structured Technical Teardown Cards */}
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>1. Problem Solved</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {teardown.problemSolved}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-1.5 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    <span>2. Database &amp; Backend Architecture</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {teardown.architecture}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>3. Key Performance Challenges</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {teardown.performanceChallenges}
                  </p>
                </div>
              </div>

              {/* Tech Stack Pills with Iconography */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2.5 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Core Tech Stack</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(
                    project.techStack || [
                      "React.js",
                      "TypeScript",
                      "Tailwind CSS",
                      "REST API",
                    ]
                  ).map((tech, idx) => {
                    const meta = getTechBadgeMeta(tech);
                    const Icon = meta.icon;
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-lg border ${meta.color}`}
                      >
                        <Icon className="w-3 h-3 flex-shrink-0" />
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Key Engineering Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Engineering Deliverables</span>
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                {project.url && (
                  <MagneticButton strength={0.2}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live demo for ${project.title}`}
                      className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all duration-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </MagneticButton>
                )}

                {project.github && (
                  <MagneticButton strength={0.2}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub (niloydiu)`}
                      className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium rounded-xl transition-all duration-200"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub (@niloydiu)</span>
                    </a>
                  </MagneticButton>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors"
              >
                Close (ESC)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
