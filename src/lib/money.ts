import { storeConfig } from "@/store.config";

export function formatMoney(amount: number): string {
  const { symbol } = storeConfig.currency;
  return `${symbol}${amount.toFixed(2)}`;
}

export function percentOff(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function formatLongDate(d: Date): string {
  const weekday = d.toLocaleDateString(storeConfig.currency.locale, { weekday: "long" });
  const month = d.toLocaleDateString(storeConfig.currency.locale, { month: "long" });
  return `${weekday}, ${month} ${ordinal(d.getDate())}`;
}
