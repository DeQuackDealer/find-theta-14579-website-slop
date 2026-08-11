"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { RobotScene } from "./robot-scene";
import { HotspotPins, type Hotspot } from "./hotspot-pins";
import { cn } from "@/lib/utils";

function useFgColor() {
  const [color, setColor] = useState("#f4f3ef");

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

  return (
    <div className={cn("relative", className)}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [2.6, 1.4, 2.6], fov: 34 }}
        dpr={[1, 1.8]}
      >
        <RobotScene modelUrl={modelUrl} color={color} interactive={interactive} />
      </Canvas>
      {hotspots.length > 0 ? <HotspotPins hotspots={hotspots} /> : null}
      {showHint && interactive ? (
        <div className="label-mono pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-fg-faint">
          drag to rotate
        </div>
      ) : null}
    </div>
  );
}
