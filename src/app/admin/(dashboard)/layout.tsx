import Link from "next/link";
import {
  Gauge,
  Robot as RobotIcon,
  Trophy,
  HandCoins,
  Images,
  Newspaper,
  Gear,
  SignOut,
  ArrowSquareOut,
} from "@phosphor-icons/react/dist/ssr";
import { IbisMark } from "@/components/ibis-mark";
import { logoutAction } from "../login/actions";

const NAV = [
  { href: "/admin", label: "Overview", icon: Gauge },
  { href: "/admin/robots", label: "Robots", icon: RobotIcon },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy },
  { href: "/admin/sponsors", label: "Sponsors", icon: HandCoins },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/blog", label: "Updates", icon: Newspaper },
  { href: "/admin/settings", label: "Settings", icon: Gear },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh]">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border p-5 lg:flex">
        <Link href="/admin" className="flex items-center gap-2.5 px-1">
          <IbisMark className="h-6 w-6" />
          <span className="label-mono text-fg">Admin</span>
        </Link>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-1 border-t border-border pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
          >
            <ArrowSquareOut size={16} />
            View site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
            >
              <SignOut size={16} />
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-border px-5 py-4 lg:hidden">
          <Link href="/admin" className="flex items-center gap-2.5">
            <IbisMark className="h-5 w-5" />
            <span className="label-mono text-fg">Admin</span>
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-fg-muted">
              <SignOut size={18} />
            </button>
          </form>
        </header>
        <nav className="label-mono flex gap-4 overflow-x-auto border-b border-border px-5 py-3 text-fg-muted lg:hidden">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 hover:text-fg">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
