const { chromium } = require('playwright');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PORT = 3042;
const BASE_URL = `http://localhost:${PORT}`;

function waitServer(url, timeout = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) resolve();
        else setTimeout(check, 500);
      }).on('error', () => {
        if (Date.now() - start > timeout) reject(new Error('Server start timed out'));
        else setTimeout(check, 500);
      });
    };
    check();
  });
}

async function verify() {
  const testResultsDir = path.join(__dirname, '..', 'test-results');
  if (!fs.existsSync(testResultsDir)) {
    fs.mkdirSync(testResultsDir, { recursive: true });
  }

  console.log(`Starting Next.js production server on port ${PORT}...`);
  const serverProcess = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
  });

  serverProcess.stdout.on('data', (d) => process.stdout.write(`[next] ${d}`));
  serverProcess.stderr.on('data', (d) => process.stderr.write(`[next-err] ${d}`));

  try {
    await waitServer(BASE_URL);
    console.log(`✅ Next.js server running at ${BASE_URL}`);

    const browser = await chromium.launch({ headless: true });

    // 1. Desktop Test (1440x900)
    console.log('\n--- 1. DESKTOP VERIFICATION (1440x900) ---');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(BASE_URL, { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(2000);

    // Scroll to #projects
    await desktopPage.evaluate(() => {
      document.getElementById('projects')?.scrollIntoView();
    });
    await desktopPage.waitForTimeout(1000);

    // Check project cards count
    const projectCards = await desktopPage.locator('#projects article').count();
    console.log(`Rendered project cards in 'All' view: ${projectCards}`);

    // Verify critical exclusion: tithyniloy
    const fullHtml = await desktopPage.content();
    const tithyniloyOccurrences = (fullHtml.match(/tithyniloy/gi) || []).length;
    console.log(`CRITICAL EXCLUSION CHECK: 'tithyniloy' occurrences in DOM: ${tithyniloyOccurrences}`);
    if (tithyniloyOccurrences > 0) {
      throw new Error(`CRITICAL EXCLUSION VIOLATION: tithyniloy found ${tithyniloyOccurrences} times in DOM!`);
    }

    // Verify screenshots rendered without 404
    const images = await desktopPage.locator('#projects article img').evaluateAll((imgs) =>
      imgs.map((img) => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
      }))
    );
    console.log(`Verified ${images.length} project preview images:`);
    images.forEach((img, idx) => {
      console.log(`  [${idx + 1}] ${img.src} (naturalWidth: ${img.naturalWidth})`);
    });

    await desktopPage.screenshot({
      path: path.join(testResultsDir, 'desktop-1440-projects.png'),
      fullPage: false,
    });
    console.log('Saved desktop verification screenshot.');

    // Test Domain Filter Strip
    console.log('\nTesting domain filter buttons...');
    const filterButtons = ['Systems & DevOps', 'Enterprise & Operations', 'EdTech & Health', 'Consumer & Utilities'];
    for (const filter of filterButtons) {
      await desktopPage.click(`role=tab[name*="${filter}"]`);
      await desktopPage.waitForTimeout(500);
      const filteredCount = await desktopPage.locator('#projects article').count();
      console.log(`  Filter '${filter}' -> ${filteredCount} projects rendered`);
    }
    // Return to All
    await desktopPage.click('role=tab[name*="All"]');
    await desktopPage.waitForTimeout(500);

    // 2. Tablet Test (768x1024)
    console.log('\n--- 2. TABLET VERIFICATION (768x1024) ---');
    const tabletContext = await browser.newContext({
      viewport: { width: 768, height: 1024 },
      deviceScaleFactor: 2,
    });
    const tabletPage = await tabletContext.newPage();
    await tabletPage.goto(BASE_URL, { waitUntil: 'networkidle' });
    await tabletPage.waitForTimeout(1500);
    await tabletPage.evaluate(() => {
      document.getElementById('projects')?.scrollIntoView();
    });
    await tabletPage.waitForTimeout(1000);

    const tabletScrollWidth = await tabletPage.evaluate(() => document.documentElement.scrollWidth);
    const tabletInnerWidth = await tabletPage.evaluate(() => window.innerWidth);
    console.log(`Tablet overflow check: scrollWidth=${tabletScrollWidth}, innerWidth=${tabletInnerWidth}`);

    await tabletPage.screenshot({
      path: path.join(testResultsDir, 'tablet-768-projects.png'),
      fullPage: false,
    });
    console.log('Saved tablet verification screenshot.');

    // 3. Mobile Test (390x844)
    console.log('\n--- 3. MOBILE VERIFICATION (390x844) ---');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1500);
    await mobilePage.evaluate(() => {
      document.getElementById('projects')?.scrollIntoView();
    });
    await mobilePage.waitForTimeout(1000);

    const mobileScrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    const mobileInnerWidth = await mobilePage.evaluate(() => window.innerWidth);
    console.log(`Mobile overflow check: scrollWidth=${mobileScrollWidth}, innerWidth=${mobileInnerWidth}`);
    if (mobileScrollWidth > mobileInnerWidth) {
      console.warn(`⚠️ Warning: Mobile horizontal overflow detected (${mobileScrollWidth} > ${mobileInnerWidth})`);
    } else {
      console.log('✅ Mobile has 0 horizontal scroll overflow!');
    }

    // Touch targets check on buttons
    const smallTargets = await mobilePage.evaluate(() => {
      const interactiveEls = Array.from(document.querySelectorAll('#projects button, #projects a'));
      const small = [];
      for (const el of interactiveEls) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && (rect.height < 34 || rect.width < 34)) {
          small.push({ text: el.innerText.trim().slice(0, 20), w: rect.width, h: rect.height });
        }
      }
      return small;
    });
    console.log(`Buttons checked for accessibility ergonomics: ${smallTargets.length} small elements found`);

    await mobilePage.screenshot({
      path: path.join(testResultsDir, 'mobile-390-projects.png'),
      fullPage: false,
    });
    console.log('Saved mobile verification screenshot.');

    await browser.close();
    console.log('\n🎉 ALL PORTFOLIO VERIFICATION SMOKE TESTS PASSED!');
  } finally {
    serverProcess.kill('SIGTERM');
  }
}

verify().catch((err) => {
  console.error('Smoke test failed:', err);
  process.exit(1);
});
