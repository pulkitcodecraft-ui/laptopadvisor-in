"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/motion/ScrollReveal";

type AnimatedSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function AnimatedSectionHeader(props: AnimatedSectionHeaderProps) {
  return (
    <ScrollReveal variant="section">
      <SectionHeader {...props} />
    </ScrollReveal>
  );
}
