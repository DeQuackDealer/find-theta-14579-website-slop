"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { achievements } from "@/lib/db/schema";
import { getErrorMessage } from "./error";

function readFields(formData: FormData) {
  return {
    seasonYear: String(formData.get("seasonYear") ?? "").trim(),
    competition: String(formData.get("competition") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    standout: formData.get("standout") === "on",
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

type ActionResult = { error: string } | undefined;

export async function createAchievement(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await getDb().insert(achievements).values(readFields(formData));
  } catch (err) {
    return { error: getErrorMessage(err, "Failed to create achievement.") };
  }
  revalidatePath("/");
  redirect("/admin/achievements");
}

export async function updateAchievement(
  id: number,
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await getDb().update(achievements).set(readFields(formData)).where(eq(achievements.id, id));
  } catch (err) {
    return { error: getErrorMessage(err, "Failed to save achievement.") };
  }
  revalidatePath("/");
  redirect("/admin/achievements");
}

export async function deleteAchievement(id: number) {
  await getDb().delete(achievements).where(eq(achievements.id, id));
  revalidatePath("/");
  revalidatePath("/admin/achievements");
}
