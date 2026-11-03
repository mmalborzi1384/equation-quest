# Tasks — Persistent progress dashboard

All tasks are **Planned**, not started. Execute only after owner go-ahead.

1. [ ] Review feature spec with owner decisions and analyze neighboring module contracts.
2. [ ] Define typed contract and data/content for this feature: Zustand persist versioned migration; derived progress selectors and Progress page.
3. [ ] Implement isolated component/domain logic with working navigation and meaningful fallback.
4. [ ] Add automated checks: reload, duplicate award, migrate, corrupt storage and empty state.
5. [ ] Manually exercise keyboard, touch/mobile, RTL/LTR, reduced motion and error states; record observations.
6. [ ] Run anti-slop Delivery Gate; fix failures and document evidence.
7. [ ] Converge: update `docs/DEVELOPMENT_STATUS.md`, `PROJECT_MEMORY.md`, dependency/decision logs and extracted graph after code changes.

## Phase-specific small tasks (Planned; only execute when authorized)
- [ ] Define fraction mastery/attempt data and safe rational serialization/migration; test reload, exact-answer restore and no double rewards.
- [ ] Record independent tests and anti-slop gate evidence before feature completion.

## Additional Phase 8 tasks requested by owner (D28; all pending)
- [ ] Inventory every app-owned persisted key/category (including the existing reduced-motion preference) and map each to an in-context reset/delete control.
- [ ] Provide `/progress` global delete-all with confirmation and precise scope; preserve unrelated browser/site data.
- [ ] Keep storage and active in-memory state synchronized after category reset or delete-all; verify defaults/empty states immediately and after reload.
- [ ] Test each data category, cancel/confirm, repeat deletion, cross-route behavior, corrupt/migrated saves, keyboard and touch. Record actual evidence before checking this off.
