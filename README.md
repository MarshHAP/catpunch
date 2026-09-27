# Cat Punch — Shopify theme

Online Store 2.0 theme for **Cat Punch**, the interactive cat boxing bag. Plain Liquid, CSS and
vanilla JavaScript, no build step, so the branch can be connected directly through Shopify's GitHub
integration (Online Store → Themes → Add theme → Connect from GitHub).

## Structure

```
layout/      theme.liquid, password.liquid
templates/   index, product, collection, cart, page, page.contact, search, 404, blog, article,
             list-collections, password, gift_card, customers/*
sections/    header, footer, featured-product, main-product, feature-cards,
             lifestyle-banner, testimonials, gift-cta, benefits-row, faq, cart-drawer, main-* pages
snippets/    product-form (shared buy box), icon, wordmark, stars, product-card, meta-tags, …
assets/      theme.css, theme.js, Bangers + Poppins fonts, fallback PDP images (pdp-*.webp)
config/      settings_schema.json (colours, wordmark, cart), settings_data.json
locales/     en.default.json
```

## Home page

`templates/index.json` lays out the design: featured product → feature cards → lifestyle banner →
reviews → gift call-to-action → benefits row → FAQ. The hero and trust bar sections from the original design were removed. Every block of copy is a
section or block setting, editable in the theme editor.

The featured product section points at the product with handle `cat-punch`. Bundles are the
product's variants (1 × / 2 × / 3 ×) with compare-at prices, rendered as the three bundle cards. The
product must be **Active** and published to the Online Store channel to render on the storefront.

## Images

Photos on the product page and gallery come from the product's media in Shopify. Hero, feature
cards, gift call-to-action and review cards fall back to the `assets/pdp-*.webp` files until an image
is picked in the theme editor.

## Local development

```bash
npm i -g @shopify/cli
shopify theme check          # lint
shopify theme dev --store w31hnj-r1.myshopify.com   # live preview
```

## History

The earlier Next.js headless version of this storefront lives in this branch's history
(commit `85b4e4a`). It was removed from the branch root because the Shopify GitHub integration only
accepts the standard theme folder structure.
