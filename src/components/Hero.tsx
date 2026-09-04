import Link from "next/link";
import { storeConfig } from "@/store.config";
import { Icon, IconArrowRight } from "@/lib/icons";
import { Wordmark } from "@/components/Wordmark";

export function Hero() {
  const { hero } = storeConfig;
  if (!hero.enabled) return null;
  return (
    <section className="hero sunburst" id="hero">
      <div className="page-width hero__inner">
        <div className="hero__copy">
          <Wordmark size={64} className="hero__wordmark" />
          <p className="hero__heading display">
            {hero.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <ul className="hero__badges list-unstyled">
            {hero.badges.map((b) => (
              <li className="hero__badge" key={b.title}>
                <span className="icon-disc icon-disc--dark">
                  <Icon name={b.icon} />
                </span>
                <span className="hero__badge-label display">{b.title}</span>
              </li>
            ))}
          </ul>
          <Link href={hero.cta.href} className="button button--cta button--lg hero__cta">
            {hero.cta.label}
            <IconArrowRight className="button__arrow" />
          </Link>
        </div>
        <div className="hero__media">
          <img src={hero.image} alt={hero.imageAlt} width={1000} height={900} fetchPriority="high" />
          {hero.sticker.length > 0 && (
            <div className="hero__sticker display" aria-hidden="true">
              {hero.sticker.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
