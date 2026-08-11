import type { robots as robotsTable } from "@/lib/db/schema";

type Robot = typeof robotsTable.$inferSelect;

export function groupRobotsBySeason(robots: Robot[]) {
  const groups = new Map<string, Robot[]>();
  for (const r of robots) {
    const key = `${r.seasonNumber}__${r.seasonLabel}__${r.seasonYear}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(r);
  }
  return [...groups.entries()]
    .sort((a, b) => Number(b[0].split("__")[0]) - Number(a[0].split("__")[0]))
    .map(([key, list]) => {
      const [seasonNumber, seasonLabel, seasonYear] = key.split("__");
      return { seasonNumber, seasonLabel, seasonYear, robots: list };
    });
}
