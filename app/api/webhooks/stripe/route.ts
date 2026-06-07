import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
// The raw body is required for signature verification, so never cache/transform.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set.");
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // Read the raw request body exactly as sent — required to verify the signature.
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Signature verification failed.";
    console.error("[webhook] signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // Record the completed purchase. In production you'd persist this to a
      // database, send a receipt email, or fulfill an order here. The actual
      // link delivery happens on the verified /success page, so this is the
      // durable record of the sale.
      console.log("[webhook] checkout.session.completed", {
        sessionId: session.id,
        slug: session.metadata?.slug ?? session.client_reference_id ?? "unknown",
        amountTotal: session.amount_total,
        currency: session.currency,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_details?.email ?? null,
      });
      break;
    }
    default:
      // Acknowledge other event types without action.
      break;
  }

  return NextResponse.json({ received: true });
}
