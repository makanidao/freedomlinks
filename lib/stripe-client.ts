import { loadStripe, type Stripe } from "@stripe/stripe-js";

// Configure Stripe.js once on the client and reuse the same promise. The
// publishable key is safe to expose to the browser (that's its purpose).
let stripePromise: Promise<Stripe | null> | null = null;

export function getStripeClient(): Promise<Stripe | null> {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    stripePromise = publishableKey
      ? loadStripe(publishableKey)
      : Promise.resolve(null);
  }
  return stripePromise;
}
