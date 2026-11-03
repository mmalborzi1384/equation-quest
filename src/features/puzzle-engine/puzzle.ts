import {
  equationTex,
  grade,
  solution,
  step,
  substitute,
  type Action,
  type Equation,
  type FeedbackCode,
  type Stage,
  type State,
} from '../equation-engine/equation';
import { equals, negate, one, reciprocal, text, type Rational } from '../equation-engine/rational';

export type PuzzlePhase = Stage | 'answer' | 'verify' | 'complete';
export type PuzzleCode =
  | FeedbackCode
  | 'sign-error'
  | 'reciprocal-error'
  | 'fraction-denominator-error'
  | 'answer-only'
  | 'arithmetic-error';
export type PuzzleSession = Readonly<{
  phase: PuzzlePhase;
  attempts: number;
  hintLevel: number;
  feedback: PuzzleCode | null;
  answer?: Rational;
  first?: State;
  second?: State;
}>;
export type Event =
  | { type: 'step'; action: Action }
  | { type: 'answer'; input: string }
  | { type: 'verify'; claim: 'equal' | 'unequal' }
  | { type: 'hint' }
  | { type: 'restart' };
export type Transition = Readonly<{ session: PuzzleSession; verifiedNow: boolean }>;
export function startPuzzle(): PuzzleSession {
  return { phase: 'constant', attempts: 0, hintLevel: 0, feedback: null };
}
function mistake(state: PuzzleSession, code: PuzzleCode): Transition {
  return {
    session: {
      ...state,
      attempts: state.attempts + 1,
      hintLevel: Math.min(3, state.hintLevel + 1),
      feedback: code,
    },
    verifiedNow: false,
  };
}
function classify(eq: Equation, phase: Stage, action: Action, code: FeedbackCode): PuzzleCode {
  if (code !== 'wrong-inverse') return code;
  if (
    phase === 'constant' &&
    eq.b.numerator !== 0n &&
    ((action.operation === 'subtract' && equals(action.amount, negate(eq.b))) ||
      (action.operation === 'add' && equals(action.amount, eq.b)))
  )
    return 'sign-error';
  if (
    phase === 'coefficient' &&
    !equals(eq.a, one) &&
    !equals(eq.a, negate(one)) &&
    ((action.operation === 'multiply' && equals(action.amount, eq.a)) ||
      (action.operation === 'divide' && equals(action.amount, reciprocal(eq.a))))
  )
    return 'reciprocal-error';
  return code;
}
export function transition(eq: Equation, state: PuzzleSession, event: Event): Transition {
  if (event.type === 'restart') return { session: startPuzzle(), verifiedNow: false };
  if (state.phase === 'complete') return { session: state, verifiedNow: false };
  if (event.type === 'hint')
    return {
      session: { ...state, hintLevel: Math.min(3, state.hintLevel + 1) },
      verifiedNow: false,
    };
  if (event.type === 'step') {
    if (state.phase !== 'constant' && state.phase !== 'coefficient')
      return mistake(state, 'wrong-inverse');
    const result = step(eq, state.phase, event.action);
    if (result.code !== 'correct' || !result.state)
      return mistake(state, classify(eq, state.phase, event.action, result.code));
    if (state.phase === 'constant')
      return {
        session: {
          ...state,
          phase: equals(eq.a, one) ? 'answer' : 'coefficient',
          first: result.state,
          feedback: 'correct',
          hintLevel: 0,
        },
        verifiedNow: false,
      };
    return {
      session: {
        ...state,
        phase: 'answer',
        second: result.state,
        feedback: 'correct',
        hintLevel: 0,
      },
      verifiedNow: false,
    };
  }
  if (event.type === 'answer') {
    if (state.phase !== 'answer') return mistake(state, 'answer-only');
    const result = grade(eq, event.input);
    if (result.code !== 'correct' || !result.answer) {
      if (result.code === 'incorrect' && result.answer) {
        const expected = solution(eq);
        if (
          expected.denominator !== 1n &&
          result.answer.numerator === expected.numerator &&
          result.answer.denominator !== expected.denominator
        )
          return mistake(state, 'fraction-denominator-error');
        return mistake(state, 'arithmetic-error');
      }
      return mistake(state, result.code);
    }
    return {
      session: {
        ...state,
        phase: 'verify',
        answer: result.answer,
        feedback: 'correct',
        hintLevel: 0,
      },
      verifiedNow: false,
    };
  }
  if (state.phase !== 'verify' || !state.answer) return mistake(state, 'verification-mismatch');
  const verified = substitute(eq, state.answer).equal && event.claim === 'equal';
  if (!verified) return mistake(state, 'verification-mismatch');
  return { session: { ...state, phase: 'complete', feedback: 'correct' }, verifiedNow: true };
}
export function hintFor(eq: Equation, state: PuzzleSession): string {
  const level = Math.max(1, state.hintLevel);
  if (state.phase === 'constant') {
    if (level === 1)
      return state.feedback === 'unilateral-change'
        ? 'تعادل با تغییر تنها یک طرف حفظ نمی‌شود.'
        : 'جملهٔ ثابت کنار x را پیدا کن.';
    if (level === 2)
      return `ثابت ${text(eq.b)} است؛ علامتش را همراه آن نگه دار و وارونش را پیدا کن.`;
    return `از هر دو طرف ${text(eq.b)} کم کن، یا وارون آن را به هر دو طرف بیفزا. هنوز مقدار x را حدس نزن.`;
  }
  if (state.phase === 'coefficient') {
    if (level === 1)
      return state.feedback === 'reciprocal-error'
        ? 'ضریب را دوباره ضرب نکن؛ وارون ضرب را پیدا کن.'
        : 'ضریب x را به ۱ تبدیل کن.';
    if (level === 2)
      return `ضریب ${text(eq.a)} است؛ تقسیم بر آن، یا ضرب در وارونش، هر دو طرف را هم‌ارز نگه می‌دارد.`;
    return `هر دو طرف را بر ${text(eq.a)} تقسیم کن؛ تقسیم بر صفر مجاز نیست.`;
  }
  if (state.phase === 'answer') {
    if (level === 1)
      return state.feedback === 'fraction-denominator-error'
        ? 'مخرج نشان می‌دهد هر سهم چقدر است؛ سهم‌ها را هم‌اندازه کن.'
        : 'در نتیجهٔ دو گام، x باید تنها بماند.';
    if (level === 2) return 'عدد سمت راست را با کسر دقیق بنویس؛ اعشار گرد شده کافی نیست.';
    return 'در معادلهٔ اصلی، ثابت را از سمت راست کم کن و بر ضریب غیرصفر تقسیم کن؛ جواب را دقیق بنویس.';
  }
  return 'جواب را در معادلهٔ اصلی، نه فقط خط آخر حل، جای‌گذاری کن و مقدار هر دو طرف را مقایسه کن.';
}
export const feedbackText: Record<PuzzleCode, string> = {
  correct: 'این گام درست است؛ همان عمل روی هر دو طرف، برابری را حفظ می‌کند.',
  'unilateral-change': 'فقط یک طرف تغییر کرده است؛ برابری دیگر تضمین نمی‌شود.',
  'wrong-inverse': 'این عمل جملهٔ موردنظر را حذف نمی‌کند. وارون همان عمل را انتخاب کن.',
  'sign-error': 'علامت عدد را برعکس گرفتی؛ ثابت و علامتش را با هم دنبال کن.',
  'reciprocal-error': 'ضریب را دوباره ضرب کردی؛ برای حذف آن بر ضریب تقسیم کن یا در وارونش ضرب کن.',
  'division-by-zero': 'تقسیم بر صفر تعریف نشده است؛ ضریب این معادله صفر نیست.',
  'zero-denominator': 'مخرج کسر نمی‌تواند صفر باشد.',
  'invalid-input': 'عدد صحیح یا کسر صورت/مخرج بنویس؛ ورودی خالی یا نامعتبر پذیرفته نیست.',
  'premature-rounding': 'جواب باید دقیق باشد؛ به‌جای اعشار، کسر بنویس.',
  incorrect: 'این مقدار در معادلهٔ اصلی دو طرف برابر نمی‌سازد.',
  'fraction-denominator-error': 'صورت را دیدی؛ مخرجِ سهم‌ها را دوباره بررسی کن.',
  'answer-only': 'اول گام‌های دوطرفه را انجام بده؛ حدس مستقیم جواب، راه‌حل را نشان نمی‌دهد.',
  'arithmetic-error':
    'جای‌گذاری این عدد در معادلهٔ اصلی برابری را نمی‌سازد؛ حساب و علامت‌ها را بررسی کن.',
  'verification-mismatch':
    'بررسی باید با جای‌گذاری در معادلهٔ اصلی و مقایسهٔ دقیق دو طرف انجام شود.',
};
export { equationTex };
