"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { buildProceduralRobot } from "./procedural-robot";
import { buildWireframeLook, recolorWireframeLook } from "./material-utils";
import { AmbientDust } from "./ambient-dust";
import { GltfModel } from "./gltf-model";
import { StlModel } from "./stl-model";

function isStlUrl(url: string) {
  return /\.stl(\?|$)/i.test(url);
}

function ProceduralModel({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  const wireframeGroup = useMemo(() => {
    const source = buildProceduralRobot();
    return buildWireframeLook(source, color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    recolorWireframeLook(wireframeGroup, color);
  }, [wireframeGroup, color]);

  return (
    <group ref={groupRef} scale={1.3}>
      <primitive object={wireframeGroup} />
    </group>
  );
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
        enableZoom={false}
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
