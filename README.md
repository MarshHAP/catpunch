# Cat Punch — storefront

Single-product e-commerce storefront for **Cat Punch**, the interactive cat boxing bag.
Built with Next.js (App Router) and plain CSS on top of the
[aiorganictemplate](https://github.com/MarshHAP/aiorganictemplate) store template.
Fully mobile optimised, with every piece of content driven from one config file.

## Sections (home page, top to bottom)

1. Header — wordmark, Home / Shop / About / Reviews, search, account, cart
2. Hero — sunburst background, wordmark, "Keep your cat active, happy & healthy", three icon badges, Shop now
3. Trust bar — fast & free shipping, 30 day returns, happy cats
4. Product — gallery with thumbnails, title, 1,247 reviews, £24.99 / ~~£34.99~~ / Save £10, benefit checklist,
   "Choose Your Bundle" (1× / 2× save 15% / 3× save 25%), quantity, Add to cart, trust row
5. Feature cards — strong suction cup base, fun boxing gloves, self-rebound action
6. Lifestyle banner — "Little champions watch big dreams"
7. Reviews — "Real cats. Real results." four review cards
8. Gift call-to-action — "The purrfect gift!" sticker, "A small toy for a happier, healthier cat."
9. Benefits row — keeps cats active, mental stimulation, happier cats, perfect for home
10. FAQ and setup steps (optional, empty the config arrays to hide them)
11. Footer — wordmark, "Play more. Purr more.", links, payment icons

Also included: slide-out cart drawer, sticky add-to-cart bar, collection / product / search / cart / contact pages.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Customising

Everything lives in **`src/store.config.ts`**: brand and wordmark, colours, currency, nav, hero, trust bar,
product (prices, media, benefits, bundle tiers), feature cards, banner, testimonials, gift CTA, benefits row,
FAQ, footer and checkout.

### Images

The artwork under `public/images/catpunch/` is **placeholder SVG illustration** generated to match the
brand. Replace each file with the real product photography / renders (same filename, or update the paths in
the config):

| File | Used for |
| --- | --- |
| `hero.svg` | Hero image (cat + toy) |
| `gallery-1-box.svg` … `gallery-5-bag.svg` | Product gallery |
| `feature-base.svg`, `feature-gloves.svg`, `feature-rebound.svg` | Feature cards |
| `banner-champions.svg` | Lifestyle banner |
| `review-1.svg` … `review-4.svg` | Review cards |
| `gift-box.svg` | Gift call-to-action |

### Fonts

Body copy uses self-hosted Poppins; headlines use self-hosted
[Bangers](https://fonts.google.com/specimen/Bangers) (SIL Open Font License). Both live in `public/fonts/`.

### Checkout

The cart is stored in `localStorage`. The checkout button behaviour is set by `checkout.mode`:

- `"shopify"` – builds a Shopify cart permalink from `shopifyVariantId` on the product and sends the
  customer to `https://{shopDomain}/cart/{variantId}:{qty}`. `shopDomain` is already set to the
  Cuteness Overload store; add a Cat Punch product there and paste its variant id into the config.
- `"custom"` – redirects to `checkout.url` (e.g. a Stripe Payment Link).
- `"none"` – shows a message (current default).
