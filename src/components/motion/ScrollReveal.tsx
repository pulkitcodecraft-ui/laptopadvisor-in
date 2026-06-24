"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { scrollFadeVariants, sectionFadeVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "section" | "article" | "li";
  variant?: "item" | "section";
};

export default function ScrollReveal({
  children,
  className,
  index = 0,
  as = "div",
  variant = "item",
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const MotionTag = motion[as];
  const motionProps =
    variant === "section"
      ? sectionFadeVariants(reducedMotion)
      : scrollFadeVariants(index, reducedMotion);

  return (
    <MotionTag {...motionProps} className={cn(className)}>
      {children}
    </MotionTag>
  );
}
