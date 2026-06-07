import Link from "next/link";

export function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tighter text-bone",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="FreedomLinks home"
    >
      <span
        aria-hidden="true"
        className="relative grid h-7 w-7 place-items-center rounded-md bg-lime text-ink shadow-glow transition-transform duration-200 group-hover:-translate-y-0.5"
      >
        {/* Chain-link glyph */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12a3 3 0 0 1 3-3h3a3 3 0 1 1 0 6h-1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M15 12a3 3 0 0 1-3 3H9a3 3 0 1 1 0-6h1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>
        Freedom<span className="text-lime">Links</span>
      </span>
    </Link>
  );
}
