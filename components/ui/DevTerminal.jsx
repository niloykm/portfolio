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
    } else if (
      normalized === "sudo hire --now" ||
      normalized === "sudo hire" ||
      normalized === "hire"
    ) {
      commandType = "hire";
      showToast("Priority engineering channel unlocked. Let's connect.", "success");
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
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                READY
              </span>
              <span className="text-zinc-100 font-semibold">
                niloy-workstation-cli v3.0.0 — Full-Stack Engineering Shell
              </span>
            </div>
            <p className="text-zinc-400 text-xs">
              Type <span className="text-emerald-400 font-semibold">help</span> or use{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-200 border border-neutral-800 text-[10px]">
                ↑
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-200 border border-neutral-800 text-[10px]">
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
              [SYS::HELP] Available Console Commands:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-1.5 gap-x-3 pl-3 border-l border-neutral-700">
              <span className="sm:col-span-4 text-emerald-400 font-semibold">help</span>
              <span className="sm:col-span-8 text-zinc-300">
                Lists all interactive CLI commands
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">skills</span>
              <span className="sm:col-span-8 text-zinc-300">
                Prints categorized technical stack &amp; production competencies
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">projects</span>
              <span className="sm:col-span-8 text-zinc-300">
                Lists featured engineering systems with live &amp; GitHub links
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">cat resume</span>
              <span className="sm:col-span-8 text-zinc-300">
                Outputs chronological experience ledger &amp; PDF download
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">contact</span>
              <span className="sm:col-span-8 text-zinc-300">
                Prints direct email (niloykumarmohonta@gmail.com) &amp; GitHub
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">
                niloy --version
              </span>
              <span className="sm:col-span-8 text-zinc-300">
                Displays runtime build and engineer specification
              </span>

              <span className="sm:col-span-4 text-emerald-400 font-semibold">
                sudo hire --now
              </span>
              <span className="sm:col-span-8 text-zinc-300">
                Initializes priority engineering recruitment channel
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
              [STACK::MATRIX] Categorized Engineering Stack:
            </div>
            <div className="space-y-1.5">
              <div>
                <span className="text-zinc-100 font-semibold">┌─ Languages &amp; Core: </span>
                <span className="text-zinc-300">
                  TypeScript, JavaScript (ES2024), C++, SQL, HTML5/CSS3
                </span>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">├─ Frontend Systems: </span>
                <span className="text-zinc-300">
                  Next.js (App Router / SSR), React.js, Tailwind CSS, Framer Motion, Zustand
                </span>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">├─ Backend &amp; APIs:   </span>
                <span className="text-zinc-300">
                  Node.js, NestJS, Express.js, RESTful APIs, JWT / OAuth 2.0 RBAC
                </span>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">├─ Databases &amp; ORM:  </span>
                <span className="text-zinc-300">
                  PostgreSQL, MongoDB (Mongoose / Aggregation Pipelines), Prisma, TypeORM
                </span>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">└─ DevOps &amp; Tooling: </span>
                <span className="text-zinc-300">
                  Docker, Git &amp; GitHub Actions, Playwright E2E, Vercel CI/CD, Linux
                </span>
              </div>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-2.5 text-xs sm:text-sm break-words pl-3 border-l border-emerald-500/50">
            <div className="text-emerald-400 font-bold">
              [FEATURED::PROJECTS] Production Applications:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-md bg-zinc-900 border border-neutral-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">1. HandsOn — Event Platform</span>
                  <span className="text-[11px] text-emerald-400">[Next.js • Node • MongoDB]</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1.5 text-xs">
                  <a
                    href="https://handsoncom.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>handsoncom.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/niloydiu/roBenDevHandsOn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white hover:underline"
                  >
                    <span>github.com/niloydiu/roBenDevHandsOn</span>
                  </a>
                </div>
              </div>

              <div className="p-2.5 rounded-md bg-zinc-900 border border-neutral-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">2. NewCare — Healthcare Portal</span>
                  <span className="text-[11px] text-emerald-400">[Next.js • NestJS • PostgreSQL]</span>
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
                    href="https://github.com/niloydiu/newcare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white hover:underline"
                  >
                    <span>github.com/niloydiu/newcare</span>
                  </a>
                </div>
              </div>

              <div className="p-2.5 rounded-md bg-zinc-900 border border-neutral-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">3. Ndemy — LMS Platform</span>
                  <span className="text-[11px] text-emerald-400">[React • Express • MongoDB]</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1.5 text-xs">
                  <a
                    href="https://ndemy-frontend.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>ndemy-frontend.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/niloydiu/edemy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white hover:underline"
                  >
                    <span>github.com/niloydiu/edemy</span>
                  </a>
                </div>
              </div>

              <div className="p-2.5 rounded-md bg-zinc-900 border border-neutral-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-white font-bold">4. Nobot — Streaming AI</span>
                  <span className="text-[11px] text-emerald-400">[Next.js • TypeScript • AST]</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1.5 text-xs">
                  <a
                    href="https://nobot.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>nobot.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/niloydiu/Nobot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white hover:underline"
                  >
                    <span>github.com/niloydiu/Nobot</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case "cat resume":
        return (
          <div className="space-y-2.5 text-xs sm:text-sm break-words pl-3 border-l border-neutral-700">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-zinc-100 font-bold">
                === NILOY KUMAR MOHONTA — CURRICULUM VITAE ===
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold tabular-nums">
                3+ Yrs Exp • 50+ GitHub Repos
              </span>
            </div>

            <div className="space-y-1.5 text-zinc-200">
              <div>
                <span className="text-emerald-400 font-semibold">
                  • Co-Founder &amp; Technical Lead @ Gen Stella IT
                </span>{" "}
                <span className="text-zinc-400 tabular-nums">(2026 – Present)</span>
                <p className="text-zinc-300 text-xs pl-3">
                  Directing Next.js &amp; NestJS/PostgreSQL SaaS architecture and n8n webhook automation (-40% manual triage).
                </p>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">
                  • Full-Stack Software Engineer @ ScholarPASS
                </span>{" "}
                <span className="text-zinc-400 tabular-nums">(2025 – Present)</span>
                <p className="text-zinc-300 text-xs pl-3">
                  Engineered multi-tenant LMS portals, OAuth/JWT RBAC, and MongoDB aggregation pipelines (-30% query latency).
                </p>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">
                  • Frontend Engineer @ TripBooking.ai &amp; TutorsPlan
                </span>{" "}
                <span className="text-zinc-400 tabular-nums">(2025 – 2026)</span>
                <p className="text-zinc-300 text-xs pl-3">
                  Optimized Core Web Vitals (LCP 3.2s → 1.5s) and built real-time search &amp; analytics dashboards.
                </p>
              </div>
              <div>
                <span className="text-zinc-100 font-semibold">
                  • Education: B.Sc. in Computer Science &amp; Engineering (CSE)
                </span>
                <p className="text-zinc-300 text-xs pl-3">
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
              [CONTACT::CHANNELS] Direct Engineering Reach:
            </div>
            <div className="space-y-1 text-zinc-200">
              <div>
                <span className="text-zinc-400">• Email:    </span>
                <a
                  href="mailto:niloykumarmohonta@gmail.com"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  niloykumarmohonta@gmail.com
                </a>
              </div>
              <div>
                <span className="text-zinc-400">• GitHub:   </span>
                <a
                  href="https://github.com/niloydiu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-100 hover:underline font-semibold"
                >
                  github.com/niloydiu (@niloydiu)
                </a>
              </div>
              <div>
                <span className="text-zinc-400">• LinkedIn: </span>
                <a
                  href="https://www.linkedin.com/in/niloykumarmohonta000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:underline"
                >
                  linkedin.com/in/niloykumarmohonta000
                </a>
              </div>
              <div>
                <span className="text-zinc-400">• Status:   </span>
                <span className="text-emerald-400">
                  Available for select engineering roles &amp; remote contracts
                </span>
              </div>
            </div>
          </div>
        );

      case "version":
        return (
          <div className="text-xs sm:text-sm text-zinc-200 pl-3 border-l border-emerald-500/50 break-words">
            <span className="text-emerald-400 font-bold">niloy-cli v3.0.0</span>{" "}
            — Full-Stack Software Engineer &amp; Co-Founder @ Gen Stella IT (TypeScript • Next.js • NestJS • PostgreSQL • MongoDB • Docker)
          </div>
        );

      case "hire":
        return (
          <div className="space-y-1.5 text-xs sm:text-sm pl-3 border-l border-emerald-400 break-words">
            <div className="text-emerald-400 font-bold">
              [ACCESS GRANTED] Priority Hiring Pipeline Initialized
            </div>
            <p className="text-zinc-200">
              Ready to architect resilient full-stack systems. Reach out directly at{" "}
              <a
                href="mailto:niloykumarmohonta@gmail.com"
                className="text-emerald-400 underline font-semibold"
              >
                niloykumarmohonta@gmail.com
              </a>{" "}
              or download{" "}
              <a
                href="/niloy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-100 underline font-semibold"
              >
                Resume PDF
              </a>
              .
            </p>
          </div>
        );

      case "about":
        return (
          <div className="text-xs sm:text-sm text-zinc-200 pl-3 border-l border-neutral-700 break-words">
            Niloy Kumar Mohonta — Full-Stack Software Engineer &amp; Co-Founder at Gen Stella IT (Dhaka, BD • UTC+6).
            Engineered full-stack SaaS platforms, custom LMS RBAC auth engines, and cloud infrastructures handling high-concurrency workloads.
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
    <div className="w-full max-w-full rounded-lg overflow-hidden bg-[#09090b] border border-neutral-800 font-mono text-xs sm:text-sm text-zinc-200">
      {/* Terminal Titlebar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-zinc-900/90 border-b border-neutral-800">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 flex-shrink-0" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="ml-1.5 text-[11px] text-zinc-300 font-semibold flex items-center gap-1.5 truncate">
            <Terminal className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">niloy@workstation: ~ (zsh)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => executeCommand("clear")}
            aria-label="Clear terminal history"
            className="flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white transition-colors duration-150 bg-zinc-950 hover:bg-zinc-800 px-2 py-1 rounded border border-neutral-800 active:scale-[0.98]"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy developer email address niloykumarmohonta@gmail.com"
            className="flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white transition-colors duration-150 bg-zinc-950 hover:bg-zinc-800 px-2.5 py-1 rounded border border-neutral-800 active:scale-[0.98]"
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

      {/* Quick Action Pills */}
      <div className="flex flex-wrap items-center gap-1.5 px-3.5 py-2 bg-zinc-900/40 border-b border-neutral-800">
        <span className="text-[11px] text-zinc-400 font-semibold mr-1">
          EXEC:
        </span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            aria-label={`Run terminal command ${cmd}`}
            className="px-2 py-0.5 min-h-[26px] text-[11px] bg-zinc-900 hover:bg-zinc-100 text-zinc-300 hover:text-zinc-950 rounded border border-neutral-800 transition-colors duration-150 ease-out active:scale-[0.98]"
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
        className="p-4 sm:p-5 h-64 sm:h-72 overflow-y-auto overflow-x-hidden space-y-3 bg-[#09090b] leading-relaxed cursor-text break-words"
        onClick={() => inputRef.current?.focus()}
      >
        {history.length === 0 && (
          <div className="text-xs text-zinc-500">
            Buffer cleared. Type &apos;help&apos; or select a command above.
          </div>
        )}

        {history.map((item, index) => (
          <div key={index} className="break-words">
            {item.type === "input" ? (
              <div className="flex items-start gap-2 text-zinc-100 break-all">
                <span className="text-emerald-400 font-bold select-none">❯</span>
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
        className="flex items-center gap-2 px-3.5 py-2.5 bg-zinc-900/70 border-t border-neutral-800"
      >
        <label htmlFor="terminal-command-input" className="sr-only">
          Terminal Command Input
        </label>
        <span
          className="text-emerald-400 font-bold text-sm select-none"
          aria-hidden="true"
        >
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
          className="flex-1 min-w-0 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none text-xs sm:text-sm font-mono"
        />
        <button
          type="submit"
          aria-label="Execute terminal command"
          className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center text-zinc-200 hover:text-zinc-950 bg-zinc-800 hover:bg-zinc-100 rounded transition-colors duration-150 flex-shrink-0 active:scale-[0.98]"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

export default DevTerminal;
