/**
 * Upload size ceilings, shared by the client picker and the token route so
 * an oversized file is rejected instantly in the browser rather than after
 * the user has already waited through a long transfer.
 */
export const MAX_MODEL_BYTES = 512 * 1024 * 1024; // 512 MB — CAD exports get large
export const MAX_IMAGE_BYTES = 20 * 1024 * 1024; // 20 MB

const MODEL_EXTENSIONS = [".glb", ".gltf", ".stl"];

export function isModelPath(pathname: string) {
  const lower = pathname.toLowerCase();
  return MODEL_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export function maxBytesFor(pathname: string) {
  return isModelPath(pathname) ? MAX_MODEL_BYTES : MAX_IMAGE_BYTES;
}

export function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
  if (bytes >= 1024 * 1024) return `${Math.round(bytes / 1024 / 1024)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}
