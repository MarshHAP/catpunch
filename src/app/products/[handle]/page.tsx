import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { storeConfig } from "@/store.config";
import { getProduct } from "@/lib/products";
import { ProductSection } from "@/components/ProductSection";
import { AnnouncementTicker } from "@/components/AnnouncementTicker";
import { Testimonials } from "@/components/Testimonials";
import { ImageWithText } from "@/components/ImageWithText";
import { FaqSection } from "@/components/FaqSection";
import { SetupSteps } from "@/components/SetupSteps";

type Params = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return storeConfig.products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  return { title: product ? `${product.title} – ${storeConfig.brand.name}` : storeConfig.brand.name };
}

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();
  const isFeatured = product.handle === storeConfig.featuredProductHandle;
  return (
    <>
      <ProductSection product={product} sectionId={`product-${product.handle}`} />
      {isFeatured && (
        <>
          <AnnouncementTicker />
          <Testimonials />
          {storeConfig.imageWithText.map((s) => (
            <ImageWithText section={s} key={s.id} />
          ))}
          <FaqSection />
          <SetupSteps />
        </>
      )}
    </>
  );
}
