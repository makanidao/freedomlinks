import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Checkout canceled",
  description: "Your checkout was canceled. No charge was made.",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-5 pt-20">
      <div className="w-full max-w-lg rounded-3xl border border-ink-600 bg-ink-800 p-8 text-center sm:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-ink-600 bg-ink text-ash">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-bone sm:text-3xl">
          No worries — nothing was charged
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ash">
          You backed out before finishing checkout, so your card was never
          charged. The drop you were eyeing is still waiting whenever you&apos;re
          ready.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/#products">Back to the store</Button>
          <Button href="/#faq" variant="secondary">
            Read the FAQ
          </Button>
        </div>
      </div>
    </section>
  );
}
