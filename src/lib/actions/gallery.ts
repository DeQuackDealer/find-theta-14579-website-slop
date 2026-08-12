"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";

type ActionResult = { error: string } | undefined;

export async function addGalleryImage(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const url = String(formData.get("url") ?? "").trim();
  if (!url) return { error: "Upload a photo before adding it." };
  try {
    await getDb().insert(galleryImages).values({
      url,
      caption: String(formData.get("caption") ?? "").trim(),
      order: Number(formData.get("order") ?? Date.now()),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to add photo." };
  }
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function updateGalleryCaption(id: number, formData: FormData) {
  await getDb()
    .update(galleryImages)
    .set({ caption: String(formData.get("caption") ?? "").trim() })
    .where(eq(galleryImages.id, id));
  revalidatePath("/gallery");
}

export async function deleteGalleryImage(id: number) {
  await getDb().delete(galleryImages).where(eq(galleryImages.id, id));
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
