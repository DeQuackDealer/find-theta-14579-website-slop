/**
 * Recolors a grayscale photo with the active palette's accent via
 * mix-blend-mode: color. On Ibis (accent = fg, achromatic) this is a no-op
 * over the grayscale image; on the colour palettes it produces a proper
 * duotone. Place as a sibling right after a `fill`/absolute-positioned
 * `<Image className="grayscale" />` inside a `relative` wrapper.
 */
export function Duotone() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-accent mix-blend-color"
    />
  );
}
