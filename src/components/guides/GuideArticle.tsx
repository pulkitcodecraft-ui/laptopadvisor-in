"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/motion/ScrollReveal";
import type { Guide } from "@/lib/guideData";

export default function GuideArticle({ guide }: { guide: Guide }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <ScrollReveal variant="section">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {guide.category}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{guide.summary}</p>
      </ScrollReveal>

      <div className="prose-section mt-10 space-y-6">
        {guide.sections.map((section, i) => (
          <ScrollReveal key={section.heading} index={i}>
            <Card className="border-l-4 border-l-primary/30">
              <h2 className="text-lg font-semibold text-text">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-muted">{section.content}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal index={guide.sections.length}>
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-text">Bottom line</h2>
          <p className="mt-2 leading-relaxed text-muted">{guide.conclusion}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal index={guide.sections.length + 1}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/finder" size="lg">
            Find My Laptop →
          </Button>
          <Button href="/guides" variant="secondary" size="lg">
            All Guides
          </Button>
        </div>
      </ScrollReveal>
    </article>
  );
}
