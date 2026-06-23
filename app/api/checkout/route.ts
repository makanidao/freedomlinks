import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct, isProductSlug } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let slug: unknown;
  try {
    const body = await request.json();
    slug = body?.slug;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (typeof slug !== "string" || !isProductSlug(slug)) {
    return NextResponse.json(
      { error: "Unknown product." },
      { status: 400 }
    );
  }

  const product = getProduct(slug)!;
  const priceId = process.env[product.stripePriceEnv];

  if (!priceId) {
    return NextResponse.json(
      {
        error: `This product isn't available for purchase yet. Missing ${product.stripePriceEnv}.`,
      },
      { status: 503 }
    );
  }

  try {
    const stripe = getStripe();

    // Debug (opt-in): set DEBUG_CHECKOUT=true to log which price ID and which
    // Stripe keys (mode/account) are in play. Logs only the first 12 chars of
    // each key — never the full key. Off by default, so nothing runs in
    // production unless you explicitly enable it. The publishable prefix here is
    // the SERVER runtime value; compare it to the client-side prefix logged in
    // BuyButton (inlined at build time) — if they differ, the deploy is using a
    // stale/mismatched NEXT_PUBLIC key.
    if (process.env.DEBUG_CHECKOUT === "true") {
      const secretKeyPrefix = (process.env.STRIPE_SECRET_KEY ?? "").slice(0, 12);
      const pubKeyPrefix = (
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
      ).slice(0, 12);
      console.log(
        `[checkout] slug="${product.slug}" env=${product.stripePriceEnv} ` +
          `priceId="${priceId}" secretKeyPrefix="${secretKeyPrefix}…" ` +
          `pubKeyPrefix(server)="${pubKeyPrefix}…"`
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Embedded checkout that stays on our site — there is NO post-payment
      // redirect. The buyer completes payment in Stripe's embedded form and sees
      // Stripe's own inline confirmation (redirect_on_completion: "never"), so we
      // never send them to /success and nothing is auto-delivered by the site.
      ui_mode: "embedded",
      redirect_on_completion: "never",
      line_items: [{ price: priceId, quantity: 1 }],
      // The slug still travels with the session so the webhook can record which
      // product was purchased.
      metadata: { slug: product.slug },
      client_reference_id: product.slug,
      allow_promotion_codes: true,
    });

    if (!session.client_secret) {
      throw new Error("Stripe did not return a client secret.");
    }

    return NextResponse.json({
      clientSecret: session.client_secret,
      id: session.id,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected checkout error.";
    console.error("[checkout] failed:", message);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}
