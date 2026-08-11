"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";

export async function addGalleryImage(formData: FormData) {
  const url = String(formData.get("url") ?? "").trim();
  if (!url) return;
  await getDb().insert(galleryImages).values({
    url,
    caption: String(formData.get("caption") ?? "").trim(),
    order: Number(formData.get("order") ?? Date.now()),
  });
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
