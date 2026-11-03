/** Small, deterministic exploration sandbox. No puzzles, React, Three, or persistence. */
export type Point = Readonly<{ x: number; z: number }>;
export type Direction = 'north' | 'south' | 'east' | 'west';
export const BOUND = 5.6;
export const SPEED = 3.2;
export const INTERACTION_RADIUS = 1.8;
export const directions: Record<Direction, Point> = {
  north: { x: 0, z: -1 },
  south: { x: 0, z: 1 },
  east: { x: 1, z: 0 },
  west: { x: -1, z: 0 },
};
export function keyDirection(key: string): Direction | null {
  switch (key.toLowerCase()) {
    case 'arrowup':
    case 'w':
      return 'north';
    case 'arrowdown':
    case 's':
      return 'south';
    case 'arrowleft':
    case 'a':
      return 'west';
    case 'arrowright':
    case 'd':
      return 'east';
    default:
      return null;
  }
}
export function advance(position: Point, pressed: ReadonlySet<Direction>, seconds: number): Point {
  if (!Number.isFinite(seconds) || seconds <= 0 || pressed.size === 0) return position;
  const x = Number(pressed.has('east')) - Number(pressed.has('west'));
  const z = Number(pressed.has('south')) - Number(pressed.has('north'));
  if (!x && !z) return position;
  const magnitude = Math.hypot(x, z);
  // Cap elapsed time after backgrounding and keep all camera/player coordinates finite.
  const distance = SPEED * Math.min(seconds, 0.1);
  return {
    x: Math.max(-BOUND, Math.min(BOUND, position.x + (x / magnitude) * distance)),
    z: Math.max(-BOUND, Math.min(BOUND, position.z + (z / magnitude) * distance)),
  };
}
export function withinRange(position: Point, target: Point): boolean {
  return Math.hypot(position.x - target.x, position.z - target.z) <= INTERACTION_RADIUS;
}
export function nearest<T extends Point>(position: Point, targets: readonly T[]): T | null {
  const sorted = targets
    .filter((target) => withinRange(position, target))
    .sort(
      (a, b) =>
        Math.hypot(position.x - a.x, position.z - a.z) -
        Math.hypot(position.x - b.x, position.z - b.z),
    );
  return sorted[0] ?? null;
}
