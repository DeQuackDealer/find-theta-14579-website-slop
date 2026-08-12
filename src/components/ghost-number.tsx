import { cn } from "@/lib/utils";

/**
 * Big outlined section numeral, sat behind the section's real content as a
 * watermark. Needs the section to be `relative isolate` so the `-z-10`
 * stays contained instead of dropping behind earlier sections.
 */
export function GhostNumber({ n, className }: { n: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 select-none font-mono text-[7rem] leading-none text-transparent sm:text-[10rem] lg:text-[13rem]",
        "[-webkit-text-stroke:1px_var(--border-strong)]",
        className,
      )}
    >
      {n}
    </span>
  );
}
