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
    name: "Ibis",
    description: "Pure black and white. No colour, no compromise.",
    swatch: ["#0a0a09", "#f4f3ef", "#f4f3ef"],
    vars: {
      "--bg": "#0a0a09",
      "--bg-elevated": "#131311",
      "--bg-overlay": "#18171400",
      "--fg": "#f4f3ef",
      "--fg-muted": "#a5a49c",
      "--fg-faint": "#65645c",
      "--border": "#2a2a26",
      "--border-strong": "#403f39",
      "--accent": "#f4f3ef",
      "--accent-fg": "#0a0a09",
      "--accent-muted": "#8a8980",
    },
  },
  {
    id: "nile",
    name: "Nile",
    description: "Monochrome with a cold river-water accent.",
    swatch: ["#0a0b0d", "#f2f3f5", "#6f94ad"],
    vars: {
      "--bg": "#0a0b0d",
      "--bg-elevated": "#121417",
      "--bg-overlay": "#12141700",
      "--fg": "#f2f3f5",
      "--fg-muted": "#9ba1a8",
      "--fg-faint": "#5f656c",
      "--border": "#242830",
      "--border-strong": "#3a4049",
      "--accent": "#6f94ad",
      "--accent-fg": "#08090a",
      "--accent-muted": "#4d6577",
    },
  },
  {
    id: "bone",
    name: "Bone",
    description: "Inverted. Off-white field, ink markings.",
    swatch: ["#f2f0ea", "#151412", "#151412"],
    vars: {
      "--bg": "#f2f0ea",
      "--bg-elevated": "#e9e6dd",
      "--bg-overlay": "#f2f0ea00",
      "--fg": "#151412",
      "--fg-muted": "#5c5a53",
      "--fg-faint": "#8c897e",
      "--border": "#d8d4c8",
      "--border-strong": "#c2bdad",
      "--accent": "#151412",
      "--accent-fg": "#f2f0ea",
      "--accent-muted": "#726f65",
    },
  },
  {
    id: "ash",
    name: "Ash",
    description: "Monochrome with a desert-brass accent.",
    swatch: ["#0b0a09", "#f4f2ee", "#b3925f"],
    vars: {
      "--bg": "#0b0a09",
      "--bg-elevated": "#141210",
      "--bg-overlay": "#14121000",
      "--fg": "#f4f2ee",
      "--fg-muted": "#a6a29a",
      "--fg-faint": "#67635b",
      "--border": "#2b2824",
      "--border-strong": "#413c35",
      "--accent": "#b3925f",
      "--accent-fg": "#0b0a09",
      "--accent-muted": "#8a7350",
    },
  },
];

export const DEFAULT_PALETTE: PaletteId = "ibis";

export function getPalette(id: string | null | undefined): Palette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0];
}
