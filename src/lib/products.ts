import { storeConfig } from "@/store.config";
import type { Product } from "@/lib/types";

export function getProduct(handle: string): Product | undefined {
  return storeConfig.products.find((p) => p.handle === handle);
}

export function getFeaturedProduct(): Product {
  return getProduct(storeConfig.featuredProductHandle) ?? storeConfig.products[0];
}

export function allProducts(): Product[] {
  return [...storeConfig.products].sort((a, b) => a.title.localeCompare(b.title));
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return storeConfig.products.filter(
    (p) => p.title.toLowerCase().includes(q) || (p.description ?? "").toLowerCase().includes(q),
  );
}
