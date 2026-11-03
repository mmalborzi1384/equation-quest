import { expect, test } from '@playwright/test';

test('mobile menu opens with a short transition, stays keyboard-safe and closes with Escape or outside tap', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('#/');
  const menu = page.getByRole('button', { name: /فهرست/ });
  const nav = page.getByRole('navigation', { name: 'ناوبری اصلی' });
  await expect(nav).toBeHidden();
  await menu.focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('#site-navigation a').first()).not.toBeFocused();
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(nav).toBeVisible();
  await expect(nav).toHaveCSS('opacity', '1');
  expect(await nav.evaluate((node) => getComputedStyle(node).transitionDuration)).toContain(
    '0.26s',
  );
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(page.getByRole('button', { name: /فهرست/ })).toBeFocused();
  await menu.click();
  await page.mouse.click(12, 690);
  await expect(nav).toBeHidden();
  await menu.click();
  await nav.getByRole('link', { name: 'مسیر یادگیری' }).click();
  await expect(nav).toBeHidden();
  await expect(page.getByRole('heading', { level: 1, name: /از برابری/ })).toBeVisible();
});

test('motion preferences make the menu immediate without hiding links', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('#/');
  const menu = page.getByRole('button', { name: /فهرست/ });
  await menu.click();
  const nav = page.getByRole('navigation', { name: 'ناوبری اصلی' });
  await expect(nav).toBeVisible();
  expect(
    parseFloat(await nav.evaluate((node) => getComputedStyle(node).transitionDuration)),
  ).toBeLessThan(0.001);
  await nav.getByRole('link', { name: 'دنیای بازی' }).click();
  await expect(page.getByRole('heading', { level: 1, name: /چهار راه/ })).toBeVisible();
});

test('scrolling does not translate action containers or continuously blur buttons', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('#/progress');
  await expect(page.getByRole('heading', { level: 1, name: /راهی که واقعاً/ })).toBeVisible();
  const section = page.locator('[data-story]').first();
  const button = section.getByRole('button', { name: 'ریست پیشرفت مرحله‌ها' });
  const documentTop = async () =>
    button.evaluate((element) => element.getBoundingClientRect().top + scrollY);
  const before = await documentTop();
  await button.scrollIntoViewIfNeeded();
  await expect(section).toHaveAttribute('data-story-entered', 'true');
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, i % 2 === 0 ? 120 : -120);
    await expect.poll(documentTop).toBeGreaterThan(before - 1);
    expect(Math.abs((await documentTop()) - before)).toBeLessThan(1);
  }
  await expect(section).toHaveCSS('translate', 'none');
  await expect(button).toHaveCSS('backdrop-filter', 'none');
  await expect(button).toHaveCSS('filter', 'none');
  await button.focus();
  await expect(button).toBeFocused();
  await expect(button).toHaveCSS('border-top-left-radius', '9px');
  await expect(page.getByRole('button', { name: /بازگشت/ })).toHaveCSS('box-shadow', 'none');
});
