import { describe, expect, it } from 'vitest';
import { fromStrings, solution } from '../equation-engine/equation';
import { equals, parseRational, rational } from '../equation-engine/rational';
import {
  challengeEquation,
  challenges,
  isUnlocked,
  workshopOrder,
} from '../level-manager/workshop';
import { emptyRewards, recordVerified } from '../progression/rewards';
import { grantWorkshop } from '../progression/workshop';
import { hintFor, startPuzzle, transition, type PuzzleSession } from './puzzle';
const stepAction = (
  operation: 'add' | 'subtract' | 'multiply' | 'divide',
  amount: string,
  sides: 'both' | 'left' | 'right' = 'both',
) => ({ operation, amount: parseRational(amount), sides });
const eq = fromStrings('2', '4', '12');
function solved(equation = eq) {
  let session = startPuzzle();
  session = transition(equation, session, {
    type: 'step',
    action: { operation: 'subtract', amount: equation.b, sides: 'both' },
  }).session;
  session = transition(equation, session, {
    type: 'step',
    action: { operation: 'divide', amount: equation.a, sides: 'both' },
  }).session;
  session = transition(equation, session, {
    type: 'answer',
    input: `${solution(equation).numerator}/${solution(equation).denominator}`,
  }).session;
  return session;
}
describe('puzzle mechanics and one-time workshop rewards', () => {
  it('rejects an answer-only guess and wrong verification before any steps', () => {
    const start = startPuzzle();
    expect(transition(eq, start, { type: 'answer', input: '4' }).session.feedback).toBe(
      'answer-only',
    );
    expect(transition(eq, start, { type: 'verify', claim: 'equal' }).verifiedNow).toBe(false);
    expect(start.phase).toBe('constant');
  });
  it('classifies one-sided, sign, reciprocal, division by zero and precise arithmetic errors', () => {
    const start = startPuzzle();
    expect(
      transition(eq, start, { type: 'step', action: stepAction('subtract', '4', 'left') }).session
        .feedback,
    ).toBe('unilateral-change');
    expect(
      transition(eq, start, { type: 'step', action: stepAction('subtract', '-4') }).session
        .feedback,
    ).toBe('sign-error');
    const first = transition(eq, start, {
      type: 'step',
      action: stepAction('subtract', '4'),
    }).session;
    expect(first.phase).toBe('coefficient');
    expect(
      transition(eq, first, { type: 'step', action: stepAction('multiply', '2') }).session.feedback,
    ).toBe('reciprocal-error');
    expect(
      transition(eq, first, { type: 'step', action: stepAction('divide', '0') }).session.feedback,
    ).toBe('division-by-zero');
    const answerPhase = transition(eq, first, {
      type: 'step',
      action: stepAction('divide', '2'),
    }).session;
    expect(transition(eq, answerPhase, { type: 'answer', input: '5' }).session.feedback).toBe(
      'arithmetic-error',
    );
    expect(transition(eq, answerPhase, { type: 'answer', input: '4.0' }).session.feedback).toBe(
      'premature-rounding',
    );
  });
  it('raises hints gradually without revealing the final answer; resets after a good step', () => {
    const first = transition(eq, startPuzzle(), {
      type: 'step',
      action: stepAction('subtract', '-4'),
    }).session;
    expect(first.hintLevel).toBe(1);
    expect(hintFor(eq, first)).toMatch(/ثابت/);
    const second = transition(eq, first, { type: 'hint' }).session;
    expect(second.hintLevel).toBe(2);
    const third = transition(eq, second, { type: 'hint' }).session;
    expect(third.hintLevel).toBe(3);
    expect(hintFor(eq, third)).toMatch(/هر دو طرف/);
    expect(third.phase).toBe('constant');
    expect(
      transition(eq, third, { type: 'step', action: stepAction('subtract', '4') }).session
        .hintLevel,
    ).toBe(0);
  });
  it('verifies original equation only after exact answer and awards once even after replay', () => {
    const verifying = solved();
    expect(verifying.phase).toBe('verify');
    expect(transition(eq, verifying, { type: 'verify', claim: 'unequal' }).session.feedback).toBe(
      'verification-mismatch',
    );
    const done = transition(eq, verifying, { type: 'verify', claim: 'equal' });
    expect(done.verifiedNow).toBe(true);
    expect(done.session.phase).toBe('complete');
    expect(transition(eq, done.session, { type: 'verify', claim: 'equal' }).verifiedNow).toBe(
      false,
    );
    const awarded = grantWorkshop(emptyRewards, challenges[0].id);
    expect(awarded.points).toBe(10);
    expect(grantWorkshop(awarded, challenges[0].id)).toBe(awarded);
    expect(grantWorkshop(awarded, 'not-a-challenge')).toBe(awarded);
    expect(recordVerified(awarded, challenges[0].id, 10)).toBe(awarded);
    expect(transition(eq, done.session, { type: 'restart' }).session.phase).toBe('constant');
    expect(grantWorkshop(awarded, challenges[0].id).points).toBe(10);
  });
  it('orders workshop gates without granting out-of-order or fabricated level credit', () => {
    expect(isUnlocked(workshopOrder[0], workshopOrder, new Set())).toBe(true);
    expect(isUnlocked(workshopOrder[1], workshopOrder, new Set())).toBe(false);
    expect(isUnlocked(workshopOrder[2], workshopOrder, new Set([workshopOrder[1]]))).toBe(false);
    expect(grantWorkshop(emptyRewards, workshopOrder[2])).toBe(emptyRewards);
    const first = grantWorkshop(emptyRewards, workshopOrder[0]);
    const second = grantWorkshop(first, workshopOrder[1]);
    const last = grantWorkshop(second, workshopOrder[2]);
    expect(last.points).toBe(30);
    expect(last.completedIds).toEqual(workshopOrder);
    expect(() => recordVerified(emptyRewards, 'bad', -1)).toThrow();
  });
  it.each(challenges)(
    'solves and verifies $band exactly, including signed/fractional',
    (challenge) => {
      const equation = challengeEquation(challenge);
      const answer = solution(equation);
      expect(equals(answer, rational(answer.numerator, answer.denominator))).toBe(true);
      const verifying = solved(equation);
      expect(verifying.phase).toBe('verify');
      const done = transition(equation, verifying, { type: 'verify', claim: 'equal' });
      expect(done.verifiedNow).toBe(true);
      if (challenge.band === 'fraction') {
        const answerPhase: PuzzleSession = { ...verifying, phase: 'answer' };
        expect(
          transition(equation, answerPhase, { type: 'answer', input: '1/3' }).session.feedback,
        ).toBe('fraction-denominator-error');
        expect(
          transition(equation, answerPhase, { type: 'answer', input: '2/4' }).session.phase,
        ).toBe('verify');
      }
    },
  );
});
