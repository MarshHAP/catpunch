import type { Metadata, Viewport } from "next";
import "./globals.css";
import { storeConfig } from "@/store.config";
import { CartProvider } from "@/lib/cart";
import { AnnouncementTicker } from "@/components/AnnouncementTicker";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: storeConfig.brand.name,
  description: storeConfig.brand.description,
  openGraph: {
    siteName: storeConfig.brand.name,
    title: storeConfig.brand.name,
    description: storeConfig.brand.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: storeConfig.theme.accent,
};

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = storeConfig.theme;
  const cssVars = {
    "--color-accent": t.accent,
    "--color-accent-rgb": hexToRgb(t.accent),
    "--color-text": t.text,
    "--color-text-rgb": hexToRgb(t.text),
    "--color-accent-deep": t.accentDeep,
    "--color-cta": t.cta,
    "--color-cta-rgb": hexToRgb(t.cta),
    "--color-dark": t.dark,
    "--color-bg": t.background,
    "--color-bg-alt": t.backgroundAlt,
    "--color-star": t.star,
  } as React.CSSProperties;

  return (
    <html lang="en" style={cssVars}>
      <body>
        <CartProvider>
          <a className="skip-to-content-link button visually-hidden" href="#MainContent">
            Skip to content
          </a>
          <AnnouncementTicker />
          <Header />
          <CartDrawer />
          <main id="MainContent" className="content-for-layout">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
