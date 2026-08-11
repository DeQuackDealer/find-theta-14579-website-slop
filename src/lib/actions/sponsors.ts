"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { sponsors } from "@/lib/db/schema";

function readFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    logoUrl: String(formData.get("logoUrl") ?? "").trim() || null,
    tier: String(formData.get("tier") ?? "Supporting").trim(),
    url: String(formData.get("url") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createSponsor(formData: FormData) {
  await getDb().insert(sponsors).values(readFields(formData));
  revalidatePath("/sponsors");
  redirect("/admin/sponsors");
}

export async function updateSponsor(id: number, formData: FormData) {
  await getDb().update(sponsors).set(readFields(formData)).where(eq(sponsors.id, id));
  revalidatePath("/sponsors");
  redirect("/admin/sponsors");
}

export async function deleteSponsor(id: number) {
  await getDb().delete(sponsors).where(eq(sponsors.id, id));
  revalidatePath("/sponsors");
  revalidatePath("/admin/sponsors");
}
