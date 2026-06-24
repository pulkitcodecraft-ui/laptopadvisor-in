import type { Metadata } from "next";
import DealsClient from "@/components/deals/DealsClient";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Current Laptop Deals",
  description:
    "Latest laptop deals for engineering students in India. Verified discounts on Amazon.in and Flipkart — updated regularly.",
};

export default function DealsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeader
        eyebrow="DEALS"
        title="Current Laptop Deals"
        subtitle="Hand-picked deals for students. Prices change fast — always verify on the retailer site before buying."
        align="center"
      />
      <DealsClient />
    </div>
  );
}
