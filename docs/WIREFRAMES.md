# Route wireframes & design specifications (planning only)

Shared shell (all routes): `skip to content` → logo/home, learning, world, continue, progress, back; compact labelled menu on mobile with visible active route; main and footer/status. Mobile layout stacks main/aside and keeps 44px actions. No app implemented yet.

## `/` Home
```text
[nav] [hero: kingdom fracture | concise story | Begin / Learn] [3D ornament]
[intro: why equality matters] [goals as a visual two-sided equation]
[journey: 4 islands along bridge] [world glimpse with link to map]
[interaction preview: drag/compare] [how to play: keys + touch]
[glass carousel: lesson / region cards < prev | next >, focus, open route]
[final begin adventure / resume] [footer: learning, world, progress]
```
Desktop asymmetrical hero with one focal mechanism; mobile canvas is decorative fallback, content/CTA always visible. ScrollTrigger only reveals story; carousel works independently with keyboard/touch and reduced motion.

## `/learning` Overview
```text
[breadcrumb: home] [heading: a route from equality to x] [concept map 8 nodes]
[what is equation?] [unknown] [equality] [parts] [both sides]
[inverse operation] [solve] [verify] [enter Balance / Unknown / Inverse]
```
Each node includes concise explanation, concrete example and route to nearest lesson; nodes without separate dedicated route link to a relevant lesson anchor with an actual focused exercise, not a dead stub. Responsive vertical map on mobile.

## `/learning/balance`
```text
[back / goal] [interactive 3D scale with two pans and numeric/accessible labels]
[add 1 / remove 1 from left] [add 1 / remove 1 from right] [reset]
[equality result + why] [guided try / level 01]
```
Show both pan counts and verdict in text; direct manipulation click/tap plus buttons for keyboard; camera fallback if WebGL unavailable.

## `/learning/unknown`
```text
[back / goal] [mystery boxes + visible objects 3D] [equation strip]
[choose a box / enter inferred x] [check] [hint] [new example]
[explanation after answer] [level 03]
```
Mystery box never reveals x until reasoned or hint progression; input has numeric label and validation, mobile keyboard suitable.

## `/learning/inverse-operations`
```text
[back / goal] [operation pair selector + / - / × / ÷]
[balanced expression before] [apply to BOTH sides] [result animation]
[feedback with reason / retry / next example] [level 05]
```
Operation and operand selection explicit; prevent division by zero; RTL explanatory prose, LTR equation strip.

## `/world`
```text
[back / route map title] [island map with 4 interactive markers]
[island list: status / goal / 2 levels / enter or prerequisite]
[progress summary from local save] [resume]
```
Map and list represent same actions; region identities via material/color + text, not color alone; no locked dead buttons.

## `/game`
```text
[back/map] [intro/tutorial or continue saved stage] [controls legend]
[preview of isometric scene] [start current accessible level] [quality selector]
```
When a level is active, game shell can route to Level, not duplicate the entire puzzle; no decorative Start.

## `/game/level/01` … `/08`
```text
[HUD: island / stage / XP / objective / pause] [isometric playfield]
[nearby interactable labels / E or tap] [puzzle panel: current equation]
[step action controls / hint / feedback] [verified success + award once]
[pause: resume, restart puzzle, map] [next unlocked / progress]
```
Each of 8 level definitions supplies its own story/objective, scene mechanism, puzzle steps and feedback; player walk area and interactive target keyboard/touch parity. Mobile bottom dock with virtual joystick and interaction/pause controls; HUD never blocks math. Non-WebGL accessible alternate puzzle controls.

## `/progress`
```text
[back] [real XP/crystals totals] [8-stage progress visualization with labels]
[earned achievements / honest empty state] [best performance]
[last level / resume] [learning route and map]
```
No fabricated statistics; show local-save notice, offer reset with confirmation only if needed/approved.

## Shared errors/states
404/invalid level: explain and link home/world. Loading: meaningful route suspense label. Missing WebGL: lesson/game puzzle fallback rather than blank canvas. Corrupt save: reset safely and show non-alarming notice. Screens sized for keyboard focus and mobile safe area; focus trap/restore for menus and dialogs.
