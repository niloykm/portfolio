# GEMINI.md — Engineering Portfolio Governance & Standards

## Project Identity
- **Owner:** Niloy Kumar Mohonta (`niloykumarmohonta@gmail.com`)
- **Primary Live URL:** `https://niloykm.vercel.app/`
- **Verified GitHub Handle:** `niloykm` (`https://github.com/niloykm`) — note: legacy `niloydiu` profile URL returns HTTP 404; always use `https://github.com/niloykm`.
- **Verified LinkedIn:** `https://www.linkedin.com/in/niloykumarmohonta000/`
- **Current Role:** Full-Stack Software Engineer at ScholarPASS (2025 – Present), B.Sc. in CSE at Daffodil International University (2022 – 2026).

## Engineering & Data Integrity Rules
1. **Single Source of Truth:** Keep `data/projects.ts` and `data/portfolio-data.json` synchronized with verified live deployments and working GitHub URLs (`github.com/niloykm/*`). Never link to 404 URLs.
2. **Real Metrics Only:** Fetch live GitHub repository counts from `https://api.github.com/users/niloykm` (24h ISR cache) without inflating counts upward. Never display vanity percentages such as "100% Commitment to Craft".
3. **Private Project Exclusion:** Never include personal or private projects (such as `tithyniloy`) in showcase data, API responses, command palettes, or terminal outputs.
4. **Honest Career Ledger:** Keep role titles, organizations, and technologies strictly aligned across Hero, Experience Timeline, Skills, Interactive CLI, and Footer (do not re-introduce removed affiliations like `Gen Stella IT` or `n8n`).
5. **Strict TypeScript & Modular Architecture:** Maintain clean, modular React components, strong prop/data types, and zero build/lint/runtime errors.

## UI/UX & Anti-Slop Standards
- Follow `DESIGN.md` strictly for all colors, typography, spacing, and radii.
- Enforce WCAG AA contrast (`>= 4.5:1` for body/labels, `>= 3:1` for large text and UI boundaries) in both Dark (`#09090B`) and Light (`#FAFAFA`/`#FFFFFF`) themes.
- Avoid purple/indigo gradients, neon glows, floating blobs, gratuitous glassmorphism, emojis in UI controls/headings, and generic 3-column feature-card templates.
- Verify every visual change in a real browser at desktop (`1440x900`) and mobile (`390x844`) viewports with zero console errors and zero horizontal overflow.
