import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the FreedomLinks team.",
};

export default function ContactPage() {
  return (
    <section className="relative min-h-screen pt-28 sm:pt-36">
      <div className="container-px pb-24">
        <div className="mx-auto max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            Support
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter text-bone sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ash">
            Question about a drop? Link not working? Need a hand after a purchase?
            We answer fast and we stand behind every drop.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-ink-600 bg-ink-800 p-7">
              <h2 className="text-base font-bold tracking-tight text-bone">
                Email us
              </h2>
              <p className="mt-2 text-sm text-ash">
                The fastest way to reach a human.
              </p>
              <a
                href="mailto:support@freedomlinks.example"
                className="link-underline mt-4 inline-block font-display font-semibold text-lime"
              >
                support@freedomlinks.example
              </a>
            </div>
            <div className="rounded-3xl border border-ink-600 bg-ink-800 p-7">
              <h2 className="text-base font-bold tracking-tight text-bone">
                Order help
              </h2>
              <p className="mt-2 text-sm text-ash">
                Paid but didn&apos;t get access? Include your checkout email and
                we&apos;ll unlock it right away.
              </p>
              <a
                href="mailto:orders@freedomlinks.example"
                className="link-underline mt-4 inline-block font-display font-semibold text-lime"
              >
                orders@freedomlinks.example
              </a>
            </div>
          </div>

          <div className="mt-10">
            <Button href="/#products">Back to the drops</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
