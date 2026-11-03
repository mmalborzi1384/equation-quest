# Tasks — Home narrative and glass carousel

All tasks are **Planned**, not started. Execute only after owner go-ahead.

1. [ ] Review feature spec with owner decisions and analyze neighboring module contracts.
2. [ ] Define typed contract and data/content for this feature: GSAP/ScrollTrigger only for scroll narration; web DOM/CSS/SVG glass lens with pointer/keyboard, snap/focus and fallback.
3. [ ] Implement isolated component/domain logic with working navigation and meaningful fallback.
4. [ ] Add automated checks: desktop/mobile carousel links, focus controls, reduced motion, no-WebGL reading path.
5. [ ] Manually exercise keyboard, touch/mobile, RTL/LTR, reduced motion and error states; record observations.
6. [ ] Run anti-slop Delivery Gate; fix failures and document evidence.
7. [ ] Converge: update `docs/DEVELOPMENT_STATUS.md`, `PROJECT_MEMORY.md`, dependency/decision logs and extracted graph after code changes.

## Phase-specific small tasks (Planned; only execute when authorized)
- [ ] Author carousel destination map and Persian copy; test keyboard/touch routes to `/learning/fractions` and reduced-motion navigation.
- [ ] Record independent tests and anti-slop gate evidence before feature completion.

## Phase 2 structure subset (owner authorized)
- [x] Implement RTL Home layout with narrative section structure and responsive CSS balance/island motif.
- [x] Implement a web CSS glass-inspired carousel with real lesson destinations, button/dot/keyboard/swipe navigation and reduced-motion support.
- [x] Test controls and fraction destination in jsdom; full GSAP cinematic narrative, browser-visual verification and gameplay integration remain Phase 3+ tasks above (not checked).

## Phase 3 execution (owner authorized; original roadmap)
- [x] Refined Home chapter copy, bridge/balance/island illustration and existing meaningful route links. No game 3D or lesson mechanics.
- [x] Scoped GSAP/ScrollTrigger chapter heading reveals/parallax with OS/user reduced-motion and route cleanup; reading path remains visible without GSAP.
- [x] DOM/CSS/SVG decorative glass lens, pointer tilt, focus transfer for side-card activation, keyboard/touch and solid no-backdrop-filter fallback. Fraction lesson deep link remains a navigable Phase 2 preview.
- [x] 31 Vitest, 5 headless Chromium Playwright E2E, full lint/format/typecheck/build, anti-slop review, graph/memory/status/report. Actual touch hardware, screen-reader and public Pages remain future QA/deployment gates.
