"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { getStripeClient } from "@/lib/stripe-client";
import type { ProductSlug } from "@/lib/products";
import type { StripeEmbeddedCheckout } from "@stripe/stripe-js";

interface BuyButtonProps {
  slug: ProductSlug;
  label?: string;
  priceDisplay?: string;
  size?: "md" | "lg";
  className?: string;
}

export function BuyButton({
  slug,
  label = "Get Instant Access",
  priceDisplay,
  size = "lg",
  className,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const checkoutRef = useRef<StripeEmbeddedCheckout | null>(null);

  const open = clientSecret !== null;

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      const data: { clientSecret?: string; id?: string; error?: string } =
        await res.json();

      if (!res.ok || !data.clientSecret) {
        throw new Error(
          data.error || "Could not start checkout. Please try again."
        );
      }

      // Debug (opt-in): set NEXT_PUBLIC_DEBUG_CHECKOUT=true to log the
      // publishable key the BROWSER bundle actually loaded. NEXT_PUBLIC_* is
      // inlined at build time, so the flag must be NEXT_PUBLIC too — and you
      // must redeploy after changing it. When unset, this block is stripped from
      // the production bundle. Publishable keys are public, so logging the prefix
      // is safe. The client secret itself is never logged.
      if (process.env.NEXT_PUBLIC_DEBUG_CHECKOUT === "true") {
        const pubKeyPrefix = (
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
        ).slice(0, 12);
        console.log(
          `[checkout/client] publishableKeyPrefix="${pubKeyPrefix}…" ` +
            `sessionId="${data.id ?? "(none)"}" mode="embedded"`
        );
      }

      // Open the modal; the effect below mounts Stripe's embedded form into it.
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function closeCheckout() {
    setClientSecret(null);
  }

  // Mount Stripe's embedded checkout once we have a client secret + a container.
  // With redirect_on_completion: "never", payment completes inline and Stripe
  // shows its own confirmation right inside this form — no redirect anywhere.
  useEffect(() => {
    if (!clientSecret) return;
    let cancelled = false;

    (async () => {
      const stripe = await getStripeClient();
      if (!stripe) {
        if (!cancelled) {
          setError("Payments aren't configured yet. Please try again later.");
          setClientSecret(null);
        }
        return;
      }
      if (cancelled || !containerRef.current) return;

      const checkout = await stripe.initEmbeddedCheckout({ clientSecret });
      if (cancelled || !containerRef.current) {
        checkout.destroy();
        return;
      }
      checkoutRef.current = checkout;
      checkout.mount(containerRef.current);
    })().catch((err) => {
      if (!cancelled) {
        setError(
          err instanceof Error ? err.message : "Could not load the checkout form."
        );
        setClientSecret(null);
      }
    });

    return () => {
      cancelled = true;
      if (checkoutRef.current) {
        checkoutRef.current.destroy();
        checkoutRef.current = null;
      }
    };
  }, [clientSecret]);

  // Lock background scroll and allow Escape to close while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCheckout();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className={className}>
      <Button
        type="button"
        size={size}
        onClick={startCheckout}
        disabled={loading}
        aria-busy={loading}
        className="w-full sm:w-auto"
      >
        {loading ? (
          <>
            <Spinner />
            Loading…
          </>
        ) : (
          <>
            {label}
            {priceDisplay && (
              <span className="ml-1 rounded-full bg-ink/15 px-2 py-0.5 text-sm font-bold">
                {priceDisplay}
              </span>
            )}
          </>
        )}
      </Button>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Secure checkout"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCheckout();
          }}
        >
          <div className="relative my-8 w-full max-w-xl rounded-3xl border border-ink-600 bg-white p-2 shadow-2xl">
            <button
              type="button"
              onClick={closeCheckout}
              aria-label="Close checkout"
              className="absolute -right-3 -top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-ink-600 bg-ink-800 text-bone transition-colors hover:text-lime"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {/* Stripe's embedded checkout mounts here. */}
            <div ref={containerRef} className="min-h-[320px]" />
          </div>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
