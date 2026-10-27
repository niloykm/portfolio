"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Github, Layers, Cpu, CheckCircle2, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { assets } from "@/assets/assets";

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const projectImg =
    project.bgImage ||
    (project.bgImageName && assets[project.bgImageName]) ||
    null;

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
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
            <div className="relative w-full h-48 sm:h-56 bg-slate-950 flex-shrink-0">
              {projectImg ? (
                <Image
                  src={projectImg}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover object-top opacity-85"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center">
                  <Layers className="w-12 h-12 text-blue-400 opacity-50" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close project details"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-500/30 backdrop-blur-md text-blue-200 border border-blue-400/30">
                  {project.category || project.description || "Web Application"}
                </span>
                <h3 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Overview */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                  Architectural Overview
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {project.longDescription || project.description || "A scalable web application crafted with modern frontend architecture, robust state management, and high-performance user interface components."}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2.5 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Technologies & Tools</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(project.techStack || ["React", "JavaScript", "Tailwind CSS", "REST APIs"]).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Engineering Features / Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Key Engineering Highlights</span>
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                {project.url && (
                  <MagneticButton strength={0.2}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all duration-200"
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
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium rounded-xl transition-all duration-200"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  </MagneticButton>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-xs font-mono text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-1.5"
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
