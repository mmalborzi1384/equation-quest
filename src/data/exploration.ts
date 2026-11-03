import { islands } from './levels';
import type { Point } from '../features/exploration/movement';
export type Landmark = Point &
  Readonly<{
    id: string;
    name: string;
    detail: string;
    lesson: string;
    level: string;
    tone: string;
  }>;
const coordinates = [
  { x: -3.2, z: -3.2 },
  { x: 3.2, z: -3.2 },
  { x: -3.2, z: 3.2 },
  { x: 3.2, z: 3.2 },
];
const lessons = ['balance', 'unknown', 'fractions', 'verify'];
export const landmarks: readonly Landmark[] = islands.map((island, i) => ({
  ...coordinates[i],
  id: `region-${i + 1}`,
  name: island.name,
  detail: island.detail,
  lesson: lessons[i],
  level: island.level,
  tone: island.tone,
}));
