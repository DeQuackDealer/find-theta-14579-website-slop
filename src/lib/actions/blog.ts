"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";

function readFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const publishedAtInput = String(formData.get("publishedAt") ?? "").trim();
  return {
    title,
    slug: slugify(slugInput || title),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    coverImageUrl: String(formData.get("coverImageUrl") ?? "").trim() || null,
    publishedAt: publishedAtInput ? new Date(publishedAtInput) : new Date(),
  };
}

export async function createBlogPost(formData: FormData) {
  await getDb().insert(blogPosts).values(readFields(formData));
  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: number, formData: FormData) {
  const fields = readFields(formData);
  await getDb().update(blogPosts).set(fields).where(eq(blogPosts.id, id));
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${fields.slug}`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: number) {
  await getDb().delete(blogPosts).where(eq(blogPosts.id, id));
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}
