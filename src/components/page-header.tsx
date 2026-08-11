import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[800px] -translate-x-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-8 sm:pb-16 sm:pt-28">
        <Reveal>
          <p className="label-mono mb-5 flex items-center gap-3 text-fg-faint">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
              {subtitle}
            </p>
          ) : null}
          {meta && meta.length > 0 ? (
            <div
              className={cn(
                "mt-10 grid gap-px overflow-hidden border border-border bg-border",
                meta.length === 1
                  ? "max-w-xs grid-cols-1"
                  : meta.length >= 4
                    ? "grid-cols-2 sm:grid-cols-4"
                    : "grid-cols-2",
              )}
            >
              {meta.map((m) => (
                <div key={m.label} className="bg-bg p-4 sm:p-5">
                  <div className="label-mono mb-1.5 text-fg-faint">{m.label}</div>
                  <div className="text-base text-fg sm:text-lg">{m.value}</div>
                </div>
              ))}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
