import { expect, test } from '@playwright/test';

test('ordered exact-rational workshop, progressive feedback and persisted one-time points', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto('#/game');
  await page.getByRole('button', { name: /شروع آزمایش‌های معادله/ }).click();
  const lab = page.getByRole('region', { name: 'کارگاه سازوکار معادله' });
  await expect(lab).toBeVisible();
  const nav = lab.getByRole('navigation', { name: 'آزمایش‌های سازوکار' });
  const points = lab.locator('strong').first();
  await nav.getByRole('button', { name: /علامت‌ها را نگه دار/ }).click();
  await expect(lab.getByRole('status')).toContainText('هنوز باز نشده');
  await lab.getByRole('button', { name: /راهنمای گام 1/ }).click();
  await expect(lab.getByRole('status')).toContainText('جملهٔ ثابت');
  await lab.getByRole('button', { name: 'تفریق -4 در هر دو طرف' }).click();
  await expect(lab.getByRole('status')).toContainText('علامت');
  await lab.getByRole('button', { name: 'تفریق 4 در هر دو طرف' }).click();
  await lab.getByRole('button', { name: 'ضرب 2 در هر دو طرف' }).click();
  await expect(lab.getByRole('status')).toContainText('ضریب را دوباره ضرب کردی');
  await lab.getByRole('button', { name: 'تقسیم 2 در هر دو طرف' }).click();
  await lab.getByLabel(/مقدار دقیق x/).fill('4');
  await lab.getByRole('button', { name: 'آزمایش جواب' }).click();
  await expect(points).toHaveText('0');
  await lab.getByRole('button', { name: 'نه، برابر نیستند' }).click();
  await expect(points).toHaveText('0');
  await lab.getByRole('button', { name: /بله، برابرند/ }).click();
  await expect(points).toHaveText('10');
  await lab.getByRole('button', { name: /آزمایش بعدی/ }).click();
  await lab.getByRole('button', { name: 'تفریق 3 در هر دو طرف' }).click();
  await lab.getByRole('button', { name: 'تقسیم -2 در هر دو طرف' }).click();
  await lab.getByLabel(/مقدار دقیق x/).fill('-3');
  await lab.getByRole('button', { name: 'آزمایش جواب' }).click();
  await lab.getByRole('button', { name: /بله، برابرند/ }).click();
  await lab.getByRole('button', { name: /آزمایش بعدی/ }).click();
  await lab.getByRole('button', { name: 'تفریق 1/2 در هر دو طرف' }).click();
  await lab.getByRole('button', { name: 'تقسیم 2/3 در هر دو طرف' }).click();
  await lab.getByLabel(/مقدار دقیق x/).fill('0.5');
  await lab.getByRole('button', { name: 'آزمایش جواب' }).click();
  await expect(lab.getByRole('status')).toContainText('کسر');
  await lab.getByLabel(/مقدار دقیق x/).fill('2/4');
  await lab.getByRole('button', { name: 'آزمایش جواب' }).click();
  await lab.getByRole('button', { name: /بله، برابرند/ }).click();
  await expect(points).toHaveText('30');
  await lab.getByRole('button', { name: 'شروع دوبارهٔ همین آزمایش' }).click();
  await lab.getByRole('button', { name: 'تفریق 1/2 در هر دو طرف' }).click();
  await lab.getByRole('button', { name: 'تقسیم 2/3 در هر دو طرف' }).click();
  await lab.getByLabel(/مقدار دقیق x/).fill('1/2');
  await lab.getByRole('button', { name: 'آزمایش جواب' }).click();
  await lab.getByRole('button', { name: /بله، برابرند/ }).click();
  await expect(points).toHaveText('30');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
  ).toBeLessThanOrEqual(1);
  await page.reload();
  await expect(
    page.getByRole('region', { name: 'کارگاه سازوکار معادله' }).locator('strong').first(),
  ).toHaveText('30');
  await page
    .getByRole('region', { name: 'کارگاه سازوکار معادله' })
    .getByRole('button', { name: 'ریست آزمایش‌های سازوکار' })
    .click();
  await page.getByRole('button', { name: 'بله، حذف شود' }).click();
  await page.reload();
  await expect(
    page.getByRole('region', { name: 'کارگاه سازوکار معادله' }).locator('strong').first(),
  ).toHaveText('0');
});
