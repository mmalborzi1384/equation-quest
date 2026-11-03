# Route contract (Phase 4 lessons implemented; game/progression actions remain future contracts)

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
| `/game` | Game | Tutorial/start or continue last unlocked level | world, levels, pause |
| `/game/level/:levelId` | Level | Explore and solve stage 01–08 | game, next unlocked, world |
| `/progress` | Progress | Inspect real local save and resume | world, game, learning |

Eight core concept routes (equation, unknown, balance/equality, parts, both-sides, inverse, solve, verify) plus **one additional fractional lesson/practice route** satisfy A1 and the strengthened A2 scope. All nine URLs have distinct lazy route entries, authored teaching/feedback, guided equation operations and exact practice; `/learning/fractions` adds an equal-part model and repeatable exercises. Game/world/progress actions in the table remain future contracts, not working features.

Shared navigation links Home, learning, world and honest game/progress previews; compact menu on mobile and a back/home fallback. **Future only:** resume last unlocked level and locked/unlocked island requirements (Phase 6–8); neither exists yet. Carousel items navigate to real lesson routes. Invalid route/ID offers a useful fallback. HashRouter removes server-side deep-link rewrite requirement; actual Pages verification remains pending.

## Phase 2 reality
All listed paths resolve under `#/` with shared Home/Learning/World/Game/Progress navigation, responsive menu and back/home fallback. `/game/level/01`–`08` have informational previews; unsupported IDs and unknown paths show a useful 404. Nav game link is labeled "بازی: به‌زودی" because no level can yet be continued. No locked/unlocked state, resume or real progression exists. Phase 4 added teaching controls and exact grading on the nine lesson routes. Routing works with a static repo base but GitHub Pages itself has not been deployed/verified.
