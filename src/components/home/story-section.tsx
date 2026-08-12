import Image from "next/image";
import {
  GearSix,
  Wrench,
  Cpu,
  Target,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { StatCounter } from "@/components/stat-counter";
import { Duotone } from "@/components/duotone";
import { GhostNumber } from "@/components/ghost-number";

const CAPABILITIES = [
  { icon: GearSix, title: "Design", desc: "Iterating mechanisms in CAD, prototype to competition-ready." },
  { icon: Wrench, title: "Fabrication", desc: "Machining, 3D printing, and assembling every part in-house." },
  { icon: Cpu, title: "Programming", desc: "Autonomous routines, teleop controls, and sensor fusion." },
  { icon: Target, title: "Strategy", desc: "Reading the field, scouting opponents, adapting match to match." },
];

export function StorySection({
  heading,
  paragraph1,
  paragraph2,
  stats,
}: {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  stats: { value: number; suffix?: string; label: string }[];
}) {
  return (
    <section
      id="story"
      className="relative isolate mx-auto max-w-7xl overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
    >
      <GhostNumber n="01" className="-top-6 right-0 sm:-top-10" />
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionLabel index="01">Philosophy</SectionLabel>
          <h2 className="text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
            {heading}
          </h2>
          <div className="mt-6 grid grid-cols-5 gap-3">
            <div className="relative col-span-3 aspect-[4/3] overflow-hidden border border-border">
              <Image
                src="https://picsum.photos/seed/find-theta-build-bench/800/600"
                alt="Team members building a robot on the workbench"
                fill
                className="object-cover grayscale"
                sizes="(min-width: 1024px) 30vw, 60vw"
              />
              <Duotone />
            </div>
            <div className="relative col-span-2 aspect-[3/4] overflow-hidden border border-border">
              <Image
                src="https://picsum.photos/seed/find-theta-field-side/500/700"
                alt="A Find Theta robot on the competition field"
                fill
                className="object-cover grayscale"
                sizes="(min-width: 1024px) 20vw, 40vw"
              />
              <Duotone />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-between gap-10">
            <div className="space-y-5 text-base leading-relaxed text-fg-muted">
              <p>{paragraph1}</p>
              <p>{paragraph2}</p>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border">
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="bg-bg p-5 transition-colors hover:bg-bg-elevated">
                  <c.icon size={20} className="mb-3 text-accent" />
                  <p className="text-base text-fg">{c.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <StatCounter key={s.label} {...s} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
