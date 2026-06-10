// Public, client-safe product catalog for FreedomLinks.
// NOTE: This module contains marketing copy only — never the protected
// sourcing links. Those live in `lib/content.server.ts` and are revealed
// strictly server-side after a verified Stripe payment.

export type ProductSlug =
  | "sm7b"
  | "chrome-hearts"
  | "sur-ron"
  | "cologne-vendor"
  | "dyson-vendor"
  | "sp5der-vendor"
  | "airpods-max-vendor"
  | "alocs-vendor"
  | "hellstar-vendor"
  | "meta-vendor"
  | "coaching"
  | "all-vendors";

export interface Product {
  slug: ProductSlug;
  /** Display name shown across the store. */
  name: string;
  /** Category label used on cards and crumbs. */
  category: string;
  /** Human-readable display price, e.g. "$24". */
  priceDisplay: string;
  /** Numeric price in major units, used only for JSON-LD / display. */
  priceAmount: number;
  /** Currency code for display + structured data. */
  currency: string;
  /** Env var name that holds this product's Stripe Price ID. */
  stripePriceEnv: string;
  /** Optional short tagline shown on the card and the product-page hero. */
  tagline?: string;
  /** Optional overview paragraph rendered in the product page's "What's inside" area. */
  overview?: string;
  /** Optional list of included items, rendered as the "What's inside" bullets. */
  inside?: string[];
  /**
   * Optional "was" price shown struck-through when the item is on sale, e.g.
   * "$250". Display-only — the amount actually charged is the Stripe Price.
   */
  compareAtDisplay?: string;
  /**
   * Optional sale-urgency countdown length in seconds (e.g. 600 = 10 minutes).
   * When set alongside `compareAtDisplay`, a live ticking timer is rendered.
   */
  saleCountdownSeconds?: number;
  /**
   * Cover image path in /public (e.g. "/products/sm7b.jpg"). Optional — when
   * absent, the art panel renders the branded gradient + monogram instead.
   */
  image?: string;
  /** Tailwind gradient fallback used behind the cover image / monogram. */
  artwork: {
    from: string;
    to: string;
    /** Big monogram rendered in the art panel. */
    monogram: string;
  };
  /** Number of vetted sellers/dealers — used as a headline stat. */
  sellerCount: number;
}

export const products: Product[] = [
  {
    slug: "all-vendors",
    name: "All My Vendors",
    category: "Complete Bundle",
    tagline: "Every vendor. One drop.",
    overview:
      "The complete FreedomLinks collection. Every sourcing guide in one bundle at a discounted price versus buying individually.",
    inside: [
      "Access to every individual vendor guide in the store",
      "All in one purchase",
      "The same instant delivery",
    ],
    priceDisplay: "$80",
    priceAmount: 80,
    compareAtDisplay: "$300",
    saleCountdownSeconds: 600,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_ALL_VENDORS",
    image: "/products/all-vendors.png",
    artwork: { from: "#242424", to: "#0A0A0A", monogram: "ALL" },
    sellerCount: 0,
  },
  {
    slug: "coaching",
    name: "Reselling Coaching",
    category: "Coaching",
    tagline: "Build a reselling operation across your whole state.",
    overview:
      "A complete coaching guide on how to start and scale a reselling business across your entire state and neighboring areas. Built from real experience, it walks you through going from zero to running sourcing and sales at scale — not just in your town, but across your whole region.",
    inside: [
      "How to start reselling and expand across your whole state and into neighboring areas",
      "How to set up the accounts you need to operate — selling platforms, payment accounts, and business accounts",
      "How to find and vet vendors",
      "Sourcing and pricing strategy for scaling regionally",
      "The common beginner mistakes that cost people money",
    ],
    priceDisplay: "$40",
    priceAmount: 40,
    compareAtDisplay: "$250",
    saleCountdownSeconds: 600,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_COACHING",
    image: "/products/coaching.png",
    artwork: { from: "#1C1C1C", to: "#0A0A0A", monogram: "RC" },
    sellerCount: 0,
  },
  {
    slug: "sm7b",
    name: "Shure SM7B Vendor",
    category: "Studio Gear",
    priceDisplay: "$20",
    priceAmount: 20,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_SM7B",
    image: "/products/sm7b.png",
    artwork: { from: "#1C1C1C", to: "#0A0A0A", monogram: "SM7B" },
    sellerCount: 12,
  },
  {
    slug: "meta-vendor",
    name: "Meta Vendor",
    category: "Tech / Wearables",
    tagline: "Real heat, no fakes.",
    priceDisplay: "$25",
    priceAmount: 25,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_META",
    image: "/products/meta.png",
    artwork: { from: "#242424", to: "#0A0A0A", monogram: "MV" },
    sellerCount: 10,
  },
  {
    slug: "chrome-hearts",
    name: "Chrome Hearts Vendor",
    category: "Luxury / Streetwear",
    priceDisplay: "$15",
    priceAmount: 15,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_CHROME_HEARTS",
    image: "/products/chrome-hearts.png",
    artwork: { from: "#242424", to: "#0A0A0A", monogram: "CH" },
    sellerCount: 18,
  },
  {
    slug: "sur-ron",
    name: "Sur-Ron Vendor",
    category: "Electric / E-Bikes",
    priceDisplay: "$20",
    priceAmount: 20,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_SURRON",
    image: "/products/sur-ron.png",
    artwork: { from: "#1C1C1C", to: "#0A0A0A", monogram: "SR" },
    sellerCount: 9,
  },
  {
    slug: "cologne-vendor",
    name: "Cologne Vendor",
    category: "Fragrance",
    priceDisplay: "$15",
    priceAmount: 15,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_COLOGNE",
    image: "/products/cologne.png",
    artwork: { from: "#1C1C1C", to: "#0A0A0A", monogram: "CV" },
    sellerCount: 14,
  },
  {
    slug: "dyson-vendor",
    name: "Dyson Vendor",
    category: "Home Tech",
    priceDisplay: "$15",
    priceAmount: 15,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_DYSON",
    image: "/products/dyson.png",
    artwork: { from: "#242424", to: "#0A0A0A", monogram: "DY" },
    sellerCount: 10,
  },
  {
    slug: "sp5der-vendor",
    name: "Sp5der Vendor",
    category: "Streetwear",
    priceDisplay: "$15",
    priceAmount: 15,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_SP5DER",
    image: "/products/sp5der.png",
    artwork: { from: "#242424", to: "#0A0A0A", monogram: "SP" },
    sellerCount: 11,
  },
  {
    slug: "airpods-max-vendor",
    name: "AirPods Max Vendor",
    category: "Audio",
    priceDisplay: "$15",
    priceAmount: 15,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_AIRPODS_MAX",
    image: "/products/airpods-max.png",
    artwork: { from: "#1C1C1C", to: "#0A0A0A", monogram: "AM" },
    sellerCount: 8,
  },
  {
    slug: "alocs-vendor",
    name: "ALOCS Vendor",
    category: "Streetwear",
    tagline: "The plug for the pieces everyone's after.",
    priceDisplay: "$15",
    priceAmount: 15,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_ALOCS",
    image: "/products/alocs.png",
    artwork: { from: "#242424", to: "#0A0A0A", monogram: "AL" },
    sellerCount: 12,
  },
  {
    slug: "hellstar-vendor",
    name: "Hellstar Vendor",
    category: "Streetwear",
    tagline: "Real heat, no fakes.",
    priceDisplay: "$15",
    priceAmount: 15,
    currency: "USD",
    stripePriceEnv: "STRIPE_PRICE_HELLSTAR",
    image: "/products/hellstar.png",
    artwork: { from: "#1C1C1C", to: "#0A0A0A", monogram: "HS" },
    sellerCount: 12,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function isProductSlug(slug: string): slug is ProductSlug {
  return products.some((p) => p.slug === slug);
}
