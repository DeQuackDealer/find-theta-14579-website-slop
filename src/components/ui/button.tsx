import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "label-mono inline-flex items-center justify-center gap-2.5 whitespace-nowrap px-6 py-3.5 transition-all active:scale-[0.98]";

const variants = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  secondary: "border border-border-strong text-fg hover:border-accent hover:text-accent",
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
