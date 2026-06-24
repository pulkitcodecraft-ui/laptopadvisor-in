import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the LaptopAdvisor.in team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeader
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Questions about a recommendation, correction, or partnership?"
        align="center"
      />
      <div className="mt-10 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        <p>
          Email us at{" "}
          <a
            href="mailto:hello@laptopadvisor.in"
            className="font-semibold text-primary hover:underline"
          >
            hello@laptopadvisor.in
          </a>{" "}
          and we&apos;ll respond within 2–3 business days.
        </p>
        <p>
          For laptop suggestions, try the{" "}
          <Link href="/finder" className="font-semibold text-primary hover:underline">
            Finder Quiz
          </Link>{" "}
          first — it gives branch-specific picks in under two minutes.
        </p>
      </div>
    </div>
  );
}
