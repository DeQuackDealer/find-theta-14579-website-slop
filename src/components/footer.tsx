import Link from "next/link";
import {
  InstagramLogo,
  YoutubeLogo,
  LinkedinLogo,
  GithubLogo,
  ChartLineUp,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { IbisMark } from "./ibis-mark";

const SITE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/robots", label: "Fleet" },
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
  contactEmail,
  socials,
}: {
  teamName: string;
  teamNumber: string;
  location: string;
  contactEmail: string;
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
            <h4 className="mb-3 text-lg text-fg">Get in touch</h4>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              Sponsorships, mentoring, media, or just to say hi. Our inbox is
              always open.
            </p>
            {contactEmail ? (
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-1.5 text-sm text-fg transition-colors hover:text-accent"
              >
                {contactEmail}
                <ArrowRight size={13} />
              </a>
            ) : null}
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
          {location ? <span>{location}</span> : null}
        </div>
      </div>
    </footer>
  );
}
