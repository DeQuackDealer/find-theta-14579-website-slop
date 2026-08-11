import * as THREE from "three";

/**
 * Rebuilds any mesh hierarchy (procedural primitives or a loaded GLTF) into
 * the site's signature look: faint wireframe fill + crisp edge lines +
 * a jittered point cloud sampled from each mesh's vertices. Used for both
 * the procedural placeholder robot and real uploaded CAD exports so the
 * two paths render identically.
 */
export function buildWireframeLook(source: THREE.Object3D, color: string) {
  const group = new THREE.Group();

  source.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const geometry = child.geometry as THREE.BufferGeometry;
    if (!geometry?.attributes?.position) return;

    const transform = { position: child.position, rotation: child.rotation, scale: child.scale };

    const wireMesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      }),
    );
    applyTransform(wireMesh, transform);
    group.add(wireMesh);

    const edgeLines = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry, 25),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45 }),
    );
    applyTransform(edgeLines, transform);
    group.add(edgeLines);

    const points = new THREE.Points(
      buildJitteredPoints(geometry),
      new THREE.PointsMaterial({
        color,
        size: 0.013,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
      }),
    );
    applyTransform(points, transform);
    group.add(points);
  });

  return group;
}

function applyTransform(
  obj: THREE.Object3D,
  t: { position: THREE.Vector3; rotation: THREE.Euler; scale: THREE.Vector3 },
) {
  obj.position.copy(t.position);
  obj.rotation.copy(t.rotation);
  obj.scale.copy(t.scale);
}

function buildJitteredPoints(geometry: THREE.BufferGeometry) {
  const pos = geometry.attributes.position;
  const count = pos.count;
  const copies = count > 400 ? 1 : 2;
  const out = new Float32Array(count * copies * 3);
  let o = 0;
  for (let c = 0; c < copies; c++) {
    const jitter = c === 0 ? 0 : 0.015;
    for (let i = 0; i < count; i++) {
      out[o++] = pos.getX(i) + (Math.random() - 0.5) * jitter;
      out[o++] = pos.getY(i) + (Math.random() - 0.5) * jitter;
      out[o++] = pos.getZ(i) + (Math.random() - 0.5) * jitter;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(out, 3));
  return g;
}

/** Recolors an already-built wireframe-look group in place (palette swap). */
export function recolorWireframeLook(group: THREE.Object3D, color: string) {
  group.traverse((child) => {
    if (
      child instanceof THREE.Mesh ||
      child instanceof THREE.LineSegments ||
      child instanceof THREE.Points
    ) {
      const material = child.material as THREE.Material & { color?: THREE.Color };
      material.color?.set(color);
    }
  });
}
