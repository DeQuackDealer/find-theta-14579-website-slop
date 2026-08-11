"use client";

import dynamic from "next/dynamic";
import { IbisMark } from "@/components/ibis-mark";
import type { Hotspot } from "./hotspot-pins";

function ViewerSkeleton() {
  return (
    <div className="flex h-full w-full animate-pulse items-center justify-center">
      <IbisMark className="h-24 w-24 text-fg-faint opacity-40" />
    </div>
  );
}

export const RobotViewer = dynamic(
  () => import("./robot-viewer").then((m) => m.RobotViewer),
  { ssr: false, loading: ViewerSkeleton },
);

export type { Hotspot };
