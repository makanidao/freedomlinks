# FreedomLinks

**The links you've been looking for.**

A complete, production-ready digital storefront for premium vendor lists, built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Stripe Checkout**. Customers buy a vendor list, pay securely through Stripe, and instantly unlock a curated set of sourcing links and insider info on a server-verified delivery page.

---

## Features

- Premium dark design system (near-black charcoal + electric lime) with Space Grotesk / Inter, grain texture, custom scrollbar, and scroll-triggered animations.
- Fully responsive landing page: hero, product grid, How It Works, Why FreedomLinks, and an accessible FAQ accordion.
- Individual product pages at `/products/[slug]` for all seven vendors.
- **Stripe Checkout** via an API route, a **signature-verified webhook**, and a **server-verified success page** that reveals protected content only after a confirmed payment.
- Protected sourcing links live in a `server-only` module and are never sent to the browser until payment is verified.
- SEO: titles, meta descriptions, Open Graph + Twitter tags, JSON-LD product data.

## Tech stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Payments | Stripe Checkout (`stripe` + `@stripe/stripe-js`) |

---

## Project structure

```
freedomlinks/
├── app/
│   ├── layout.tsx              # Root layout, fonts, SEO, navbar/footer
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Design tokens, grain, scrollbar
│   ├── products/[slug]/page.tsx
│   ├── success/page.tsx        # Server-verifies payment, then reveals content
│   ├── cancel/page.tsx
│   ├── terms/ · contact/       # Footer pages
│   └── api/
│       ├── checkout/route.ts           # Creates a Checkout Session
│       └── webhooks/stripe/route.ts    # Verifies + records completed purchases
├── components/                 # Button, Navbar, Footer, ProductCard, Accordion, …
├── lib/
│   ├── products.ts             # Public product catalog (client-safe)
│   ├── stripe.ts               # Lazy server-side Stripe client (server-only)
│   ├── stripe-client.ts        # Stripe.js loader (client)
│   └── content.server.ts       # PROTECTED delivery links (server-only)
├── .env.example
└── ...
```

---

## Local setup

### 1. Install

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in the values (see [Stripe setup](#stripe-setup) below). Every variable is documented inline in `.env.example`.

### 3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000.

> The site renders fully without Stripe keys — only the checkout button needs them. Buy buttons will return a friendly error until the keys and Price IDs are set.

---

## Stripe setup

### 1. Get your API keys

In the [Stripe Dashboard](https://dashboard.stripe.com/apikeys) (start in **Test mode**), copy:

- **Secret key** → `STRIPE_SECRET_KEY`
- **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 2. Create a product + price for each vendor

In **Products → Add product**, create one product per vendor and give each a one-time price:

| Vendor | Suggested price | Env variable |
|---|---|---|
| Shure SM7B Vendor | $20 | `STRIPE_PRICE_SM7B` |
| Chrome Hearts Vendor | $15 | `STRIPE_PRICE_CHROME_HEARTS` |
| Sur-Ron Vendor | $20 | `STRIPE_PRICE_SURRON` |
| Cologne Vendor | $15 | `STRIPE_PRICE_COLOGNE` |
| Dyson Vendor | $15 | `STRIPE_PRICE_DYSON` |
| Sp5der Vendor | $15 | `STRIPE_PRICE_SP5DER` |
| AirPods Max Vendor | $15 | `STRIPE_PRICE_AIRPODS_MAX` |

Copy each **Price ID** (looks like `price_1Q...`) into the matching env variable.

> The display prices in `lib/products.ts` are for the UI. The amount actually charged is whatever you set on the Stripe Price, so keep them in sync.

### 3. Set up the webhook

**Locally**, use the Stripe CLI:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the printed `whsec_...` into `STRIPE_WEBHOOK_SECRET`.

**In production**, create an endpoint in **Developers → Webhooks** pointing to
`https://your-domain.com/api/webhooks/stripe`, subscribe to
`checkout.session.completed`, and copy its signing secret into `STRIPE_WEBHOOK_SECRET`.

### 4. Test a purchase

Use Stripe's test card `4242 4242 4242 4242`, any future expiry, any CVC/ZIP. After paying you're redirected to `/success?session_id=...`, the payment is verified server-side, and the vendor list is revealed.

---

## How payment-gated delivery works

1. The buy button POSTs the product `slug` to `/api/checkout`.
2. The route looks up the product's Stripe Price ID, creates a Checkout Session (with the slug in metadata), and returns the session URL.
3. Stripe hosts the payment and redirects to `/success?session_id={CHECKOUT_SESSION_ID}`.
4. The success page **retrieves the session server-side** and confirms `payment_status === "paid"` **before** importing the protected content from `lib/content.server.ts`.
5. The `server-only` import guarantees the links can never leak into the client bundle. If verification fails, nothing is revealed.

To customize what each vendor delivers, edit `lib/content.server.ts`.

---

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In [Vercel](https://vercel.com/new), import the repo (framework auto-detects as Next.js).
3. Add every variable from `.env.example` under **Settings → Environment Variables** (use your **live** keys for production).
4. Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://freedomlinks.com`).
5. Deploy. Then add a production Stripe webhook pointing at `https://your-domain.com/api/webhooks/stripe` and update `STRIPE_WEBHOOK_SECRET`.

---

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # lint
```

## Security notes

- Protected sourcing links live only in `lib/content.server.ts` (`server-only`) and are revealed exclusively after a verified Stripe payment.
- The webhook verifies Stripe's signature against the raw request body before trusting any event.
- Secrets are read from environment variables and never committed (`.env*` is gitignored).
- This project pins **Next.js `14.2.x`** (latest patched). The only remaining `npm audit` advisories are in Next's bundled transitive dependencies and are resolved upstream only by a major (Next 16) upgrade; they don't affect this app's request handling.
