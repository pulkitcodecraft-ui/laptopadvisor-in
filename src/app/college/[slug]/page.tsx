import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GraduationCap, Laptop, Lightbulb, MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  getAllCollegeSlugs,
  getCollegeBySlug,
} from "@/lib/collegeData";

interface CollegePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCollegeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CollegePageProps): Promise<Metadata> {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) return { title: "College Not Found" };

  return {
    title: `${college.name} Laptop Guide 2025`,
    description: `${college.description} Popular laptops: ${college.popularLaptops.join(", ")}.`,
  };
}

export default async function CollegePage({ params }: CollegePageProps) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);

  if (!college) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge variant="purple">
          <MapPin className="mr-1 inline h-3 w-3" />
          {college.city}
        </Badge>
        <Badge variant="blue">College Guide</Badge>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
        {college.name} Laptop Guide
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        {college.description}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Card className="border-l-4 border-l-primary">
          <div className="mb-3 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-text">Campus Life</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            {college.campusLife}
          </p>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <div className="mb-3 flex items-center gap-2">
            <Laptop className="h-5 w-5 text-accent" />
            <h2 className="font-semibold text-text">Lab Setup</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted">{college.labSetup}</p>
        </Card>
      </div>

      <section className="mt-10">
        <SectionHeader title="Popular Laptops on Campus" />
        <div className="flex flex-wrap gap-3">
          {college.popularLaptops.map((laptop) => (
            <Badge key={laptop} variant="gray" className="px-4 py-2 text-sm">
              {laptop}
            </Badge>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 p-6 sm:p-8">
        <div className="flex gap-3">
          <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Senior tip
            </p>
            <blockquote className="mt-2 text-lg leading-relaxed text-text">
              &ldquo;{college.seniorTip}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/finder" size="lg">
          Find My Laptop →
        </Button>
        <Button href="/compare" variant="secondary" size="lg">
          Compare Laptops
        </Button>
      </div>
    </div>
  );
}
