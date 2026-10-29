# Portfolio Redesign Implementation Plan

## 1. Project Overview & Aesthetic Architecture

**Design Philosophy: High-Density Craft Minimalism & Utility ("The Utility Terminal")**
The goal is to build a portfolio that reflects the precision of a senior software engineer. The UI resembles a refined technical document, IDE, or terminal interface rather than a generic startup landing page.

**Anti-Patterns to Avoid:**
*   NO soft rounded corners (`border-radius > 2px` is forbidden; strict `0px` radius).
*   NO box-shadows or glow effects.
*   NO muddy grays; stick to high-contrast pure black (`#000000`) and pure white (`#FFFFFF`).
*   NO generic mesh gradients or glassmorphism.
*   NO display serifs; use strict geometric sans-serif (`Geist`) and crisp monospace (`JetBrains Mono`).
*   NO standard component library templates without heavy restyling.
*   NO generic SVG icons where ASCII/monospace glyphs (`->`, `//`, `[ ]`) communicate better.

**Design Tokens & CSS Variables (Tailwind Setup):**
```css
/* Base tokens to inject into global CSS / Tailwind config */
:root {
  --bg-primary: #ffffff;
  --text-primary: #111111;
  --text-muted: #666666;
  --border-subtle: #e5e5e5;
  --accent-color: #0055FF;
  --font-sans: 'Geist', 'Inter', sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', monospace;
  --radius-strict: 0px;
}

.dark {
  --bg-primary: #000000;
  --text-primary: #ededed;
  --text-muted: #888888;
  --border-subtle: #222222;
  --accent-color: #0055FF;
}
```

## 2. Information Architecture & Content Strategy

*   **Hero / Header:**
    *   *Structure:* Monolithic text. A single, powerful statement in large geometric sans-serif.
    *   *Meta:* A right-aligned strict monospace grid detailing current status, location, live local time, and key links (GitHub, Email) formatted like JSON / terminal output.
*   **Selected Works / Projects (Deep Dive):**
    *   *Structure:* A harsh 12-column blueprint grid. Solid `1px` borders divide each project and internal cell.
    *   *Content:* Project title, Year/Kind (monospace), 1-sentence problem statement, Technical Architecture (bulleted engineering approach & stack), and raw, unadorned monospace links (`[LIVE ->]`, `[SOURCE ->]`, `[CASE_FILE ->]`).
    *   *Visuals:* Clean, high-res screenshots without generic browser wrappers. Raw UI overlaid with a monochrome filter at rest, revealing full color on hover.
*   **Technical Capabilities / Architecture Skills:**
    *   *Structure:* Categorized lists (`[FRONTEND]`, `[BACKEND]`, `[DATA]`, `[INFRASTRUCTURE]`) using monospace brackets.
    *   *Rule:* No progress bars. Raw lists of technologies with interactive cross-highlighting against shipped projects.
*   **Experience / Timeline:**
    *   *Structure:* A strict chronological list on the 12-column grid. Left column: Year / Role type (monospace). Right column: Role, Organisation, and a brief description of high-impact engineering work.
*   **Contact / Footer:**
    *   *Structure:* Minimalist. A `mailto:` link formatted cleanly (`niloykumarmohonta@gmail.com`), copy action, closing statement, and a terminal colophon with live commit SHA.

## 3. Component Specification & File Structure

*   `components/Layout.tsx`: Global wrapper, standard max-width blueprint frame (`max-w-5xl` / `max-w-6xl`), persistent utility top bar, and colophon footer.
*   `components/Typography.tsx`: Reusable `Heading`, `Body`, and `MonoText` components enforcing the strict geometric sans + monospace typographic scale.
*   `components/GridContainer.tsx`: Utility wrapper enforcing the `1px` visible border 12-column blueprint layout.
*   `components/HeroSection.tsx`: Monolithic geometric sans-serif introduction + right-hand monospace terminal/JSON status ledger.
*   `components/ProjectItem.tsx`:
    *   *Props:* `title`, `year`, `description`, `stack` (array), `links` (object), `imageSrc`, plus engineering depth fields (`problem`, `approach`, `architecture`, `slug`, `index`).
    *   *Interaction:* Hard `1px` borders, 100ms snappy transitions, color-inverting hover states and sharp `--accent-color` active indicators, raw monochrome-to-color screenshot preview.
*   `components/ExperienceList.tsx`: Maps over `data/experience.ts` to render the strict chronological blueprint timeline.
*   `components/ThemeToggle.tsx`: A simple `<button>` that swaps the `.dark` class on the HTML root using monospace text `[LIGHT]` / `[DARK]` (no sun/moon icons).

## 4. Step-by-Step Execution Sequence

1.  **[x] Step 1: Base Styling & Token Setup**
    *   Configure strict geometric Sans (`Geist`) and Mono (`JetBrains Mono`) fonts (remove `Instrument Serif`).
    *   Set up `app/globals.css` and `tailwind.config.mjs` mapping to the strict CSS variables (`#FFFFFF` / `#000000`, `#111111` / `#EDEDED`, `#E5E5E5` / `#222222`, `#0055FF`, `0px` border radius, 100ms transitions).
2.  **[x] Step 2: Layout & Theme Provider Implementation**
    *   Build `components/ThemeToggle.tsx` with pure monospace `[LIGHT]` / `[DARK]` toggle and inverted hover state.
    *   Build `components/Typography.tsx`, `components/GridContainer.tsx`, and `components/Layout.tsx` with pure black/white background and structural `1px` blueprint borders.
3.  **[x] Step 3: Core Section Builds (Iterative)**
    *   *Build Hero (`components/HeroSection.tsx`):* Monolithic sans-serif intro + monospace terminal/JSON metadata grid.
    *   *Build Projects (`components/ProjectItem.tsx`):* Hard `1px` borders, raw unframed monochrome-to-color screenshots, architectural breakdown, and 100ms color-inversion micro-interactions.
    *   *Build Skills & Experience (`components/ExperienceList.tsx`, `components/sections/Stack.tsx`):* `[FRONTEND]`, `[BACKEND]`, `[DATA]`, `[INFRASTRUCTURE]` bracketed monospace categories and strict chronological timeline.
4.  **[x] Step 4: Responsive Refinement & Edge Cases**
    *   Ensure the 12-column blueprint grid collapses cleanly to a single column on mobile (`375px`+) without doubled or misaligned borders.
    *   Update `/work/[slug]` and `/notes` routes to match the monolithic utility aesthetic.
5.  **[x] Step 5: Performance, SEO, & Accessibility Checks**
    *   Verify semantic HTML tags (`<main>`, `<section>`, `<article>`), ARIA labels, contrast ratios, build output, and Playwright E2E tests.
