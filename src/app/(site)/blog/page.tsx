import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { getBlogPosts, getSettings } from "@/lib/db/queries";
import { resolveCopy } from "@/lib/site-copy";

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
  const [posts, settings] = await Promise.all([getBlogPosts(), getSettings()]);
  const copy = resolveCopy(settings);

  return (
    <div>
      <PageHeader
        eyebrow="06 / Updates"
        title={
          <>
            Field notes,
            <br />
            <span className="text-stroke">build logs, dispatches.</span>
          </>
        }
        meta={[
          { label: "Posts", value: String(posts.length) },
          { label: "Next post", value: "Soon" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {posts.length === 0 ? (
          <EmptyState tag="No posts yet" title="The first dispatch is in draft.">
            <p>{copy.updatesEmpty}</p>
          </EmptyState>
        ) : (
          <Reveal>
            <div className="divide-y divide-border border-t border-border">
              {posts.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="label-mono hidden shrink-0 text-fg-faint sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
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
    </div>
  );
}
