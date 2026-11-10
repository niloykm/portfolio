const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PROJECTS = [
  {
    slug: 'nexusops',
    name: 'NexusOps',
    url: 'https://nexusops-six.vercel.app/',
    delay: 3500,
  },
  {
    slug: 'synapflow',
    name: 'SynapFlow',
    url: 'https://synapflow-three.vercel.app/',
    delay: 3500,
  },
  {
    slug: 'nobot',
    name: 'NoBot',
    url: 'https://nobot.vercel.app/',
    delay: 3500,
  },
  {
    slug: 'inventory',
    name: 'Niloy Inventory',
    url: 'https://niloyinventory.vercel.app/dashboard',
    delay: 3500,
  },
  {
    slug: 'newcare',
    name: 'NewCare',
    url: 'https://newcare.vercel.app/',
    delay: 3500,
  },
  {
    slug: 'ndemy',
    name: 'Ndemy',
    url: 'https://ndemy-frontend.vercel.app/',
    delay: 3500,
  },
  {
    slug: 'handson',
    name: 'HandsOn',
    url: 'https://handsoncom.vercel.app/',
    delay: 3500,
  },
  {
    slug: 'ecwearable',
    name: 'ECWearable',
    url: 'https://ecwearable.vercel.app/',
    delay: 3500,
  },
  {
    slug: 'nqr',
    name: 'NQR',
    url: 'https://nqr.vercel.app/',
    delay: 3500,
  },
  {
    slug: 'nrl',
    name: 'NRL',
    url: 'https://nrl-zeta.vercel.app/',
    delay: 3500,
  },
  {
    slug: 'whattocook',
    name: 'What To Cook',
    url: 'https://whattocook-niloy.vercel.app/',
    delay: 3500,
  },
];

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'projects');

async function captureAll() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`🚀 Launching Playwright browser for ${PROJECTS.length} project targets...`);
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  });

  const results = [];

  for (const proj of PROJECTS) {
    console.log(`\n📸 Capturing ${proj.name} (${proj.url})...`);
    const page = await context.newPage();

    try {
      try {
        await page.goto(proj.url, { waitUntil: 'networkidle', timeout: 20000 });
      } catch (navErr) {
        console.warn(`  ⚠️ Networkidle timed out, waiting domcontentloaded fallback...`);
        await page.goto(proj.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      }

      await page.waitForTimeout(proj.delay);

      // Dismiss any popups if present
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });

      // Capture desktop viewport
      const rawPngBuffer = await page.screenshot({
        type: 'png',
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });

      const webpPath = path.join(OUTPUT_DIR, `${proj.slug}.webp`);
      const pngPath = path.join(OUTPUT_DIR, `${proj.slug}.png`);

      await sharp(rawPngBuffer)
        .webp({ quality: 90, effort: 4 })
        .toFile(webpPath);

      await sharp(rawPngBuffer)
        .png({ compressionLevel: 8 })
        .toFile(pngPath);

      const statWebp = fs.statSync(webpPath);
      const statPng = fs.statSync(pngPath);

      console.log(`  ✅ Saved: ${proj.slug}.webp (${(statWebp.size / 1024).toFixed(1)} KB) | ${proj.slug}.png (${(statPng.size / 1024).toFixed(1)} KB)`);

      results.push({
        slug: proj.slug,
        name: proj.name,
        webpSize: statWebp.size,
        pngSize: statPng.size,
        status: 'OK',
      });
    } catch (err) {
      console.error(`  ❌ Failed capturing ${proj.slug}:`, err.message);
      results.push({
        slug: proj.slug,
        name: proj.name,
        status: 'ERROR: ' + err.message,
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log('\n================ SUMMARY ================');
  console.table(results);
}

captureAll().catch((err) => {
  console.error('Fatal screenshot error:', err);
  process.exit(1);
});
