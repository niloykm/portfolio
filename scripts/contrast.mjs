import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.join(process.cwd(), 'app', 'globals.css');
const css = fs.readFileSync(cssPath, 'utf8');

function extractBlock(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`));
  if (!match) {
    throw new Error(`Could not find selector block: ${selector}`);
  }
  const tokens = {};
  const varRegex = /--([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})/g;
  let m;
  while ((m = varRegex.exec(match[1])) !== null) {
    tokens[m[1]] = m[2].toUpperCase();
  }
  return tokens;
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance([r, g, b]) {
  const toLinear = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const [R, G, B] = [toLinear(r), toLinear(g), toLinear(b)];
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hexA, hexB) {
  const lumA = relativeLuminance(hexToRgb(hexA));
  const lumB = relativeLuminance(hexToRgb(hexB));
  const brightest = Math.max(lumA, lumB);
  const darkest = Math.min(lumA, lumB);
  return (brightest + 0.05) / (darkest + 0.05);
}

const light = extractBlock(css, ':root');
const dark = extractBlock(css, '.dark');

const pairs = [
  ['ink', 'bg'],
  ['ink-2', 'bg'],
  ['muted', 'bg'],
  ['accent', 'bg'],
  ['accent-ink', 'accent'],
  ['success', 'bg'],
  ['warning', 'bg'],
  ['ink', 'surface'],
  ['ink-2', 'surface'],
  ['muted', 'surface'],
  ['accent', 'surface'],
  ['success', 'surface'],
  ['warning', 'surface'],
];

let failed = false;

for (const [schemeName, tokens] of [
  ['light', light],
  ['dark', dark],
]) {
  console.log(`\n=== ${schemeName.toUpperCase()} MODE ===`);
  for (const [fgKey, bgKey] of pairs) {
    const fg = tokens[fgKey];
    const bg = tokens[bgKey];
    if (!fg || !bg) {
      console.error(`Missing token in ${schemeName}: ${fgKey} or ${bgKey}`);
      failed = true;
      continue;
    }
    const ratio = contrastRatio(fg, bg);
    const pass = ratio >= 4.5;
    if (!pass) failed = true;
    console.log(
      `${pass ? 'PASS' : 'FAIL'}  ${fgKey.padEnd(10)} (${fg}) on ${bgKey.padEnd(8)} (${bg}) -> ${ratio.toFixed(2)}:1`
    );
  }
}

if (failed) {
  process.exit(1);
}
