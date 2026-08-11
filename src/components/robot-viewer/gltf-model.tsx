"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { buildWireframeLook, recolorWireframeLook } from "./material-utils";

export function GltfModel({ url, color }: { url: string; color: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  const wireframeGroup = useMemo(
    () => buildWireframeLook(scene, color),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scene],
  );

  useEffect(() => {
    recolorWireframeLook(wireframeGroup, color);
  }, [wireframeGroup, color]);

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={wireframeGroup} />
      </group>
    </Center>
  );
}
