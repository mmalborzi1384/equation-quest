# Plan — Persistent progress dashboard

**Draft, not executed.** Zustand persist versioned migration; derived progress selectors and Progress page.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: reload, duplicate award, migrate, corrupt storage and empty state. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Progress tracks actual completion of fraction lesson/practice and fraction objectives in stages 06–08; persisted rational answers must serialize canonical numerator/denominator strings, never raw BigInt.
