import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { getBlogPosts } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Updates",
};

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="label-mono mb-4 text-fg-faint">Updates</p>
        <h1 className="max-w-2xl text-4xl leading-tight tracking-tight text-fg sm:text-5xl">
          News from the build room and the field.
        </h1>
      </Reveal>

      {posts.length === 0 ? (
        <div className="mt-16 rounded-lg border border-dashed border-border p-12 text-center text-fg-faint">
          Nothing posted yet. Our first update is on its way.
        </div>
      ) : (
        <Reveal delay={0.1}>
          <div className="mt-14 divide-y divide-border border-t border-border">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div className="min-w-0">
                  <p className="label-mono text-fg-faint">
                    {formatDate(p.publishedAt)}
                  </p>
                  <p className="mt-1.5 text-2xl text-fg">{p.title}</p>
                  {p.excerpt ? (
                    <p className="mt-1.5 max-w-lg text-sm text-fg-muted">
                      {p.excerpt}
                    </p>
                  ) : null}
                </div>
                <span className="label-mono flex shrink-0 items-center gap-1.5 text-fg-muted transition-colors group-hover:text-fg">
                  Read
                  <ArrowUpRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
