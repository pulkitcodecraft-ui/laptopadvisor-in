"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { BUDGET_RANGES } from "@/lib/constants";
import { getBranchBySlug } from "@/lib/branchData";

function FinderResultContent() {
  const searchParams = useSearchParams();

  const budget = searchParams.get("budget") ?? "";
  const branchSlug = searchParams.get("branch") ?? "";
  const gaming = searchParams.get("gaming") ?? "";
  const aiMl = searchParams.get("aiMl") ?? "";
  const platform = searchParams.get("platform") ?? "";
  const portability = searchParams.get("portability") ?? "";

  const branch = getBranchBySlug(branchSlug);
  const budgetLabel =
    BUDGET_RANGES.find((b) => b.value === budget)?.label ?? budget;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="YOUR RESULTS"
        title="Here's What We Recommend"
        subtitle="Based on your answers, these laptops and tips match your profile. Always verify current prices before buying."
      />

      <Card className="mb-8">
        <h3 className="font-semibold text-text">Your preferences</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {budgetLabel && <Badge variant="blue">Budget: {budgetLabel}</Badge>}
          {branch && <Badge variant="purple">Branch: {branch.name}</Badge>}
          {gaming && <Badge variant="gray">Gaming: {gaming}</Badge>}
          {aiMl && <Badge variant="gray">AI/ML: {aiMl}</Badge>}
          {platform && <Badge variant="gray">Platform: {platform}</Badge>}
          {portability && (
            <Badge variant="gray">Portability: {portability}</Badge>
          )}
        </div>
      </Card>

      {branch ? (
        <>
          <p className="mb-6 text-muted">{branch.seniorTip}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branch.recommendedLaptops.map((laptop) => (
              <Card key={laptop.name} className="flex flex-col">
                <Badge variant="green" className="mb-3 w-fit">
                  {laptop.priceRange}
                </Badge>
                <h3 className="text-lg font-semibold text-text">
                  {laptop.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">
                  {laptop.reason}
                </p>
                <div className="mt-4">
                  <Button href={laptop.affiliateUrl} variant="secondary" className="w-full">
                    Check Price on Amazon
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card>
          <p className="text-muted">
            We couldn&apos;t match your branch. Try the quiz again or browse
            branch guides directly.
          </p>
        </Card>
      )}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/finder" variant="secondary">
          Retake Quiz
        </Button>
        {branch && (
          <Button href={`/branch/${branch.slug}`}>
            Read Full {branch.name} Guide →
          </Button>
        )}
      </div>
    </div>
  );
}

export default function FinderResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-muted">
          Loading your results...
        </div>
      }
    >
      <FinderResultContent />
    </Suspense>
  );
}
