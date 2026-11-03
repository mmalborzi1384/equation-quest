import { expect, test, type BrowserContext, type Page } from '@playwright/test';
import { stages } from '../../src/features/level-manager/stages';
import { islands } from '../../src/data/levels';
import { operationText, solution, equationTex } from '../../src/features/equation-engine/equation';
import { text } from '../../src/features/equation-engine/rational';

let context: BrowserContext;
let page: Page;
test.describe.serial('eight authored stages, one verified journey for each', () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({
      viewport: { width: 390, height: 780 },
      baseURL: 'http://127.0.0.1:5173/equation-quest/',
    });
    page = await context.newPage();
    await page.addInitScript(() => {
      HTMLCanvasElement.prototype.getContext = () => null;
    });
  });
  test.afterAll(async () => {
    await context.close();
  });
  for (const stage of stages) {
    test(`stage ${stage.id}: concept, every exact puzzle and original verification`, async () => {
      await page.goto(`#/game/level/${stage.id}`);
      const panel = page.getByRole('region', { name: `بازی مرحلهٔ ${stage.id}` });
      if (stage.id === '06')
        await expect(panel.getByRole('img', { name: /دو نیمهٔ برابر یک کل/ })).toBeVisible();
      await expect(panel).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await panel
        .getByRole('button', { name: stage.concept.choices[stage.concept.correct] })
        .click();
      await expect(panel.getByRole('status')).toContainText(stage.concept.explanation);
      for (const [index, problem] of stage.problems.entries()) {
        const eq = problem.equation;
        await expect(
          panel.locator('annotation[encoding="application/x-tex"]').first(),
        ).toContainText(equationTex(eq));
        await panel
          .getByRole('button', {
            name: operationText({ operation: 'subtract', amount: eq.b, sides: 'both' }),
          })
          .click();
        if (eq.a.numerator !== eq.a.denominator)
          await panel
            .getByRole('button', {
              name: operationText({ operation: 'divide', amount: eq.a, sides: 'both' }),
            })
            .click();
        await panel.getByLabel(/مقدار دقیق x را بنویس/).fill(text(solution(eq)));
        await panel.getByRole('button', { name: 'بررسی پاسخ' }).click();
        await panel.getByRole('button', { name: 'نه، برابر نیستند' }).click();
        await expect(panel.getByRole('status')).toContainText('بررسی');
        await panel.getByRole('button', { name: /بله، برابرند/ }).click();
        if (index < stage.problems.length - 1) {
          await expect(panel.getByRole('button', { name: /مسئلهٔ بعدی/ })).toBeVisible();
          await panel.getByRole('button', { name: /مسئلهٔ بعدی/ }).click();
        }
      }
      await expect(panel.getByText(new RegExp(`مرحلهٔ ${stage.id} کامل شد`))).toBeVisible();
      await panel.getByRole('button', { name: 'شروع دوبارهٔ مرحله' }).click();
      await panel
        .getByRole('button', { name: stage.concept.choices[stage.concept.correct] })
        .click();
      await expect(page.getByRole('link', { name: `مرحلهٔ ${stage.id} کامل‌شده` })).toBeVisible();
      if (Number(stage.id) % 2 === 0) {
        const island = islands[Number(stage.id) / 2 - 1];
        await page.goto('#/world');
        const region = page.getByRole('article').filter({ hasText: island.name });
        await expect(region).toContainText('بازسازی‌شده');
        await page.goto('#/game');
        await page
          .getByRole('complementary', { name: 'نشان‌های چهار منطقه' })
          .getByRole('button', { name: new RegExp(island.name) })
          .click();
        await expect(page.getByText('هر دو مرحلهٔ این منطقه کامل شده‌اند.')).toBeVisible();
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
      ).toBeLessThanOrEqual(1);
    });
  }
});

test('locked route cannot bypass the previous stage; reloading resets the session-only gate', async ({
  page,
}) => {
  await page.goto('#/game/level/08');
  await expect(page.getByRole('region', { name: 'مرحلهٔ قفل‌شده' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'بازی مرحلهٔ 08' })).toHaveCount(0);
  await page.goto('#/world');
  await expect(page.getByText(/مرحلهٔ 08: آزمون نهایی \/ قفل‌شده/)).toBeVisible();
});
