# Phase 8: local progress and data controls (2026-11-03)

**Status:** implementation and local automated verification passed on `arena/260614e7-equation-quest`, PR #8 open. Owner accepted Phase 8 (D31); PR merge was not requested. No PR merge, Phase 9 work, deployment, cloud backup, user account or server save.

## What persists

| Local key | Saved, validated fields | In-context reset |
|---|---|---|
| `equation-quest-level-progress` | Ordered verified stage IDs, derived points/earned IDs, best mistake count, canonical last verified rational per stage, last verified stage ID | `/world`, `/game`, each `/game/level/:id`, `/progress` |
| `equation-quest-workshop-progress` | Ordered verified workshop trials, derived separate points | `/game` lab, `/progress` |
| `equation-quest-fraction-practice` | Sequential verified-exercise count, canonical last answer, next exercise | `/learning/fractions`, `/progress` |
| `equation-quest-preferences` | Reduced-motion preference | footer on every route, `/progress` |

All four stores use Zustand persist schema version 1, partial allowlisted storage, migration/sanitization, and scoped `clearStorage()` plus live-state reset. Stage points/achievements/crystals are derived from verified ordered stage IDs, not stored inflated totals; workshop points are separate. Rational answers store canonical decimal **strings** for numerator/denominator, not raw BigInt. Reload resumes *completed verified outcomes*, not the unfinished in-progress puzzle. Corrupt JSON falls back to defaults; malformed/out-of-order records do not unlock later stages. `/progress` has contextual category resets and a confirmation-protected global delete-all; unrelated origin keys survive.

## Verification actually performed

- `EXPECTED_BRANCH=arena/260614e7-equation-quest bash scripts/verify-environment.sh --full`: PASS, including pinned dependencies, lint, Prettier, TypeScript, **90 Vitest tests** and production build. Pre-existing lazy R3F chunk warning remains (~925 kB minified).
- `LD_LIBRARY_PATH=/tmp/al2023/lib EQ_CHROMIUM_PATH=/tmp/chromium npm run test:e2e`: **29/29 PASS**, headless Chromium 153. The browser and NSS libs came from temporary `@sparticuz/chromium@153.0.0` npm extraction in `/tmp`, not a project dependency. Browser tests verify eight complete stage journeys, reload-retained ordered unlocks, global deletion relocking after route changes/reload, workshop duplicate credit and selective reset, fraction verification/resume/delete, preference persistence and reset, cancel/confirm/repeat/global deletion, unrelated key survival, keyboard Enter/Escape and emulated touch at 320px. Existing WebGL, no-WebGL, RTL lesson/math, Home/motion, 320/390/768/1280px overflow and 9px button-like corners regressions passed.
- Graphify extract/cluster/update refreshed the knowledge graph: 1260 nodes / 2086 edges / 140 communities; an existing incremental filter-change warning does not affect app behavior.
- Empty `/progress` and populated/live reset were checked with React Testing Library; domain tests cover version 0 migration to version 1, malformed JSON fallback, wrong rational/out-of-order/inflated reward rejection, canonical fractional serialization, repeated category/global reset and rehydration. Manual screenshot inspection at 320px: RTL order, no horizontal overflow, legible empty cards and controls. Dev preview runs at `0.0.0.0:5173/equation-quest/`.

## Phase 8 visual/interaction QA gate

- **PASS, direction and purpose:** existing navy/ivory/Vazirmatn and balance-island vocabulary remain; dark summary highlights real verified totals, off-white cards separate the four actual storage categories, coral right rule marks irreversible global deletion. No new visual assets, fabricated rewards or generic marketing statistics were added. Page hierarchy is summary → stored outcomes → scoped deletion, not a landing-page template. ENERGY 1 / RHYTHM 1 / MOTION 0 for this data-management screen: no animation is required for a destructive action.
- **PASS, functional controls:** per-category reset and global confirmation have explicit scope, native buttons, cancellation, initial safe focus, Escape and focus return; domain + jsdom + Chromium click/tap/keyboard tests above. Route links have real destinations; saved values update immediately and do not resurrect after reload. At 320px the screenshot and browser overflow check passed; existing corner audit passed at 320/1280px.
- **Limitations, not certified:** no physical phone, hardware screen reader, independent WCAG color-contrast audit, other browser engines, user-study review or measured FPS. The vendored anti-slop skills' formal session-mode workflow was not invoked; the requested *during-optimization* use and formal Delivery Gate belong to **Phase 9**, which remains unauthorized. This section reports an evidence-based Phase 8 QA check only, not a Phase 9 design sign-off.
