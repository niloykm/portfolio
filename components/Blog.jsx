"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Calendar, Github, ArrowUpRight } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const Blog = () => {
  const articles = [
    {
      title: "roBenDevHandsOn - Interactive Learning Platform",
      excerpt: "A hands-on learning platform built with modern web technologies, featuring interactive tutorials and coding challenges.",
      date: "2024-01-15",
      tags: ["React", "JavaScript", "Education"],
      github: "https://github.com/niloydiu/roBenDevHandsOn",
      featured: true,
    },
    {
      title: "edemy - Learning Management System",
      excerpt: "Comprehensive LMS platform with course management, student progress tracking, and interactive learning modules.",
      date: "2024-01-10",
      tags: ["MERN Stack", "Education", "Full-Stack"],
      github: "https://github.com/niloydiu/edemy",
      featured: false,
    },
    {
      title: "newcare - Healthcare Management System",
      excerpt: "Modern healthcare management solution with patient records, appointment scheduling, and medical history tracking.",
      date: "2024-01-05",
      tags: ["Healthcare", "MERN Stack", "Management"],
      github: "https://github.com/niloydiu/newcare",
      featured: false,
    },
    {
      title: "Nobot - AI Assistant Platform",
      excerpt: "Intelligent chatbot platform with natural language processing and automated customer support features.",
      date: "2024-01-01",
      tags: ["AI", "JavaScript", "Chatbot"],
      github: "https://github.com/niloydiu/Nobot",
      featured: false,
    },
  ];

  return (
    <section
      id="open-source"
      aria-labelledby="opensource-heading"
      className="py-24 px-6 lg:px-12 scroll-mt-24 relative overflow-hidden"
    >
      <div id="blog" className="absolute -top-24" />
      {/* Background decoration with cyber-grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 cyber-grid pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-20 right-20 w-64 h-64 bg-teal-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60 rounded-full text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300 mb-3 shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Featured Projects</span>
          </div>
          <h2 id="opensource-heading" className="fluid-h2 font-extrabold gradient-text mb-4">
            Open Source Work
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
            Explore my featured repositories on GitHub, showcasing real-world applications built with modern web technologies.
          </p>
        </motion.div>

        {/* Featured Project */}
        {articles
          .filter((article) => article.featured)
          .map((article, index) => (
            <motion.div key={index} variants={fadeUp} className="mb-10">
              <SpotlightCard
                spotlightColor="rgba(20, 184, 166, 0.2)"
                className="glass-card neon-border-glow cyber-corner p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-semibold rounded-full border border-teal-500/20">
                        Featured Project
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })}
                        </time>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2.5">
                      {article.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 mb-5 leading-relaxed text-sm sm:text-base font-normal">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full border border-slate-200 dark:border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={article.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${article.title} on GitHub`}
                      className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-sm hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200 group"
                    >
                      <Github className="w-4 h-4" />
                      <span>View on GitHub</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}

        {/* Other Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles
            .filter((article) => !article.featured)
            .map((article, index) => (
              <motion.div key={index} variants={scaleIn}>
                <SpotlightCard
                  spotlightColor="rgba(20, 184, 166, 0.18)"
                  className="glass-card neon-border-glow cyber-corner p-6 rounded-2xl h-full flex flex-col justify-between group border border-slate-200/80 dark:border-slate-800/80"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200">
                      {article.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed font-normal">
                      {article.excerpt}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {article.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={article.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${article.title} project code on GitHub`}
                      className="inline-flex items-center gap-1.5 text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-semibold hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200 group/link"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
        </div>

        {/* View All Repositories CTA */}
        <motion.div className="text-center mt-16" variants={fadeUp}>
          <MagneticButton strength={0.25}>
            <motion.a
              href="https://github.com/niloydiu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Niloy's GitHub profile to view all repositories"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 font-semibold rounded-xl hover:bg-teal-600 hover:text-white dark:hover:bg-teal-400 dark:hover:text-slate-950 transition-all duration-300 text-sm sm:text-base shadow-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github className="w-4 h-4" />
              <span>View All Repositories</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Blog;
