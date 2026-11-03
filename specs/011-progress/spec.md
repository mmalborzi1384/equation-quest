# Persistent progress dashboard

**Status:** Draft / awaiting owner approval. Portable specification; implementation branch is assigned per Arena session.

## User story
As a seventh-grade learner, I can use this feature to understand and practice equations without creating an account.

## Requirements
Actual XP/crystals/achievements/completion/best/last stage survive refresh; corrupted data recovers.

## Scope and constraints
Zustand persist versioned migration; derived progress selectors and Progress page. Persian RTL, mathematical LTR, desktop/mobile, accessible and usable without backend. Shared navigation and no dead controls. Refer to PRD, ROUTES, EDUCATIONAL_CONTENT and constitution for cross-cutting requirements.

## Acceptance evidence required
reload, duplicate award, migrate, corrupt storage and empty state. Do not mark completed without implementation, tests and anti-slop delivery gate.

## Phase 1 approved scope (A1–A5, including strengthened A2)
Progress tracks actual completion of fraction lesson/practice and fraction objectives in stages 06–08; persisted rational answers must serialize canonical numerator/denominator strings, never raw BigInt. This is a planning contract, not implemented behavior.
