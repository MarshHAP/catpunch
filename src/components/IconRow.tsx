import type { IconItem } from "@/lib/types";
import { Icon } from "@/lib/icons";

/**
 * Horizontal row of icon + title + text, used by the trust bar, the row under
 * add-to-cart and the benefits strip. Variants only change styling.
 */
export function IconRow({
  items,
  variant = "trust",
  className = "",
}: {
  items: IconItem[];
  variant?: "trust" | "compact" | "benefit";
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul className={`icon-row icon-row--${variant} ${className}`} role="list">
      {items.map((it) => (
        <li className="icon-row__item" key={it.title}>
          <span className={variant === "benefit" ? "icon-disc" : "icon-row__icon"}>
            <Icon name={it.icon} />
          </span>
          <span className="icon-row__text">
            <span className="icon-row__title">{it.title}</span>
            {it.text && <span className="icon-row__sub">{it.text}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
