import Link from "next/link";
import { ArrowRight, Laptop } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Browse Laptops", href: "/laptops/" },
  { label: "Compare", href: "/compare/" },
  { label: "Guides", href: "/guides/" },
  { label: "Contact", href: "/contact/" },
  { label: "Privacy", href: "/privacy/" },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink text-white">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />

      <div className="section-container relative py-12 sm:py-14">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25 transition-transform group-hover:scale-105">
              <Laptop className="h-5 w-5 text-white" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              LaptopAdvisor<span className="text-white/35">.in</span>
            </span>
          </Link>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-[15px]">
            Clear laptop picks for engineering students — no sponsored rankings,
            no noise.
          </p>

          <Link
            href="/finder/"
            className="btn-shine mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 active:scale-[0.98]"
          >
            Find My Laptop
            <ArrowRight className="h-4 w-4" />
          </Link>

          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-x-1 gap-y-2"
            aria-label="Footer"
          >
            {FOOTER_LINKS.map((item, i) => (
              <span key={item.href} className="inline-flex items-center">
                {i > 0 && (
                  <span className="mx-2 text-white/20" aria-hidden>
                    ·
                  </span>
                )}
                <Link
                  href={item.href}
                  className="rounded-md px-1.5 py-1 text-sm text-white/55 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <p className="mt-10 text-xs text-white/35">
            © {new Date().getFullYear()} LaptopAdvisor.in
          </p>
        </div>
      </div>
    </footer>
  );
}
