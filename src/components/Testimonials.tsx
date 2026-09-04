"use client";

import { useRef, useState } from "react";
import { storeConfig } from "@/store.config";
import type { Testimonial } from "@/lib/types";
import { IconArrow } from "@/lib/icons";
import { Stars } from "@/components/Stars";
import { Reveal } from "@/components/Reveal";

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__image-wrapper">
        <img src={t.image} alt="" loading="lazy" />
      </div>
      <div className="testimonial-card__info">
        <div className="testimonial-card__stars">
          <Stars rating={t.rating} />
        </div>
        {t.title && <h3 className="testimonial-card__title">{t.title}</h3>}
        <div className="testimonial-card__body rte">
          <p>&ldquo;{t.text}&rdquo;</p>
        </div>
        <div className="testimonial-card__spacer" />
        <div className="testimonial-card__author-container">
          <p className="testimonial-card__author">{t.author}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { heading, subheading, rating, items } = storeConfig.testimonials;
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  if (items.length === 0) return null;

  const go = (i: number) => setIndex(Math.max(0, Math.min(items.length - 1, i)));

  return (
    <Reveal as="section" className="section testimonials">
      <div className="testimonials__inner page-width" id="reviews">
        <div className="reveal__item title-wrapper">
          <h2 className="testimonials__heading display">{heading}</h2>
          {rating !== undefined && (
            <div className="testimonials__rating">
              <Stars rating={rating} />
            </div>
          )}
          {subheading && <p className="testimonials__subheading">{subheading}</p>}
        </div>

        <div className="testimonials__grid reveal__item" style={{ "--cols": items.length } as React.CSSProperties}>
          {items.map((t) => (
            <Card t={t} key={t.author} />
          ))}
        </div>

        <div className="mslider reveal__item">
          <div
            className="mslider__track"
            onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStart.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
              touchStart.current = null;
            }}
          >
            <ul className="mslider__list" style={{ transform: `translateX(calc(-${index} * (100% + 15px)))` }}>
              {items.map((t, i) => (
                <li className="mslider__slide" key={t.author} aria-hidden={i !== index}>
                  <Card t={t} />
                </li>
              ))}
            </ul>
          </div>
          <div className="mslider__nav">
            <button type="button" className="mslider__arrow mslider__arrow--prev" aria-label="Previous slide" disabled={index === 0} onClick={() => go(index - 1)}>
              <IconArrow />
            </button>
            <ul className="mslider__dots" role="tablist">
              {items.map((t, i) => (
                <li key={t.author}>
                  <button
                    type="button"
                    className={`mslider__dot ${i === index ? "is-active" : ""}`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-selected={i === index}
                    onClick={() => go(i)}
                  />
                </li>
              ))}
            </ul>
            <button type="button" className="mslider__arrow mslider__arrow--next" aria-label="Next slide" disabled={index === items.length - 1} onClick={() => go(index + 1)}>
              <IconArrow />
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
