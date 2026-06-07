import { Section, SectionHeading } from "@/components/Section";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import type { ReactNode } from "react";

interface Step {
  n: string;
  title: string;
  body: string;
  icon: ReactNode;
}

const steps: Step[] = [
  {
    n: "01",
    title: "Choose your vendor",
    body: "Pick the drop you need. Each vendor list is a complete, curated sourcing package built from real, current research — not a list of random links.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M4 6h16M4 12h16M4 18h10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Checkout securely with Stripe",
    body: "Pay in seconds through encrypted, PCI-compliant Stripe Checkout. No account to create, no card details ever touch our servers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M6.5 14.5h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Get instant access",
    body: "The moment your payment clears, your sourcing links and insider info unlock instantly on a secure delivery page — no waiting, no email chase.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M5 13l4 4L19 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" panel>
      <SectionHeading
        eyebrow="How it works"
        title="From drop to delivery in under a minute"
        description="No accounts, no friction, no waiting around. Three steps between you and the links you've been looking for."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <AnimatedReveal key={step.n} delay={i * 0.1}>
            <div className="group relative flex h-full flex-col rounded-3xl border border-ink-600 bg-ink p-8 transition-colors duration-300 hover:border-lime/40">
              <span className="font-display text-sm font-bold tracking-[0.2em] text-lime">
                {step.n}
              </span>
              <div className="mt-6 grid h-12 w-12 place-items-center rounded-2xl border border-ink-600 bg-ink-700 text-lime transition-colors duration-300 group-hover:border-lime/40">
                {step.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-bone">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">
                {step.body}
              </p>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </Section>
  );
}
