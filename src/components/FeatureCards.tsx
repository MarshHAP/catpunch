import { storeConfig } from "@/store.config";
import { Reveal } from "@/components/Reveal";

export function FeatureCards() {
  const { featureCards } = storeConfig;
  if (!featureCards.enabled || featureCards.items.length === 0) return null;
  return (
    <Reveal as="section" className="section feature-cards">
      <div className="page-width">
        <ul className="feature-cards__grid list-unstyled reveal__item" id="about">
          {featureCards.items.map((c) => (
            <li className="feature-card" key={c.heading} style={{ background: c.color ?? "var(--color-accent)" }}>
              <div className="feature-card__media">
                <img src={c.image} alt="" loading="lazy" />
              </div>
              <div className="feature-card__body">
                <h3 className="feature-card__heading display">{c.heading}</h3>
                <p className="feature-card__text">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
