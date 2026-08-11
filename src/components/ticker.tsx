import { cn } from "@/lib/utils";

type TickerItem = string | { label: string; accent?: boolean };

export function Ticker({ items }: { items: TickerItem[] }) {
  const normalized = items.map((item) =>
    typeof item === "string" ? { label: item, accent: false } : item,
  );

  return (
    <div className="relative overflow-hidden border-t border-border">
      <div className="flex w-max animate-marquee py-4">
        {[0, 1].map((rep) => (
          <span
            key={rep}
            className="label-mono flex shrink-0 items-center gap-8 pr-8 text-fg-faint"
            aria-hidden={rep === 1}
          >
            {normalized.map((item, i) => (
              <span
                key={i}
                className={cn("flex items-center gap-2", item.accent && "text-accent")}
              >
                <span aria-hidden="true">◇</span>
                {item.label}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
