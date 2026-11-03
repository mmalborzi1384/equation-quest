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

## Owner addition — data control for every persisted surface (D28; planned)

Every category actually saved by the application must expose a clearly named, keyboard/touch-accessible **reset/delete control in the UI where it is used or managed**, and `/progress` must expose a global **delete all app-owned saved data** action. Inventory all storage keys before implementation, including the existing `equation-quest-preferences` reduced-motion setting and any future stage completion/reward, workshop, fraction practice or last-stage records. Distinguish resetting a category to defaults from deleting all saved data; explain the scope and irreversibility, require confirmation for destructive bulk deletion, and do not erase unrelated browser/site data. A successful action must update live Zustand/UI state *and* storage so neither a route change nor reload resurrects cleared data. Test each saved category, selective reset, cancel/confirm, duplicate reset, cross-route state, reload, migration and corrupt-store recovery. **No implementation is authorized yet.**
