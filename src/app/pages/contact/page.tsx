import type { Metadata } from "next";
import { storeConfig } from "@/store.config";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: `Contact – ${storeConfig.brand.name}` };

export default function ContactPage() {
  return (
    <section className="section contact">
      <div className="contact__inner">
        <h1 className="contact__heading h1">{storeConfig.contact.heading}</h1>
        <ContactForm />
      </div>
    </section>
  );
}
