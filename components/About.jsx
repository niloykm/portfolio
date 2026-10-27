"use client";

import { assets, infoList, toolsData } from "@/assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Code,
  Palette,
  Sparkles,
  Laptop,
  Terminal,
  UserCheck,
  Clock,
  Globe2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import DevTerminal from "@/components/ui/DevTerminal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const About = ({ isDarkMode, infoList: propInfoList }) => {
  const [timeString, setTimeString] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeConsole, setActiveConsole] = useState(false);

  // Live Dhaka Time (GMT+6)
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      try {
        const options = {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        setTimeString(new Intl.DateTimeFormat("en-US", options).format(new Date()));
      } catch {
        setTimeString(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const coreSkills = [
    { name: "React.js / Next.js", level: "Senior", pct: 95, color: "from-blue-500 to-cyan-500" },
    { name: "TypeScript / JavaScript", level: "Advanced", pct: 92, color: "from-blue-600 to-blue-500" },
    { name: "Tailwind CSS / Motion", level: "Expert", pct: 96, color: "from-teal-400 to-emerald-500" },
    { name: "Node.js / Express.js", level: "Proficient", pct: 85, color: "from-emerald-500 to-teal-600" },
    { name: "MongoDB / PostgreSQL", level: "Proficient", pct: 82, color: "from-blue-500 to-teal-500" },
  ];

  const engineeringPrinciples = [
    { icon: Zap, title: "Sub-Second Latency", desc: "Optimized Core Web Vitals, tree-shaking, and zero layout shift." },
    { icon: ShieldCheck, title: "Clean Architecture", desc: "Modular, maintainable code with strict typing and unit reliability." },
    { icon: Layers, title: "Accessible by Default", desc: "Keyboard navigable, WCAG AA contrast compliant, and screen-reader ready." },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 px-6 lg:px-12 scroll-mt-24 relative overflow-hidden"
    >
      {/* Ambient background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 cyber-grid pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer(0.1, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-3 shadow-sm">
            <Code className="w-3.5 h-3.5" />
            <span>Developer Overview</span>
          </div>
          <h2 id="about-heading" className="fluid-h2 font-extrabold gradient-text mb-4">
            Engineered for Impact
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
            A look into my engineering philosophy, technical stack, live metrics, and interactive console.
          </p>
        </motion.div>

        {/* Master Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bento 1: Profile & Bio Card (Spans 2 columns on lg) */}
          <motion.div variants={scaleIn} className="lg:col-span-2">
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.15)"
              className="bento-card p-6 sm:p-8 h-full flex flex-col justify-between"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-xl flex-shrink-0 bg-slate-900">
                  <Image
                    src={assets.userImageNiloySM}
                    alt="Niloy Kumar Mohonta"
                    fill
                    sizes="112px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold rounded-full mb-2">
                    <span>Full-Stack & Frontend Engineer</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    Niloy Kumar Mohonta
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Building scalable, responsive, and delightful web systems.
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                I specialize in crafting high-velocity web applications using the modern React & Next.js ecosystem.
                Whether designing frictionless user interfaces, optimizing Core Web Vitals, or architecting secure REST APIs with Node.js and MongoDB, I build software that makes a real commercial impact.
              </p>

              {/* Quick Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                    <AnimatedCounter value={36} suffix="+" />
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    GitHub Repos
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                    <AnimatedCounter value={2} suffix="+ Yrs" />
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Development Exp
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    100%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Commitment to Craft
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Bento 2: Live Location & Availability Widget */}
          <motion.div variants={scaleIn}>
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.15)"
              className="bento-card p-6 sm:p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <Globe2 className="w-4 h-4" />
                    <span>Location & Time</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Dhaka, Bangladesh
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                  Available for global remote contracts and full-time engineering roles.
                </p>

                {/* Digital Clock Widget */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono shadow-inner mb-6">
                  <div className="text-xs text-slate-400 mb-1 flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Local Time (GMT+6)</span>
                  </div>
                  <div
                    suppressHydrationWarning
                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-widest"
                  >
                    {mounted && timeString ? timeString : "06:00:00 PM"}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  Ready to start immediately
                </span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Bento 3: Tech Radar & Competencies */}
          <motion.div variants={scaleIn}>
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.15)"
              className="bento-card p-6 sm:p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
                  <Cpu className="w-4 h-4" />
                  <span>Technical Proficiency</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Core Stack Radar
                </h3>

                <div className="space-y-3.5">
                  {coreSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        <span>{skill.name}</span>
                        <span className="font-mono text-slate-500">{skill.level}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Learning: Nest.js • Docker</span>
                <span className="text-blue-500 font-semibold">2026 Focus</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Bento 4: Engineering Principles */}
          <motion.div variants={scaleIn}>
            <SpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.15)"
              className="bento-card p-6 sm:p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Engineering Standard</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  How I Build Software
                </h3>

                <div className="space-y-4">
                  {engineeringPrinciples.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono text-slate-500">Zero Shortcuts • High Standards</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Bento 5: Interactive Dev Terminal Toggle & Console */}
          <motion.div variants={scaleIn}>
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.15)"
              className="bento-card p-6 sm:p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    <Terminal className="w-4 h-4" />
                    <span>Developer CLI</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    Interactive
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Try Niloy's Console
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                  Test live commands, query skills, or inspect contact channels right inside an emulated terminal.
                </p>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left font-mono text-xs text-slate-300 space-y-1.5 mb-6">
                  <p className="text-emerald-400">❯ niloy --version</p>
                  <p className="text-slate-400 pl-3">v2.4.0 (Full-Stack Engineer)</p>
                  <p className="text-emerald-400">❯ sudo hire --now</p>
                  <p className="text-blue-400 pl-3">✨ Priority pipeline ready...</p>
                </div>
              </div>

              <button
                onClick={() => setActiveConsole(!activeConsole)}
                className="w-full py-2.5 px-4 bg-accent hover:opacity-90 text-accent-foreground font-semibold text-xs sm:text-sm rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                <span>{activeConsole ? "Hide Terminal" : "Launch Terminal"}</span>
              </button>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Expandable Live Developer Console View */}
        <AnimatePresence>
          {activeConsole && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="mt-8 overflow-hidden"
            >
              <div className="max-w-4xl mx-auto">
                <DevTerminal />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default About;
