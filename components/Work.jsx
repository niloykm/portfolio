"use client";

import { assets, workData as defaultWorkData } from "@/assets/assets";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useMemo } from "react";
import { ExternalLink, Github, Eye, Briefcase, ArrowUpRight, Info } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import MagneticButton from "@/components/ui/MagneticButton";
import ProjectModal from "@/components/ui/ProjectModal";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const Work = ({ isDarkMode, workData }) => {
  const shouldReduceMotion = useReducedMotion();
  const displayWorkData = workData || defaultWorkData;

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", "Full-Stack", "Frontend & Tools", "AI & Utilities"];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return displayWorkData;
    return displayWorkData.filter((project) => project.category === activeCategory);
  }, [displayWorkData, activeCategory]);

  const handleCtaClick = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section
      id="projects"
      aria-labelledby="work-heading"
      className="py-24 px-6 lg:px-12 scroll-mt-24 relative overflow-hidden"
    >
      <div id="work" className="absolute -top-24" />
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
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-12" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-3 shadow-sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>My Portfolio</span>
          </div>
          <h2 id="work-heading" className="fluid-h2 font-extrabold gradient-text mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
            Production-grade web applications built with modern frontend architecture, robust state management, and clean code.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center items-center gap-2 mb-12 flex-wrap"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-900/80 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-slate-800/60"
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

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const projectImg =
                project.bgImage ||
                (project.bgImageName && assets[project.bgImageName]) ||
                assets.handsOn;

              return (
                <motion.div
                  key={project.id || project.title || index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl flex"
                >
                  <SpotlightCard
                    spotlightColor="rgba(16, 185, 129, 0.25)"
                    className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg hover:shadow-2xl border border-slate-200/70 dark:border-slate-800/80 transition-all duration-300 bg-slate-900 w-full flex flex-col justify-end"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={projectImg}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent transition-opacity duration-300 pointer-events-none" />

                    {/* Card Content */}
                    <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white border border-white/20">
                          {project.category || project.description || "Web App"}
                        </span>

                        <button
                          onClick={() => setSelectedProject(project)}
                          aria-label={`View architectural deep-dive for ${project.title}`}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 hover:text-white bg-slate-900/60 hover:bg-slate-900 px-2 py-0.5 rounded-md backdrop-blur-md border border-emerald-500/30 transition-all"
                        >
                          <Info className="w-3 h-3 text-emerald-400" />
                          <span>Deep Dive</span>
                        </button>
                      </div>

                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-200 cursor-pointer"
                      >
                        {project.title}
                      </h3>

                      {/* Tech Pills preview */}
                      {project.techStack && (
                        <div className="flex flex-wrap gap-1.5 mb-3.5">
                          {project.techStack.slice(0, 3).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-mono px-2 py-0.5 bg-slate-900/75 backdrop-blur-md text-slate-300 rounded border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-900/75 backdrop-blur-md text-emerald-400 rounded border border-white/10">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2 items-center flex-wrap">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open live demo for ${project.title}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] bg-white text-slate-900 hover:bg-emerald-500 hover:text-white rounded-lg text-xs font-semibold shadow-md transition-all duration-200"
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
                            aria-label={`View ${project.title} repository on GitHub`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md text-white border border-white/20 hover:border-white/40 rounded-lg text-xs font-medium transition-all duration-200"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div className="text-center mt-16" variants={fadeUp}>
          <MagneticButton strength={0.25}>
            <motion.button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Let's build something amazing</span>
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Deep Dive Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Work;
