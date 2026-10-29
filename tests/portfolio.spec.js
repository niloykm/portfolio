const { test, expect } = require('@playwright/test');

test.describe('Spec Sheet Portfolio QA (A11y & Responsive)', () => {
  test('renders landmarks, single h1, valid heading hierarchy, and keyboard palette', async ({
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
      const overflowLight = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth
        );
      });
      expect(overflowLight).toBe(true);

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
