# Tasks — App foundation and shared navigation

Phase 2 authorized by owner on 2026-11-03. Track actual work and tests below; remaining lesson/game feature tasks stay planned.

1. [ ] Review feature spec with owner decisions and analyze neighboring module contracts.
2. [ ] Define typed contract and data/content for this feature: Vite React TypeScript strict, CSS Modules tokens, Vazirmatn; route-level lazy loading; responsive shared navigation.
3. [ ] Implement isolated component/domain logic with working navigation and meaningful fallback.
4. [ ] Add automated checks: route smoke for / and all required paths; keyboard and mobile menu; hash refresh.
5. [ ] Manually exercise keyboard, touch/mobile, RTL/LTR, reduced motion and error states; record observations.
6. [ ] Run anti-slop Delivery Gate; fix failures and document evidence.
7. [ ] Converge: update `docs/DEVELOPMENT_STATUS.md`, `PROJECT_MEMORY.md`, dependency/decision logs and extracted graph after code changes.

## Phase-specific small tasks (Phase 2 authorized)
- [x] Specify route manifest for eight core topics and fraction lesson; add hash-route/nav/404 tests and distinguish future feature content from completed navigation.
- [x] Record independent tests and anti-slop gate evidence before feature completion (with explicit real-browser limitation).
