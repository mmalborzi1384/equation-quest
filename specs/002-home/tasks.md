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
