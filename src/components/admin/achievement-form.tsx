"use client";

import { useActionState } from "react";
import { TextField, TextAreaField, CheckboxField, FormError } from "./field";
import { SubmitButton } from "./submit-button";
import type { achievements as achievementsTable } from "@/lib/db/schema";

type Achievement = typeof achievementsTable.$inferSelect;
type ActionResult = { error: string } | undefined;

export function AchievementForm({
  action,
  achievement,
}: {
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  achievement?: Achievement;
}) {
  const [state, formAction] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <FormError message={state?.error} />

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
