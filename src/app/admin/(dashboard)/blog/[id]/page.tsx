import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { getBlogPostById } from "@/lib/db/queries";
import { updateBlogPost, deleteBlogPost } from "@/lib/actions/blog";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const post = await getBlogPostById(id);
  if (!post) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-fg">Edit update</h1>
        <DeleteButton action={deleteBlogPost.bind(null, id)} label="Delete" />
      </div>
      <div className="mt-8">
        <BlogForm action={updateBlogPost.bind(null, id)} post={post} />
      </div>
    </div>
  );
}
