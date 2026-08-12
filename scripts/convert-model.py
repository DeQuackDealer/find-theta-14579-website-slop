"""
Convert a CAD export (STL/OBJ/PLY/GLB/GLTF) into a web-ready Draco GLB.

CAD exports carry far more geometry than a browser viewer can use - a 100 MB
STL is ~2M triangles, where ~100k is plenty for an on-screen model. This
decimates to a target triangle budget and exports compressed GLB, which
typically lands 20-100x smaller.

Usage (Blender 3.x or 4.x must be installed):

    blender --background --python scripts/convert-model.py -- \
        input.stl public/models/thoth.glb 120000

Arguments after `--`:
    1. input mesh path
    2. output .glb path
    3. optional target triangle count (default 120000)
"""

import sys
import os

import bpy


def parse_args():
    argv = sys.argv
    if "--" not in argv:
        raise SystemExit("Pass args after `--`. See the docstring for usage.")
    argv = argv[argv.index("--") + 1:]
    if len(argv) < 2:
        raise SystemExit("Need at least: <input mesh> <output .glb>")
    src = argv[0]
    dst = argv[1]
    budget = int(argv[2]) if len(argv) > 2 else 120_000
    return src, dst, budget


def import_mesh(path):
    ext = os.path.splitext(path)[1].lower()
    # Blender 4.x replaced the legacy STL operator; try new then fall back.
    if ext == ".stl":
        if hasattr(bpy.ops.wm, "stl_import"):
            bpy.ops.wm.stl_import(filepath=path)
        else:
            bpy.ops.import_mesh.stl(filepath=path)
    elif ext == ".obj":
        if hasattr(bpy.ops.wm, "obj_import"):
            bpy.ops.wm.obj_import(filepath=path)
        else:
            bpy.ops.import_scene.obj(filepath=path)
    elif ext == ".ply":
        if hasattr(bpy.ops.wm, "ply_import"):
            bpy.ops.wm.ply_import(filepath=path)
        else:
            bpy.ops.import_mesh.ply(filepath=path)
    elif ext in (".glb", ".gltf"):
        # Re-processing an already-exported GLB is the common case when the
        # original CAD file is no longer to hand.
        bpy.ops.import_scene.gltf(filepath=path)
    else:
        raise SystemExit(f"Unsupported input type: {ext}")


def tri_count(objs):
    total = 0
    for ob in objs:
        mesh = ob.data
        mesh.calc_loop_triangles()
        total += len(mesh.loop_triangles)
    return total


def main():
    src, dst, budget = parse_args()

    bpy.ops.wm.read_factory_settings(use_empty=True)
    import_mesh(src)

    meshes = [ob for ob in bpy.context.scene.objects if ob.type == "MESH"]
    if not meshes:
        raise SystemExit("No mesh found in the imported file.")

    before = tri_count(meshes)
    print(f"[convert] imported {before:,} triangles from {os.path.basename(src)}")

    if before > budget:
        # One shared ratio keeps relative detail between parts intact, rather
        # than flattening small parts and leaving large ones dense.
        ratio = budget / before
        for ob in meshes:
            mod = ob.modifiers.new(name="decimate", type="DECIMATE")
            mod.ratio = ratio
            bpy.context.view_layer.objects.active = ob
            bpy.ops.object.modifier_apply(modifier=mod.name)
        print(f"[convert] decimated at ratio {ratio:.4f}")
    else:
        print("[convert] already under budget, skipping decimate")

    after = tri_count([ob for ob in bpy.context.scene.objects if ob.type == "MESH"])

    os.makedirs(os.path.dirname(os.path.abspath(dst)), exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=dst,
        export_format="GLB",
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_apply=True,
    )

    src_mb = os.path.getsize(src) / 1024 / 1024
    dst_mb = os.path.getsize(dst) / 1024 / 1024
    print(f"[convert] {before:,} -> {after:,} triangles")
    print(f"[convert] {src_mb:.1f} MB -> {dst_mb:.1f} MB  ({src_mb / max(dst_mb, 0.01):.0f}x smaller)")
    print(f"[convert] wrote {dst}")


if __name__ == "__main__":
    main()
