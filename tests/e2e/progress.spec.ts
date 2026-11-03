import { expect, test } from '@playwright/test';

test('verified fraction, settings and workshop persist across routes/reload; per-category and global deletion honor cancellation and unrelated data', async ({
  page,
}) => {
  await page.goto('#/progress');
  await expect(page.getByText(/هنوز مرحله‌ای بررسی و ذخیره نشده است/)).toBeVisible();
  await expect(page.getByText(/هنوز دستاوردی ثبت نشده/)).toBeVisible();
  await page.evaluate(() => localStorage.setItem('unrelated-site-key', 'preserve'));
  await page.getByRole('button', { name: 'حرکت کمتر: خاموش' }).click();
  await page.goto('#/learning/fractions');
  await page.getByRole('button', { name: 'تفریق 1/4 در هر دو طرف' }).click();
  await page.getByRole('button', { name: 'تقسیم 1/2 در هر دو طرف' }).click();
  await page.getByRole('textbox', { name: /مقدار دقیق/ }).fill('۲/۲');
  await page.getByRole('textbox', { name: /مقدار دقیق/ }).press('Enter');
  await page.getByRole('button', { name: /جواب تأیید می‌شود/ }).click();
  await expect(page.getByText(/1 تمرین کسری بررسی‌شده/)).toBeVisible();
  await page.reload();
  await expect(page.getByText(/تمرین 2/)).toBeVisible();
  await page.goto('#/progress');
  await expect(page.getByText(/1 تمرین کسری با بررسی جواب/)).toBeVisible();
  await expect(page.getByText(/آخرین جواب دقیق:/)).toBeVisible();
  await expect(
    page.getByRole('article').filter({ hasText: 'تنظیمات نمایش' }).getByText('حرکت کمتر: روشن'),
  ).toBeVisible();
  await page.getByRole('button', { name: 'ریست تمرین‌های کسری' }).first().click();
  await page.getByRole('button', { name: 'انصراف' }).click();
  await expect(page.getByText(/1 تمرین کسری با بررسی جواب/)).toBeVisible();
  await page.getByRole('button', { name: 'ریست تمرین‌های کسری' }).first().click();
  await page.getByRole('button', { name: 'بله، حذف شود' }).click();
  await expect(page.getByText(/0 تمرین کسری با بررسی جواب/)).toBeVisible();
  await page.goto('#/learning/fractions');
  await expect(page.getByText(/تمرین 1/)).toBeVisible();
  await page.goto('#/progress');
  await page.getByRole('button', { name: 'حذف همهٔ داده‌های ذخیره‌شده' }).click();
  await page.getByRole('button', { name: 'انصراف' }).click();
  await expect(
    page.getByRole('article').filter({ hasText: 'تنظیمات نمایش' }).getByText('حرکت کمتر: روشن'),
  ).toBeVisible();
  await page.getByRole('button', { name: 'حذف همهٔ داده‌های ذخیره‌شده' }).click();
  await page.getByRole('button', { name: 'بله، حذف شود' }).click();
  await expect(
    page.getByRole('article').filter({ hasText: 'تنظیمات نمایش' }).getByText('حرکت کمتر: خاموش'),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByText(/0 تمرین کسری با بررسی جواب/)).toBeVisible();
  await expect(
    page.getByRole('article').filter({ hasText: 'تنظیمات نمایش' }).getByText('حرکت کمتر: خاموش'),
  ).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('unrelated-site-key'))).toBe('preserve');
  expect(
    await page.evaluate(() =>
      Object.keys(localStorage).filter((key) => key.startsWith('equation-quest-')),
    ),
  ).toEqual([]);
});

test.describe('mobile and keyboard settings reset', () => {
  test.use({ viewport: { width: 320, height: 780 }, hasTouch: true });
  test('touch cancellation and keyboard confirmation update preference live and after reload', async ({
    page,
  }) => {
    await page.goto('#/progress');
    await page.getByRole('button', { name: 'حرکت کمتر: خاموش' }).tap();
    const settings = page.getByRole('article').filter({ hasText: 'تنظیمات نمایش' });
    await expect(settings.getByText('حرکت کمتر: روشن')).toBeVisible();
    await settings.getByRole('button', { name: 'ریست تنظیم حرکت کمتر' }).tap();
    await settings.getByRole('button', { name: 'انصراف' }).tap();
    await expect(settings.getByText('حرکت کمتر: روشن')).toBeVisible();
    await settings.getByRole('button', { name: 'ریست تنظیم حرکت کمتر' }).focus();
    await page.keyboard.press('Enter');
    await settings.getByRole('button', { name: 'بله، حذف شود' }).focus();
    await page.keyboard.press('Enter');
    await expect(settings.getByText('حرکت کمتر: خاموش')).toBeVisible();
    await page.reload();
    await expect(page.getByRole('button', { name: 'حرکت کمتر: خاموش' })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(1);
  });
});
