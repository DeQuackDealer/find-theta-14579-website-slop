"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { sponsors } from "@/lib/db/schema";
import { getErrorMessage } from "./error";

function readFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    logoUrl: String(formData.get("logoUrl") ?? "").trim() || null,
    tier: String(formData.get("tier") ?? "Supporting").trim(),
    url: String(formData.get("url") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

type ActionResult = { error: string } | undefined;

export async function createSponsor(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await getDb().insert(sponsors).values(readFields(formData));
  } catch (err) {
    return { error: getErrorMessage(err, "Failed to add sponsor.") };
  }
  revalidatePath("/sponsors");
  redirect("/admin/sponsors");
}

export async function updateSponsor(
  id: number,
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await getDb().update(sponsors).set(readFields(formData)).where(eq(sponsors.id, id));
  } catch (err) {
    return { error: getErrorMessage(err, "Failed to save sponsor.") };
  }
  revalidatePath("/sponsors");
  redirect("/admin/sponsors");
}

export async function deleteSponsor(id: number) {
  await getDb().delete(sponsors).where(eq(sponsors.id, id));
  revalidatePath("/sponsors");
  revalidatePath("/admin/sponsors");
}
