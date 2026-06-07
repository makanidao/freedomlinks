"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/lib/products";
import type { DeliveredGuide } from "@/lib/content.server";
import { Button } from "@/components/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function DeliveryReveal({
  product,
  guide,
}: {
  product: Product;
  guide: DeliveredGuide;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lime">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Payment verified
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tightest text-bone sm:text-5xl">
          Access <span className="text-lime glow-text">Unlocked</span>
        </h1>
        <p className="mt-4 text-lg text-ash">
          Your <span className="text-bone">{product.name}</span> is ready. Bookmark
          this page — your links are below.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="mt-10 rounded-2xl border border-ink-600 bg-ink-800 p-6 text-[15px] leading-relaxed text-bone"
      >
        {guide.intro}
      </motion.p>

      <div className="mt-8 space-y-8">
        {guide.sections.map((section, sIdx) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 + sIdx * 0.08, ease }}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-sm font-bold text-lime">
                {String(sIdx + 1).padStart(2, "0")}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-bone">
                {section.title}
              </h2>
            </div>
            <p className="mt-2 text-sm text-ash">{section.blurb}</p>

            <ul className="mt-4 space-y-3">
              {section.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 rounded-2xl border border-ink-600 bg-ink p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/40"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-display text-base font-semibold text-bone group-hover:text-lime">
                        {link.label}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-lime">
                        Open
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M7 17 17 7M17 7H9M17 7v8"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                    <span className="break-all text-xs text-ash">{link.url}</span>
                    <span className="mt-1 text-sm leading-relaxed text-bone/80">
                      {link.note}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.4, ease }}
        className="mt-10 rounded-3xl border border-ink-600 bg-ink-800 p-7"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-bone">
          <span className="text-lime">★</span> Pro tips
        </h2>
        <ul className="mt-4 space-y-3">
          {guide.proTips.map((tip) => (
            <li key={tip} className="flex gap-3 text-sm leading-relaxed text-bone/90">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
        <Button href="/#products" variant="secondary">
          Browse more drops
        </Button>
        <p className="text-sm text-ash">
          Need help? <Link className="text-lime link-underline" href="/contact">Contact us</Link>
        </p>
      </div>
    </div>
  );
}
