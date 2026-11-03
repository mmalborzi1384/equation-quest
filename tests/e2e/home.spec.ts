import { expect, test } from '@playwright/test';

const home = '#/';

test('narrative stays readable across desktop, tablet and mobile sizes', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 780 });
    await page.goto(home);
    await expect(page.getByRole('heading', { level: 1, name: /سرزمین/ })).toBeVisible();
    await expect(page.locator('[data-narrative]')).toHaveCount(8);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `unexpected horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
    await expect(page.getByRole('link', { name: 'آشنایی با برابری ←' })).toHaveAttribute(
      'href',
      '#/learning/balance',
    );
  }
  expect(pageErrors).toEqual([]);
});

test('carousel controls and focused side card reach a real fraction route', async ({ page }) => {
  await page.goto(home);
  const status = page.getByTestId('carousel-status');
  await page.getByRole('button', { name: 'کارت بعدی' }).click();
  await expect(status).toContainText('جنگل مجهول');
  await page.getByRole('button', { name: 'نمایش کارت کسرهای دقیق' }).click();
  await expect(status).toContainText('راه قلعه');
  await page.getByRole('link', { name: 'دیدن مسیر', exact: true }).click();
  await expect(page).toHaveURL(/#\/learning\/fractions$/);
  await expect(page.getByRole('heading', { level: 1, name: 'معادله‌های کسری' })).toBeVisible();

  await page.goto(home);
  await page.getByRole('button', { name: 'نمایش این کارت' }).first().click();
  await expect(page.getByRole('link', { name: 'دیدن مسیر', exact: true })).toBeFocused();
  const stage = page.getByLabel('برای جابه‌جایی میان کارت‌ها از کلیدهای جهت‌نما استفاده کنید');
  await stage.focus();
  const before = await status.textContent();
  await page.keyboard.press('ArrowLeft');
  expect(await status.textContent()).not.toBe(before);
});

test('compact navigation and pointer swipe work at phone width without WebGL', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto(home);
  const stage = page.getByLabel('برای جابه‌جایی میان کارت‌ها از کلیدهای جهت‌نما استفاده کنید');
  const before = await page.getByTestId('carousel-status').textContent();
  await stage.dispatchEvent('pointerdown', { clientX: 220 });
  await stage.dispatchEvent('pointerup', { clientX: 60 });
  expect(await page.getByTestId('carousel-status').textContent()).not.toBe(before);
  await page.getByRole('button', { name: 'باز کردن فهرست' }).click();
  await page
    .getByRole('navigation', { name: 'ناوبری اصلی' })
    .getByRole('link', { name: 'دنیای بازی' })
    .click();
  await expect(page).toHaveURL(/#\/world$/);
});

test('system and user reduced-motion preferences keep all Home content available', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(home);
  await expect(page.getByRole('heading', { name: /چهار ایستگاه/ })).toBeVisible();
  const noGSAPStyles = await page.evaluate(() =>
    [...document.querySelectorAll('[data-reveal]')].every(
      (element) => !element.hasAttribute('style'),
    ),
  );
  expect(noGSAPStyles).toBe(true);
  await page.getByRole('button', { name: 'حرکت کمتر: خاموش' }).click();
  await expect(page.locator('[data-motion="reduce"]')).toHaveCount(1);
  await page.getByRole('button', { name: 'کارت بعدی' }).click();
  await expect(page.getByTestId('carousel-status')).toContainText('جنگل مجهول');
});

test('scroll narration moves a chapter into place and the web lens follows the pointer', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 780 });
  await page.goto(home);
  const chapter = page.getByRole('heading', { name: 'چهار ایستگاه؛ یک داستان' });
  await chapter.scrollIntoViewIfNeeded();
  await expect
    .poll(async () =>
      chapter.evaluate((element) =>
        Math.abs(new DOMMatrix(getComputedStyle(element).transform).m42),
      ),
    )
    .toBeLessThan(1);
  const stage = page.getByLabel('برای جابه‌جایی میان کارت‌ها از کلیدهای جهت‌نما استفاده کنید');
  await stage.scrollIntoViewIfNeeded();
  await stage.hover({ position: { x: 30, y: 50 } });
  await expect
    .poll(async () => stage.evaluate((element) => element.style.getPropertyValue('--lens-x')))
    .not.toBe('');
  await page.mouse.move(0, 0);
  await expect
    .poll(async () => stage.evaluate((element) => element.style.getPropertyValue('--lens-x')))
    .toBe('');
});
