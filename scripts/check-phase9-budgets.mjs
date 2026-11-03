import { readdirSync, readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const budgets = [
  ['src/assets/game-scene-desktop.webp', 45_000],
  ['src/assets/game-scene-mobile.webp', 25_000],
];
for (const [path, limit] of budgets) {
  const bytes = statSync(path).size;
  console.log(`${path}: ${bytes} bytes (budget ${limit})`);
  if (bytes > limit) process.exitCode = 1;
}
const scene = readdirSync('dist/assets').find((file) => /^ExplorationScene-.*\.js$/.test(file));
if (!scene) throw new Error('Missing built lazy scene');
const compressed = gzipSync(readFileSync(`dist/assets/${scene}`)).length;
console.log(`lazy scene: ${compressed} gzip bytes (budget 260000)`);
if (compressed > 260_000) process.exitCode = 1;
