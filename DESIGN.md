# PORTFOLIO DESIGN & ARCHITECTURE SYSTEM

## 1. Visual Theme & Surfaces
- Palette: Deep, sophisticated dark mode base (`#09090b` zinc-950) or crisp light mode (`#ffffff`) using strict monochromatic scales with a single intentional accent (e.g., emerald or crisp white borders, not neon purple).
- Borders: 1px ultra-subtle structural lines (`border-neutral-200 dark:border-neutral-800`) over heavy shadows.
- Typography: High-contrast scale. Hero headers with tight tracking (`tracking-tight`), body text in clean sans-serif (`Inter` or `Geist`), and all metrics/code/timestamps in monospace tabular figures (`font-mono tabular-nums`).

## 2. Layout & Information Density
- Avoid empty whitespace padding traps. Prioritize high-density engineering credibility: stack technologies, architecture decisions, scale metrics, and live project links cleanly.
- Hero Section: Strikingly direct hook. Name, title (Full-Stack Software Engineer & Co-Founder at Gen Stella IT), core tech stack chips, and dual CTA ("Explore Projects" & "View Resume/GitHub").
- Projects Showcase: Rich technical breakdowns covering tech stack (`Next.js`, `NestJS`, `PostgreSQL`, `TypeScript`, `Tailwind`), scale, and architectural challenges solved—not just a screenshot with a title.

## 3. Micro-Interactions & Motion
- Fast, tactile transitions (`duration-150 ease-out`).
- Active button scales (`active:scale-[0.98]`).
- Crisp keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-offset-2`).

## 4. Anti-Slop Governance Rules
- **Zero Purple/Indigo Glow Spheres:** No background radial blur blobs, floating neon circles, or ungrounded ambient gradients.
- **No Generic 3-Column Bento Grids:** Use asymmetric editorial grids, structured architectural ledgers, dense data rows, and tabular engineering timelines.
- **No Fluffy AI Buzzwords:** Every line of copy must state concrete systems, architectures, protocols, or quantified engineering outcomes.
- **Crisp Enterprise Geometry:** Restrict container border radii to `rounded-md` (6px) and `rounded-lg` (8px); avoid pill-heavy `rounded-3xl` cards.
- **WCAG AA Contrast Compliance:** Enforce high-contrast foregrounds (`zinc-900` / `zinc-100`) and legible secondary text (`zinc-600` / `zinc-400`) on clean `zinc-950` / `white` surfaces.
