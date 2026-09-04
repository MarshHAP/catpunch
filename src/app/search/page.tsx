import type { Metadata } from "next";
import { storeConfig } from "@/store.config";
import { searchProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { IconSearch } from "@/lib/icons";

export const metadata: Metadata = { title: `Search – ${storeConfig.brand.name}` };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const results = searchProducts(q);
  return (
    <section className="section search-page">
      <div className="page-width">
        <h1 className="search-page__title h1">{q ? "Search results" : "Search"}</h1>
        <form className="search-page__form" action="/search" role="search">
          <div className="field">
            <input id="Search-Page" className="field__input" type="search" name="q" defaultValue={q} placeholder="Search" />
            <label className="field__label" htmlFor="Search-Page">
              Search
            </label>
            <button className="search__button" type="submit" aria-label="Search">
              <IconSearch />
            </button>
          </div>
        </form>
        {q && results.length === 0 && <p style={{ textAlign: "center" }}>No results found for “{q}”. Check the spelling or use a different word or phrase.</p>}
        {results.length > 0 && (
          <ul className="product-grid" role="list">
            {results.map((p) => (
              <li key={p.handle}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
