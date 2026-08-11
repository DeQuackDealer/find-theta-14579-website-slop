import { notFound } from "next/navigation";
import Image from "next/image";
import { RobotForm } from "@/components/admin/robot-form";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { DeleteButton } from "@/components/admin/delete-button";
import { TextField } from "@/components/admin/field";
import {
  getRobotById,
  getRobotHotspots,
  getRobotImages,
} from "@/lib/db/queries";
import {
  updateRobot,
  deleteRobot,
  addHotspot,
  deleteHotspot,
  addRobotImage,
  deleteRobotImage,
} from "@/lib/actions/robots";

export const dynamic = "force-dynamic";

export default async function EditRobotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const robot = await getRobotById(id);
  if (!robot) notFound();

  const [hotspots, images] = await Promise.all([
    getRobotHotspots(id),
    getRobotImages(id),
  ]);

  const boundUpdate = updateRobot.bind(null, id);
  const boundDelete = deleteRobot.bind(null, id);
  const boundAddHotspot = addHotspot.bind(null, id);
  const boundAddImage = addRobotImage.bind(null, id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-fg">{robot.name}</h1>
        <DeleteButton
          action={boundDelete}
          label="Delete robot"
          confirmMessage={`Delete ${robot.name}? This also removes its hotspots and photos.`}
        />
      </div>

      <div className="mt-8">
        <RobotForm action={boundUpdate} robot={robot} />
      </div>

      <div className="mt-14 max-w-2xl border-t border-border pt-10">
        <h2 className="text-lg text-fg">Viewer hotspots</h2>
        <p className="mt-1 text-sm text-fg-muted">
          Small labelled pins over the 3D viewer. Position is percent from the
          top-left (0 = left/top edge, 1 = right/bottom edge).
        </p>

        {hotspots.length > 0 ? (
          <ul className="mt-5 divide-y divide-border border-t border-border">
            {hotspots.map((h) => (
              <li key={h.id} className="flex items-center gap-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-fg">{h.label}</p>
                  <p className="text-xs text-fg-faint">
                    x {h.x.toFixed(2)} · y {h.y.toFixed(2)}
                  </p>
                </div>
                <DeleteButton
                  action={deleteHotspot.bind(null, id, h.id)}
                  label="Remove"
                  confirmMessage="Remove this hotspot?"
                />
              </li>
            ))}
          </ul>
        ) : null}

        <form action={boundAddHotspot} className="mt-6 grid grid-cols-2 gap-4">
          <TextField label="Label" name="label" required />
          <TextField label="Order" name="order" type="number" defaultValue={0} />
          <TextField label="Description" name="description" />
          <div className="grid grid-cols-2 gap-4">
            <TextField label="X (0-1)" name="x" type="number" defaultValue={0.5} />
            <TextField label="Y (0-1)" name="y" type="number" defaultValue={0.5} />
          </div>
          <div className="col-span-2">
            <SubmitButton>Add hotspot</SubmitButton>
          </div>
        </form>
      </div>

      <div className="mt-14 max-w-2xl border-t border-border pt-10">
        <h2 className="text-lg text-fg">Extra photos</h2>
        <p className="mt-1 text-sm text-fg-muted">
          Shown in a grid below the viewer on this robot&rsquo;s page.
        </p>

        {images.length > 0 ? (
          <ul className="mt-5 grid grid-cols-3 gap-3">
            {images.map((img) => (
              <li key={img.id} className="space-y-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-border">
                  <Image src={img.url} alt={img.caption} fill className="object-cover" />
                </div>
                <DeleteButton
                  action={deleteRobotImage.bind(null, id, img.id)}
                  label="Remove"
                  confirmMessage="Remove this photo?"
                />
              </li>
            ))}
          </ul>
        ) : null}

        <form action={boundAddImage} className="mt-6 space-y-4">
          <UploadField label="Photo" name="url" accept="image/*" kind="image" />
          <TextField label="Caption" name="caption" />
          <SubmitButton>Add photo</SubmitButton>
        </form>
      </div>
    </div>
  );
}
