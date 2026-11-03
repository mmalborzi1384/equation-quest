# Tasks — Learning overview

All tasks are **Planned**, not started. Execute only after owner go-ahead.

1. [ ] Review feature spec with owner decisions and analyze neighboring module contracts.
2. [ ] Define typed contract and data/content for this feature: Overview page data-driven concept map; shared lesson entry routes; no empty subsections.
3. [ ] Implement isolated component/domain logic with working navigation and meaningful fallback.
4. [ ] Add automated checks: click each concept, check destination and example rendering in RTL/LTR.
5. [ ] Manually exercise keyboard, touch/mobile, RTL/LTR, reduced motion and error states; record observations.
6. [ ] Run anti-slop Delivery Gate; fix failures and document evidence.
7. [ ] Converge: update `docs/DEVELOPMENT_STATUS.md`, `PROJECT_MEMORY.md`, dependency/decision logs and extracted graph after code changes.

## Phase-specific small tasks (Planned; only execute when authorized)
- [ ] Map nine topic IDs to unique routes, objectives, exercise entry controls and prerequisites; test every destination and repeatable fraction practice entry.
- [ ] Record independent tests and anti-slop gate evidence before feature completion.

## Phase 4 execution (explicitly authorized)
- [x] Build pure rational/checking core with exact tests before grading UI (11 engine tests).
- [x] Author nine distinct lessons and independent repeatable fraction practice with integer → signed → fraction scaffolding; external grade-7 review pending.
- [x] Implement reusable accessible DOM visual/step/KaTeX/practice components and engine-backed feedback.
- [x] Verify nine routes, math, RTL/mobile at 320/390/768/1280px, keyboard, reduced-motion/no-WebGL, lint/build, anti-slop and update docs/graph/report (54 Vitest + 9 Chromium E2E).
