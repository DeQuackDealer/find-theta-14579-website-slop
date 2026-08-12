"use client";

import { useActionState } from "react";
import { TextField, SelectField, FormError } from "./field";
import { UploadField } from "./upload-field";
import { SubmitButton } from "./submit-button";
import type { sponsors as sponsorsTable } from "@/lib/db/schema";

type Sponsor = typeof sponsorsTable.$inferSelect;
type ActionResult = { error: string } | undefined;

export function SponsorForm({
  action,
  sponsor,
}: {
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  sponsor?: Sponsor;
}) {
  const [state, formAction] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <FormError message={state?.error} />

      <TextField label="Name" name="name" defaultValue={sponsor?.name} required />
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Tier"
          name="tier"
          defaultValue={sponsor?.tier ?? "Supporting"}
          options={[
            { value: "Title", label: "Title" },
            { value: "Gold", label: "Gold" },
            { value: "Supporting", label: "Supporting" },
          ]}
        />
        <TextField label="Order" name="order" type="number" defaultValue={sponsor?.order ?? 0} />
      </div>
      <TextField
        label="Website URL"
        name="url"
        defaultValue={sponsor?.url ?? ""}
        placeholder="https://"
      />
      <UploadField
        label="Logo — optional, name shown as text if empty"
        name="logoUrl"
        defaultValue={sponsor?.logoUrl}
        accept="image/*"
        kind="image"
      />
      <SubmitButton>{sponsor ? "Save changes" : "Add sponsor"}</SubmitButton>
    </form>
  );
}
