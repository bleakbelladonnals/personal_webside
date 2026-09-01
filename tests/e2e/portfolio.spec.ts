import { expect, test } from '@playwright/test';

test('desktop recruiter flow opens apps and preserves the selected app', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop interaction');
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /把复杂 AI 能力/ })).toBeVisible();
  await expect(page.locator('[data-app-window="brief"]')).toBeVisible();

  await page.locator('[data-dock-app="projects"]').click();
  await expect(page).toHaveURL(/\?app=projects/);
  await expect(page.locator('[data-app-window="projects"]')).toBeVisible();
  await expect(page.locator('[data-app-window="projects"]').getByRole('heading', { name: 'LumiAgent' })).toBeVisible();

  await page.reload();
  await expect(page.locator('[data-app-window="projects"]')).toBeVisible();

  const aboutDock = page.locator('[data-dock-app="about"]');
  await aboutDock.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\?app=about/);
  await expect(page.locator('[data-app-window="about"]')).toBeVisible();
});

test('case-study deep link exposes decisions, evaluation and sourced results', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one deep-link pass is sufficient');
  await page.goto('/projects/lumiagent');

  await expect(page.getByRole('heading', { name: 'LumiAgent' })).toBeVisible();
  await expect(page.getByText('PRODUCT DECISIONS')).toBeVisible();
  await expect(page.getByText('EVALUATION')).toBeVisible();
  await expect(page.getByText('12 → 2 min')).toBeVisible();
});

test('mobile swaps draggable windows for an app card and tab bar', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile interaction');
  await page.goto('/');

  await expect(page.locator('.mobile-mode')).toBeVisible();
  await expect(page.locator('.desktop-mode')).toBeHidden();
  await page.locator('[data-dock-app="toolkit"]').click();
  await expect(page).toHaveURL(/\?app=toolkit/);
  await expect(page.getByRole('heading', { name: /能力不用进度条/ })).toBeVisible();
});

test('public pages do not expose private resume assets', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByText(/不公开手机号、微信二维码或简历 PDF/)).toBeVisible();
  await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
  await expect(page.locator('img[src*="wechat" i], img[src*="qr" i]')).toHaveCount(0);
});
