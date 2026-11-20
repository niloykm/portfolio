"use client";

import { assets } from "@/assets/assets";
import { useReducedMotion } from "framer-motion";
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
      className="relative pt-24 pb-14 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800 structural-grid"
    >
      <div className="max-w-6xl mx-auto">
        {/* Compact Status & Location Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-7 border-b border-zinc-200 dark:border-zinc-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-600/25 dark:border-emerald-500/30 text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
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

            <div className="space-y-3 max-w-2xl">
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
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold text-xs sm:text-sm rounded-md transition-colors duration-150 ease-out active:scale-[0.98]"
              >
                <span>View Shipped Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150 ease-out" />
              </a>

              <a
                href="/niloy.pdf"
                download="Niloy_Kumar_Mohonta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume (PDF)"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-white dark:bg-[#111114] hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 font-mono font-semibold text-xs sm:text-sm rounded-md transition-colors duration-150 ease-out active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Resume (PDF)</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address niloykumarmohonta@gmail.com to clipboard"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-transparent hover:bg-zinc-200/60 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-mono font-medium text-xs sm:text-sm rounded-md transition-colors duration-150 ease-out active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-400">
                      Email Copied
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                    <span>Copy Email</span>
                  </>
                )}
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
                      className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      <span>@{GITHUB_USERNAME}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
                    className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-150 ease-out active:scale-[0.98]"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/niloykumarmohonta000/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Niloy's LinkedIn profile"
                    className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-150 ease-out active:scale-[0.98]"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://x.com/niloykmohonta"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Niloy's X (Twitter) profile"
                    className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-150 ease-out active:scale-[0.98]"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:niloykumarmohonta@gmail.com"
                    aria-label="Send direct email to niloykumarmohonta@gmail.com"
                    className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-150 ease-out active:scale-[0.98]"
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
