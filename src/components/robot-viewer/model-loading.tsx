"use client";

import { useProgress } from "@react-three/drei";

/**
 * Overlay shown while a real model downloads and is processed.
 *
 * A dense CAD export spends most of its load time after the bytes arrive -
 * decoding the mesh and building edge geometry - so progress sits at 100%
 * for a while before the model appears. The bar reflects download, and the
 * status line stays up until the scene is actually ready.
 */
export function ModelLoading({ progress }: { progress: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div className="label-mono flex items-center gap-2 text-fg-faint">
        <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
        {progress < 100 ? "Loading model" : "Building geometry"}
      </div>
      <div className="h-px w-40 overflow-hidden bg-border">
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${Math.max(4, progress)}%` }}
        />
      </div>
    </div>
  );
}

/** Reads drei's shared loading store; safe to call outside the Canvas. */
export function useModelProgress() {
  const { active, progress } = useProgress();
  return { active, progress };
}
