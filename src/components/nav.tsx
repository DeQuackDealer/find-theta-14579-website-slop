"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { IbisMark } from "./ibis-mark";
import { ThemeSwitcher } from "./theme-switcher";

const LINKS = [
  { href: "/#story", label: "Story" },
  { href: "/robots", label: "Flock" },
  { href: "/#awards", label: "Awards" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Updates" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/#contact", label: "Contact" },
];

export function Nav({
  teamName,
  teamNumber,
  defaultPalette,
}: {
  teamName: string;
  teamNumber: string;
  defaultPalette: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <IbisMark className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[10deg]" />
          <span className="label-mono text-fg">
            {teamName.toUpperCase()}
            <span className="ml-2 text-fg-faint">/ {teamNumber}</span>
          </span>
        </Link>

        <nav className="hidden items-center lg:flex">
          <ul className="label-mono flex items-center text-fg-muted">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "relative flex h-16 items-center px-4 transition-colors hover:text-fg",
                      active && "text-fg",
                    )}
                  >
                    {l.label}
                    {active ? (
                      <span className="absolute inset-x-4 bottom-0 h-px bg-accent" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="label-mono ml-2 mr-5 flex items-center gap-2 border-l border-border pl-5 text-fg-faint">
            <span className="size-1.5 shrink-0 rounded-full bg-accent animate-pulse-dot" />
            Live
          </span>
          <ThemeSwitcher defaultPalette={defaultPalette} />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeSwitcher defaultPalette={defaultPalette} />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full border border-border text-fg"
          >
            {open ? <X size={16} /> : <List size={16} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border px-5 lg:hidden">
          <ul className="flex flex-col divide-y divide-border">
            {LINKS.map((l, i) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-4"
                  >
                    <span className="label-mono w-7 shrink-0 text-fg-faint">
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "text-xl tracking-tight transition-colors group-hover:text-accent",
                        active ? "text-accent" : "text-fg",
                      )}
                    >
                      {l.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
