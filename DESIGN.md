# DESIGN.md — Engineering Portfolio Design System

## 1. Domain & Benchmark Direction
- **Domain:** Full-Stack Software Engineering Portfolio optimized for hiring managers, engineering leads, technical founders, and clients.
- **Reference Benchmark:** Technical minimalism inspired by production developer tools (Linear, Vercel, Stripe Docs) — proof-first layout, high scannability, crisp structural 1px hairlines, and frictionless conversion to resume, GitHub, and direct contact.

## 2. Color System (60-30-10 Balance & WCAG AA)
All palette tokens are defined in CSS custom properties in `app/globals.css` and mapped in `tailwind.config.mjs`.

### Dark Mode (Default)
- **60% Dominant Surface:** `#09090B` (Obsidian Slate)
- **30% Structural Surfaces & Borders:**
  - Elevated card surface: `#111114` (`zinc-900/70`)
  - Hairline borders: `#27272A` (`zinc-800`)
  - Primary foreground: `#FAFAFA` (`zinc-50`, >18:1 contrast)
  - Secondary body text: `#A1A1AA` (`zinc-400`, 7.7:1 contrast on `#09090B`)
- **10% Primary Accent & Semantic States:**
  - Primary brand accent: Emerald (`#34D399` `emerald-400` text, `#10B981` `emerald-500` active dots/rings — >10:1 on `#09090B`)
  - Primary CTA surface: High-contrast inverted monochrome (`#F4F4F5` bg / `#09090B` text)
  - Destructive / Error: `#FB7185` (`rose-400`) on dark surface

### Light Mode
- **60% Dominant Surface:** `#FAFAFA` (Warm Paper Neutral) & `#FFFFFF` (Elevated Cards)
- **30% Structural Surfaces & Borders:**
  - Hairline borders: `#E4E4E7` (`zinc-200`)
  - Primary foreground: `#09090B` (`zinc-950`, >18:1 contrast)
  - Secondary body text: `#52525B` (`zinc-600`, 7.0:1 contrast on `#FFFFFF`)
- **10% Primary Accent & Semantic States:**
  - Primary brand accent: Deep Emerald (`#047857` `emerald-700` text, `#059669` `emerald-600` icons — >5.4:1 on `#FFFFFF`)
  - Primary CTA surface: `#09090B` bg / `#FFFFFF` text
  - Destructive / Error: `#E11D48` (`rose-600`)

## 3. Typography (Strict 2-Font Pairing)
- **UI & Display Sans:** `Inter` (`--font-inter`)
  - Hero H1: `clamp(2.25rem, 4vw + 1rem, 3.75rem)`, `font-extrabold`, `tracking-[-0.03em]`, `leading-[1.08]`
  - Section H2: `clamp(1.625rem, 2.5vw + 0.5rem, 2.25rem)`, `font-bold`, `tracking-[-0.025em]`, `leading-[1.15]`
  - Body Copy: `14px`–`16px` (`text-sm` / `text-base`), `leading-relaxed` (`1.55–1.6`)
- **Monospace / Code / Metrics:** `JetBrains Mono` (`--font-mono`)
  - Applied to section indices, stack chips, dates, URLs, CLI elements, and all numeric metrics with `tabular-nums`.
  - Minimum font size: `12px` (`text-xs`) for readable labels and badges (no sub-11px illegible micro-copy).

## 4. Spacing, Layout Rhythm & Geometry
- **Grid Scale:** Strict `4px` / `8px` spacing rhythm (`gap-2`, `gap-4`, `gap-6`, `p-4`, `p-6`, `py-16` / `py-20`).
- **Container Width:** `max-w-6xl` (`1152px`) for optimal reading line length and scannable density without excessive horizontal spread.
- **Border Radius:** `rounded-md` (`6px`) for buttons, inputs, and chips; `rounded-lg` (`8px`) for cards, modals, and panels.
- **Section Hierarchy (Hiring Conversion Flow):**
  1. **Hero (Above-the-Fold):** Name, exact engineering role & availability, concrete shipped-work summary, core stack chips, focused primary CTAs (View Projects + Resume PDF + Direct Email), and compact verified Engineer Profile card.
  2. **Featured Shipped Work (`#projects`):** Top 6 curated flagship & production systems in a balanced 2-column grid (Problem → Architecture → Outcome), followed by a compact, filterable **Additional Shipped Systems** archive toggle so visitors see immediate proof without a 10,000px scroll wall.
  3. **Experience & Track Record (`#about`):** Chronological Career & Academic Ledger paired with verified live GitHub telemetry (`@niloykm`), timezone status, and an opt-in (collapsed by default) Interactive Workstation CLI.
  4. **Technical Capabilities & Stack (`#services`):** High-density 4-domain capability matrix + concise 5-layer stack specification table.
  5. **Direct Contact (`#contact`) & Footer:** Zero-friction email copy, direct `mailto:`, verified GitHub (`@niloykm`) & LinkedIn links, and validated inquiry form.

## 5. Micro-Interactions & Accessibility
- Fast transitions (`duration-150 ease-out`) with `prefers-reduced-motion` compliance.
- Crisp keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2`).
- Minimum `40px` touch/click targets on primary actions and mobile controls; `0px` horizontal overflow across `390px`, `768px`, and `1440px`.

## 6. Anti-Slop Enforcement
- Zero purple/blue mesh gradients, neon glows, floating blur blobs, or gratuitous glassmorphism.
- Zero emojis in headings, nav items, or buttons.
- Zero translucent low-contrast overlay pills over bright screenshots (all badges placed on solid opaque high-contrast dark surfaces or outside the image frame).
- Zero fabricated counters, placeholder names, or dead external links.
