"use client";

import { AlertTriangle } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import LaptopCard from "@/components/ui/LaptopCard";
import type { BranchGuide } from "@/lib/branchData";
import { findLaptopBySlug } from "@/lib/sampleLaptops";

export default function BranchPageContent({ branch }: { branch: BranchGuide }) {
  const osBadgeVariant =
    branch.recommendedOS === "macOS"
      ? "purple"
      : branch.recommendedOS === "Windows"
        ? "blue"
        : "green";

  const recommended = branch.recommendedLaptops
    .map((pick) => ({ pick, catalog: findLaptopBySlug(pick.slug) }))
    .filter((entry): entry is typeof entry & { catalog: NonNullable<typeof entry.catalog> } =>
      Boolean(entry.catalog),
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <ScrollReveal variant="section">
        <section className="mb-12">
          <div className="flex flex-wrap gap-2">
            <Badge variant={osBadgeVariant}>
              Recommended: {branch.recommendedOS}
            </Badge>
            <Badge variant="gray">Battery: {branch.batteryImportance}</Badge>
            <Badge variant="gray">Gaming: {branch.gamingCompatibility}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Best Laptop for {branch.name} Students
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            {branch.description}
          </p>
          <p className="mt-4 max-w-3xl text-muted">{branch.macNote}</p>
        </section>
      </ScrollReveal>

      <ScrollReveal index={1}>
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold text-text">
            Software You&apos;ll Actually Use
          </h2>
          <div className="flex flex-wrap gap-2">
            {branch.softwareUsed.map((software) => (
              <Badge key={software} variant="blue">
                {software}
              </Badge>
            ))}
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted">
            {branch.typicalUsage}
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal index={2}>
        <section className="mb-12 rounded-xl bg-accent/5 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            What seniors say:
          </p>
          <blockquote className="mt-3 text-lg leading-relaxed text-text">
            &ldquo;{branch.seniorTip}&rdquo;
          </blockquote>
        </section>
      </ScrollReveal>

      <section className="mb-12">
        <ScrollReveal index={3}>
          <h2 className="mb-6 text-xl font-bold text-text">
            Common Mistakes to Avoid
          </h2>
        </ScrollReveal>
        <ul className="space-y-4">
          {branch.commonMistakes.map((mistake, i) => (
            <ScrollReveal key={mistake} index={i + 4} as="li">
              <Card className="border-l-4 border-l-orange-400 dark:border-l-orange-500">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500 dark:text-orange-400" />
                  <p className="text-muted">{mistake}</p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <ScrollReveal index={7}>
          <h2 className="mb-6 text-xl font-bold text-text">Recommended Laptops</h2>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map(({ pick, catalog }, index) => (
            <ScrollReveal key={catalog.id} index={index + 8}>
              <LaptopCard
                name={catalog.name}
                brand={catalog.brand}
                price={catalog.price}
                priceLabel={catalog.priceLabel}
                image={catalog.image}
                rating={catalog.rating}
                tags={catalog.tags}
                affiliateUrl={catalog.affiliateUrl}
                isRecommended={index === 0}
                specs={catalog.specs}
                description={pick.reason}
                priceSource={catalog.priceSource}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal index={11}>
        <section className="rounded-xl border border-border bg-surface p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-text">Not sure yet?</h2>
          <p className="mt-2 text-muted">
            Take our 2-minute quiz to get personalized recommendations.
          </p>
          <div className="mt-6">
            <Button href="/finder" size="lg">
              Take our Finder Quiz →
            </Button>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
