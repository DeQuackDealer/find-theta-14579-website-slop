import * as THREE from "three";

/**
 * Builds a placeholder robot silhouette for the hero/detail viewers when a
 * robot has no uploaded .glb yet (see /admin). Proportioned loosely after
 * an FTC drivetrain-plus-arm chassis, with the arm curving up and out like
 * an ibis's neck and beak so the placeholder still reads as "on brand"
 * before real CAD exports are uploaded.
 */
export function buildProceduralRobot() {
  const root = new THREE.Group();

  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.16, 1.5, 6, 1, 6));
  chassis.position.set(0, -0.5, 0);
  root.add(chassis);

  const wheelPositions: [number, number][] = [
    [0.72, 0.62],
    [-0.72, 0.62],
    [0.72, -0.62],
    [-0.72, -0.62],
  ];
  for (const [x, z] of wheelPositions) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.16, 14));
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, -0.5, z);
    root.add(wheel);
  }

  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.05, 0.42, 3, 6, 3));
  tower.position.set(-0.2, 0.05, 0);
  root.add(tower);

  const slideRail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.5, 0.14, 1, 8, 1));
  slideRail.position.set(-0.2, 0.65, 0);
  slideRail.rotation.z = -0.18;
  root.add(slideRail);

  const armSegments = 5;
  const armCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.2, 1.35, 0),
    new THREE.Vector3(0.05, 1.55, 0.05),
    new THREE.Vector3(0.45, 1.6, 0.08),
    new THREE.Vector3(0.85, 1.42, 0.05),
    new THREE.Vector3(1.15, 1.05, 0),
  ]);
  for (let i = 0; i < armSegments; i++) {
    const t0 = i / armSegments;
    const t1 = (i + 1) / armSegments;
    const p0 = armCurve.getPoint(t0);
    const p1 = armCurve.getPoint(t1);
    const mid = p0.clone().lerp(p1, 0.5);
    const length = p0.distanceTo(p1);
    const seg = new THREE.Mesh(
      new THREE.BoxGeometry(0.16 - i * 0.018, length, 0.16 - i * 0.018, 2, 2, 2),
    );
    seg.position.copy(mid);
    seg.lookAt(p1);
    seg.rotateX(Math.PI / 2);
    root.add(seg);
  }

  const intake = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.4, 2, 2, 2));
  intake.position.copy(armCurve.getPoint(1));
  intake.rotation.x = 0.5;
  root.add(intake);

  const pod = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 1));
  pod.position.set(-0.2, 1.42, 0);
  root.add(pod);

  const standoffPositions: [number, number][] = [
    [0.6, 0.5],
    [-0.6, 0.5],
    [0.6, -0.5],
  ];
  for (const [x, z] of standoffPositions) {
    const standoff = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 6));
    standoff.position.set(x, -0.15, z);
    root.add(standoff);
  }

  root.rotation.y = Math.PI * 0.15;
  return root;
}
