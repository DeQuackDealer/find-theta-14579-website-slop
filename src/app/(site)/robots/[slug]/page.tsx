import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { RobotViewer } from "@/components/robot-viewer";
import { Reveal } from "@/components/reveal";
import {
  getRobotBySlug,
  getRobotHotspots,
  getRobotImages,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const robot = await getRobotBySlug(slug);
  if (!robot) return {};
  return { title: `${robot.name} | Fleet` };
}

export default async function RobotDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const robot = await getRobotBySlug(slug);
  if (!robot) notFound();

  const [hotspots, images] = await Promise.all([
    getRobotHotspots(robot.id),
    getRobotImages(robot.id),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/robots"
        className="label-mono inline-flex items-center gap-1.5 text-fg-faint transition-colors hover:text-fg"
      >
        <ArrowLeft size={13} />
        The fleet
        <span className="text-fg-faint">
          / {robot.seasonLabel} · {robot.seasonYear}
        </span>
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-6xl leading-[0.95] tracking-tight text-fg sm:text-7xl">
            {robot.name}
          </h1>
          <p className="mt-4 text-xl italic leading-[1.15] text-fg-muted">
            {robot.tagline}
          </p>
        </div>
        <p className="label-mono pt-2 text-right text-fg-faint">
          Built for
          <br />
          {robot.competition}
        </p>
      </div>

      <Reveal className="relative mt-10 overflow-hidden rounded-xl border border-border">
        <div className="absolute left-5 top-5 z-10">
          <span className="label-mono rounded-full border border-border-strong bg-bg-elevated/80 px-3 py-1.5 text-fg-muted backdrop-blur">
            {robot.assemblyLabel}
          </span>
        </div>
        <RobotViewer
          modelUrl={robot.modelUrl}
          hotspots={hotspots}
          className="h-[420px] sm:h-[560px] lg:h-[640px]"
          showHint
        />
      </Reveal>

      {robot.summary ? (
        <Reveal className="mt-10 max-w-2xl text-base leading-relaxed text-fg-muted">
          <p>{robot.summary}</p>
        </Reveal>
      ) : null}

      {images.length > 0 ? (
        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border"
            >
              <Image
                src={img.url}
                alt={img.caption || robot.name}
                fill
                className="object-cover grayscale"
                sizes="(min-width: 640px) 33vw, 50vw"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
