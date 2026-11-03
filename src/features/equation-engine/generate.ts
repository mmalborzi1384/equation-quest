import { add, multiply, parseRational, type Rational } from './rational';
import { equation, type Equation } from './equation';
export type Band = 'integer' | 'signed' | 'fraction';
const pools: Record<Band, ReadonlyArray<readonly [string, string, string]>> = {
  integer: [
    ['2', '4', '4'],
    ['3', '2', '3'],
    ['4', '1', '2'],
  ],
  signed: [
    ['-2', '3', '-3'],
    ['3', '-5', '2'],
    ['-3', '-2', '1'],
  ],
  fraction: [
    ['1/2', '1/4', '1'],
    ['2', '1/4', '1/2'],
    ['2/3', '1/2', '1/2'],
    ['-1/2', '1/4', '-1/2'],
  ],
};
/** Deterministic bounded problems; c is calculated rather than typed in. */
export function generate(seed: number, band: Band): Equation {
  if (!Number.isSafeInteger(seed)) throw new RangeError('seed must be a safe integer');
  const rows = pools[band];
  const [a, b, x] = rows[((seed % rows.length) + rows.length) % rows.length];
  const coefficient: Rational = parseRational(a);
  const constant = parseRational(b);
  return equation(coefficient, constant, add(multiply(coefficient, parseRational(x)), constant));
}
