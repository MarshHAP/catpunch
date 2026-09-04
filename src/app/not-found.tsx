import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section contact">
      <div className="contact__inner" style={{ textAlign: "center" }}>
        <h1 className="contact__heading h1">Page not found</h1>
        <p style={{ marginBottom: 20 }}>The page you were looking for doesn&apos;t exist.</p>
        <Link href="/" className="button">
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
