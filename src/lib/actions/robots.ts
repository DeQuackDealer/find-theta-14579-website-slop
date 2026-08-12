"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { robots, robotHotspots, robotImages } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { getErrorMessage } from "./error";

function readRobotFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  return {
    name,
    slug: slugify(slugInput || name),
    number: String(formData.get("number") ?? "").trim(),
    tagline: String(formData.get("tagline") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    seasonLabel: String(formData.get("seasonLabel") ?? "").trim(),
    seasonYear: String(formData.get("seasonYear") ?? "").trim(),
    seasonNumber: Number(formData.get("seasonNumber") ?? 1) || 1,
    competition: String(formData.get("competition") ?? "").trim(),
    assemblyLabel:
      String(formData.get("assemblyLabel") ?? "").trim() || "Competition assembly",
    modelUrl: String(formData.get("modelUrl") ?? "").trim() || null,
    coverImageUrl: String(formData.get("coverImageUrl") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

type ActionResult = { error: string } | undefined;

export async function createRobot(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const fields = readRobotFields(formData);
  let id: number;
  try {
    const [row] = await getDb().insert(robots).values(fields).returning({ id: robots.id });
    id = row.id;
  } catch (err) {
    return { error: getErrorMessage(err, "Failed to create robot.") };
  }
  revalidatePath("/");
  revalidatePath("/robots");
  redirect(`/admin/robots/${id}`);
}

export async function updateRobot(
  id: number,
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const fields = readRobotFields(formData);
  try {
    await getDb()
      .update(robots)
      .set({ ...fields, updatedAt: new Date() })
      .where(eq(robots.id, id));
  } catch (err) {
    return { error: getErrorMessage(err, "Failed to save robot.") };
  }
  revalidatePath("/");
  revalidatePath("/robots");
  revalidatePath(`/robots/${fields.slug}`);
  revalidatePath(`/admin/robots/${id}`);
}

export async function deleteRobot(id: number) {
  await getDb().delete(robots).where(eq(robots.id, id));
  revalidatePath("/");
  revalidatePath("/robots");
  redirect("/admin/robots");
}

export async function addHotspot(robotId: number, formData: FormData) {
  await getDb().insert(robotHotspots).values({
    robotId,
    label: String(formData.get("label") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    x: Number(formData.get("x") ?? 0.5),
    y: Number(formData.get("y") ?? 0.5),
    order: Number(formData.get("order") ?? 0),
  });
  revalidatePath(`/admin/robots/${robotId}`);
  revalidatePath("/robots");
}

export async function deleteHotspot(robotId: number, hotspotId: number) {
  await getDb().delete(robotHotspots).where(eq(robotHotspots.id, hotspotId));
  revalidatePath(`/admin/robots/${robotId}`);
  revalidatePath("/robots");
}

export async function addRobotImage(robotId: number, formData: FormData) {
  const url = String(formData.get("url") ?? "").trim();
  if (!url) return;
  await getDb().insert(robotImages).values({
    robotId,
    url,
    caption: String(formData.get("caption") ?? "").trim(),
    order: Number(formData.get("order") ?? 0),
  });
  revalidatePath(`/admin/robots/${robotId}`);
  revalidatePath("/robots");
}

export async function deleteRobotImage(robotId: number, imageId: number) {
  await getDb().delete(robotImages).where(eq(robotImages.id, imageId));
  revalidatePath(`/admin/robots/${robotId}`);
}
