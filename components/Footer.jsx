"use client";

import { assets, socialLinks } from "@/assets/assets";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Mail, Github, Linkedin, Twitter, Facebook, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeUp, staggerContainer } from "@/lib/motion";

const Footer = ({ isDarkMode }) => {
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
    <footer aria-label="Footer" className="relative mt-24 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md">
      {/* Subtle decorative glow elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        className="relative z-10 py-16 px-6 lg:px-12 max-w-6xl mx-auto"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Main footer content */}
        <div className="text-center mb-12">
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <Image
              src={assets.logoNiloy}
              alt="Niloy's Logo"
              className="h-10 w-auto filter dark:brightness-110"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <MagneticButton strength={0.2}>
              <a
                href="mailto:niloykumarmohonta@gmail.com"
                aria-label="Email Niloy directly"
                className="inline-flex items-center gap-2.5 px-6 py-3 min-h-[44px] bg-white dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full shadow-sm hover:border-blue-500/50 transition-colors duration-200 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>niloykumarmohonta@gmail.com</span>
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center items-center gap-4 mb-12 flex-wrap"
        >
          {socialLinks.map((site, index) => {
            const Icon = socialIcons[site.name.toLowerCase()] || Mail;
            return (
              <MagneticButton key={index} strength={0.25}>
                <motion.a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Niloy's ${site.name} profile`}
                  className="p-3.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all duration-200 shadow-sm"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              </MagneticButton>
            );
          })}
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-8"
        />

        {/* Bottom copyright notice */}
        <motion.div variants={fadeUp} className="text-center">
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-normal">
            © {new Date().getFullYear()} Niloy Kumar Mohonta. All rights reserved.
          </p>
        </motion.div>
      </motion.div>

      {/* Floating Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="fixed bottom-6 right-6 p-3.5 min-w-[44px] min-h-[44px] bg-accent text-accent-foreground rounded-full shadow-sm hover:opacity-90 z-40 group focus-visible:ring-2 focus-visible:ring-accent"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
