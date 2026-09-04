"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { storeConfig } from "@/store.config";
import { IconRemove } from "@/lib/icons";

export default function CartPage() {
  const cart = useCart();
  return (
    <section className="section cart-page">
      <div className="page-width">
        <h1 className="cart-page__title h1">Your cart</h1>
        {cart.lines.length === 0 ? (
          <>
            <p>{storeConfig.cart.emptyTitle}</p>
            <p style={{ marginTop: 20 }}>
              <Link href="/collections/all" className="button">
                {storeConfig.cart.continueLabel}
              </Link>
            </p>
          </>
        ) : (
          <>
            <ul className="cart-items" role="list">
              {cart.lines.map((line) => (
                <li className="cart-item" key={line.key}>
                  <img className="cart-item__image" src={line.image} alt={line.title} />
                  <div>
                    <Link href={`/products/${line.handle}`} className="cart-item__title">
                      {line.title}
                    </Link>
                    {line.variantLabel && <div className="cart-item__variant">{line.variantLabel}</div>}
                    <div className="cart-item__price">{formatMoney(line.unitPrice * line.quantity)}</div>
                    <div className="cart-item__controls">
                      <div className="quantity">
                        <button type="button" className="quantity__button" onClick={() => cart.updateQuantity(line.key, line.quantity - 1)} aria-label="Decrease quantity">
                          −
                        </button>
                        <input className="quantity__input" type="number" value={line.quantity} onChange={(e) => cart.updateQuantity(line.key, Number(e.target.value) || 0)} aria-label="Quantity" />
                        <button type="button" className="quantity__button" onClick={() => cart.updateQuantity(line.key, line.quantity + 1)} aria-label="Increase quantity">
                          +
                        </button>
                      </div>
                      <button type="button" className="cart-remove-button" aria-label="Remove" onClick={() => cart.removeLine(line.key)}>
                        <IconRemove />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-page__footer">
              <div className="cart-page__totals">
                <div className="cart-drawer__totals">
                  <strong>Subtotal</strong>
                  <strong>{formatMoney(cart.subtotal)}</strong>
                </div>
                <button type="button" className="button button--full-width" onClick={cart.checkout}>
                  {storeConfig.cart.checkoutLabel}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
