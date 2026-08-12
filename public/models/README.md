# Robot models

Drop `.glb` (preferred) or `.stl` files here, commit them, and reference them
from the admin panel's "3D model" field by path:

    /models/thoth.glb

Vercel serves these from its edge CDN, so nothing goes through Blob storage
and there is no upload step.

## Prefer GLB over STL

STL stores every triangle as raw unindexed floats — no compression, no reuse
of shared vertices. Converting to GLB with Draco compression typically cuts
the file 10-20x, which matters twice over: smaller download, and far less
work for the browser to parse before the viewer can draw anything.

Blender: File > Export > glTF 2.0 (.glb), enable Compression.
CLI:     npx @gltf-transform/cli optimize in.glb out.glb --compress draco
