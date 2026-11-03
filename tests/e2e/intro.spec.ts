import { expect, test } from '@playwright/test';

test('home and introduction link both ways, with keyboard and accessible card details', async ({
  page,
}) => {
  await page.goto('#/');
  await page.getByRole('link', { name: 'آشنایی با ماجراجویی' }).click();
  await expect(page).toHaveURL(/#\/intro$/);
  await expect(page.getByRole('heading', { level: 1, name: /هر معادله/ })).toBeVisible();
  const carousel = page.getByRole('region', { name: 'چهار ایستگاه یادگیری' });
  await expect(carousel.getByRole('link', { name: /تمرین برابری/ })).toBeVisible();
  await expect(carousel.getByRole('article', { name: /قلعهٔ معادله/ })).toHaveCSS('opacity', '1');
  await carousel.getByRole('button', { name: 'بیشتر بدان' }).click();
  await expect(carousel.getByText(/با ترازو و تمرین‌های دوطرفه/)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(carousel.getByRole('button', { name: 'بیشتر بدان' })).toBeFocused();
  await carousel.getByRole('button', { name: 'ایستگاه بعدی' }).click();
  await expect(carousel.getByRole('link', { name: /شناخت مجهول/ })).toBeVisible();
  await carousel.locator('[aria-label*="کلیدهای جهت‌نما"]').focus();
  await page.keyboard.press('ArrowLeft');
  await expect(carousel.getByRole('link', { name: /آزمودن عمل وارون/ })).toBeVisible();
  const stage = carousel.locator('[aria-label*="کلیدهای جهت‌نما"]');
  await stage.dispatchEvent('pointerdown', { clientX: 250 });
  await stage.dispatchEvent('pointerup', { clientX: 100 });
  await expect(carousel.getByRole('link', { name: /دیدن درس کسرها/ })).toBeVisible();
  await page.getByRole('link', { name: 'بازگشت به صفحهٔ اصلی' }).click();
  await expect(page).toHaveURL(/#\/$/);
  await expect(page.getByRole('heading', { level: 1, name: /سرزمین/ })).toBeVisible();
});

test('introduction fits narrow and wide screens, survives reload and respects reduced motion', async ({
  page,
}) => {
  test.setTimeout(60_000);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('#/intro');
    await expect(page.getByRole('heading', { level: 1, name: /هر معادله/ })).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
      .toBe(true);
    await page.reload();
    await expect(page.getByRole('heading', { level: 1, name: /هر معادله/ })).toBeVisible();
    const card = page
      .getByRole('region', { name: 'چهار ایستگاه یادگیری' })
      .locator('article')
      .filter({ has: page.getByRole('button', { name: 'بیشتر بدان' }) });
    expect(
      parseFloat(await card.evaluate((element) => getComputedStyle(element).transitionDuration)),
    ).toBeLessThan(0.001);
    await expect(page.getByRole('link', { name: 'بازگشت به صفحهٔ اصلی' })).toHaveAttribute(
      'href',
      '#/',
    );
  }
  await page.getByRole('button', { name: 'حرکت کمتر: خاموش' }).click();
  await expect(page.locator('[data-motion="reduce"]')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('[data-motion="reduce"]')).toHaveCount(1);
  expect(errors).toEqual([]);
});
