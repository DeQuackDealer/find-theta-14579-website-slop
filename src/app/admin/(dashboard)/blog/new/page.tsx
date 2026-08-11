import { BlogForm } from "@/components/admin/blog-form";
import { createBlogPost } from "@/lib/actions/blog";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl text-fg">New update</h1>
      <div className="mt-8">
        <BlogForm action={createBlogPost} />
      </div>
    </div>
  );
}
