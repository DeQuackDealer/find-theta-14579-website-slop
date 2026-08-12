"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { COPY_KEYS, type SiteCopy } from "@/lib/site-copy";
import { getErrorMessage } from "./error";

type ActionResult = { error: string } | undefined;

export async function updateSettings(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  // Blank copy fields are stored as-is; the site falls back to COPY_DEFAULTS.
  const copy = Object.fromEntries(
    COPY_KEYS.map((k) => [k, String(formData.get(k) ?? "").trim()]),
  ) as SiteCopy;

  const fields = {
    id: 1 as const,
    teamName: String(formData.get("teamName") ?? "").trim(),
    teamNumber: String(formData.get("teamNumber") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    ...copy,
    statAwards: Number(formData.get("statAwards") ?? 0) || 0,
    statMembers: Number(formData.get("statMembers") ?? 0) || 0,
    statWorldChamps: Number(formData.get("statWorldChamps") ?? 0) || 0,
    statQualRate: Number(formData.get("statQualRate") ?? 0) || 0,
    activePalette: String(formData.get("activePalette") ?? "bone").trim(),
    contactEmail: String(formData.get("contactEmail") ?? "").trim(),
    socialInstagram: String(formData.get("socialInstagram") ?? "").trim() || null,
    socialYoutube: String(formData.get("socialYoutube") ?? "").trim() || null,
    socialGithub: String(formData.get("socialGithub") ?? "").trim() || null,
    socialLinkedin: String(formData.get("socialLinkedin") ?? "").trim() || null,
    socialFtcScout: String(formData.get("socialFtcScout") ?? "").trim() || null,
    updatedAt: new Date(),
  };

  try {
    await getDb()
      .insert(siteSettings)
      .values(fields)
      .onConflictDoUpdate({ target: siteSettings.id, set: fields });
  } catch (err) {
    return { error: getErrorMessage(err, "Failed to save settings.") };
  }

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
