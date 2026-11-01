# The Loaf Report — image plan for v1–v5 (for Claude Code + /higgsfield-batch)

Save as `images.md` in the repo root. Two Higgsfield batches: the jar series (list A) and the scenes (list B). Both land in `src/images/`.

## Rules

- **All images are Higgsfield.** Faceless: hands and surfaces only. Photoreal with imperfection (flour dust, worn board, real linen), one motivated light source, properly exposed windows, no clipped highlights. Premium editorial, Bon Appétit / Kinfolk, never farmhouse-cute.
- **Jar-state images are illustrations, so the copy never calls them a log.** v2 reads "what the week looks like, day by day," not "we photographed it every morning." Captions say "Day 3: what first bubbles look like," never "our jar on day 3." Same on v1 reason 4 and v4's strip.
- **Jar states must match the product.** Day 1: dry flakes and a thick paste. Day 2: paste, no bubbles. Day 3: a few small surface bubbles. Day 4: more volume, bigger jar. Day 5: doubled past the rubber band, domed top. Never a foamy overflowing jar.
- **No text anywhere in generated images.** Every prompt ends with: "Absolutely no text, no words, no letters, no logos, no watermarks, no prices, no dollar signs, no percentages." The pouch wordmark garbles, so any shot with the pouch uses the real pouch PNG as a reference image, and the pouch is never the sharpest thing in frame.
- **Product card and link preview use the real product photo** (clean, no hang tag). If the only clean version has the tag, remove it with nano_banana_2 as an edit of the real photo, not a regenerate.
- **Sizes:** article images 3:2 at 1600×1067; card and square images 1:1 at 1200×1200; link preview 1200×630. Export WebP, 80 quality, under 150 KB each.

## List A — the jar series (Higgsfield, 8 images, one scene)

Consistency matters more than beauty here: same jar, same rubber band, same counter, same window. Generate index A1 first, approve it, then make A2–A7 as **edits of A1** (A1 as the reference image, one hop each; never chain an edit off an edit).

**Scene lock (prefix on every A index):** "The same small clear glass jar with a thin rubber band around it, on a pale stone counter against a cream wall, soft window light from the left, a folded linen cloth to the right. Same framing and camera angle every time."

| # | File | Subject |
| --- | --- | --- |
| A1 | day1.webp | Hands tipping dry starter flakes from the small KozyKraft pouch into the jar, a small glass of water beside it (*pouch* reference) |
| A2 | day2.webp | The jar holding a thick pale paste, flat surface, no bubbles, lid resting loosely on top |
| A3 | day3.webp | The jar with a few small bubbles on the surface of the paste, slightly risen |
| A4 | day4.webp | A larger glass jar beside the small one, starter transferred, more volume, a few bubbles |
| A5 | day5.webp | The larger jar with starter doubled well past the rubber band, domed, bubbly throughout |
| A6 | day6-loaf.webp | A torn-open sourdough loaf with ragged open crumb on a board, the jar blurred behind it |
| A7 | day7.webp | The jar and the loaf together on the counter, morning light |
| A8 | strip-days-1-5.webp | Assemble A1–A5 in a row in code; no generation |

Used on: all of v2; v1 reason 4 (A3); v4 section 2 (A8); and the same set works for Amazon images 2 and 6.

## List B — Higgsfield batch (nano_banana_2)

**Fixed base prompt (identical on every index):**
"Editorial food photograph, real camera, 50mm lens, shallow depth of field, single window light from the left, properly exposed with no clipped highlights, natural color grade, real imperfections: flour dust, crumbs, a worn wooden board, slightly rumpled linen. Cream linen and pale stone surfaces. Faceless: hands and surfaces only, no faces anywhere. Premium, quiet, Kinfolk-style composition with negative space. SUBJECT: {subject}. Absolutely no text, no words, no letters, no logos, no watermarks, no prices, no dollar signs, no percentages."

**Reference image** (only on indexes marked *pouch*): `pouch-front.png`. Keep the pouch small, mid-frame, slightly soft.

| # | File | Size | Subject (replaces {subject}) | Used on |
| --- | --- | --- | --- | --- |
| 1 | hero-pouch-loaf.webp *pouch* | 1600×1067 | A torn-open sourdough loaf with a ragged open crumb on a wooden board, the small KozyKraft starter pouch resting beside it slightly out of focus, morning light | v1, v3, v5 hero |
| 2 | og-preview.webp *pouch* | 1200×630 | Same scene as #1, composed wide, loaf left, pouch right | Link previews, all pages |
| 3 | card-pouch.webp *pouch* | 1200×1200 | The small KozyKraft starter pouch standing alone on pale stone, soft shadow, nothing else in frame | Product cards (fallback only; the real product photo is preferred) |
| 4 | r1-wake-up.webp *pouch* | 1600×1067 | Hands pouring a little water from a glass measuring cup into a small glass jar, the opened pouch beside it, a rubber band around the jar | v1 reason 1 |
| 5 | r2-four-ingredients.webp | 1600×1067 | Overhead flat lay: a small bowl of flour, a glass of water, a pinch bowl of coarse salt, and a brass kitchen timer, on linen | v1 reason 2 |
| 6 | r3-five-minutes.webp | 1600×1067 | A hand leveling a tablespoon of flour over a small glass jar on the counter, a loose lid resting beside it | v1 reason 3, v4 section 3 |
| 7 | r5-years.webp | 1600×1067 | A well-used glass starter jar with a faded rubber band next to a cooling rack holding a fresh sourdough loaf, late afternoon light | v1 reason 5 |
| 8 | r6-small-batch.webp | 1600×1067 | A small working kitchen: paper sacks of flour, a glass pitcher of water, flour-dusted hands resting on a worn board | v1 reason 6 |
| 9 | m1-store-vs-home.webp | 1600×1067 | Split composition: a plastic-wrapped supermarket loaf on the left, a torn-open home-baked sourdough loaf on the right, same board | v3 reason 1 |
| 10 | m4-discard-pancakes.webp | 1600×1067 | A short stack of golden sourdough pancakes on a stone plate, a small jar of starter blurred in the background | v3 reason 4 |
| 11 | m6-gift.webp *pouch* | 1600×1067 | The pouch and a small empty glass jar tied together with twine and a sprig of rosemary, on linen, like a gift | v3 reason 6 |
| 12 | f1-cold-kitchen.webp | 1600×1067 | A small glass jar on a windowsill in cool blue morning light, condensation on the window, a wool mitt beside it | v4 section 1 |
| 13 | f1-filtered-water.webp | 1600×1067 | A glass pitcher of clear filtered water being poured into a measuring cup beside a small jar, a kitchen tap blurred far behind | v4 section 1 |
| 14 | f3-established-culture.webp *pouch* | 1600×1067 | The pouch resting against a glass jar with a thin dry layer of starter flakes visible inside, a tablespoon beside them | v4 section 3 |

Skip images for v1 reason 7 and v4 section 4; the guarantee box is the visual there.

## Placement map

| Page | Hero | Body images, in order | Card |
| --- | --- | --- | --- |
| v1 / v5 | #1 | #4, #5, #6, day3.webp (A3), #7, #8 | real product photo |
| v2 | day1.webp | day2 … day7, strip-days-1-5 | real product photo |
| v3 | #1 | #9, #10, #11 | real product photo |
| v4 | #12 | #13, strip-days-1-5 (A8), #14 | real product photo |

Alt text: describe what's in the photo in plain words ("hands leveling a tablespoon of flour over a glass jar"). Never alt text that claims a result.

## Copy changes that go with the AI jar series

- v2 subhead: "Seven days, one packet, one jar on the counter. Here's what the week looks like, day by day."
- v2 ad primary text: "We make KozyKraft. Here's what the first 7 days with a starter look like, day by day."
- v2 intro: "We make KozyKraft, and the question we get most is what actually happens in the jar. So here's the week, day by day, with what's normal and what isn't."
- v2 day entries: keep the steps, drop any "we" verbs that imply a live log ("we fed it" → "feed it"; "we almost quit" → "this is the day most people quit").
- Captions on every jar image: "Day N: what X looks like."
