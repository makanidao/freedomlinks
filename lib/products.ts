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
  | "airpods-max-vendor";

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
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function isProductSlug(slug: string): slug is ProductSlug {
  return products.some((p) => p.slug === slug);
}
