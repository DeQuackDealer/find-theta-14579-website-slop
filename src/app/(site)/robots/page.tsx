import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { FleetTable } from "@/components/fleet-table";
import { getRobots, getSettings } from "@/lib/db/queries";
import { resolveCopy } from "@/lib/site-copy";
import { groupRobotsBySeason } from "@/lib/robots";

export const metadata: Metadata = {
  title: "Flock",
};

export const dynamic = "force-dynamic";

export default async function RobotsPage() {
  const [robots, settings] = await Promise.all([getRobots(), getSettings()]);
  const groups = groupRobotsBySeason(robots);
  const copy = resolveCopy(settings);

  return (
    <div>
      <PageHeader
        eyebrow="04 / The flock"
        title={
          <>
            Every {settings.teamName} robot,
            <br />
            <span className="text-stroke">one season at a time.</span>
          </>
        }
        meta={
          groups.length > 0
            ? [
                { label: "Robots logged", value: String(robots.length) },
                { label: "Seasons", value: String(groups.length) },
                { label: "Current season", value: groups[0].seasonYear },
                { label: "Updated", value: "Live" },
              ]
            : undefined
        }
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {groups.length === 0 ? (
          <EmptyState tag="Awaiting fleet data" title="Our first chassis is in the works.">
            <p>{copy.fleetEmpty}</p>
          </EmptyState>
        ) : (
          <div className="space-y-12">
            {groups.map((group) => (
              <FleetTable
                key={group.seasonNumber}
                robots={group.robots}
                label={`Season ${group.seasonNumber.padStart(2, "0")} · ${group.seasonLabel}`}
                sortNote={group.seasonYear}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
