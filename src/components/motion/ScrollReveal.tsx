"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "section" | "article" | "li";
  variant?: "item" | "section";
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ScrollReveal({
  children,
  className,
  index = 0,
  as = "div",
  variant = "item",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const visible = prefersReducedMotion || revealed;
  const Tag = as as ElementType;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: variant === "section" ? 0.08 : 0.12, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion, variant]);

  return (
    <Tag
      ref={ref}
      className={cn("scroll-reveal", visible && "scroll-reveal-visible", className)}
      style={{ transitionDelay: visible ? `${Math.min(index, 8) * 45}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
