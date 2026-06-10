import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, isProductSlug, products } from "@/lib/products";
import { ProductArt } from "@/components/ProductArt";
import { BuyButton } from "@/components/BuyButton";
import { TrustStrip } from "@/components/TrustStrip";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { CountdownTimer } from "@/components/CountdownTimer";

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
  const title = product.name;
  const description = product.tagline ?? product.name;
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
    name: product.name,
    description: product.tagline ?? product.name,
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
                {product.name}
              </h1>

              {product.tagline && (
                <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-ash">
                  {product.tagline}
                </p>
              )}

              {product.compareAtDisplay && (
                <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-lime/30 bg-lime/10 px-4 py-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="text-lime"
                  >
                    <path
                      d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-bone">
                    Limited-time sale ends in
                  </span>
                  <CountdownTimer
                    seconds={product.saleCountdownSeconds ?? 600}
                    className="font-display text-xl font-bold tabular-nums text-lime"
                  />
                </div>
              )}

              <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div>
                  <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-ash">
                    One-time · Instant access
                  </span>
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-4xl font-bold text-bone">
                      {product.priceDisplay}
                    </span>
                    {product.compareAtDisplay && (
                      <span className="font-display text-2xl font-medium text-ash line-through">
                        {product.compareAtDisplay}
                      </span>
                    )}
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

      {/* What's inside — only for products that define overview/inside */}
      {(product.overview || product.inside) && (
        <section className="border-t border-ink-600 bg-ink-800 py-20 sm:py-28">
          <div className="container-px">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <AnimatedReveal>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime">
                  <span className="h-px w-6 bg-lime" />
                  What&apos;s inside
                </span>
                <h2 className="mt-5 text-3xl font-bold tracking-tighter text-bone sm:text-4xl">
                  Everything you get the second you unlock it
                </h2>
                {product.overview && (
                  <p className="mt-5 text-base leading-relaxed text-ash">
                    {product.overview}
                  </p>
                )}
              </AnimatedReveal>

              {product.inside && (
                <ul className="space-y-3">
                  {product.inside.map((line, i) => (
                    <AnimatedReveal key={line} delay={i * 0.05}>
                      <li className="group flex gap-4 rounded-2xl border border-ink-600 bg-ink p-5 transition-colors duration-300 hover:border-lime/40">
                        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lime text-ink">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="text-[15px] leading-relaxed text-bone">
                          {line}
                        </span>
                      </li>
                    </AnimatedReveal>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

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
