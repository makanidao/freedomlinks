import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { products } from "@/lib/products";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-600 bg-ink-800">
      <div className="container-px py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-ash">
              The links you&apos;ve been looking for. Premium vendor lists that
              tell you exactly where to find the products everyone wants — at the
              best prices, from sellers you can trust.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ash">
              The Drops
            </h4>
            <ul className="mt-4 space-y-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="link-underline text-sm text-bone transition-colors hover:text-lime"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ash">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/#faq"
                  className="link-underline text-sm text-bone transition-colors hover:text-lime"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="link-underline text-sm text-bone transition-colors hover:text-lime"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="link-underline text-sm text-bone transition-colors hover:text-lime"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-14" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-ash">
            © {year} FreedomLinks. All rights reserved.
          </p>
          <p className="text-sm text-ash">
            <span className="text-lime">The links</span> you&apos;ve been looking
            for.
          </p>
        </div>
      </div>
    </footer>
  );
}
