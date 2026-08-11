import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium transition-all active:scale-[0.98]";

const variants = {
  primary: "bg-fg text-bg hover:opacity-85",
  secondary: "border border-border-strong text-fg hover:border-fg hover:bg-bg-elevated",
  ghost: "text-fg-muted hover:text-fg",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
}: {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = cn(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
