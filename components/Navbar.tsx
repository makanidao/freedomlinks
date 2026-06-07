"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { Button } from "@/components/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink-600 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav className="container-px flex h-16 items-center justify-between sm:h-[72px]">
        <Wordmark />

        <div className="flex items-center gap-6">
          <Link
            href="/#products"
            className="link-underline hidden text-sm font-medium text-ash transition-colors hover:text-bone sm:inline-block"
          >
            The Drops
          </Link>
          <Link
            href="/#how-it-works"
            className="link-underline hidden text-sm font-medium text-ash transition-colors hover:text-bone sm:inline-block"
          >
            How It Works
          </Link>
          <Link
            href="/#faq"
            className="link-underline hidden text-sm font-medium text-ash transition-colors hover:text-bone md:inline-block"
          >
            FAQ
          </Link>
          <Button href="/#products" size="md" className="hidden sm:inline-flex">
            Browse the Drops
          </Button>
          <Button href="/#products" size="md" className="sm:hidden">
            Drops
          </Button>
        </div>
      </nav>
    </header>
  );
}
