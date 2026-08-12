import * as THREE from "three";

/** Roughly how many triangles before a full wireframe turns into solid mush. */
const DENSE_TRIANGLE_THRESHOLD = 60_000;
/** Beyond this, even crease edges need thinning or clusters go solid white. */
const VERY_DENSE_TRIANGLE_THRESHOLD = 250_000;
/** Upper bound on rendered points across the whole model. */
const MAX_POINTS = 50_000;
/**
 * Per-part ceilings. Without these, one very dense part (an omni wheel is
 * typically dozens of curved rollers) consumes the whole budget and renders
 * as a solid cluster, while the chassis it is bolted to renders as a few
 * faint lines. Capping per part keeps the visual weight of each part related
 * to its size on screen rather than to its polygon count.
 */
const MAX_POINTS_PER_PART = 3_500;
const MAX_EDGE_SEGMENTS_PER_PART = 9_000;

/**
 * Detail treatment for a given mesh density. Parts like omni-wheel rollers
 * carry enormous crease counts for their on-screen size, so past a point the
 * only way to keep them readable is to raise the angle at which an edge is
 * considered structural and let the fine detail drop out.
 */
function detailFor(triangles: number) {
  if (triangles > VERY_DENSE_TRIANGLE_THRESHOLD) {
    return { wireframe: false, edgeThreshold: 68, edgeOpacity: 0.24, pointOpacity: 0.4, pointSize: 0.006 };
  }
  if (triangles > DENSE_TRIANGLE_THRESHOLD) {
    return { wireframe: false, edgeThreshold: 50, edgeOpacity: 0.32, pointOpacity: 0.55, pointSize: 0.008 };
  }
  return { wireframe: true, edgeThreshold: 25, edgeOpacity: 0.45, pointOpacity: 0.75, pointSize: 0.013 };
}

function countTriangles(source: THREE.Object3D) {
  let total = 0;
  source.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const geometry = child.geometry as THREE.BufferGeometry;
    const position = geometry?.attributes?.position;
    if (!position) return;
    total += geometry.index ? geometry.index.count / 3 : position.count / 3;
  });
  return total;
}

/**
 * Rebuilds any mesh hierarchy (procedural primitives or a loaded CAD export)
 * into the site's signature look: crisp edge lines plus a sampled point cloud,
 * with a faint wireframe fill only where the model is sparse enough for it to
 * read as structure rather than noise.
 *
 * CAD exports are dense - tens or hundreds of thousands of triangles - and
 * drawing every triangle edge at that density produces a solid white blob.
 * So the treatment adapts: denser models drop the wireframe fill and raise
 * the crease angle so only real edges survive, which is both far more legible
 * and much cheaper to build.
 */
export function buildWireframeLook(source: THREE.Object3D, color: string) {
  const group = new THREE.Group();
  const triangles = countTriangles(source);
  const detail = detailFor(triangles);
  const dense = !detail.wireframe;
  const pointBudget = Math.min(
    MAX_POINTS_PER_PART,
    Math.max(1, Math.floor(MAX_POINTS / Math.max(1, countMeshes(source)))),
  );

  source.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const geometry = child.geometry as THREE.BufferGeometry;
    if (!geometry?.attributes?.position) return;

    // World transform, so nested CAD assemblies keep their layout.
    child.updateWorldMatrix(true, false);
    const matrix = child.matrixWorld.clone();

    if (detail.wireframe) {
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
      wireMesh.applyMatrix4(matrix);
      group.add(wireMesh);
    }

    const edgeLines = new THREE.LineSegments(
      thinEdges(
        new THREE.EdgesGeometry(geometry, detail.edgeThreshold),
        MAX_EDGE_SEGMENTS_PER_PART,
      ),
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: detail.edgeOpacity,
      }),
    );
    edgeLines.applyMatrix4(matrix);
    group.add(edgeLines);

    const points = new THREE.Points(
      buildSampledPoints(geometry, pointBudget, dense),
      new THREE.PointsMaterial({
        color,
        size: detail.pointSize,
        transparent: true,
        opacity: detail.pointOpacity,
        sizeAttenuation: true,
      }),
    );
    points.applyMatrix4(matrix);
    group.add(points);
  });

  return group;
}

/**
 * Caps the number of line segments in an edges geometry by keeping every Nth
 * segment. Strides over whole segments (pairs of vertices) rather than raw
 * vertices, so every retained line keeps both of its endpoints instead of
 * degenerating into a dangling point.
 */
function thinEdges(edges: THREE.BufferGeometry, maxSegments: number) {
  const pos = edges.attributes.position;
  const segments = pos.count / 2;
  if (segments <= maxSegments) return edges;

  const stride = Math.ceil(segments / maxSegments);
  const kept = Math.ceil(segments / stride);
  const out = new Float32Array(kept * 2 * 3);

  let o = 0;
  for (let s = 0; s < segments; s += stride) {
    const a = s * 2;
    const b = a + 1;
    out[o++] = pos.getX(a); out[o++] = pos.getY(a); out[o++] = pos.getZ(a);
    out[o++] = pos.getX(b); out[o++] = pos.getY(b); out[o++] = pos.getZ(b);
  }

  const thinned = new THREE.BufferGeometry();
  thinned.setAttribute("position", new THREE.BufferAttribute(out.subarray(0, o), 3));
  // The full-resolution geometry is not retained anywhere else.
  edges.dispose();
  return thinned;
}

function countMeshes(source: THREE.Object3D) {
  let n = 0;
  source.traverse((child) => {
    if (child instanceof THREE.Mesh) n++;
  });
  return n;
}

/**
 * Evenly strides across the vertex buffer up to `budget` points. Taking every
 * vertex on a dense export costs a great deal of memory for points that land
 * on top of each other on screen anyway.
 */
function buildSampledPoints(
  geometry: THREE.BufferGeometry,
  budget: number,
  dense: boolean,
) {
  const pos = geometry.attributes.position;
  const count = pos.count;
  const stride = Math.max(1, Math.ceil(count / budget));
  const sampled = Math.ceil(count / stride);

  // Sparse models (the procedural placeholder) look richer with a jittered
  // second pass; dense ones already have plenty of points.
  const copies = !dense && sampled < 400 ? 2 : 1;
  const out = new Float32Array(sampled * copies * 3);

  let o = 0;
  for (let c = 0; c < copies; c++) {
    const jitter = c === 0 ? 0 : 0.015;
    for (let i = 0; i < count; i += stride) {
      out[o++] = pos.getX(i) + (Math.random() - 0.5) * jitter;
      out[o++] = pos.getY(i) + (Math.random() - 0.5) * jitter;
      out[o++] = pos.getZ(i) + (Math.random() - 0.5) * jitter;
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(out.subarray(0, o), 3));
  return g;
}

/**
 * Wraps an object so it sits centred on the origin at a consistent on-screen
 * size. CAD exports carry no unit convention - a millimetre export arrives
 * hundreds of times too large - so the camera can only frame them reliably
 * once the model is normalised.
 *
 * Returns a new wrapper rather than mutating transforms in place: the offset
 * is applied to the child in its own units and the scale to the parent, which
 * keeps the two from compounding.
 */
export function fitObjectToRadius(object: THREE.Object3D, radius = 1.1) {
  const box = new THREE.Box3().setFromObject(object);
  const wrapper = new THREE.Group();
  if (box.isEmpty()) {
    wrapper.add(object);
    return wrapper;
  }

  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  object.position.sub(center);
  wrapper.add(object);

  if (maxDim > 0 && Number.isFinite(maxDim)) {
    wrapper.scale.setScalar((radius * 2) / maxDim);
  }
  return wrapper;
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
