# Meta ads for the 5-page bridge test

One ad (or ad set) per page. Copy comes word for word from `playbook.md`. Each destination carries its
own `?t=meta_vN` key, so the click lands on the matching page **and** the buy buttons use that page's
Amazon Attribution tag (`KK.AMAZON_URLS.meta_vN` in `src/partials/config.html`).

| Page | Primary text, first line | Headline | Destination URL |
| --- | --- | --- | --- |
| v1 · Control: 7-reason listicle | 7 reasons home bakers are done with store-bought bread 🍞 | Bake-Ready in 5–7 Days | https://www.theloafreport.com/v1?t=meta_v1 |
| v2 · Newsletter diary | We make KozyKraft. Here's what the first 7 days with a starter look like, day by day. | Day by Day: Does It Actually Work? | https://www.theloafreport.com/v2?t=meta_v2 |
| v3 · Money | One packet of starter replaced $800 a year in bread. Here's the math. | One Packet vs. a Year of Bread | https://www.theloafreport.com/v3?t=meta_v3 |
| v4 · Your starter failed | If your sourdough starter died, it wasn't you. Here's what actually went wrong. | Why Starters Die (and the Fix) | https://www.theloafreport.com/v4?t=meta_v4 |
| v5 · Offer (v1 + reader code) | 7 reasons home bakers are done with store-bought bread 🍞 Reader code inside. | Bake-Ready in 5–7 Days · Reader Code Inside | https://www.theloafreport.com/v5?t=meta_v5 |

Before launch:
- Paste each page's Amazon Attribution tag into `meta_v1` … `meta_v5`, then run `node build/assemble.mjs` and commit.
- v5 only works as an offer test once `KK.PROMO` has a code, percent and end date (and the code exists in Seller Central).
- v2's photo slots are placeholders until the day-1 to day-7 photos are in.
