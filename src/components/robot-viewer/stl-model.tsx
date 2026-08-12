"use client";

import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three-stdlib";
import * as THREE from "three";
import {
  buildWireframeLook,
  recolorWireframeLook,
  fitObjectToRadius,
} from "./material-utils";

/**
 * STL carries no scene graph or unit metadata - just raw geometry, usually
 * exported in millimetres straight out of CAD - so it is normalised to the
 * same on-screen size as every other model rather than trusting the file.
 */
export function StlModel({
  url,
  color,
  onReady,
}: {
  url: string;
  color: string;
  onReady?: () => void;
}) {
  const geometry = useLoader(STLLoader, url);

  const fitted = useMemo(() => {
    const mesh = new THREE.Mesh(geometry);
    const group = new THREE.Group();
    group.add(mesh);
    return fitObjectToRadius(buildWireframeLook(group, color));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geometry]);

  useEffect(() => {
    recolorWireframeLook(fitted, color);
  }, [fitted, color]);

  // Runs once the geometry above has been built, which is the expensive part
  // and happens well after the download itself finishes.
  useEffect(() => {
    onReady?.();
  }, [fitted, onReady]);

  return <primitive object={fitted} />;
}
