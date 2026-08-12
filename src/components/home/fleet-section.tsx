import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { GhostNumber } from "@/components/ghost-number";
import { Button } from "@/components/ui/button";
import { FleetTable } from "@/components/fleet-table";
import { groupRobotsBySeason } from "@/lib/robots";
import type { robots as robotsTable } from "@/lib/db/schema";

type Robot = typeof robotsTable.$inferSelect;

export function FleetSection({ robots }: { robots: Robot[] }) {
  if (robots.length === 0) return null;
  const flat = groupRobotsBySeason(robots).flatMap((g) => g.robots);

  return (
    <section className="relative isolate mx-auto max-w-7xl overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <GhostNumber n="02" className="-bottom-10 right-0" />
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

      <Reveal delay={0.1} className="mt-10">
        <FleetTable robots={flat.slice(0, 6)} label="Fleet roster" />
      </Reveal>
    </section>
  );
}
