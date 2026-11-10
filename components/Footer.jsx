"use client";

import { assets, socialLinks } from "@/assets/assets";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  ArrowUp,
} from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    facebook: Facebook,
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer
      aria-label="Footer"
      className="border-t border-neutral-200 dark:border-neutral-800 bg-zinc-50/60 dark:bg-[#09090b]"
    >
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <Image
              src={assets.logoNiloy}
              alt="Niloy's Logo"
              className="h-7 w-auto filter dark:brightness-110"
            />
            <div>
              <div className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Niloy Kumar Mohonta
              </div>
              <div className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                Full-Stack Software Engineer &amp; Co-Founder @ Gen Stella IT
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:niloykumarmohonta@gmail.com"
              aria-label="Email Niloy directly at niloykumarmohonta@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[36px] bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 rounded-md hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors duration-150 font-mono text-xs text-zinc-800 dark:text-zinc-200 active:scale-[0.98]"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>niloykumarmohonta@gmail.com</span>
            </a>

            <div className="flex items-center gap-1.5">
              {socialLinks.map((site, index) => {
                const Icon = socialIcons[site.name.toLowerCase()] || Mail;
                return (
                  <a
                    key={index}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Niloy's ${site.name} profile`}
                    className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 rounded-md text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors duration-150 active:scale-[0.98]"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
          <p>© {new Date().getFullYear()} Niloy Kumar Mohonta. All rights reserved.</p>
          <p>NEXT.JS 15 • REACT 19 • STRICT MONOCHROMATIC SYSTEM</p>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="fixed bottom-6 right-6 p-2.5 min-w-[40px] min-h-[40px] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 rounded-md border border-neutral-700 dark:border-neutral-300 z-40 flex items-center justify-center transition-transform duration-150 active:scale-[0.98]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
