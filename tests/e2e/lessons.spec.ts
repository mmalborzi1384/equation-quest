import { expect, test } from '@playwright/test';
import { topics } from '../../src/data/topics';

test('each of nine independent routes shows teaching, a model and a guided action', async ({
  page,
}) => {
  for (const topic of topics) {
    await page.goto(`#/learning/${topic.id}`);
    await expect(page.getByRole('heading', { level: 1, name: topic.title })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'گام‌ها را خودت بساز' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'همهٔ موضوع‌ها' })).toHaveAttribute(
      'href',
      '#/learning',
    );
    await expect(page.getByRole('button', { name: /فقط در طرف چپ/ })).toBeVisible();
  }
});

test('guided fraction lesson runs without WebGL at narrow width and honors reduced motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto('#/learning/fractions');
  await expect(page.getByRole('heading', { name: 'معادله‌های کسری' })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.getByRole('button', { name: 'تفریق 1/4 فقط در طرف چپ' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'فقط یک طرف' })).toBeVisible();
  await page.getByRole('button', { name: 'تفریق 1/4 در هر دو طرف' }).click();
  await page.getByRole('button', { name: 'تقسیم 1/2 در هر دو طرف' }).click();
  await page.getByRole('textbox', { name: /مقدار دقیق/ }).fill('۲/۲');
  await page.getByRole('textbox', { name: /مقدار دقیق/ }).press('Enter');
  await expect(page.getByRole('heading', { name: 'بازگشت به معادلهٔ اصلی' })).toBeVisible();
  await page.getByRole('button', { name: /جواب تأیید می‌شود/ }).click();
  await page.getByRole('button', { name: /تمرین کسری بعدی/ }).click();
  await expect(page.getByText(/تمرین 2/)).toBeVisible();
});

test('learning overview keeps RTL text and LTR math with keyboard focus', async ({ page }) => {
  await page.goto('#/learning');
  await expect(page.locator('[dir="rtl"]').first()).toBeVisible();
  await page
    .getByRole('link', { name: /معادله‌های کسری/ })
    .first()
    .click();
  await expect(page).toHaveURL(/#\/learning\/fractions$/);
  const math = page.locator('.katex-display').first();
  await expect(math).toBeVisible();
  await expect(math.locator('xpath=../..')).toHaveAttribute('dir', 'ltr');
  const button = page.getByRole('button', { name: 'تفریق 1/4 در هر دو طرف' });
  await button.focus();
  await expect(button).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'چگونه ضریب x را ۱ می‌کنی؟' })).toBeVisible();
});

test('all lesson routes fit mobile, tablet and desktop without page overflow', async ({ page }) => {
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    for (const topic of topics) {
      await page.goto(`#/learning/${topic.id}`);
      await expect(page.getByRole('heading', { level: 1, name: topic.title })).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow, `${topic.id} at ${width}px`).toBeLessThanOrEqual(1);
    }
  }
});
