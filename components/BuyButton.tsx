"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { getStripeClient } from "@/lib/stripe-client";
import type { ProductSlug } from "@/lib/products";

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

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      const data: { url?: string; id?: string; error?: string } =
        await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout. Please try again.");
      }

      // Prefer Stripe.js redirect when configured; fall back to the session URL.
      if (data.id) {
        const stripe = await getStripeClient();
        if (stripe) {
          const { error: redirectError } = await stripe.redirectToCheckout({
            sessionId: data.id,
          });
          if (!redirectError) return;
        }
      }

      window.location.assign(data.url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

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
            Redirecting…
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
