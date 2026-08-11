import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { getRobots, getSettings } from "@/lib/db/queries";
import { groupRobotsBySeason } from "@/lib/robots";

export const metadata: Metadata = {
  title: "Fleet",
};

export const dynamic = "force-dynamic";

export default async function RobotsPage() {
  const [robots, settings] = await Promise.all([getRobots(), getSettings()]);
  const groups = groupRobotsBySeason(robots);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="label-mono mb-4 text-fg-faint">The fleet</p>
        <h1 className="max-w-2xl text-4xl leading-tight tracking-tight text-fg sm:text-5xl">
          Every {settings.teamName} robot, one season at a time.
        </h1>
      </Reveal>

      {groups.length === 0 ? (
        <div className="mt-16 rounded-lg border border-dashed border-border p-12 text-center text-fg-faint">
          Our first robot is still on the bench. Check back soon.
        </div>
      ) : (
        <div className="mt-16 space-y-14">
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
                    className="group flex items-center gap-5 py-6 transition-colors hover:bg-bg-elevated sm:gap-8"
                  >
                    <span className="font-mono text-xl text-fg-faint sm:text-2xl">
                      {r.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <span className="text-2xl text-fg sm:text-3xl">{r.name}</span>
                        <span className="truncate text-sm text-fg-muted">
                          {r.tagline}
                        </span>
                      </div>
                    </div>
                    <span className="label-mono hidden shrink-0 text-fg-faint sm:block">
                      {r.competition}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-fg-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
