/* Production/Pages contract smoke. RELEASE_URL switches from an isolated local Vite preview
   to the public Pages origin; never infer successful deployment from a build artifact. */
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from '@playwright/test';

const local = !process.env.RELEASE_URL;
const base = new URL(process.env.RELEASE_URL || 'http://127.0.0.1:4173/equation-quest/');
if (!base.pathname.endsWith('/equation-quest/')) throw new Error('Expected /equation-quest/ base');
const routes = [
  '/',
  '/learning',
  '/learning/fractions',
  '/world',
  '/game',
  '/game/level/01',
  '/progress',
];
const server = local
  ? spawn('npm', ['run', 'preview', '--', '--port', '4173', '--strictPort'], {
      stdio: 'ignore',
      detached: true,
    })
  : null;

async function ready() {
  for (let i = 0; i < 30; i++) {
    if (server && server.exitCode !== null) throw new Error('Preview process exited');
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(4000) });
      if (response.ok) return;
    } catch {
      /* wait for preview or Pages propagation */
    }
    await delay(2000);
  }
  throw new Error(`Release URL did not become ready: ${base}`);
}

let browser;
try {
  await ready();
  browser = await chromium.launch({
    ...(process.env.EQ_CHROMIUM_PATH ? { executablePath: process.env.EQ_CHROMIUM_PATH } : {}),
    args: ['--disable-webgl'],
  });
  for (const width of [320, 1280]) {
    const page = await browser.newPage({
      viewport: { width, height: 800 },
      reducedMotion: 'reduce',
    });
    const failures = [];
    page.on('pageerror', (error) => failures.push(`JS: ${error.message}`));
    page.on('response', (response) => {
      if (response.status() >= 400) failures.push(`HTTP ${response.status()}: ${response.url()}`);
    });
    for (const route of routes) {
      const url = new URL(base);
      url.hash = route;
      const response = await page.goto(url.href, { waitUntil: 'networkidle' });
      // Same-document hash navigation returns null in Playwright; only a networked response has status.
      if (response && !response.ok()) failures.push(`Document failed: ${route}`);
      await page.locator('h1').first().waitFor({ state: 'visible' });
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1))
        failures.push(`Horizontal overflow at ${width}px ${route}`);
    }
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('heading', { level: 1 }).first().waitFor({ state: 'visible' });
    if (width === 320) {
      const menu = page.getByRole('button', { name: 'باز کردن فهرست' });
      await menu.click();
      await page
        .getByRole('navigation', { name: 'ناوبری اصلی' })
        .getByRole('link')
        .first()
        .waitFor();
      await page.keyboard.press('Escape');
      if ((await menu.getAttribute('aria-expanded')) !== 'false')
        failures.push('Menu Escape failed');
      // A real app-owned setting, in an isolated browser context; never modify other visitors' data.
      await page.getByRole('button', { name: 'حرکت کمتر: خاموش' }).click();
      await page.reload({ waitUntil: 'networkidle' });
      await page.getByRole('button', { name: 'حرکت کمتر: روشن' }).waitFor();
    }
    await page.close();
    if (failures.length) throw new Error(`${width}px: ${failures.join('; ')}`);
  }
  console.log(
    `PASS: production hash routes/assets/reload/320+1280px/RTL menu/saved preference at ${base}`,
  );
} finally {
  await browser?.close();
  if (server?.pid) {
    try {
      process.kill(-server.pid, 'SIGTERM');
    } catch {
      /* already exited */
    }
  }
}
