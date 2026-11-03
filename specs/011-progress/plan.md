# Plan — Persistent progress dashboard

**Draft, not executed.** Zustand persist versioned migration; derived progress selectors and Progress page.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: reload, duplicate award, migrate, corrupt storage and empty state. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Progress tracks actual completion of fraction lesson/practice and fraction objectives in stages 06–08; persisted rational answers must serialize canonical numerator/denominator strings, never raw BigInt.

## Phase 6 boundary
A pure one-time reward reducer and in-memory workshop store demonstrate idempotent progression. The real persisted dashboard, save migration, corruption/reload tests and actual stage resume remain Phase 8 and must not be claimed now.

## Phase 7 boundary
Eight real levels and their one-time ordered in-memory rewards now exist, but **no persisted record or resume**. `/progress` clearly distinguishes temporary stage/map status from a durable save. Do not claim migrations/reload retention or convert the Phase 7 store into persistence before separate Phase 8 authorization.
