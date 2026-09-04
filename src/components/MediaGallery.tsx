"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/types";
import { IconArrow, IconCaret } from "@/lib/icons";

const THUMBS_PER_VIEW = 5;

export function MediaGallery({
  media,
  active,
  onChange,
  title,
}: {
  media: MediaItem[];
  active: number;
  onChange: (index: number) => void;
  title: string;
}) {
  const [thumbOffset, setThumbOffset] = useState(0);
  const touchStart = useRef<number | null>(null);
  const maxThumbOffset = Math.max(0, media.length - THUMBS_PER_VIEW);

  // keep the active thumbnail in view
  useEffect(() => {
    if (active < thumbOffset) setThumbOffset(active);
    else if (active >= thumbOffset + THUMBS_PER_VIEW) setThumbOffset(Math.min(active - THUMBS_PER_VIEW + 1, maxThumbOffset));
  }, [active, thumbOffset, maxThumbOffset]);

  const go = (i: number) => onChange(Math.max(0, Math.min(media.length - 1, i)));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  };

  return (
    <div className="gallery-wrapper">
      <div className="gallery">
        <div className="gallery__viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="gallery__track" style={{ transform: `translateX(calc(-${active} * (100% + var(--gallery-gap, 0px))))` }}>
            {media.map((m, i) => (
              <div className="gallery__slide" key={m.src} aria-hidden={i !== active}>
                <div className="gallery__media" style={{ aspectRatio: String(m.ratio ?? 1) }}>
                  <img
                    src={m.src}
                    alt={m.alt ?? `${title} image ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : undefined}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="gallery__arrow gallery__arrow--prev"
            aria-label="Slide left"
            disabled={active === 0}
            onClick={() => go(active - 1)}
          >
            <IconArrow />
          </button>
          <button
            type="button"
            className="gallery__arrow gallery__arrow--next"
            aria-label="Slide right"
            disabled={active === media.length - 1}
            onClick={() => go(active + 1)}
          >
            <IconArrow />
          </button>
        </div>
        <div className="gallery__dots" role="tablist">
          {media.map((m, i) => (
            <button
              type="button"
              key={m.src}
              className={`gallery__dot ${i === active ? "is-active" : ""}`}
              aria-label={`Load slide ${i + 1} of ${media.length}`}
              aria-selected={i === active}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>

      {media.length > 1 && (
        <div className="thumbnails">
          <button
            type="button"
            className="thumbnails__button thumbnails__button--prev"
            aria-label="Previous thumbnails"
            disabled={thumbOffset === 0}
            onClick={() => setThumbOffset((o) => Math.max(0, o - 1))}
          >
            <IconCaret />
          </button>
          <div className="thumbnails__viewport">
            <div
              className="thumbnails__track"
              style={{ transform: `translateX(calc(-${thumbOffset} * ((100% - 4 * var(--gap, 7.5px)) / 5 + var(--gap, 7.5px))))` }}
            >
              {media.map((m, i) => (
                <button
                  type="button"
                  key={m.src}
                  className={`thumbnail ${i === active ? "is-active" : ""}`}
                  aria-label={`Load image ${i + 1} in gallery view`}
                  aria-current={i === active}
                  onClick={() => go(i)}
                >
                  <img src={m.thumb ?? m.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="thumbnails__button thumbnails__button--next"
            aria-label="Next thumbnails"
            disabled={thumbOffset >= maxThumbOffset}
            onClick={() => setThumbOffset((o) => Math.min(maxThumbOffset, o + 1))}
          >
            <IconCaret />
          </button>
        </div>
      )}
    </div>
  );
}
