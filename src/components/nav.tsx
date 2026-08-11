"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { IbisMark } from "./ibis-mark";
import { ThemeSwitcher } from "./theme-switcher";

const LINKS = [
  { href: "/#story", label: "Story" },
  { href: "/robots", label: "Fleet" },
  { href: "/#honours", label: "Honours" },
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

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <IbisMark className="h-6 w-6" />
          <span className="label-mono text-fg">
            {teamName.toUpperCase()}
            <span className="ml-2 text-fg-faint">/ {teamNumber}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <ul className="label-mono flex items-center gap-7 text-fg-muted">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
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
        <nav className="border-t border-border px-5 py-4 lg:hidden">
          <ul className="label-mono flex flex-col gap-4 text-fg-muted">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block transition-colors hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
