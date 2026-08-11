import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { getGalleryImages } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Gallery",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div>
      <PageHeader
        eyebrow="Gallery"
        title={`${images.length} moments from the pits, the field, and the road.`}
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {images.length === 0 ? (
          <EmptyState tag="Pending · album is empty">
            <p>No photos yet. Our first competition album lands here.</p>
          </EmptyState>
        ) : (
          <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
            {images.map((img, i) => (
              <div
                key={img.id}
                className="relative mb-3 break-inside-avoid overflow-hidden border border-border"
              >
                <span className="label-mono absolute left-3 top-3 z-10 bg-bg/70 px-1.5 py-0.5 text-fg-faint backdrop-blur">
                  {String(i + 1).padStart(3, "0")}
                </span>
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
    </div>
  );
}
