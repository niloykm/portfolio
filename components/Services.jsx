"use client";

import { assets } from "@/assets/assets";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowRight, CheckCircle2, Layout, Server, Database, Gauge } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const Services = ({ isDarkMode, serviceData }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleCtaClick = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const enhancedServices = [
    {
      num: "01",
      icon: Layout,
      title: "Frontend Engineering",
      tag: "React • Next.js • TypeScript",
      description:
        "Building pixel-perfect, accessible, and high-velocity web interfaces with component-driven architecture and smooth Framer Motion choreographies.",
      deliverables: [
        "Responsive, mobile-first SPAs & SSRs",
        "Design system implementation (Tailwind CSS)",
        "Zero-CLS layout & state management",
      ],
      color: "from-blue-600 to-cyan-600",
      glow: "rgba(59, 130, 246, 0.2)",
    },
    {
      num: "02",
      icon: Server,
      title: "Full-Stack Development",
      tag: "Next.js • Node.js • Express",
      description:
        "End-to-end full-stack architectures integrating robust server logic, authentication workflows, dynamic rendering, and seamless database models.",
      deliverables: [
        "Secure JWT session & cookie auth",
        "Role-based access control (RBAC)",
        "CRUD & real-time dashboard systems",
      ],
      color: "from-blue-600 to-cyan-600",
      glow: "rgba(59, 130, 246, 0.2)",
    },
    {
      num: "03",
      icon: Database,
      title: "API & Backend Architecture",
      tag: "REST • MongoDB • PostgreSQL",
      description:
        "Designing scalable RESTful endpoints, clean schema relations, query optimizations, and robust error handling to power mission-critical web applications.",
      deliverables: [
        "RESTful API design & integration",
        "Database modeling (Mongoose / SQL)",
        "Server-side validation & error logging",
      ],
      color: "from-blue-600 to-teal-600",
      glow: "rgba(13, 148, 136, 0.2)",
    },
    {
      num: "04",
      icon: Gauge,
      title: "Performance & UI Audit",
      tag: "Core Web Vitals • WCAG AA",
      description:
        "Elevating web applications to 95+ Lighthouse scores through code-splitting, asset optimization, accessibility audits, and smooth interaction tuning.",
      deliverables: [
        "Lighthouse & Core Web Vitals optimization",
        "WCAG AA keyboard & screen-reader audit",
        "Bundle analysis & rendering speed tuning",
      ],
      color: "from-emerald-600 to-teal-600",
      glow: "rgba(16, 185, 129, 0.2)",
    },
  ];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 px-6 lg:px-12 scroll-mt-24 relative overflow-hidden"
    >
      {/* Background decoration with cyber-grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 cyber-grid pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/60 dark:border-cyan-800/60 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>What I Deliver</span>
          </div>
          <h2 id="services-heading" className="fluid-h2 font-extrabold gradient-text mb-4">
            Services & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
            High-standard engineering solutions tailored for startups, businesses, and engineering teams.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer(0.08, 0.05)}
        >
          {enhancedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={scaleIn}
                className="h-full flex"
              >
                <SpotlightCard
                  spotlightColor={service.glow}
                  className="bento-card p-6 sm:p-7 flex flex-col justify-between group h-full w-full"
                >
                  <div>
                    {/* Number and Icon Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 bg-gradient-to-br ${service.color} rounded-2xl text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xl font-mono font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {service.num}
                      </span>
                    </div>

                    {/* Tag */}
                    <div className="mb-2">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {service.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to action */}
        <motion.div className="text-center mt-16" variants={fadeUp}>
          <MagneticButton strength={0.25}>
            <motion.button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-xl shadow-sm hover:opacity-90 transition-all duration-300 text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Have a project in mind? Let's talk</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
