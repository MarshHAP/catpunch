"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { storeConfig } from "@/store.config";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { IconClose, IconRemove } from "@/lib/icons";
import { PaymentBadges } from "@/components/PaymentBadges";

function useCountdown(until: number | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!until) return null;
  const left = Math.max(0, Math.floor((until - now) / 1000));
  const m = String(Math.floor(left / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function CartDrawer() {
  const cart = useCart();
  const { cart: copy } = storeConfig;
  const timer = useCountdown(cart.reservedUntil);
  const savings = cart.compareSubtotal - cart.subtotal;

  return (
    <>
      <div className={`cart-drawer__overlay ${cart.isOpen ? "is-open" : ""}`} onClick={cart.closeCart} />
      <div className={`cart-drawer ${cart.isOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Your cart">
        {cart.lines.length === 0 ? (
          <div className="cart-drawer__empty">
            <button type="button" className="cart-drawer__close" aria-label="Close" onClick={cart.closeCart}>
              <IconClose />
            </button>
            <h2 className="cart__empty-text">{copy.emptyTitle}</h2>
            <Link href="/collections/all" className="button" onClick={cart.closeCart}>
              {copy.continueLabel}
            </Link>
            <p className="cart__login-title h3">{copy.accountTitle}</p>
            <p className="cart__login-paragraph">
              <Link href="/account" className="link">
                {copy.loginLabel}
              </Link>{" "}
              {copy.loginText}
            </p>
          </div>
        ) : (
          <>
            <div className="cart-drawer__header">
              <h2 className="cart-drawer__heading">
                Cart • {cart.count} {cart.count === 1 ? "item" : "items"}
              </h2>
              <button type="button" className="cart-drawer__close" aria-label="Close" onClick={cart.closeCart}>
                <IconClose />
              </button>
            </div>
            <div className="cart-drawer__body">
              {timer && (
                <div className="cart-timer">
                  <strong>Cart reserved for {timer}</strong>
                </div>
              )}
              <ul className="cart-items" role="list">
                {cart.lines.map((line) => (
                  <li className="cart-item" key={line.key}>
                    <img className="cart-item__image" src={line.image} alt={line.title} width={90} height={90} />
                    <div>
                      <Link href={`/products/${line.handle}`} className="cart-item__title" onClick={cart.closeCart}>
                        {line.title}
                      </Link>
                      {line.variantLabel && <div className="cart-item__variant">{line.variantLabel}</div>}
                      <div className="cart-item__price">
                        <span>{formatMoney(line.unitPrice * line.quantity)}</span>
                        {line.compareAtUnit && line.compareAtUnit > line.unitPrice && (
                          <s>{formatMoney(line.compareAtUnit * line.quantity)}</s>
                        )}
                      </div>
                      <div className="cart-item__controls">
                        <div className="quantity">
                          <button
                            type="button"
                            className="quantity__button"
                            aria-label="Decrease quantity"
                            onClick={() => cart.updateQuantity(line.key, line.quantity - 1)}
                          >
                            −
                          </button>
                          <input
                            className="quantity__input"
                            type="number"
                            min={0}
                            value={line.quantity}
                            aria-label="Quantity"
                            onChange={(e) => cart.updateQuantity(line.key, Math.max(0, Number(e.target.value) || 0))}
                          />
                          <button
                            type="button"
                            className="quantity__button"
                            aria-label="Increase quantity"
                            onClick={() => cart.updateQuantity(line.key, line.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="cart-remove-button"
                          aria-label="Remove"
                          onClick={() => cart.removeLine(line.key)}
                        >
                          <IconRemove />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cart-drawer__footer">
              <div className="cart-drawer__totals">
                <strong>Subtotal</strong>
                <strong>{formatMoney(cart.subtotal)}</strong>
              </div>
              {savings > 0.005 && <div className="cart-drawer__savings">You&apos;re saving {formatMoney(savings)}</div>}
              <button type="button" className="button button--full-width" onClick={cart.checkout}>
                {copy.checkoutLabel}
              </button>
              <PaymentBadges />
            </div>
          </>
        )}
      </div>
    </>
  );
}
