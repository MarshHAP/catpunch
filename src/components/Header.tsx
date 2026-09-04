"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { storeConfig } from "@/store.config";
import { useCart } from "@/lib/cart";
import { IconAccount, IconCart, IconClose, IconHamburger, IconSearch } from "@/lib/icons";
import { Wordmark } from "@/components/Wordmark";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const lastY = useRef(0);

  // Hide header when scrolling down, reveal when scrolling up (Shopify "sticky-header" behaviour)
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 300) setHidden(true);
      else if (y < lastY.current - 5) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInput.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.startsWith("/#") && pathname.startsWith(href));

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <div className={`header-wrapper ${hidden && !searchOpen ? "is-hidden" : ""}`}>
        <header className="header">
          <div className="header-drawer-wrap">
            <button
              type="button"
              className="header__icon header__icon--menu"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <IconHamburger />
            </button>
          </div>

          <nav className="header__inline-menu" aria-label="Primary">
            <ul className="list-menu list-menu--inline list-unstyled">
              {storeConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="header__menu-item">
                    <span className={isActive(item.href) ? "header__active-menu-item" : undefined}>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <h1 className="header__heading">
            <Link href="/" className="header__heading-link" aria-label={storeConfig.brand.name}>
              {storeConfig.brand.logo ? (
                <img
                  src={storeConfig.brand.logo}
                  alt={storeConfig.brand.name}
                  width={storeConfig.brand.logoWidth}
                  height={storeConfig.brand.logoHeight}
                />
              ) : (
                <Wordmark size={22} className="header__wordmark" />
              )}
            </Link>
          </h1>

          <div className="header__icons">
            <button
              type="button"
              className="header__icon header__icon--search"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <IconSearch />
            </button>
            <Link href="/account" className="header__icon header__icon--account" aria-label="Log in">
              <IconAccount />
            </Link>
            <button
              type="button"
              className="header__icon header__icon--cart"
              aria-label="Cart"
              onClick={openCart}
            >
              <IconCart />
            </button>
          </div>

          <div className={`search-modal ${searchOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Search">
            <div className="search-modal__content">
              <form className="search-modal__form" action="/search" onSubmit={submitSearch} role="search">
                <div className="field">
                  <input
                    ref={searchInput}
                    id="Search-In-Modal"
                    className="field__input"
                    type="search"
                    name="q"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <label className="field__label" htmlFor="Search-In-Modal">
                    Search
                  </label>
                  <button className="search__button" type="submit" aria-label="Search">
                    <IconSearch />
                  </button>
                </div>
              </form>
              <button type="button" className="search-modal__close" aria-label="Close" onClick={() => setSearchOpen(false)}>
                <IconClose />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className={`menu-drawer__overlay ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(false)} />
      <div className={`menu-drawer ${menuOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="menu-drawer__title-bar">
          <h3 className="menu-drawer__title">Menu</h3>
          <button type="button" className="menu-drawer__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <IconClose />
          </button>
        </div>
        <nav className="menu-drawer__navigation">
          <ul className="menu-drawer__menu list-unstyled">
            {storeConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`menu-drawer__menu-item ${isActive(item.href) ? "menu-drawer__menu-item--active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-drawer__utility">
          <Link href="/account" className="menu-drawer__account">
            <IconAccount />
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
