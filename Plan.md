# Portfolio Website Architecture & UI/UX Redesign (`Plan.md`)
**Project:** Niloy Kumar Mohonta — Senior Full-Stack & AI Product Engineer Portfolio  
**Live Target:** `niloykm.vercel.app`  
**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons

---

## 1. UI/UX Audit Resolution

1. **Eliminated Redundant Triple-Listing of Projects:** Replaced the top summary index table, giant vertical case-study text walls, and uncollapsed archive table with a clean **2x2 Interactive Bento Grid** + a collapsible **"View More Engineering Archive"** accordion.
2. **Removed Spreadsheet Grid-Jail:** Replaced harsh 1px full-width ledger borders and 0px radii with a clean `max-w-5xl` (1024px) container, generous whitespace, soft `1px` borders (`border-zinc-200/80` in light mode, `border-zinc-800/80` in dark mode), and subtle surface elevation.
3. **Progressive Disclosure via Interactive Case Study Drawer:** Clicking any project card opens a keyboard-accessible **Slide-Over Architecture Drawer** displaying the Problem & Solution, System Architecture Topology (`Client Layer` → `API / AI Layer` → `Database Layer`), Technical Decisions, and Impact Metrics.
4. **Above-the-Fold 5-Second Hook:** Added a live status pill, avatar identity header, high-contrast headline, primary CTAs (`Explore Selected Work`, `Download Resume PDF`, `Copy Email` with toast notification), and a **4-Card Quick Proof Bar** (`30% DB Latency Reduction`, `3.2s → 1.5s LCP`, `4+ Production SaaS Shipped`, `200+ C++ Problems Solved`).
5. **AI & Engineering Impact Bento Grid:** Visually demonstrates the 4-step AI & n8n Webhook Orchestration Pipeline (`-40% manual triage time`), Core Web Vitals & MongoDB latency telemetry, Technical Leadership at Gen Stella IT, and a filterable Core Stack Pill Matrix.
