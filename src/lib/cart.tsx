"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { storeConfig } from "@/store.config";

export type CartLine = {
  key: string;
  handle: string;
  title: string;
  variantLabel?: string;
  variantId?: string;
  shopifyVariantId?: string;
  image: string;
  unitPrice: number;
  compareAtUnit?: number;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  /** epoch ms when the reservation timer ends */
  reservedUntil: number | null;
};

type CartContextValue = CartState & {
  addLines: (lines: Omit<CartLine, "key">[]) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  compareSubtotal: number;
  count: number;
  checkout: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "store-cart-v1";

function lineKey(l: Omit<CartLine, "key">) {
  return `${l.handle}::${l.variantId ?? ""}::${l.unitPrice}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ lines: [], isOpen: false, reservedUntil: null });
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CartState>;
        setState((s) => ({ ...s, lines: parsed.lines ?? [], reservedUntil: parsed.reservedUntil ?? null }));
      }
    } catch {
      /* ignore */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ lines: state.lines, reservedUntil: state.reservedUntil }),
      );
    } catch {
      /* ignore */
    }
  }, [state.lines, state.reservedUntil]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", state.isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [state.isOpen]);

  const addLines = useCallback((incoming: Omit<CartLine, "key">[]) => {
    setState((s) => {
      const lines = [...s.lines];
      for (const inc of incoming) {
        const key = lineKey(inc);
        const idx = lines.findIndex((l) => l.key === key);
        if (idx >= 0) lines[idx] = { ...lines[idx], quantity: lines[idx].quantity + inc.quantity };
        else lines.push({ ...inc, key });
      }
      const reservedUntil =
        s.lines.length === 0 || !s.reservedUntil || s.reservedUntil < Date.now()
          ? Date.now() + storeConfig.cart.reserveMinutes * 60_000
          : s.reservedUntil;
      return { ...s, lines, isOpen: true, reservedUntil };
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setState((s) => ({
      ...s,
      lines: quantity <= 0 ? s.lines.filter((l) => l.key !== key) : s.lines.map((l) => (l.key === key ? { ...l, quantity } : l)),
    }));
  }, []);

  const removeLine = useCallback((key: string) => {
    setState((s) => ({ ...s, lines: s.lines.filter((l) => l.key !== key) }));
  }, []);

  const openCart = useCallback(() => setState((s) => ({ ...s, isOpen: true })), []);
  const closeCart = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);

  const subtotal = useMemo(() => state.lines.reduce((a, l) => a + l.unitPrice * l.quantity, 0), [state.lines]);
  const compareSubtotal = useMemo(
    () => state.lines.reduce((a, l) => a + (l.compareAtUnit ?? l.unitPrice) * l.quantity, 0),
    [state.lines],
  );
  const count = useMemo(() => state.lines.reduce((a, l) => a + l.quantity, 0), [state.lines]);

  const checkout = useCallback(() => {
    const { mode, shopDomain, url } = storeConfig.checkout;
    if (mode === "shopify" && shopDomain) {
      const parts = state.lines
        .filter((l) => l.shopifyVariantId)
        .map((l) => `${l.shopifyVariantId}:${l.quantity}`)
        .join(",");
      window.location.href = `https://${shopDomain}/cart/${parts}`;
      return;
    }
    if (mode === "custom" && url) {
      window.location.href = url;
      return;
    }
    window.alert("Checkout is not configured yet. Set `checkout` in src/store.config.ts.");
  }, [state.lines]);

  const value: CartContextValue = {
    ...state,
    addLines,
    updateQuantity,
    removeLine,
    openCart,
    closeCart,
    subtotal,
    compareSubtotal,
    count,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
