"use client";

import { useState } from "react";
import { storeConfig } from "@/store.config";

export function Newsletter() {
  const { heading, text, placeholder, button } = storeConfig.newsletter;
  const [done, setDone] = useState(false);
  return (
    <section className="newsletter">
      <div className="newsletter__inner">
        <h2 className="h1">{heading}</h2>
        <p className="newsletter__text">{text}</p>
        <form
          className="newsletter__form"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          {done ? (
            <p>Thanks for subscribing!</p>
          ) : (
            <>
              <div className="field">
                <input id="NewsletterForm--email" className="field__input" type="email" name="email" placeholder={placeholder} required />
                <label className="field__label" htmlFor="NewsletterForm--email">
                  {placeholder}
                </label>
              </div>
              <button type="submit" className="button button--dark">
                {button}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
