import "server-only";
import Stripe from "stripe";

// Lazily instantiate the Stripe client so that `next build` and any page that
// doesn't touch Stripe never require the secret key to be present. The client
// is created on first use inside server-only code (API routes, success page).
let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeSingleton) return stripeSingleton;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment (see .env.example)."
    );
  }

  stripeSingleton = new Stripe(secretKey, {
    // Pin the typed API version the SDK ships with for predictable behavior.
    apiVersion: "2025-02-24.acacia",
    appInfo: { name: "FreedomLinks", version: "1.0.0" },
    typescript: true,
  });

  return stripeSingleton;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
