# Task-sized implementation roadmap (requires owner approval)

All feature tasks/acceptance criteria are in `specs/NNN-*/tasks.md`. Sequence reflects dependencies, not an excuse to drop scope. Gates: typecheck/lint/unit for domain, RTL/Playwright for UI, anti-slop PASS/FAIL before each feature is called complete.

| Phase | Independently testable increment | Exit evidence |
|---|---|---|
| 00 | Repo/tools/spec/graph/design research | Preparation report and owner sign-off |
| 01 | Clarify curriculum, art, Pages controls; approve specs | Decisions updated; unresolved entries marked |
| 02 | Vite strict TS/router/layout/RTL/navigation | route smoke and back/404/mobile nav |
| 03 | Home narrative/carousel/web glass | keyboard/touch/route carousel tests; reduced motion |
| 04 | Overview + three lessons, one at a time | each manipulation and feedback independently tested |
| 05 | R3F world scene/camera/controls/interaction | desktop/mobile/low quality input smoke |
| 06 | pure math engine then puzzle/level manager/progression | unit tests, mistake-specific hints and one-time reward |
| 07 | four islands with two distinct levels each | stage objective/lock/unlock tests per level |
| 08 | real persisted progress dashboard | reload/corrupt-save/duplicate reward tests |
| 09 | integrate, accessibility/mobile/quality/performance | Playwright journeys, measured budget, anti-slop gates |
| 10 | CI and Pages deploy | CI green; deployed hash deep link and assets verified |
