# Robot models

Drop `.glb` (preferred) or `.stl` files here, commit them, and reference them
from the admin panel's "3D model" field by path:

    /models/thoth.glb

Vercel serves these from its edge CDN, so nothing goes through Blob storage
and there is no upload step.

## Convert CAD exports first — do not commit raw STL

A 100 MB binary STL is roughly 2 million triangles. The viewer builds edge
lines and a point cloud per mesh, so geometry that large will freeze or
crash the browser long before download size becomes the issue. A viewer a
few hundred pixels wide needs on the order of 100k triangles.

Decimate and compress to GLB — usually 20-100x smaller:

    blender --background --python scripts/convert-model.py -- \
        robot.stl public/models/thoth.glb 120000

That drops the triangle count to the budget (last argument) and exports
Draco-compressed GLB. Anything still over ~25 MB afterwards is a sign the
budget is too high for the web.

If you need to keep a full-resolution copy, keep it out of git — this repo
is not an archive, and git stores every version of a binary forever.
