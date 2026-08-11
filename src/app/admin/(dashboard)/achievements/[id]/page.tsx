import { notFound } from "next/navigation";
import { AchievementForm } from "@/components/admin/achievement-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { getAchievementById } from "@/lib/db/queries";
import { updateAchievement, deleteAchievement } from "@/lib/actions/achievements";

export const dynamic = "force-dynamic";

export default async function EditAchievementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const achievement = await getAchievementById(id);
  if (!achievement) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-fg">Edit achievement</h1>
        <DeleteButton action={deleteAchievement.bind(null, id)} label="Delete" />
      </div>
      <div className="mt-8">
        <AchievementForm action={updateAchievement.bind(null, id)} achievement={achievement} />
      </div>
    </div>
  );
}
