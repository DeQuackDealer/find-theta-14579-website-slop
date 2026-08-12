"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import {
  buildWireframeLook,
  recolorWireframeLook,
  fitObjectToRadius,
} from "./material-utils";

export function GltfModel({
  url,
  color,
  onReady,
}: {
  url: string;
  color: string;
  onReady?: () => void;
}) {
  const { scene } = useGLTF(url);

  const fitted = useMemo(
    () => fitObjectToRadius(buildWireframeLook(scene, color)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scene],
  );

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
