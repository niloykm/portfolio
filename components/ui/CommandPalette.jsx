"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Command,
  User,
  Briefcase,
  Layers,
  Mail,
  Copy,
  Sun,
  Moon,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Download,
  Tag,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from "@/lib/github";
import { MODAL_TRANSITION } from "@/lib/motion";

const STACK_FILTER_TAGS = [
  "Next.js",
  "TypeScript",
  "NestJS",
  "PostgreSQL",
  "Node.js",
  "MongoDB",
  "React",
  "Tailwind",
];

const CommandPalette = ({
  isDarkMode,
  setIsDarkMode,
  isOpen,
  setIsOpen,
  workData = [],
  onFilterByStack,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = async () => {
    const email = "niloykumarmohonta@gmail.com";
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      }
    } catch {
      // Fallback
    }
    showToast("Email copied to clipboard: niloykumarmohonta@gmail.com", "success");
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    showToast(
      `Theme switched to ${!isDarkMode ? "Dark" : "Light"} mode`,
      "info"
    );
    setIsOpen(false);
  };

  const handleSelectStackFilter = (tag) => {
    onFilterByStack?.(tag);
    setIsOpen(false);
    showToast(`Filtered projects by stack: ${tag}`, "info");
  };

  const items = useMemo(() => {
    const navigation = [
      {
        id: "nav-projects",
        title: "Go to Projects (Featured Shipped Work)",
        category: "Navigation",
        keywords: "projects work portfolio showcase teardown",
        icon: Briefcase,
        action: () => scrollTo("projects"),
      },
      {
        id: "nav-about",
        title: "Go to Experience (Career Ledger & CLI)",
        category: "Navigation",
        keywords: "about overview metrics terminal console bio experience career",
        icon: User,
        action: () => scrollTo("about"),
      },
      {
        id: "nav-services",
        title: "Go to Capabilities (Architecture & Stack Matrix)",
        category: "Navigation",
        keywords: "expertise capabilities services skills architecture backend frontend",
        icon: Layers,
        action: () => scrollTo("services"),
      },
      {
        id: "nav-contact",
        title: "Go to Contact",
        category: "Navigation",
        keywords: "contact email hire form message",
        icon: Mail,
        action: () => scrollTo("contact"),
      },
    ];

    const actions = [
      {
        id: "act-copy-email",
        title: "Copy Email: niloykumarmohonta@gmail.com",
        category: "Actions",
        keywords: "copy email address contact gmail",
        icon: Copy,
        action: copyEmail,
      },
      {
        id: "act-resume",
        title: "Download Resume (PDF)",
        category: "Actions",
        keywords: "resume cv pdf download",
        icon: Download,
        action: () => {
          window.open("/niloy.pdf", "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "act-github",
        title: `Open GitHub Profile (@${GITHUB_USERNAME})`,
        category: "Actions",
        keywords: `github ${GITHUB_USERNAME} repos code`,
        icon: Github,
        action: () => {
          window.open(GITHUB_PROFILE_URL, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "act-linkedin",
        title: "Open LinkedIn Profile",
        category: "Actions",
        keywords: "linkedin social connect",
        icon: Linkedin,
        action: () => {
          window.open(
            "https://www.linkedin.com/in/niloykumarmohonta000/",
            "_blank"
          );
          setIsOpen(false);
        },
      },
      {
        id: "act-toggle-theme",
        title: `Switch to ${isDarkMode ? "Light" : "Dark"} Mode`,
        category: "Actions",
        keywords: "theme dark light mode toggle",
        icon: isDarkMode ? Sun : Moon,
        action: toggleTheme,
      },
    ];

    const stackTagItems = STACK_FILTER_TAGS.map((tag) => ({
      id: `stack-${tag.toLowerCase()}`,
      title: `Filter Projects by Stack: ${tag}`,
      category: "Stack Filter",
      keywords: `filter tag stack ${tag.toLowerCase()}`,
      icon: Tag,
      action: () => handleSelectStackFilter(tag),
    }));

    const projectItems = workData
      .filter(
        (project) =>
          project.id !== "tithyniloy" &&
          project.slug !== "tithyniloy" &&
          !(project.url && project.url.includes("tithyniloy"))
      )
      .map((project, idx) => {
        const stackStr = (project.techStack || []).slice(0, 4).join(" • ");
        const liveUrl = project.liveUrl || project.url;
        return {
          id: `proj-${project.id || idx}`,
          title: `${project.title} — ${stackStr}`,
          category: "Projects",
          keywords: `${project.title} ${project.category || ""} ${stackStr} ${
            project.description || ""
          }`.toLowerCase(),
          icon: ExternalLink,
          action: () => {
            if (liveUrl) window.open(liveUrl, "_blank");
            else scrollTo("projects");
            setIsOpen(false);
          },
        };
      });

    const all = [
      ...navigation,
      ...actions,
      ...stackTagItems,
      ...projectItems,
    ];

    if (!query.trim()) return all;

    const lowerQuery = query.toLowerCase().trim();
    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery) ||
        (item.keywords && item.keywords.includes(lowerQuery))
    );
  }, [query, isDarkMode, workData]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (items.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "Enter" && items[selectedIndex]) {
      e.preventDefault();
      items[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dialog Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={MODAL_TRANSITION}
            className="relative w-full max-w-xl bg-white dark:bg-[#09090b] rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden text-zinc-900 dark:text-zinc-100"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
              <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
              <label htmlFor="command-palette-input" className="sr-only">
                Search sections, projects by stack tag, or actions
              </label>
              <input
                id="command-palette-input"
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Jump to section, filter by stack (Next.js, NestJS), or copy email..."
                className="w-full bg-transparent text-xs sm:text-sm text-zinc-950 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close command palette"
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                ESC
              </button>
            </div>

            {/* Quick Stack Tag Filter Bar */}
            <div className="px-4 py-2 bg-zinc-50 dark:bg-[#111114] border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-semibold mr-1">
                Stack:
              </span>
              {STACK_FILTER_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleSelectStackFilter(tag)}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-white dark:bg-[#09090b] hover:bg-zinc-950 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors duration-150"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="max-h-72 overflow-y-auto p-2 space-y-1"
            >
              {items.length === 0 ? (
                <div className="py-10 text-center text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  No matching commands or projects found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                items.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left text-xs sm:text-sm transition-colors duration-150 ${
                        isSelected
                          ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-medium"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <Icon
                          className={`w-3.5 h-3.5 flex-shrink-0 ${
                            isSelected
                              ? "text-emerald-400 dark:text-emerald-600"
                              : "text-zinc-500 dark:text-zinc-400"
                          }`}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 text-xs">
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                            isSelected
                              ? "bg-white/15 dark:bg-black/15 text-white dark:text-zinc-950"
                              : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                          }`}
                        >
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Tip */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-[#111114] border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <span>Navigate</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded text-xs">
                  ↑↓
                </kbd>
                <span>Select</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded text-xs">
                  ↵
                </kbd>
              </div>
              <div className="flex items-center gap-1.5">
                <Command className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Command Palette (⌘K)</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
