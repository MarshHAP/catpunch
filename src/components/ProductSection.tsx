"use client";

import { useMemo, useState } from "react";
import { storeConfig } from "@/store.config";
import type { Product } from "@/lib/types";
import { useCart, type CartLine } from "@/lib/cart";
import { formatMoney, percentOff } from "@/lib/money";
import { IconArrowRight, IconCheckCircle, IconVerified } from "@/lib/icons";
import { MediaGallery } from "@/components/MediaGallery";
import { Stars } from "@/components/Stars";
import { BundleSelector, type BundleSelection } from "@/components/BundleSelector";
import { Accordion } from "@/components/Accordion";
import { PaymentBadges } from "@/components/PaymentBadges";
import { EstimatedShipping } from "@/components/EstimatedShipping";
import { StickyAtc } from "@/components/StickyAtc";
import { IconRow } from "@/components/IconRow";

export function ProductSection({ product, sectionId = "featured" }: { product: Product; sectionId?: string }) {
  const { product: copy, bundles } = storeConfig;
  const cart = useCart();
  const variants = product.variants ?? [];
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [mediaIndex, setMediaIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [bundle, setBundle] = useState<BundleSelection>({
    tierIndex: 0,
    variantIds: [variants[0]?.id ?? ""],
    upsells: new Set(),
  });

  const selectedVariant = variants.find((v) => v.id === variantId);
  const off = percentOff(product.price, product.compareAtPrice);
  const saveAmount = product.compareAtPrice ? product.compareAtPrice - product.price : 0;
  const atcId = `ProductSubmitButton-${sectionId}`;

  const pickVariant = (id: string) => {
    setVariantId(id);
    const v = variants.find((x) => x.id === id);
    if (v?.mediaIndex !== undefined) setMediaIndex(v.mediaIndex);
    setBundle((b) => ({ ...b, variantIds: b.variantIds.map((x, i) => (i === 0 ? id : x)) }));
  };

  const linesToAdd = useMemo((): Omit<CartLine, "key">[] => {
    const lines: Omit<CartLine, "key">[] = [];
    if (bundles.enabled && bundles.tiers.length) {
      const tier = bundles.tiers[bundle.tierIndex];
      const unit = tier.price / tier.quantity;
      const compareUnit = tier.comparePrice / tier.quantity;
      const counts = new Map<string, number>();
      for (const id of bundle.variantIds) counts.set(id, (counts.get(id) ?? 0) + 1);
      for (const [id, n] of counts) {
        const v = variants.find((x) => x.id === id);
        const m = product.media[v?.mediaIndex ?? 0] ?? product.media[0];
        lines.push({
          handle: product.handle,
          title: product.title,
          variantId: id || undefined,
          variantLabel: v ? `${product.optionName ?? "Option"}: ${v.label}` : undefined,
          shopifyVariantId: v?.shopifyVariantId ?? product.shopifyVariantId,
          image: m?.thumb ?? m?.src ?? "",
          unitPrice: Math.round(unit * 100) / 100,
          compareAtUnit: Math.round(compareUnit * 100) / 100,
          quantity: n * qty,
        });
      }
      for (const u of bundles.upsells) {
        if (!bundle.upsells.has(u.handle)) continue;
        const p = storeConfig.products.find((x) => x.handle === u.handle);
        lines.push({
          handle: u.handle,
          title: p?.title ?? u.label.replace(/^\+\s*/, ""),
          shopifyVariantId: p?.shopifyVariantId,
          image: u.image,
          unitPrice: u.price,
          compareAtUnit: u.comparePrice,
          quantity: 1,
        });
      }
    } else {
      const m = product.media[selectedVariant?.mediaIndex ?? 0] ?? product.media[0];
      lines.push({
        handle: product.handle,
        title: product.title,
        variantId: variantId || undefined,
        variantLabel: selectedVariant ? `${product.optionName ?? "Option"}: ${selectedVariant.label}` : undefined,
        shopifyVariantId: selectedVariant?.shopifyVariantId ?? product.shopifyVariantId,
        image: m?.thumb ?? m?.src ?? "",
        unitPrice: product.price,
        compareAtUnit: product.compareAtPrice,
        quantity: qty,
      });
    }
    return lines;
  }, [bundle, bundles, product, selectedVariant, variantId, variants, qty]);

  const addToCart = () => cart.addLines(linesToAdd);

  return (
    <section className="section product-section" id={sectionId}>
      <div className="page-width">
        <div className="product">
          <div className="product__media-wrapper">
            <MediaGallery media={product.media} active={mediaIndex} onChange={setMediaIndex} title={product.title} />
          </div>

          <div className="product__info-wrapper">
            <div className="product__info">
              {copy.socialProof.avatars.length > 0 && (
                <div className="review-avatars">
                  <div className="review-avatars__list">
                    {copy.socialProof.avatars.map((src, i) => (
                      <div className="review-avatars__avatar" key={src + i}>
                        <img src={src} alt="" width={40} height={40} loading="lazy" />
                        <IconVerified aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                  <div className="review-avatars__text">
                    <div className="review-avatars__title">{copy.socialProof.title}</div>
                    <div className="review-avatars__subtitle">{copy.socialProof.subtitle}</div>
                  </div>
                </div>
              )}

              <div className="product__title">
                <h1 className="h1 product__heading">{product.title}</h1>
                {product.subtitle && <p className="product__subtitle">{product.subtitle}</p>}
              </div>

              <div className="rating-stars">
                <Stars rating={copy.rating.value} />
                <span className="rating-stars__label">{copy.rating.label}</span>
              </div>

              <div className="price">
                <span className="price__sale">{formatMoney(product.price)}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <>
                    <s className="price__compare">{formatMoney(product.compareAtPrice)}</s>
                    <span className="badge">
                      {copy.savingsMode === "amount" ? `Save ${formatMoney(saveAmount).replace(/\.00$/, "")}` : `Save ${off}%`}
                    </span>
                  </>
                )}
              </div>

              {copy.benefits.length > 0 && (
                <ul className="check-benefits list-unstyled">
                  {copy.benefits.map((b) => (
                    <li key={b}>
                      <IconCheckCircle className="check-benefits__icon" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {variants.length > 0 && (
                <div className="variant-picker">
                  <span className="variant-picker__label">{product.optionName ?? "Option"}</span>
                  <div className="variant-picker__pills" role="radiogroup" aria-label={product.optionName ?? "Option"}>
                    {variants.map((v) => (
                      <button
                        type="button"
                        key={v.id}
                        role="radio"
                        aria-checked={v.id === variantId}
                        className={`pill ${v.id === variantId ? "is-selected" : ""}`}
                        onClick={() => pickVariant(v.id)}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bundles.enabled && bundles.tiers.length > 0 && (
                <BundleSelector product={product} selection={bundle} onChange={setBundle} />
              )}

              <div className="product-form__buttons product-form__buttons--row">
                <div className="quantity" role="group" aria-label="Quantity">
                  <button type="button" className="quantity__button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    −
                  </button>
                  <input
                    className="quantity__input"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={qty}
                    aria-label="Quantity"
                    onChange={(e) => setQty(Math.max(1, Math.floor(Number(e.target.value) || 1)))}
                  />
                  <button type="button" className="quantity__button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                    +
                  </button>
                </div>
                <button id={atcId} type="button" className="button button--cta button--full-width button--uppercase product-form__submit" onClick={addToCart}>
                  {copy.addToCartLabel}
                  <IconArrowRight className="button__arrow" />
                </button>
              </div>

              <IconRow items={copy.trustRow} variant="compact" className="product__trust-row" />

              {storeConfig.footer.paymentIcons.length > 0 && !copy.trustRow.length && (
                <div className="payment-badges-block">
                  <PaymentBadges />
                </div>
              )}

              {copy.shipping.enabled && <EstimatedShipping />}

              {copy.accordions.length > 0 && (
                <div className="product__accordions">
                  {copy.accordions.map((a) => (
                    <Accordion key={a.title} title={a.title} html={a.html} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <StickyAtc
        image={product.media[0]?.thumb ?? product.media[0]?.src ?? ""}
        title={product.title}
        buttonLabel={copy.stickyBar.buttonLabel}
        targetId={atcId}
        onClick={addToCart}
      />
    </section>
  );
}
