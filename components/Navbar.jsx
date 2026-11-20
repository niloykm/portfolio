"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Sun, Moon, Mail, ArrowUpRight, Search } from "lucide-react";

const NAV_ITEMS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "Experience" },
  { href: "#services", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
];

const Navbar = ({ isDarkMode, setIsDarkMode, onOpenCommandPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mobileMenuRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          if (window.scrollY < 180) {
            setActiveSection("");
            ticking = false;
            return;
          }

          const sections = ["projects", "about", "services", "contact"];
          const currentSection = sections.find((section) => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 180 && rect.bottom >= 140;
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
    if (href === "#top") {
      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
      return;
    }
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
            ? "bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-zinc-200 dark:border-zinc-800"
            : "bg-[#fafafa]/85 dark:bg-[#09090b]/85 backdrop-blur-sm border-zinc-200/70 dark:border-zinc-800/70"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: High-Contrast Monogram Brand Identity */}
          <a
            href="#top"
            aria-label="Niloy Kumar Mohonta — Return to top"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#top");
            }}
            className="flex-shrink-0 inline-flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] transition-transform duration-150 ease-out"
          >
            <span
              aria-hidden="true"
              className="w-7 h-7 rounded-md bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-bold inline-flex items-center justify-center tracking-tight"
            >
              NK
            </span>
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              niloy.km
            </span>
          </a>

          {/* Center: Clean 4-Item Section Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3.5 py-2 text-xs font-mono font-medium rounded-md transition-colors duration-150 ease-out active:scale-[0.98] ${
                    isActive
                      ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-200/60 dark:hover:bg-zinc-900"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right: Command Palette, Theme Toggle, Direct Contact */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label="Open command palette (Cmd+K)"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 min-h-[38px] rounded-md bg-white dark:bg-[#111114] border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-150 ease-out active:scale-[0.98]"
            >
              <Search className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="font-mono tabular-nums text-[11px] bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 font-semibold text-zinc-700 dark:text-zinc-300">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111114] hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors duration-150 ease-out active:scale-[0.98]"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-zinc-200" />
              ) : (
                <Moon className="h-4 w-4 text-zinc-700" />
              )}
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold text-xs rounded-md transition-colors duration-150 ease-out active:scale-[0.98]"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Get in Touch</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

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
              className="md:hidden p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111114] text-zinc-800 dark:text-zinc-200 transition-colors duration-150 ease-out active:scale-[0.98]"
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
              className="fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white dark:bg-[#09090b] z-50 md:hidden border-l border-zinc-200 dark:border-zinc-800 flex flex-col justify-between p-5"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-200 dark:border-zinc-800">
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
                    className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 active:scale-[0.98]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav className="space-y-1.5" aria-label="Mobile Navigation Links">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`flex items-center justify-between px-3.5 py-2.5 min-h-[42px] text-sm font-mono font-medium rounded-md transition-colors duration-150 ease-out active:scale-[0.98] ${
                          isActive
                            ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-70" />
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href="/niloy.pdf"
                  download="Niloy_Kumar_Mohonta_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 min-h-[42px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-xs font-semibold rounded-md active:scale-[0.98]"
                >
                  <span>Download Resume (PDF)</span>
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 min-h-[42px] bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-semibold rounded-md active:scale-[0.98]"
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
