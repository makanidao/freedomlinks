"use client";

import { useEffect, useState } from "react";

/**
 * A live sale-urgency countdown. Starts at `seconds` and ticks down once per
 * second toward 00:00. The initial render matches the server (no hydration
 * mismatch); the interval only runs client-side. Stops at zero.
 */
export function CountdownTimer({
  seconds = 600,
  className,
}: {
  seconds?: number;
  className?: string;
}) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
    const id = setInterval(() => {
      setRemaining((r) => (r <= 1 ? 0 : r - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const mm = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const ss = (remaining % 60).toString().padStart(2, "0");

  return (
    <span className={className} suppressHydrationWarning aria-live="off">
      {mm}:{ss}
    </span>
  );
}
