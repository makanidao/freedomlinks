"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { ProductArt } from "@/components/ProductArt";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col rounded-3xl border border-ink-600 bg-ink-800 p-4 transition-colors duration-300 hover:border-lime/40 hover:shadow-panel"
    >
      <Link
        href={`/products/${product.slug}`}
        className="absolute inset-0 z-20 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/70"
        aria-label={`View the ${product.name}`}
      />

      <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        <ProductArt product={product} />
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-bone">
            {product.name}
          </h3>
          {product.tagline && (
            <p className="mt-2 text-sm leading-relaxed text-ash">
              {product.tagline}
            </p>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-ink-600 pt-5">
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-ash">
              Instant access
            </span>
            <span className="font-display text-2xl font-bold text-lime">
              {product.priceDisplay}
            </span>
          </div>
          <span className="relative z-30 inline-flex h-11 items-center gap-2 rounded-full bg-lime px-5 text-sm font-display font-semibold text-ink shadow-glow transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-glow-strong">
            Get Instant Access
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
