"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { formatMoney, percentOff } from "@/lib/money";
import { IconDiscount } from "@/lib/icons";

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const off = percentOff(product.price, product.compareAtPrice);
  const image = product.media[0];

  const add = () =>
    cart.addLines([
      {
        handle: product.handle,
        title: product.title,
        shopifyVariantId: product.shopifyVariantId,
        image: image?.thumb ?? image?.src ?? "",
        unitPrice: product.price,
        compareAtUnit: product.compareAtPrice,
        quantity: 1,
      },
    ]);

  return (
    <div className="card">
      <Link href={`/products/${product.handle}`} className="card__media" aria-label={product.title}>
        <img src={image?.src} alt={image?.alt ?? product.title} loading="lazy" />
        {off !== null && (
          <span className="badge card__badge">
            <IconDiscount aria-hidden="true" />
            <span>Save {off}%</span>
          </span>
        )}
      </Link>
      <div className="card__content">
        <Link href={`/products/${product.handle}`} className="card__heading">
          {product.title}
        </Link>
        <div className="card__price">
          <span>{formatMoney(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && <s>{formatMoney(product.compareAtPrice)}</s>}
        </div>
        {product.hasOptions ? (
          <Link href={`/products/${product.handle}`} className="button card__button">
            Choose options
          </Link>
        ) : (
          <button type="button" className="button card__button" onClick={add}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
