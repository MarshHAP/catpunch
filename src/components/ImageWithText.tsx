import type { ImageWithTextSection } from "@/lib/types";
import { Reveal } from "@/components/Reveal";

export function ImageWithText({ section }: { section: ImageWithTextSection }) {
  return (
    <Reveal className="section image-with-text image-with-text--mobile-reverse" >
      <div className="page-width" style={{ padding: 0 }}>
        <div className={`image-with-text__grid reveal__item ${section.mediaRight ? "image-with-text__grid--reverse" : ""}`}>
          <div className="image-with-text__media-item">
            <div className="image-with-text__media">
              {section.video ? (
                <video src={section.video} poster={section.poster} autoPlay muted loop playsInline preload="metadata" aria-label={section.heading} />
              ) : (
                <img src={section.image} alt="" loading="lazy" />
              )}
            </div>
          </div>
          <div className="image-with-text__text-item">
            <div className="image-with-text__content">
              <h2 className="image-with-text__heading h1">{section.heading}</h2>
              <div className="image-with-text__text rte" dangerouslySetInnerHTML={{ __html: section.html }} />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
