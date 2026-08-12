export type PaletteId = "ibis" | "nile" | "bone" | "ash";

export interface Palette {
  id: PaletteId;
  name: string;
  description: string;
  swatch: [string, string, string]; // bg, fg, accent — for the switcher UI
  vars: Record<string, string>;
}

export const PALETTES: Palette[] = [
  {
    id: "ibis",
    name: "Amber",
    description: "Ink black with a signal-orange accent. The build-season default.",
    swatch: ["#0a0e14", "#e8eaed", "#ff6b1a"],
    vars: {
      "--bg": "#0a0e14",
      "--bg-elevated": "#0f141c",
      "--bg-overlay": "#0a0e1400",
      "--fg": "#e8eaed",
      "--fg-muted": "#8b95a5",
      "--fg-faint": "#586171",
      "--border": "#1f2833",
      "--border-strong": "#323d4b",
      "--accent": "#ff6b1a",
      "--accent-fg": "#0a0e14",
      "--accent-muted": "#c44b00",
    },
  },
  {
    id: "nile",
    name: "Signal",
    description: "Same ink field, a cyan telemetry accent.",
    swatch: ["#0a0e14", "#e8eaed", "#00e5c7"],
    vars: {
      "--bg": "#0a0e14",
      "--bg-elevated": "#0f141c",
      "--bg-overlay": "#0a0e1400",
      "--fg": "#e8eaed",
      "--fg-muted": "#8b95a5",
      "--fg-faint": "#586171",
      "--border": "#1f2833",
      "--border-strong": "#323d4b",
      "--accent": "#00e5c7",
      "--accent-fg": "#04120f",
      "--accent-muted": "#049483",
    },
  },
  {
    id: "bone",
    name: "Paper",
    description: "Inverted: warm paper field, ink markings, amber ticks.",
    swatch: ["#faf8f3", "#14130f", "#c44b00"],
    vars: {
      "--bg": "#faf8f3",
      "--bg-elevated": "#f1ede3",
      "--bg-overlay": "#faf8f300",
      "--fg": "#14130f",
      "--fg-muted": "#6b6459",
      "--fg-faint": "#9c9488",
      "--border": "#e2dcd0",
      "--border-strong": "#cdc4b3",
      "--accent": "#c44b00",
      "--accent-fg": "#faf8f3",
      "--accent-muted": "#8f5a34",
    },
  },
  {
    id: "ash",
    name: "Steel",
    description: "Cooler ink, a steel-blue accent. No amber.",
    swatch: ["#0d1117", "#e6e9ee", "#4a90c2"],
    vars: {
      "--bg": "#0d1117",
      "--bg-elevated": "#141b23",
      "--bg-overlay": "#0d111700",
      "--fg": "#e6e9ee",
      "--fg-muted": "#8290a3",
      "--fg-faint": "#525c6b",
      "--border": "#212b36",
      "--border-strong": "#324152",
      "--accent": "#4a90c2",
      "--accent-fg": "#06090c",
      "--accent-muted": "#356f93",
    },
  },
];

export const DEFAULT_PALETTE: PaletteId = "bone";

export function getPalette(id: string | null | undefined): Palette {
  return (
    PALETTES.find((p) => p.id === id) ??
    PALETTES.find((p) => p.id === DEFAULT_PALETTE) ??
    PALETTES[0]
  );
}
