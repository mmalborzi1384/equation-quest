import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function collect(directory: string, extensions: readonly string[]): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...collect(path, extensions));
    else if (extensions.some((extension) => entry.name.endsWith(extension))) found.push(path);
  }
  return found;
}

// Guard files must not scan themselves: they intentionally contain the
// forbidden strings inside their own regexes and expected values.
const sourceFiles = collect(join(root, 'src'), ['.ts', '.tsx', '.css']).filter(
  (path) => !/\.test\.(ts|tsx)$/.test(path),
);
const read = (path: string) => readFileSync(path, 'utf8');
const offenders = (pattern: RegExp) =>
  sourceFiles.filter((path) => pattern.test(read(path))).map((path) => relative(root, path));

describe('motion safety guards', () => {
  it('never reintroduces text-wrap: balance', () => {
    // A Chromium 153 headless build crashed the renderer when `balance` was
    // applied to a long RTL heading inside a complex DOM. `pretty` is the
    // safe equivalent and is used everywhere instead.
    const files = [
      ...sourceFiles,
      join(root, 'design-proposal.html'),
      join(root, 'public', 'design-proposal.html'),
      join(root, 'index.html'),
    ];
    expect(files.filter((path) => /text-wrap:\s*balance/.test(read(path)))).toEqual([]);
  });

  it('keeps the published design board self-contained', () => {
    const published = read(join(root, 'public', 'design-proposal.html'));
    expect(published).not.toMatch(/node_modules\/|src\/assets\//);
    expect(published.match(/data:font\/woff2;base64,/g)).toHaveLength(4);
    expect(published.match(/data:image\/webp;base64,/g)).toHaveLength(1);
  });

  it('keeps GSAP confined to the lazy introduction route', () => {
    expect(
      sourceFiles
        .filter(
          (path) =>
            /\bfrom ['"]gsap['"]|import\(['"]gsap['"]\)/.test(read(path)) &&
            !relative(root, path).startsWith('src/pages/Intro/'),
        )
        .map((path) => relative(root, path)),
    ).toEqual([]);
  });

  it('keeps autoAnimate behind the shared motion hook', () => {
    expect(offenders(/@formkit\/auto-animate/)).toEqual(['src/features/motion/useMotionList.ts']);
  });

  it('does not animate every property with transition: all', () => {
    expect(offenders(/transition:\s*all/)).toEqual([]);
  });

  it('does not ship a permanent will-change hint', () => {
    expect(offenders(/will-change:/)).toEqual([]);
  });
});
