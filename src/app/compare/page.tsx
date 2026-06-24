import type { Metadata } from "next";
import CompareClient from "@/components/compare/CompareClient";
import AnimatedSectionHeader from "@/components/motion/AnimatedSectionHeader";

export const metadata: Metadata = {
  title: "Compare Laptops",
  description:
    "Side-by-side comparison of the best laptops for engineering students in India. Compare specs, prices, and branch compatibility.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <AnimatedSectionHeader
        eyebrow="COMPARE"
        title="Compare Laptops Side by Side"
        subtitle="Pick up to 3 laptops and compare specs, prices, and branch fit — no sponsored rankings."
        align="center"
      />
      <CompareClient />
    </div>
  );
}
