"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Terminal,
  Copy,
  Check,
  CornerDownLeft,
  Download,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from "@/lib/github";
import { MICRO_TRANSITION, ICON_SWAP_TRANSITION } from "@/lib/motion";

const QUICK_COMMANDS = [
  "help",
  "skills",
  "projects",
  "cat resume",
  "contact",
  "clear",
];

const DevTerminal = ({ autoFocusOnMount = false }) => {
  const [history, setHistory] = useState([
    {
      type: "output",
      command: "banner",
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([
    "skills",
    "projects",
    "cat resume",
    "contact",
  ]);
  const [historyCursor, setHistoryCursor] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const consoleBodyRef = useRef(null);
  const inputRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (autoFocusOnMount && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [autoFocusOnMount]);

  useEffect(() => {
    if (consoleBodyRef.current) {
      consoleBodyRef.current.scrollTop = consoleBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    const normalized = trimmed.toLowerCase().replace(/\s+/g, " ");
    if (!normalized) return;

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryCursor(-1);

    if (normalized === "clear" || normalized === "cls") {
      setHistory([]);
      return;
    }

    let commandType = "unknown";
    if (normalized === "help" || normalized === "--help" || normalized === "-h") {
      commandType = "help";
    } else if (normalized === "skills" || normalized === "stack") {
      commandType = "skills";
    } else if (
      normalized === "projects" ||
      normalized === "ls projects" ||
      normalized === "work"
    ) {
      commandType = "projects";
    } else if (
      normalized === "cat resume" ||
      normalized === "cat resume.pdf" ||
      normalized === "cat resume.txt" ||
      normalized === "resume"
    ) {
      commandType = "cat resume";
    } else if (normalized === "contact" || normalized === "email") {
      commandType = "contact";
    } else if (
      normalized === "niloy --version" ||
      normalized === "--version" ||
      normalized === "-v" ||
      normalized === "version"
    ) {
      commandType = "version";
    } else if (normalized === "whoami" || normalized === "about") {
      commandType = "about";
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", text: trimmed },
      { type: "output", command: commandType, raw: trimmed },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextCursor =
        historyCursor === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyCursor - 1);
      setHistoryCursor(nextCursor);
      setInput(cmdHistory[nextCursor] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyCursor === -1) return;
      if (historyCursor >= cmdHistory.length - 1) {
        setHistoryCursor(-1);
        setInput("");
      } else {
        const nextCursor = historyCursor + 1;
        setHistoryCursor(nextCursor);
        setInput(cmdHistory[nextCursor] || "");
      }
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
    setCopied(true);
    showToast("Copied email: niloykumarmohonta@gmail.com", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCommandOutput = (item) => {
    switch (item.command) {
      case "banner":
        return (
          <div className="space-y-1.5 text-zinc-200 break-words">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                READY
              </span>
              <span className="text-zinc-100 font-semibold">
                niloy-cli — Full-Stack Engineering Workstation
              </span>
            </div>
            <p className="text-zinc-400 text-xs">
              Type <span className="text-emerald-400 font-semibold">help</span> or use{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-200 border border-zinc-800 text-xs">
                ↑
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-200 border border-zinc-800 text-xs">
                ↓
              </kbd>{" "}
              keys to cycle command history.
            </p>
          </div>
        );

      case "help":
        return (
          <div className="space-y-1.5 text-xs sm:text-sm break-words">
            <div className="text-zinc-100 font-bold mb-1">
              Available Console Commands:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-1.5 gap-x-3 pl-3 border-l border-zinc-700">
              <span className="sm:col-span-4 text-emerald-400 font-semibold">help</span>
              <span className="sm:col-span-8 text-zinc-300">
                Lists all interactive CLI commands
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">skills</span>
              <span className="sm:col-span-8 text-zinc-300">
                Prints categorized technical stack and production competencies
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">projects</span>
              <span className="sm:col-span-8 text-zinc-300">
                Lists featured shipped systems with verified live and GitHub links
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">cat resume</span>
              <span className="sm:col-span-8 text-zinc-300">
                Outputs chronological experience ledger and PDF download
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">contact</span>
              <span className="sm:col-span-8 text-zinc-300">
                Prints direct email (niloykumarmohonta@gmail.com), GitHub, and LinkedIn
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">clear</span>
              <span className="sm:col-span-8 text-zinc-300">
                Clears terminal buffer
              </span>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-2 text-xs sm:text-sm break-words pl-3 border-l border-emerald-500/50">
            <div className="text-emerald-400 font-bold">
              Categorized Production Stack:
            </div>
            <div className="space-y-1.5">
              <div>
                <span className="text-zinc-100 font-semibold">Languages: </span>
                <span className="text-zinc-300">
                  TypeScript, JavaScript (ES2024), C++, SQL, HTML5/CSS3
                </span>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">Frontend: </span>
                <span className="text-zinc-300">
                  Next.js (App Router / SSR), React 19, Tailwind CSS, Zustand, Redux Toolkit
                </span>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">Backend: </span>
                <span className="text-zinc-300">
                  Node.js, NestJS, Express.js, REST APIs, JWT / OAuth 2.0 RBAC, WebSockets
                </span>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">Databases: </span>
                <span className="text-zinc-300">
                  PostgreSQL, MongoDB (Aggregation Pipelines), Prisma, TypeORM, Mongoose
                </span>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">DevOps &amp; QA: </span>
                <span className="text-zinc-300">
                  Docker, GitHub Actions, Playwright E2E, Vercel, Linux / Bash
                </span>
              </div>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-2.5 text-xs sm:text-sm break-words pl-3 border-l border-emerald-500/50">
            <div className="text-emerald-400 font-bold">
              Featured Production &amp; Full-Stack Systems:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-md bg-zinc-900 border border-zinc-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">1. ScholarPASS</span>
                  <span className="text-xs text-emerald-400">Next.js • Node • MongoDB</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1.5 text-xs">
                  <a
                    href="https://www.scholarpass.com/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>scholarpass.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-zinc-400">Private Client Repo</span>
                </div>
              </div>

              <div className="p-2.5 rounded-md bg-zinc-900 border border-zinc-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">2. TripBooking.ai</span>
                  <span className="text-xs text-emerald-400">Next.js • TypeScript • REST</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1.5 text-xs">
                  <a
                    href="https://www.tripbooking.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>tripbooking.ai</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-zinc-400">LCP 3.2s → 1.5s</span>
                </div>
              </div>

              <div className="p-2.5 rounded-md bg-zinc-900 border border-zinc-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">3. NewCare</span>
                  <span className="text-xs text-emerald-400">Next.js • NestJS • PostgreSQL</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1.5 text-xs">
                  <a
                    href="https://newcare.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>newcare.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/niloykm/newcare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white hover:underline"
                  >
                    <span>github.com/niloykm/newcare</span>
                  </a>
                </div>
              </div>

              <div className="p-2.5 rounded-md bg-zinc-900 border border-zinc-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">4. Niloy Inventory</span>
                  <span className="text-xs text-emerald-400">Next.js 15 • Express • MongoDB</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1.5 text-xs">
                  <a
                    href="https://niloyinventory.vercel.app/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>niloyinventory.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/niloykm/inventory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white hover:underline"
                  >
                    <span>github.com/niloykm/inventory</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case "cat resume":
        return (
          <div className="space-y-2.5 text-xs sm:text-sm break-words pl-3 border-l border-zinc-700">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-zinc-100 font-bold">
                NILOY KUMAR MOHONTA — CURRICULUM VITAE
              </span>
              <span className="text-xs text-emerald-400 font-semibold tabular-nums">
                Full-Stack Software Engineer • 3+ Yrs Exp
              </span>
            </div>

            <div className="space-y-2 text-zinc-200">
              <div>
                <span className="text-emerald-400 font-semibold">
                  • Full-Stack Software Engineer @ ScholarPASS
                </span>{" "}
                <span className="text-zinc-400 tabular-nums">(2025 – Present)</span>
                <p className="text-zinc-300 text-xs pl-3">
                  Multi-tenant LMS portals, OAuth/JWT RBAC guards, and compound-indexed MongoDB pipelines (-30% query latency).
                </p>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">
                  • Frontend Engineer @ TripBooking.ai
                </span>{" "}
                <span className="text-zinc-400 tabular-nums">(2025 – 2026)</span>
                <p className="text-zinc-300 text-xs pl-3">
                  Multi-vertical travel search and Core Web Vitals optimization (LCP 3.2s → 1.5s).
                </p>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">
                  • Frontend Engineer @ TutorsPlan
                </span>{" "}
                <span className="text-zinc-400 tabular-nums">(2025)</span>
                <p className="text-zinc-300 text-xs pl-3">
                  Interactive tutor scheduling matrices and WCAG AA compliant analytics dashboards.
                </p>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">
                  • B.Sc. in Computer Science &amp; Engineering (CSE)
                </span>
                <p className="text-zinc-300 text-xs pl-3">
                  Daffodil International University (2022 – 2026) — 200+ C++ algorithmic problems solved.
                </p>
              </div>
            </div>

            <div className="pt-1">
              <a
                href="/niloy.pdf"
                download="Niloy_Kumar_Mohonta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors duration-150"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full Resume (PDF)</span>
              </a>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-1.5 text-xs sm:text-sm break-words pl-3 border-l border-emerald-500/50">
            <div className="text-emerald-400 font-bold">
              Direct Contact Channels:
            </div>
            <div className="space-y-1 text-zinc-200">
              <div>
                <span className="text-zinc-400">Email:    </span>
                <a
                  href="mailto:niloykumarmohonta@gmail.com"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  niloykumarmohonta@gmail.com
                </a>
              </div>
              <div>
                <span className="text-zinc-400">GitHub:   </span>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-100 hover:underline font-semibold"
                >
                  github.com/{GITHUB_USERNAME} (@{GITHUB_USERNAME})
                </a>
              </div>
              <div>
                <span className="text-zinc-400">LinkedIn: </span>
                <a
                  href="https://www.linkedin.com/in/niloykumarmohonta000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:underline"
                >
                  linkedin.com/in/niloykumarmohonta000
                </a>
              </div>
            </div>
          </div>
        );

      case "version":
        return (
          <div className="text-xs sm:text-sm text-zinc-200 pl-3 border-l border-emerald-500/50 break-words">
            <span className="text-emerald-400 font-bold">niloy-cli</span> — Full-Stack Software Engineer (TypeScript • Next.js • NestJS • PostgreSQL • MongoDB • Docker)
          </div>
        );

      case "about":
        return (
          <div className="text-xs sm:text-sm text-zinc-200 pl-3 border-l border-zinc-700 break-words">
            Niloy Kumar Mohonta — Full-Stack Software Engineer at ScholarPASS (Dhaka, BD • UTC+6). Building production Next.js, TypeScript, Node.js/NestJS, PostgreSQL, and MongoDB systems.
          </div>
        );

      default:
        return (
          <div className="text-xs sm:text-sm text-rose-400 pl-3 border-l border-rose-500/50 break-words">
            zsh: command not found: <span className="font-semibold">{item.raw}</span>. Type{" "}
            <button
              type="button"
              onClick={() => executeCommand("help")}
              className="text-emerald-400 underline font-semibold"
            >
              help
            </button>{" "}
            for available commands.
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-full rounded-lg overflow-hidden bg-[#09090b] border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-200">
      {/* Terminal Titlebar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 flex-shrink-0" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="ml-1.5 text-xs text-zinc-200 font-semibold flex items-center gap-1.5 truncate">
            <Terminal className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">niloy@workstation: ~</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => executeCommand("clear")}
            aria-label="Clear terminal history"
            className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white interactive-btn bg-zinc-950 hover:bg-zinc-800 px-2.5 py-1 rounded border border-zinc-800"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy developer email address niloykumarmohonta@gmail.com"
            className={`flex items-center gap-1 text-xs interactive-btn px-2.5 py-1 rounded border ${
              copied
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                : "text-zinc-300 hover:text-white bg-zinc-950 hover:bg-zinc-800 border-zinc-800"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={ICON_SWAP_TRANSITION}
                  className="inline-flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Copied</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={ICON_SWAP_TRANSITION}
                  className="inline-flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Email</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Quick Action Pills */}
      <div className="flex flex-wrap items-center gap-1.5 px-3.5 py-2 bg-zinc-900/50 border-b border-zinc-800">
        <span className="text-xs text-zinc-400 font-semibold mr-1">RUN:</span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            aria-label={`Run terminal command ${cmd}`}
            className="px-2.5 py-1 min-h-[28px] text-xs bg-zinc-900 hover:bg-zinc-100 text-zinc-200 hover:text-zinc-950 rounded border border-zinc-800 interactive-btn"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Output Console Window */}
      <div
        ref={consoleBodyRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output log"
        className="p-4 sm:p-5 h-60 sm:h-64 overflow-y-auto overflow-x-hidden space-y-3 bg-[#09090b] leading-relaxed cursor-text break-words"
        onClick={() => inputRef.current?.focus()}
      >
        {history.length === 0 && (
          <div className="text-xs text-zinc-400">
            Buffer cleared. Type &apos;help&apos; or select a command above.
          </div>
        )}

        {history.map((item, index) => (
          <motion.div
            key={`${index}-${item.type}-${item.command || item.text || ""}`}
            initial={index === 0 ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={MICRO_TRANSITION}
            className="break-words"
          >
            {item.type === "input" ? (
              <div className="flex items-start gap-2 text-zinc-100 break-all">
                <span className="text-emerald-400 font-bold select-none">❯</span>
                <span className="font-semibold">{item.text}</span>
              </div>
            ) : (
              renderCommandOutput(item)
            )}
          </motion.div>
        ))}
      </div>

      {/* Interactive Command Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-zinc-900/80 border-t border-zinc-800 transition-shadow duration-[220ms] focus-within:ring-2 focus-within:ring-emerald-500/70 focus-within:ring-inset"
      >
        <label htmlFor="terminal-command-input" className="sr-only">
          Terminal Command Input
        </label>
        <span
          className="text-emerald-400 font-bold text-sm select-none inline-flex items-center gap-1"
          aria-hidden="true"
        >
          <span>❯</span>
          {isInputFocused && !input && (
            <span className="terminal-caret inline-block w-1.5 h-3.5 bg-emerald-400 rounded-[1px]" />
          )}
        </span>
        <input
          id="terminal-command-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          autoComplete="off"
          spellCheck="false"
          placeholder="Type 'help', 'skills', 'projects', 'cat resume', 'contact'..."
          className="flex-1 min-w-0 bg-transparent text-zinc-100 placeholder-zinc-400 focus:outline-none text-xs sm:text-sm font-mono caret-emerald-400"
        />
        <button
          type="submit"
          aria-label="Execute terminal command"
          className="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center text-zinc-200 hover:text-zinc-950 bg-zinc-800 hover:bg-zinc-100 rounded interactive-btn flex-shrink-0"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

export default DevTerminal;
