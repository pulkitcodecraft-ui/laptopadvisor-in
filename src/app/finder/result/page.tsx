"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import LaptopCard from "@/components/ui/LaptopCard";
import AnimatedSectionHeader from "@/components/motion/AnimatedSectionHeader";
import ScrollReveal from "@/components/motion/ScrollReveal";
import {
  getBranchSeniorTip,
  getBudgetLabel,
  getFinderAlerts,
  getFinderAnswerLabels,
  matchLaptops,
  type FinderAnswers,
} from "@/lib/finderEngine";
import { getBranchBySlug } from "@/lib/branchData";

function parseAnswers(params: URLSearchParams): FinderAnswers | null {
  const budget = params.get("budget") ?? "";
  const branch = params.get("branch") ?? "";
  const gaming = params.get("gaming") ?? "";
  const aiMl = params.get("aiMl") ?? "";
  const platform = params.get("platform") ?? "";
  const portability = params.get("portability") ?? "";

  if (!budget || !branch || !gaming || !aiMl || !platform || !portability) {
    return null;
  }

  return { budget, branch, gaming, aiMl, platform, portability };
}

function AlertBanner({
  type,
  title,
  message,
}: {
  type: "warning" | "info";
  title: string;
  message: string;
}) {
  const isWarning = type === "warning";

  return (
    <div
      className={`rounded-xl border px-5 py-4 ${
        isWarning
          ? "border-amber-500/40 bg-amber-500/10 dark:border-amber-400/30 dark:bg-amber-400/10"
          : "border-primary/25 bg-primary/5"
      }`}
    >
      <div className="flex gap-3">
        {isWarning ? (
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        ) : (
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        )}
        <div>
          <p
            className={`font-semibold ${
              isWarning
                ? "text-amber-900 dark:text-amber-100"
                : "text-text"
            }`}
          >
            {title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{message}</p>
        </div>
      </div>
    </div>
  );
}

function FinderResultContent() {
  const searchParams = useSearchParams();

  const answers = useMemo(
    () => parseAnswers(searchParams),
    [searchParams]
  );

  const matches = useMemo(
    () => (answers ? matchLaptops(answers, 3) : []),
    [answers]
  );

  const alerts = useMemo(
    () => (answers ? getFinderAlerts(answers) : []),
    [answers]
  );

  const answerLabels = answers ? getFinderAnswerLabels(answers) : [];
  const branch = answers ? getBranchBySlug(answers.branch) : undefined;
  const seniorTip = answers ? getBranchSeniorTip(answers.branch) : undefined;
  const budgetLabel = answers ? getBudgetLabel(answers.budget) : undefined;
  const allInBudget = matches.length > 0 && matches.every((m) => m.inBudget);

  if (!answers) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <Card>
          <p className="text-lg font-semibold text-text">Quiz incomplete</p>
          <p className="mt-2 text-muted">
            Answer all 6 questions so we can match you with laptops from our
            curated database.
          </p>
          <Button href="/finder/" className="mt-6">
            Start the quiz
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedSectionHeader
        eyebrow="YOUR TOP 3 PICKS"
        title={
          budgetLabel
            ? `Best laptops in ${budgetLabel}`
            : "Your personalised shortlist"
        }
        subtitle="We checked every answer against our 19-laptop catalog — budget first, then branch, gaming, and platform fit."
      />

      <ScrollReveal index={0}>
        <Card className="mb-6">
          <h3 className="font-semibold text-text">Your profile</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {answerLabels.map(({ label, value }) => (
              <Badge key={label} variant="blue">
                {label}: {value}
              </Badge>
            ))}
          </div>
          {budgetLabel && (
            <p className="mt-4 text-sm text-muted">
              {allInBudget
                ? `All 3 picks sit inside ${budgetLabel}.`
                : `Picks are ranked for ${budgetLabel} first — closest matches shown if fewer options exist in that tier.`}
            </p>
          )}
        </Card>
      </ScrollReveal>

      {alerts.length > 0 && (
        <ScrollReveal index={1}>
          <div className="mb-6 space-y-4">
            {alerts.map((alert) => (
              <AlertBanner key={alert.title} {...alert} />
            ))}
          </div>
        </ScrollReveal>
      )}

      {seniorTip && alerts.length === 0 && (
        <ScrollReveal index={1}>
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <p className="text-sm font-medium text-primary">Senior tip</p>
            <p className="mt-2 leading-relaxed text-muted">{seniorTip}</p>
          </Card>
        </ScrollReveal>
      )}

      {seniorTip && alerts.length > 0 && (
        <ScrollReveal index={2}>
          <Card className="mb-8 border-border bg-surface/30">
            <p className="text-sm font-medium text-muted">Senior tip</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {seniorTip}
            </p>
          </Card>
        </ScrollReveal>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {matches.map((match, index) => {
          const { laptop } = match;
          return (
            <ScrollReveal key={laptop.id} index={index + 3}>
              <div className="flex h-full flex-col">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant={index === 0 ? "gradient" : "purple"}>
                    {index === 0 ? "★ #1 Best match" : `#${index + 1}`} ·{" "}
                    {match.score}%
                  </Badge>
                  {laptop.priceLabel && (
                    <Badge variant="gray">{laptop.priceLabel}</Badge>
                  )}
                  {match.inBudget && (
                    <Badge variant="blue">In your budget</Badge>
                  )}
                </div>

                <LaptopCard
                  name={laptop.name}
                  brand={laptop.brand}
                  price={laptop.price}
                  priceLabel={laptop.priceLabel}
                  image={laptop.image}
                  rating={laptop.rating}
                  tags={laptop.tags}
                  affiliateUrl={laptop.affiliateUrl}
                  specs={laptop.specs}
                  description={laptop.description}
                  isRecommended={index === 0}
                  priceSource={laptop.priceSource}
                />

                {match.reasons.length > 0 && (
                  <ul className="mt-4 space-y-1.5 rounded-xl border border-border bg-surface/50 px-4 py-3">
                    {match.reasons.map((reason) => (
                      <li
                        key={reason}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal index={6}>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/finder/">Retake quiz</Button>
          <Button href="/compare/" variant="secondary">
            Compare all 19 laptops
          </Button>
          {branch && (
            <Button href={`/branch/${branch.slug}/`} variant="ghost">
              {branch.name} buying guide →
            </Button>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}

export default function FinderResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-muted">
          Loading your matches...
        </div>
      }
    >
      <FinderResultContent />
    </Suspense>
  );
}
