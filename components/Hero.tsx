"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { products } from "@/lib/products";

const ease = [0.22, 1, 0.36, 1] as const;

const totalSellers = products.reduce((sum, p) => sum + p.sellerCount, 0);

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Hero() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Layered background glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-spot" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-lime/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink-600 to-transparent" />

      <div className="container-px relative z-10 w-full pt-28 pb-24 sm:pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ash backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Insider vendor lists · Live drops
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-7 text-balance text-5xl font-bold leading-[0.98] tracking-tightest text-bone sm:text-7xl lg:text-[5.5rem]"
          >
            The links you&apos;ve{" "}
            <span className="relative whitespace-nowrap text-lime glow-text">
              been looking
            </span>{" "}
            for.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-ash sm:text-xl"
          >
            FreedomLinks is your insider plug. We sell premium vendor lists —
            curated link packages that show you exactly where to find the
            products everyone wants, at the best prices, from sellers you can
            actually trust.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#products" size="lg">
              Browse the Drops
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1v12M2 8l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Button href="#how-it-works" size="lg" variant="secondary">
              How it works
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ash"
          >
            <Stat value={`${totalSellers}+`} label="Vetted sellers" />
            <span className="hidden h-4 w-px bg-ink-600 sm:block" />
            <Stat value="Instant" label="Digital delivery" />
            <span className="hidden h-4 w-px bg-ink-600 sm:block" />
            <Stat value="Secure" label="Stripe checkout" />
          </motion.div>
        </motion.div>
      </div>

      {/* Animated scroll cue */}
      <a
        href="#products"
        aria-label="Scroll to the drops"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ash transition-colors hover:text-lime sm:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
          Scroll
        </span>
        <span className="grid h-9 w-6 justify-center rounded-full border border-ink-600 pt-1.5">
          <span className="h-2 w-1 animate-scroll-cue rounded-full bg-lime" />
        </span>
      </a>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="font-display text-lg font-bold text-lime">{value}</span>
      <span>{label}</span>
    </span>
  );
}
