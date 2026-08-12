import Link from "next/link";
import {
  InstagramLogo,
  YoutubeLogo,
  LinkedinLogo,
  GithubLogo,
  ChartLineUp,
  ArrowRight,
  ArrowUpRight,
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
      {/* CTA band */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12">
          <div>
            <p className="label-mono mb-4 flex items-center gap-3 text-fg-faint">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              Contact
            </p>
            <h2 className="max-w-xl text-3xl leading-[1.08] tracking-tight text-fg sm:text-4xl lg:text-5xl">
              Want to back a team that builds, breaks,{" "}
              <em className="italic text-accent">and ships?</em>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
              Sponsorships, mentoring, media, or just to say hi — our inbox is
              always open.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            {contactEmail ? (
              <a
                href={`mailto:${contactEmail}`}
                className="group label-mono inline-flex w-full items-center justify-between gap-4 bg-accent px-6 py-4 text-accent-fg transition-opacity hover:opacity-85 sm:w-auto lg:justify-start"
              >
                {contactEmail}
                <ArrowRight
                  size={15}
                  className="shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </a>
            ) : null}
            <Link
              href="/sponsors"
              className="group label-mono inline-flex w-full items-center justify-between gap-4 border border-border-strong px-6 py-4 text-fg transition-colors hover:border-fg hover:bg-bg-elevated sm:w-auto lg:justify-start"
            >
              Become a sponsor
              <ArrowUpRight
                size={15}
                className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <h4 className="mb-3 text-lg text-fg">{teamName}</h4>
            <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
              A student-run FIRST Tech Challenge team. We design, build, and
              program competition robots with the precision of the ibis.
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
