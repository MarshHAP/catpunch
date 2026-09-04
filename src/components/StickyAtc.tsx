"use client";

import { useEffect, useState } from "react";

export function StickyAtc({
  image,
  title,
  buttonLabel,
  targetId,
  onClick,
}: {
  image: string;
  title: string;
  buttonLabel: string;
  /** id of the main add-to-cart button; bar shows once it has scrolled up out of view */
  targetId: string;
  onClick: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let last: boolean | null = null;
    let raf = 0;
    const check = () => {
      raf = 0;
      const show = target.getBoundingClientRect().bottom < 0;
      if (show === last) return;
      last = show;
      setVisible(show);
      window.dispatchEvent(new CustomEvent("sticky-atc", { detail: show }));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      window.dispatchEvent(new CustomEvent("sticky-atc", { detail: false }));
    };
  }, [targetId]);

  return (
    <div className={`sticky-atc ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <div className="sticky-atc__inner">
        <div className="sticky-atc__product">
          <img className="sticky-atc__image" src={image} alt="" />
          <span className="sticky-atc__title">{title}</span>
        </div>
        <button type="button" className="sticky-atc__button" onClick={onClick} tabIndex={visible ? 0 : -1}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
