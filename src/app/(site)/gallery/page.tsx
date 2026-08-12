import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { Duotone } from "@/components/duotone";
import { cn } from "@/lib/utils";
import { getGalleryImages, getSettings } from "@/lib/db/queries";
import { resolveCopy } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: "Gallery",
};

export const dynamic = "force-dynamic";

const PLACEHOLDER_ASPECTS = [
  "aspect-square",
  "aspect-[4/5]",
  "aspect-video",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-video",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
];

export default async function GalleryPage() {
  const [images, settings] = await Promise.all([
    getGalleryImages(),
    getSettings(),
  ]);
  const copy = resolveCopy(settings);

  return (
    <div>
      <PageHeader
        eyebrow="05 / Gallery"
        title={
          <>
            From the build room,
            <br />
            <em className="text-accent not-italic">to the field.</em>
          </>
        }
        meta={[
          { label: "Photos", value: String(images.length) },
          { label: "Updated", value: "Live" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {images.length === 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {PLACEHOLDER_ASPECTS.map((aspect, i) => (
                <div
                  key={i}
                  className={cn(
                    "group relative overflow-hidden border border-border bg-bg-elevated",
                    aspect,
                    i === 0 && "col-span-2 row-span-2 aspect-square md:col-span-2",
                  )}
                >
                  <div className="grid-bg-fine absolute inset-0 opacity-40" />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background:
                        i % 3 === 0
                          ? "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--accent) 60%, transparent), transparent 60%)"
                          : "none",
                    }}
                  />
                  <div className="label-mono absolute left-3 top-3 text-fg-faint/80">
                    IMG_{String(i + 1).padStart(3, "0")}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 60 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1}
                      className="w-16 text-border-strong transition-colors group-hover:text-border md:w-20"
                    >
                      <rect x="2" y="6" width="56" height="32" />
                      <circle cx="30" cy="22" r="8" />
                      <circle cx="30" cy="22" r="3" />
                      <path d="M22 2h-6v6M38 2h6v6" />
                    </svg>
                  </div>
                  <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
                    <div className="label-mono text-fg-faint/60">Pending upload</div>
                    <div className="label-mono tabular-nums text-fg-faint/60">
                      {String(i + 1).padStart(3, "0")} / 000
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <EmptyState
              tag="Gallery queue"
              title="The archive will grow with the season."
              className="mt-16 max-w-3xl md:mt-20"
            >
              <p>{copy.galleryEmpty}</p>
            </EmptyState>
          </>
        ) : (
          <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
            {images.map((img, i) => (
              <div
                key={img.id}
                className="mb-3 break-inside-avoid border border-border"
              >
                <div className="relative overflow-hidden">
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
                  <Duotone />
                </div>
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
