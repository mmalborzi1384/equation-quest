import { describe, expect, it } from 'vitest';
import {
  add,
  deserialize,
  divide,
  equals,
  multiply,
  parseRational,
  rational,
  serialize,
  text,
} from './rational';
import {
  apply,
  equation,
  fromStrings,
  grade,
  initial,
  solution,
  step,
  substitute,
  type Action,
} from './equation';
import { generate } from './generate';

describe('exact rational core', () => {
  it('normalizes signs, zeros, Persian and Arabic digits, round-trips', () => {
    expect(text(parseRational('−۲ / ۴'))).toBe('-1/2');
    expect(text(parseRational('٣/-٦'))).toBe('-1/2');
    expect(text(rational(0n, -4n))).toBe('0');
    expect(deserialize(serialize(parseRational('-6/8')))).toEqual(parseRational('-3/4'));
    expect(() => deserialize({ numerator: '0', denominator: '0' })).toThrow();
  });
  it('rejects invalid boundaries and zero divisors', () => {
    for (const input of ['', '0.5', 'Infinity', '1/0', '1/2/3', '1e3'])
      expect(() => parseRational(input)).toThrow();
    expect(() => divide(rational(1n), rational(0n))).toThrow();
    expect(() => equation(rational(0n), rational(1n), rational(2n))).toThrow();
  });
  it('does not drift with fractional sums and products', () => {
    expect(text(add(parseRational('1/3'), parseRational('1/6')))).toBe('1/2');
    expect(text(multiply(parseRational('-2/3'), parseRational('3/4')))).toBe('-1/2');
  });
  it.each([
    ['2', '4', '12', '4'],
    ['-2', '3', '9', '-3'],
    ['2/3', '1/2', '5/6', '1/2'],
  ])('solves and substitutes %s x + %s = %s', (a, b, c, x) => {
    const eq = fromStrings(a, b, c);
    expect(equals(solution(eq), parseRational(x))).toBe(true);
    expect(substitute(eq, solution(eq)).equal).toBe(true);
    expect(grade(eq, x === '1/2' ? '2/4' : x).code).toBe('correct');
  });
  it('requires the right inverse on both sides; never accepts a one-sided move', () => {
    const eq = fromStrings('2/3', '1/2', '5/6');
    const first: Action = { operation: 'subtract', amount: parseRational('1/2'), sides: 'both' };
    expect(step(eq, 'constant', first).code).toBe('correct');
    expect(step(eq, 'constant', { ...first, sides: 'left' }).code).toBe('unilateral-change');
    expect(step(eq, 'constant', { ...first, amount: parseRational('-1/2') }).code).toBe(
      'wrong-inverse',
    );
    expect(
      step(eq, 'coefficient', { operation: 'divide', amount: parseRational('0'), sides: 'both' })
        .code,
    ).toBe('division-by-zero');
    expect(
      step(eq, 'coefficient', {
        operation: 'multiply',
        amount: parseRational('3/2'),
        sides: 'both',
      }).code,
    ).toBe('correct');
    expect(
      step(eq, 'coefficient', {
        operation: 'multiply',
        amount: parseRational('2/3'),
        sides: 'both',
      }).code,
    ).toBe('wrong-inverse');
    expect(apply(initial(eq), first).right.constant).toEqual(parseRational('1/3'));
  });
  it('differentiates invalid, zero denominator and incorrect answers', () => {
    const eq = fromStrings('2', '4', '12');
    expect(grade(eq, '1/0').code).toBe('zero-denominator');
    expect(grade(eq, '4.0').code).toBe('premature-rounding');
    expect(grade(eq, 'abc').code).toBe('invalid-input');
    expect(grade(eq, '3').code).toBe('incorrect');
    expect(substitute(eq, rational(3n)).equal).toBe(false);
  });
  it.each(['integer', 'signed', 'fraction'] as const)(
    'generates deterministic solvable bounded %s problems',
    (band) => {
      for (let seed = -4; seed < 8; seed++) {
        const eq = generate(seed, band);
        expect(generate(seed, band)).toEqual(eq);
        expect(eq.a.numerator).not.toBe(0n);
        expect(substitute(eq, solution(eq)).equal).toBe(true);
      }
    },
  );
});
