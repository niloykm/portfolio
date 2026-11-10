"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Sun, Moon, Mail, ArrowUpRight, Search } from "lucide-react";

const Navbar = ({ isDarkMode, setIsDarkMode, onOpenCommandPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const mobileMenuRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          const sections = ["about", "services", "projects", "contact"];
          const currentSection = sections.find((section) => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 160 && rect.bottom >= 140;
            }
            return false;
          });
          if (currentSection) setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-150 ease-out border-b ${
          isScrolled
            ? "bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-neutral-200 dark:border-neutral-800"
            : "bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-sm border-neutral-200/70 dark:border-neutral-800/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Identity + Live Status Indicator */}
          <div className="flex items-center gap-4 min-w-0">
            <a
              href="#top"
              aria-label="Niloy Kumar Mohonta Portfolio Homepage"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#top");
              }}
              className="flex-shrink-0 flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] transition-transform duration-150 ease-out"
            >
              <Image
                src={assets.logoNiloy}
                alt="Niloy's Logo"
                className="h-7 w-auto filter dark:brightness-110"
                priority
              />
              <span className="hidden sm:inline-block font-mono text-xs font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                niloy.km
              </span>
            </a>

            <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-neutral-200 dark:border-neutral-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                Available for select engineering roles
              </span>
            </div>
          </div>

          {/* Center: Minimal Structural Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-md transition-all duration-150 ease-out active:scale-[0.98] ${
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right: Command Palette, Theme Toggle, Direct CTA */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label="Open command palette (Cmd+K)"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 min-h-[36px] rounded-md bg-zinc-50 dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-150 ease-out active:scale-[0.98]"
            >
              <Search className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span className="hidden sm:inline text-zinc-600 dark:text-zinc-400">
                Command
              </span>
              <kbd className="font-mono tabular-nums text-[10px] bg-white dark:bg-zinc-950 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 font-semibold text-zinc-700 dark:text-zinc-300">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all duration-150 ease-out active:scale-[0.98]"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-zinc-200" />
              ) : (
                <Moon className="h-4 w-4 text-zinc-700" />
              )}
            </button>

            <div className="hidden lg:block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[36px] bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold text-xs rounded-md transition-all duration-150 ease-out active:scale-[0.98]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Hire Me</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 transition-all duration-150 ease-out active:scale-[0.98]"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              ref={mobileMenuRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white dark:bg-[#09090b] z-50 md:hidden border-l border-neutral-200 dark:border-neutral-800 flex flex-col justify-between p-5"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      NAVIGATION
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="p-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-zinc-700 dark:text-zinc-300 active:scale-[0.98]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav className="space-y-1.5" aria-label="Mobile Navigation Links">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-mono font-medium rounded-md transition-colors duration-150 ease-out active:scale-[0.98] ${
                          isActive
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                    Available for select engineering roles
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCommandPalette?.();
                  }}
                  aria-label="Open command palette"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-medium rounded-md active:scale-[0.98]"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Command Palette (⌘K)</span>
                </button>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-semibold rounded-md active:scale-[0.98]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Contact Me</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
