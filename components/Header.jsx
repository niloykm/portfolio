"use client";

import { assets } from "@/assets/assets";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  ArrowRight,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  Download,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useToast } from "@/components/ui/Toast";
import {
  fadeUp,
  staggerContainer,
  floatingAnimation,
} from "@/lib/motion";

const Header = ({ isDarkMode }) => {
  const shouldReduceMotion = useReducedMotion();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const techBadges = [
    "TypeScript",
    "Next.js",
    "React.js",
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Tailwind CSS",
  ];

  const handleCopyEmail = async () => {
    const email = "niloykumarmohonta@gmail.com";
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      }
    } catch {
      // Fallback if clipboard API permission is restricted
    }
    setCopied(true);
    showToast("Copied niloykumarmohonta@gmail.com to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExploreProjects = (e) => {
    e.preventDefault();
    const target =
      document.getElementById("projects") || document.getElementById("work");
    if (target) {
      target.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <section
      id="top"
      aria-label="Hero Section"
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6"
    >
      {/* Background decoration with cyber-grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 cyber-grid pointer-events-none" />

      {/* Ambient glowing blobs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto text-center"
        variants={staggerContainer(0.08, 0.08)}
        initial="hidden"
        animate="show"
      >
        {/* Profile Image with Gentle Floating Loop */}
        <motion.div variants={fadeUp} className="mb-5 relative inline-block">
          <motion.div
            animate={shouldReduceMotion ? {} : floatingAnimation}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-50 dark:opacity-70 animate-pulse"
            />
            <Image
              src={assets.profileNiloyTP}
              alt="Portrait of Niloy Kumar Mohonta"
              width={128}
              height={128}
              sizes="(max-width: 640px) 112px, 128px"
              className="relative rounded-full w-28 h-28 sm:w-32 sm:h-32 object-cover border-2 border-white/80 dark:border-slate-800/80 shadow-2xl bg-white dark:bg-slate-900"
              priority
            />
            {/* Status indicator dot */}
            <div
              className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-md"
              title="Available for full-time engineering roles & contracts"
            >
              <span className="sr-only">Available for work</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Styled Role & Availability Badges */}
        <motion.div
          variants={fadeUp}
          className="mb-5 flex flex-wrap items-center justify-center gap-2.5"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/95 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-xs sm:text-sm font-mono font-semibold text-blue-700 dark:text-blue-300 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Full-Stack Software Engineer</span>
          </span>

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/95 dark:bg-emerald-950/50 border border-emerald-300/70 dark:border-emerald-700/70 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              Available for Full-Time & Remote Engineering
            </span>
          </span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1
          variants={fadeUp}
          className="fluid-h1 font-extrabold mb-5 tracking-tight text-slate-900 dark:text-white leading-[1.1]"
        >
          <span>Niloy Kumar </span>
          <span className="gradient-text drop-shadow-[0_2px_12px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_2px_15px_rgba(168,85,247,0.35)]">
            Mohonta
          </span>
        </motion.h1>

        {/* Refined Sub-Headline & Value Proposition */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto mb-8 leading-relaxed font-normal"
        >
          Architecting resilient web applications, modular NestJS/Node.js backend systems, and pixel-complete React/Next.js interfaces with strict performance standards.
        </motion.p>

        {/* Tech Stack Badges */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center items-center gap-2 flex-wrap max-w-2xl mx-auto mb-9"
        >
          {techBadges.map((tech) => (
            <span
              key={tech}
              className="text-[11px] sm:text-xs font-mono font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Interactive CTA Buttons: Explore Projects, Copy Email, Download Resume */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row flex-wrap gap-3.5 justify-center items-center mb-8"
        >
          <MagneticButton strength={0.25}>
            <motion.a
              href="#projects"
              onClick={handleExploreProjects}
              aria-label="Explore Projects"
              className="group w-full sm:w-auto px-7 py-3.5 min-h-[44px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 flex items-center justify-center gap-2.5 text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address niloykumarmohonta@gmail.com to clipboard"
              className="group w-full sm:w-auto px-6 py-3.5 min-h-[44px] bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold rounded-xl hover:border-blue-500/60 hover:bg-slate-50 dark:hover:bg-slate-800/90 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Email Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <a
              href="/niloy.pdf"
              download="Niloy_Kumar_Mohonta_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume (PDF)"
              className="group w-full sm:w-auto px-6 py-3.5 min-h-[44px] bg-slate-100/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold rounded-xl hover:border-purple-500/60 hover:bg-slate-200/70 dark:hover:bg-slate-800/90 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base shadow-sm"
            >
              <Download className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Hero Quick Socials */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center items-center gap-3"
        >
          <MagneticButton strength={0.2}>
            <a
              href="https://github.com/niloydiu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Niloy's GitHub profile (niloydiu)"
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4" />
            </a>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <a
              href="https://www.linkedin.com/in/niloykumarmohonta000/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Niloy's LinkedIn profile"
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <a
              href="https://x.com/niloykmohonta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Niloy's X (Twitter) profile"
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <a
              href="mailto:niloykumarmohonta@gmail.com"
              aria-label="Send direct email to niloykumarmohonta@gmail.com"
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Header;
