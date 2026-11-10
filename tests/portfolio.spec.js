const { test, expect } = require("@playwright/test");

test.describe("Niloy Portfolio — Production Refactor & Anti-Slop Verification", () => {
  test("should render realistic non-zero metrics and Experience Timeline immediately upon first render", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Niloy Kumar Mohonta/);

    // Verify Developer Overview counters never show 0+
    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection).toContainText("GitHub Repos");
    await expect(aboutSection).toContainText("Development Exp");
    await expect(aboutSection).toContainText("Commitment to Craft");
    await expect(aboutSection).toContainText("3+ Yrs");
    await expect(aboutSection).toContainText("100%");
    await expect(aboutSection).not.toContainText("0+ GitHub Repos");
    await expect(aboutSection).not.toContainText("0+ Yrs");

    // Verify Experience Timeline highlights Gen Stella IT, ScholarPASS, TripBooking.ai, TutorsPlan, and DIU CSE
    await expect(aboutSection).toContainText("Gen Stella IT");
    await expect(aboutSection).toContainText("ScholarPASS");
    await expect(aboutSection).toContainText("TripBooking.ai");
    await expect(aboutSection).toContainText("TutorsPlan");
    await expect(aboutSection).toContainText("Daffodil International University");
  });

  test("should render updated Hero badge, punchy engineering proof, and CTAs", async ({
    page,
  }) => {
    await page.goto("/");

    const hero = page.locator("#top");
    await expect(hero).toContainText(
      "Full-Stack Software Engineer & Co-Founder at Gen Stella IT"
    );
    await expect(hero).toContainText(
      "Engineered full-stack SaaS platforms, custom LMS RBAC auth engines, and cloud infrastructures handling high-concurrency workloads."
    );
    await expect(hero).toContainText(
      "Architecting resilient web applications, modular NestJS/Node.js backend systems, and pixel-complete React/Next.js interfaces with strict performance standards."
    );

    await expect(hero.getByRole("link", { name: /Explore Projects/i })).toBeVisible();
    await expect(hero.getByRole("button", { name: /Copy email/i })).toBeVisible();
    await expect(hero.getByRole("link", { name: /Download Resume/i })).toBeVisible();
  });

  test("should consolidate projects into Featured Engineering Projects with architectural breakdowns", async ({
    page,
  }) => {
    await page.goto("/");

    const projectsSection = page.locator("#projects");
    await expect(projectsSection).toBeVisible();
    await expect(projectsSection).toContainText("Featured Engineering Projects");

    // Ensure duplicate Open Source Work section is removed
    await expect(page.locator("#blog")).toHaveCount(0);
    await expect(page.getByText("Open Source Work")).toHaveCount(0);

    // Check live demo and niloydiu GitHub links
    const liveDemoLinks = projectsSection.locator('a[href*="vercel.app"]');
    expect(await liveDemoLinks.count()).toBeGreaterThan(0);

    const githubLinks = projectsSection.locator(
      'a[href*="github.com/niloydiu"]'
    );
    expect(await githubLinks.count()).toBeGreaterThan(0);
  });

  test("should support interactive CLI commands and history in DevTerminal", async ({
    page,
  }) => {
    await page.goto("/");

    const terminalInput = page.locator("#terminal-command-input");
    await expect(terminalInput).toBeVisible();

    await terminalInput.fill("skills");
    await terminalInput.press("Enter");
    await expect(page.locator('[role="log"]')).toContainText("NestJS");
    await expect(page.locator('[role="log"]')).toContainText("PostgreSQL");
    await expect(page.locator('[role="log"]')).toContainText("Docker");

    await terminalInput.fill("cat resume");
    await terminalInput.press("Enter");
    await expect(page.locator('[role="log"]')).toContainText(
      "Download Full Resume (PDF)"
    );
  });

  test("should have 4 consolidated navbar links and open Command Palette on Ctrl+K", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const nav = page.locator('nav[aria-label="Main Navigation"]');
    await expect(nav).toContainText("About");
    await expect(nav).toContainText("Expertise");
    await expect(nav).toContainText("Projects");
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
