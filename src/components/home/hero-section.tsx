import { RobotViewer } from "@/components/robot-viewer";
import { Button } from "@/components/ui/button";
import { HudStatus } from "@/components/hud-status";
import { Ticker } from "@/components/ticker";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const TICKER_ITEMS = [
  "Build",
  "Test",
  "Break",
  "Iterate",
  "Compete",
  { label: "Learn faster", accent: true },
  "Ship",
  "Find Theta",
];

export function HeroSection({
  teamNumber,
  location,
  tagline,
}: {
  teamNumber: string;
  location: string;
  tagline: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute right-0 top-0 h-[480px] w-[640px] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at top right, color-mix(in srgb, var(--accent) 14%, transparent), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <HudStatus teamNumber={teamNumber} location={location} />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div>
          <h1 className="text-6xl leading-[0.95] tracking-tight text-fg sm:text-7xl lg:text-[5.5rem]">
            <span className="block">FIND</span>
            <span className="block">
              TH<span className="italic text-accent">eta</span>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-fg-muted">
            {tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/robots" variant="primary">
              Meet the flock
              <ArrowRight size={15} />
            </Button>
            <Button href="/#story" variant="secondary">
              Our story
            </Button>
          </div>
        </div>

        <div className="corner-ticks relative h-[380px] border border-border sm:h-[460px] lg:h-[560px]">
          <RobotViewer className="h-full w-full" showHint />
        </div>
      </div>

      <Ticker items={TICKER_ITEMS} />
    </section>
  );
}
