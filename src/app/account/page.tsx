import type { Metadata } from "next";
import { storeConfig } from "@/store.config";

export const metadata: Metadata = { title: `Account – ${storeConfig.brand.name}` };

export default function AccountPage() {
  return (
    <section className="section contact">
      <div className="contact__inner">
        <h1 className="contact__heading h1">Log in</h1>
        <form onSubmit={undefined} action="#" method="post">
          <div className="contact__fields">
            <div className="field field--full">
              <input id="CustomerEmail" className="field__input" type="email" name="email" placeholder="Email" autoComplete="email" />
              <label className="field__label" htmlFor="CustomerEmail">
                Email
              </label>
            </div>
            <div className="field field--full">
              <input id="CustomerPassword" className="field__input" type="password" name="password" placeholder="Password" autoComplete="current-password" />
              <label className="field__label" htmlFor="CustomerPassword">
                Password
              </label>
            </div>
          </div>
          <div className="contact__submit">
            <button type="submit" className="button button--full-width">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
