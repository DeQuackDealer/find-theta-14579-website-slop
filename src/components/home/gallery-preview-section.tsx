import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import type { galleryImages as galleryTable } from "@/lib/db/schema";

type GalleryImage = typeof galleryTable.$inferSelect;

export function GalleryPreviewSection({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;
  const preview = images.slice(0, 5);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionLabel>Gallery</SectionLabel>
        <h2 className="max-w-xl text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Moments from the pits, the field, and the road.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <Link
          href="/gallery"
          className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-2 sm:auto-rows-[12rem] sm:grid-cols-4 sm:gap-3"
        >
          {preview.map((img, i) => (
            <div
              key={img.id}
              className={`relative overflow-hidden rounded-lg border border-border ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={img.url}
                alt={img.caption || "Team photo"}
                fill
                className="object-cover grayscale transition-transform duration-500 hover:scale-105"
                sizes="(min-width: 640px) 25vw, 50vw"
              />
            </div>
          ))}
          <div className="relative flex items-center justify-center overflow-hidden rounded-lg border border-border bg-bg-elevated">
            <div className="text-center">
              <p className="font-mono text-2xl text-fg">{images.length}</p>
              <p className="label-mono mt-1 text-fg-faint">view all</p>
            </div>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
