/** Exact rational arithmetic. All values are reduced, with a positive denominator. */
export type Rational = Readonly<{ numerator: bigint; denominator: bigint }>;
export class MathInputError extends Error {
  constructor(
    public readonly code:
      'invalid-input' | 'zero-denominator' | 'division-by-zero' | 'zero-coefficient',
  ) {
    super(code);
  }
}
function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}
export function rational(numerator: bigint, denominator = 1n): Rational {
  if (denominator === 0n) throw new MathInputError('zero-denominator');
  const sign = denominator < 0n ? -1n : 1n;
  const factor = gcd(numerator, denominator);
  return { numerator: (sign * numerator) / factor, denominator: (sign * denominator) / factor };
}
export const zero = rational(0n);
export const one = rational(1n);
export function parseRational(value: string): Rational {
  const digits = value
    .trim()
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    .replace(/−/g, '-');
  if (digits.length > 64) throw new MathInputError('invalid-input');
  const match = /^([+-]?\d+)(?:\s*\/\s*([+-]?\d+))?$/.exec(digits);
  if (!match) throw new MathInputError('invalid-input');
  return rational(BigInt(match[1]), match[2] ? BigInt(match[2]) : 1n);
}
export function add(a: Rational, b: Rational): Rational {
  return rational(
    a.numerator * b.denominator + b.numerator * a.denominator,
    a.denominator * b.denominator,
  );
}
export function negate(a: Rational): Rational {
  return rational(-a.numerator, a.denominator);
}
export function subtract(a: Rational, b: Rational): Rational {
  return add(a, negate(b));
}
export function multiply(a: Rational, b: Rational): Rational {
  return rational(a.numerator * b.numerator, a.denominator * b.denominator);
}
export function divide(a: Rational, b: Rational): Rational {
  if (b.numerator === 0n) throw new MathInputError('division-by-zero');
  return rational(a.numerator * b.denominator, a.denominator * b.numerator);
}
export function reciprocal(a: Rational): Rational {
  if (a.numerator === 0n) throw new MathInputError('division-by-zero');
  return rational(a.denominator, a.numerator);
}
export function equals(a: Rational, b: Rational): boolean {
  return a.numerator * b.denominator === b.numerator * a.denominator;
}
export function text(a: Rational): string {
  return a.denominator === 1n ? String(a.numerator) : `${a.numerator}/${a.denominator}`;
}
export function tex(a: Rational): string {
  if (a.denominator === 1n) return String(a.numerator);
  return `${a.numerator < 0n ? '-' : ''}\\frac{${a.numerator < 0n ? -a.numerator : a.numerator}}{${a.denominator}}`;
}
export function serialize(a: Rational): { numerator: string; denominator: string } {
  return { numerator: String(a.numerator), denominator: String(a.denominator) };
}
export function deserialize(value: { numerator: string; denominator: string }): Rational {
  if (!/^-?\d{1,64}$/.test(value.numerator) || !/^\d{1,64}$/.test(value.denominator))
    throw new MathInputError('invalid-input');
  return rational(BigInt(value.numerator), BigInt(value.denominator));
}
