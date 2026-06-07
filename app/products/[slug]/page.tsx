import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, isProductSlug, products } from "@/lib/products";
import { ProductArt } from "@/components/ProductArt";
import { BuyButton } from "@/components/BuyButton";
import { TrustStrip } from "@/components/TrustStrip";
import { AnimatedReveal } from "@/components/AnimatedReveal";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProduct(params.slug);
  if (!product) {
    return { title: "Product not found" };
  }
  const title = `Best ${product.name}`;
  const description = `Best ${product.name}`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} · FreedomLinks`,
      description,
      type: "website",
      url: `/products/${product.slug}`,
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  if (!isProductSlug(params.slug)) {
    notFound();
  }
  const product = getProduct(params.slug)!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Best ${product.name}`,
    description: `Best ${product.name}`,
    category: product.category,
    brand: { "@type": "Brand", name: "FreedomLinks" },
    offers: {
      "@type": "Offer",
      price: product.priceAmount,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="grain relative overflow-hidden pt-28 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-radial-spot" />
        <div className="container-px relative z-10 pb-16 sm:pb-24">
          <nav className="mb-10 flex items-center gap-2 text-sm text-ash">
            <Link href="/" className="transition-colors hover:text-bone">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/#products" className="transition-colors hover:text-bone">
              The Drops
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-bone">{product.name}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="text-balance text-4xl font-bold leading-[1.02] tracking-tightest text-bone sm:text-5xl md:text-6xl">
                Best {product.name}
              </h1>

              <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div>
                  <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-ash">
                    One-time · Instant access
                  </span>
                  <span className="font-display text-4xl font-bold text-bone">
                    {product.priceDisplay}
                  </span>
                </div>
                <BuyButton
                  slug={product.slug}
                  priceDisplay={product.priceDisplay}
                  label="Get Instant Access"
                />
              </div>
            </div>

            <div className="lg:pl-6">
              <ProductArt product={product} aspect="aspect-square" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust / guarantee */}
      <section className="py-20 sm:py-24">
        <div className="container-px">
          <AnimatedReveal>
            <TrustStrip />
          </AnimatedReveal>

          <AnimatedReveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-3xl border border-ink-600 bg-gradient-to-br from-ink-800 to-ink p-8 text-center sm:p-14">
              <p className="mx-auto max-w-2xl text-balance text-2xl font-bold tracking-tight text-bone sm:text-3xl">
                Stop hunting. Stop overpaying. Stop getting burned.{" "}
                <span className="text-lime">
                  Get the{" "}
                  {product.name.replace(/\s*Vendor\b/gi, "").trim()}{" "}
                  links you came for.
                </span>
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <BuyButton
                  slug={product.slug}
                  priceDisplay={product.priceDisplay}
                  label="Get Instant Access"
                />
                <Link
                  href="/#products"
                  className="link-underline text-sm font-medium text-ash transition-colors hover:text-bone"
                >
                  Browse the other drops
                </Link>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
