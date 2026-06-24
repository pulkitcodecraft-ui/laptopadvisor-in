import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        {guide.category}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{guide.summary}</p>

      <div className="prose-section mt-10 space-y-6">
        {guide.sections.map((section) => (
          <Card key={section.heading} className="border-l-4 border-l-primary/30">
            <h2 className="text-lg font-semibold text-text">{section.heading}</h2>
            <p className="mt-3 leading-relaxed text-muted">{section.content}</p>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-text">Bottom line</h2>
        <p className="mt-2 leading-relaxed text-muted">{guide.conclusion}</p>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/finder" size="lg">
          Find My Laptop →
        </Button>
        <Button href="/guides" variant="secondary" size="lg">
          All Guides
        </Button>
      </div>
    </article>
  );
}
