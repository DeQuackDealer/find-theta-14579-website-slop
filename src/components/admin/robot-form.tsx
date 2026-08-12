import { TextField, TextAreaField } from "./field";
import { UploadField } from "./upload-field";
import { SubmitButton } from "./submit-button";
import type { robots as robotsTable } from "@/lib/db/schema";

type Robot = typeof robotsTable.$inferSelect;

export function RobotForm({
  action,
  robot,
}: {
  action: (formData: FormData) => Promise<void>;
  robot?: Robot;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Name" name="name" defaultValue={robot?.name} required />
        <TextField
          label="Number"
          name="number"
          defaultValue={robot?.number}
          placeholder="e.g. 01"
          required
        />
      </div>

      <TextField
        label="Slug (URL)"
        name="slug"
        defaultValue={robot?.slug}
        placeholder="auto-generated from name if left blank"
      />

      <TextField
        label="Tagline"
        name="tagline"
        defaultValue={robot?.tagline}
        placeholder="e.g. Built for war at Worlds"
        required
      />

      <TextAreaField
        label="Summary"
        name="summary"
        defaultValue={robot?.summary}
        rows={4}
        placeholder="A paragraph about this robot's design and role."
      />

      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="Season label"
          name="seasonLabel"
          defaultValue={robot?.seasonLabel}
          placeholder="e.g. DECODE"
          required
        />
        <TextField
          label="Season year"
          name="seasonYear"
          defaultValue={robot?.seasonYear}
          placeholder="e.g. 2025-26"
          required
        />
        <TextField
          label="Season #"
          name="seasonNumber"
          type="number"
          defaultValue={robot?.seasonNumber ?? 1}
          required
        />
      </div>

      <TextField
        label="Competition"
        name="competition"
        defaultValue={robot?.competition}
        placeholder="e.g. FIRST World Championship"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Assembly badge"
          name="assemblyLabel"
          defaultValue={robot?.assemblyLabel || "Competition assembly"}
        />
        <TextField
          label="Sort order (higher = more recent)"
          name="order"
          type="number"
          defaultValue={robot?.order ?? 0}
        />
      </div>

      <UploadField
        label="3D model (.glb, .gltf, or .stl) — optional, a placeholder wireframe shows if empty"
        name="modelUrl"
        defaultValue={robot?.modelUrl}
        accept=".glb,.gltf,.stl"
        kind="model"
      />

      <UploadField
        label="Cover image — optional"
        name="coverImageUrl"
        defaultValue={robot?.coverImageUrl}
        accept="image/*"
        kind="image"
      />

      <SubmitButton>{robot ? "Save changes" : "Create robot"}</SubmitButton>
    </form>
  );
}
