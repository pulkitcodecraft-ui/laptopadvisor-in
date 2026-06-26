import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Apple,
  ArrowRight,
  Banknote,
  CreditCard,
  Monitor,
  Percent,
  Sparkles,
  Wrench,
  Cpu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import MistakeCardsSection from "@/components/home/MistakeCardsSection";

const HomeLaptopBrowse = dynamic(
  () => import("@/components/home/HomeLaptopBrowse"),
  {
    loading: () => (
      <div className="space-y-6">
        <div className="h-10 w-48 animate-pulse rounded-full bg-border/60" />
        <div className="h-64 animate-pulse rounded-2xl bg-border/40" />
        <div className="h-64 animate-pulse rounded-2xl bg-border/40" />
      </div>
    ),
  },
);

const CONFUSION_TOPICS: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}[] = [
  { icon: Apple, title: "MacBook vs Windows", description: "Which platform actually works for your branch and college?", href: "/guides/macbook-vs-windows" },
  { icon: Percent, title: "Student Discounts", description: "Apple EDU, Microsoft, and campus store deals explained.", href: "/guides/student-discounts" },
  { icon: Banknote, title: "GST Benefits", description: "What students can claim and what sellers won't tell you.", href: "/guides/gst-benefits" },
  { icon: CreditCard, title: "Credit Card Offers", description: "No-cost EMI traps and when offers actually save money.", href: "/guides/credit-card-offers" },
  { icon: Wrench, title: "Service Center Quality", description: "Why brand service network matters more than specs.", href: "/guides/service-centers" },
  { icon: Monitor, title: "IIT Computer Labs", description: "What labs provide vs what you still need on your own.", href: "/guides/iit-computer-labs" },
  { icon: Cpu, title: "Software Compatibility", description: "MATLAB, SolidWorks, and OS-specific software gotchas.", href: "/guides/software-compatibility" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative -mt-[72px] overflow-hidden pt-[72px]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-light dark:bg-transparent">
          <div className="bg-grid absolute inset-0 opacity-60 dark:opacity-30" />
          <div className="hero-aurora hidden md:block">
            <div className="aurora-1 animate-aurora absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-primary/25 blur-[120px] dark:bg-primary/30" />
            <div className="aurora-2 animate-float-slow absolute -right-24 top-10 h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-[120px] dark:bg-accent/25" />
            <div className="aurora-3 animate-pulse-glow absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-pink-400/15 blur-[120px] dark:bg-primary/15" />
          </div>
          <div className="hidden dark:md:block absolute inset-0 bg-mesh opacity-50" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="section-container relative py-10 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="type-label inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-3 py-1.5 normal-case tracking-wide text-primary sm:px-3.5 dark:border-primary/25 dark:bg-card/80">
              <Sparkles className="h-3.5 w-3.5" />
              2 min quiz · top 3 picks
            </span>

            <h1 className="type-hero mt-5 text-text sm:mt-6">
              Find The Right
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient-shimmer">Laptop</span> For Your{" "}
              <span className="relative whitespace-nowrap">
                Branch
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 9C70 3 230 2 298 7"
                    stroke="url(#u)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="u" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4f46e5" />
                      <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="type-body-sm mt-5 max-w-xl text-muted sm:mt-7 sm:max-w-lg sm:text-lg sm:leading-relaxed">
              Branch-wise picks, real prices, and red flags — skip the 50-tab
              research before you spend{" "}
              <span className="font-semibold text-text">₹50,000–₹2,00,000</span>.
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4">
              <Button href="/finder" size="lg" className="group w-full sm:w-auto">
                Find My Laptop
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button href="/compare" variant="secondary" size="lg" className="w-full sm:w-auto">
                Compare Laptops
              </Button>
            </div>
            <p className="type-caption mt-4 text-center sm:text-left">
              No signup · under 2 minutes · only what matters for your branch
            </p>
          </div>
        </div>
      </section>

      <section className="premium-laptop-section border-y border-[var(--color-premium-border)] py-16 sm:py-24">
        <div className="section-container">
          <HomeLaptopBrowse />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="section-container">
          <SectionHeader
            eyebrow="Common Questions"
            title="What Are You Confused About?"
            subtitle="Straight answers — no long reads. Pick what applies to you."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONFUSION_TOPICS.map((topic) => (
              <Link key={topic.title} href={topic.href} className="group block h-full">
                <Card hover className="h-full">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 transition-transform group-hover:scale-110">
                    <topic.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="type-card-title text-text transition-colors group-hover:text-primary sm:text-base">
                    {topic.title}
                  </h3>
                  <p className="type-caption mt-2">
                    {topic.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MistakeCardsSection />
    </>
  );
}
