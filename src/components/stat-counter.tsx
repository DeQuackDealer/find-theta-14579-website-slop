"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";

export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useMotionValueEvent(motionValue, "change", (latest) => {
    if (textRef.current) textRef.current.textContent = Math.round(latest).toString();
  });

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [isInView, value, motionValue, reduceMotion]);

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5">
      <div className="font-mono text-4xl text-fg sm:text-5xl">
        <span ref={textRef}>0</span>
        {suffix}
      </div>
      <div className="text-sm text-fg-muted">{label}</div>
    </div>
  );
}
