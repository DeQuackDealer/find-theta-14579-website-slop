import Link from "next/link";
import {
  Robot as RobotIcon,
  Trophy,
  HandCoins,
  Images,
  Newspaper,
} from "@phosphor-icons/react/dist/ssr";
import {
  getRobots,
  getAchievements,
  getSponsors,
  getGalleryImages,
  getBlogPosts,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [robots, achievements, sponsors, gallery, posts] = await Promise.all([
    getRobots(),
    getAchievements(),
    getSponsors(),
    getGalleryImages(),
    getBlogPosts(),
  ]);

  const cards = [
    { href: "/admin/robots", label: "Robots", count: robots.length, icon: RobotIcon },
    {
      href: "/admin/achievements",
      label: "Achievements",
      count: achievements.length,
      icon: Trophy,
    },
    { href: "/admin/sponsors", label: "Sponsors", count: sponsors.length, icon: HandCoins },
    { href: "/admin/gallery", label: "Gallery photos", count: gallery.length, icon: Images },
    { href: "/admin/blog", label: "Updates", count: posts.length, icon: Newspaper },
  ];

  return (
    <div>
      <h1 className="text-2xl text-fg">Overview</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Manage everything that shows up on the public site.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-border p-5 transition-colors hover:border-border-strong hover:bg-bg-elevated"
          >
            <c.icon size={18} className="text-fg-muted" />
            <p className="mt-4 text-2xl text-fg">{c.count}</p>
            <p className="mt-0.5 text-sm text-fg-muted">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
