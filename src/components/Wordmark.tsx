import { storeConfig } from "@/store.config";
import { IconPaw } from "@/lib/icons";

/**
 * Two-line comic wordmark ("CAT" / "PUNCH") rendered as text so it picks up
 * the display font and scales with CSS. `size` is the font-size of the top line.
 */
export function Wordmark({ size = 32, className = "", withPaw = true }: { size?: number; className?: string; withPaw?: boolean }) {
  const [top, bottom] = storeConfig.brand.wordmark;
  return (
    <span className={`wordmark ${className}`} style={{ "--wm-size": `${size}px` } as React.CSSProperties} aria-label={storeConfig.brand.name}>
      <span className="wordmark__top" aria-hidden="true">
        {top}
        {withPaw && <IconPaw className="wordmark__paw" />}
      </span>
      <span className="wordmark__bottom" aria-hidden="true">
        {bottom}
      </span>
    </span>
  );
}
