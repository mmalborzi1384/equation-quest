import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', selector: '[data-narrative]', title: /سرزمین/ },
  { path: '/learning', selector: '[data-story]', title: /از برابری/ },
  { path: '/learning/fractions', selector: '[data-story]', title: /معادله‌های کسری/ },
  { path: '/world', selector: '[data-story]', title: /چهار راه/ },
  { path: '/game', selector: '[data-story]', title: /ماجراجویی از/ },
  { path: '/progress', selector: '[data-story]', title: /راهی که واقعاً/ },
];

test('the real captured game background loads across responsive widths without WebGL or overflow', async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('#/');
    // A hash-only navigation can be same-document. Force a fresh document so
    // <picture> re-runs source selection for this viewport on every browser.
    await page.reload();
    const scene = page.getByRole('img', { name: /تصویر واقعیِ صحنهٔ چهار جزیره/ });
    const image = scene.locator('img');
    await expect(image).toBeVisible();
    await expect
      .poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
      .toBe(true);
    expect(await image.getAttribute('src')).toContain('game-scene-desktop');
    expect(await image.evaluate((img: HTMLImageElement) => img.currentSrc)).toContain(
      width <= 900 ? 'game-scene-mobile' : 'game-scene-desktop',
    );
    const preview = page
      .locator('[data-narrative]')
      .filter({ has: page.getByRole('heading', { name: /پل‌ها منتظر/ }) });
    await expect(preview).toHaveCSS('background-image', /game-scene/);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(1);
  }
});

test('section entry and Persian heading reveal occur once across routes; semantic text is complete throughout', async ({
  page,
}) => {
  for (const { path, selector, title } of routes) {
    await page.goto(`#${path}`);
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
    const target = page.locator(selector).last();
    const fullText = await target
      .locator('h2')
      .first()
      .textContent()
      .catch(() => null);
    await target.scrollIntoViewIfNeeded();
    await expect(target).toHaveAttribute('data-story-entered', 'true');
    const heading = target.locator('[data-story-type]').first();
    if (fullText && (await heading.count())) {
      await expect(heading).toHaveText(fullText.trim());
      await expect(heading).toHaveCSS('animation-name', 'story-type');
      const before = await heading.evaluate((node) => getComputedStyle(node).animationName);
      await page.evaluate(() => window.scrollTo(0, 0));
      await target.scrollIntoViewIfNeeded();
      expect(await heading.evaluate((node) => getComputedStyle(node).animationName)).toBe(before);
    }
  }
});

test('OS/user reduced motion and absent observer keep complete Persian text, focusable links and exact math', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('#/');
  const section = page.locator('[data-narrative]').first();
  await section.scrollIntoViewIfNeeded();
  await expect(section).not.toHaveAttribute('data-story-entered', 'true');
  await expect(section.getByRole('heading', { name: /تعادل/ })).toBeVisible();
  await page.goto('#/learning/fractions');
  await expect(page.locator('.katex-display').first()).toBeVisible();
  await page.getByRole('link', { name: /بازگشت به فهرست/ }).focus();
  await expect(page.getByRole('link', { name: /بازگشت به فهرست/ })).toBeFocused();
  await page.addInitScript(() => {
    Object.defineProperty(window, 'IntersectionObserver', { value: undefined, configurable: true });
  });
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'معادله‌های کسری' })).toBeVisible();
});

test('stable glass action states retain 9px corners, focus and contrast without scroll-bound blur', async ({
  page,
}) => {
  await page.goto('#/');
  const action = page.getByRole('link', { name: /آغاز مسیر یادگیری/ });
  await action.focus();
  await expect(action).toBeFocused();
  await expect(action).toHaveCSS('border-top-left-radius', '9px');
  await expect(action).toHaveCSS('box-shadow', /inset/);
  await expect(action).toHaveCSS('backdrop-filter', 'none');
  await page.setViewportSize({ width: 320, height: 780 });
  await expect(action).toHaveCSS('backdrop-filter', 'none');
  await action.click();
  await expect(page.getByRole('heading', { level: 1, name: /از برابری/ })).toBeVisible();
});

test('mobile lower-section reveals and the saved motion setting preserve navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 780 });
  for (const { path, selector, title } of routes) {
    await page.goto(`#${path}`);
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
    const target = page.locator(selector).last();
    await target.scrollIntoViewIfNeeded();
    await expect(target).toHaveAttribute('data-story-entered', 'true');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(1);
  }
  await page.getByRole('button', { name: 'حرکت کمتر: خاموش' }).click();
  await page.goto('#/');
  const chapter = page.locator('[data-narrative]').last();
  await chapter.scrollIntoViewIfNeeded();
  await expect(chapter.getByRole('heading')).toBeVisible();
  await expect(chapter).not.toHaveAttribute('data-story-entered', 'true');
  const action = page.getByRole('link', { name: /آغاز مسیر یادگیری/ });
  await expect(action).toHaveCSS('backdrop-filter', 'none');
  await action.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1, name: /از برابری/ })).toBeVisible();
});

test('game-image overlay keeps the lightest real pixels readable', async ({ page }) => {
  await page.goto('#/');
  const image = page.getByRole('img', { name: /تصویر واقعیِ صحنهٔ چهار جزیره/ }).locator('img');
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete)).toBe(true);
  const ratios = await image.evaluate(async (source: HTMLImageElement) => {
    const image = new Image();
    image.src = source.currentSrc;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = 80;
    canvas.height = 60;
    const context = canvas.getContext('2d')!;
    context.drawImage(image, 0, 0, 80, 60);
    const pixels = context.getImageData(0, 0, 80, 60).data;
    const linear = (value: number) => {
      const v = value / 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    const luminance = (rgb: number[]) =>
      rgb.map(linear).reduce((sum, n, index) => sum + n * [0.2126, 0.7152, 0.0722][index], 0);
    const colors = [
      [232, 238, 238],
      [233, 185, 104],
    ];
    const overlay = [16, 36, 61];
    const minimum = colors.map(() => Infinity);
    for (let i = 0; i < pixels.length; i += 4) {
      const background = overlay.map((channel, index) => channel * 0.85 + pixels[i + index] * 0.15);
      for (let j = 0; j < colors.length; j++) {
        const a = luminance(background),
          b = luminance(colors[j]);
        minimum[j] = Math.min(minimum[j], (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05));
      }
    }
    return minimum;
  });
  expect(ratios[0]).toBeGreaterThanOrEqual(4.5);
  expect(ratios[1]).toBeGreaterThanOrEqual(4.5);
});
