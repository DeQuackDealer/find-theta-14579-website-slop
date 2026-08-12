"use client";

import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { STLLoader } from "three-stdlib";
import * as THREE from "three";
import { buildWireframeLook, recolorWireframeLook } from "./material-utils";

/**
 * STL carries no scene graph or unit metadata - just raw geometry, often
 * exported in mm straight out of CAD. Normalize to a consistent on-screen
 * size (matching the ~1.3-scale procedural placeholder) instead of trusting
 * the file's native units.
 */
export function StlModel({ url, color }: { url: string; color: string }) {
  const geometry = useLoader(STLLoader, url);

  const wireframeGroup = useMemo(() => {
    geometry.computeBoundingBox();
    const size = new THREE.Vector3();
    geometry.boundingBox?.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.8 / maxDim;

    const mesh = new THREE.Mesh(geometry);
    mesh.scale.setScalar(scale);
    const group = new THREE.Group();
    group.add(mesh);
    return buildWireframeLook(group, color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geometry]);

  useEffect(() => {
    recolorWireframeLook(wireframeGroup, color);
  }, [wireframeGroup, color]);

  return (
    <Center>
      <primitive object={wireframeGroup} />
    </Center>
  );
}
