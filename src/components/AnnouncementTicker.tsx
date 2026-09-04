import { storeConfig } from "@/store.config";

/**
 * Infinite horizontal ticker. The item list is repeated so that the first half
 * of the track is wider than any viewport; the CSS animation scrolls by -50%.
 */
export function AnnouncementTicker({ className = "" }: { className?: string }) {
  const { announcement } = storeConfig;
  if (!announcement.enabled || announcement.items.length === 0) return null;

  const repeats = Math.max(1, Math.ceil(16 / announcement.items.length));
  const half = Array.from({ length: repeats }, () => announcement.items).flat();
  const items = [...half, ...half];

  return (
    <div className={`ticker ${className}`} aria-label="Announcements">
      <div className="ticker__track">
        {items.map((text, i) => (
          <p className="ticker__item" key={i} aria-hidden={i >= half.length ? "true" : undefined}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
