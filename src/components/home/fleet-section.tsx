import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { groupRobotsBySeason } from "@/lib/robots";
import type { robots as robotsTable } from "@/lib/db/schema";

type Robot = typeof robotsTable.$inferSelect;

export function FleetSection({ robots }: { robots: Robot[] }) {
  if (robots.length === 0) return null;
  const groups = groupRobotsBySeason(robots);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionLabel index="02">Meet the flock</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
            Every machine, built for its own season, preserved in its own CAD.
          </h2>
          <Button href="/robots" variant="secondary" className="shrink-0">
            View full flock
            <ArrowUpRight size={15} />
          </Button>
        </div>
      </Reveal>

      <div className="mt-12 space-y-12">
        {groups.map((group) => (
          <div key={group.seasonNumber}>
            <p className="label-mono mb-3 text-fg-faint">
              Season {group.seasonNumber.padStart(2, "0")} · {group.seasonLabel} ·{" "}
              {group.seasonYear}
            </p>
            <div className="divide-y divide-border border-t border-border">
              {group.robots.map((r) => (
                <Link
                  key={r.id}
                  href={`/robots/${r.slug}`}
                  className="group flex items-center gap-5 py-5 transition-colors hover:bg-bg-elevated sm:gap-8"
                >
                  <span className="font-mono text-lg text-fg-faint sm:text-xl">
                    {r.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-xl text-fg sm:text-2xl">{r.name}</span>
                      <span className="truncate text-sm text-fg-muted">
                        {r.tagline}
                      </span>
                    </div>
                  </div>
                  <span className="label-mono hidden shrink-0 text-fg-faint sm:block">
                    {r.competition}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-fg-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
