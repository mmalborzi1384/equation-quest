import { expect, test } from '@playwright/test';

test.use({ deviceScaleFactor: 2 });

test('desktop WebGL: isometric scene, keyboard movement, nearby inspection and pause', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1280, height: 850 });
  await page.goto('#/game');
  const scene = page.getByRole('region', { name: 'کارگاه کاوش' });
  await expect(scene.locator('canvas')).toBeVisible();
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toBeInViewport();
  await scene.focus();
  await page.keyboard.down('ArrowUp');
  await page.keyboard.down('a');
  await expect(page.getByText(/نزدیک: جزیرهٔ تعادل/)).toBeVisible({ timeout: 12000 });
  await page.keyboard.up('ArrowUp');
  await page.keyboard.up('a');
  await page.keyboard.press('e');
  await expect(page.getByRole('link', { name: /درس مرتبط/ })).toHaveAttribute(
    'href',
    '#/learning/balance',
  );
  await page.keyboard.press('Escape');
  await expect(page.getByRole('region', { name: 'کاوش متوقف شده است' })).toBeVisible();
  const position = await page
    .locator('[dir="ltr"]')
    .filter({ hasText: /X .* Z / })
    .last()
    .textContent();
  await page.keyboard.down('d');
  await page.waitForTimeout(200);
  await page.keyboard.up('d');
  expect(
    await page
      .locator('[dir="ltr"]')
      .filter({ hasText: /X .* Z / })
      .last()
      .textContent(),
  ).toBe(position);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('region', { name: 'کاوش متوقف شده است' })).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('mobile WebGL: touch hold, landmark tap, low-quality preset and reduced motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('#/game');
  const scene = page.getByRole('region', { name: 'کارگاه کاوش' });
  await expect(scene.locator('canvas')).toBeVisible();
  await page.getByLabel('کیفیت نمایش').selectOption('low');
  await expect(scene).toHaveAttribute('data-quality', 'low');
  await expect
    .poll(async () =>
      page.locator('canvas').evaluate((canvas) => canvas.width / canvas.clientWidth),
    )
    .toBeLessThanOrEqual(1.05);
  const pad = page.getByRole('button', { name: 'بالا' });
  await pad.scrollIntoViewIfNeeded();
  const box = await pad.boundingBox();
  if (!box) throw new Error('touch control not visible');
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
  await page.waitForTimeout(450);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.getByText(/X 0\.0 · Z -/)).toBeVisible();
  await page
    .getByRole('complementary', { name: 'نشان‌های چهار منطقه' })
    .getByRole('button', { name: /غار وارون/ })
    .click();
  await expect(page.getByRole('link', { name: /درس مرتبط/ })).toHaveAttribute(
    'href',
    '#/learning/fractions',
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
  ).toBeLessThanOrEqual(1);
});

test('no-WebGL: accessible text map and controls stay interactive at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto('#/game');
  await expect(page.getByLabel('نقشهٔ متنی قابل استفاده بدون وب‌جی‌ال')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
  await page
    .getByLabel('نقشهٔ متنی قابل استفاده بدون وب‌جی‌ال')
    .getByRole('button', { name: 'غار وارون' })
    .click();
  await expect(page.getByRole('link', { name: /درس مرتبط/ })).toHaveAttribute(
    'href',
    '#/learning/fractions',
  );
  await page.getByRole('button', { name: 'بالا' }).click();
  await expect(page.getByText(/X 0\.0 · Z -/)).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
  ).toBeLessThanOrEqual(1);
});

test('WebGL context loss restores textual interaction; quality switch retains inspection', async ({
  page,
}) => {
  await page.goto('#/game');
  const scene = page.getByRole('region', { name: 'کارگاه کاوش' });
  await expect(scene.locator('canvas')).toBeVisible();
  await page
    .getByRole('complementary', { name: 'نشان‌های چهار منطقه' })
    .getByRole('button', { name: /قلعهٔ معادله/ })
    .click();
  await page.getByLabel('کیفیت نمایش').selectOption('high');
  await expect(page.getByRole('link', { name: /درس مرتبط/ })).toHaveAttribute(
    'href',
    '#/learning/verify',
  );
  await page
    .locator('canvas')
    .dispatchEvent('webglcontextlost', { bubbles: true, cancelable: true });
  await expect(page.getByLabel('نقشهٔ متنی قابل استفاده بدون وب‌جی‌ال')).toBeVisible();
  await expect(page.getByRole('link', { name: /درس مرتبط/ })).toHaveAttribute(
    'href',
    '#/learning/verify',
  );
});

test('scene and controls remain reachable at phone, tablet and desktop widths', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('#/game');
    await expect(page.getByRole('region', { name: 'کارگاه کاوش' }).locator('canvas')).toBeVisible();
    await page.getByRole('button', { name: 'بالا' }).scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: 'بالا' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'وقفه در کاوش' })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
      `${width}px`,
    ).toBeLessThanOrEqual(1);
  }
  expect(errors).toEqual([]);
});

test('keyboard control activates after navigating from the world map', async ({ page }) => {
  await page.goto('#/world');
  await page.getByRole('link', { name: 'کاوش در جزیرهٔ سه‌بعدی' }).click();
  await expect(page).toHaveURL(/#\/game$/);
  const scene = page.getByRole('region', { name: 'کارگاه کاوش' });
  await expect(scene.locator('canvas')).toBeVisible();
  await scene.scrollIntoViewIfNeeded();
  await scene.focus();
  await page.keyboard.down('w');
  await page.waitForTimeout(300);
  await page.keyboard.up('w');
  await expect(page.getByText(/X 0\.0 · Z -/)).toBeVisible();
});
