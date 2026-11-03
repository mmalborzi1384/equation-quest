# Equation Quest — project memory index

**Status (2026-11-03): Phases 1–4 accepted and merged; Phase 4 PR #4 merged at `ea1c52c`. Phase 5 R3F exploration workshop, desktop/mobile controls and fallback implemented on `arena/bdc71c3b-equation-quest`, awaiting owner review.** Phase 6+ gameplay/rewards and deployment not authorized.

## Permanent execution protocol
Read [PHASE_EXECUTION_PROTOCOL.md](PHASE_EXECUTION_PROTOCOL.md) **before every phase**. Wait for explicit phase authorization. Outputs are phase-specific: Phase 1 requires validated specifications, updated docs and a validation/approval report; implementation phases require executable app code and test evidence. Protocol maintenance in this turn is not a product phase.

## Goal and constraints
Grade 7 Persian (RTL) single-player 3D isometric puzzle adventure teaching first-degree equations through balance, unknowns, signed coefficients, inverse operations, **required exact fractional equations/answers**, and verification. Independent fraction lesson/practice plus staged levels 06–08 are mandatory; grade-7 curriculum/Persian copy review is required before public release. Desktop + mobile; static GitHub Pages; no account/backend. Eight levels, four islands; all controls real. Latest explicit user decisions override this index.

## Architecture (Phases 1–7 implementation; persisted progress remains planned)
Vite + React 19 + strict TypeScript; React Router `HashRouter`, base `/equation-quest/`; page-level lazy chunks; React Three Fiber isolated scenes; pure equation/puzzle domain modules; Zustand persist with schema migration; CSS Modules/tokens; KaTeX LTR islands. See [Architecture](docs/ARCHITECTURE.md), [Routes](docs/ROUTES.md), [Dependency map](docs/DEPENDENCY_MAP.md) and [Graphify bootstrap](docs/GRAPHIFY_BOOTSTRAP.md).

## Routes
`/`, `/learning`, eight independent core concept lesson routes (`equation`, `balance`, `both-sides`, `unknown`, `parts`, `inverse-operations`, `solve`, `verify`), independent `/learning/fractions`, `/world`, `/game`, `/game/level/:levelId` (01–08), `/progress`. All have shared navigation/home/back. See [Routes](docs/ROUTES.md) and [Wireframes](docs/WIREFRAMES.md).

## Feature state
Phase 2 website shell and Phase 3 Home are merged. Phase 4 implements nine independent interactive lessons and pure exact rational solving/step checking. Phase 5 adds a real procedural R3F exploration scene with four inspectable landmarks, desktop/touch input, low-quality mode and text fallback. Eight playable authored stages and session-only one-time unlocks are now implemented (Phase 7). Persisted progress, later QA and deployment remain **planned, not implemented**. See [Development status](docs/DEVELOPMENT_STATUS.md) and [specs](specs/).

## Phase 1 accepted; Phase 2 scope
[Decision brief](docs/PHASE_01_DECISION_REPORT.md) · [13-spec review (12 original + fractions)](docs/PHASE_01_SPEC_REVIEW.md) · [acceptance checklist](docs/PHASE_01_ACCEPTANCE_CHECKLIST.md) · [draft completion report](docs/PHASE_01_COMPLETION_REPORT.md). A1–A5 approved as planning decisions in D12–D16: eight core routes plus fraction route, exact rational scope with progressive teaching, procedural genuine 3D first, planning baseline approved, and pure math core before lesson grading. Owner separately approved Phase 1 and Phase 2; Phase 2 was merged via PR #2. The owner then explicitly restored the original Phase 3 Home narrative/carousel scope (D19). A6 publication timing remains deferred.

## Approved vs provisional
Confirmed by owner: project brief's stack, pages, educational and static delivery constraints. Approved planning decisions D12–D16: separate lessons (including fractions), integer → signed → exact fraction sequence, 3D asset approach, Phase 1 baseline and early pure math dependency. Provisional future implementation details: persistence schema, measured performance and exact asset selection. Binding planning choices and deferred publication permission are in [Decisions](docs/DECISIONS.md); the earlier [Preparation report](docs/PREPARATION_REPORT.md) is historical.

## Tool reality
Spec Kit 1.2.6 CLI scaffold installed with `none` integration; Graphify 0.9.101 CLI installed locally, no Arena MCP connector; anti-slop six skills vendored but no Arena auto-hook; Expo carousel inspected as reference, not installed. Python tools in `~/.local/bin` may need reinstall across sandboxes; `bash scripts/setup.sh` provisions missing tools and runs `npm ci`. Canonical Node 22.22.3/npm 10.9.8 are checked, not silently installed. JS dependencies locked; Vite app scaffold present. See [Environment setup](docs/ENVIRONMENT_SETUP.md), [Workflow](docs/DEVELOPMENT_WORKFLOW.md), [Dependencies](docs/DEPENDENCIES.md).

## Documentation
[PRD](docs/PRD.md) · [Game design](docs/GAME_DESIGN.md) · [Design](docs/DESIGN.md) · [Architecture](docs/ARCHITECTURE.md) · [Routes](docs/ROUTES.md) · [Educational content](docs/EDUCATIONAL_CONTENT.md) · [Math engine](docs/MATHEMATICAL_ENGINE.md) · [Dependencies](docs/DEPENDENCIES.md) · [Performance](docs/PERFORMANCE.md) · [Deployment](docs/DEPLOYMENT.md) · [Testing](docs/TESTING.md) · [Decisions](docs/DECISIONS.md) · [Status](docs/DEVELOPMENT_STATUS.md) · [Roadmap](docs/ROADMAP.md) · [Spec Kit constitution](.specify/memory/constitution.md) · [Environment setup](docs/ENVIRONMENT_SETUP.md) · [Development workflow](docs/DEVELOPMENT_WORKFLOW.md) · [Phase execution protocol](PHASE_EXECUTION_PROTOCOL.md).

## Next step
Present Phase 5 implementation and verification report for owner review. Stop and await explicit Phase 6 authorization; no merge/deployment without approval. Never mark untested browser behavior as verified.

## Phase 2 handoff
Implementation and 28/28 tests passed in `b8544be`; Persian evidence/limits in [Phase 2 completion report](docs/PHASE_02_COMPLETION_REPORT.md). [PR #2](https://github.com/mmalborzi1384/equation-quest/pull/2) was explicitly merged to `main` at `8e4ec20`. No browser visual/E2E or public deployment verified; 16 npm audit findings remain. Stop until owner approval.

## Phase 3 handoff
The withdrawn interim Phase 3 educational-module work was reverted uncommitted. Original Phase 3 Home adds scoped GSAP ScrollTrigger narrative motion, responsive balance/island illustration and SVG-filtered web lens with pointer/keyboard/focus/fallback. 31 Vitest and 5 real headless-Chromium Playwright tests passed; `bash scripts/verify-environment.sh --full` passed. Details/limits: [Phase 3 completion report](docs/PHASE_03_COMPLETION_REPORT.md). Phase 4 subsequently authorized by owner (D20).

Phase 3 implementation commit `c3bd06b` is pushed; [PR #3](https://github.com/mmalborzi1384/equation-quest/pull/3) was explicitly merged into `main` at `804b02a`; the owner accepted Phase 3 and separately authorized Phase 4. Current branch: `arena/431b70f0-equation-quest`.

## Phase 4 handoff (2026-11-03)
Nine authored lessons and repeatable guided fraction practice, exact rational normalization/step checking/substitution, KaTeX LTR islands and DOM models on existing routes. 54 Vitest, 9 headless Chromium E2E tests and local production build passed; see [Phase 4 completion report](docs/PHASE_04_COMPLETION_REPORT.md) for commands, browser limitations and audit. Hardware/mobile screen-reader, other-browser and independent curriculum-specialist review remain open. Phase 5 subsequently authorized by owner (D22).

Phase 4 implementation commit `497953d` pushed; [PR #4](https://github.com/mmalborzi1384/equation-quest/pull/4) was explicitly merged at `ea1c52c`. The owner emphasized coequal mobile/desktop support and separately authorized Phase 5.

## Phase 5 handoff (2026-11-03)
`/game` now hosts a real procedural isometric R3F exploration workshop, pure bounded movement and proximity, four inspectable landmarks, orthographic follow camera, keyboard and held-touch direction controls, E/Escape/tap, quality presets and text fallback on absent/lost WebGL. `/world` keeps stage previews honest and links to workshop. All 61 Vitest and 15 headless Chromium E2E tests passed; WebGL/mobile 320/390/768/1280px and no-WebGL were exercised, details in [Phase 5 report](docs/PHASE_05_COMPLETION_REPORT.md). No puzzle/reward/level completion, persisted progress, independent curriculum review, hardware screen reader or deployment is claimed. Phase 6 needs separate authorization.

Phase 5 implementation commit `8bfa790` pushed; [PR #5](https://github.com/mmalborzi1384/equation-quest/pull/5) open and **not merged**. Await explicit owner decision. Session branch: `arena/bdc71c3b-equation-quest`.

## Phase 6 handoff (2026-11-03)
The owner explicitly accepted and merged Phase 5 PR #5 (`4b3a7d1`) and separately authorized Phase 6. This branch (`arena/fcac4f6f-equation-quest`) adds a three-trial workshop under `/game`: pure exact-rational puzzle transitions, mistake-coded gradual hints, original-equation verification, ordered trial gates and one-time in-memory points. This is **not** the eight playable levels, island unlocks or persisted progress. 71 Vitest tests, 16 headless Chromium E2E (real WebGL and fallback), full lint/format/typecheck/build passed; [Phase 6 report](docs/PHASE_06_COMPLETION_REPORT.md). No deployment or external curriculum validation. Stop for owner review; no PR merge or Phase 7 without separate authorization. Earlier handoff paragraphs above are historical as of their dates.

Phase 6 review handoff: implementation commit `bb29136` pushed; [PR #6](https://github.com/mmalborzi1384/equation-quest/pull/6) is **open and unmerged**. Await the owner's decision.

**Standing UI direction from owner (D26):** always render the graphical name as «ماجراجویی معادله‌ها», never «اکویشن کوئست». Use subtly rounded button/CTA corners (shared 9px token), not sharp-edged controls, while preserving circular indicators and focus/touch accessibility. Applies to future UI work; no authorization of the next phase.

## Phase 7 handoff (2026-11-03)
The owner approved and merged Phase 6 PR #6 at `d6109b8` and separately authorized Phase 7 (D27). On assigned branch `arena/8e2972ea-equation-quest`, eight authored stage routes now require distinct concept actions and exact rational equation sequences. Ordered one-time rewards and island completion work within the current page session only; 06 explicitly teaches fractions with equal-part model, 07 has three guided rational problems, 08 requires mixed integer/signed/fraction verification. Four R3F markers show two completion lights and an island ring; DOM fallback/map provide equivalent status. **82 Vitest / 27 Chromium E2E**, lint/format/typecheck/build pass; see [Phase 7 report](docs/PHASE_07_COMPLETION_REPORT.md). `/progress` remains an honest Phase 8 preview, not a save. No deployment, full hardware/screen-reader audit or external curriculum review. The owner's standing UI name «ماجراجویی معادله‌ها» and 9px subtly rounded controls remain mandatory. Stop for owner review; no merge or Phase 8 without separate authorization. Previous handoff paragraphs above are historical snapshots, not current branch status.

Phase 7 review handoff: implementation commit `5241d37` pushed; [PR #7](https://github.com/mmalborzi1384/equation-quest/pull/7) is **open and unmerged**. Await explicit owner decision.

## Post-Phase 7 planning direction (D28)

Owner approved/merged Phase 7 PR #7 at `dccd87c`, explicitly said **do not start Phase 8**, and requested **planning-only** Phase 8/9 amendments. Phase 8 must give every app-owned persisted data category an in-context delete/reset (existing reduced-motion preference included) and a confirmed global delete-all with storage/in-memory/reload evidence. Phase 9 must apply anti-slop skills throughout optimization, use an authentic game-scene background, and give on-screen button-like actions a restrained liquid-glass appearance with 9px corners, contrast, keyboard/touch and performance/fallback checks. `reactdrops.dev` is an optional reference, not yet reviewed or installed. Neither phase is authorized for implementation; Phase 10 deployment remains separate. See `docs/DECISIONS.md` D28 and `docs/PHASE_09_DESIGN_AND_OPTIMIZATION_PLAN.md`.

**D29 planning only:** owner again says **do not start Phase 8**. Future Phase 9 must make lower sections appear with scroll and selected short Persian text type/reveal visibly, while keeping full accessible content, reduced-motion/no-JS fallback, RTL grapheme integrity, LTR math, focus and measured mobile performance. Current Home only moves headings via GSAP ScrollTrigger; this requested effect is not implemented. Six vendored anti-slop skills (core/UI/layoutmobile/human/copywriting/code) and GSAP exist; do not claim a dedicated typing skill is installed or needed for planning. No phase implementation authorized.

## Phase 8 implementation handoff (D30, 2026-11-03)

Owner explicitly reversed the previous Phase 8 hold. On `arena/260614e7-equation-quest` (open PR #8) four validated versioned local stores and a truthful `/progress` dashboard now save only verified stage/workshop/fraction-practice outcomes and the existing reduced-motion setting. Contextual reset and confirmed global app-data deletion update live state and storage, preserving unrelated keys. Canonical rational answers are string pairs, not BigInt in JSON. Full local toolchain: 90 Vitest PASS, lint/format/typecheck/build PASS; 29/29 Chromium E2E PASS with temporary browser outside repo. Details and limits: [Phase 8 report](docs/PHASE_08_IMPLEMENTATION_REPORT.md). Await owner review; no PR merge, Phase 9 visual/animation optimization or deployment authorized. Earlier D28/D29 planning-only notes are historical.
