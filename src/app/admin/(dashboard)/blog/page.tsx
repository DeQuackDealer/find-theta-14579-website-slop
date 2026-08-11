import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { getBlogPosts } from "@/lib/db/queries";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteBlogPost } from "@/lib/actions/blog";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-fg">Updates</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-1.5 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          <Plus size={14} weight="bold" />
          New update
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-fg-faint">Nothing posted yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-border border-t border-border">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 py-4">
              <Link href={`/admin/blog/${p.id}`} className="min-w-0 flex-1">
                <p className="text-fg">{p.title}</p>
                <p className="text-xs text-fg-faint">
                  {new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(p.publishedAt))}
                </p>
              </Link>
              <DeleteButton action={deleteBlogPost.bind(null, p.id)} label="Delete" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
