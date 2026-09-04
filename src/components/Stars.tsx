import { IconStar } from "@/lib/icons";

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span className={`stars ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      <span className="stars__row" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} />
        ))}
      </span>
      <span className="stars__row stars__row--active" style={{ width: `${pct}%` }} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} />
        ))}
      </span>
    </span>
  );
}
