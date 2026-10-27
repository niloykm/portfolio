"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import { Mail, ArrowRight, Copy, Check, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

const Header = () => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("niloykumarmohonta@gmail.com");
    setCopied(true);
    showToast("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="top"
      aria-label="Hero Section"
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden pt-28 pb-16 px-6 lg:px-12 scroll-mt-24"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center gap-10 lg:gap-14 text-left">
          {/* Content Column (First in DOM) */}
          <div className="flex flex-col items-start">
            {/* Merged Availability Line */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for full-time roles & freelance projects</span>
            </div>

            {/* Headline */}
            <h1 className="fluid-h1 font-extrabold tracking-tight text-foreground text-balance mb-5">
              I build and ship full-stack web products with Next.js and TypeScript.
            </h1>

            {/* Summary */}
            <p className="text-base sm:text-lg text-muted text-pretty max-w-[60ch] mb-4 leading-relaxed">
              Full-Stack Software Engineer crafting high-performance web applications, scalable backend APIs, and accessible, responsive interfaces.
            </p>

            {/* Single Muted Mono Stack Line */}
            <p className="text-xs sm:text-sm font-mono text-muted mb-8 tracking-tight">
              TypeScript · Next.js · Node.js · PostgreSQL · MongoDB
            </p>

            {/* Two CTAs Only */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-accent text-accent-foreground font-semibold rounded-lg shadow-sm hover:opacity-90 transition-all text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>View projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Email me"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-surface border border-border text-foreground font-semibold rounded-lg shadow-sm hover:border-accent/40 hover:bg-muted/10 transition-all text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-accent"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Email copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-muted" />
                    <span>Email me</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Icons with accessible names and 44x44px touch targets */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/niloydiu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Niloy's GitHub Profile"
                className="w-11 h-11 flex items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-accent hover:border-accent/40 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/niloykumarmohonta000/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Niloy's LinkedIn Profile"
                className="w-11 h-11 flex items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-accent hover:border-accent/40 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="https://x.com/niloykmohonta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Niloy's X (Twitter) Profile"
                className="w-11 h-11 flex items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-accent hover:border-accent/40 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a
                href="mailto:niloykumarmohonta@gmail.com"
                aria-label="Send direct email to Niloy"
                className="w-11 h-11 flex items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-accent hover:border-accent/40 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Portrait Column (Right on desktop, Below text on mobile) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 sm:w-80 lg:w-96 aspect-square rounded-xl overflow-hidden border border-border bg-surface shadow-sm">
              <Image
                src={assets.profileNiloy}
                alt="Portrait of Niloy Kumar Mohonta"
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 256px"
                className="object-cover object-top"
                priority
              />
              <div
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface/90 border border-border shadow-sm text-[11px] font-medium text-foreground backdrop-blur-sm"
                title="Available for work"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
