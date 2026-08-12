import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { GhostNumber } from "@/components/ghost-number";
import type { blogPosts as blogPostsTable } from "@/lib/db/schema";

type Post = typeof blogPostsTable.$inferSelect;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function UpdatesSection({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const [featured, ...rest] = posts;

  return (
    <section className="relative isolate mx-auto max-w-7xl overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <GhostNumber n="04" className="-top-6 right-0 sm:-top-10" />
      <Reveal>
        <SectionLabel index="04">Latest updates</SectionLabel>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <p className="label-mono text-fg-faint">
              latest · {formatDate(featured.publishedAt)}
            </p>
            <h3 className="mt-3 text-2xl text-fg sm:text-3xl">{featured.title}</h3>
            {featured.excerpt ? (
              <p className="mt-3 max-w-md text-fg-muted">{featured.excerpt}</p>
            ) : null}
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-fg transition-colors group-hover:text-accent">
              Read the recap
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </Reveal>

        {rest.length > 0 ? (
          <Reveal delay={0.1}>
            <ul className="divide-y divide-border border-t border-border">
              {rest.slice(0, 3).map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <div className="min-w-0">
                      <p className="label-mono text-fg-faint">
                        {formatDate(p.publishedAt)}
                      </p>
                      <p className="mt-1 truncate text-lg text-fg">{p.title}</p>
                    </div>
                    <span className="label-mono flex shrink-0 items-center gap-1.5 text-fg-muted transition-colors group-hover:text-fg">
                      Read
                      <ArrowUpRight size={13} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
