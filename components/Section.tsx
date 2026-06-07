import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds a subtle raised panel background. */
  panel?: boolean;
  /** Vertical padding scale. */
  spacing?: "default" | "tight" | "loose";
}

const spacingMap = {
  tight: "py-14 sm:py-16",
  default: "py-20 sm:py-28",
  loose: "py-24 sm:py-36",
} as const;

export function Section({
  id,
  children,
  className,
  panel = false,
  spacing = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        "relative scroll-mt-24",
        spacingMap[spacing],
        panel ? "bg-ink-800" : "",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container-px">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={[
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime">
          <span className="h-px w-6 bg-lime" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-tighter text-bone sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-ash sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
