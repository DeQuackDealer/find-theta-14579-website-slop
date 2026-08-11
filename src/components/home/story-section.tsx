import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";

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
    <section id="story" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
            {heading}
          </h2>
          <div className="mt-6 grid grid-cols-5 gap-3">
            <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-lg border border-border">
              <Image
                src="https://picsum.photos/seed/find-theta-build-bench/800/600"
                alt="Team members building a robot on the workbench"
                fill
                className="object-cover grayscale"
                sizes="(min-width: 1024px) 30vw, 60vw"
              />
            </div>
            <div className="relative col-span-2 aspect-[3/4] overflow-hidden rounded-lg border border-border">
              <Image
                src="https://picsum.photos/seed/find-theta-field-side/500/700"
                alt="A Find Theta robot on the competition field"
                fill
                className="object-cover grayscale"
                sizes="(min-width: 1024px) 20vw, 40vw"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-between gap-10">
            <div className="space-y-5 text-base leading-relaxed text-fg-muted">
              <p>{paragraph1}</p>
              <p>{paragraph2}</p>
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
