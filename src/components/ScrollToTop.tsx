"use client";

import { useEffect, useState } from "react";
import { IconChevronUp } from "@/lib/icons";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [stickyBar, setStickyBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onSticky = (e: Event) => setStickyBar(Boolean((e as CustomEvent).detail));
    window.addEventListener("sticky-atc", onSticky);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("sticky-atc", onSticky);
    };
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top ${visible ? "is-visible" : ""} ${stickyBar ? "has-sticky-bar" : ""}`}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <IconChevronUp />
    </button>
  );
}
