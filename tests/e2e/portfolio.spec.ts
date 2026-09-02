import { expect, test, type Page } from '@playwright/test';

async function bootToDesktop(page: Page) {
  await page.locator('#enter-donnaos').click();
  await expect(page.locator('#unlock-donnaos')).toBeVisible();
  await expect(page.locator('.os-desktop')).toHaveCount(0);
  await page.locator('#unlock-donnaos').click();
  await expect(page.locator('.os-desktop')).toBeVisible();
}

test('desktop recruiter flow opens the light Preview and Finder apps', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop interaction');
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'DONNAOS' })).toBeVisible();
  await page.waitForTimeout(400);
  await bootToDesktop(page);
  await expect(page.getByText('双击「recruiter brief」')).toBeVisible();
  await expect(page.locator('[data-app-window="brief"]')).toHaveCount(0);

  const guideMotion = await page.locator('[data-desktop-app="brief"]').evaluate((node) => {
    const style = getComputedStyle(node, '::after');
    return { name: style.animationName, iterations: style.animationIterationCount };
  });
  expect(guideMotion).toEqual({ name: 'brief-icon-pulse', iterations: '3' });

  await page.locator('[data-desktop-app="brief"]').dblclick();
  await expect(page.locator('[data-app-window="brief"]')).toBeVisible();
  await expect(page.locator('[data-app-window="brief"]')).toHaveClass(/os-window--light/);
  await expect(page.getByRole('heading', { name: 'Donna Gan' })).toBeVisible();
  await expect(page.getByRole('img', { name: '甘淑琪 Donna Gan' })).toBeVisible();
  await expect(page.getByText('12 → 2 min')).toBeVisible();
  await expect(page.getByText('企业 AI 0→1')).toBeVisible();
  await expect(page.getByText('AI Coding 与开源实践')).toBeVisible();
  await expect(page.getByText(/把复杂 AI 能力/)).toHaveCount(0);

  const briefFont = await page.locator('.brief-summary').evaluate((node) => getComputedStyle(node).fontFamily);
  expect(briefFont.toLowerCase()).not.toContain('mono');

  await page.getByRole('button', { name: '查看项目' }).click();
  await expect(page).toHaveURL(/\?app=projects/);
  await expect(page.locator('[data-app-window="projects"]')).toBeVisible();
  await expect(page.locator('[data-app-window="brief"]')).toHaveCount(0);
  await expect(page.locator('[data-app-window="projects"]')).toHaveClass(/os-window--layout-finder/);
  await expect(page.locator('.quicklook-heading').getByRole('heading', { name: 'LumiAgent' })).toBeVisible();
  await expect(page.getByText(/不只展示/)).toHaveCount(0);

  await expect(page.locator('[data-finder-project]')).toHaveCount(3);
  await page.locator('.finder-sidebar').getByRole('button', { name: /全部案例/ }).click();
  await expect(page.locator('[data-finder-project]')).toHaveCount(6);
  await page.locator('[data-finder-project="agentdock"]').click();
  await expect(page.locator('.quicklook-heading').getByRole('heading', { name: 'AgentDock' })).toBeVisible();
  await expect(page.locator('.quicklook-evidence')).toContainText('个人 MVP');
  await expect(page.locator('.quicklook-primary')).toHaveAttribute('href', '/projects/agentdock');

  await page.locator('.finder-sidebar').getByRole('button', { name: /Lab 实验室/ }).click();
  await expect(page.locator('[data-finder-kind="lab"]')).toHaveCount(2);
  await page.locator('[data-finder-project="dsh-echo"]').click();
  await expect(page.locator('.quicklook-heading').getByRole('heading', { name: 'DSH Echo' })).toBeVisible();
  await expect(page.locator('.quicklook-evidence')).toContainText('探索性插件');
  await expect(page.locator('.quicklook-primary')).toHaveAttribute('href', 'https://github.com/bleakbelladonnals/dsh-echo');

  await page.setViewportSize({ width: 1280, height: 720 });
  const projectWindowFits = await page.locator('[data-app-window="projects"]').evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return rect.left >= 0 && rect.top >= 34 && rect.right <= innerWidth && rect.bottom <= innerHeight - 38;
  });
  expect(projectWindowFits).toBe(true);

  await page.reload();
  await expect(page.locator('[data-app-window="projects"]')).toBeVisible();

  const aboutIcon = page.locator('[data-desktop-app="about"]');
  await aboutIcon.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\?app=about/);
  await expect(page.locator('[data-app-window="about"]')).toBeVisible();
  await expect(page.locator('[data-app-window="projects"]')).toHaveCount(0);

  await page.locator('[data-app-window="about"] .mac-close').click();
  await expect(page.locator('[data-app-window="about"]')).toHaveCount(0);
  await expect(page.getByText('双击「recruiter brief」')).toHaveCount(0);
});

test('remaining desktop apps share the light macOS document system', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop interaction');

  const apps = [
    { id: 'toolkit', heading: 'AI PM Toolkit' },
    { id: 'experience', heading: '工作与教育经历' },
    { id: 'about', heading: 'Donna Gan' },
    { id: 'contact', heading: '一起把复杂的 AI 能力，做成真正可用的产品。' },
  ];

  for (const app of apps) {
    await page.goto(`/?app=${app.id}`);
    const appWindow = page.locator(`[data-app-window="${app.id}"]`);
    await expect(appWindow).toBeVisible();
    await expect(appWindow).toHaveClass(/os-window--light/);
    await expect(appWindow.getByRole('heading', { name: app.heading })).toBeVisible();
    if (app.id === 'about') {
      await expect(appWindow.getByRole('img', { name: '甘淑琪 Donna Gan' })).toBeVisible();
    }
  }
});

test('Product Notes filters working notes and opens a shareable article', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop interaction');
  await page.goto('/?app=notes');

  const notesWindow = page.locator('[data-app-window="notes"]');
  await expect(notesWindow).toBeVisible();
  await expect(notesWindow).toHaveClass(/os-window--layout-notes/);
  await expect(page.locator('[data-note-slug]')).toHaveCount(3);
  await expect(notesWindow.getByText('结构化提纲 · 持续更新').first()).toBeVisible();

  await page.locator('.notes-sidebar').getByRole('button', { name: /产品拆解/ }).click();
  await expect(page.locator('[data-note-slug]')).toHaveCount(1);
  await expect(page.locator('[data-note-slug="openai-codex-workspace"]')).toBeVisible();

  await page.locator('.notes-sidebar').getByRole('button', { name: /学习笔记/ }).click();
  await expect(page.locator('[data-note-slug]')).toHaveCount(2);
  await page.locator('[data-note-slug="human-in-the-loop-design"]').click();
  await expect(notesWindow.getByRole('heading', { name: /Human-in-the-loop 不是兜底/ })).toBeVisible();
  await expect(notesWindow.getByRole('link', { name: /阅读全文/ })).toHaveAttribute('href', '/notes/human-in-the-loop-design');

  await page.setViewportSize({ width: 1280, height: 720 });
  const notesWindowFits = await notesWindow.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return rect.left >= 0 && rect.top >= 34 && rect.right <= innerWidth && rect.bottom <= innerHeight - 38;
  });
  expect(notesWindowFits).toBe(true);
});

test('working note route exposes outline, sources, related cases and Article metadata', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one deep-link pass is sufficient');
  await page.goto('/notes/openai-codex-workspace');

  await expect(page.getByRole('heading', { name: /OpenAI Codex 拆解/ })).toBeVisible();
  await expect(page.getByText('结构化提纲 · 持续更新')).toBeVisible();
  await expect(page.getByRole('navigation', { name: '文章目录' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '事实来源' })).toBeVisible();
  await expect(page.getByRole('link', { name: /AgentDock/ })).toHaveAttribute('href', '/projects/agentdock');

  const articleSchema = await page.locator('script[type="application/ld+json"]').textContent();
  expect(articleSchema).toContain('"@type":"Article"');
  expect(articleSchema).toContain('openai-codex-workspace');
});

test('case-study deep link exposes decisions, evaluation and sourced results', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one deep-link pass is sufficient');
  await page.goto('/projects/lumiagent');

  await expect(page.getByRole('heading', { name: 'LumiAgent' })).toBeVisible();
  await expect(page.getByText('PRODUCT DECISIONS')).toBeVisible();
  await expect(page.getByText('EVALUATION')).toBeVisible();
  await expect(page.getByText('12 → 2 min')).toBeVisible();
  await expect(page.getByText('公司内部试点')).toBeVisible();
  await expect(page.getByText(/1,000\+ 条覆盖标准问法/)).toBeVisible();
  await expect(page.getByText(/订单金额表示辅助覆盖规模/)).toBeVisible();
  await expect(page.getByRole('heading', { name: '可检查的产品工作样本' })).toBeVisible();
  await expect(page.locator('[data-work-sample]')).toHaveCount(3);
  await expect(page.getByText('MVP 场景优先级矩阵')).toBeVisible();
  await expect(page.getByText(/不伪造产品截图/)).toBeVisible();
});

test('empty desktop shows Now and opens Donna\'s Desk as a single window', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop interaction');
  await page.goto('/');
  await bootToDesktop(page);
  await page.locator('.os-desktop').click({ position: { x: 650, y: 320 } });

  const now = page.locator('.now-widget');
  await expect(now).toBeVisible();
  await expect(now.getByText('案例工作样本柜')).toBeVisible();
  await now.getByRole('button', { name: /Donna's Desk/ }).click();

  const desk = page.locator('[data-app-window="desk"]');
  await expect(desk).toBeVisible();
  await expect(page).toHaveURL(/\?app=desk/);
  await expect(desk.getByRole('heading', { name: '今天的工作台' })).toBeVisible();
  await expect(desk.locator('[data-desk-section]')).toHaveCount(5);
  await expect(desk.getByText('Work Surface')).toBeVisible();
  await expect(desk.getByRole('img', { name: '甘淑琪 Donna Gan' })).toHaveCount(0);
  await expect(page.locator('[data-app-window]')).toHaveCount(1);
});

test('first visit boots through login and return visits require a clean unlock', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop persistence');
  await page.goto('/');
  await expect(page.locator('#enter-donnaos')).toBeVisible();
  await page.locator('#enter-donnaos').click();
  await expect(page.locator('#unlock-donnaos')).toBeVisible();
  await expect(page.locator('.os-desktop')).toHaveCount(0);
  await page.locator('#visitor-password').press('Enter');
  await expect(page.locator('.os-desktop')).toBeVisible();
  await expect(page.getByText('双击「recruiter brief」')).toBeVisible();

  await page.locator('.os-desktop').click({ position: { x: 600, y: 300 } });
  await expect(page.getByText('双击「recruiter brief」')).toHaveCount(0);
  await page.goto('/');

  await expect(page.locator('#enter-donnaos')).toHaveCount(0);
  await expect(page.locator('#unlock-donnaos')).toBeVisible();
  await expect(page.locator('.os-desktop')).toHaveCount(0);
  await page.locator('#unlock-donnaos').click();
  await expect(page.locator('.os-desktop')).toBeVisible();
  await expect(page.getByText('双击「recruiter brief」')).toHaveCount(0);
  await expect(page.locator('[data-app-window]')).toHaveCount(0);
});

test('mobile Finder supports list, preview and back without horizontal overflow', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile interaction');
  await page.goto('/');

  await bootToDesktop(page);
  await page.locator('[data-desktop-app="projects"]').click();
  await expect(page).toHaveURL(/\?app=projects/);
  await expect(page.locator('[data-app-window="projects"]')).toBeVisible();
  await expect(page.locator('.finder-list-pane')).toBeVisible();
  await expect(page.locator('.finder-quicklook')).toBeHidden();

  await page.locator('[data-finder-project="lumiagent"]').click();
  await expect(page.locator('.finder-list-pane')).toBeHidden();
  await expect(page.locator('.finder-quicklook')).toBeVisible();
  await expect(page.locator('.quicklook-heading').getByRole('heading', { name: 'LumiAgent' })).toBeVisible();

  await page.getByRole('button', { name: '项目列表' }).click();
  await expect(page.locator('.finder-list-pane')).toBeVisible();
  await expect(page.locator('.finder-quicklook')).toBeHidden();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

test('mobile Product Notes supports list, preview and back without overflow', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile interaction');
  await page.goto('/?app=notes');

  await expect(page.locator('[data-app-window="notes"]')).toBeVisible();
  await expect(page.locator('.notes-list-pane')).toBeVisible();
  await expect(page.locator('.notes-preview')).toBeHidden();

  await page.locator('[data-note-slug="agent-evaluation-loop"]').click();
  await expect(page.locator('.notes-list-pane')).toBeHidden();
  await expect(page.locator('.notes-preview')).toBeVisible();
  await expect(page.locator('.notes-preview').getByRole('heading', { name: /Agent 评测体系/ })).toBeVisible();

  await page.getByRole('button', { name: '笔记列表' }).click();
  await expect(page.locator('.notes-list-pane')).toBeVisible();
  await expect(page.locator('.notes-preview')).toBeHidden();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

test('mobile Donna\'s Desk stays readable without horizontal overflow', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile interaction');
  await page.goto('/?app=desk');

  const desk = page.locator('[data-app-window="desk"]');
  await expect(desk).toBeVisible();
  await expect(desk.getByRole('heading', { name: '现在在做' })).toBeVisible();
  await expect(desk.getByRole('heading', { name: '最近整理' })).toBeVisible();
  await expect(desk.getByRole('heading', { name: '公开实验' })).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

test('public pages do not expose private resume assets', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByText(/不公开手机号、微信二维码或简历 PDF/)).toBeVisible();
  await expect(page.getByRole('img', { name: '甘淑琪 Donna Gan' })).toBeVisible();
  await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
  await expect(page.locator('img[src*="wechat" i], img[src*="qr" i]')).toHaveCount(0);
});

test('standalone project library separates mature cases from public labs', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one standalone pass is sufficient');
  await page.goto('/projects');

  await expect(page.locator('.projects-route-list > a')).toHaveCount(6);
  await expect(page.locator('.projects-route-lab a')).toHaveCount(2);
  await expect(page.getByRole('heading', { name: '实验室' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Artifact Harbor/ })).toHaveAttribute('href', 'https://github.com/bleakbelladonnals/dsh-artifact-harbor');
});

test('search and sharing metadata routes are available', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  const robots = await request.get('/robots.txt');
  const manifest = await request.get('/manifest.webmanifest');

  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain('/projects/lumiagent');
  expect(await sitemap.text()).toContain('/notes/openai-codex-workspace');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain('sitemap.xml');
  expect(manifest.ok()).toBe(true);
  expect(await manifest.text()).toContain('DonnaOS');
});
