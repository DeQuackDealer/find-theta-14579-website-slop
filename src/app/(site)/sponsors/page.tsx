import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
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
    <div>
      <PageHeader
        eyebrow="Sponsors"
        title="A community team, backed by people who believe in it."
        subtitle="Every part, tool, and trip to competition is funded through sponsorship. If your organisation wants in, we would love to talk."
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {tiers.length === 0 ? (
          <EmptyState tag="Pending · roster is open">
            <p>
              We are building our sponsor roster for this season. Want to be
              the first name on this page?
            </p>
            {settings.contactEmail ? (
              <Button href={`mailto:${settings.contactEmail}`} variant="secondary">
                Get in touch
              </Button>
            ) : null}
          </EmptyState>
        ) : (
          <div className="space-y-14">
            {tiers.map((group) => (
              <div key={group.tier}>
                <p className="label-mono mb-5 text-fg-faint">{group.tier}</p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {group.sponsors.map((s) => {
                    const content = (
                      <div className="flex h-28 items-center justify-center border border-border bg-bg-elevated p-6 transition-colors hover:border-border-strong">
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
    </div>
  );
}
