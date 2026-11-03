import {
  add,
  divide,
  equals,
  MathInputError,
  multiply,
  negate,
  one,
  parseRational,
  subtract,
  tex,
  text,
  zero,
  type Rational,
} from './rational';

export type Equation = Readonly<{ a: Rational; b: Rational; c: Rational }>;
export type Linear = Readonly<{ x: Rational; constant: Rational }>;
export type State = Readonly<{ left: Linear; right: Linear }>;
export type Action = Readonly<{
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  amount: Rational;
  sides: 'both' | 'left' | 'right';
}>;
export type Stage = 'constant' | 'coefficient';
export type FeedbackCode =
  | 'correct'
  | 'unilateral-change'
  | 'wrong-inverse'
  | 'division-by-zero'
  | 'zero-denominator'
  | 'invalid-input'
  | 'premature-rounding'
  | 'incorrect'
  | 'verification-mismatch';
export function equation(a: Rational, b: Rational, c: Rational): Equation {
  if (a.numerator === 0n) throw new MathInputError('zero-coefficient');
  return { a, b, c };
}
export function initial(eq: Equation): State {
  return { left: { x: eq.a, constant: eq.b }, right: { x: zero, constant: eq.c } };
}
export function solution(eq: Equation): Rational {
  return divide(subtract(eq.c, eq.b), eq.a);
}
export function substitute(eq: Equation, answer: Rational) {
  const product = multiply(eq.a, answer);
  const left = add(product, eq.b);
  return { product, left, right: eq.c, equal: equals(left, eq.c) };
}
function transform(side: Linear, action: Action): Linear {
  const op = action.operation;
  if (op === 'add' || op === 'subtract')
    return {
      x: side.x,
      constant:
        op === 'add' ? add(side.constant, action.amount) : subtract(side.constant, action.amount),
    };
  const fn = op === 'multiply' ? multiply : divide;
  return { x: fn(side.x, action.amount), constant: fn(side.constant, action.amount) };
}
export function apply(state: State, action: Action): State {
  return {
    left: action.sides === 'right' ? state.left : transform(state.left, action),
    right: action.sides === 'left' ? state.right : transform(state.right, action),
  };
}
export function step(
  eq: Equation,
  stage: Stage,
  action: Action,
): { code: FeedbackCode; state?: State } {
  if (action.sides !== 'both') return { code: 'unilateral-change' };
  try {
    const before =
      stage === 'constant'
        ? initial(eq)
        : apply(initial(eq), { operation: 'subtract', amount: eq.b, sides: 'both' });
    const after = apply(before, action);
    const valid =
      stage === 'constant'
        ? equals(after.left.x, eq.a) &&
          equals(after.left.constant, zero) &&
          equals(after.right.constant, subtract(eq.c, eq.b))
        : equals(after.left.x, one) &&
          equals(after.left.constant, zero) &&
          equals(after.right.constant, solution(eq));
    return valid ? { code: 'correct', state: after } : { code: 'wrong-inverse' };
  } catch (error) {
    if (error instanceof MathInputError && error.code === 'division-by-zero')
      return { code: 'division-by-zero' };
    throw error;
  }
}
export function grade(eq: Equation, input: string): { code: FeedbackCode; answer?: Rational } {
  try {
    const answer = parseRational(input);
    return { code: substitute(eq, answer).equal ? 'correct' : 'incorrect', answer };
  } catch (error) {
    if (error instanceof MathInputError)
      return {
        code:
          error.code === 'zero-denominator'
            ? 'zero-denominator'
            : /^\s*[+\-−]?[0-9۰-۹٠-٩]+\.[0-9۰-۹٠-٩]+\s*$/.test(input)
              ? 'premature-rounding'
              : 'invalid-input',
      };
    throw error;
  }
}
export function equationTex(eq: Equation): string {
  const coefficient = equals(eq.a, one) ? '' : equals(eq.a, negate(one)) ? '-' : tex(eq.a);
  const signed =
    eq.b.numerator < 0n ? ` - ${tex(negate(eq.b))}` : eq.b.numerator > 0n ? ` + ${tex(eq.b)}` : '';
  return `${coefficient}x${signed} = ${tex(eq.c)}`;
}
export function substitutionTex(eq: Equation, answer: Rational): string {
  const result = substitute(eq, answer);
  return `(${tex(eq.a)})(${tex(answer)}) + (${tex(eq.b)}) = ${tex(result.product)} + (${tex(eq.b)}) = ${tex(result.left)} ${result.equal ? '=' : '\\ne'} ${tex(result.right)}`;
}
export function operationText(action: Action): string {
  const name = { add: 'جمع', subtract: 'تفریق', multiply: 'ضرب', divide: 'تقسیم' }[
    action.operation
  ];
  return `${name} ${text(action.amount)} ${action.sides === 'both' ? 'در هر دو طرف' : `فقط در طرف ${action.sides === 'left' ? 'چپ' : 'راست'}`}`;
}
export function fromStrings(a: string, b: string, c: string): Equation {
  return equation(parseRational(a), parseRational(b), parseRational(c));
}
export function stateTex(state: State): string {
  const side = (s: Linear): string => {
    const hasX = !equals(s.x, zero);
    const variable = !hasX
      ? ''
      : `${equals(s.x, one) ? '' : equals(s.x, negate(one)) ? '-' : tex(s.x)}x`;
    if (s.constant.numerator === 0n) return variable || '0';
    const constant = tex(s.constant.numerator < 0n ? negate(s.constant) : s.constant);
    return `${variable}${hasX ? (s.constant.numerator < 0n ? ' - ' : ' + ') : s.constant.numerator < 0n ? '-' : ''}${constant}`;
  };
  return `${side(state.left)} = ${side(state.right)}`;
}
