import type { Metadata } from "next";
import Link from "next/link";
import type Stripe from "stripe";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getProduct, isProductSlug } from "@/lib/products";
import { getDeliveredContent } from "@/lib/content.server";
import { Button } from "@/components/Button";
import { DeliveryReveal } from "@/components/DeliveryReveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Access Unlocked",
  description: "Your FreedomLinks vendor list is ready.",
  robots: { index: false, follow: false },
};

interface SuccessPageProps {
  searchParams: { session_id?: string };
}

type VerifiedResult =
  | { ok: true; session: Stripe.Checkout.Session; slug: string }
  | { ok: false; reason: string };

async function verifySession(sessionId: string): Promise<VerifiedResult> {
  if (!isStripeConfigured()) {
    return { ok: false, reason: "Payments aren't configured on this site yet." };
  }
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Only a fully paid session unlocks content.
    if (session.payment_status !== "paid" || session.status !== "complete") {
      return {
        ok: false,
        reason: "We couldn't confirm a completed payment for this session.",
      };
    }

    const slug = session.metadata?.slug ?? session.client_reference_id ?? "";
    if (!isProductSlug(slug)) {
      return {
        ok: false,
        reason: "Payment verified, but we couldn't match it to a product.",
      };
    }

    return { ok: true, session, slug };
  } catch {
    return {
      ok: false,
      reason: "We couldn't verify this payment. The link may be invalid or expired.",
    };
  }
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return <ErrorState reason="No checkout session was provided." />;
  }

  const result = await verifySession(sessionId);

  if (!result.ok) {
    return <ErrorState reason={result.reason} />;
  }

  // Payment verified — only now do we read the protected content.
  const product = getProduct(result.slug)!;
  const guide = getDeliveredContent(product.slug);

  return (
    <section className="grain relative min-h-screen overflow-hidden pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-radial-spot" />
      <div className="container-px relative z-10 pb-24">
        <DeliveryReveal product={product} guide={guide} />
      </div>
    </section>
  );
}

function ErrorState({ reason }: { reason: string }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-5 pt-20">
      <div className="w-full max-w-lg rounded-3xl border border-ink-600 bg-ink-800 p-8 text-center sm:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 8v5M12 16.5h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-bone">
          We couldn&apos;t unlock your access
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ash">{reason}</p>
        <p className="mt-2 text-sm leading-relaxed text-ash">
          If you were charged and this looks wrong, reach out and we&apos;ll sort
          it out right away — nothing is revealed until a payment is verified.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/#products">Back to the drops</Button>
          <Button href="/contact" variant="secondary">
            Contact support
          </Button>
        </div>
      </div>
    </section>
  );
}
