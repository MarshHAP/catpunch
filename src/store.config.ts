import type { StoreConfig } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CAT PUNCH — STORE CONFIG
 *  Every piece of copy, price, image and colour on the site lives here.
 *  Images under /images/catpunch are placeholder illustrations: drop the real
 *  product renders into public/ and update the paths below.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const storeConfig: StoreConfig = {
  brand: {
    name: "Cat Punch",
    wordmark: ["CAT", "PUNCH"],
    tagline: "Play more. Purr more.",
    description: "Cat Punch is the interactive cat boxing bag that keeps your cat active, happy and healthy.",
  },

  theme: {
    accent: "#FFD21E",
    accentDeep: "#F7A11A",
    cta: "#E3342F",
    text: "#151515",
    background: "#ffffff",
    backgroundAlt: "#FFF6D6",
    dark: "#111111",
    star: "#FFC400",
  },

  currency: { code: "GBP", symbol: "£", locale: "en-GB" },

  announcement: { enabled: false, items: [] },

  nav: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/#featured" },
    { label: "About", href: "/#about" },
    { label: "Reviews", href: "/#reviews" },
  ],

  hero: {
    enabled: true,
    heading: ["Keep your cat active", "happy & healthy"],
    badges: [
      { icon: "paw", title: "Builds healthy habits" },
      { icon: "bolt", title: "Relieves boredom" },
      { icon: "heart", title: "A happier, calmer cat" },
    ],
    cta: { label: "Shop now", href: "/#featured" },
    image: "/images/catpunch/hero.svg",
    imageAlt: "A tabby cat punching the Cat Punch boxing bag",
    sticker: ["Play", "Fight", "Stay active!"],
  },

  trustBar: {
    enabled: true,
    items: [
      { icon: "truck", title: "Fast & free shipping", text: "On all orders" },
      { icon: "shield", title: "30 day returns", text: "Hassle free" },
      { icon: "cat", title: "Happy cats", text: "Thousands of 5 star reviews" },
    ],
  },

  featuredProductHandle: "cat-punch",

  products: [
    {
      handle: "cat-punch",
      title: "Cat Punch",
      subtitle: "Interactive Cat Boxing Bag",
      price: 24.99,
      compareAtPrice: 34.99,
      description: "The interactive cat boxing bag with a strong suction cup base, self-rebound action and soft boxing gloves.",
      media: [
        { src: "/images/catpunch/gallery-1-box.svg", alt: "Cat Punch retail box next to the boxing bag" },
        { src: "/images/catpunch/gallery-2-toy.svg", alt: "Cat Punch interactive cat boxing bag" },
        { src: "/images/catpunch/gallery-3-base.svg", alt: "Strong suction cup base" },
        { src: "/images/catpunch/gallery-4-gloves.svg", alt: "Soft red boxing gloves" },
        { src: "/images/catpunch/gallery-5-bag.svg", alt: "Self-rebound spring action" },
      ],
    },
  ],

  product: {
    socialProof: { avatars: [], title: "", subtitle: "" },
    rating: { value: 5, label: "(1,247 reviews)" },
    benefits: [
      "Keeps cats active and healthy",
      "Strong suction cup base",
      "Self-rebound action for endless fun",
      "Scratch & bite resistant",
      "No batteries needed",
    ],
    savingsMode: "amount",
    trustRow: [
      { icon: "truck", title: "Fast & free shipping", text: "On all orders" },
      { icon: "shield", title: "30 day returns", text: "Hassle free" },
      { icon: "lock", title: "Secure checkout", text: "256-bit SSL encrypted" },
    ],
    accordions: [],
    shipping: {
      enabled: false,
      minDays: 3,
      maxDays: 7,
      text: "Get it between <strong>[start_date]</strong> and <strong>[end_date]</strong>.",
    },
    stickyBar: { buttonLabel: "Add to cart" },
    addToCartLabel: "Add to cart",
  },

  bundles: {
    enabled: true,
    style: "cards",
    title: "Choose Your Bundle:",
    timerMinutes: 0,
    timerLabel: "",
    savingsLabel: "Save",
    savingsMode: "percent",
    tiers: [
      { quantity: 1, title: "1 x Cat Punch", price: 24.99, comparePrice: 24.99 },
      { quantity: 2, title: "2 x Cat Punch", price: 42.48, comparePrice: 49.98 },
      { quantity: 3, title: "3 x Cat Punch", price: 56.23, comparePrice: 74.97 },
    ],
    upsells: [],
    freeShipping: { label: "+ FREE Shipping", icon: "/icons/truck.webp" },
  },

  featureCards: {
    enabled: true,
    items: [
      {
        image: "/images/catpunch/feature-base.svg",
        heading: "Strong suction cup base",
        text: "Stays securely in place during even the wildest play.",
        color: "#FFD21E",
      },
      {
        image: "/images/catpunch/feature-gloves.svg",
        heading: "Fun boxing gloves",
        text: "Soft, safe and irresistible for curious cats.",
        color: "#F7752E",
      },
      {
        image: "/images/catpunch/feature-rebound.svg",
        heading: "Self-rebound action",
        text: "Bounces back for non-stop fun and longer play sessions.",
        color: "#FFD21E",
      },
    ],
  },

  banner: {
    enabled: true,
    image: "/images/catpunch/banner-champions.svg",
    lines: ["Little champions", "watch big dreams"],
    alt: "A cat sitting in front of the TV next to its Cat Punch boxing bag",
  },

  testimonials: {
    heading: "Real cats. Real results.",
    subheading: "Join thousands of happy cat owners.",
    rating: 5,
    items: [
      { image: "/images/catpunch/review-1.svg", rating: 5, text: "My cat is obsessed! Plays with it every day.", author: "Emma R." },
      { image: "/images/catpunch/review-2.svg", rating: 5, text: "Best purchase ever. Keeps him so active!", author: "James T." },
      { image: "/images/catpunch/review-3.svg", rating: 5, text: "So much fun to watch. Amazing quality.", author: "Sophie L." },
      { image: "/images/catpunch/review-4.svg", rating: 5, text: "Both of my cats love it! Worth every penny.", author: "Daniel K." },
    ],
  },

  giftCta: {
    enabled: true,
    image: "/images/catpunch/gift-box.svg",
    sticker: "The purrfect gift!",
    heading: "A small toy for a happier, healthier cat.",
    button: { label: "Shop now", href: "/#featured" },
  },

  benefitsRow: {
    enabled: true,
    items: [
      { icon: "paw", title: "Keeps cats active", text: "Encourages healthy movement and exercise." },
      { icon: "brain", title: "Mental stimulation", text: "Fights boredom and reduces anxiety." },
      { icon: "heart", title: "Happier cats", text: "A more fulfilled and balanced pet." },
      { icon: "home", title: "Perfect for home", text: "Compact design fits any space." },
    ],
  },

  imageWithText: [],

  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "Will the suction cup stick to my floor?",
        answerHtml: "<p>Cat Punch grips best on smooth, hard surfaces such as tiles, laminate, hardwood and glass. Wipe the surface clean, press the base down firmly and it stays put through even the wildest play.</p>",
      },
      {
        question: "Is it safe for kittens?",
        answerHtml: "<p>Yes. The gloves are soft, the bag is scratch and bite resistant and there are no batteries or small parts. It suits cats of every age and size.</p>",
      },
      {
        question: "Does it need batteries?",
        answerHtml: "<p>No. The self-rebound spring does all the work, so Cat Punch is ready to play straight out of the box.</p>",
      },
    ],
  },

  setupSteps: {
    heading: "How to set it up",
    subheading: "Ready to play in under a minute",
    steps: [
      { title: "Step 1", text: "Wipe a smooth, flat surface clean and press the suction cup base down firmly." },
      { title: "Step 2", text: "Slot the spring pole into the base and pop the boxing bag on top." },
      { title: "Step 3", text: "Give it a nudge and let your cat take the first swing." },
    ],
  },

  newsletter: {
    heading: "Join the Cat Punch club",
    text: "Exclusive offers, new drops and happy cat content straight to your inbox.",
    placeholder: "Email",
    button: "Sign up",
  },

  contact: { heading: "Get in touch" },
  collection: { title: "Shop" },

  cart: {
    reserveMinutes: 10,
    emptyTitle: "Your cart is empty",
    continueLabel: "Continue shopping",
    accountTitle: "Have an account?",
    loginLabel: "Log in",
    loginText: "to check out faster.",
    checkoutLabel: "Check out",
  },

  checkout: {
    // "shopify": builds https://{shopDomain}/cart/{variantId}:{qty} from shopifyVariantId on each product/variant
    // "custom": redirects to `url`
    // "none": shows a message
    mode: "none",
    shopDomain: "vqpyp1-21.myshopify.com",
    url: "",
  },

  footer: {
    tagline: "Play more. Purr more.",
    paymentIcons: ["amex", "apple-pay", "google-pay", "klarna", "maestro", "mastercard", "visa"],
  },
};

export default storeConfig;
