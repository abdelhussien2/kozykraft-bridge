#!/usr/bin/env node
// Assembles the bridge-test pages from shared partials.
//
//   node build/assemble.mjs           write v1/ … v5/index.html, plus index.html (= v1), publish
//                                     src/images/* to images/ (src/ itself is not deployed), and write
//                                     api/_site.json (pixel id + Graph version for /api/capi)
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
const site = JSON.parse(readFileSync(join(SRC, 'site.config.json'), 'utf8'));

// Generated images live in src/images/; an `X-800.webp` beside `X.webp` is its phone-size version.
const SRC_IMAGES = join(SRC, 'images');
const srcImages = existsSync(SRC_IMAGES) ? readdirSync(SRC_IMAGES).filter((f) => !f.startsWith('.') && statSync(join(SRC_IMAGES, f)).isFile()) : [];
const smallVersion = (file) => {
  const small = file.replace(/\.webp$/, '-800.webp');
  return small !== file && srcImages.includes(small) ? small : null;
};

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

// Inline JSON for <script>: "<" escaped so a value can never close the script tag.
const SITE_CONFIG_JSON_HTML = JSON.stringify(site, null, 2).replace(/</g, '\\u003c').replace(/\n/g, '\n  ');

const badge = (cls) => site.BADGE_LIVE
  ? `  <div class="bestseller-badge ${cls}">${escapeHtml(site.BADGE_TEXT)}</div>\n`
  : '';

// Give every /images/X.webp that has an 800px version a srcset, so phones download the small file.
function addSrcsets(html) {
  return html.replace(/<img ([^>]*?)src="\/images\/([^"]+\.webp)"([^>]*)>/g, (tag, before, file, after) => {
    const small = smallVersion(file);
    if (!small || /srcset=/.test(tag)) return tag;
    const sizes = file.startsWith('bake-') ? '(max-width: 760px) 50vw, 160px'
      : file.startsWith('strip-') ? '(max-width: 760px) 600px, 636px'
      : '(max-width: 760px) 100vw, 636px';
    const tiny = file.replace(/\.webp$/, '-400.webp');
    const full = /width="(\d+)"/.exec(tag);
    const set = [srcImages.includes(tiny) ? `/images/${tiny} 400w` : null, `/images/${small} 800w`, `/images/${file} ${full ? full[1] : 1600}w`].filter(Boolean).join(', ');
    return `<img ${before}src="/images/${file}" srcset="${set}" sizes="${sizes}"${after}>`;
  });
}

// Holiday deadline: every configured message is rendered, hidden; a script in <head> sets
// <html data-deadline="N"> for the one active in DEADLINE_TZ, so the right one shows with no layout shift.
const deadlineSpans = (site.DEADLINES || []).map((d, i) => `<span class="dl dl-${i}">${escapeHtml(d.text)}</span>`).join('');
const DEADLINE_BAR_HTML = deadlineSpans ? `<div class="deadline-bar" role="note">${deadlineSpans}</div>\n` : '';
const DEADLINE_LINE_HTML = deadlineSpans ? `    <div class="deadline-line">${deadlineSpans}</div>\n` : '';

function buildPage(variant, page) {
  const vars = {
    SITE_CONFIG_JSON_HTML,
    AMAZON_THUMB: site.AMAZON_THUMB,
    AMAZON_THUMB_SRCSET: site.AMAZON_THUMB_SRCSET,
    AMAZON_TITLE: site.AMAZON_TITLE,
    DEADLINE_BAR_HTML,
    DEADLINE_LINE_HTML,
    BADGE_TOP_HTML: badge('top'),
    BADGE_BTN_HTML: badge('btn'),
    VARIANT: variant,
    SHOW_PROMO: page.showPromo ? 'true' : 'false',
    TITLE: page.title,
    DESCRIPTION: page.subhead,
    H1: page.title,
    SUBHEAD: page.subhead,
    HERO_FILE: page.hero.file,
    HERO_FILE_800: smallVersion(page.hero.file) || page.hero.file,
    HERO_ALT: page.hero.alt,
    // Guarantee box: full policy by default; "short" where the page body already carries it (v4 section 4).
    GUARANTEE_HTML: page.guaranteeBox === 'short'
      ? "    <p>If it isn't bubbling by day 7, we send a fresh packet, free.</p>\n    <p>How it works is in section 4 above.</p>"
      : "    <p>Not bubbling by day 7? Send us a photo and we'll ship a fresh packet, free. Ordered on Amazon? Message us from Your Orders.</p>",
    GUARANTEE_POINTER: page.guaranteeBox === 'short' ? 'Details in section 4.' : 'Details below.',
    HERO_CAPTION_HTML: page.hero.caption ? `    <figcaption>${escapeHtml(page.hero.caption)}</figcaption>\n` : '',
  };
  vars.BYLINE_HTML = page.byline ? render(readPartial('byline.html'), vars) : '';
  vars.BODY_HTML = render(readPartial(page.body), vars, [page.body]);
  vars.REVIEWS_HTML = page.reviewsInBody ? '' : render(readPartial('reviews.html'), vars, ['reviews.html']);
  return addSrcsets(render(readFileSync(join(SRC, 'layout.html'), 'utf8'), vars));
}

const outputs = {};
for (const [variant, page] of Object.entries(pages)) outputs[`${variant}/index.html`] = buildPage(variant, page);
outputs['index.html'] = outputs['v1/index.html']; // "/" serves v1 for now

for (const f of srcImages) outputs[`images/${f}`] = readFileSync(join(SRC_IMAGES, f));

// Every /images/… a page points at must exist once published.
const missing = new Set();
for (const [rel, html] of Object.entries(outputs)) {
  if (!rel.endsWith('.html')) continue;
  for (const m of html.matchAll(/(?:src|poster|href)="\/images\/([^"]+)"|\/images\/([^\s",]+\.webp) \d+w/g)) {
    m[1] = m[1] || m[2];
    if (!srcImages.includes(m[1]) && !existsSync(join(ROOT, 'images', m[1]))) missing.add(m[1]);
  }
}

// Favicons and touch icon live in src/icons/ and are published to the site root.
const SRC_ICONS = join(SRC, 'icons');
if (existsSync(SRC_ICONS)) for (const f of readdirSync(SRC_ICONS).filter((f) => !f.startsWith('.'))) outputs[f] = readFileSync(join(SRC_ICONS, f));

// /api/capi reads the pixel id and Graph API version from here (files starting with _ are not routes).
outputs['api/_site.json'] = JSON.stringify({ pixelId: site.PIXEL_ID, graphVersion: site.META_GRAPH_VERSION }, null, 2) + '\n';

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
