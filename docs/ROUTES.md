# Route contract (proposed)

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

Eight core concept routes (equation, unknown, balance/equality, parts, both-sides, inverse, solve, verify) plus **one additional fractional lesson/practice route** satisfy A1 and the strengthened A2 scope. The five new core topic routes and fraction route are planning targets, **not implemented**; maintain independent page/component/lesson logic for each.

Shared navigation on every route: home, learning, world, continue game, progress, back; compact menu on mobile; accessible active state. Continue resolves saved last accessible level, otherwise `/game`. Locked island/level controls display requirement and route to prerequisite (not a dead button). Carousel items navigate to lesson/world/progress. Invalid route/ID offers home and map. HashRouter removes server-side deep-link rewrite requirement; actual Pages verification remains pending.
