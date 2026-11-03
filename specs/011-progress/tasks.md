# Tasks — Persistent progress dashboard (D30 authorized)

1. [x] Reviewed feature spec, adjacent store/domain contracts and owner corrections.
2. [x] Defined version 1 allowlisted Zustand records, safe migration, derived rewards and truthful Progress content.
3. [x] Integrated stage/workshop/fraction verification and navigation with contextual reset controls, confirmed global delete-all and reduced-motion reset.
4. [x] Added tests for reload, duplicate reward, version migration, corrupt storage, invalid records, empty state and deletion; 90 Vitest passed.
5. [x] Exercised browser keyboard, emulated mobile touch, RTL/LTR, reduced motion, empty/error and reset states: 29 Chromium E2E passed; manual 320px screenshot inspected. Physical phone/screen reader and other browser engines not claimed.
6. [x] Ran Phase 8 evidence-based UI/copy/design QA in `docs/PHASE_08_IMPLEMENTATION_REPORT.md`: controls, purpose, layout, empty states and mobile corners checked. Formal vendored antislop **during** workflow belongs to unauthorized Phase 9; not claimed here.
7. [x] Updated status, memory, decision D30, dependency map and verification evidence; no new dependency. Graphify extract/cluster/update refreshed the graph (1260 nodes, 2086 edges, 140 communities); graph extraction is not application verification.

## D28 app-data owner controls

- [x] Inventoried exactly four app-owned keys; added in-context reset for each, including existing motion preference.
- [x] Confirmed `/progress` delete-all removes only app-owned categories and explains scope.
- [x] Kept storage and active state synchronized and verified empty/default states immediately and after reload.
- [x] Checked cancellation, repeated deletion, cross-route relock, corruption/migration, keyboard and emulated touch in automated suites. See Phase 8 report for real results and nonclaims.
