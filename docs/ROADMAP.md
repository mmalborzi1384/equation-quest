# Task-sized implementation roadmap (requires owner approval)

All feature tasks/acceptance criteria are in `specs/NNN-*/tasks.md` (12 original sets plus `013-fractions`). Sequence reflects dependencies, not an excuse to drop scope. Gates: typecheck/lint/unit for domain, RTL/Playwright for UI, anti-slop PASS/FAIL before each feature is called complete.

| Phase | Independently testable increment | Exit evidence |
|---|---|---|
| 00 | Repo/tools/spec/graph/design research | Preparation report and owner sign-off |
| 01 | Ratify product/game/education/design specifications; map eight core lessons plus fraction route, exact-rational engine contract and level sequence | A1–A5 recorded, 13 feature specs reviewed, Phase 1 checklist/report submitted for separate owner acceptance |
| 02 | Vite strict TS/router/layout/RTL/navigation for all planned routes (not complete lessons) | route smoke and back/404/mobile nav; no placeholder feature claimed complete |
| 03 | Home narrative/carousel/web glass | keyboard/touch/route carousel tests; reduced motion |
| 04 | Overview + eight independent core concept lessons + fraction lesson/practice, incrementally; implement minimum pure exact-rational math checker before interactive grading (A5) | topic/route, integer/signed/fraction feedback and exact-answer tests, each lesson independently verified |
| 05 | R3F world scene/camera/controls/interaction | desktop/mobile/low quality input smoke |
| 06 | extend the Phase 04 pure math core with puzzle/level manager/progression integration | exact-rational and integer unit tests, mistake-specific hints and one-time reward |
| 07 | four islands with two distinct levels each; fractions introduced in 06, developed in 07 and assessed in 08 | stage objective/lock/unlock tests per level, fractional worked paths and verification |
| 08 | real persisted progress dashboard **and reset/delete controls wherever app data is saved** (D28) | reload/corrupt-save/duplicate reward; each saved category has in-context reset, confirmed global app-data deletion, no resurrection after reload; unrelated browser data preserved |
| 09 | integrate, accessibility/mobile/quality/performance; game-derived background image, restrained liquid-glass buttons (D28), and scroll-led section/text reveals (D29) | Playwright journeys, measured budget, anti-slop skills used during optimization with Delivery Gate; optimized authentic game imagery, readable/fallback controls, keyboard/touch/contrast/reduced-motion/no-WebGL checks; mobile/desktop scroll-entry, Persian typing reveal, accessible full-text and no-animation fallback tests |
| 10 | CI and Pages deploy only after documented grade-7 curriculum/Persian content review | CI green; deployed hash deep link/assets and curriculum review verified |

**Current authorization (D30):** the earlier D28 hold on Phase 08 was reversed; Phase 08 is implemented on open PR #8 and awaiting owner review. Phase 09 and deployment remain unauthorized.
