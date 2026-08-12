import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  tag,
  title,
  children,
  className,
}: {
  tag: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "corner-ticks relative border border-border bg-bg-elevated p-8 md:p-12",
        className,
      )}
    >
      <div className="flex items-start gap-4 md:gap-6">
        <div className="hidden flex-col items-center pt-1 md:flex">
          <div className="label-mono mt-8 origin-center rotate-90 whitespace-nowrap text-accent">
            {tag}
          </div>
        </div>
        <div className="flex-1 md:border-l md:border-border md:pl-8">
          <div className="mb-4 flex items-center gap-2.5 md:hidden">
            <span className="size-2 shrink-0 rounded-full bg-accent animate-pulse-dot" />
            <span className="label-mono text-accent">{tag}</span>
          </div>
          <div className="mb-5 hidden items-center gap-2.5 md:flex">
            <span className="size-2 shrink-0 rounded-full bg-accent animate-pulse-dot" />
            <span className="label-mono text-fg-faint">
              Pending data · this section is under construction
            </span>
          </div>
          <h3 className="mb-3 text-2xl font-semibold tracking-tight text-fg md:text-4xl">
            {title}
          </h3>
          <div className="max-w-2xl space-y-4 leading-relaxed text-fg-muted">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
