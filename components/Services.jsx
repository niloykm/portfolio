"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layout,
  Server,
  Database,
  Gauge,
} from "lucide-react";
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
      title: "Frontend Architecture",
      tag: "React.js • Next.js • TypeScript",
      description:
        "Architecting pixel-complete, accessible, and zero-CLS interfaces with modern React 19, Next.js App Router, and fluid Tailwind CSS systems.",
      deliverables: [
        "SSR, SSG & ISR Next.js web applications",
        "Component-driven design systems & Tailwind CSS",
        "Zero-CLS layout & state orchestration",
      ],
      color: "from-blue-600 to-cyan-600",
      glow: "rgba(59, 130, 246, 0.2)",
    },
    {
      num: "02",
      icon: Server,
      title: "Full-Stack & Backend Systems",
      tag: "NestJS • Node.js • Express.js",
      description:
        "Engineering modular backend architectures, role-based access control (RBAC), authentication pipelines, and resilient microservices.",
      deliverables: [
        "Secure JWT & OAuth 2.0 session security",
        "Multi-role RBAC guards & middleware",
        "Modular NestJS & Node.js service layers",
      ],
      color: "from-indigo-600 to-purple-600",
      glow: "rgba(99, 102, 241, 0.2)",
    },
    {
      num: "03",
      icon: Database,
      title: "Database & API Engineering",
      tag: "PostgreSQL • MongoDB • Docker",
      description:
        "Designing high-throughput relational and document schemas, covered compound indexes, aggregation pipelines, and containerized deployments.",
      deliverables: [
        "PostgreSQL & MongoDB schema modeling",
        "Query & aggregation latency optimization",
        "Docker containerization & CI/CD workflows",
      ],
      color: "from-purple-600 to-pink-600",
      glow: "rgba(168, 85, 247, 0.2)",
    },
    {
      num: "04",
      icon: Gauge,
      title: "Performance & Accessibility",
      tag: "Core Web Vitals • WCAG AA",
      description:
        "Hardening web applications to strict production benchmarks through bundle optimization, semantic HTML, and WCAG AA contrast compliance.",
      deliverables: [
        "Core Web Vitals (LCP, CLS, INP) tuning",
        "WCAG AA contrast & keyboard navigation",
        "Playwright E2E & automated verification",
      ],
      color: "from-emerald-600 to-teal-600",
      glow: "rgba(16, 185, 129, 0.2)",
    },
  ];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 px-4 sm:px-6 lg:px-12 scroll-mt-20 relative overflow-hidden"
    >
      {/* Alias anchor for #expertise */}
      <div id="expertise" className="absolute -top-20 left-0" aria-hidden="true" />

      {/* Background decoration with cyber-grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 cyber-grid pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 dark:bg-pink-500/10 rounded-full blur-3xl pointer-events-none"
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/80 dark:border-cyan-800/80 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-800 dark:text-cyan-300 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering Domains</span>
          </div>
          <h2
            id="services-heading"
            className="fluid-h2 font-extrabold gradient-text mb-4"
          >
            Technical Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
            Production-grade engineering capabilities across frontend interfaces,
            modular backend services, and relational/document databases.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer(0.08, 0.05)}
        >
          {enhancedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={scaleIn} className="h-full flex">
                <SpotlightCard
                  spotlightColor={service.glow}
                  className="bento-card p-6 sm:p-7 flex flex-col justify-between group h-full w-full"
                >
                  <div>
                    {/* Number and Icon Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`p-3 bg-gradient-to-br ${service.color} rounded-2xl text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xl font-mono font-extrabold text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {service.num}
                      </span>
                    </div>

                    {/* Tag */}
                    <div className="mb-2">
                      <span className="text-[11px] font-mono font-semibold text-blue-700 dark:text-blue-300">
                        {service.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
                    {service.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-700 dark:text-slate-200"
                      >
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
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Have a system to architect? Let&apos;s talk</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
