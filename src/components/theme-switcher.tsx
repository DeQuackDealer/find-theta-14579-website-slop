"use client";

import { useEffect, useState } from "react";
import { Palette as PaletteIcon, Check } from "@phosphor-icons/react/dist/ssr";
import { PALETTES, type PaletteId } from "@/lib/palettes";
import { THEME_STORAGE_KEY } from "./theme-script";

export function ThemeSwitcher({ defaultPalette }: { defaultPalette: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(defaultPalette);

  useEffect(() => {
    // Read the visitor's stored override after mount only - doing this
    // during render would mismatch the server-rendered defaultPalette.
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setActive(stored);
  }, []);

  function apply(id: PaletteId) {
    document.documentElement.setAttribute("data-palette", id);
    localStorage.setItem(THEME_STORAGE_KEY, id);
    window.dispatchEvent(new CustomEvent("palette-change"));
    setActive(id);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch colour palette"
        aria-expanded={open}
        className="flex size-8 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
      >
        <PaletteIcon size={15} weight="regular" />
      </button>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close palette menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-11 z-50 w-56 rounded-lg border border-border bg-bg-elevated p-1.5 shadow-2xl shadow-black/40">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => apply(p.id)}
                className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-bg"
              >
                <span
                  className="flex size-6 shrink-0 overflow-hidden rounded-full border border-border-strong"
                  style={{ background: p.swatch[0] }}
                >
                  <span
                    className="block h-full w-1/2"
                    style={{ background: p.swatch[2] }}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-fg">{p.name}</span>
                  <span className="block truncate text-xs text-fg-faint">
                    {p.description}
                  </span>
                </span>
                {active === p.id ? (
                  <Check size={14} weight="bold" className="shrink-0 text-fg" />
                ) : null}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
