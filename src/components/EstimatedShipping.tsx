"use client";

import { useEffect, useState } from "react";
import { storeConfig } from "@/store.config";
import { formatLongDate } from "@/lib/money";
import { IconShipping } from "@/lib/icons";

export function EstimatedShipping() {
  const { shipping } = storeConfig.product;
  const [html, setHtml] = useState(() => shipping.text.replace("[start_date]", "-").replace("[end_date]", "-"));

  useEffect(() => {
    const start = new Date();
    start.setDate(start.getDate() + shipping.minDays);
    const end = new Date();
    end.setDate(end.getDate() + shipping.maxDays);
    setHtml(shipping.text.replace("[start_date]", formatLongDate(start)).replace("[end_date]", formatLongDate(end)));
  }, [shipping]);

  return (
    <div className="estimated-shipping">
      <div className="estimated-shipping__icon" aria-hidden="true">
        <IconShipping />
      </div>
      <div className="estimated-shipping__text" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
