# The Loaf Report — 5-page bridge test playbook (for Claude Code)

Save this file as `playbook.md` in the repo root. Everything below is final copy unless marked [TODO].

**OHIO DECISION: KEEP**
- KEEP = leave all 11 "Ohio" mentions as they are.
- DROP = replace every "Ohio" mention with "Made in USA" / "a small team in the USA"; keep only the terms.html governing-law line.

**Facts that must stay consistent on every page** (they match the pouch, bakekozykraft.com and the printed insert):
- First bubbles by day 3. Bake-ready in 5–7 days. Never "24–48 hours."
- Day-7 guarantee: "Not bubbling by day 7? Send us a photo and we'll ship a fresh packet, free. Ordered on Amazon? Message us from Your Orders."
- Social proof wording: "Hundreds of verified Amazon reviews" (no numeric rating, no review count).
- Allowed claims: every batch is tested for viability; organic flour; filtered water; small batches; made in the USA; thousands of starters shipped.
- Not allowed: any health, gut, digestion, gluten-sensitivity or chemical/toxin claims; "Best Seller"; "Ships from Ohio"; "Free Prime Shipping"; prices in copy; inventory or scarcity claims.
- Contact email on legal pages: hello@bakekozykraft.com

---

## Shared blocks (identical on all five pages, in this order)

1. **Disclosure bar + masthead.** "This is a paid post written and published by KozyKraft." Masthead: The Loaf Report.
2. **Headline + subhead + hero image + first CTA** (CTA visible on the first screen at 375px). Button text everywhere: "Check Today's Price On Amazon".
3. **Proof bar:** ★★★★★ "Hundreds of verified Amazon reviews · Day-7 guarantee · Made in the USA"
4. **BODY** — the only block that changes per page (below).
5. **Product card.** Clean pouch photo (no hang tag). Above the button, the "how to find us" line: "Look for KozyKraft on Amazon, then tap Add to Cart." Under the button, the promo line (only when SHOW_PROMO is true and the code is set): "Reader offer: {percent}% off with code {code} at checkout. Ends {date}."
6. **Five real reviews** (the five verified 5★ dehydrated-listing reviews already on the page, quoted word for word, first name + last initial).
7. **Comparison table** (KozyKraft vs. making your own vs. grocery loaf), then **three objections**:
   - Will it actually work? → the day-7 guarantee line.
   - Is it hard? → "About 5 minutes a day. The steps are printed on the pouch."
   - Why not make my own? → "Building a starter from scratch takes 1–2 weeks. This one is bake-ready in 5–7 days."
   Then the guarantee box.
8. **End card** (same as block 5) + urgency line from KK.URGENCY_LINE. Default: "Start this week and you're baking well before Thanksgiving."
9. **Sticky buy bar** after the first scroll.

---

## v1 — Control: 7-reason listicle (`/v1`, also served at `/`)

**Title / H1:** 7 Reasons Thousands of Home Bakers Quit Store-Bought Bread for This Sourdough Starter

**Subhead:** A dehydrated starter that's bake-ready in 5–7 days, from a small US batch. Hundreds of verified Amazon reviews.

**Body — the 7 reasons** (number, heading, 2–4 sentences each):

1. **It skips the two weeks of building a starter from scratch.** A from-scratch starter takes 1–2 weeks of daily feeding before it's strong enough to bake with, and plenty never get there. This is an established culture, dried: you wake it up instead of building it.
2. **Bread with four ingredients: flour, water, salt and time.** That's the whole label on a loaf you bake yourself.
3. **About 5 minutes a day, and the steps are printed on the pouch.** Empty the packet into a jar, add water, add flour, cover loosely. Feed it once a day. No scale needed; it's measured in tablespoons.
4. **Bubbles by day 3, bake-ready in 5–7 days.** Day 2 can look like nothing is happening. That's normal. By day 5 it doubles after a feeding, and that's the sign it's ready for a loaf.
   *(the five reviews go here, between reasons 4 and 5)*
5. **One packet keeps going for years.** Feed it on the counter or keep it in the fridge and feed it weekly. At two loaves a week, that's about $800 a year that stays in your pocket.
6. **Small batches, organic flour, filtered water, made in the USA.** Every batch is tested for viability before it's dried.
7. **Day-7 guarantee.** Not bubbling by day 7? Send us a photo and we'll ship a fresh packet, free. Ordered on Amazon? Message us from Your Orders.

**Meta ad (v1):**
- Primary text, first line: "7 reasons home bakers are done with store-bought bread 🍞"
- Headline: "Bake-Ready in 5–7 Days"

---

## v2 — Format test: newsletter diary (`/v2`)

**Title / H1:** We Tried the Sourdough Starter Everyone's Buying on Amazon. Here's What Happened, Day by Day.

**Subhead:** Seven days, one packet, one jar on the counter. Photos every morning.

**Byline:** The Loaf Report Staff

**Body — one section per day, with a photo slot above each** (use a labeled placeholder for each photo; real photos will replace them):

- **Why we tried it.** We kept hearing the same question: does a dried starter actually come back to life, or do you end up with a jar of paste? So we bought one and kept a log. One packet, one jar, a rubber band to mark the level, and a spot on the counter.
- **Day 1: Wake it up.** Emptied the whole packet into the jar, stirred in 1.5 tablespoons of filtered water, and left it for an hour. Then 1 tablespoon of flour, stirred to a thick paste, lid resting loosely on top. Marked the level with the rubber band.
- **Day 2: Nothing yet. That's normal.** Fed it 2 tablespoons of flour and 1.5 tablespoons of water. No bubbles, no rise. The pouch says this is expected, so we kept going. This is the day most people quit.
- **Day 3: First bubbles.** Same feed. Small bubbles on the surface and a faint sour smell. It's alive.
- **Day 4: The big feed, and a bigger jar.** A third of a cup of flour and a quarter cup of water. It needed a bigger jar after this one.
- **Day 5: It doubled.** Fed it in the morning; by afternoon it was well past the rubber band, domed, and full of bubbles. That's the ready signal.
- **Day 6: First loaf.** 100 grams of starter into a basic Dutch oven loaf. (Photo of the crumb.)
- **Day 7: Verdict.** It works, and the part that matters is day 2. If you know a quiet day is normal, you don't throw it out. If you don't, you do. Everything you need to know is printed on the pouch, and there's a day-7 guarantee if yours doesn't bubble.

**Meta ad (v2):**
- Primary text, first line: "We bought the sourdough starter everyone's talking about and logged every day for a week."
- Headline: "Day by Day: Does It Actually Work?"

---

## v3 — Angle test: money (`/v3`)

**Title / H1:** We Did the Math: One Sourdough Packet vs. a Year of Store-Bought Bread

**Subhead:** A grocery sourdough loaf runs $7–$10. Here's what a starter costs per loaf, and why the gap gets bigger every week.

**Body — the 7 reasons:**

1. **A home loaf costs about $1.20 in flour and salt.** A store loaf of real sourdough runs $7–$10; a bakery loaf more.
   *(cost table goes here, right after reason 1)*

   | | Per loaf | Per year, two loaves a week |
   | --- | --- | --- |
   | Store-bought sourdough | about $9 | about $900 |
   | Baked at home | about $1.20 | about $125 |
   | Difference | | about $800 back |

2. **One packet, bought once.** Feed it and it keeps going for years. There's nothing to re-buy.
3. **The packet costs about one bakery loaf.** After that, every loaf is flour and salt.
4. **Nothing goes to waste.** The discard from feedings becomes pancakes, crackers and pizza dough.
5. **Five minutes a day beats a trip to the store.** Feed it, cover it, done.
6. **The best gift you can give for the price of a loaf.** One packet, a jar, and a note.
7. **Day-7 guarantee, so the math never goes against you.** Not bubbling by day 7? Send us a photo and we'll ship a fresh packet, free.

**Meta ad (v3):**
- Primary text, first line: "One packet of starter replaced $800 a year in bread. Here's the math."
- Headline: "One Packet vs. a Year of Bread"

---

## v4 — Angle test: your starter failed (`/v4`)

**Title / H1:** Your Sourdough Starter Died. It Wasn't Your Fault, and the Fix Takes 5 Days

**Subhead:** Most "dead" starters are just cold or hungry. Here's how to tell, and how to get one that's bake-ready in 5–7 days.

**Body — four sections:**

1. **Why starters die (it's almost always one of three things).** A cold kitchen: wild yeast slows way down under 68°F, so a starter on a drafty counter can look dead for days. Quitting on day 2 or 3: the first days often show nothing, and that's exactly when people throw it out. Tap water: chlorine slows or kills the culture; filtered or bottled water fixes it.
2. **What normal looks like, day by day.** Day 1, nothing. Day 2, probably still nothing. Day 3, the first bubbles and a sour smell. Day 4, a bigger feed. Day 5 to 7, it doubles after a feeding. Some days it rests. That's not death; that's a starter.
3. **Why a dehydrated culture is different.** You're not building a culture from the wild yeast that happens to be in your flour. You're waking up an established one that's been tested for viability before it was dried. The steps are printed on the pouch, in tablespoons, and if something looks off you can message us and get an answer within 24 hours.
4. **If it still isn't bubbling by day 7.** Send us a photo and we'll ship a fresh packet, free. Ordered on Amazon? Message us from Your Orders. That's the whole policy.

**Meta ad (v4):**
- Primary text, first line: "If your sourdough starter died, it wasn't you. Here's what actually went wrong."
- Headline: "Why Starters Die (and the Fix)"

---

## v5 — Offer test (`/v5`)

Identical to v1, word for word, with `KK.SHOW_PROMO = true`: the promo banner under the disclosure bar and the promo line under every buy button, using KK.PROMO { code, percent, ends }. Hidden automatically when the code is blank or the date has passed.

**Meta ad (v5):**
- Primary text, first line: "7 reasons home bakers are done with store-bought bread 🍞 Reader code inside."
- Headline: "Bake-Ready in 5–7 Days · Reader Code Inside"

---

## ads.md

Write `ads.md` with the five ad pairs above (page, primary text first line, headline, destination URL with its `?t=meta_vN` key) so each ad always points at its own page.

## Links and events

- `KK.AMAZON_URLS` keys: `meta_v1` … `meta_v5` (plus `google` and `default`). Each page's default is its own key.
- `KK.VARIANT` = 'v1' … 'v5'. Send `variant` as a parameter on every Meta and Google event.
- `<meta name="robots" content="noindex">` on all five pages. Per-page title, meta description and OG title/description/image (clean pouch photo).
