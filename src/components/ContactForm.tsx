"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return <p style={{ textAlign: "center" }}>Thanks for contacting us. We&apos;ll get back to you as soon as possible.</p>;
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="contact__fields">
        <div className="field">
          <input id="ContactForm-name" className="field__input" type="text" name="name" placeholder="Name" autoComplete="name" />
          <label className="field__label" htmlFor="ContactForm-name">
            Name
          </label>
        </div>
        <div className="field">
          <input id="ContactForm-email" className="field__input" type="email" name="email" placeholder="Email" autoComplete="email" required />
          <label className="field__label" htmlFor="ContactForm-email">
            Email
          </label>
        </div>
        <div className="field field--full">
          <input id="ContactForm-phone" className="field__input" type="tel" name="phone" placeholder="Phone number" autoComplete="tel" />
          <label className="field__label" htmlFor="ContactForm-phone">
            Phone number
          </label>
        </div>
        <div className="field field--full field--textarea">
          <textarea id="ContactForm-body" className="field__input" name="body" placeholder="Comment" rows={4} />
          <label className="field__label" htmlFor="ContactForm-body">
            Comment
          </label>
        </div>
      </div>
      <div className="contact__submit">
        <button type="submit" className="button button--full-width">
          Send
        </button>
      </div>
    </form>
  );
}
