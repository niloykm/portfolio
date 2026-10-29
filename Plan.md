# Portfolio Redesign Plan — "Spec Sheet"

> **Agent Directive**
> - Read this whole file once, then work tasks **sequentially, one at a time**.
> - After each task: run `pnpm build` (or `npm run build`), fix errors, tick the box `[x]`, update **Overall Progress**.
> - Commit after each phase: `git commit -m "feat(redesign): <phase name>"`. Work on branch `redesign/spec-sheet`.
> - **Resumable:** if you are about to run out of usage/context, write `HANDOFF.md` (current task id, what is done, next 3 commands) and stop.
> - Never invent facts. Unknown content is `TODO(niloy)` in data files and **renders nothing** until filled (see §5).
> - This is a **from-scratch visual rebuild**. Existing UI components are deleted, not restyled (Task 0.2). Do not "improve" the old design.

---

## 📊 Overall Progress
- **Total Tasks:** 36
- **Completed:** 2 / 36
- **Current Status:** Phase 0 complete

---

## 1. Diagnosis (why the current site reads as template-generated)

Evidence from the light/dark full-page screenshots of https://niloykm.vercel.app:

| Problem | Where | Why it hurts |
|---|---|---|
| Every section uses the same recipe: pill eyebrow → centered gradient-ish H2 → centered grey subtitle → card grid | All sections | Zero hierarchy variation; the page has one rhythm, so nothing is the "main thing" |
| Card grids everywhere (stats 3-up, 3 dashboard cards, 4 service tiles, 6+1 project cards, 3+1 repo cards) | Overview, Services, Projects, Open Source | Equal visual weight for everything; the 7th project is orphaned |
| Self-rated skill bars, "100% Commitment to Craft", `36+ GitHub Repos`, `2+ Yrs` stat tiles | Overview | Unfalsifiable claims; the classic template stat row |
| Fake terminal (`v2.4.0`, `sudo hire --now`) shown twice (card + expanded console) | Overview | Gimmick, takes ~25% of a screen, says nothing about real work |
| Project cards: identical screenshot crops with a dark overlay, title over image, "Deep Dive" badge that goes nowhere | Featured Projects | No problem/solution/trade-off, no architecture, no outcomes: cards show **what it looks like, not how it was built** |
| "Open Source Work" repeats 4 featured projects, all dated "Jan 2024" | Open Source | Reads as filler / fabricated |
| Three near-identical blue pill CTAs ("Let's talk", "Let's build something amazing") | Mid-page | CTA noise |
| One blue accent plus teal plus purple tints, soft shadows, rounded-2xl everywhere | Global | No palette discipline; "SaaS landing page" look |
| Small grey body text on pale blue/near-black navy; faint borders | Both modes | Low contrast; dark mode uses navy `#020617`, not a deliberate neutral |
| "Engineered for Impact" heading is clipped/overlapped at the top of the next section | Overview | Layout bug visible in both screenshots |
| Buzzword copy ("high-velocity", "Zero Shortcuts • High Standards") | Hero/About | Could belong to anyone |
| Nothing is personal: no place, no timeline, no writing, no process, no opinions | Whole page | A stranger cannot tell what this engineer is *like* to work with |

**Diagnosis in one line:** the site shows *decoration* where it should show *evidence*.

---

## 2. Direction: "Spec Sheet" (technical-editorial, Swiss-influenced)

**References (patterns, not copies):** Linear / Vercel-Geist (tight type, hairlines, mono metadata, restraint); Brittany Chiang-style sticky left rail + scrolling right content; Rauno Freiberg / Emil Kowalski (interaction craft, small precise details); Swiss/International typography (grid, numerals, strong left alignment); engineering changelogs/RFC documents (numbered sections, tables, trade-off records).

**Concept:** the portfolio is an **engineering document** about one engineer. Numbered sections, hairline rules, a mono metadata layer, one signal color, and a serif display face for human warmth. Information density is high but ordered; whitespace is generous *between* sections and tight *inside* them.

**Signature elements (identity):**
1. Left **index rail** on desktop: `01 — Work` in mono, sticky per section (collapses to an inline label on mobile).
2. **Status ledger** in the hero: key/value rows (`Based`, `Local time`, `Now`, `Open to`, `Last deploy`, `Last push`) — all real, all live.
3. **Case files** instead of project cards: problem → approach → trade-offs → impact, with a small architecture diagram per project.
4. **Systems map** instead of skill bars: stack as layers, cross-highlighting the projects that use each tool.
5. **⌘K palette** that is actually the primary power-user navigation.
6. Footer **colophon** with the deployed commit SHA (also proves deploys are live).

---

## 3. Design System

### 3.1 Color tokens (CSS variables; no pure `#fff`/`#000`; no gradients, no glows, no glass)

```css
:root {
  --bg:            #F4F3EF; /* warm paper */
  --bg-sunken:     #ECEAE3;
  --surface:       #FBFAF7;
  --surface-raised:#FDFCF9;
  --ink:           #14130F; /* 16:1 on --bg */
  --ink-2:         #3B3933; /* secondary text */
  --muted:         #5E5C55; /* ~6:1 on --bg, min for body-secondary */
  --faint:         #9B988D; /* decorative only (rules, disabled), never for text */
  --border:        #DEDCD4;
  --border-strong: #C9C6BB;
  --accent:        #C93A1E; /* vermilion; ~4.6:1 on --bg: OK for text >=14px bold/links w/ underline */
  --accent-ink:    #FFF7F3;
  --accent-soft:   #F6DDD6;
  --success:       #2F7D4F;
  --warning:       #8A5E0E;
  --ring:          var(--accent);
}
.dark {
  --bg:            #0E0E0C;
  --bg-sunken:     #0A0A09;
  --surface:       #151513;
  --surface-raised:#1B1B18;
  --ink:           #ECEAE3;
  --ink-2:         #C9C6BB;
  --muted:         #9A978D;
  --faint:         #5D5B53;
  --border:        #26251F;
  --border-strong: #35342C;
  --accent:        #FF6B4A; /* ~6.9:1 on --bg */
  --accent-ink:    #1A0A05;
  --accent-soft:   #2A1510;
  --success:       #4CC38A;
  --warning:       #E3AE45;
}
::selection { background: var(--accent-soft); color: var(--ink); }
```

Rules: **one** accent. Accent is used for: links on hover, focus ring, the active nav item, the status dot's ring, selected rows, and ≤1 primary button per viewport. Semantic colors (`success`, `warning`) only for status. Borders are always `1px solid var(--border)`; emphasis uses `--border-strong`. Elevation = border + surface step, **not shadow** (only the command palette gets `0 8px 40px -12px rgb(0 0 0 / .35)`).

### 3.2 Typography (all via `next/font`, self-hosted, `display: swap`)
| Role | Family | Use |
|---|---|---|
| Display | **Instrument Serif** (regular + italic) | Hero statement, section numerals, contact line, case-study titles |
| Primary | **Geist Sans** (fallback: Inter) | Body, UI, nav, long copy |
| Mono | **JetBrains Mono** (fallback: Geist Mono) | Labels, metadata, dates, ledger, code, kbd |
| Bengali (optional, only if a note has `lang: 'bn'`) | **Noto Sans Bengali** / **Noto Serif Bengali** subset | Loaded only on those note pages |

Scale (ratio 1.25, fluid via `clamp`, base 16px):
| Token | Size | Leading | Tracking | Notes |
|---|---|---|---|---|
| `display` | `clamp(2.75rem, 1.4rem + 6vw, 6.5rem)` | 0.95 | -0.035em | Serif, `text-balance`, max 12ch/line feel |
| `h2` | `clamp(2rem, 1.2rem + 3vw, 3.5rem)` | 1.02 | -0.03em | Serif |
| `h3` | `1.5rem` → `1.875rem` | 1.15 | -0.02em | Sans 500 |
| `lg` | `1.25rem` | 1.5 | -0.01em | Lead paragraphs |
| `base` | `1rem` | 1.65 | -0.005em | Body, measure ≤ 62ch |
| `sm` | `0.875rem` | 1.55 | 0 | Secondary |
| `label` | `0.75rem` | 1.3 | +0.08em, uppercase | Mono; section/field labels |
| `meta` | `0.8125rem` | 1.4 | +0.01em | Mono; dates, ledger values |

`tabular-nums` on all numerals/time. Body weight 400, headings sans 500 (never 700+), serif display only at weight 400.

### 3.3 Spacing, grid, breakpoints
- Base unit **4px**, layout rhythm **8px**. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Container: `max-width: 1200px`; gutters `16px (<640) / 24px (≥640) / 32px (≥1024)`.
- Desktop grid: **12 columns**, 24px gap. Section layout: **rail = cols 1–3**, **content = cols 4–12**. Below `lg` (1024px) rail becomes an inline label above content.
- Section vertical padding: `clamp(80px, 12vw, 160px)`; between a section's internal blocks: 48–64px.
- Breakpoints: `xs 480`, `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
- Radius: `2px` (tags, kbd), `6px` (inputs, buttons), `10px` (panels, project frames). Nothing larger than 10px except the pill status dot.
- Lines: hairlines (`1px`) divide sections and table rows; no card boxes unless the element is interactive or a code/preview frame.
- Minimum hit area 44×44 on touch for primary controls (24×24 min for dense inline controls, WCAG 2.2 AA).

### 3.4 Motion & micro-interactions
Library: `motion` (Framer Motion). `LazyMotion` + `m.*`; wrap app in `<MotionConfig reducedMotion="user">`.

```ts
// lib/motion.ts
export const spring = {
  snappy: { type: 'spring', stiffness: 500, damping: 38, mass: 0.8 },
  soft:   { type: 'spring', stiffness: 260, damping: 30 },
} as const;
export const ease = { out: [0.16, 1, 0.3, 1] as const, inOut: [0.65, 0, 0.35, 1] as const };
export const dur = { hover: 0.12, ui: 0.24, reveal: 0.6 } as const;
export const fadeUp = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: dur.reveal, ease: ease.out } } };
export const stagger = (s = 0.05) => ({ show: { transition: { staggerChildren: s } } });
```

Specs:
- **Hero headline:** line-by-line mask reveal (`overflow:hidden` per line, `y: 100% → 0`, `ease.out`, 600ms, 70ms stagger). Plays once, on load. Everything else on the page is *not* animated on load.
- **Scroll reveals (below fold only):** `fadeUp`, `viewport={{ once: true, margin: '-10% 0px' }}`; content must be visible with JS disabled and must never end in a half-faded state.
- **Rows (work index, archive, notes):** on hover the row background goes `--surface`, title gets an underline drawn with `scaleX 0→1` (origin left, 160ms), trailing arrow translates `x: 2px`. No scale, no lift, no glow.
- **Links:** underline offset 3px; hover color → `--accent`; focus-visible ring 2px `--ring`, offset 2px.
- **Buttons:** `active:scale-[0.98]` via spring.snappy; primary = `--ink` bg / `--bg` text (inverted), NOT accent-filled by default.
- **Theme toggle:** View Transitions API circular reveal where supported (`document.startViewTransition`), instant swap fallback; honors reduced motion.
- **Systems map:** hovering/focusing a tool dims unrelated tools and highlights the project links that use it (150ms opacity).
- **Command palette:** scale `0.98 → 1` + opacity, `spring.snappy`; list items highlight with a shared `layoutId` indicator.
- **Copy-email:** button label swaps `Copy email → Copied ✓` with `AnimatePresence mode="wait"`, 1.6s.
- **Page transitions (case studies):** shared element on the project title via View Transitions (optional, behind feature detection).
- **Forbidden motion:** parallax, tilt, custom cursor, magnetic buttons, marquee, particles, infinite/ambient loops, blur/`filter` animations on large areas.

---

## 4. Guardrails

**Stack:** Next.js (App Router, detect installed major), TypeScript strict, Tailwind CSS (detect v3/v4; map tokens accordingly), `motion`, `lucide-react`.
**Allowed new deps:** `next-themes`, `cmdk`, `@next/mdx` + `@mdx-js/loader`, `shiki`, `zod` (only if not present). Nothing else without a written reason in the task note.
**Removed deps (if present & unused after rebuild):** particle/3D/lottie libs, any gradient-text helpers, shadcn components that survive only as default-looking UI.

**Architecture rules**
- Server Components by default. `'use client'` only in leaf islands: `ThemeToggle`, `CommandPalette`, `KeyboardShortcuts`, `LocalClock`, `CopyEmail`, `Reveal`, `SystemsMap` (hover state), `PreviewFrame`.
- Content lives in typed files (`data/*.ts`, `content/notes/*.mdx`), not inside JSX.
- No third-party runtime script. No analytics until requested.
- Images: `next/image` with accurate `sizes`; `priority` only on the LCP element.

**Performance targets (mobile, production):** LCP < 1.8 s, CLS 0, INP < 150 ms, TBT < 100 ms, first-load JS on `/` < 120 kB gzip, Lighthouse ≥ 98 Perf / 100 A11y / 100 BP / 100 SEO.
**Accessibility targets:** WCAG 2.2 AA; full keyboard operation; visible focus; `prefers-reduced-motion` and `prefers-color-scheme` respected; one `h1`, no skipped heading levels; palette is a proper dialog with focus trap and `Esc`.

### 4.1 Anti-pattern blocklist (the build must fail the review if any exist)
Run these in Task 9.1; all must return nothing:
```bash
grep -rnE "bg-clip-text|text-transparent|bg-gradient|from-(blue|indigo|purple|violet|fuchsia)|backdrop-blur|backdrop-filter" app components
grep -rnE "rounded-(2xl|3xl)|shadow-(lg|xl|2xl)" app components
grep -rniE "tsparticles|particles|lottie|three|@react-three" package.json app components
grep -rniE "Let's build something amazing|high-velocity|Zero Shortcuts|Commitment to Craft|passionate|cutting-edge|seamless" app components data content
```
Also forbidden: skill percentage bars, floating/glow orbs, centered hero with portrait ring, 3-up stat tiles, equal-weight card grids as the main layout, fake terminal output, duplicated sections, emoji as icons.

---

## 5. Content model (typed; never invent)

Create `data/profile.ts`, `data/projects.ts`, `data/stack.ts`, `data/experience.ts`, `data/links.ts`. Required rule: **optional fields that are `undefined` or `TODO(niloy)` render nothing** (use a `isFilled()` helper). The agent must not fabricate dates, metrics, client names, or testimonials.

```ts
// data/profile.ts
export const profile = {
  name: 'Niloy Kumar Mohonta',
  handle: 'Niloy',
  role: 'Full-stack engineer',
  location: 'Dhaka, Bangladesh',
  timeZone: 'Asia/Dhaka',            // UTC+6
  email: 'niloykumarmohonta@gmail.com',
  github: 'niloykm',                 // TODO(niloy): confirm handle. The old site linked "niloydiu"; repo is niloykm/portfolio
  linkedin: undefined,               // TODO(niloy)
  x: undefined,                      // TODO(niloy)
  resumeUrl: undefined,              // TODO(niloy): /resume.pdf
  availability: 'open' as 'open' | 'limited' | 'closed',
  openTo: 'Full-time roles and freelance projects',
  now: { label: 'Co-founder, Gen Stella IT', href: undefined }, // small full-stack + DevOps studio in Dhaka
  summary:
    'I build web products end to end, and keep them fast, accessible and easy to change.',
};
```

```ts
// data/projects.ts
export type Project = {
  slug: string; title: string; year?: string; role?: string; kind: 'client' | 'product' | 'open-source' | 'tool';
  featured: boolean; summary: string;
  problem?: string;                       // 1-2 sentences
  approach?: string[];                    // 3-5 bullets, concrete
  tradeoffs?: { decision: string; alternative: string; why: string }[];
  impact?: { label: string; value: string; source: string }[]; // ONLY with a real source
  architecture?: { layers: { name: string; nodes: string[] }[] }; // client / server / data / third-party
  stack: string[];
  links: { live?: string; repo?: string };
  preview?: { kind: 'iframe' | 'image'; src: string; alt?: string };
};
```
Seed from what exists on the current site (titles, URLs, one-line summaries): **NewCare** (healthcare appointment portal), **HandsOn** (event management / community platform), **Ndemy** (LMS), **Nobot** (AI assistant), **Inventory Management**, **QR Code Studio**, **NRL URL Shortener**, **roBenDevHandsOn**. Mark `featured: true` for NewCare, HandsOn, Ndemy (change only if Niloy says otherwise). For `problem / approach / tradeoffs / impact`, **fill only what can be derived from the repo code or README**; otherwise leave `undefined` and add `// TODO(niloy)`. Each `TODO(niloy)` is listed in `TODO-CONTENT.md` (Task 3.1) so Niloy can fill them in.

```ts
// data/experience.ts — dates left as TODO(niloy) where unknown
Gen Stella IT — Co-founder (small full-stack software and DevOps services company, Dhaka)
ScholarPASS — Full-Stack Developer / founder
TripBooking.ai — Contract frontend developer (AI travel booking platform)
TutorsPlan — Junior Frontend Developer
Daffodil International University — BSc Computer Science, 2020–2024
```

---

## 6. Section-by-section blueprint

Page order: **Hero → Work → Stack → Experience → Notes & Activity → Contact/Footer**. Header is persistent. Section ids: `#top`, `#work`, `#stack`, `#experience`, `#notes`, `#contact`. Nav labels match ids exactly.

### 6.0 Header
- Solid `--bg` with bottom hairline appearing after 8px scroll (no blur). Height 56px.
- Left: wordmark "Niloy" (sans 500) + small live status dot (`success`) with accessible label "Open to work" when `availability === 'open'`.
- Right (desktop): mono nav `Work  Stack  Experience  Notes  Contact`, active item underlined via shared `layoutId`; `⌘K` kbd button labeled "Search"; theme toggle. Mobile: wordmark + `⌘K`-style "Menu" button opening a full-height sheet (focus trap).

### 6.1 Hero (`#top`)
- **Layout (lg):** 12-col. Cols 1–8: display headline. Cols 9–12: **status ledger**. Below: proof line + anchors. Mobile: headline → ledger → anchors.
- **H1 (serif, display scale):** "I build web products end to end, and keep them fast, accessible and easy to change." (agent may tighten but must stay concrete; no buzzwords.) One phrase in *italic* serif, ink color (not accent).
- **Proof line (sans lg, muted):** "Full-stack engineer in Dhaka. Co-founder of Gen Stella IT. Next.js, TypeScript, Node.js, PostgreSQL and MongoDB, shipped to production on Vercel." Only claims backed by `profile`/`projects` data.
- **Status ledger (mono, definition list, hairline rows):**
  - `Based` Dhaka, Bangladesh
  - `Local time` live `HH:MM` (Asia/Dhaka, updates every 30s, `tabular-nums`, rendered after mount, width reserved)
  - `Now` Co-founder, Gen Stella IT
  - `Open to` Full-time roles and freelance projects (+ success dot)
  - `Last push` relative time from GitHub (hide row if fetch fails)
  - `Deployed` short commit SHA + relative time (`VERCEL_GIT_COMMIT_SHA`, build time)
- **Anchors (two, not three):** primary button `Selected work ↓` (inverted ink button), text link `GitHub ↗`, and a mono `Copy email` control. No portrait ring; portrait is a 96×96 square, `rounded-[6px]`, grayscale → color on hover/focus, in the ledger column header. `priority` on this image **only if** it is the LCP; otherwise the H1 is LCP.

### 6.2 Selected Work (`#work`) — "case files"
- Rail label: `01 — Selected work`. Intro one line max.
- **Index (top of section):** a compact table of all featured projects: `No.  Title  Role  Year  Stack  →` (hairline rows, row hover per §3.4) linking to `/work/[slug]`.
- **Case file per featured project (full-width, stacked, hairline separated):**
  - Header row: `01`, title (h3), year · role · kind (mono meta), links (`Live ↗`, `Source ↗`).
  - Left (cols 4–8): `Problem` (1–2 sentences), `Approach` (3–5 bullets), `Trade-offs` as a 3-column mini table (`Decision | Considered | Why`), `Impact` metrics row **only if** `impact[]` has sourced items.
  - Right (cols 9–12): **`ArchDiagram`** (layered SVG/CSS diagram from `architecture.layers`: client / server / data / third-party; nodes are small mono boxes with 1px borders; connectors are 1px lines; uses tokens only) and below it **`PreviewFrame`**: click-to-load lazy iframe of the live URL inside a 10px-radius bordered frame with a mono URL bar; fallback `next/image` screenshot; `loading="lazy"`, `sandbox`, `referrerpolicy="no-referrer"`. Never auto-load iframes.
  - If `problem/approach/tradeoffs` are missing, render a compact variant (summary + stack + links) rather than empty headings.
- **Archive table (below case files):** all non-featured projects as a sortable-looking (static) table: `Project | Kind | Stack | Links`. No cards. No duplicates of featured ones.

### 6.3 Stack (`#stack`) — "systems map"
- Rail label: `02 — Stack`.
- Layered figure, top to bottom: **Interface** (React, Next.js, TypeScript, Tailwind CSS, Framer Motion) → **Server** (Next.js route handlers/server actions, Node.js, Express, REST, JWT auth) → **Data** (PostgreSQL, MongoDB/Mongoose) → **Delivery & tooling** (Git, GitHub, Vercel, Docker (learning), Postman, Jest). Edit to match `data/stack.ts`.
- Each layer = one hairline-bounded row: layer name (mono label), tools as plain text separated by thin dividers (not badges), and a one-line "how I use it" in muted sans.
- **Cross-highlight:** hover/focus a tool → dims others, highlights the featured/archive projects that list it (derived from `projects.stack`), shown as a mono line under the row. Keyboard focusable (`button`s), `aria-pressed`-free; announce via `aria-live="polite"`.
- A small `Currently learning` line (plain text) is allowed. **No bars, no percentages, no level labels, no logo walls.**

### 6.4 Experience (`#experience`)
- Rail label: `03 — Experience`. Ledger table: `Period | Role · Organisation | What I did (1 line)`; dates `TODO(niloy)` hide until filled. Education as the last row. Row hover only if the row has a link.

### 6.5 Notes & Activity (`#notes`)
- Rail label: `04 — Notes`. Two columns (lg): **Notes list** (cols 4–8) and **Activity** (cols 9–12).
- **Notes:** from `content/notes/*.mdx` (frontmatter: `title, date, summary, tags[], lang: 'en'|'bn', draft?`). List rows: date (mono) · title · read time. Drafts and future-dated notes are not rendered. If there are **0 published notes, hide the notes column, the nav item and the palette group** (don't show an empty state). Ship one real stub `content/notes/_template.mdx` with `draft: true`; do **not** write fake articles.
- **Activity:** `Recently pushed` list (5 repos from the public GitHub REST API: name, language, relative `pushed_at`), ISR `revalidate: 3600`, failure → hide silently. Optional contribution strip **only if** `GITHUB_TOKEN` is set (GraphQL `contributionsCollection`); render as a plain 1px-bordered SVG of small squares using `--border-strong` → `--ink` steps (no green), else omit.

### 6.6 Contact & Footer (`#contact`)
- Rail label: `05 — Contact`. Serif h2: "Have something that needs building, or fixing? Write to me." (≤ 14 words, no exclamation marks.)
- Primary: mono email (large) with `CopyEmail` button + `mailto:` link. Secondary: GitHub, LinkedIn/X if defined, résumé if defined. **Remove the contact form** (reduces spam/failure surface). If Niloy later wants one, implement as a Server Action with honeypot + zod.
- **Footer (hairline top, 3 columns):** `Index` (section links) · `Elsewhere` (social) · `Colophon`: "Set in Instrument Serif, Geist and JetBrains Mono. Built with Next.js, deployed on Vercel. Commit `abc1234`, deployed `3 hours ago`." Plus local time and `© {year}`.

### 6.7 Command palette (global)
- Trigger: `⌘K` / `Ctrl+K` and `/`. Library: `cmdk` in a `role="dialog"` modal (focus trap, `Esc`, restore focus).
- Groups: **Navigate** (sections), **Work** (each project → case file), **Notes** (if any), **Actions** (Copy email, Open GitHub, Download résumé if defined, Toggle theme, View source on GitHub), **Help** (Keyboard shortcuts).
- Shortcuts (ignored while typing in inputs): `t` theme · `e` copy email · `g` then `w/s/x/n/c` jump to section · `?` open shortcut sheet. Show kbd hints in the palette. Palette code is `dynamic()`-imported on first open or idle.

### 6.8 Case-study route `/work/[slug]`
- Server-rendered, `generateStaticParams`. Layout: breadcrumb (mono) → serif title → ledger (role, year, stack, links) → Problem → Approach → Architecture (large `ArchDiagram`) → Trade-offs table → Impact (sourced only) → Preview → Prev/Next project. Same tokens, no new components beyond these. Missing sections are skipped.

---

## 7. Implementation Roadmap

## Phase 0: Prep & Reset
- [x] **Task 0.1: Branch, archive old plan, baseline**
  - **Goal:** Safe starting point with measurable "before".
  - **Files:** `PLAN.md` (rename), `Plan.md`
  - **Changes:** `git checkout -b redesign/spec-sheet`; if a legacy `PLAN.md` exists, `git mv PLAN.md PLAN.legacy.md` (macOS/Windows treat `Plan.md`/`PLAN.md` as the same file). Run `pnpm build`; record first-load JS and a mobile Lighthouse run in a `## Baseline` section at the bottom of this file.
  - **Verification:** Build passes; baseline recorded.

- [x] **Task 0.2: Delete legacy UI**
  - **Goal:** No leftover template components can leak into the new design.
  - **Files:** `components/**`, `app/page.tsx`, `app/globals.css`
  - **Changes:** List current components; delete those for Hero, About/Overview (stats, radar, terminal, console), Services, Projects grid/cards, Open Source, Contact form, Navbar, Footer, particle/glow backgrounds. Keep only: `app/layout.tsx`, config files, `public/` assets (portrait, project screenshots, favicon). Replace `app/page.tsx` with a placeholder `<main id="main">`. Remove deps that are now unused (`pnpm remove ...`, only those verified unused by `grep`).
  - **Verification:** `pnpm build` passes with a blank page; no imports reference deleted files.
  - **Note:** Deleted all legacy components (`About`, `Blog`, `Contact`, `CyberParticles`, `Footer`, `Header`, `Navbar`, `Section`, `Services`, `Stats`, `Testimonials`, `Work`, `ui/*`), `app/admin`, `app/api`, `data/portfolio-data.json`, and `assets/assets.js`; moved portrait and project screenshots to `public/images/`; removed unused `dotenv` dependency.

## Phase 1: Tokens & Foundations
- [ ] **Task 1.1: Fonts**
  - **Goal:** Load the type system with zero layout shift.
  - **Files:** `app/layout.tsx`, `lib/fonts.ts`
  - **Changes:** `next/font/google`: `Instrument_Serif` (400, normal+italic), `Geist` (or `Inter`), `JetBrains_Mono`; expose `--font-display`, `--font-sans`, `--font-mono`; apply on `<html>`. Map to Tailwind `fontFamily`. Add type-scale utilities from §3.2 (`text-display`, `text-h2`, `text-label`, `text-meta` etc.) plus `.measure { max-width: 62ch }`.
  - **Verification:** No FOUT; Network shows self-hosted fonts only.

- [ ] **Task 1.2: Color tokens, radius, spacing**
  - **Goal:** Implement §3.1/§3.3 verbatim.
  - **Files:** `app/globals.css`, `tailwind.config.ts` (v3) or `@theme` block (v4)
  - **Changes:** Add light/dark variables; expose Tailwind colors `bg, surface, ink, ink-2, muted, border, border-strong, accent, ...` via `var(--*)`; set `body { background: var(--bg); color: var(--ink) }`; global `:focus-visible` ring; `html { color-scheme: light dark }`; reduced-motion CSS.
  - **Verification:** Toggling `.dark` on `<html>` flips all colors; no hard-coded hex outside `globals.css`.

- [ ] **Task 1.3: Theme provider and toggle**
  - **Goal:** No flash, system default, per-scheme browser chrome.
  - **Files:** `components/theme/ThemeProvider.tsx`, `ThemeToggle.tsx`, `app/layout.tsx`
  - **Changes:** `next-themes` (`attribute="class"`, `defaultTheme="system"`, `disableTransitionOnChange`), `suppressHydrationWarning`; viewport `themeColor` array (`#F4F3EF` / `#0E0E0C`); toggle with placeholder of equal size until mounted; View Transitions circular reveal with feature detection + reduced-motion bypass.
  - **Verification:** Hard reload in both themes shows no flash; no hydration warnings.

- [ ] **Task 1.4: Contrast verification script**
  - **Goal:** Prove tokens meet AA.
  - **Files:** `scripts/contrast.mjs`, `package.json` (`"check:contrast"`)
  - **Changes:** Pure-Node WCAG ratio calculation over token pairs (`ink/bg`, `ink-2/bg`, `muted/bg`, `accent/bg`, `accent-ink/accent`, `success/bg`, `warning/bg`, and dark equivalents, also on `--surface`). Fail (exit 1) below 4.5 for text pairs. If any pair fails, **darken/lighten that token minimally** and note the change in §3.1.
  - **Verification:** `pnpm check:contrast` exits 0.

- [ ] **Task 1.5: UI primitives**
  - **Goal:** The small, boring components everything uses.
  - **Files:** `components/ui/{Container,Rule,Label,Kbd,TextLink,Button,Tag}.tsx`
  - **Changes:** `Container` (§3.3); `Rule` (1px hairline); `Label` (mono uppercase); `Kbd`; `TextLink` (underline offset 3, hover accent, external arrow + `rel`); `Button` (inverted primary, bordered secondary, `focus-visible`, `active:scale-[0.98]`); `Tag` (2px radius, 1px border, mono). All server-safe.
  - **Verification:** A temporary `/_kit` page renders every primitive in both themes (delete the page afterwards).

## Phase 2: Shell & Grid
- [ ] **Task 2.1: Section scaffold with index rail**
  - **Goal:** The signature 3/9 rail layout.
  - **Files:** `components/layout/Section.tsx`
  - **Changes:** `<Section id index label>`: renders `<section aria-labelledby>`; at `lg` grid `grid-cols-12`, rail `col-span-3` (`sticky top-20 self-start`, mono `01 — Work`), content `col-span-9`; below `lg` the label sits above content. Top hairline; padding per §3.3; `scroll-mt-20`.
  - **Verification:** Rail sticks within its section only; no overflow at 375px.

- [ ] **Task 2.2: Header and mobile sheet**
  - **Goal:** §6.0.
  - **Files:** `components/layout/Header.tsx`, `NavLinks.tsx`, `MobileMenu.tsx`
  - **Changes:** Solid header + scroll hairline; `useActiveSection` (IntersectionObserver) drives `layoutId="nav-active"`; skip link → `#main` (visible on focus); status dot with accessible text; palette trigger button (wired in 6.1); mobile sheet with focus trap/`Esc`.
  - **Verification:** Keyboard-only navigation works; active item tracks scroll.

- [ ] **Task 2.3: Footer and colophon**
  - **Goal:** §6.6 footer + deploy proof.
  - **Files:** `components/layout/Footer.tsx`, `lib/build-info.ts`
  - **Changes:** Read `process.env.VERCEL_GIT_COMMIT_SHA` (short 7 chars, fallback `local`) and build timestamp at build time; render "Commit `abc1234` · deployed {relative}" via a `<time>`; 3 columns; live `LocalClock` island reused from 4.1.
  - **Verification:** Footer shows the correct SHA after `vercel --prod`.

## Phase 3: Content Layer
- [ ] **Task 3.1: Typed data files + content TODO list**
  - **Goal:** §5, with no invented facts.
  - **Files:** `data/*.ts`, `lib/filled.ts`, `TODO-CONTENT.md`
  - **Changes:** Create the files; seed with known facts only; `isFilled()` helper; generate `TODO-CONTENT.md` listing every `TODO(niloy)` (file, field, what is needed).
  - **Verification:** `pnpm build` passes; TODO list matches `grep -rn "TODO(niloy)" data`.

- [ ] **Task 3.2: MDX notes pipeline**
  - **Goal:** Notes that can be written in Markdown.
  - **Files:** `content/notes/`, `lib/notes.ts`, `mdx-components.tsx`, `next.config.*`
  - **Changes:** `@next/mdx`; loader reading frontmatter (`gray-matter` ok if needed); exclude `draft` and future dates; reading time; `shiki` server-side code highlighting with `github-light`/`github-dark` themes switched by CSS variables; MDX element styles use tokens and `.measure`. If `lang === 'bn'`, set `lang="bn"` on the article and load the Bengali font subset for that route only.
  - **Verification:** The draft template is excluded from the build output; a temporary test note renders and is then removed.

- [ ] **Task 3.3: GitHub data fetchers**
  - **Goal:** Real "last push" and recent repos with graceful failure.
  - **Files:** `lib/github.ts`
  - **Changes:** `getRecentRepos()` → `GET https://api.github.com/users/{github}/repos?sort=pushed&per_page=6` with `next: { revalidate: 3600 }`, optional `Authorization` if `GITHUB_TOKEN`; filter forks; return `null` on any error/timeout (3s `AbortSignal`). Optional `getContributions()` via GraphQL only with token. Never expose the token to the client.
  - **Verification:** Works with and without a token; offline build does not fail.

## Phase 4: Sections
- [ ] **Task 4.1: Hero + LocalClock + CopyEmail**
  - **Goal:** §6.1.
  - **Files:** `components/sections/Hero.tsx`, `components/islands/{LocalClock,CopyEmail}.tsx`
  - **Changes:** Implement layout, ledger (hide rows lacking data), portrait square, two anchors. `LocalClock`: render after mount with `Intl.DateTimeFormat('en-GB', { timeZone, hour:'2-digit', minute:'2-digit' })`, reserved width, `tabular-nums`, 30s interval. `CopyEmail` per §3.4.
  - **Verification:** No hydration warnings; H1 is the LCP element; first viewport fits at 375/768/1440.

- [ ] **Task 4.2: ArchDiagram and PreviewFrame components**
  - **Goal:** Reusable evidence components.
  - **Files:** `components/work/ArchDiagram.tsx`, `PreviewFrame.tsx`
  - **Changes:** `ArchDiagram` takes `layers`; CSS grid rows per layer with mono node boxes and 1px SVG connectors between adjacent layers (decorative, `aria-hidden`), with a visually-hidden `<ol>` text equivalent. `PreviewFrame`: click-to-load iframe (see §6.2), fallback image, URL bar in mono, `title` attribute set.
  - **Verification:** Diagram readable at 320px (stacks vertically); no iframe loads before click.

- [ ] **Task 4.3: Selected Work (index + case files)**
  - **Goal:** §6.2.
  - **Files:** `components/sections/Work.tsx`, `components/work/CaseFile.tsx`, `WorkIndex.tsx`
  - **Changes:** Implement index table and case files using `data/projects.ts`; compact variant when narrative fields are missing; links with descriptive `aria-label`.
  - **Verification:** Every featured project appears once; no empty headings.

- [ ] **Task 4.4: Archive table**
  - **Goal:** Non-featured projects without cards.
  - **Files:** `components/work/Archive.tsx`
  - **Changes:** Semantic `<table>` (`<caption class="sr-only">`), columns Project/Kind/Stack/Links; at `<md` collapse each row into a stacked definition block.
  - **Verification:** No project duplicated between featured and archive.

- [ ] **Task 4.5: Stack systems map**
  - **Goal:** §6.3.
  - **Files:** `components/sections/Stack.tsx`, `components/islands/SystemsMap.tsx`, `data/stack.ts`
  - **Changes:** Static layered rows (server) + client island for cross-highlight; computed project lists from `projects.stack`; keyboard accessible.
  - **Verification:** Works with keyboard; with JS disabled the rows still read fully.

- [ ] **Task 4.6: Experience ledger**
  - **Goal:** §6.4.
  - **Files:** `components/sections/Experience.tsx`
  - **Changes:** Semantic table/`dl`; hide unknown dates; education row.
  - **Verification:** No `TODO(niloy)` text appears on the page.

- [ ] **Task 4.7: Notes & Activity**
  - **Goal:** §6.5.
  - **Files:** `components/sections/Notes.tsx`, `components/notes/ActivityList.tsx`
  - **Changes:** Notes list + activity; hide empty columns/sections entirely (also remove nav + palette entries when empty).
  - **Verification:** With 0 notes the section collapses to Activity only (or disappears if the fetch also fails); nav stays consistent.

- [ ] **Task 4.8: Contact**
  - **Goal:** §6.6.
  - **Files:** `components/sections/Contact.tsx`
  - **Changes:** Serif line, large mono email + copy + mailto, social links; delete old form code and API route if it exists.
  - **Verification:** No form remains; links have accessible names.

## Phase 5: Routes
- [ ] **Task 5.1: Case-study route**
  - **Goal:** §6.8.
  - **Files:** `app/work/[slug]/page.tsx`, `generateMetadata`
  - **Changes:** Static params from `projects`; reuse `ArchDiagram`, `PreviewFrame`; prev/next links; `notFound()` for unknown slugs; per-page OG metadata.
  - **Verification:** `pnpm build` prerenders all slugs.

- [ ] **Task 5.2: Notes routes**
  - **Goal:** Readable notes pages.
  - **Files:** `app/notes/[slug]/page.tsx`, `app/notes/page.tsx`
  - **Changes:** Article layout (`.measure`, serif title, mono meta), `generateStaticParams`; skip routes if no published notes.
  - **Verification:** No route is emitted when there are no published notes.

## Phase 6: Command Palette & Shortcuts
- [ ] **Task 6.1: Command palette**
  - **Goal:** §6.7 palette.
  - **Files:** `components/islands/CommandPalette.tsx`, `lib/commands.ts`
  - **Changes:** `cmdk` dialog, groups, kbd hints, shared-layout highlight; `dynamic()` import on first trigger or `requestIdleCallback`; focus trap + restore.
  - **Verification:** `⌘K`, `Ctrl+K`, `/` open it; `Esc` closes; each command works; a screen-reader pass announces the dialog title.

- [ ] **Task 6.2: Global shortcuts and help sheet**
  - **Goal:** Keyboard-first navigation.
  - **Files:** `components/islands/KeyboardShortcuts.tsx`
  - **Changes:** Listener ignoring inputs/contenteditable and modified keys; `g` + key chords with 800ms window; `?` opens a shortcut sheet.
  - **Verification:** Shortcuts never fire while typing in the palette search.

## Phase 7: Motion Layer
- [ ] **Task 7.1: Motion foundation**
  - **Goal:** §3.4 setup.
  - **Files:** `lib/motion.ts`, `components/motion/MotionProvider.tsx`
  - **Changes:** Presets; `LazyMotion features={domAnimation}`; `MotionConfig reducedMotion="user"`.
  - **Verification:** With OS reduced motion on, transforms are disabled.

- [ ] **Task 7.2: Hero line reveal + below-fold reveals**
  - **Goal:** Restrained entrance and scroll reveals.
  - **Files:** `components/motion/{LineReveal,Reveal}.tsx`, section wrappers
  - **Changes:** Per-line masked reveal for H1 only; `Reveal` for below-fold blocks with `once`; no animation above the fold other than H1; SSR output is visible without JS.
  - **Verification:** Full-page screenshots in both themes show no faded/clipped content; disabling JS shows all content.

- [ ] **Task 7.3: Interaction details**
  - **Goal:** Tactile rows, links, buttons, palette.
  - **Files:** `components/ui/*`, `components/work/*`, `components/islands/*`
  - **Changes:** Row hover (underline draw, arrow nudge), nav `layoutId` underline, systems-map dimming, copy-email swap, palette spring; all via tokens in `lib/motion.ts`.
  - **Verification:** Every interactive element has distinct hover and focus-visible states; none use scale > 1.0 or shadows.

- [ ] **Task 7.4: Reduced-motion and idle audit**
  - **Goal:** No ambient work.
  - **Files:** whole repo
  - **Changes:** Verify no infinite animations remain; main thread idle at rest (Performance panel); remove any `will-change` not needed.
  - **Verification:** `grep -rn "repeat: Infinity\|animate-pulse\|animate-spin" app components` returns only loading spinners that are intentional.

## Phase 8: Performance, A11y, SEO
- [ ] **Task 8.1: Images**
  - **Goal:** Correct, small images.
  - **Files:** all `next/image` usage, `next.config.*`
  - **Changes:** Accurate `sizes`; fixed aspect ratios; `placeholder="blur"` for static imports; formats `avif/webp`; screenshots re-exported ≤ 1600px wide; meaningful `alt` (or `alt=""` for decorative). Old site requested `w=3840` for tiny images; confirm no request exceeds needed width.
  - **Verification:** Network tab: no oversized images; CLS 0.

- [ ] **Task 8.2: Metadata, OG, structured data**
  - **Goal:** Complete SEO and share cards.
  - **Files:** `app/layout.tsx`, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`
  - **Changes:** `metadataBase`, canonical, title template, description from `profile.summary`; generated OG image (1200×630, serif name, mono role, theme-matched); JSON-LD `Person` (`sameAs` from defined socials only); no `keywords` meta.
  - **Verification:** `curl -s localhost:3000 | grep -E "og:image|ld\+json"` returns both.

- [ ] **Task 8.3: Accessibility pass**
  - **Goal:** WCAG 2.2 AA.
  - **Files:** all
  - **Changes:** Heading order, landmark roles, `aria-label`s on icon links, focus order, 44px touch targets on primary controls, `lang`, table semantics, palette dialog semantics; run axe in both themes.
  - **Verification:** axe: 0 serious/critical; complete keyboard-only walkthrough.

- [ ] **Task 8.4: Responsive QA**
  - **Goal:** No overflow or awkward wraps.
  - **Files:** as needed
  - **Changes:** Test 375 / 768 / 1024 / 1440 / 1920 in both themes; fix rail collapse, tables → stacked blocks, diagram wrapping, header sheet.
  - **Verification:** `document.documentElement.scrollWidth === innerWidth` at 375px.

- [ ] **Task 8.5: Bundle and Lighthouse budget**
  - **Goal:** Hit §4 targets.
  - **Files:** as needed
  - **Changes:** Check `next build` first-load JS (`/` < 120 kB gzip); lazy-load palette/shortcuts/preview; remove unused deps; re-run Lighthouse mobile and write an `## After` section comparing to baseline.
  - **Verification:** Targets met or each miss explained in `## After`.

## Phase 9: Gate & Ship
- [ ] **Task 9.1: Anti-pattern gate**
  - **Goal:** Make sure nothing template-like came back.
  - **Files:** whole repo
  - **Changes:** Run every command in §4.1; fix findings; confirm `TODO(niloy)` strings never render (`grep` the built HTML in `.next/server/app`).
  - **Verification:** All greps empty; `pnpm lint && pnpm tsc --noEmit && pnpm build` pass.

- [ ] **Task 9.2: Push to GitHub and deploy to Vercel (prove it)**
  - **Goal:** Latest code visible on GitHub **and** production.
  - **Files:** none
  - **Changes:** `git config user.name "niloykm"`, `git config user.email "niloykumarmohonta@gmail.com"`; ensure `origin` = `https://github.com/niloykm/portfolio.git`; open PR `redesign/spec-sheet` → default branch and merge (`gh pr create --fill && gh pr merge --merge`) because only the default branch updates production; `git pull`; `vercel link` if needed; `vercel --prod --yes`. Compare `git rev-parse --short HEAD` with the SHA in the live footer and `gh api repos/niloykm/portfolio/commits/<default> -q .sha`.
  - **Verification:** Live footer SHA equals the GitHub default-branch SHA; `curl -s https://niloykm.vercel.app | grep -o "<title>[^<]*"` shows the new title.

---

## 8. Definition of Done
- All 36 tasks ticked; build, lint and types clean.
- No blocklist matches (§4.1); no unfilled `TODO(niloy)` visible on the site.
- Lighthouse and a11y targets (§4) met or explained.
- Light and dark mode both pass the contrast script and look intentional (no pure black/white, one accent).
- GitHub default branch SHA == Vercel production footer SHA.
- `TODO-CONTENT.md` hands Niloy a precise list of facts still needed (project problems/trade-offs/metrics, dates, socials).

## Baseline

### Route First Load JS (`npm run build` on `redesign/spec-sheet`)
```
Route (app)                                 Size  First Load JS
┌ ○ /                                    28.8 kB         189 kB
├ ○ /_not-found                            133 B         103 kB
├ ○ /admin                               6.38 kB         128 kB
├ ƒ /api/admin/login                       133 B         103 kB
├ ƒ /api/admin/logout                      133 B         103 kB
└ ƒ /api/portfolio                         133 B         103 kB
+ First Load JS shared by all             102 kB
  ├ chunks/255-3981a3d1f3561bd8.js       46.2 kB
  ├ chunks/4bd1b696-c023c6e3521b1417.js  54.2 kB
  └ other shared chunks (total)          1.92 kB
```

### Lighthouse Audit (Mobile, https://niloykm.vercel.app/)
- **Performance:** 84
- **Accessibility:** 96
- **Best Practices:** 100
- **SEO:** 100
- **LCP:** 3.4 s
- **CLS:** 0
- **TBT:** 220 ms
