"use client";

import { useState } from "react";

export interface Hotspot {
  id: number;
  label: string;
  description: string;
  x: number;
  y: number;
}

export function HotspotPins({ hotspots }: { hotspots: Hotspot[] }) {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0">
      {hotspots.map((h) => {
        const active = activeId === h.id;
        return (
          <div
            key={h.id}
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${h.x * 100}%`, top: `${h.y * 100}%` }}
          >
            <button
              type="button"
              onClick={() => setActiveId(active ? null : h.id)}
              className="relative flex size-2.5 items-center justify-center rounded-full bg-fg shadow-[0_0_0_4px_var(--bg)]"
              aria-expanded={active}
              aria-label={h.label}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-fg opacity-40" />
            </button>
            {active ? (
              <div className="label-mono absolute left-1/2 top-5 w-max max-w-[13rem] -translate-x-1/2 rounded-md border border-border-strong bg-bg-elevated px-3 py-2 text-fg shadow-xl">
                <div className="mb-0.5 text-fg">{h.label}</div>
                {h.description ? (
                  <div className="normal-case tracking-normal text-fg-faint">
                    {h.description}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
