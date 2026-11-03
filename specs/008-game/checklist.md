# Checklist — 3D exploration and controls

- [x] Scope specified in `spec.md`.
- [x] Planning assumptions and test gate recorded.
- [x] Analyze authorized Phase 5 subset against constitution, roadmap, specs 007/008, performance and D22–D23.
- [x] Implement real 3D scene controls, inspectable markers, DOM alternatives and honest lesson/stage-preview links for Phase 5.
- [x] Verify movement mapping, keyboard WASD/arrows/E/Escape, held touch direction/marker tap/pause, quality DPR cap at device scale 2, WebGL context loss and no-WebGL fallback (unit + Chromium).
- [x] Check Persian RTL, isolated LTR coordinates, keyboard/held touch, OS/user reduced motion, loading and renderer/fallback errors in scoped Phase 5. Hardware screen reader and phone remain untested.
- [x] Manual anti-slop gate PASS for scoped Phase 5: purposeful procedural balance/bridge geometry and working map/quality/controls; 320/390/768/1280px Chromium screenshots/overflow; measured text contrast >=4.5:1 for sampled new palette pairs. See Phase 5 report for exceptions and evidence.
- [x] Converge Phase 5 subset: status, decisions, memory, graph and report updated; full 008 gameplay/puzzle feature still pending.

- [x] Phase 1 planning scope cross-checked against A1–A5 and the signed/exact-fraction requirements (documentation review, not feature testing).
- [x] Verify Phase 5 scope with 61 Vitest + 15 Chromium E2E and build after owner authorization (D22); Phase 6+ puzzle scope is not complete.
