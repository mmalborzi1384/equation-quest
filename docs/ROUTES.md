# Route contract (proposed)

| Path | Page owner | Primary action | Related navigation |
|---|---|---|---|
| `/` | Home | Begin adventure → `/world` or `/game` | learning, carousel destinations, progress |
| `/learning` | Learning | Open each concept lesson | balance, unknown, inverse, world |
| `/learning/balance` | BalanceLesson | Add/remove weights and test equality | overview, level 01/02 |
| `/learning/unknown` | UnknownLesson | Reveal/infer mystery box value | overview, level 03/04 |
| `/learning/inverse-operations` | InverseOperations | Apply opposite operations | overview, level 05/06 |
| `/world` | World | Enter four island level paths | levels 01/03/05/07, progress |
| `/game` | Game | Tutorial/start or continue last unlocked level | world, levels, pause |
| `/game/level/:levelId` | Level | Explore and solve stage 01–08 | game, next unlocked, world |
| `/progress` | Progress | Inspect real local save and resume | world, game, learning |

Shared navigation on every route: home, learning, world, continue game, progress, back; compact menu on mobile; accessible active state. Continue resolves saved last accessible level, otherwise `/game`. Locked island/level controls display requirement and route to prerequisite (not a dead button). Carousel items navigate to lesson/world/progress. Invalid route/ID offers home and map. HashRouter removes server-side deep-link rewrite requirement; actual Pages verification remains pending.
