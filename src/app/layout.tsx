import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeScript } from "@/components/theme-script";
import { getSettings } from "@/lib/db/queries";
import { resolveCopy } from "@/lib/site-copy";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `${settings.teamName} | FTC Team ${settings.teamNumber}`,
    description: resolveCopy(settings).heroTagline,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript defaultPalette={settings.activePalette} />
      </head>
      <body>
        <div
          className="grain"
          aria-hidden="true"
          style={{ backgroundImage: GRAIN_DATA_URI }}
        />
        {children}
      </body>
    </html>
  );
}

// Inline SVG turbulence noise, tiled. Fixed + pointer-events-none (see .grain
// in globals.css) so it never repaints on scroll.
const GRAIN_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
