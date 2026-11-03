# Phase 6 completion report — exact-rational mechanics workshop

**Authorized scope:** puzzle/level-manager/progression integration building on the Phase 4 rational engine. Owner accepted and merged Phase 5 PR #5 (`4b3a7d1`) and explicitly authorized Phase 6 in D24. **Status:** locally implemented and verified for review; not merged or deployed. The three trials are a bridge, not the Phase 7 eight authored levels.

## Executable increment

Run `npm run dev -- --port 5173` and visit `/equation-quest/#/game`. The existing mobile/desktop/WebGL exploration remains available, followed by a labelled mechanics workshop. The three deterministic trials require two-sided constant/coefficient inverses, exact integer/signed/fraction answer entry, and an explicit original-equation equality check. Wrong-side, wrong-sign, wrong-inverse/reciprocal, zero division, premature decimal, fraction denominator, wrong arithmetic and incorrect verification receive targeted feedback and gradual phase-specific hints. Verified trials award 10 points each **once per current page session** and open the next trial; replay does not multiply points; refresh resets. `/game/level/:id` still previews stages; `/progress` is not a record of workshop points. Algebra/rewards are pure modules independent of R3F.

New paths: `src/features/puzzle-engine/{puzzle.ts,puzzle.test.ts}`, `src/features/level-manager/workshop.ts`, `src/features/progression/{rewards.ts,workshop.ts}`, `src/store/useWorkshopProgress.ts`, `src/pages/Game/MechanicsLab.{tsx,module.css,test.tsx}`, `tests/e2e/mechanics.spec.ts`. Modified: `src/pages/Game/{Game.tsx,Game.test.tsx}`, `tests/e2e/exploration.spec.ts`, `src/pages/{World/World.tsx,Progress/Progress.tsx}`, `src/components/navigation/SiteHeader.tsx`, `docs/{DECISIONS.md,DEVELOPMENT_STATUS.md,DEPENDENCY_MAP.md,GAME_DESIGN.md,MATHEMATICAL_ENGINE.md,PHASE_06_COMPLETION_REPORT.md}`, `PROJECT_MEMORY.md`, `PHASE_EXECUTION_PROTOCOL.md`, `specs/{008-game,009-equations,010-levels,011-progress}` plans/tasks/checklist. Graphify's generated output is ignored.

## Verification (local, 2026-11-03)

| Command | Result |
|---|---|
| `bash scripts/setup.sh`; initial `EXPECTED_BRANCH=arena/fcac4f6f-equation-quest bash scripts/verify-environment.sh` | **PASS** in fresh sandbox, locked dependencies and baseline. |
| `EXPECTED_BRANCH=arena/fcac4f6f-equation-quest bash scripts/verify-environment.sh --full` | **PASS**: lint, Prettier, typecheck, **71/71 Vitest**, production Vite build. Eight puzzle/manager/reward pure tests and two full workshop DOM tests among those 71. |
| `EQ_WEBGL=1 LD_LIBRARY_PATH=/tmp/eq6-libs/lib:/tmp/eq6-libs:/tmp EQ_CHROMIUM_PATH=/tmp/eq6-chromium npm run test:e2e -- --reporter=line` | **16/16 PASS** in Chromium 153: integer/signed/fraction exact flow, error hints, ordered gates, one-time/replay/refresh rewards at 390px without WebGL; 15 existing scene/Home/lesson regressions including actual WebGL, keyboard, held touch, no-WebGL at 320px and 320/390/768/1280px coverage. |
| `graphify extract . --code-only`; `graphify cluster-only . --no-label --no-viz`; `graphify update .` | **PASS**: 1198 nodes, 1728 edges, 139 communities. Incremental watch noted a filter-change warning. |
| Live Vite preview `0.0.0.0:5173` | **RUNNING** in sandbox; no public deployment. |

Browser binary and bundled SwiftShader/NSS libraries were temporarily expanded from npm's `@sparticuz/chromium@153.0.0` into `/tmp`; symlinked the GL libraries alongside the binary. Initial browser run **11/16** because WebGL was unavailable before the symlinks; subsequent **15/16** exposed a world→game focus/scroll assumption now invalid on the longer page. The test now scrolls/focuses the scene before keyboard movement, consistent with the existing offscreen pause contract. Final full run **16/16 PASS**. No new application dependencies. Vite still warns about the existing lazy 925 kB scene chunk (~245 kB gzip).

## Manual anti-slop delivery gate and limitations

**PASS for this scoped increment:** meaningful Persian copy distinguishes trials from playable levels; navigation and progress text no longer promise missing save/levels; no fake statistics/achievements or invented island unlocks. Native labelled buttons and input, status live region, KaTeX LTR math in RTL UI, wrong-action and retry routes, functional no-WebGL DOM parity. Browser checks verify no horizontal overflow at workshop 390px, older fallback 320px and scene widths 320/390/768/1280px; existing global focus style and reduced-motion exploration preserved. This is a focused functional review, **not** a comprehensive axe/screen-reader or curriculum review. Hardware touch, alternate browsers, measured FPS, security clearance and published Pages are not claimed. Existing npm audit findings (16: 2 low, 14 moderate in Phase 5) require a separate release review; not re-audited in this phase.

## Boundary and stop

Recommendation: owner review this PR and decide whether to accept/merge it. Only **after** a new explicit authorization should Phase 7 author the eight real levels/island gates; Phase 8 owns persistence/dashboard. Do not merge the Phase 6 PR, deploy, or start Phase 7 by inference.

**Review handoff:** implementation commit `bb29136` pushed on `arena/fcac4f6f-equation-quest`; [PR #6](https://github.com/mmalborzi1384/equation-quest/pull/6) is open and **unmerged**. This report handoff note is a follow-up documentation change. No deployment.

**Post-review copy correction:** the graphical interface and browser title now use the Persian name «ماجراجویی معادله‌ها» instead of the transliterated brand. Header, footer, back row, page metadata and accessible home-link name agree. At 320px the header/menu fit without overflow; lint/format/typecheck, 71/71 unit tests and 11/11 affected Home/exploration Chromium tests passed. This changes copy, not Phase 6 mechanics or the deployment boundary.

**Owner UI preference follow-up (D26):** added a shared 9px button-corner token and rounded button-like page-intro/navigation actions, replacing the lesson's 2px control corners; deliberately circular indicators stay circular. Graphical naming rule «ماجراجویی معادله‌ها» is now recorded in the design/memory docs for future screens. Full environment verification **PASS** (71/71 Vitest, lint/format/typecheck/build); full Chromium E2E **16/16 PASS** after this styling change. No Phase 7, merge or deployment.

**Rounded-control audit correction:** following owner feedback, audited *all* native buttons and the button-like links/rows across Home, Learning, lesson, World, Game, level preview and Progress. Added the shared modest radius to missed boxed links (Home hero/final actions, carousel card action, game pause return, level navigator, clickable learning/journey rows and skip action); inline text links are intentionally not buttons. New Chromium computed-style checks cover seven routes at 320px and 1280px and enforce no sharp button corners or horizontal overflow. Prior claim that every CTA was rounded was incomplete; this audit closes that gap.

**Latest verification after this correction:** `EXPECTED_BRANCH=arena/fcac4f6f-equation-quest bash scripts/verify-environment.sh --full` **PASS** (71/71 Vitest, lint, format, typecheck, build); full headless Chromium with the same SwiftShader setup above **18/18 PASS** (original 16 plus two route-wide control-shape checks).
