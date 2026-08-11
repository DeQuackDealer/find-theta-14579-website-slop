import { RobotViewer } from "@/components/robot-viewer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

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
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-14 pb-16 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pt-16">
      <div>
        <p className="label-mono mb-6 text-fg-faint">
          FTC TEAM {teamNumber}
          {location ? <span className="text-fg-faint"> · {location}</span> : null}
        </p>
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
            Meet the fleet
            <ArrowRight size={15} />
          </Button>
          <Button href="/#story" variant="secondary">
            Our story
          </Button>
        </div>
      </div>

      <div className="relative h-[380px] sm:h-[460px] lg:h-[560px]">
        <RobotViewer className="h-full w-full" showHint />
      </div>
    </section>
  );
}
