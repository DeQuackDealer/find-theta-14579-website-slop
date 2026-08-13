import Link from "next/link";
import {
  InstagramLogo,
  YoutubeLogo,
  LinkedinLogo,
  GithubLogo,
  ChartLineUp,
} from "@phosphor-icons/react/dist/ssr";
import { IbisMark } from "./ibis-mark";

const SITE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/robots", label: "Flock" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Updates" },
  { href: "/sponsors", label: "Sponsors" },
];

const SOCIAL_ICONS = {
  instagram: InstagramLogo,
  youtube: YoutubeLogo,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  ftcScout: ChartLineUp,
} as const;

export function Footer({
  teamName,
  teamNumber,
  location,
  about,
  socials,
}: {
  teamName: string;
  teamNumber: string;
  location: string;
  about: string;
  socials: Partial<Record<keyof typeof SOCIAL_ICONS, string | null>>;
}) {
  const socialEntries = (
    Object.entries(socials) as [keyof typeof SOCIAL_ICONS, string | null][]
  ).filter((entry): entry is [keyof typeof SOCIAL_ICONS, string] => Boolean(entry[1]));

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <h4 className="mb-3 text-lg text-fg">{teamName}</h4>
            <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
              {about}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-lg text-fg">Follow</h4>
            <ul className="flex flex-col gap-2.5">
              {socialEntries.map(([key, url]) => {
                const Icon = SOCIAL_ICONS[key];
                return (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      <Icon size={16} />
                      <span className="capitalize">
                        {key === "ftcScout" ? "FTC Scout" : key}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-lg text-fg">Site</h4>
            <ul className="flex flex-col gap-2.5">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center opacity-[0.06]">
          <IbisMark className="h-32 w-32 sm:h-40 sm:w-40" />
        </div>

        <div className="label-mono mt-8 flex flex-col gap-2 border-t border-border pt-6 text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {teamName} · FTC Team {teamNumber}
          </span>
          <span className="flex items-center gap-4">
            {location ? <span>{location}</span> : null}
            <span className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-accent animate-pulse-dot" />
              All systems nominal
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
