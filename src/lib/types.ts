export type MediaItem = {
  /** Full-size image path (public/) */
  src: string;
  /** Optional smaller thumbnail; falls back to src */
  thumb?: string;
  alt?: string;
  /** Aspect ratio width/height, defaults to 1 */
  ratio?: number;
};

export type Variant = {
  /** Machine id, used in the cart */
  id: string;
  /** Label shown on the pill */
  label: string;
  /** Index into product.media the gallery jumps to when selected */
  mediaIndex?: number;
  /** Shopify variant id if checkout.mode === "shopify" */
  shopifyVariantId?: string;
  available?: boolean;
};

export type Product = {
  handle: string;
  title: string;
  /** Secondary line under the title, e.g. "Interactive Cat Boxing Bag" */
  subtitle?: string;
  price: number;
  compareAtPrice?: number;
  media: MediaItem[];
  /** Optional option name, e.g. "Design" */
  optionName?: string;
  variants?: Variant[];
  /** Short description used on collection cards / search */
  description?: string;
  shopifyVariantId?: string;
  available?: boolean;
  /** true = shows a "Choose options" button on cards instead of "Add to cart" */
  hasOptions?: boolean;
};

export type BundleTier = {
  quantity: number;
  title: string;
  /** Total price for this tier */
  price: number;
  /** Total compare-at price for this tier */
  comparePrice: number;
  mostPopular?: boolean;
  /** Perks listed inside the tier (e.g. "+ FREE Shipping") */
  perks?: { label: string; icon?: string }[];
};

export type Upsell = {
  /** product handle of the add-on */
  handle: string;
  label: string;
  price: number;
  comparePrice?: number;
  image: string;
};

export type Testimonial = {
  image: string;
  rating: number;
  title?: string;
  text: string;
  author: string;
};

export type ImageWithTextSection = {
  id: string;
  heading: string;
  /** HTML string (bold/italic supported) */
  html: string;
  video?: string;
  poster?: string;
  image?: string;
  /** Media on the right (desktop) */
  mediaRight?: boolean;
};

export type FaqItem = { question: string; answerHtml: string };

export type AccordionItem = { title: string; html: string };

export type NavItem = { label: string; href: string };

/** Name of an icon exported from lib/icons (see ICONS map) */
export type IconName =
  | "paw"
  | "bolt"
  | "heart"
  | "truck"
  | "shield"
  | "lock"
  | "brain"
  | "home"
  | "check"
  | "cat";

export type IconItem = { icon: IconName; title: string; text?: string };

export type FeatureCard = {
  image: string;
  heading: string;
  text: string;
  /** Card background colour */
  color?: string;
};

export type SavingsMode = "percent" | "amount";

export type StoreConfig = {
  brand: {
    name: string;
    /** Optional image logo. When omitted the CSS wordmark is rendered instead. */
    logo?: string;
    logoWidth?: number;
    logoHeight?: number;
    /** Two-line wordmark, e.g. ["CAT", "PUNCH"] */
    wordmark: [string, string];
    tagline: string;
    description: string;
    /** Displayed as "Powered by …" in the footer (optional) */
    poweredBy?: { label: string; href: string };
  };
  theme: {
    /** Primary brand colour (yellow) */
    accent: string;
    /** Deeper accent used for sunbursts and gradients (orange) */
    accentDeep: string;
    /** Call-to-action colour (red) */
    cta: string;
    text: string;
    background: string;
    backgroundAlt: string;
    /** Dark surface (footer) */
    dark: string;
    star: string;
  };
  currency: { code: string; symbol: string; locale: string };
  announcement: { items: string[]; enabled: boolean };
  nav: NavItem[];
  hero: {
    enabled: boolean;
    /** One entry per line */
    heading: string[];
    badges: IconItem[];
    cta: { label: string; href: string };
    image: string;
    imageAlt: string;
    /** Hand-written style sticker text next to the image */
    sticker: string[];
  };
  trustBar: { enabled: boolean; items: IconItem[] };
  products: Product[];
  featuredProductHandle: string;
  product: {
    socialProof: { avatars: string[]; title: string; subtitle: string };
    rating: { value: number; label: string };
    benefits: string[];
    /** How the badge next to the price reads: "Save 29%" or "Save £10" */
    savingsMode: SavingsMode;
    /** Small icon row under the add-to-cart button */
    trustRow: IconItem[];
    accordions: AccordionItem[];
    shipping: { enabled: boolean; minDays: number; maxDays: number; text: string };
    stickyBar: { buttonLabel: string };
    addToCartLabel: string;
  };
  bundles: {
    enabled: boolean;
    /** "cards" = compact horizontal tiles (design), "bars" = stacked rows with variant selects */
    style: "cards" | "bars";
    title: string;
    timerMinutes: number;
    timerLabel: string;
    tiers: BundleTier[];
    upsells: Upsell[];
    freeShipping: { label: string; icon: string };
    savingsLabel: string;
    savingsMode: SavingsMode;
  };
  featureCards: { enabled: boolean; items: FeatureCard[] };
  banner: { enabled: boolean; image: string; lines: string[]; alt: string };
  testimonials: { heading: string; subheading?: string; rating?: number; items: Testimonial[] };
  giftCta: {
    enabled: boolean;
    image: string;
    sticker: string;
    heading: string;
    button: { label: string; href: string };
  };
  benefitsRow: { enabled: boolean; items: IconItem[] };
  imageWithText: ImageWithTextSection[];
  faq: { heading: string; items: FaqItem[] };
  setupSteps: {
    heading: string;
    subheading: string;
    steps: { title: string; text: string }[];
  };
  newsletter: { heading: string; text: string; placeholder: string; button: string };
  contact: { heading: string };
  collection: { title: string };
  cart: {
    reserveMinutes: number;
    emptyTitle: string;
    continueLabel: string;
    accountTitle: string;
    loginLabel: string;
    loginText: string;
    checkoutLabel: string;
  };
  checkout: {
    /** "shopify" builds a cart permalink, "custom" redirects to url, "none" shows an alert */
    mode: "shopify" | "custom" | "none";
    shopDomain?: string;
    url?: string;
  };
  footer: { tagline: string; paymentIcons: string[] };
};
