#!/usr/bin/env node
// Assembles the bridge-test pages from shared partials.
//
//   node build/assemble.mjs           write v1/ … v5/index.html, plus index.html (= v1), and publish
//                                     src/images/* to images/ (src/ itself is not deployed)
//   node build/assemble.mjs --check   exit 1 if any committed page is out of date with src/
//
// Template syntax (src/layout.html, src/partials/*, src/pages/*):
//   {{> name.html}}                 include src/partials/name.html (or src/pages/name.html)
//   {{> name.html KEY=val K2=val}}  include with extra variables for that include
//   {{KEY}}                         variable; HTML-escaped unless the name ends in _HTML
// Any variable left unresolved is an error, so a typo never ships as literal braces.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const pages = JSON.parse(readFileSync(join(SRC, 'pages.json'), 'utf8'));

const escapeHtml = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function readPartial(name) {
  for (const dir of ['partials', 'pages']) {
    const file = join(SRC, dir, name);
    if (existsSync(file)) return readFileSync(file, 'utf8');
  }
  throw new Error(`Missing partial: ${name}`);
}

function parseArgs(argString) {
  const args = {};
  for (const m of argString.matchAll(/(\w+)=(.*?)(?=\s+\w+=|$)/g)) args[m[1]] = m[2].trim();
  return args;
}

function render(template, vars, stack = []) {
  const withIncludes = template.replace(/\{\{>\s*([\w.-]+)([^}]*)\}\}/g, (_, name, argString) => {
    if (stack.includes(name)) throw new Error(`Include loop: ${[...stack, name].join(' → ')}`);
    return render(readPartial(name), { ...vars, ...parseArgs(argString) }, [...stack, name]);
  });
  return withIncludes.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) throw new Error(`Unresolved {{${key}}} in ${stack.at(-1) || 'layout.html'}`);
    return key.endsWith('_HTML') ? vars[key] : escapeHtml(vars[key]);
  });
}

function buildPage(variant, page) {
  const vars = {
    VARIANT: variant,
    SHOW_PROMO: page.showPromo ? 'true' : 'false',
    TITLE: page.title,
    DESCRIPTION: page.subhead,
    H1: page.title,
    SUBHEAD: page.subhead,
    HERO_FILE: page.hero.file,
    HERO_ALT: page.hero.alt,
    // Guarantee box: full policy by default; "short" where the page body already carries it (v4 section 4).
    GUARANTEE_HTML: page.guaranteeBox === 'short'
      ? "    <p>If it isn't bubbling by day 7, we send a fresh packet, free.</p>\n    <p>How it works is in section 4 above.</p>"
      : "    <p>Not bubbling by day 7? Send us a photo and we'll ship a fresh packet, free. Ordered on Amazon? Message us from Your Orders.</p>",
    HERO_CAPTION_HTML: page.hero.caption ? `    <figcaption>${escapeHtml(page.hero.caption)}</figcaption>\n` : '',
  };
  vars.BYLINE_HTML = page.byline ? render(readPartial('byline.html'), vars) : '';
  vars.BODY_HTML = render(readPartial(page.body), vars, [page.body]);
  vars.REVIEWS_HTML = page.reviewsInBody ? '' : render(readPartial('reviews.html'), vars, ['reviews.html']);
  return render(readFileSync(join(SRC, 'layout.html'), 'utf8'), vars);
}

const outputs = {};
for (const [variant, page] of Object.entries(pages)) outputs[`${variant}/index.html`] = buildPage(variant, page);
outputs['index.html'] = outputs['v1/index.html']; // "/" serves v1 for now

// Generated images live in src/images/ and are published to images/ under the same name.
const SRC_IMAGES = join(SRC, 'images');
const srcImages = existsSync(SRC_IMAGES) ? readdirSync(SRC_IMAGES).filter((f) => !f.startsWith('.') && statSync(join(SRC_IMAGES, f)).isFile()) : [];
for (const f of srcImages) outputs[`images/${f}`] = readFileSync(join(SRC_IMAGES, f));

// Every /images/… a page points at must exist once published.
const missing = new Set();
for (const [rel, html] of Object.entries(outputs)) {
  if (!rel.endsWith('.html')) continue;
  for (const m of html.matchAll(/(?:src|poster)="\/images\/([^"]+)"/g)) {
    if (!srcImages.includes(m[1]) && !existsSync(join(ROOT, 'images', m[1]))) missing.add(m[1]);
  }
}

const check = process.argv.includes('--check');
let stale = 0;
for (const [rel, html] of Object.entries(outputs)) {
  const file = join(ROOT, rel);
  if (check) {
    if (!existsSync(file) || !readFileSync(file).equals(Buffer.from(html))) { console.error(`out of date: ${rel}`); stale++; }
    continue;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`wrote ${rel} (${Math.round(html.length / 1024)} KB)`);
}
if (missing.size) console.warn(`\nimages referenced but not generated yet (${missing.size}):\n  ${[...missing].sort().join('\n  ')}`);
if (check) {
  if (stale) { console.error(`${stale} page(s) out of date — run: node build/assemble.mjs`); process.exit(1); }
  console.log('all pages up to date');
}
