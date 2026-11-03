# Checklist — Persistent progress dashboard

- [x] Scope specified in `spec.md`.
- [x] Planning assumptions and test gate recorded.
- [ ] Analyze feature against constitution and adjacent specs immediately before coding.
- [ ] Implement functional controls and navigation.
- [ ] Verify: reload, duplicate award, migrate, corrupt storage and empty state.
- [ ] Check RTL/LTR, keyboard/touch, reduced motion, errors/empty states as applicable.
- [ ] Run relevant anti-slop skill Delivery Gate (PASS/FAIL + evidence), record actual result here.
- [ ] Converge: update status, decisions, memory; mark completed only after tests.

- [x] Phase 1 planning scope cross-checked against A1–A5 and the signed/exact-fraction requirements (documentation review, not feature testing).
- [ ] Verify scope-specific tasks with actual evidence only after this feature is authorized and implemented.

- [ ] D28 (pending authorization): verify every persisted surface has a discoverable reset/delete action, including reduced-motion preference; global app-data deletion is confirmed and scoped.
- [ ] D28 (pending authorization): verify cancelled, selective and global deletion in memory, across routes and after reload; no unrelated keys removed or deleted data resurrected.
