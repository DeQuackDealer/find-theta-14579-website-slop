import Link from "next/link";
import { Plus, Star } from "@phosphor-icons/react/dist/ssr";
import { getAchievements } from "@/lib/db/queries";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteAchievement } from "@/lib/actions/achievements";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-fg">Achievements</h1>
        <Link
          href="/admin/achievements/new"
          className="flex items-center gap-1.5 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          <Plus size={14} weight="bold" />
          New achievement
        </Link>
      </div>

      {achievements.length === 0 ? (
        <p className="mt-8 text-sm text-fg-faint">No achievements yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-border border-t border-border">
          {achievements.map((a) => (
            <div key={a.id} className="flex items-center gap-4 py-4">
              <Link href={`/admin/achievements/${a.id}`} className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="label-mono text-fg-faint">{a.seasonYear}</span>
                  {a.standout ? (
                    <Star size={12} weight="fill" className="text-accent" />
                  ) : null}
                </div>
                <p className="mt-1 truncate text-fg">{a.competition}</p>
              </Link>
              <DeleteButton
                action={deleteAchievement.bind(null, a.id)}
                label="Delete"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
