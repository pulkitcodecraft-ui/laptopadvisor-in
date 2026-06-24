"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionEase } from "@/lib/motion";

export default function Template({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion() ?? false;

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: motionEase }}
    >
      {children}
    </motion.div>
  );
}
