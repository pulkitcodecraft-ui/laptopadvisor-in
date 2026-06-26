import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  ADVANCED_MISTAKES,
  CORE_MISTAKES,
  type MistakeItem,
} from "@/lib/mistakeData";

function MistakeCard({ mistake }: { mistake: MistakeItem }) {
  return (
    <article className="mistake-card group">
      <span className="mistake-card-mark" aria-hidden>
        ✕
      </span>
      <h3 className="mistake-card-title">{mistake.title}</h3>
      <p className="mistake-card-desc">{mistake.description}</p>
      <p className="mistake-card-fix">{mistake.fix}</p>
    </article>
  );
}

function MistakeGrid({ items }: { items: MistakeItem[] }) {
  return (
    <div className="mistake-grid">
      {items.map((mistake) => (
        <MistakeCard key={mistake.title} mistake={mistake} />
      ))}
    </div>
  );
}

export default function MistakeCardsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="section-container">
        <SectionHeader
          eyebrow="Avoid these · 2026"
          title="Mistakes That Waste Your Money"
          subtitle="18 red flags — scan in 2 minutes, decide smarter before ₹50k–₹2L."
        />

        <MistakeGrid items={CORE_MISTAKES} />

        <div className="mt-12 sm:mt-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="type-label text-[var(--color-teal)]">
                Students rarely know
              </p>
              <h3 className="mt-2 text-lg font-bold text-text sm:text-xl">
                Hidden traps sellers won&apos;t mention
              </h3>
            </div>
          </div>
          <MistakeGrid items={ADVANCED_MISTAKES} />
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/finder/" size="lg" className="group w-full sm:w-auto">
            Find My Laptop
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
          </Button>
          <Link
            href="/compare/"
            className="text-sm font-semibold text-[var(--color-teal)] transition-colors hover:opacity-80"
          >
            Compare shortlisted picks →
          </Link>
        </div>
      </div>
    </section>
  );
}
