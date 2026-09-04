import type { Metadata } from "next";
import { storeConfig } from "@/store.config";
import { allProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import { IconCaret, IconFilter } from "@/lib/icons";

export function generateStaticParams() {
  return [{ handle: "all" }];
}

export const metadata: Metadata = { title: `${storeConfig.collection.title} – ${storeConfig.brand.name}` };

export default function CollectionPage() {
  const products = allProducts();
  return (
    <>
      <section className="section">
        <div className="page-width">
          <div className="collection-banner">
            <h1 className="h1">{storeConfig.collection.title}</h1>
          </div>
          <div className="facets">
            <div className="facets__left">
              <span className="facets__label">Filter:</span>
              <button type="button" className="facets__select">
                Availability <IconCaret />
              </button>
            </div>
            <button type="button" className="facets__mobile-toggle">
              <IconFilter /> Filter and sort
            </button>
            <div className="facets__right">
              <div className="facets__sort">
                <span className="facets__label">Sort by:</span>
                <button type="button" className="facets__select">
                  Alphabetically, A-Z <IconCaret />
                </button>
              </div>
              <span className="facets__count">
                {products.length} {products.length === 1 ? "product" : "products"}
              </span>
            </div>
          </div>
          <ul className="product-grid" role="list">
            {products.map((p) => (
              <li key={p.handle}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
