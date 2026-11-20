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
  Lock,
} from "lucide-react";
import { assets } from "@/assets/assets";
import { MODAL_TRANSITION } from "@/lib/motion";

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
    project.image ||
    project.bgImage ||
    (project.bgImageName && assets[project.bgImageName]) ||
    null;

  const liveLink = project.liveUrl || project.url;
  const repoLink = project.githubUrl ?? null;

  const teardown = project.teardown || {
    problemSolved:
      project.longDescription ||
      "Addressed workflow bottlenecks with a unified full-stack web architecture.",
    architecture:
      "Modular Node.js/NestJS backend services paired with indexed MongoDB/PostgreSQL schemas and JWT RBAC.",
    performanceChallenges:
      "Optimized Core Web Vitals, state synchronization, and sub-second query response times.",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with 250ms transition & clean blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={MODAL_TRANSITION}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={MODAL_TRANSITION}
            className="relative w-full max-w-2xl bg-white dark:bg-[#09090b] rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header / Preview Image */}
            <div className="relative w-full h-44 sm:h-52 bg-zinc-950 flex-shrink-0 border-b border-zinc-200 dark:border-zinc-800">
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

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-zinc-950/20" />

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close technical teardown modal"
                className="absolute top-3.5 right-3.5 p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-md bg-zinc-950/95 hover:bg-zinc-800 text-white border border-zinc-700 interactive-btn z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-zinc-950 text-emerald-400 border border-zinc-700">
                    Engineering Teardown
                  </span>
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-zinc-950 text-zinc-200 border border-zinc-700">
                    {project.category || project.description || "Web Application"}
                  </span>
                </div>
                <h3
                  id="project-modal-title"
                  className="text-xl sm:text-2xl font-bold text-white mt-2 tracking-tight"
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Structured Engineering Breakdown Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {/* 01 // Problem */}
              <div className="p-4 rounded-md bg-zinc-50 dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>01 // Problem</span>
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-prose">
                  {teardown.problemSolved}
                </p>
              </div>

              {/* 02 // System Architecture & Stack */}
              <div className="p-4 rounded-md bg-zinc-50 dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-1.5 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>02 // System Architecture &amp; Stack</span>
                  </h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-prose">
                    {teardown.architecture}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(project.techStack || ["React.js", "TypeScript", "Tailwind CSS"]).map(
                    (tech, idx) => {
                      const Icon = getTechBadgeIcon(tech);
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded bg-white dark:bg-[#09090b] text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
                        >
                          <Icon className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          <span>{tech}</span>
                        </span>
                      );
                    }
                  )}
                </div>
              </div>

              {/* 03 // Key Engineering Trade-offs & Outcome */}
              <div className="p-4 rounded-md bg-zinc-50 dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-1.5 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>03 // Key Engineering Trade-offs</span>
                  </h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-prose">
                    {teardown.performanceChallenges}
                  </p>
                </div>

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Modal Footer: Live Demo & Source Links */}
            <div className="p-4 sm:p-5 bg-zinc-50 dark:bg-[#111114] border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 flex-wrap">
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live demo for ${project.title}`}
                    className="group inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono text-xs font-semibold rounded-md interactive-btn"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}

                {repoLink ? (
                  <a
                    href={repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] bg-white dark:bg-[#09090b] hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 font-mono text-xs font-semibold rounded-md interactive-btn"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-zinc-600 dark:text-zinc-400 font-mono text-xs border border-dashed border-zinc-300 dark:border-zinc-700 rounded-md">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Private Client Repo</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 interactive-btn"
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
