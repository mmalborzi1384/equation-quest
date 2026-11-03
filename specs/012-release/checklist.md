# Checklist — Quality and GitHub Pages release

- [x] Scope specified in `spec.md`.
- [x] Planning assumptions and test gate recorded.
- [ ] Analyze feature against constitution and adjacent specs immediately before coding.
- [ ] Implement functional controls and navigation.
- [ ] Verify: CI run, deployed route/asset checks, responsive/a11y/reduced-motion and anti-slop gates.
- [ ] Check RTL/LTR, keyboard/touch, reduced motion, errors/empty states as applicable.
- [ ] Run relevant anti-slop skill Delivery Gate (PASS/FAIL + evidence), record actual result here.
- [ ] Converge: update status, decisions, memory; mark completed only after tests.

- [x] Phase 1 planning scope cross-checked against A1–A5 and the signed/exact-fraction requirements (documentation review, not feature testing).
- [ ] Verify scope-specific tasks with actual evidence only after this feature is authorized and implemented.

- [ ] Phase 9 planning (D28, not authorized): game-derived background, mobile/desktop crops, readability and static/no-WebGL fallback verified with measured image/performance budget.
- [ ] Phase 9 planning (D28, not authorized): glass-style button/CTA states tested for rounded corners, contrast, keyboard/touch, reduced motion, unsupported/slow blur fallback; evaluate reference license/dependency before use.
- [ ] Phase 9 planning (D28, not authorized): apply vendored anti-slop skills during optimization and record a real Delivery Gate before moving toward Phase 10.

- [ ] Phase 9 D29 (not authorized): verify lower sections appear on scroll and selected short Persian text reveals with clear typing-style timing; full accessible text, reduced-motion/no-JS fallback, RTL/LTR and measured mobile performance remain correct.

## D33 local preparation evidence (not Phase 10 completion)

- [x] Local 320/1280 production build route/asset/reload smoke and 320/390/768/1280 dev-preview overflow/error check recorded.
- [x] Existing Phase 9 game-derived image, 9px optical controls and scroll reveal corrected for reported jump; two full Chromium 38/38 passes, 90 Vitest and budget build passed.
- [x] Temporary axe-core automated WCAG 2/2.1 A/AA scan of seven routes at 320/1280px found no violations; no hardware/screen-reader certification.
- [ ] Independent grade-7 curriculum/Persian content review, security advisory decision, CI, live Pages checks and explicit deploy authorization. Phase 10 remains unexecuted.

## D34 implementation gate (current; prior planning-only lines are historical)

- [x] PR validation never deploys; main deployment waits for green validation.
- [x] Local canonical setup/full checks, 90 unit, 38 Chromium, measured budgets and isolated production preview smoke pass.
- [x] No new app UI, production dependency, repository secret or irreversible release freeze; maintainability and rollback documented.
- [x] Anti-slop scoped release gate recorded in `docs/PHASE_10_RELEASE_REPORT.md`.
- [x] PR #10 CI validation passed (`41638949454`); no deploy on PR.
- [ ] Observe main Actions deployment/public host smoke before claiming public release.
- [ ] External curriculum/Persian specialist review and physical/device/screen-reader/alternate-browser checks: explicitly outstanding with owner-approved publication exception, not certified as PASS.
