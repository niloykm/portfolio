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
  Terminal,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

const Header = () => {
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
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-neutral-800 structural-grid"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Architectural Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
              <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Full-Stack Software Engineer &amp; Co-Founder at Gen Stella IT</span>
            </span>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for select engineering roles</span>
            </span>
          </div>

          <div className="font-mono tabular-nums text-xs text-zinc-600 dark:text-zinc-400">
            <span>LOC: DHAKA, BD (UTC+6)</span>
          </div>
        </div>

        {/* Asymmetric 12-Column Engineering Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Primary Column (8 Cols): Direct Hook, Proof, Stack & CTAs */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h1 className="fluid-h1 font-extrabold tracking-tight text-zinc-950 dark:text-white">
                Niloy Kumar Mohonta
              </h1>
              <p className="mt-2 font-mono text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold">
                NEXT.JS • NESTJS • POSTGRESQL • DISTRIBUTED WEB SYSTEMS
              </p>
            </div>

            {/* Direct, Punchy Engineering Proof + Sub-Headline */}
            <div className="space-y-3 max-w-3xl">
              <p className="text-base sm:text-lg text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed">
                Engineered full-stack SaaS platforms, custom LMS RBAC auth engines, and cloud infrastructures handling high-concurrency workloads.
              </p>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Architecting resilient web applications, modular NestJS/Node.js backend systems, and pixel-complete React/Next.js interfaces with strict performance standards.
              </p>
            </div>

            {/* Core Tech Stack Chips */}
            <div className="pt-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2.5">
                Core Production Stack
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {techBadges.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono font-medium px-2.5 py-1 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-md border border-neutral-200 dark:border-neutral-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Dual Primary CTAs + Secondary Utility Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={handleExploreProjects}
                aria-label="Explore Projects"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[42px] bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold text-xs sm:text-sm rounded-md transition-all duration-150 ease-out active:scale-[0.98]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150 ease-out" />
              </a>

              <a
                href="/niloy.pdf"
                download="Niloy_Kumar_Mohonta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume (PDF)"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-neutral-300 dark:border-neutral-700 font-mono font-semibold text-xs sm:text-sm rounded-md transition-all duration-150 ease-out active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Download Resume</span>
              </a>

              <a
                href="https://github.com/niloydiu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Resume/GitHub profile (niloydiu)"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] bg-zinc-50 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-neutral-200 dark:border-neutral-800 font-mono font-medium text-xs sm:text-sm rounded-md transition-all duration-150 ease-out active:scale-[0.98]"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address niloykumarmohonta@gmail.com to clipboard"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] bg-zinc-50 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-neutral-200 dark:border-neutral-800 font-mono font-medium text-xs sm:text-sm rounded-md transition-all duration-150 ease-out active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
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

          {/* Right Column (4 Cols): Structured Engineering Dossier & Telemetry */}
          <div className="lg:col-span-4 w-full">
            <div className="rounded-lg bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-neutral-800 p-5 space-y-5">
              {/* Engineer Identity Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="relative flex-shrink-0">
                  <Image
                    src={assets.profileNiloyTP}
                    alt="Portrait of Niloy Kumar Mohonta"
                    width={64}
                    height={64}
                    sizes="64px"
                    className="rounded-md w-16 h-16 object-cover border border-neutral-200 dark:border-neutral-800 bg-zinc-100 dark:bg-zinc-950"
                    priority
                  />
                  <span
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#09090b] rounded-full"
                    title="Available for engineering roles"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                    SYS::ENGINEER_SPEC
                  </div>
                  <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    Niloy K. Mohonta
                  </div>
                  <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400 truncate">
                    B.Sc. CSE @ DIU • Co-Founder
                  </div>
                </div>
              </div>

              {/* Tabular Specification Rows */}
              <dl className="space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/70">
                  <dt className="text-zinc-500 dark:text-zinc-400">LEADERSHIP</dt>
                  <dd className="text-zinc-900 dark:text-zinc-100 font-semibold tabular-nums">
                    Gen Stella IT
                  </dd>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/70">
                  <dt className="text-zinc-500 dark:text-zinc-400">EXPERIENCE</dt>
                  <dd className="text-zinc-900 dark:text-zinc-100 font-semibold tabular-nums">
                    3+ Yrs Production
                  </dd>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/70">
                  <dt className="text-zinc-500 dark:text-zinc-400">REPOSITORIES</dt>
                  <dd className="text-zinc-900 dark:text-zinc-100 font-semibold tabular-nums">
                    50+ Public Systems
                  </dd>
                </div>
                <div className="flex items-center justify-between py-1">
                  <dt className="text-zinc-500 dark:text-zinc-400">ARCHITECTURE</dt>
                  <dd className="text-emerald-700 dark:text-emerald-400 font-semibold tabular-nums">
                    RBAC • SSR • ACID
                  </dd>
                </div>
              </dl>

              {/* Quick Social Links */}
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                  DIRECT CHANNELS
                </span>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://github.com/niloydiu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Niloy's GitHub profile (niloydiu)"
                    className="p-2 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors duration-150 ease-out active:scale-[0.98]"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/niloykumarmohonta000/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Niloy's LinkedIn profile"
                    className="p-2 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors duration-150 ease-out active:scale-[0.98]"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://x.com/niloykmohonta"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Niloy's X (Twitter) profile"
                    className="p-2 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors duration-150 ease-out active:scale-[0.98]"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="mailto:niloykumarmohonta@gmail.com"
                    aria-label="Send direct email to niloykumarmohonta@gmail.com"
                    className="p-2 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors duration-150 ease-out active:scale-[0.98]"
                  >
                    <Mail className="w-3.5 h-3.5" />
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
