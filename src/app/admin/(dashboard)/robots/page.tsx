import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { getRobots } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function AdminRobotsPage() {
  const robots = await getRobots();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-fg">Robots</h1>
        <Link
          href="/admin/robots/new"
          className="flex items-center gap-1.5 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          <Plus size={14} weight="bold" />
          New robot
        </Link>
      </div>

      {robots.length === 0 ? (
        <p className="mt-8 text-sm text-fg-faint">No robots yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-border border-t border-border">
          {robots.map((r) => (
            <Link
              key={r.id}
              href={`/admin/robots/${r.id}`}
              className="flex items-center gap-4 py-4 transition-colors hover:bg-bg-elevated"
            >
              <span className="font-mono text-fg-faint">{r.number}</span>
              <div className="min-w-0 flex-1">
                <p className="text-fg">{r.name}</p>
                <p className="truncate text-xs text-fg-faint">
                  {r.seasonLabel} · {r.seasonYear} · {r.competition}
                </p>
              </div>
              {!r.modelUrl ? (
                <span className="label-mono shrink-0 rounded-full border border-border-strong px-2.5 py-1 text-fg-faint">
                  placeholder model
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
