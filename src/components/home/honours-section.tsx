import { Star } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { EmptyState } from "@/components/empty-state";
import type { achievements as achievementsTable } from "@/lib/db/schema";

type Achievement = typeof achievementsTable.$inferSelect;

export function HonoursSection({
  achievements,
  count,
}: {
  achievements: Achievement[];
  count: number;
}) {
  return (
    <section id="awards" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <SectionLabel index="03">Record book</SectionLabel>
          <p className="font-mono text-5xl text-fg sm:text-6xl">{count}+</p>
          <p className="mt-2 max-w-xs text-base text-fg-muted">
            Awards earned across our seasons so far.
          </p>
          {achievements.some((a) => a.standout) ? (
            <p className="mt-6 flex items-center gap-1.5 text-xs text-fg-faint">
              <Star size={12} weight="fill" className="text-accent" />
              standout achievements
            </p>
          ) : null}
        </Reveal>

        {achievements.length > 0 ? (
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {achievements.map((a, i) => (
              <Reveal key={a.id} delay={Math.min(i * 0.04, 0.3)} className="bg-bg p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="label-mono text-fg-faint">{a.seasonYear}</span>
                  {a.standout ? (
                    <Star size={13} weight="fill" className="shrink-0 text-accent" />
                  ) : null}
                </div>
                <p className="mt-3 text-lg text-fg">{a.competition}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  {a.description}
                </p>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState tag="Awaiting first result">
            <p>
              Our first awards are still ahead of us. Check back after the
              next competition.
            </p>
          </EmptyState>
        )}
      </div>
    </section>
  );
}
