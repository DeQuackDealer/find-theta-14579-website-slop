import Image from "next/image";
import type { Metadata } from "next";
import {
  Wrench,
  Cpu,
  GearSix,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { getSponsors, getSettings } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Sponsors",
};

export const dynamic = "force-dynamic";

const TIER_ORDER = ["Title", "Gold", "Supporting"];

const FUNDS = [
  { icon: Wrench, label: "Parts & materials", detail: "Aluminum extrusion, fasteners, polycarbonate, 3D printer filament." },
  { icon: Cpu, label: "Electronics & sensors", detail: "Control hubs, motors, servos, cameras, and drivetrain electronics." },
  { icon: GearSix, label: "Tools & equipment", detail: "Shop tools, a 3D printer, test rigs, and maintenance supplies." },
  { icon: Lightning, label: "Competition travel", detail: "Registration fees, transport, accommodation, and field access." },
];

export default async function SponsorsPage() {
  const [sponsors, settings] = await Promise.all([getSponsors(), getSettings()]);

  const tiers = TIER_ORDER.map((tier) => ({
    tier,
    sponsors: sponsors.filter((s) => s.tier === tier),
  })).filter((t) => t.sponsors.length > 0);

  return (
    <div>
      <PageHeader
        eyebrow="07 / Sponsors"
        title={
          <>
            A community team,
            <br />
            <em className="text-accent not-italic">backed by people who believe in it.</em>
          </>
        }
        subtitle="Robotics isn't cheap. Every part, tool, and trip to competition is funded through sponsorship. If you or your organisation want in, we'd love to talk."
        meta={[
          { label: "Sponsors", value: String(sponsors.length) },
          { label: "Status", value: sponsors.length > 0 ? "Active" : "Recruiting" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {tiers.length === 0 ? (
          <EmptyState tag="Sponsor roster · open" title="Want to be the first name on this wall?">
            <p>
              We are building our sponsor roster for this season. Whether
              you&rsquo;re a local business, a family friend, or an
              organisation that believes in student engineering, there&rsquo;s
              a place for you here.
            </p>
            {settings.contactEmail ? (
              <Button href={`mailto:${settings.contactEmail}?subject=Sponsorship`} variant="secondary">
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

        <div className="mt-16 md:mt-20">
          <p className="label-mono mb-6 flex items-center gap-3 text-fg-faint">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Where the money goes
          </p>
          <h3 className="mb-10 max-w-2xl text-2xl font-semibold tracking-tight text-fg md:text-4xl">
            100% of sponsorship goes directly to the robot and the team.
          </h3>
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {FUNDS.map((f) => (
              <div key={f.label} className="bg-bg p-6 transition-colors hover:bg-bg-elevated md:p-7">
                <f.icon size={26} className="mb-4 text-accent" />
                <p className="mb-2 text-lg font-medium text-fg">{f.label}</p>
                <p className="text-sm leading-relaxed text-fg-muted">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border border-border bg-bg-elevated p-8 md:mt-20 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-2xl">
            <p className="label-mono mb-3 text-accent">Not cash? No problem.</p>
            <h3 className="text-2xl font-semibold tracking-tight text-fg md:text-3xl">
              We also welcome in-kind donations: parts, 3D printing filament,
              tools, mentorship time, or machine shop access.
            </h3>
          </div>
          {settings.contactEmail ? (
            <Button
              href={`mailto:${settings.contactEmail}?subject=In-kind donation`}
              variant="secondary"
              className="shrink-0"
            >
              Offer in-kind
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
