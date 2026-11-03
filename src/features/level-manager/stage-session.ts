import {
  startPuzzle,
  transition,
  type Event as PuzzleEvent,
  type PuzzleSession,
} from '../puzzle-engine/puzzle';
import type { Stage } from './stages';
export type StageSession = Readonly<{
  conceptPassed: boolean;
  conceptAttempts: number;
  attemptsTotal: number;
  problemIndex: number;
  puzzle: PuzzleSession;
  done: boolean;
}>;
export type StageEvent =
  | { type: 'concept'; choice: number }
  | { type: 'puzzle'; event: PuzzleEvent }
  | { type: 'next' }
  | { type: 'restart' };
export function startStage(): StageSession {
  return {
    conceptPassed: false,
    conceptAttempts: 0,
    attemptsTotal: 0,
    problemIndex: 0,
    puzzle: startPuzzle(),
    done: false,
  };
}
export function advanceStage(
  stage: Stage,
  session: StageSession,
  event: StageEvent,
): { session: StageSession; completedNow: boolean } {
  if (event.type === 'restart') return { session: startStage(), completedNow: false };
  if (session.done) return { session, completedNow: false };
  if (event.type === 'concept') {
    if (session.conceptPassed || event.choice < 0 || event.choice >= stage.concept.choices.length)
      return { session, completedNow: false };
    return {
      session:
        event.choice === stage.concept.correct
          ? { ...session, conceptPassed: true }
          : { ...session, conceptAttempts: session.conceptAttempts + 1 },
      completedNow: false,
    };
  }
  if (!session.conceptPassed) return { session, completedNow: false };
  if (event.type === 'next') {
    if (session.puzzle.phase !== 'complete' || session.problemIndex >= stage.problems.length - 1)
      return { session, completedNow: false };
    return {
      session: {
        ...session,
        problemIndex: session.problemIndex + 1,
        attemptsTotal: session.attemptsTotal + session.puzzle.attempts,
        puzzle: startPuzzle(),
      },
      completedNow: false,
    };
  }
  if (session.puzzle.phase === 'complete') return { session, completedNow: false };
  // A puzzle restart restarts this problem only, not the stage/concept gate.
  const result = transition(
    stage.problems[session.problemIndex].equation,
    session.puzzle,
    event.event,
  );
  const completedNow = result.verifiedNow && session.problemIndex === stage.problems.length - 1;
  return {
    session: {
      ...session,
      puzzle: result.session,
      done: completedNow,
      attemptsTotal:
        session.attemptsTotal + (event.event.type === 'restart' ? session.puzzle.attempts : 0),
    },
    completedNow,
  };
}
