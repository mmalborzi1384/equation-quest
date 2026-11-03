# Game design — Algebra Kingdom (Phase 1 planning baseline)

The kingdom's bridges and gates lost balance. The player restores them by observing a mechanism, trying equivalent operations and explaining the result. Loop: explore → encounter → learn → manipulate → get feedback → verify → reward → unlock. Fixed isometric camera with smooth follow. No combat/timer or loss state. Grade-7 progression is deliberate: **small integers → signed coefficients/constants → inverse operations and simplification → exact fractions → two-step equations and verification**. Fractions are core v1 material, not a token final quiz.

| Island | Level | Independent mechanic / learning objective | Equation band and environmental response |
|---|---|---|---|
| Balance Island | 01 راز ترازو | Make two pans equal; read `=` as a relationship | Small positive integer weights; balance bridge settles |
| Balance Island | 02 قانون تعادل | Apply the same integer add/remove to both sides | Small integers; counterweight gate opens |
| Unknown Forest | 03 جعبه اسرارآمیز | Infer `x` from repeated boxes/objects | Positive integer variable examples; boxes reveal value |
| Unknown Forest | 04 دروازه مجهول | Identify coefficient/constant; introduce **positive and negative** values with a sign-aware expression | Signed integer expression; symbol gate unlocks |
| Inverse Cave | 05 تونل جمع و تفریق | Undo signed integer addition/subtraction on both sides and simplify | Signed integers, no fractions before the visual introduction; tunnel lights connect |
| Inverse Cave | 06 اتاق ضرب و تقسیم | Undo multiplication/division and **introduce simple equal-part fractions and reciprocals**; check both sides | Include a fractional coefficient or fractional solution in guided puzzles, with explicit hints; lift powers up |
| Equation Castle | 07 برج معادلات | Guided two-step `ax+b=c`: solve, simplify and substitute, including **rational coefficients/constants and exact rational solutions** | Multiple worked fractional practice problems in the stage, not one bonus question; tower stair rises |
| Equation Castle | 08 آزمون نهایی | Independently solve and verify a mix of integer, signed and fractional equations | Include a fractional equation as a required assessed objective, not just optional extra credit; kingdom balance restored |

Each stage owns typed objective, explanation, manipulable action, misconceptions, staged hints, verification expression and success gate; level 06 scaffolds before level 07 increases complexity. The independent `/learning/fractions` lesson and repeatable supplemental fraction practice remain available **outside levels 06–08** so learners can prepare/retry without redoing the whole game. For fraction exercises cover a rational coefficient with integer answer, integer coefficient with fractional answer and rational coefficient with exact fractional answer; use `ax+b=c`, `a≠0`, with rational parameters. No fractional unit is removed merely because it is advanced.

Rewards: one-time XP/crystals; achievements tied to real completed events, not fake badges. Progress unlocks next stage only after demonstrated operation/verification where required. On-screen action prompt E/tap; keyboard/mouse and joystick/touch parity; Esc/pause button opens resume, restart current puzzle, map. Accessibility fallback for 3D interaction: labelled interaction list/clickable nearby objects and DOM math controls; no information conveyed only by color or animation. Art plan A3: genuine procedural stylized 3D first, optionally optimized licensed GLBs later. Mechanics are planned, **not coded**.

## Phase 5 exploration boundary

A real stylized R3F island/camera/player and four station markers now exist at `/game`; desktop/mobile controls, pause, quality and no-WebGL text navigation are operational. Inspection reveals a short station note and links to a lesson/preview, **not a playable algebra puzzle**. The stage objective/reward/progression loop described above remains Phase 6–8 work.

## Phase 6 mechanics boundary

The `/game` page now adds three **mechanics trials** below exploration: integer (`2x+4=12`), signed (`-2x+3=9`) and fractional (`(2/3)x+1/2=5/6`), generated deterministically from the existing exact-rational core. The learner applies the same inverse action to both sides, supplies an exact answer, then explicitly compares the substitution into the **original** equation. One-sided changes, wrong signs/reciprocals, zero division, bad denominators, rounded decimals and arithmetic errors have distinct feedback, followed by hints that grow from a prompt to an operation, not a premature answer. A verified trial awards 10 in-memory points once and opens the next workshop trial. It does **not** unlock an island/stage, grant persistent XP, or complete any of the eight authored levels.
