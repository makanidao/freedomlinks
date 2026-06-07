import { Section, SectionHeading } from "@/components/Section";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import type { ReactNode } from "react";

interface Value {
  title: string;
  body: string;
  icon: ReactNode;
}

const values: Value[] = [
  {
    title: "Verified Sellers Only",
    body: "Every seller, dealer, and source is vetted before it makes the list. No scams, no dead links, no getting burned.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Instant Delivery",
    body: "Your links unlock the second payment clears. Digital, immediate, and available whenever you need them.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Insider Pricing",
    body: "We track where the real deals hide so you stop overpaying. Pay for the intel once, save every time you buy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M4 13l8 8 8-8M12 3v18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: "Secure Checkout",
    body: "Payments run on Stripe with full encryption. Your card details never touch our servers — ever.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect
          x="5"
          y="10"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8 10V7a4 4 0 1 1 8 0v3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function WhyFreedomLinks() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why FreedomLinks"
        title="Built to get you the real deal, every time"
        description="We do the digging, the vetting, and the price-tracking so you don't have to. This is what every drop comes with."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v, i) => (
          <AnimatedReveal key={v.title} delay={i * 0.08}>
            <div className="group flex h-full flex-col rounded-3xl border border-ink-600 bg-ink-800 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-lime/40">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-lime text-ink shadow-glow">
                {v.icon}
              </div>
              <h3 className="mt-5 text-base font-bold tracking-tight text-bone">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ash">{v.body}</p>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </Section>
  );
}
