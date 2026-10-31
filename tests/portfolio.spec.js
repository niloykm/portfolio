const { test, expect } = require('@playwright/test');

test.describe('Linear/Vercel Product Showcase Portfolio QA (A11y, Interactive UX & Responsive)', () => {
  test('renders landmarks, single h1, valid heading hierarchy, theme toggle, interactive architecture drawer, and command palette', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Niloy Kumar Mohonta/);

    // Landmarks
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main#main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // No skipped heading levels
    const headingLevels = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(
        (el) => Number(el.tagName.slice(1))
      );
    });
    expect(headingLevels[0]).toBe(1);
    for (let i = 1; i < headingLevels.length; i++) {
      expect(headingLevels[i] - headingLevels[i - 1]).toBeLessThanOrEqual(1);
    }

    // No TODO(niloy) text rendered
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('TODO(niloy)');

    // Theme toggle works
    const themeToggle = page
      .locator('header button[aria-label*="Switch to"]')
      .first();
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveText(/\[(DARK|LIGHT)\]/);

    // Interactive Case Study & Architecture Drawer opens and closes with Escape
    const inspectBtn = page
      .getByRole('button', { name: /Inspect Architecture & Case Study/i })
      .first();
    await expect(inspectBtn).toBeVisible();
    await inspectBtn.click();

    const archDialog = page.locator('[role="dialog"][aria-labelledby="case-study-drawer-title"]');
    await expect(archDialog).toBeVisible();
    await expect(archDialog).toContainText('System Architecture Topology');

    await page.keyboard.press('Escape');
    await expect(archDialog).toBeHidden();

    // Open command palette via keyboard '/'
    await page.keyboard.press('/');
    const dialog = page.locator('[role="dialog"][aria-label="Command palette"]');
    await expect(dialog).toBeVisible();

    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('has no horizontal overflow across 375, 768, 1024, 1440, 1920 in light and dark themes', async ({
    page,
  }) => {
    const widths = [375, 768, 1024, 1440, 1920];

    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');

      // Light mode check
      const overflowInfo = await page.evaluate(() => {
        const cw = document.documentElement.clientWidth;
        const sw = document.documentElement.scrollWidth;
        const offenders = Array.from(document.querySelectorAll('*'))
          .filter((el) => el.getBoundingClientRect().right > cw)
          .slice(0, 5)
          .map((el) => `${el.tagName}.${el.className} (right=${el.getBoundingClientRect().right}, cw=${cw})`);
        return { ok: sw <= cw, cw, sw, offenders };
      });
      expect(overflowInfo, `Width ${width}: ${JSON.stringify(overflowInfo)}`).toEqual(
        expect.objectContaining({ ok: true })
      );

      // Switch to dark mode
      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
      });

      const overflowDark = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth
        );
      });
      expect(overflowDark).toBe(true);
    }
  });
});
