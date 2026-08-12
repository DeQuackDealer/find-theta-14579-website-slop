import * as THREE from "three";

/** Roughly how many triangles before a full wireframe turns into solid mush. */
const DENSE_TRIANGLE_THRESHOLD = 60_000;
/** Beyond this, even crease edges need thinning or clusters go solid white. */
const VERY_DENSE_TRIANGLE_THRESHOLD = 250_000;
/**
 * Budgets for the whole model, shared out evenly between its parts. The even
 * share is what stops one very dense part (an omni wheel is typically dozens
 * of curved rollers) from swamping the chassis it is bolted to.
 *
 * These must not be flat per-part ceilings. CAD is frequently exported as a
 * single merged mesh, and a flat ceiling then applies to the entire robot at
 * once, leaving it as scattered debris rather than a model. The floors keep
 * individual parts usable when a model is split into very many pieces.
 */
const MAX_POINTS = 50_000;
const MAX_EDGE_SEGMENTS = 80_000;
const MIN_POINTS_PER_PART = 200;
const MIN_EDGE_SEGMENTS_PER_PART = 400;

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
  const meshCount = Math.max(1, countMeshes(source));
  const pointBudget = Math.max(MIN_POINTS_PER_PART, Math.floor(MAX_POINTS / meshCount));
  const edgeBudget = Math.max(
    MIN_EDGE_SEGMENTS_PER_PART,
    Math.floor(MAX_EDGE_SEGMENTS / meshCount),
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
      thinEdges(new THREE.EdgesGeometry(geometry, detail.edgeThreshold), edgeBudget),
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: detail.edgeOpacity,
      }),
    );
    edgeLines.applyMatrix4(matrix);
    group.add(edgeLines);

    const points = new THREE.Points(
      buildSurfacePoints(geometry, pointBudget),
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
 * Scatters points across the mesh surface, weighted by triangle area.
 *
 * Sampling the vertex buffer instead would follow geometric detail rather
 * than surface area, which on CAD is badly misleading: a large flat panel is
 * a handful of big triangles (fewer still after decimation, which collapses
 * coplanar regions on purpose) while a wheel of the same on-screen size is
 * thousands of small ones. Vertex sampling therefore leaves big flat parts
 * almost empty - a chassis plate reads as a hole between the parts bolted to
 * it - and piles points onto the busy areas.
 *
 * Area weighting gives even coverage, so each part's density reflects how
 * much of the robot it actually occupies.
 */
function buildSurfacePoints(geometry: THREE.BufferGeometry, budget: number) {
  const pos = geometry.attributes.position;
  const index = geometry.index;
  const triangles = index ? index.count / 3 : pos.count / 3;
  if (triangles < 1) return new THREE.BufferGeometry();

  const vertexOf = (t: number, corner: number) =>
    index ? index.getX(t * 3 + corner) : t * 3 + corner;

  // Cumulative areas, so a triangle can be picked with probability
  // proportional to its area via one binary search per sample.
  const cumulative = new Float64Array(triangles);
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const ab = new THREE.Vector3();
  const ac = new THREE.Vector3();
  const cross = new THREE.Vector3();

  let total = 0;
  for (let t = 0; t < triangles; t++) {
    a.fromBufferAttribute(pos, vertexOf(t, 0));
    b.fromBufferAttribute(pos, vertexOf(t, 1));
    c.fromBufferAttribute(pos, vertexOf(t, 2));
    ab.subVectors(b, a);
    ac.subVectors(c, a);
    total += cross.crossVectors(ab, ac).length() * 0.5;
    cumulative[t] = total;
  }

  const g = new THREE.BufferGeometry();
  if (total <= 0 || !Number.isFinite(total)) return g;

  const out = new Float32Array(budget * 3);
  let o = 0;

  for (let i = 0; i < budget; i++) {
    const target = Math.random() * total;
    let lo = 0;
    let hi = triangles - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cumulative[mid] < target) lo = mid + 1;
      else hi = mid;
    }

    a.fromBufferAttribute(pos, vertexOf(lo, 0));
    b.fromBufferAttribute(pos, vertexOf(lo, 1));
    c.fromBufferAttribute(pos, vertexOf(lo, 2));

    ab.subVectors(b, a);
    ac.subVectors(c, a);

    // Uniform barycentric coordinates: reflecting the far half of the unit
    // square back into the triangle keeps the distribution even.
    let u = Math.random();
    let v = Math.random();
    if (u + v > 1) {
      u = 1 - u;
      v = 1 - v;
    }

    out[o++] = a.x + ab.x * u + ac.x * v;
    out[o++] = a.y + ab.y * u + ac.y * v;
    out[o++] = a.z + ab.z * u + ac.z * v;
  }

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
