import { AchievementForm } from "@/components/admin/achievement-form";
import { createAchievement } from "@/lib/actions/achievements";

export default function NewAchievementPage() {
  return (
    <div>
      <h1 className="text-2xl text-fg">New achievement</h1>
      <div className="mt-8">
        <AchievementForm action={createAchievement} />
      </div>
    </div>
  );
}
