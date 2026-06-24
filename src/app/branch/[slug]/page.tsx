import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BranchPageContent from "@/components/branch/BranchPageContent";
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

  return <BranchPageContent branch={branch} />;
}
