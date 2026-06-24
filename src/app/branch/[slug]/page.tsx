import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import LaptopCard from "@/components/ui/LaptopCard";
import {
  getAllBranchSlugs,
  getBranchBySlug,
} from "@/lib/branchData";

interface BranchPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBranchSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BranchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    return { title: "Branch Not Found" };
  }

  return {
    title: `Best Laptop for ${branch.name} Students in 2025`,
    description: `${branch.description} Key software: ${branch.softwareUsed.slice(0, 4).join(", ")}. Budget guide for Indian engineering students.`,
  };
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  const osBadgeVariant =
    branch.recommendedOS === "macOS"
      ? "purple"
      : branch.recommendedOS === "Windows"
        ? "blue"
        : "green";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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

      <section className="mb-12 rounded-xl bg-accent/5 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          What seniors say:
        </p>
        <blockquote className="mt-3 text-lg leading-relaxed text-text">
          &ldquo;{branch.seniorTip}&rdquo;
        </blockquote>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-xl font-bold text-text">
          Common Mistakes to Avoid
        </h2>
        <ul className="space-y-4">
          {branch.commonMistakes.map((mistake) => (
            <li key={mistake}>
              <Card className="border-l-4 border-l-orange-400">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                  <p className="text-muted">{mistake}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-xl font-bold text-text">
          Recommended Laptops
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {branch.recommendedLaptops.map((laptop, index) => (
            <LaptopCard
              key={laptop.name}
              name={laptop.name}
              brand={laptop.name.split(" ")[0]}
              price={65000 + index * 10000}
              image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80"
              rating={4.5}
              tags={[laptop.priceRange, branch.name]}
              affiliateUrl={laptop.affiliateUrl}
              isRecommended={index === 0}
            />
          ))}
        </div>
      </section>

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
    </div>
  );
}
