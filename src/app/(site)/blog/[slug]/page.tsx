import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getBlogPostBySlug } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Link
        href="/blog"
        className="label-mono inline-flex items-center gap-1.5 text-fg-faint transition-colors hover:text-fg"
      >
        <ArrowLeft size={13} />
        Updates
      </Link>

      <p className="label-mono mt-8 text-fg-faint">{formatDate(post.publishedAt)}</p>
      <h1 className="mt-3 text-4xl leading-tight tracking-tight text-fg sm:text-5xl">
        {post.title}
      </h1>

      {post.coverImageUrl ? (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg border border-border">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover grayscale"
            sizes="(min-width: 768px) 42rem, 100vw"
          />
        </div>
      ) : null}

      <div className="mt-10 space-y-5 text-base leading-relaxed text-fg-muted">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <p>{post.excerpt}</p>
        )}
      </div>
    </article>
  );
}
