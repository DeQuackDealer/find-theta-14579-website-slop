"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { achievements } from "@/lib/db/schema";

function readFields(formData: FormData) {
  return {
    seasonYear: String(formData.get("seasonYear") ?? "").trim(),
    competition: String(formData.get("competition") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    standout: formData.get("standout") === "on",
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createAchievement(formData: FormData) {
  await getDb().insert(achievements).values(readFields(formData));
  revalidatePath("/");
  redirect("/admin/achievements");
}

export async function updateAchievement(id: number, formData: FormData) {
  await getDb().update(achievements).set(readFields(formData)).where(eq(achievements.id, id));
  revalidatePath("/");
  redirect("/admin/achievements");
}

export async function deleteAchievement(id: number) {
  await getDb().delete(achievements).where(eq(achievements.id, id));
  revalidatePath("/");
  revalidatePath("/admin/achievements");
}
