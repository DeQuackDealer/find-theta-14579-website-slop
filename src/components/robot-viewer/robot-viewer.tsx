"use client";

import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useState } from "react";
import { RobotScene } from "./robot-scene";
import { HotspotPins, type Hotspot } from "./hotspot-pins";
import { ModelLoading, useModelProgress } from "./model-loading";
import { cn } from "@/lib/utils";

function useFgColor() {
  // Matches the default (Paper) palette's --fg so the first frame renders
  // correctly before the effect below reads the real computed value.
  const [color, setColor] = useState("#14130f");

  useEffect(() => {
    function read() {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--fg")
        .trim();
      if (value) setColor(value);
    }
    read();
    window.addEventListener("palette-change", read);
    return () => window.removeEventListener("palette-change", read);
  }, []);

  return color;
}

export function RobotViewer({
  modelUrl,
  hotspots = [],
  className,
  showHint = true,
  interactive = true,
}: {
  modelUrl?: string | null;
  hotspots?: Hotspot[];
  className?: string;
  showHint?: boolean;
  interactive?: boolean;
}) {
  const color = useFgColor();
  const { progress } = useModelProgress();

  // Tracks which URL finished, rather than a boolean that would need
  // resetting whenever the model changes: switching robots makes this
  // mismatch on its own, so loading falls out of the comparison.
  const [readyUrl, setReadyUrl] = useState<string | null>(null);
  const handleReady = useCallback(() => setReadyUrl(modelUrl ?? null), [modelUrl]);

  // Only a real model has a loading phase worth showing. Without one the
  // procedural robot is the intended content, not a placeholder for
  // something still arriving.
  const loading = Boolean(modelUrl) && readyUrl !== modelUrl;

  return (
    <div className={cn("relative", className)}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [2.6, 1.4, 2.6], fov: 34 }}
        dpr={[1, 1.8]}
      >
        <RobotScene
          modelUrl={modelUrl}
          color={color}
          interactive={interactive}
          onModelReady={handleReady}
        />
      </Canvas>

      {loading ? <ModelLoading progress={progress} /> : null}

      {hotspots.length > 0 && !loading ? <HotspotPins hotspots={hotspots} /> : null}
      {showHint && interactive && !loading ? (
        <div className="label-mono pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-fg-faint">
          drag to rotate
        </div>
      ) : null}
    </div>
  );
}
