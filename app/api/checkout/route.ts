import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { getProduct, isProductSlug } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function resolveBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  const h = headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  if (host) return `${proto}://${host}`;

  return "http://localhost:3000";
}

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
    const baseUrl = resolveBaseUrl();

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
      line_items: [{ price: priceId, quantity: 1 }],
      // The slug travels with the session so we can identify exactly which
      // product to unlock on the success page and in the webhook.
      metadata: { slug: product.slug },
      client_reference_id: product.slug,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      allow_promotion_codes: true,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    return NextResponse.json({ url: session.url, id: session.id });
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
