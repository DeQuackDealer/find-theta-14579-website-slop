"use client";

import { useEffect, useState } from "react";

export function HudStatus({
  teamNumber,
  location,
}: {
  teamNumber: string;
  location: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="label-mono flex flex-wrap items-start justify-between gap-4 text-fg-faint">
      <span className="flex items-center gap-2">
        <span className="size-1.5 shrink-0 rounded-full bg-accent animate-pulse-dot" />
        Build season active
      </span>
      <span className="flex items-center gap-4 text-right">
        <span>
          Team <span className="text-fg">{teamNumber}</span>
        </span>
        {location ? <span className="hidden sm:inline">{location}</span> : null}
        <span className="hidden tabular-nums sm:inline">
          {time ?? "--:--:--"}
          <span className="animate-blink text-fg" aria-hidden="true">
            _
          </span>
        </span>
      </span>
    </div>
  );
}
