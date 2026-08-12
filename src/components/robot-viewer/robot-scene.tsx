"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { buildProceduralRobot } from "./procedural-robot";
import {
  buildWireframeLook,
  recolorWireframeLook,
  fitObjectToRadius,
} from "./material-utils";
import { AmbientDust } from "./ambient-dust";
import { GltfModel } from "./gltf-model";
import { StlModel } from "./stl-model";

function isStlUrl(url: string) {
  return /\.stl(\?|$)/i.test(url);
}

function ProceduralModel({ color }: { color: string }) {
  const wireframeGroup = useMemo(() => {
    const source = buildProceduralRobot();
    // Normalised the same way as uploaded models so the camera distances
    // below frame the placeholder and a real robot identically.
    return fitObjectToRadius(buildWireframeLook(source, color));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    recolorWireframeLook(wireframeGroup, color);
  }, [wireframeGroup, color]);

  return <primitive object={wireframeGroup} />;
}

export function RobotScene({
  modelUrl,
  color,
  interactive = true,
}: {
  modelUrl?: string | null;
  color: string;
  interactive?: boolean;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleStart() {
    setAutoRotate(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
  }

  function handleEnd() {
    idleTimer.current = setTimeout(() => setAutoRotate(true), 2400);
  }

  useEffect(() => {
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <>
      <Suspense fallback={<ProceduralModel color={color} />}>
        {modelUrl ? (
          isStlUrl(modelUrl) ? (
            <StlModel url={modelUrl} color={color} />
          ) : (
            <GltfModel url={modelUrl} color={color} />
          )
        ) : (
          <ProceduralModel color={color} />
        )}
      </Suspense>
      <AmbientDust color={color} />
      <OrbitControls
        ref={controlsRef}
        enabled={interactive}
        // Models are normalised to a fixed radius, so these distances frame
        // any model consistently - from filling the view to well clear of it.
        enableZoom
        zoomSpeed={0.6}
        minDistance={1.6}
        maxDistance={9}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.7}
        onStart={handleStart}
        onEnd={handleEnd}
        makeDefault
      />
    </>
  );
}
