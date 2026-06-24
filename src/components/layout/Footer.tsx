import Link from "next/link";
import { Laptop } from "lucide-react";
import { BRANCHES, COLLEGES, slugify } from "@/lib/constants";

const RESOURCES = [
  { label: "Find My Laptop", href: "/finder" },
  { label: "Compare Laptops", href: "/compare" },
  { label: "Current Deals", href: "/deals" },
  { label: "Buying Guides", href: "/guides" },
];

const ABOUT = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Affiliate Disclosure", href: "/disclosure" },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
                <Laptop className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                LaptopAdvisor<span className="text-white/40">.in</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              India&apos;s most trusted laptop guide for JEE aspirants and
              engineering students. Unbiased, student-first, always updated.
            </p>
          </div>

          <LinkColumn
            title="Branches"
            links={BRANCHES.slice(0, 6).map((b) => ({
              label: b,
              href: `/branch/${slugify(b)}`,
            }))}
          />
          <LinkColumn
            title="Colleges"
            links={COLLEGES.slice(0, 6).map((c) => ({
              label: c,
              href: `/college/${slugify(c)}`,
            }))}
          />
          <LinkColumn title="Resources" links={RESOURCES} />
          <LinkColumn title="About" links={ABOUT} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} LaptopAdvisor.in — Engineering Laptop
            Advisor India
          </p>
          <p className="text-xs text-white/40">
            We may earn affiliate commissions. This never affects our
            recommendations.
          </p>
        </div>
      </div>
    </footer>
  );
}
