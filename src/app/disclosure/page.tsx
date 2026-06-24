import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How LaptopAdvisor.in earns affiliate commissions and why recommendations stay unbiased.",
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeader
        eyebrow="Legal"
        title="Affiliate Disclosure"
        subtitle="Transparency about how we fund this site."
        align="center"
      />
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted sm:text-base">
        <p>
          LaptopAdvisor.in participates in affiliate programs. When you click
          &quot;Check Price&quot; or similar links and make a purchase, we may
          earn a commission at no extra cost to you.
        </p>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-text">Our commitment</h2>
          <p>
            Affiliate relationships never determine which laptops we recommend.
            Picks are based on branch fit, specs, value for Indian students,
            service network quality, and real-world student feedback.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-text">Sponsored content</h2>
          <p>
            If we ever publish sponsored content, it will be clearly labeled.
            Editorial guides and branch recommendations are written independently.
          </p>
        </section>
      </div>
    </div>
  );
}
