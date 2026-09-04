import { storeConfig } from "@/store.config";

const NAMES: Record<string, string> = {
  amex: "American Express",
  "apple-pay": "Apple Pay",
  bancontact: "Bancontact",
  diners: "Diners Club",
  discover: "Discover",
  "google-pay": "Google Pay",
  klarna: "Klarna",
  maestro: "Maestro",
  mastercard: "Mastercard",
  unionpay: "Union Pay",
  visa: "Visa",
};

export function PaymentBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`payment-badges ${className}`} role="list">
      {storeConfig.footer.paymentIcons.map((icon) => (
        <li className="payment-badges__item" key={icon}>
          <img src={`/icons/payments/${icon}.svg`} alt={NAMES[icon] ?? icon} width={38} height={24} loading="lazy" />
        </li>
      ))}
    </ul>
  );
}
