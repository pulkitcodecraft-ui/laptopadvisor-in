import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about LaptopAdvisor.in — India's student-first laptop guide for engineering students.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeader
        eyebrow="About"
        title="Built for Engineering Students"
        subtitle="Unbiased laptop advice for Indian colleges, branches, and real student budgets."
        align="center"
      />
      <div className="mt-10 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        <p>
          LaptopAdvisor.in helps engineering students across India choose the
          right laptop before spending ₹50,000–₹2,00,000. We focus on branch
          software, college lab realities, battery life, service networks, and
          student discounts — not sponsored rankings.
        </p>
        <p>
          Our recommendations are written for JEE aspirants, IIT/NIT/BITS
          students, and anyone starting an engineering degree who needs clear,
          practical buying advice.
        </p>
        <p>
          We may earn affiliate commissions when you buy through our links.
          That never changes which laptops we recommend or how we rank them.
        </p>
      </div>
    </div>
  );
}
