import type { Metadata } from "next";
import Link from "next/link";
import {
  Apple,
  Banknote,
  BookOpen,
  Cpu,
  CreditCard,
  Gamepad2,
  Laptop,
  Monitor,
  Percent,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Laptop Buying Guides",
  description:
    "Expert guides for engineering students — MacBook vs Windows, AI/ML laptops, gaming, student discounts, and more.",
};

const GUIDES: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  category: string;
}[] = [
  {
    icon: Apple,
    title: "MacBook vs Windows for Engineering",
    description: "An honest comparison for Indian engineering students.",
    href: "/guides/macbook-vs-windows",
    category: "Platform",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning Laptops",
    description: "When you need a GPU and when Google Colab is enough.",
    href: "/guides/ai-machine-learning",
    category: "Branch",
  },
  {
    icon: Gamepad2,
    title: "Gaming in College",
    description: "Balancing gaming performance with portability and battery.",
    href: "/guides/gaming-in-college",
    category: "Lifestyle",
  },
  {
    icon: Laptop,
    title: "Best Laptop for Coding",
    description: "What specs actually matter for VS Code and development.",
    href: "/guides/laptop-for-coding",
    category: "Branch",
  },
  {
    icon: Percent,
    title: "Student Discounts in India",
    description: "Apple EDU, Microsoft, and campus store deals explained.",
    href: "/guides/student-discounts",
    category: "Savings",
  },
  {
    icon: Banknote,
    title: "GST Benefits for Students",
    description: "What you can and cannot claim as a student buyer.",
    href: "/guides/gst-benefits",
    category: "Savings",
  },
  {
    icon: CreditCard,
    title: "Credit Card Offers & EMI",
    description: "No-cost EMI traps and when offers actually save money.",
    href: "/guides/credit-card-offers",
    category: "Savings",
  },
  {
    icon: Wrench,
    title: "Service Center Quality",
    description: "Why brand service network matters more than specs.",
    href: "/guides/service-centers",
    category: "Buying Tips",
  },
  {
    icon: Monitor,
    title: "IIT Computer Labs",
    description: "What labs provide vs what you still need personally.",
    href: "/guides/iit-computer-labs",
    category: "College",
  },
  {
    icon: BookOpen,
    title: "Software Compatibility",
    description: "MATLAB, SolidWorks, and OS-specific gotchas.",
    href: "/guides/software-compatibility",
    category: "Buying Tips",
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeader
        eyebrow="GUIDES"
        title="Laptop Buying Guides"
        subtitle="Written like advice from a senior — honest, specific, and focused on what engineering students actually need."
        align="center"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((guide) => (
          <Link key={guide.href} href={guide.href}>
            <Card hover className="h-full">
              <div className="mb-3 flex items-center justify-between">
                <guide.icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wide text-accent">
                  {guide.category}
                </span>
              </div>
              <h3 className="font-semibold text-text">{guide.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {guide.description}
              </p>
              <p className="mt-4 text-sm font-medium text-primary">
                Read guide →
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
