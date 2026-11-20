const { test, expect } = require("@playwright/test");

test.describe("Niloy Portfolio — Hiring Conversion, Integrity & Anti-Slop Verification", () => {
  test("should render truthful above-the-fold Hero identity, proof, and focused CTAs", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Niloy Kumar Mohonta/);

    const hero = page.locator("#top");
    await expect(hero).toContainText("Niloy Kumar Mohonta");
    await expect(hero).toContainText("Full-Stack Software Engineer");
    await expect(hero).toContainText("ScholarPASS");
    await expect(hero).toContainText("TripBooking.ai");
    await expect(hero).not.toContainText("Gen Stella IT");

    await expect(hero.getByRole("link", { name: /Explore Shipped Projects/i })).toBeVisible();
    await expect(hero.getByRole("link", { name: /Download Resume/i })).toBeVisible();
    await expect(hero.getByRole("button", { name: /Copy email/i })).toBeVisible();

    // Verified @niloykm GitHub links (no dead @niloydiu links)
    const deadLinks = page.locator('a[href*="github.com/niloydiu"]');
    await expect(deadLinks).toHaveCount(0);
    const liveGithubLinks = page.locator('a[href*="github.com/niloykm"]');
    expect(await liveGithubLinks.count()).toBeGreaterThan(0);
  });

  test("should display verified projects with accurate domain filter counts and private project exclusion", async ({
    page,
  }) => {
    await page.goto("/");

    const projectsSection = page.locator("#projects");
    await expect(projectsSection).toBeVisible();
    await expect(projectsSection).toContainText("Featured Engineering Projects");
    await expect(projectsSection).not.toContainText("tithyniloy");

    // Verify category tab count matches rendered cards
    const systemsTab = projectsSection.getByRole("tab", { name: /Systems & DevOps/i });
    await systemsTab.click();
    const renderedArticles = projectsSection.locator("article");
    await expect(renderedArticles).toHaveCount(3);

    // Open technical teardown modal and verify structured sections
    await projectsSection.getByRole("button", { name: /Inspect technical teardown/i }).first().click();
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    await expect(modal).toContainText("01 // Problem");
    await expect(modal).toContainText("02 // System Architecture & Stack");
    await expect(modal).toContainText("03 // Key Engineering Trade-offs");
    await page.keyboard.press("Escape");
    await expect(modal).toHaveCount(0);
  });

  test("should render equal-height Contact section cards on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const leftCard = page.getByTestId("contact-direct-card");
    const rightCard = page.getByTestId("contact-form-card");
    await expect(leftCard).toBeVisible();
    await expect(rightCard).toBeVisible();

    const leftBox = await leftCard.boundingBox();
    const rightBox = await rightCard.boundingBox();
    expect(leftBox).not.toBeNull();
    expect(rightBox).not.toBeNull();
    expect(Math.abs(leftBox.height - rightBox.height)).toBeLessThanOrEqual(1);
  });

  test("should render truthful Experience Ledger, verified metrics, and opt-in interactive CLI", async ({
    page,
  }) => {
    await page.goto("/");

    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection).toContainText("ScholarPASS");
    await expect(aboutSection).toContainText("TripBooking.ai");
    await expect(aboutSection).toContainText("TutorsPlan");
    await expect(aboutSection).toContainText("Daffodil International University");
    await expect(aboutSection).toContainText("Public Repos");
    await expect(aboutSection).toContainText("Years Exp");
    await expect(aboutSection).toContainText("Live Apps");
    await expect(aboutSection).not.toContainText("Commitment to Craft");

    // Terminal is opt-in (collapsed by default)
    await expect(page.locator("#terminal-command-input")).toHaveCount(0);
    await aboutSection.getByRole("button", { name: /Launch interactive developer terminal/i }).click();

    const terminalInput = page.locator("#terminal-command-input");
    await expect(terminalInput).toBeVisible();

    await terminalInput.fill("skills");
    await terminalInput.press("Enter");
    await expect(page.locator('[role="log"]')).toContainText("NestJS");
    await expect(page.locator('[role="log"]')).toContainText("PostgreSQL");

    await terminalInput.fill("cat resume");
    await terminalInput.press("Enter");
    await expect(page.locator('[role="log"]')).toContainText("Download Full Resume (PDF)");
  });

  test("should have 4 consolidated navbar links and open Command Palette on Ctrl+K", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const nav = page.locator('nav[aria-label="Main Navigation"]');
    await expect(nav).toContainText("Projects");
    await expect(nav).toContainText("Experience");
    await expect(nav).toContainText("Capabilities");
    await expect(nav).toContainText("Contact");

    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Command Palette" });
    await expect(dialog).toBeVisible();
  });

  test("should have zero horizontal overflow across 390px mobile, 768px tablet, and 1440px desktop viewports", async ({
    page,
  }) => {
    const viewports = [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto("/");

      const overflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth
        );
      });
      expect(overflow).toBe(false);
    }
  });
});
