"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-lime text-ink shadow-glow hover:-translate-y-0.5 hover:shadow-glow-strong active:translate-y-0",
  secondary:
    "border border-ink-600 bg-ink-700/60 text-bone hover:-translate-y-0.5 hover:border-lime/60 hover:text-white",
  ghost: "text-bone hover:text-lime",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = AnchorProps | NativeButtonProps;

function cx(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = "primary", size = "md", className, children } = props;
    const classes = cx(base, variants[variant], sizes[size], className);

    if ("href" in props && props.href !== undefined) {
      const { external } = props;
      if (external) {
        return (
          <a
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={props.href} className={classes}>
          {children}
        </Link>
      );
    }

    // Forward only native button attributes; strip our custom props.
    const omit = new Set(["variant", "size", "className", "children", "href"]);
    const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {};
    for (const [key, value] of Object.entries(props)) {
      if (!omit.has(key)) {
        (buttonProps as Record<string, unknown>)[key] = value;
      }
    }
    return (
      <button ref={ref} className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }
);
