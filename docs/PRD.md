# Product requirements — Equation Quest

## Problem / audience
Seventh-grade learners often treat `x` as a number to guess, rather than reasoning that equality is preserved by doing the same thing to both sides. Product language is Persian, reading order RTL, mathematical statements LTR. Accessible on mobile and desktop without sign-in.

## Outcome
Student can explain equality, identify variable/coefficient/constant, use inverse operations to solve `ax+b=c` (`a≠0`) with signed integer and **exact rational** coefficients/constants/answers, and verify by substitution. Fractional equations require independent teaching, practice, graded hints and in-game objectives, not optional future scope. Adventure provides practice, explanatory hints and locally retained progress, not a timed or punitive quiz.

## Journey
Home explains premise and routes; Learning offers concept lessons with manipulation and feedback; World maps four islands and progress; Game introduces exploration and on-object puzzles; eight levels progressively unlock; Progress reflects real saved achievements. Empty progress is honest and useful.

## Functional scope
All routes in `docs/ROUTES.md`, including eight independent core topic lessons, an additional fraction lesson/practice route and 8 level IDs; shared navigation/back, responsive layouts and reduced motion. 3D fixed isometric camera with smooth follow, keyboard/touch movement and interaction, pause, puzzles, feedback, XP/crystals and achievements. Math core generates/solves/checks/diagnoses `ax+b=c`. No backend or account. HashRouter reload-compatible on Pages.

## Product acceptance gate
No placeholder route or dead button; each lesson shows and checks actions, each level has independent objective and completion gate; progress persists across refresh; math tests cover edge cases; E2E covers start/solve/save/reload/deep-link; site deployed and tested on Pages before claiming complete. Before public release, document a genuine curriculum/content review of all Persian text, terminology, examples and exercises; no teacher endorsement is claimed without evidence.

## Non-goals for v1
Multiplayer, cloud save, arbitrary algebra parser, custom character upload, procedural GLB asset pipeline, server account. These do not replace any required v1 features. Offline-first/PWA not required.

## Measures (to instrument locally, not claim yet)
Completion of tutorial and levels; rate of successful second attempts after feedback; ability to explain balancing in formative tasks; no fabricated adoption numbers. No external analytics without consent.
