import { storeConfig } from "@/store.config";
import { getFeaturedProduct } from "@/lib/products";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ProductSection } from "@/components/ProductSection";
import { FeatureCards } from "@/components/FeatureCards";
import { LifestyleBanner } from "@/components/LifestyleBanner";
import { Testimonials } from "@/components/Testimonials";
import { GiftCta } from "@/components/GiftCta";
import { BenefitsRow } from "@/components/BenefitsRow";
import { ImageWithText } from "@/components/ImageWithText";
import { FaqSection } from "@/components/FaqSection";
import { SetupSteps } from "@/components/SetupSteps";

export default function Home() {
  const product = getFeaturedProduct();
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductSection product={product} sectionId="featured" />
      <FeatureCards />
      <LifestyleBanner />
      <Testimonials />
      <GiftCta />
      <BenefitsRow />
      {storeConfig.imageWithText.map((s) => (
        <ImageWithText section={s} key={s.id} />
      ))}
      {storeConfig.faq.items.length > 0 && <FaqSection />}
      {storeConfig.setupSteps.steps.length > 0 && <SetupSteps />}
    </>
  );
}
