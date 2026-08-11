import { TextField, TextAreaField, CheckboxField } from "./field";
import { SubmitButton } from "./submit-button";
import type { achievements as achievementsTable } from "@/lib/db/schema";

type Achievement = typeof achievementsTable.$inferSelect;

export function AchievementForm({
  action,
  achievement,
}: {
  action: (formData: FormData) => Promise<void>;
  achievement?: Achievement;
}) {
  return (
    <form action={action} className="max-w-xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Season year"
          name="seasonYear"
          defaultValue={achievement?.seasonYear}
          placeholder="e.g. 2025-26"
          required
        />
        <TextField
          label="Order (higher = shown first)"
          name="order"
          type="number"
          defaultValue={achievement?.order ?? 0}
        />
      </div>
      <TextField
        label="Competition"
        name="competition"
        defaultValue={achievement?.competition}
        placeholder="e.g. Regional Championship"
        required
      />
      <TextAreaField
        label="Description"
        name="description"
        defaultValue={achievement?.description}
        rows={3}
        placeholder="e.g. Winning Alliance Captain · Inspire Award"
        required
      />
      <CheckboxField
        label="Standout achievement"
        name="standout"
        defaultChecked={achievement?.standout}
      />
      <SubmitButton>{achievement ? "Save changes" : "Create achievement"}</SubmitButton>
    </form>
  );
}
