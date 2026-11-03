# Equation and puzzle engine

**Status:** Draft / awaiting owner approval. Portable specification; implementation branch is assigned per Arena session.

## User story
As a seventh-grade learner, I can use this feature to understand and practice equations without creating an account.

## Requirements
Pure engine generates and solves ax+b=c, verifies equivalent steps and substitutions, classifies common errors, with graduated hints.

## Scope and constraints
Typed domain modules no React/Three imports; seeded generator and testable checking API. Persian RTL, mathematical LTR, desktop/mobile, accessible and usable without backend. Shared navigation and no dead controls. Refer to PRD, ROUTES, EDUCATIONAL_CONTENT and constitution for cross-cutting requirements.

## Acceptance evidence required
unit edge cases/negative coefficients, both-side transformations and feedback taxonomy. Do not mark completed without implementation, tests and anti-slop delivery gate.
