import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/learning',
  '/learning/fractions',
  '/world',
  '/game',
  '/game/level/01',
  '/progress',
];
const buttonLikeLinks = [
  '[class*="_intro_"] > [class*="_actions_"] a',
  '[class*="heroActions"] a',
  '[class^="_end_"] a',
  '[class*="cardBottom"] a',
  '[class*="pauseOverlay"] a',
  '[class^="_next_"] a',
  '[class*="navigation"] a[class*="gameLink"]',
  '[class*="journeyList"] a',
  '[class^="_item_"]',
  '[class^="_skip_"]',
].join(', ');

for (const width of [320, 1280]) {
  test(`all buttons and button-like links have softened corners at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.addInitScript(() => {
      HTMLCanvasElement.prototype.getContext = () => null;
    });
    for (const route of routes) {
      await page.goto(`#${route}`);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await page.locator(buttonLikeLinks).count()).toBeGreaterThan(0);
      const sharp = await page
        .locator(`button, ${buttonLikeLinks}`)
        .evaluateAll((elements) =>
          elements
            .filter((element) => parseFloat(getComputedStyle(element).borderTopLeftRadius) < 8)
            .map((element) => `${element.tagName}: ${element.textContent?.trim().slice(0, 45)}`),
        );
      expect(sharp, `Sharp controls on ${route} at ${width}px`).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
      ).toBeLessThanOrEqual(1);
    }
  });
}
