import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideArticle from "@/components/guides/GuideArticle";
import { getGuideBySlug, getAllGuideSlugs } from "@/lib/guideData";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };
  return { title: guide.title, description: guide.summary };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  return <GuideArticle guide={guide} />;
}
