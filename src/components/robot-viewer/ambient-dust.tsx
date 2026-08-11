"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Point positions are randomized once after mount (not during render, which
// must stay pure) via a ref + effect rather than useMemo(() => ..., []).
export function AmbientDust({ color, count = 380 }: { color: string; count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.6;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    geometryRef.current?.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometryRef.current?.computeBoundingSphere();
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        color={color}
        size={0.011}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}
