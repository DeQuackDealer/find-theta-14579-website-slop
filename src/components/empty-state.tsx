import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  tag,
  children,
  className,
}: {
  tag: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "corner-ticks relative border border-border bg-bg-elevated p-10 sm:p-12",
        className,
      )}
    >
      <div className="mb-5 flex items-center gap-2.5">
        <span className="size-1.5 shrink-0 rounded-full bg-accent animate-pulse-dot" />
        <span className="label-mono text-fg-faint">{tag}</span>
      </div>
      <div className="max-w-md space-y-5 text-base leading-relaxed text-fg-muted">
        {children}
      </div>
    </div>
  );
}
