import { storeConfig } from "@/store.config";
import { IconPaw } from "@/lib/icons";

export function LifestyleBanner() {
  const { banner } = storeConfig;
  if (!banner.enabled) return null;
  return (
    <section className="banner">
      <img className="banner__image" src={banner.image} alt={banner.alt} loading="lazy" />
      <div className="banner__overlay" />
      <div className="page-width banner__inner">
        <p className="banner__text display">
          {banner.lines.map((l) => (
            <span key={l}>{l}</span>
          ))}
          <IconPaw className="banner__paw" />
        </p>
      </div>
    </section>
  );
}
