import type { Metadata } from "next";
import GuidesGrid from "@/components/guides/GuidesGrid";

export const metadata: Metadata = {
  title: "Laptop Buying Guides",
  description:
    "Expert guides for engineering students — MacBook vs Windows, AI/ML laptops, gaming, student discounts, and more.",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <GuidesGrid />
    </div>
  );
}
