import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "FreedomLinks terms of service and purchase terms.",
};

const sections = [
  {
    h: "What you're buying",
    p: "FreedomLinks sells digital vendor lists — curated research that points you to legitimate sellers, dealers, and resources for real products. You are purchasing access to information, not the physical products themselves.",
  },
  {
    h: "Digital delivery & refunds",
    p: "Vendor lists are delivered instantly on a secure page after your payment is verified. Because the content is digital and revealed immediately, all sales are final. If something in a vendor list is broken or inaccurate, contact us and we'll make it right.",
  },
  {
    h: "Acceptable use",
    p: "Vendor lists are licensed for your personal use. Please don't redistribute, resell, or publicly repost the contents. Doing so undermines the work that makes the vendor lists valuable.",
  },
  {
    h: "Third-party sellers",
    p: "We vet the sources we list, but we don't control third-party sellers and aren't responsible for their pricing, stock, or policies. Always do your own due diligence and use buyer-protected payment methods.",
  },
  {
    h: "Payments",
    p: "Payments are processed by Stripe. We never see or store your full card details. Your use of checkout is also subject to Stripe's terms.",
  },
];

export default function TermsPage() {
  return (
    <section className="relative min-h-screen pt-28 sm:pt-36">
      <div className="container-px pb-24">
        <div className="mx-auto max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            Legal
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter text-bone sm:text-5xl">
            Terms
          </h1>
          <p className="mt-4 text-sm text-ash">
            The short, plain-English version. By purchasing, you agree to the
            following.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-xl font-bold tracking-tight text-bone">
                  {s.h}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ash">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
