"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import {
  buildWireframeLook,
  recolorWireframeLook,
  fitObjectToRadius,
} from "./material-utils";

export function GltfModel({ url, color }: { url: string; color: string }) {
  const { scene } = useGLTF(url);

  const fitted = useMemo(
    () => fitObjectToRadius(buildWireframeLook(scene, color)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scene],
  );

  useEffect(() => {
    recolorWireframeLook(fitted, color);
  }, [fitted, color]);

  return <primitive object={fitted} />;
}
