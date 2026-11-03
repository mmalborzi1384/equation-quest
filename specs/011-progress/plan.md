# Plan — Persistent progress dashboard

**Implemented under D30; locally verified, pending owner review.** Zustand persist versioned migration; derived progress selectors and Progress page.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: reload, duplicate award, migrate, corrupt storage and empty state. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Progress tracks actual completion of fraction lesson/practice and fraction objectives in stages 06–08; persisted rational answers must serialize canonical numerator/denominator strings, never raw BigInt.

## Phase 6 boundary
A pure one-time reward reducer and in-memory workshop store demonstrate idempotent progression. The real persisted dashboard and tests were subsequently implemented under D30.

## Phase 7 boundary
At the Phase 7 boundary, eight real levels and their one-time ordered in-memory rewards existed with **no persisted record or resume**. `/progress` clearly distinguishes temporary stage/map status from a durable save. D30 later provided that authorization; see Phase 8 report for measured behavior.

## Phase 8 acceptance addition (D28; planning only)

At implementation time first inventory every app-owned persisted key and map it to a visible in-context reset/delete control; retain a separate global delete-all on `/progress`. Include the existing persisted reduced-motion preference, not just new game data. Make category reset and global deletion deterministic, confirm destructive actions, clear store and storage consistently, and show truthful empty/default states without deleting unrelated localStorage keys. Exercise keyboard/touch, RTL labels, cancel/confirm, corruption/migration, duplicate actions, navigation and reload after each reset. Do not implement or mark these tasks done before explicit Phase 8 authorization.

## Phase 8 authorized implementation (D30)

Inventory keys: existing preference, newly persisted stage rewards/last level/best attempts/verified canonical rational answers, workshop rewards, and fraction-practice verified count/answer/next exercise. Use versioned Zustand persist with allowlisted fields, canonical BigInt string serialization, safe migration/validation and corruption fallback. Derive XP/crystals/achievements from verified IDs rather than trusting saved point totals. Add in-context reset buttons and a confirmed `/progress` global delete-all; ensure live state, storage and rehydration agree. Test each key, migrations, malformed JSON, duplicate credit, reload, navigation, cancellation, keyboard/touch and preservation of unrelated localStorage. Do not implement D29/Phase 9 effects or deploy.
