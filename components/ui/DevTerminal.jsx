"use client";

import React, { useState, useRef, useEffect } from "react";
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

const QUICK_COMMANDS = [
  "help",
  "skills",
  "projects",
  "cat resume",
  "contact",
  "niloy --version",
  "sudo hire --now",
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
    "niloy --version",
    "skills",
    "projects",
    "cat resume",
    "contact",
  ]);
  const [historyCursor, setHistoryCursor] = useState(-1);
  const [copied, setCopied] = useState(false);

  const consoleBodyRef = useRef(null);
  const inputRef = useRef(null);
  const { showToast } = useToast();

  // Auto-focus without scrolling the page away from current viewport
  useEffect(() => {
    if (autoFocusOnMount && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [autoFocusOnMount]);

  // Keep terminal scrolled to latest output inside its own container
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
    } else if (normalized === "projects" || normalized === "ls projects" || normalized === "work") {
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
    } else if (normalized === "sudo hire --now" || normalized === "sudo hire" || normalized === "hire") {
      commandType = "hire";
      showToast("🚀 Priority engineering pipeline unlocked! Let's connect.", "success");
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
          <div className="space-y-1.5 text-slate-200 break-words">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                ONLINE
              </span>
              <span className="text-cyan-300 font-semibold">
                Niloy&apos;s Interactive Engineering Console v3.0
              </span>
            </div>
            <p className="text-slate-300 text-xs">
              Type <span className="text-amber-300 font-semibold">help</span> or use{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 text-[10px]">
                ↑
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 text-[10px]">
                ↓
              </kbd>{" "}
              arrows to navigate command history.
            </p>
          </div>
        );

      case "help":
        return (
          <div className="space-y-1.5 text-xs sm:text-sm break-words">
            <div className="text-cyan-300 font-bold mb-1">
              [ANSI::HELP] Available Console Commands:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-1.5 gap-x-3 pl-2 border-l-2 border-cyan-500/40">
              <span className="sm:col-span-4 text-emerald-300 font-semibold">help</span>
              <span className="sm:col-span-8 text-slate-300">
                Lists all available interactive commands
              </span>

              <span className="sm:col-span-4 text-emerald-300 font-semibold">skills</span>
              <span className="sm:col-span-8 text-slate-300">
                Prints categorized technical stack &amp; core competencies
              </span>

              <span className="sm:col-span-4 text-emerald-300 font-semibold">projects</span>
              <span className="sm:col-span-8 text-slate-300">
                Lists top featured engineering apps with direct links
              </span>

              <span className="sm:col-span-4 text-emerald-300 font-semibold">cat resume</span>
              <span className="sm:col-span-8 text-slate-300">
                Prints formatted work history, credentials &amp; PDF download
              </span>

              <span className="sm:col-span-4 text-emerald-300 font-semibold">contact</span>
              <span className="sm:col-span-8 text-slate-300">
                Outputs email (niloykumarmohonta@gmail.com) &amp; GitHub (niloydiu)
              </span>

              <span className="sm:col-span-4 text-emerald-300 font-semibold">niloy --version</span>
              <span className="sm:col-span-8 text-slate-300">
                Displays runtime build and engineer metadata
              </span>

              <span className="sm:col-span-4 text-emerald-300 font-semibold">sudo hire --now</span>
              <span className="sm:col-span-8 text-slate-300">
                Initializes priority engineering recruitment channel
              </span>

              <span className="sm:col-span-4 text-emerald-300 font-semibold">clear</span>
              <span className="sm:col-span-8 text-slate-300">
                Clears terminal console history buffer
              </span>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-2 text-xs sm:text-sm break-words pl-2 border-l-2 border-blue-500/50">
            <div className="text-blue-300 font-bold">
              [STACK::MATRIX] Categorized Engineering Stack:
            </div>
            <div className="space-y-1.5">
              <div>
                <span className="text-amber-300 font-semibold">┌─ Languages &amp; Core: </span>
                <span className="text-slate-200">
                  TypeScript, JavaScript (ES2024), C++, SQL, HTML5/CSS3
                </span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">├─ Frontend Systems: </span>
                <span className="text-slate-200">
                  Next.js (App Router / SSR), React.js, Tailwind CSS, Framer Motion, Zustand
                </span>
              </div>
              <div>
                <span className="text-emerald-300 font-semibold">├─ Backend &amp; APIs:   </span>
                <span className="text-slate-200">
                  Node.js, NestJS, Express.js, RESTful APIs, JWT / OAuth 2.0 RBAC
                </span>
              </div>
              <div>
                <span className="text-purple-300 font-semibold">├─ Databases &amp; ORM:  </span>
                <span className="text-slate-200">
                  PostgreSQL, MongoDB (Mongoose / Aggregation Pipelines), Prisma, TypeORM
                </span>
              </div>
              <div>
                <span className="text-pink-300 font-semibold">└─ DevOps &amp; Tooling: </span>
                <span className="text-slate-200">
                  Docker, Git &amp; GitHub Actions, Playwright E2E, Vercel CI/CD, Linux
                </span>
              </div>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-2.5 text-xs sm:text-sm break-words pl-2 border-l-2 border-emerald-500/50">
            <div className="text-emerald-300 font-bold">
              [FEATURED::PROJECTS] Production Applications:
            </div>
            <div className="space-y-2">
              <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">1. HandsOn — Event &amp; Workshop Platform</span>
                  <span className="text-[11px] text-emerald-300">[React • Node.js • MongoDB]</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-xs">
                  <a
                    href="https://handsoncom.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Live: handsoncom.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/niloydiu/roBenDevHandsOn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white hover:underline inline-flex items-center gap-1"
                  >
                    <span>Repo: github.com/niloydiu/roBenDevHandsOn</span>
                  </a>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">2. NewCare — Healthcare Appointment Portal</span>
                  <span className="text-[11px] text-emerald-300">[Next.js • NestJS • PostgreSQL]</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-xs">
                  <a
                    href="https://newcare.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Live: newcare.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/niloydiu/newcare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white hover:underline inline-flex items-center gap-1"
                  >
                    <span>Repo: github.com/niloydiu/newcare</span>
                  </a>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">3. Ndemy — Learning Management System</span>
                  <span className="text-[11px] text-emerald-300">[React • Express • MongoDB]</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-xs">
                  <a
                    href="https://ndemy-frontend.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Live: ndemy-frontend.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/niloydiu/edemy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white hover:underline inline-flex items-center gap-1"
                  >
                    <span>Repo: github.com/niloydiu/edemy</span>
                  </a>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">4. Nobot — Streaming AI Assistant</span>
                  <span className="text-[11px] text-emerald-300">[React • TypeScript • Streaming AI]</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-xs">
                  <a
                    href="https://nobot.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Live: nobot.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/niloydiu/Nobot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white hover:underline inline-flex items-center gap-1"
                  >
                    <span>Repo: github.com/niloydiu/Nobot</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case "cat resume":
        return (
          <div className="space-y-2.5 text-xs sm:text-sm break-words pl-2 border-l-2 border-purple-500/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-purple-300 font-bold">
                === NILOY KUMAR MOHONTA — CURRICULUM VITAE ===
              </span>
              <span className="text-[11px] text-emerald-300 font-semibold">
                3+ Yrs Exp • 50+ GitHub Repos
              </span>
            </div>

            <div className="space-y-1.5 text-slate-200">
              <div>
                <span className="text-amber-300 font-semibold">
                  • Co-Founder &amp; Technical Lead @ Gen Stella IT
                </span>{" "}
                <span className="text-slate-400">(2026 – Present)</span>
                <p className="text-slate-300 text-xs pl-3">
                  Directing Next.js &amp; NestJS/PostgreSQL SaaS architecture and n8n webhook automation (-40% manual triage).
                </p>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">
                  • Full-Stack Software Engineer @ ScholarPASS
                </span>{" "}
                <span className="text-slate-400">(2025 – Present)</span>
                <p className="text-slate-300 text-xs pl-3">
                  Engineered multi-tenant LMS portals, OAuth/JWT RBAC, and MongoDB aggregation pipelines (-30% query latency).
                </p>
              </div>
              <div>
                <span className="text-emerald-300 font-semibold">
                  • Frontend Engineer @ TripBooking.ai &amp; TutorsPlan
                </span>{" "}
                <span className="text-slate-400">(2025 – 2026)</span>
                <p className="text-slate-300 text-xs pl-3">
                  Optimized Core Web Vitals (LCP 3.2s → 1.5s) and built real-time search &amp; analytics dashboards.
                </p>
              </div>
              <div>
                <span className="text-blue-300 font-semibold">
                  • Education: B.Sc. in Computer Science &amp; Engineering
                </span>
                <p className="text-slate-300 text-xs pl-3">
                  Daffodil International University (DIU) — 200+ C++ algorithmic problems solved.
                </p>
              </div>
            </div>

            <div className="pt-1">
              <a
                href="/niloy.pdf"
                download="Niloy_Kumar_Mohonta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full Resume (PDF)</span>
              </a>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-1.5 text-xs sm:text-sm break-words pl-2 border-l-2 border-amber-500/50">
            <div className="text-amber-300 font-bold">
              [CONTACT::CHANNELS] Direct Engineering Reach:
            </div>
            <div className="space-y-1 text-slate-200">
              <div>
                <span className="text-slate-400">• Email:    </span>
                <a
                  href="mailto:niloykumarmohonta@gmail.com"
                  className="text-cyan-300 hover:underline font-semibold"
                >
                  niloykumarmohonta@gmail.com
                </a>
              </div>
              <div>
                <span className="text-slate-400">• GitHub:   </span>
                <a
                  href="https://github.com/niloydiu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:underline font-semibold"
                >
                  github.com/niloydiu (@niloydiu)
                </a>
              </div>
              <div>
                <span className="text-slate-400">• LinkedIn: </span>
                <a
                  href="https://www.linkedin.com/in/niloykumarmohonta000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:underline"
                >
                  linkedin.com/in/niloykumarmohonta000
                </a>
              </div>
              <div>
                <span className="text-slate-400">• Status:   </span>
                <span className="text-emerald-300">
                  Available for Full-Time Roles &amp; Remote Contracts
                </span>
              </div>
            </div>
          </div>
        );

      case "version":
        return (
          <div className="text-xs sm:text-sm text-slate-200 pl-2 border-l-2 border-emerald-500/50 break-words">
            <span className="text-emerald-300 font-bold">niloy-cli v3.0.0</span>{" "}
            — Full-Stack Software Engineer (TypeScript • Next.js • NestJS • Node.js • PostgreSQL • MongoDB • Docker)
          </div>
        );

      case "hire":
        return (
          <div className="space-y-1.5 text-xs sm:text-sm pl-2 border-l-2 border-emerald-400 break-words">
            <div className="text-emerald-300 font-bold">
              ✨ [ACCESS GRANTED] Priority Hiring Pipeline Initialized!
            </div>
            <p className="text-slate-200">
              Ready to architect resilient full-stack systems. Reach out directly at{" "}
              <a
                href="mailto:niloykumarmohonta@gmail.com"
                className="text-cyan-300 underline font-semibold"
              >
                niloykumarmohonta@gmail.com
              </a>{" "}
              or download{" "}
              <a
                href="/niloy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 underline font-semibold"
              >
                Resume PDF
              </a>
              .
            </p>
          </div>
        );

      case "about":
        return (
          <div className="text-xs sm:text-sm text-slate-200 pl-2 border-l-2 border-blue-400 break-words">
            Niloy Kumar Mohonta — Full-Stack Software Engineer based in Dhaka, Bangladesh (GMT+6).
            Architecting resilient web applications, modular NestJS/Node.js backend systems, and pixel-complete React/Next.js interfaces.
          </div>
        );

      default:
        return (
          <div className="text-xs sm:text-sm text-rose-300 pl-2 border-l-2 border-rose-500/50 break-words">
            zsh: command not found: <span className="font-semibold">{item.raw}</span>. Type{" "}
            <button
              type="button"
              onClick={() => executeCommand("help")}
              className="text-cyan-300 underline font-semibold"
            >
              help
            </button>{" "}
            for available commands.
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl font-mono text-xs sm:text-sm text-slate-200">
      {/* Terminal Titlebar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 flex-shrink-0" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-1.5 text-[11px] text-slate-300 font-semibold flex items-center gap-1.5 truncate">
            <Terminal className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span className="truncate">niloy@workstation: ~ (zsh)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => executeCommand("clear")}
            aria-label="Clear terminal history"
            className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-md border border-slate-700"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy developer email address niloykumarmohonta@gmail.com"
            className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md border border-slate-700"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span>{copied ? "Copied" : "Copy Email"}</span>
          </button>
        </div>
      </div>

      {/* Quick Action Pills (Wrapped for mobile touch without horizontal overflow) */}
      <div className="flex flex-wrap items-center gap-1.5 px-3 sm:px-4 py-2.5 bg-slate-900/70 border-b border-slate-800/80">
        <span className="text-[11px] text-slate-300 font-semibold mr-1">
          Quick Run:
        </span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            aria-label={`Run terminal command ${cmd}`}
            className="px-2.5 py-1 min-h-[28px] text-[11px] bg-slate-800/90 hover:bg-blue-600 hover:text-white text-slate-200 rounded-md border border-slate-700/80 transition-colors"
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
        className="p-3.5 sm:p-5 h-72 sm:h-80 overflow-y-auto overflow-x-hidden space-y-3 bg-slate-950/95 leading-relaxed cursor-text break-words"
        onClick={() => inputRef.current?.focus()}
      >
        {history.length === 0 && (
          <div className="text-xs text-slate-400 italic">
            Console buffer cleared. Type &apos;help&apos; or select a Quick Run command above.
          </div>
        )}

        {history.map((item, index) => (
          <div key={index} className="break-words">
            {item.type === "input" ? (
              <div className="flex items-start gap-2 text-emerald-400 break-all">
                <span className="text-blue-400 font-bold select-none">❯</span>
                <span className="font-semibold">{item.text}</span>
              </div>
            ) : (
              renderCommandOutput(item)
            )}
          </div>
        ))}
      </div>

      {/* Interactive Command Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-slate-900/95 border-t border-slate-800"
      >
        <label htmlFor="terminal-command-input" className="sr-only">
          Terminal Command Input
        </label>
        <span className="text-blue-400 font-bold text-sm select-none" aria-hidden="true">
          ❯
        </span>
        <input
          id="terminal-command-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck="false"
          placeholder="Type 'help', 'skills', 'projects', 'cat resume', 'contact'..."
          className="flex-1 min-w-0 bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-xs sm:text-sm font-mono"
        />
        <button
          type="submit"
          aria-label="Execute terminal command"
          className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-200 hover:text-white bg-slate-800 hover:bg-blue-600 rounded-lg transition-colors flex-shrink-0"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

export default DevTerminal;
