"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type CountUpBadgeProps = {
  label: string;
  value: number;
  format?: "currency" | "percent" | "number";
  className?: string;
  valueClassName?: string;
};

function formatValue(value: number, format: CountUpBadgeProps["format"]) {
  if (format === "currency") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (format === "percent") return `${value}%`;
  return String(value);
}

export default function CountUpBadge({
  label,
  value,
  format = "number",
  className,
  valueClassName,
}: CountUpBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const shown = reducedMotion ? value : display;
  const showGlow = !reducedMotion && inView && display < value;

  useEffect(() => {
    if (reducedMotion || !inView) return;

    const duration = 1400;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [inView, reducedMotion, value]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {showGlow && (
        <span
          aria-hidden
          className="animate-glow-ring pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 to-accent/50 opacity-70 blur-md"
        />
      )}
      <div className="relative rounded-2xl border border-border bg-card px-4 py-3 shadow-xl dark:shadow-primary/10">
        <p className="text-xs text-muted">{label}</p>
        <p
          className={cn(
            "text-lg font-extrabold tabular-nums",
            format === "currency" && "text-success",
            format === "percent" && "text-gradient",
            valueClassName,
          )}
        >
          {formatValue(shown, format)}
        </p>
      </div>
    </div>
  );
}
