"use client";

import { useActionState } from "react";
import { TextField, TextAreaField, FormError } from "./field";
import { UploadField } from "./upload-field";
import { SubmitButton } from "./submit-button";
import type { blogPosts as blogPostsTable } from "@/lib/db/schema";

type Post = typeof blogPostsTable.$inferSelect;
type ActionResult = { error: string } | undefined;

function toDateInputValue(date?: Date) {
  if (!date) return new Date().toISOString().slice(0, 10);
  return new Date(date).toISOString().slice(0, 10);
}

export function BlogForm({
  action,
  post,
}: {
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  post?: Post;
}) {
  const [state, formAction] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <FormError message={state?.error} />

      <TextField label="Title" name="title" defaultValue={post?.title} required />
      <TextField
        label="Slug (URL)"
        name="slug"
        defaultValue={post?.slug}
        placeholder="auto-generated from title if left blank"
      />
      <TextField
        label="Published date"
        name="publishedAt"
        type="date"
        defaultValue={toDateInputValue(post?.publishedAt)}
      />
      <TextAreaField
        label="Excerpt"
        name="excerpt"
        defaultValue={post?.excerpt}
        rows={2}
        placeholder="One line shown in the updates list"
      />
      <TextAreaField
        label="Body"
        name="body"
        defaultValue={post?.body}
        rows={10}
        placeholder="Separate paragraphs with a blank line."
        required
      />
      <UploadField
        label="Cover image — optional"
        name="coverImageUrl"
        defaultValue={post?.coverImageUrl}
        accept="image/*"
        kind="image"
      />
      <SubmitButton>{post ? "Save changes" : "Publish update"}</SubmitButton>
    </form>
  );
}
