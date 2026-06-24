import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LaptopAdvisor.in collects and uses your information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: June 2026"
        align="center"
      />
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted sm:text-base">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-text">Information we collect</h2>
          <p>
            We use Firebase Analytics and basic usage data to understand how
            visitors use the site. The Finder Quiz stores your answers locally
            in your browser until you clear site data.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-text">How we use it</h2>
          <p>
            Data helps us improve recommendations, fix bugs, and measure which
            guides are most useful. We do not sell personal information to third
            parties.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-text">Third-party links</h2>
          <p>
            Affiliate links (Amazon, brand stores, etc.) are governed by those
            sites&apos; privacy policies when you leave LaptopAdvisor.in.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-text">Contact</h2>
          <p>
            Privacy questions:{" "}
            <a
              href="mailto:hello@laptopadvisor.in"
              className="font-semibold text-primary hover:underline"
            >
              hello@laptopadvisor.in
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
