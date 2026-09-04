import Link from "next/link";
import { storeConfig } from "@/store.config";
import { IconArrowRight } from "@/lib/icons";

export function GiftCta() {
  const { giftCta } = storeConfig;
  if (!giftCta.enabled) return null;
  return (
    <section className="gift-cta sunburst">
      <div className="page-width gift-cta__inner">
        <div className="gift-cta__media">
          <img src={giftCta.image} alt="Cat Punch gift box" loading="lazy" width={640} height={820} />
          <div className="gift-cta__sticker display" aria-hidden="true">
            <span>{giftCta.sticker}</span>
          </div>
          <svg className="gift-cta__arrow" viewBox="0 0 80 60" aria-hidden="true">
            <path d="M74 6 C60 40 40 50 8 48" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M18 40 L8 48 L20 54" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="gift-cta__copy">
          <h2 className="gift-cta__heading display">{giftCta.heading}</h2>
          <Link href={giftCta.button.href} className="button button--cta button--lg">
            {giftCta.button.label}
            <IconArrowRight className="button__arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
