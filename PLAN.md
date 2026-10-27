# Portfolio Refactoring & Polish Plan

> **Agent Directive:**
> - Read tasks sequentially.
> - Work on ONE task at a time.
> - After completing a task, test the build (`npm run build` or `pnpm build`).
> - Update this file by marking the completed task as `[x]` and update the progress indicator.
> - Commit changes per completed phase (`git commit -m "feat: [phase name]"`).
>
> **Ground rules**
> - File paths below are best guesses from the rendered site (Next.js App Router). Before editing, locate the real files with `grep`/`ls` and adapt. Do not create duplicates of existing components.
> - Keep all existing content/links (projects, GitHub, LinkedIn, email) unless a task says to remove or move it.
> - Never use `'use client'` at a page/section level unless the task says so. Push it down to the smallest leaf.
> - Do not add new dependencies unless a task names them.
> - Live site for reference: https://niloykm.vercel.app/

---

## 📊 Overall Progress
- **Total Tasks:** 27
- **Completed:** 5 / 27
- **Current Status:** Phase 1 complete

---

## Phase 1: Core Layout & Typography (Structural Foundations)

- [x] **Task 1.1: Baseline snapshot & working branch**
  - **Goal:** Record "before" metrics so every later change is measurable.
  - **Files to touch:** `PLAN.md` (append a "Baseline" note at the bottom), none else.
  - **Changes:**
    - Create branch `refactor/polish`.
    - Run `pnpm build` and record first-load JS per route from the build output.
    - Run Lighthouse (mobile) on the production URL and record Performance / Accessibility / Best Practices / SEO, plus LCP, CLS, TBT.
    - Append these numbers under `## Baseline` at the bottom of this file.
  - **Verification:** Build passes; baseline numbers are written in this file.

- [x] **Task 1.2: Fonts via `next/font` + fluid type scale**
  - **Goal:** One deliberate type system: Geist Sans (UI/body) + Geist Mono or JetBrains Mono (labels, code, metadata only).
  - **Files to touch:** `app/layout.tsx`, `app/globals.css` (or `tailwind.config.ts`)
  - **Changes:**
    - Load fonts with `next/font/google` (or `geist` package if already installed), `display: 'swap'`, exposed as CSS variables `--font-sans` and `--font-mono`; apply on `<html>`.
    - Map them in Tailwind (`fontFamily.sans`, `fontFamily.mono`).
    - Define fluid sizes with `clamp()`: display `clamp(2.5rem, 1.5rem + 5vw, 5rem)`, h2 `clamp(1.75rem, 1.2rem + 2.5vw, 3rem)`, body `1rem/1.65`, small `0.875rem/1.5`.
    - Headings: `tracking-tight`, `leading-[1.05]` for display, `text-balance`; body paragraphs `text-pretty`, max width `65ch`.
    - Remove any `<link>` or CSS `@import` font loading.
  - **Verification:** `pnpm dev`; no FOUT/layout jump on reload; DevTools Network shows fonts self-hosted.

- [x] **Task 1.3: Design tokens (color, border, radius, shadow)**
  - **Goal:** Replace ad-hoc blues/purples/glows with a small semantic token set and ONE accent.
  - **Files to touch:** `app/globals.css`, `tailwind.config.ts`
  - **Changes:**
    - Define CSS variables for `--bg`, `--bg-subtle`, `--surface`, `--fg`, `--fg-muted`, `--border`, `--accent`, `--accent-fg` under `:root` and `.dark`.
    - Light: bg `#fafafa`/white, fg `neutral-900`, muted `neutral-600`, border `neutral-200/80`. Dark: bg `#0a0a0b` (not pure black or navy `#020617`), fg `neutral-100`, muted `neutral-400`, border `neutral-800/80`.
    - Pick one accent (keep the existing teal/emerald OR the blue, not both plus purple). Use it only for links, focus rings, primary button, active states.
    - Radius scale: `rounded-lg` for controls, `rounded-xl` for cards. Remove `rounded-3xl` everywhere.
    - Shadows: replace large colored glows with `shadow-sm` or a 1px border only.
    - Expose tokens to Tailwind as `bg-background`, `text-foreground`, `text-muted`, `border-border`, `bg-surface`, `text-accent`.
  - **Verification:** `grep -rE "(indigo|purple|violet|fuchsia)-" app components` returns nothing (except in deliberately kept spots, noted in the commit).

- [x] **Task 1.4: Layout grid, spacing rhythm, landmarks, anchors**
  - **Goal:** Consistent vertical rhythm and correct semantics/navigation.
  - **Files to touch:** `app/layout.tsx`, `app/page.tsx`, `components/Navbar.*`, `components/Section.tsx` (create if missing)
  - **Changes:**
    - Create a `<Section id label>` wrapper: `py-20 md:py-28`, container `max-w-6xl mx-auto px-5 sm:px-8`, renders `<section aria-labelledby>`.
    - Wrap page content in `<main id="main">`; header in `<header>`, footer in `<footer>`.
    - Fix skip link: it must point to `#main`, not `#top`. Visible on focus only.
    - Fix nav anchors: the "Projects" link currently targets `#blog`; rename to the real section id (`#projects` or `#open-source`) and make nav labels match section ids 1:1.
    - Add `scroll-mt-24` (sticky header offset) and `html { scroll-behavior: smooth }` guarded by `prefers-reduced-motion: no-preference`.
  - **Verification:** Tab from page load: first focus is the skip link, it jumps to main content; every nav link scrolls to the correct section.

- [x] **Task 1.5: Hero restructure (asymmetric, content-first)**
  - **Goal:** Replace the centered portrait + gradient headline + chip row hero with a left-aligned, confident hero.
  - **Files to touch:** `components/Hero.*`
  - **Changes:**
    - Desktop: two columns (`grid-cols-[1.3fr_1fr]`), text left, portrait right (rectangular `rounded-xl` crop, no gradient ring, small status dot only if keeping "available").
    - Mobile: portrait above or below text, text first in DOM order.
    - Headline: plain `text-foreground`, one concrete sentence (e.g. "I build and ship full-stack web products with Next.js and TypeScript."). Drop the blue→purple gradient word.
    - Merge the duplicate availability messaging ("Available for work" pill + "Available for full-time roles & freelance projects") into ONE line.
    - Replace the 8 tech chips with a single muted mono line: `TypeScript · Next.js · Node.js · PostgreSQL · MongoDB`.
    - Two CTAs only: primary "View projects", secondary "Email me" (copy-to-clipboard with toast, keep existing behavior).
    - Social icons: add `aria-label`, 44×44px hit area, `target="_blank" rel="noopener noreferrer"`.
  - **Verification:** `pnpm dev`; hero fits the first viewport at 375, 768, 1440 widths without scroll jank; LCP image is the portrait (confirm in Task 5.1).

---

## Phase 2: Refactoring Components & Removing AI Tropes

- [ ] **Task 2.1: Remove gradient headings and eyebrow pills from every section**
  - **Goal:** Kill the repeated "tiny pill label + gradient h2 + underline bar" template.
  - **Files to touch:** `components/SectionHeading.*` (or wherever headings live), all section components
  - **Changes:**
    - Create/standardize `<SectionHeading eyebrow? title description?>`: h2 in `text-foreground`, optional mono eyebrow as plain text (no pill, no icon), no decorative divider.
    - Remove `bg-clip-text text-transparent bg-gradient-*` from all headings.
    - Shorten the descriptions to one sentence each.
  - **Verification:** `grep -rn "bg-clip-text" app components` returns nothing.

- [ ] **Task 2.2: Replace skill-bar "radar" with a grouped stack list**
  - **Goal:** Remove self-rated progress bars ("Expert", "Senior") which read as template filler.
  - **Files to touch:** `components/About.*` (the "Core Stack Radar" card), `data/skills.ts` (create)
  - **Changes:**
    - Delete progress bars and level labels.
    - Replace with grouped lists: **Frontend** (React, Next.js, TypeScript, Tailwind, Framer Motion), **Backend** (Node.js, Express, REST, JWT auth), **Data** (MongoDB, PostgreSQL), **Tooling** (Git, Vercel, Docker: learning).
    - Render as a definition list (`<dl>`) with mono labels, muted values. Keep "Currently learning: Nest.js, Docker" as one plain line.
    - Move the data into `data/skills.ts` (typed).
  - **Verification:** No `%`/width-based bars remain in the About area; content still lists all skills.

- [ ] **Task 2.3: Replace vanity metrics and the fake terminal**
  - **Goal:** Remove "100% Commitment to Craft", counters starting at `0+`, and the `sudo hire --now` / `v2.4.0` gimmick.
  - **Files to touch:** `components/About.*`, `components/Terminal.*`, `components/CommandPalette.*`
  - **Changes:**
    - Delete the "100% Commitment to Craft" stat. Keep only verifiable facts (years of experience, number of shipped projects, real GitHub repo count) as static text, or drop the stats row entirely.
    - Remove the "Developer CLI / Launch Terminal" card. If you want to keep a terminal, it must run real commands (`about`, `skills`, `projects`, `contact`) and not display a fake version number. Otherwise delete it and its code.
    - Rename the `⌘K` + "Menu" nav control to "Search" or "Command menu"; ensure it actually opens a command palette (jump to sections, copy email, toggle theme) or remove it.
  - **Verification:** `pnpm build` passes; no unused imports (`pnpm lint`).

- [ ] **Task 2.4: Services → editorial list instead of 4 numbered icon cards**
  - **Goal:** Reduce card-grid sameness and copy bloat.
  - **Files to touch:** `components/Services.*`, `data/services.ts` (create)
  - **Changes:**
    - Render services as a 2-column list: left = title + stack tags (mono), right = 1 sentence + max 2 bullets. Separate rows with `border-t border-border`.
    - Remove the colored icon tiles and the `01–04` numbering.
    - Cut each description to ≤ 25 words; drop claims you cannot back up (e.g. "mission-critical", "95+ Lighthouse" unless you link a report).
  - **Verification:** Visual check at 375px: rows stack cleanly, no horizontal overflow.

- [ ] **Task 2.5: Projects grid → bento layout with a real featured project**
  - **Goal:** Fix the orphaned 7th card and the identical dark-gradient-overlay cards; give projects real information.
  - **Files to touch:** `components/Projects.*`, `components/ProjectCard.*`, `data/projects.ts` (create)
  - **Changes:**
    - Move all 7 projects (HandsOn, NewCare, Ndemy LMS, Nobot, Inventory Management, QR Code Studio, NRL URL Shortener) into a typed `data/projects.ts` with fields: `slug, title, summary, role, stack[], category, image, liveUrl, repoUrl, featured`.
    - Layout: 12-col bento. Top 2 featured projects span 6 cols (larger image + 2-line summary + role); remaining 5 are compact rows/cards. Grid must have no orphan on desktop.
    - Remove the gradient overlay on images; put title/meta BELOW the image in normal text (contrast-safe).
    - The "Deep Dive" badge appears on every card but links nowhere: either remove it, or implement `app/projects/[slug]/page.tsx` with a short case study (problem, stack, what you built, link). Prefer removing it for now.
    - Replace `+3` chip overflow with the full stack on hover/focus (`title` + visually-hidden text), or show up to 4 tags.
    - "Live Demo" is the primary link; "Code" is a secondary text link. Both need descriptive `aria-label`s ("Live demo of NewCare").
  - **Verification:** At 1440px and 768px no orphan card; all links open the right URLs.

- [ ] **Task 2.6: De-duplicate "Open Source Work"**
  - **Goal:** The section repeats HandsOn, edemy, newcare, and Nobot (already in Featured Projects) with identical "Jan 2024" dates.
  - **Files to touch:** `components/OpenSource.*`, `app/page.tsx`
  - **Changes:**
    - Delete the section's duplicated cards and fake dates.
    - Replace with a compact "More on GitHub" row: link to `https://github.com/niloydiu` plus up to 3 repos NOT shown above (or nothing, if none apply).
    - Remove the stray `id="blog"` anchor (see 1.4).
  - **Verification:** No project appears twice on the page.

- [ ] **Task 2.7: Copy pass & CTA consolidation**
  - **Goal:** Remove buzzword copy and repeated CTAs.
  - **Files to touch:** all section components, `data/*.ts`
  - **Changes:**
    - Replace phrases: "high-velocity", "Zero Shortcuts • High Standards", "Sub-Second Latency", "makes a real commercial impact", "Engineered for Impact" with plain, specific language.
    - Only keep claims you can show (e.g. "WCAG AA" only if Task 5.3 passes).
    - Currently there are three centered CTA buttons mid-page ("Have a project in mind? Let's talk", "Let's build something amazing", etc.). Keep ONE contact CTA in the hero and one in the contact section; remove the others.
  - **Verification:** `grep -rn "Let's build something amazing"` returns nothing; page reads naturally top to bottom.

- [ ] **Task 2.8: Contact form with real validation and states**
  - **Goal:** A form that works and communicates state.
  - **Files to touch:** `components/Contact.*`, `app/actions/contact.ts` (or existing API route)
  - **Changes:**
    - Use a Server Action or existing route; validate with `zod` if already installed, otherwise native validation + simple checks.
    - Add honeypot field and basic rate limit/`maxLength`.
    - Visible `<label>`s (not placeholder-only), `aria-invalid` + `aria-describedby` error text, `autocomplete="name"`/`"email"`.
    - States: idle, submitting (button disabled + spinner), success (inline message via `role="status"`), error (`role="alert"`).
    - Placeholders: use neutral examples, not "Alex Smith".
    - Footer: remove the Facebook icon unless it is intentional; ensure each remaining social icon has an `aria-label`.
  - **Verification:** Submit empty form → inline errors; submit valid → success state; keyboard-only completion works.

---

## Phase 3: Smooth Animations & Micro-Interactions (Framer Motion)

- [ ] **Task 3.1: Central motion config and spring presets**
  - **Goal:** One consistent motion language that respects user settings.
  - **Files to touch:** `lib/motion.ts` (create), `app/providers.tsx` (create or extend), `app/layout.tsx`
  - **Changes:**
    - Export presets: `spring.soft = { type: 'spring', stiffness: 260, damping: 28 }`, `spring.snappy = { type: 'spring', stiffness: 420, damping: 32 }`, `ease.out = [0.22, 1, 0.36, 1]`.
    - Export variants: `fadeUp` (y: 12 → 0, opacity 0 → 1), `stagger` (staggerChildren 0.06).
    - Wrap the app in `<MotionConfig reducedMotion="user">`.
    - Import from `motion/react` or `framer-motion`, whichever the project already uses; use `LazyMotion` + `domAnimation` + `m.*` where practical to cut bundle size.
  - **Verification:** With OS "reduce motion" enabled, transform animations are disabled.

- [ ] **Task 3.2: Fix scroll reveals (no invisible content, no mid-animation captures)**
  - **Goal:** The dark-mode screenshot shows section headings, the profile card header, and subtitles stuck partially faded/clipped; reveals must never leave content hidden.
  - **Files to touch:** `components/Reveal.tsx` (create), every section using `whileInView`
  - **Changes:**
    - Build `<Reveal>` using `whileInView="show" viewport={{ once: true, margin: '-80px' }}` with `fadeUp` variants.
    - Only animate `opacity` and `transform` (never `height`, `filter: blur` on large areas).
    - Content must be visible without JS: make `initial` state apply only after hydration (e.g. `initial={false}` on first paint for above-the-fold content; use `initial="hidden"` only for below-the-fold).
    - Remove animations on elements above the fold except a single hero entrance (3.5).
    - Investigate the clipped profile-name card in dark mode: remove any overlay/`overflow-hidden` combination that cuts the header; ensure the card's heading is never covered by a gradient layer.
  - **Verification:** Full-page screenshot (Playwright or browser devtools) in dark and light mode shows all headings at full opacity.

- [ ] **Task 3.3: Project filter with layout animation**
  - **Goal:** Smooth filtering for "All / Full-Stack / Frontend & Tools / AI & Utilities".
  - **Files to touch:** `components/Projects.*` (filter island)
  - **Changes:**
    - Wrap cards in `<motion.div layout>` inside `<AnimatePresence mode="popLayout">`; exit = `{ opacity: 0, scale: 0.97 }` using `spring.soft`.
    - Active filter pill uses a shared `layoutId="filter-pill"` background.
    - Filter buttons: `role="tablist"`-style or `aria-pressed`; announce result count via `aria-live="polite"`.
    - Keep this in a small client component; the card markup itself can stay server-rendered where possible.
  - **Verification:** Filtering causes no layout jump of surrounding sections; keyboard operable.

- [ ] **Task 3.4: Hover/focus micro-interactions & nav active indicator**
  - **Goal:** Subtle, purposeful feedback only.
  - **Files to touch:** `components/Navbar.*`, `components/ProjectCard.*`, `components/Button.*`
  - **Changes:**
    - Nav: active section indicator via `layoutId="nav-underline"` driven by an `IntersectionObserver` hook (`useActiveSection`).
    - Cards: on hover, `translateY(-2px)` + border color → `--accent` at 40% opacity (CSS transition, 150ms). No glow, no scale > 1.01.
    - Buttons: `active:scale-[0.98]`; visible `focus-visible:ring-2 ring-accent ring-offset-2`.
    - Do NOT add custom cursors or tilt effects.
  - **Verification:** All interactive elements show a distinct hover AND focus-visible state.

- [ ] **Task 3.5: Restrained hero entrance & scroll progress**
  - **Goal:** One tasteful first impression; remove other decorative motion.
  - **Files to touch:** `components/Hero.*`, `components/ScrollProgress.tsx` (optional create)
  - **Changes:**
    - Hero: stagger heading → paragraph → CTAs (≤ 600ms total), once on load.
    - Remove ambient floating blobs, pulsing glows, and background grid/particle effects from the hero and section backgrounds.
    - Optional: 2px top scroll progress bar using `useScroll` + `scaleX` with `spring.soft`.
  - **Verification:** No continuously running animations remain (check Performance tab: idle main thread when scrolled to rest).

---

## Phase 4: Dark/Light Mode Theme System & Engineering Polish

- [ ] **Task 4.1: Robust theme provider (no flash, system default)**
  - **Goal:** Correct theme on first paint and per-scheme browser chrome.
  - **Files to touch:** `app/layout.tsx`, `components/ThemeProvider.tsx`, `components/ThemeToggle.tsx`
  - **Changes:**
    - Use `next-themes` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`) with `suppressHydrationWarning` on `<html>`.
    - Toggle: render a placeholder of identical size until mounted to avoid hydration mismatch; accessible name "Toggle theme"; icon swap with `AnimatePresence`.
    - Replace the single `theme-color: #020617` with a viewport export: `themeColor: [{ media: '(prefers-color-scheme: light)', color: '#fafafa' }, { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' }]`.
    - Set `color-scheme: light dark` in CSS so native controls follow the theme.
  - **Verification:** Hard reload in both themes: no white flash in dark mode, no hydration warnings in console.

- [ ] **Task 4.2: Token migration & contrast audit**
  - **Goal:** Every color in both modes comes from tokens; borders are subtle; text meets WCAG AA.
  - **Files to touch:** all components, `app/globals.css`
  - **Changes:**
    - Replace hard-coded `bg-white`, `bg-slate-*`, `text-gray-*`, `dark:bg-[#...]` with tokens from Task 1.3.
    - Borders: `border-border` (`neutral-200/80` light, `neutral-800/80` dark). No pure white or pure black borders.
    - Check contrast: body text ≥ 4.5:1; muted text ≥ 4.5:1 (bump `--fg-muted` if needed); UI borders/inputs ≥ 3:1 where they convey state.
    - Dark-mode project images: remove forced dark gradient overlays; add a 1px inner border (`ring-1 ring-inset ring-border`) instead.
  - **Verification:** Lighthouse Accessibility contrast audit passes in both themes.

- [ ] **Task 4.3: Server/client boundary cleanup**
  - **Goal:** Ship less JS; no `'use client'` bleed.
  - **Files to touch:** `app/page.tsx`, all section components
  - **Changes:**
    - Run `grep -rn "use client" app components` and list every file.
    - Keep the directive ONLY on leaf islands: `ThemeToggle`, `Navbar` (scroll/active state), `ProjectFilter`, `ContactForm`, `CommandPalette`, `Reveal`, `ScrollProgress`, `LocalClock`.
    - Section shells (Hero text, Services, Open-source row, Footer) become Server Components; pass data via props from `data/*.ts`.
    - Lazy-load below-the-fold islands: `const CommandPalette = dynamic(() => import(...), { ssr: false })`.
  - **Verification:** `pnpm build` output shows reduced first-load JS vs. baseline from Task 1.1.

- [ ] **Task 4.4: Fix live clock hydration & animated counters**
  - **Goal:** The clock/counters render different values on server vs. client (the server HTML shows `0+` counters and a stale time).
  - **Files to touch:** `components/LocalClock.tsx`, `components/Stats.*`
  - **Changes:**
    - Clock: compute time only after mount (`useEffect`), use `Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit' })`, `tabular-nums`, update every 30–60s (no per-second re-renders), reserve width to avoid CLS. Render `<time dateTime>`.
    - Counters (if any survive Task 2.3): server-render the FINAL value; animate only as an enhancement, with `prefers-reduced-motion` skip.
  - **Verification:** No hydration warnings; view-source shows real values, not `0+`.

---

## Phase 5: Final Performance, A11y, and Build Audit

- [ ] **Task 5.1: `next/image` correctness**
  - **Goal:** The site currently requests images at `w=3840` (even the logo and portrait), meaning `sizes` is missing or wrong.
  - **Files to touch:** every `<Image>` usage, `next.config.*`
  - **Changes:**
    - Add accurate `sizes` to every image (e.g. project cards: `(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw`; logo: fixed `width/height`).
    - `priority` ONLY on the hero portrait (LCP) and logo if above the fold; everything else lazy.
    - Set explicit `width/height` or `fill` + aspect-ratio wrapper to prevent CLS; add `placeholder="blur"` for local static imports.
    - In `next.config`, set `images.formats: ['image/avif', 'image/webp']` and tighten `deviceSizes` to realistic values.
    - Re-export oversized screenshots (target ≤ 1600px wide, WebP/AVIF).
    - Meaningful `alt` text for portraits/screenshots; `alt=""` for decorative.
  - **Verification:** Network tab shows no image request wider than needed; CLS ≈ 0.

- [ ] **Task 5.2: SEO & metadata**
  - **Goal:** Complete, accurate metadata.
  - **Files to touch:** `app/layout.tsx`, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`
  - **Changes:**
    - Export `metadata` with `metadataBase`, `alternates.canonical`, `openGraph.images` and `twitter.images` (the page currently declares `summary_large_image` but no image). Generate `app/opengraph-image.tsx` (1200×630) with name + role in the site font.
    - Remove the obsolete `keywords` meta.
    - Add JSON-LD `Person` schema (name, jobTitle, url, sameAs: GitHub, LinkedIn, X) via a `<script type="application/ld+json">`.
    - Add `sitemap.ts` and `robots.ts`.
  - **Verification:** Run a social card validator or `curl -s https://localhost:3000 | grep og:image`; sitemap resolves.

- [ ] **Task 5.3: Accessibility pass**
  - **Goal:** Honor the "Accessible by Default / WCAG AA" claim, or remove it.
  - **Files to touch:** all components
  - **Changes:**
    - Heading hierarchy: single `h1`, section `h2`, card titles `h3` (no skipped levels; the About cards currently jump `h3` → `h4`).
    - All icon-only links/buttons have `aria-label`; decorative icons `aria-hidden="true"`.
    - Focus: visible focus ring on every interactive element; logical tab order; command palette traps focus and closes on `Esc`.
    - Touch targets ≥ 44×44px on mobile.
    - Form labels/errors as in Task 2.8; `lang="en"` on `<html>`.
    - Run `axe` (browser extension or `@axe-core/cli`) on both themes; fix all serious/critical issues.
  - **Verification:** axe: 0 serious/critical; full keyboard-only walkthrough succeeds.

- [ ] **Task 5.4: Responsive QA (375 / 768 / 1024 / 1440)**
  - **Goal:** No overflow, awkward wraps, or tiny tap targets.
  - **Files to touch:** any component with issues
  - **Changes:**
    - Test all four widths in both themes. Fix: horizontal scroll, clipped text, orphaned cards, oversized hero on small screens.
    - Mobile nav: full-height sheet with focus trap, closes on route/anchor click and `Esc`.
    - Verify `prefers-reduced-motion` and `prefers-color-scheme` on a real device or emulator.
  - **Verification:** `document.documentElement.scrollWidth === window.innerWidth` at 375px.

- [ ] **Task 5.5: Final build, Lighthouse, bundle and cleanup**
  - **Goal:** Prove the improvements and leave a clean repo.
  - **Files to touch:** `PLAN.md`, `package.json` (remove unused deps only)
  - **Changes:**
    - Run `pnpm lint`, `pnpm tsc --noEmit`, `pnpm build`.
    - Remove unused components/assets/dependencies found in Tasks 2.x (terminal, bars, particles).
    - Re-run Lighthouse (mobile) and compare to the Task 1.1 baseline. Targets: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100, CLS < 0.05, LCP < 2.0s.
    - Append an `## After` section with the new numbers and a short list of anything deferred.
  - **Verification:** All checks green; results recorded in this file; final commit `feat: final performance and a11y audit`.

---

## Appendix: Audit Findings (context for the agent)

**AI-generated tropes detected**
- Blue→purple gradient text on the hero and every section heading; same pill-eyebrow + heading + divider on every section.
- Centered hero with gradient-ringed portrait, chip row, and ambient glow/blobs.
- Self-rated skill progress bars ("Core Stack Radar") and vanity stats ("100% Commitment to Craft", counters starting at 0+).
- Fake terminal ("niloy --version v2.4.0", "sudo hire --now") and a `⌘K` control labeled "Menu".
- Four identical numbered icon-tile service cards; seven identical project cards with dark gradient overlays and a "Deep Dive" badge that links nowhere.
- "Open Source Work" repeats four featured projects with identical "Jan 2024" dates.
- Three near-identical centered CTA buttons; buzzword copy ("high-velocity", "Zero Shortcuts", "Engineered for Impact").

**Engineering issues detected**
- Images requested at `w=3840` (missing/incorrect `sizes`).
- Skip link targets `#top`; "Projects" nav item targets `#blog`.
- Live clock and counters differ between server HTML and client (hydration risk; counters render `0+` in SSR).
- Reveal animations leave headings/subtitles/profile-card header faded or clipped in the dark-mode capture.
- `theme-color` is fixed to dark navy for both themes; `twitter:card` is `summary_large_image` with no image declared; obsolete `keywords` meta present.
- Heading levels skip (`h3` → `h4`); icon-only social links lack accessible names.
- Orphaned 7th project card in the 3-column grid.

## Baseline

### Route First Load JS (`npm run build` on `main`)
```
Route (app)                                 Size  First Load JS
┌ ○ /                                    29.2 kB         190 kB
├ ○ /_not-found                            133 B         103 kB
├ ○ /admin                               6.45 kB         128 kB
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

