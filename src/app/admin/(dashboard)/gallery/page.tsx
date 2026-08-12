import { getGalleryImages } from "@/lib/db/queries";
import { DeleteButton } from "@/components/admin/delete-button";
import { GalleryUploadForm } from "@/components/admin/gallery-upload-form";
import { updateGalleryCaption, deleteGalleryImage } from "@/lib/actions/gallery";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <div>
      <h1 className="text-2xl text-fg">Gallery</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Photos shown on the public gallery page and the homepage preview.
      </p>

      <GalleryUploadForm />

      {images.length === 0 ? (
        <p className="mt-8 text-sm text-fg-faint">No photos yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="space-y-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.caption}
                className="aspect-[4/3] w-full rounded-md border border-border object-cover"
              />
              <form
                action={async (formData: FormData) => {
                  "use server";
                  await updateGalleryCaption(img.id, formData);
                }}
                className="flex items-center gap-2"
              >
                <input
                  name="caption"
                  defaultValue={img.caption}
                  placeholder="Caption"
                  className="w-full rounded-md border border-border-strong bg-bg px-2.5 py-1.5 text-xs text-fg outline-none focus:border-fg"
                />
                <button
                  type="submit"
                  className="label-mono shrink-0 text-fg-faint hover:text-fg"
                >
                  save
                </button>
              </form>
              <DeleteButton
                action={deleteGalleryImage.bind(null, img.id)}
                label="Remove"
                confirmMessage="Remove this photo?"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
