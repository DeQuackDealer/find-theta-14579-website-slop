"use client";

import { useActionState } from "react";
import { UploadField } from "./upload-field";
import { TextField, FormError } from "./field";
import { SubmitButton } from "./submit-button";
import { addGalleryImage } from "@/lib/actions/gallery";

export function GalleryUploadForm() {
  const [state, formAction] = useActionState(addGalleryImage, undefined);

  return (
    <form
      action={formAction}
      className="mt-8 flex max-w-xl flex-wrap items-end gap-4 rounded-lg border border-border p-5"
    >
      <div className="w-full">
        <FormError message={state?.error} />
      </div>
      <div className="min-w-[220px] flex-1">
        <UploadField label="Photo" name="url" accept="image/*" kind="image" />
      </div>
      <div className="min-w-[220px] flex-1">
        <TextField label="Caption" name="caption" placeholder="optional" />
      </div>
      <SubmitButton>Add</SubmitButton>
    </form>
  );
}
