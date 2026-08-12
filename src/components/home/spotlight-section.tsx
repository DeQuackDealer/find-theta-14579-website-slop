import Image from "next/image";
import { Lightning } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { Duotone } from "@/components/duotone";

export function SpotlightSection() {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden sm:h-[70vh]">
      <Image
        src="https://picsum.photos/seed/find-theta-competition-floor/1800/1100"
        alt="Find Theta drive team at the competition field"
        fill
        className="object-cover grayscale"
        sizes="100vw"
      />
      <Duotone />
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
      <Reveal className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-8 sm:pb-14">
        <div className="mx-auto max-w-7xl">
          <p className="label-mono mb-4 flex items-center gap-2 text-accent">
            <Lightning size={13} weight="fill" />
            On the field
          </p>
          <p className="text-2xl leading-tight text-fg sm:text-4xl">
            Every match is a chance to <em className="italic">learn faster.</em>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
