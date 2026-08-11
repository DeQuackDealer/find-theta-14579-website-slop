import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getSponsors, getSettings } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Sponsors",
};

export const dynamic = "force-dynamic";

const TIER_ORDER = ["Title", "Gold", "Supporting"];

export default async function SponsorsPage() {
  const [sponsors, settings] = await Promise.all([getSponsors(), getSettings()]);

  const tiers = TIER_ORDER.map((tier) => ({
    tier,
    sponsors: sponsors.filter((s) => s.tier === tier),
  })).filter((t) => t.sponsors.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="label-mono mb-4 text-fg-faint">Sponsors</p>
        <h1 className="max-w-2xl text-4xl leading-tight tracking-tight text-fg sm:text-5xl">
          A community team, backed by people who believe in it.
        </h1>
        <p className="mt-5 max-w-lg text-base text-fg-muted">
          Every part, tool, and trip to competition is funded through
          sponsorship. If your organisation wants in, we would love to talk.
        </p>
      </Reveal>

      {tiers.length === 0 ? (
        <div className="mt-16 flex flex-col items-start gap-5 rounded-lg border border-dashed border-border p-12 text-fg-faint">
          <p>
            We are building our sponsor roster for this season. Want to be the
            first name on this page?
          </p>
          {settings.contactEmail ? (
            <Button href={`mailto:${settings.contactEmail}`} variant="secondary">
              Get in touch
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="mt-16 space-y-14">
          {tiers.map((group) => (
            <div key={group.tier}>
              <p className="label-mono mb-5 text-fg-faint">{group.tier}</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.sponsors.map((s) => {
                  const content = (
                    <div className="flex h-28 items-center justify-center rounded-lg border border-border bg-bg-elevated p-6 transition-colors hover:border-border-strong">
                      {s.logoUrl ? (
                        <Image
                          src={s.logoUrl}
                          alt={s.name}
                          width={160}
                          height={64}
                          className="h-auto max-h-12 w-auto object-contain grayscale"
                        />
                      ) : (
                        <span className="text-center text-sm text-fg-muted">
                          {s.name}
                        </span>
                      )}
                    </div>
                  );
                  return s.url ? (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.name}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={s.id}>{content}</div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
