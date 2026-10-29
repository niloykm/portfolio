# Content Needed (`TODO(niloy)`)

Every item below corresponds to a `TODO(niloy)` marker in `data/*.ts`. All optional fields that are `undefined` render **nothing** on the live site until filled in.

## 1. Profile (`data/profile.ts`)

| Line | Field | What is needed |
|---|---|---|
| `data/profile.ts:8` | `profile.github` | Confirm primary GitHub handle (`niloykm` vs `niloydiu`). Currently set to `niloykm` per Plan.md §5. |
| `data/profile.ts:9` | `profile.linkedin` | Confirm canonical LinkedIn URL (e.g. `https://www.linkedin.com/in/niloykumarmohonta000/`). |
| `data/profile.ts:10` | `profile.x` | Confirm canonical X / Twitter URL (e.g. `https://x.com/niloykmohonta`). |
| `data/profile.ts:11` | `profile.resumeUrl` | Confirm résumé path/URL (e.g. `/niloy.pdf` or `/resume.pdf`). |
| `data/profile.ts:16` | `profile.now.href` | Add Gen Stella IT website URL if public. |

## 2. Experience (`data/experience.ts`)

| Line | Field | What is needed |
|---|---|---|
| `data/experience.ts:15` | `Gen Stella IT.period` | Start date / period (e.g. `2024 — Present`). |
| `data/experience.ts:19` | `Gen Stella IT.href` | Public company URL, if any. |
| `data/experience.ts:25` | `ScholarPASS.period` | Start and end dates / period. |
| `data/experience.ts:28` | `ScholarPASS.href` | Public URL, if any. |
| `data/experience.ts:34` | `TripBooking.ai.period` | Contract period / dates. |
| `data/experience.ts:37` | `TripBooking.ai.href` | Public URL (`https://tripbooking.ai` if applicable). |
| `data/experience.ts:43` | `TutorsPlan.period` | Role dates / period. |
| `data/experience.ts:46` | `TutorsPlan.href` | Public URL, if any. |

## 3. Projects (`data/projects.ts`)

| Line | Project & Field | What is needed |
|---|---|---|
| `data/projects.ts:23` | `newcare.year` | Confirm build year (e.g. `'2024'`). |
| `data/projects.ts:37` | `newcare.tradeoffs` | Add 1–3 concrete engineering trade-offs (`{ decision, alternative, why }`). |
| `data/projects.ts:38` | `newcare.impact` | Add sourced metrics (`{ label, value, source }`) if real data exists. |
| `data/projects.ts:60` | `handson.year` | Confirm build year. |
| `data/projects.ts:74` | `handson.tradeoffs` | Add 1–3 concrete engineering trade-offs (`{ decision, alternative, why }`). |
| `data/projects.ts:75` | `handson.impact` | Add sourced metrics (`{ label, value, source }`) if real data exists. |
| `data/projects.ts:97` | `ndemy.year` | Confirm build year. |
| `data/projects.ts:110` | `ndemy.tradeoffs` | Add 1–3 concrete engineering trade-offs (`{ decision, alternative, why }`). |
| `data/projects.ts:111` | `ndemy.impact` | Add sourced metrics (`{ label, value, source }`) if real data exists. |
| `data/projects.ts:133` | `nobot.year` | Confirm build year. |
| `data/projects.ts:139` | `nobot.problem` | Problem statement (1–2 sentences) for `/work/nobot`. |
| `data/projects.ts:158` | `inventory-management.year` | Confirm build year. |
| `data/projects.ts:164` | `inventory-management.problem` | Problem statement (1–2 sentences) for `/work/inventory-management`. |
| `data/projects.ts:183` | `qr-code-studio.year` | Confirm build year. |
| `data/projects.ts:189` | `qr-code-studio.problem` | Problem statement (1–2 sentences) for `/work/qr-code-studio`. |
| `data/projects.ts:208` | `nrl-url-shortener.year` | Confirm build year. |
| `data/projects.ts:214` | `nrl-url-shortener.problem` | Problem statement (1–2 sentences) for `/work/nrl-url-shortener`. |
| `data/projects.ts:233` | `robendev-handson.year` | Confirm build year. |
| `data/projects.ts:239` | `robendev-handson.problem` | Clarify whether `roBenDevHandsOn` should remain a separate open-source entry or be merged with `HandsOn`. |
