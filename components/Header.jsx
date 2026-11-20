"use client";

import { assets } from "@/assets/assets";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ICON_SWAP_TRANSITION } from "@/lib/motion";
import {
  Mail,
  ArrowRight,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  Download,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from "@/lib/github";

const CORE_STACK = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "MongoDB",
  "Docker",
];

const Header = ({ projectCount = 14 }) => {
  const shouldReduceMotion = useReducedMotion();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    const email = "niloykumarmohonta@gmail.com";
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      }
    } catch {
      // Clipboard API permission fallback
    }
    setCopied(true);
    showToast("Copied niloykumarmohonta@gmail.com to clipboard", "success");
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
      className="relative pt-24 pb-16 sm:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800 structural-grid"
    >
      <div className="max-w-6xl mx-auto">
        {/* Compact Status & Location Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-7 border-b border-zinc-200 dark:border-zinc-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-600/25 dark:border-emerald-500/30 text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0"
            />
            <span>Open to Full-Stack &amp; Frontend Roles</span>
          </div>

          <div className="inline-flex items-center gap-1.5 font-mono tabular-nums text-xs text-zinc-600 dark:text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Dhaka, BD (UTC+6) • Remote / Hybrid</span>
          </div>
        </div>

        {/* Asymmetric 12-Column Engineering Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Primary Column (8 Cols): Direct Role, Concrete Proof, Stack & Focused CTAs */}
          <div className="lg:col-span-8 space-y-5">
            <div>
              <p className="font-mono text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase mb-2">
                Full-Stack Software Engineer
              </p>
              <h1 className="fluid-h1 font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                Niloy Kumar Mohonta
              </h1>
            </div>

            <div className="space-y-3 max-w-prose">
              <p className="text-base sm:text-lg text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed">
                Shipping production SaaS platforms, multi-tenant RBAC auth systems, and high-throughput web applications with Next.js, TypeScript, Node.js/NestJS, PostgreSQL, and MongoDB.
              </p>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Currently Full-Stack Engineer at <strong className="font-semibold text-zinc-900 dark:text-zinc-200">ScholarPASS</strong>; previously engineered core search and scheduling interfaces at <strong className="font-semibold text-zinc-900 dark:text-zinc-200">TripBooking.ai</strong> (cutting LCP from 3.2s to 1.5s) and <strong className="font-semibold text-zinc-900 dark:text-zinc-200">TutorsPlan</strong>.
              </p>
            </div>

            {/* Core Production Stack Chips */}
            <div className="pt-1">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Core Production Stack
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {CORE_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono font-medium px-2.5 py-1 bg-white dark:bg-[#111114] text-zinc-800 dark:text-zinc-200 rounded-md border border-zinc-200 dark:border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Focused 3-Action CTA Hierarchy */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={handleExploreProjects}
                aria-label="Explore Shipped Projects"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white hover:-translate-y-0.5 text-white dark:text-zinc-950 font-mono font-semibold text-xs sm:text-sm rounded-md shadow-xs interactive-btn"
              >
                <span>View Shipped Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
              </a>

              <a
                href="/niloy.pdf"
                download="Niloy_Kumar_Mohonta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume (PDF)"
                className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-white dark:bg-[#111114] hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 font-mono font-semibold text-xs sm:text-sm rounded-md interactive-btn"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5" />
                <span>Resume (PDF)</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address niloykumarmohonta@gmail.com to clipboard"
                className={`relative overflow-hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] min-w-[144px] rounded-md font-mono font-medium text-xs sm:text-sm border hover:-translate-y-0.5 interactive-btn ${
                  copied
                    ? "bg-emerald-500/15 border-emerald-600/50 text-emerald-800 dark:text-emerald-300 font-semibold"
                    : "bg-white/70 dark:bg-[#111114]/70 hover:bg-zinc-200/60 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={ICON_SWAP_TRANSITION}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied!</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={ICON_SWAP_TRANSITION}
                      className="inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      <Copy className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      <span>Copy Email</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Right Column (4 Cols): Concise Verified Engineer Profile Card */}
          <div className="lg:col-span-4 w-full">
            <div className="rounded-lg bg-white dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800 p-5 space-y-5">
              {/* Identity Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="relative flex-shrink-0">
                  <Image
                    src={assets.profileNiloyTP}
                    alt="Portrait of Niloy Kumar Mohonta"
                    width={60}
                    height={60}
                    sizes="60px"
                    className="rounded-md w-[60px] h-[60px] object-cover border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950"
                    priority
                  />
                  <span
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#111114] rounded-full"
                    title="Available for engineering roles"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                    Engineer Profile
                  </div>
                  <div className="text-base font-bold text-zinc-950 dark:text-zinc-50 truncate">
                    Niloy K. Mohonta
                  </div>
                  <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400 truncate">
                    B.Sc. CSE @ DIU (2022–2026)
                  </div>
                </div>
              </div>

              {/* Verified Tabular Summary Rows */}
              <dl className="space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between gap-2 py-1 border-b border-zinc-100 dark:border-zinc-800/80">
                  <dt className="text-zinc-600 dark:text-zinc-400">Current Role</dt>
                  <dd className="text-zinc-950 dark:text-zinc-100 font-semibold text-right">
                    ScholarPASS
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2 py-1 border-b border-zinc-100 dark:border-zinc-800/80">
                  <dt className="text-zinc-600 dark:text-zinc-400">Experience</dt>
                  <dd className="text-zinc-950 dark:text-zinc-100 font-semibold tabular-nums text-right">
                    3+ Yrs Production
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2 py-1 border-b border-zinc-100 dark:border-zinc-800/80">
                  <dt className="text-zinc-600 dark:text-zinc-400">Live Systems</dt>
                  <dd className="text-zinc-950 dark:text-zinc-100 font-semibold tabular-nums text-right">
                    {projectCount} Verified Apps
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2 py-1">
                  <dt className="text-zinc-600 dark:text-zinc-400">GitHub</dt>
                  <dd className="text-right">
                    <a
                      href={GITHUB_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      <span>@{GITHUB_USERNAME}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Direct Social Channels */}
              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
                  Direct Links
                </span>
                <div className="flex items-center gap-1.5">
                  <a
                    href={GITHUB_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Niloy's GitHub profile (@${GITHUB_USERNAME})`}
                    className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 interactive-btn"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/niloykumarmohonta000/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Niloy's LinkedIn profile"
                    className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 interactive-btn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://x.com/niloykmohonta"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Niloy's X (Twitter) profile"
                    className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 interactive-btn"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:niloykumarmohonta@gmail.com"
                    aria-label="Send direct email to niloykumarmohonta@gmail.com"
                    className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 interactive-btn"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
