"use client";

import { useEffect, useState } from "react";
import { storeConfig } from "@/store.config";
import type { Product, Upsell } from "@/lib/types";
import { formatMoney, percentOff } from "@/lib/money";
import { MostPopularBadge } from "@/lib/icons";

export type BundleSelection = {
  tierIndex: number;
  variantIds: string[];
  upsells: Set<string>;
};

function useOfferTimer(minutes: number) {
  const [left, setLeft] = useState(minutes * 60);
  useEffect(() => {
    const key = "bundle-offer-ends";
    let ends = Number(window.sessionStorage.getItem(key) ?? 0);
    if (!ends || ends < Date.now()) {
      ends = Date.now() + minutes * 60_000;
      window.sessionStorage.setItem(key, String(ends));
    }
    const tick = () => setLeft(Math.max(0, Math.floor((ends - Date.now()) / 1000)));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [minutes]);
  const m = String(Math.floor(left / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function BundleSelector({
  product,
  selection,
  onChange,
}: {
  product: Product;
  selection: BundleSelection;
  onChange: (s: BundleSelection) => void;
}) {
  const { bundles } = storeConfig;
  const timer = useOfferTimer(bundles.timerMinutes);
  const variants = product.variants ?? [];

  const selectTier = (i: number) => {
    const qty = bundles.tiers[i].quantity;
    const ids = Array.from({ length: qty }, (_, k) => selection.variantIds[k] ?? selection.variantIds[0] ?? variants[0]?.id ?? "");
    onChange({ ...selection, tierIndex: i, variantIds: ids });
  };

  const setVariant = (k: number, id: string) => {
    const ids = [...selection.variantIds];
    ids[k] = id;
    onChange({ ...selection, variantIds: ids });
  };

  const toggleUpsell = (u: Upsell) => {
    const next = new Set(selection.upsells);
    if (next.has(u.handle)) next.delete(u.handle);
    else next.add(u.handle);
    onChange({ ...selection, upsells: next });
  };

  const variantImage = (id: string) => {
    const v = variants.find((x) => x.id === id);
    const m = product.media[v?.mediaIndex ?? 0];
    return m?.thumb ?? m?.src ?? product.media[0]?.src;
  };

  const savings = (tier: { price: number; comparePrice: number }) => {
    if (tier.comparePrice <= tier.price) return null;
    if (bundles.savingsMode === "percent") {
      const pct = percentOff(tier.price, tier.comparePrice);
      return pct === null ? null : `${bundles.savingsLabel} ${pct}%`;
    }
    return `${bundles.savingsLabel} ${formatMoney(tier.comparePrice - tier.price)}`;
  };

  if (bundles.style === "cards") {
    return (
      <div className="bundle-cards">
        <div className="bundle-cards__title">{bundles.title}</div>
        {bundles.timerMinutes > 0 && (
          <div className="bundles__timer">
            {bundles.timerLabel} <span className="bundles__timer-value">{timer}</span>
          </div>
        )}
        <div className="bundle-cards__grid" role="radiogroup" aria-label={bundles.title}>
          {bundles.tiers.map((tier, i) => {
            const selected = i === selection.tierIndex;
            const save = savings(tier);
            return (
              <button
                type="button"
                key={tier.title}
                role="radio"
                aria-checked={selected}
                className={`bundle-card ${selected ? "is-selected" : ""} ${tier.mostPopular ? "bundle-card--popular" : ""}`}
                onClick={() => selectTier(i)}
              >
                {tier.mostPopular && <span className="bundle-card__popular">Most popular</span>}
                <span className="bundle-card__radio" aria-hidden="true" />
                <span className="bundle-card__body">
                  <span className="bundle-card__title">{tier.title}</span>
                  {save && <span className="bundle-card__save">{save}</span>}
                  <span className="bundle-card__pricing">
                    <span className="bundle-card__price">{formatMoney(tier.price)}</span>
                    {tier.comparePrice > tier.price && <s className="bundle-card__compare">{formatMoney(tier.comparePrice)}</s>}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }


  return (
    <div className="bundles">
      <div className="bundles__title">{bundles.title}</div>
      {bundles.timerMinutes > 0 && (
        <div className="bundles__timer">
          {bundles.timerLabel} <span className="bundles__timer-value">{timer}</span> ⏰
        </div>
      )}
      <div className="bundles__bars" role="radiogroup" aria-label={bundles.title}>
        {bundles.tiers.map((tier, i) => {
          const selected = i === selection.tierIndex;
          const save = tier.comparePrice - tier.price;
          return (
            <div className={`bundle-bar ${selected ? "is-selected" : ""} ${tier.mostPopular ? "bundle-bar--most-popular" : ""}`} key={tier.title}>
              {tier.mostPopular && <MostPopularBadge className="bundle-bar__most-popular" aria-hidden="true" />}
              <div
                className="bundle-bar__container"
                role="radio"
                aria-checked={selected}
                tabIndex={0}
                onClick={() => selectTier(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectTier(i);
                  }
                }}
              >
                <div className="bundle-bar__wrapper">
                  <div className="bundle-bar__main">
                    <div className="bundle-bar__radio" />
                    <div className="bundle-bar__content">
                      <div className="bundle-bar__content-left">
                        <div className="bundle-bar__first-line">
                          <span className="bundle-bar__title">{tier.title}</span>
                          {save > 0 && <span className="bundle-bar__label">{savings(tier)}</span>}
                        </div>
                      </div>
                      <div className="bundle-bar__pricing">
                        <div className="bundle-bar__price">{formatMoney(tier.price)}</div>
                        {tier.comparePrice > tier.price && (
                          <div className="bundle-bar__full-price">{formatMoney(tier.comparePrice)}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {selected && variants.length > 0 && (
                    <div className="bundle-bar__variants" onClick={(e) => e.stopPropagation()}>
                      <div className="bundle-bar__variant-names">
                        <span>{product.optionName ?? "Option"}</span>
                      </div>
                      <div className="bundle-bar__variant-row">
                        {Array.from({ length: tier.quantity }).map((_, k) => (
                          <div className="bundle-bar__variant" key={k}>
                            <img className="bundle-bar__variant-image" src={variantImage(selection.variantIds[k])} alt="" />
                            <select
                              className="bundle-bar__select"
                              aria-label={`${product.optionName ?? "Option"} ${k + 1}`}
                              value={selection.variantIds[k]}
                              onChange={(e) => setVariant(k, e.target.value)}
                            >
                              {variants.map((v) => (
                                <option key={v.id} value={v.id}>
                                  {v.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selected &&
                  bundles.upsells.map((u) => (
                    <div key={u.handle}>
                      <div
                        className={`bundle-upsell ${selection.upsells.has(u.handle) ? "is-checked" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleUpsell(u);
                        }}
                        role="checkbox"
                        aria-checked={selection.upsells.has(u.handle)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleUpsell(u);
                          }
                        }}
                      >
                        <div className="bundle-upsell__main">
                          <span className="bundle-upsell__checkbox" aria-hidden="true">
                            <svg viewBox="0 0 12 10" fill="none">
                              <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <img className="bundle-upsell__image" src={u.image} alt="" />
                          <span className="bundle-upsell__text">{u.label}</span>
                        </div>
                        <div className="bundle-upsell__pricing">
                          <div className="bundle-upsell__price">{formatMoney(u.price)}</div>
                          {u.comparePrice && u.comparePrice > u.price && (
                            <div className="bundle-upsell__full-price">{formatMoney(u.comparePrice)}</div>
                          )}
                        </div>
                      </div>
                      <div className="bundle-divider" />
                    </div>
                  ))}

                <div className="bundle-free-gift">
                  <img className="bundle-free-gift__image" src={bundles.freeShipping.icon} alt="" />
                  <span className="bundle-free-gift__text">
                    {selected ? bundles.freeShipping.label : tier.perks?.[0]?.label ?? "+ FREE Shipping"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
