"use client";

import { useId, useState } from "react";
import { IconCaret } from "@/lib/icons";

export function Accordion({
  title,
  html,
  defaultOpen = false,
  className = "",
}: {
  title: string;
  html: string;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`accordion ${open ? "is-open" : ""} ${className}`}>
      <button
        type="button"
        className="accordion__summary"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <h2 className="accordion__title h4">{title}</h2>
        <IconCaret className="accordion__caret" />
      </button>
      <div className="accordion__content-wrapper">
        <div className="accordion__content rte" id={id}>
          <div className="accordion__content-inner" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}
