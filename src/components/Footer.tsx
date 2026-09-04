import Link from "next/link";
import { storeConfig } from "@/store.config";
import { PaymentBadges } from "@/components/PaymentBadges";
import { Wordmark } from "@/components/Wordmark";

export function Footer() {
  const { brand, footer, nav } = storeConfig;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="page-width footer__inner">
        <Link href="/" className="footer__brand" aria-label={brand.name}>
          <Wordmark size={26} withPaw={false} />
        </Link>
        <p className="footer__tagline">{footer.tagline}</p>
        <nav aria-label="Footer">
          <ul className="footer__nav list-unstyled">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/pages/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="footer__payment">
          <span className="visually-hidden">Payment methods</span>
          <PaymentBadges />
        </div>
        <div className="footer__copyright">
          <small>
            © {year}, <Link href="/">{brand.name}</Link>
          </small>{" "}
          {brand.poweredBy && (
            <small>
              Powered by{" "}
              <a href={brand.poweredBy.href} target="_blank" rel="noopener noreferrer">
                {brand.poweredBy.label}
              </a>
            </small>
          )}
        </div>
      </div>
    </footer>
  );
}
