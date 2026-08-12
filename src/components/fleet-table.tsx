import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { robots as robotsTable } from "@/lib/db/schema";

type Robot = typeof robotsTable.$inferSelect;

export function FleetTable({
  robots,
  label,
  sortNote = "SORTED BY: SEASON ↓",
}: {
  robots: Robot[];
  label: string;
  sortNote?: string;
}) {
  return (
    <div className="border border-border">
      <div className="flex items-center justify-between border-b border-border bg-bg-elevated px-5 py-4 md:px-6">
        <div className="label-mono text-fg-faint">{"// "}{label}</div>
        <div className="label-mono hidden text-fg-faint sm:block">{sortNote}</div>
      </div>
      <div className="divide-y divide-border">
        {robots.map((r) => (
          <Link
            key={r.id}
            href={`/robots/${r.slug}`}
            className="group grid grid-cols-12 items-center gap-3 px-5 py-5 transition-colors hover:bg-bg-elevated md:gap-4 md:px-6"
          >
            <div className="label-mono col-span-2 text-fg-faint md:col-span-1">
              {r.seasonYear}
            </div>
            <div className="col-span-5 min-w-0 text-fg md:col-span-4">
              <span className="font-mono text-fg-faint">{r.number}</span>{" "}
              <span className="font-medium">{r.name}</span>
            </div>
            <div className="label-mono col-span-5 truncate text-accent md:col-span-2">
              {r.competition}
            </div>
            <div className="label-mono hidden truncate text-fg-faint md:col-span-2 md:block">
              {r.tagline}
            </div>
            <div className="label-mono hidden truncate text-fg-faint md:col-span-2 md:block">
              {r.assemblyLabel}
            </div>
            <div className="hidden col-span-1 justify-end md:flex">
              <ArrowUpRight
                size={16}
                className="text-fg-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
