import { describe, it, expect } from 'vitest';
import {
  advance,
  BOUND,
  INTERACTION_RADIUS,
  keyDirection,
  nearest,
  SPEED,
  withinRange,
} from './movement';
import { landmarks } from '../../data/exploration';
const origin = { x: 0, z: 0 };
describe('pure exploration movement', () => {
  it('maps WASD and arrows consistently and ignores unrelated keys', () => {
    expect(keyDirection('W')).toBe('north');
    expect(keyDirection('ArrowUp')).toBe('north');
    expect(keyDirection('a')).toBe('west');
    expect(keyDirection('ArrowRight')).toBe('east');
    expect(keyDirection('e')).toBeNull();
  });
  it('normalizes diagonals, cancels opposites and caps elapsed time', () => {
    const cardinal = advance(origin, new Set(['north'] as const), 0.05);
    const diagonal = advance(origin, new Set(['north', 'east'] as const), 0.05);
    expect(Math.hypot(diagonal.x, diagonal.z)).toBeCloseTo(SPEED * 0.05);
    expect(Math.hypot(cardinal.x, cardinal.z)).toBeCloseTo(SPEED * 0.05);
    expect(advance(origin, new Set(['east', 'west'] as const), 0.05)).toEqual(origin);
    expect(advance(origin, new Set(['east'] as const), 500)).toEqual({ x: SPEED * 0.1, z: 0 });
  });
  it('stays inside world bounds and refuses invalid/idle deltas', () => {
    expect(advance(origin, new Set(['north'] as const), NaN)).toBe(origin);
    expect(advance(origin, new Set(), 1)).toBe(origin);
    let position = origin;
    for (let n = 0; n < 1000; n++)
      position = advance(position, new Set(['east', 'south'] as const), 0.05);
    expect(position.x).toBe(BOUND);
    expect(position.z).toBe(BOUND);
  });
  it('selects only nearby landmarks by distance, including boundary', () => {
    const target = landmarks[0];
    expect(withinRange({ x: target.x + INTERACTION_RADIUS, z: target.z }, target)).toBe(true);
    expect(withinRange(origin, target)).toBe(false);
    expect(nearest(origin, landmarks)).toBeNull();
    expect(nearest({ x: target.x, z: target.z }, landmarks)?.id).toBe(target.id);
  });
});
