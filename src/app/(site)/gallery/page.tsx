import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { getGalleryImages } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Gallery",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="label-mono mb-4 text-fg-faint">Gallery</p>
        <h1 className="max-w-2xl text-4xl leading-tight tracking-tight text-fg sm:text-5xl">
          {images.length} moments from the pits, the field, and the road.
        </h1>
      </Reveal>

      {images.length === 0 ? (
        <div className="mt-16 rounded-lg border border-dashed border-border p-12 text-center text-fg-faint">
          No photos yet. Our first competition album lands here.
        </div>
      ) : (
        <div className="mt-14 columns-1 gap-3 sm:columns-2 lg:columns-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="mb-3 break-inside-avoid overflow-hidden rounded-lg border border-border"
            >
              <Image
                src={img.url}
                alt={img.caption || "Team photo"}
                width={700}
                height={500}
                className="h-auto w-full object-cover grayscale"
              />
              {img.caption ? (
                <p className="px-3 py-2 text-xs text-fg-faint">{img.caption}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
