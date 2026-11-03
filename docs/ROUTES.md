# Route contract (Phase 5 exploratory 3D implemented; puzzle/progression remain future contracts)

| Path | Page owner | Primary action | Related navigation |
|---|---|---|---|
| `/` | Home | Begin adventure → `/world` or `/game` | learning, carousel destinations, progress |
| `/learning` | Learning | Open eight core topic lessons plus independent fraction lesson/practice | lessons, world |
| `/learning/equation` | EquationLesson | Identify equation and equality using small integers | balance, overview |
| `/learning/balance` | BalanceLesson | Add/remove weights and test equality | overview, level 01/02 |
| `/learning/both-sides` | BothSidesLesson | Try the same operation on both sides and explain equivalence | balance, inverse |
| `/learning/unknown` | UnknownLesson | Reveal/infer mystery box value | overview, level 03/04 |
| `/learning/parts` | PartsLesson | Identify variable/coefficient/constant and signed terms | unknown, solve |
| `/learning/inverse-operations` | InverseOperations | Apply opposite operations | overview, level 05/06 |
| `/learning/solve` | SolveLesson | Simplify and isolate x in ordered steps, including advanced fractions | inverse, fractions, verify |
| `/learning/verify` | VerifyLesson | Substitute an integer or exact fractional answer in original equation | solve, fractions, game |
| `/learning/fractions` | FractionsLesson | Learn equal parts, fractional coefficients and exact fractional solutions with repeatable exercises and guided feedback | inverse, solve, levels 06–08 |
| `/world` | World | Enter four island level paths | levels 01/03/05/07, progress |
| `/game` | Game | Explore R3F island / DOM map, inspect four landmarks, pause, change quality | world, lessons, informational level routes |
| `/game/level/:levelId` | Level | Explore and solve stage 01–08 | game, next unlocked, world |
| `/progress` | Progress | Inspect real local save and resume | world, game, learning |

Eight core concept routes (equation, unknown, balance/equality, parts, both-sides, inverse, solve, verify) plus **one additional fractional lesson/practice route** satisfy A1 and the strengthened A2 scope. All nine URLs have distinct lazy route entries, authored teaching/feedback, guided equation operations and exact practice; `/learning/fractions` adds an equal-part model and repeatable exercises. The `/game` exploration and `/world` informational map work in Phase 5; math puzzles, unlocked levels and progress remain future contracts.

Shared navigation links Home, learning, world and honest game/progress previews; compact menu on mobile and a back/home fallback. **Future only:** resume last unlocked level and locked/unlocked island requirements (Phase 6–8); neither exists yet. Carousel items navigate to real lesson routes. Invalid route/ID offers a useful fallback. HashRouter removes server-side deep-link rewrite requirement; actual Pages verification remains pending.

## Phase 2 reality
All listed paths resolve under `#/` with shared Home/Learning/World/Game/Progress navigation, responsive menu and back/home fallback. `/game/level/01`–`08` have informational previews; unsupported IDs and unknown paths show a useful 404. The nav game link still says "بازی: به‌زودی" because no stage is playable; `/game` now offers an interactive exploration workshop without puzzles. No locked/unlocked state, resume or real progression exists. Phase 4 added teaching controls and exact grading on the nine lesson routes. Routing works with a static repo base but GitHub Pages itself has not been deployed/verified.

## Phase 5 route reality

`/game` lazily loads a real R3F island if WebGL is available; otherwise it immediately provides a semantic interactive text map. Four landmarks can be inspected by walking/pressing E, by tapping a 3D marker, or by choosing from the DOM list/map; inspection links to an existing lesson and an **informational** level preview. The `/world` map links to this workshop. `/game/level/:levelId` and `/progress` retain their honest preview/empty states. No unlock, reward or save state exists.

## Phase 7 route reality (D27)

`#/game/level/01`–`08` now render eight authored *playable* stages. Locked deep links explain and link to the previous stage; stage 01 is initially open, each next stage opens only after all required exact answers and original-equation verifications. `#/world` lists both levels in each of four regions and shows only verified **session** completion/points. `#/game` retains the separate three-trial workshop, exploration controls and no-WebGL fallback; inspection links to a playable stage, and markers illuminate according to actual completed levels. `#/progress` is explicitly still an empty **persistent** record because Phase 8 save/resume is not implemented. Earlier route reality paragraphs describe historical phases, not the current UI.

## Introduction route (owner request, 2026-11-03)

`#/intro` is a separate introduction page within the same static web application. The Home hero and header link to it; the introduction has explicit return-to-Home links. It introduces the real learning sequence through an accessible four-stop glass-inspired DOM carousel, with direct lesson links and no React Native dependency. Existing lesson/world/game/progress routes remain unchanged.
