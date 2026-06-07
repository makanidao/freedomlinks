import type { ReactNode } from "react";

interface TrustItem {
  label: string;
  icon: ReactNode;
}

const items: TrustItem[] = [
  {
    label: "Verified sellers only",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Instant digital delivery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Secure Stripe checkout",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect
          x="5"
          y="10"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8 10V7a4 4 0 1 1 8 0v3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function TrustStrip() {
  return (
    <div className="rounded-3xl border border-ink-600 bg-ink-800 p-2">
      <div className="grid gap-2 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-2xl bg-ink px-5 py-5"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime text-ink">
              {item.icon}
            </span>
            <span className="text-sm font-medium text-bone">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
