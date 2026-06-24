"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Laptop, Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/75 backdrop-blur-xl backdrop-saturate-150 dark:bg-background/80"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="section-container flex items-center justify-between py-3 sm:py-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 transition-transform group-hover:scale-105">
            <Laptop className="h-5 w-5 text-white" />
            <span className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-br from-primary to-accent opacity-40 blur-md" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-text sm:text-xl">
            <span className="text-gradient">Laptop</span>Advisor
            <span className="text-muted">.in</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "text-primary"
                      : "text-muted hover:text-text",
                  )}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-primary/10" />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/finder"
            className="btn-shine group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40"
          >
            Find My Laptop
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-card/70 text-text backdrop-blur"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 origin-top transition-all duration-300 md:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-mesh" />
        <div className="bg-grid-dark absolute inset-0" />
        <div className="relative flex h-full flex-col px-6 pb-10 pt-24">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => {
              const active = isLinkActive(link.href);
              return (
                <li
                  key={link.href}
                  className={cn(
                    "transition-all duration-500",
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0",
                  )}
                  style={{ transitionDelay: isOpen ? `${i * 60 + 80}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border border-white/10 px-5 py-4 text-lg font-semibold backdrop-blur transition-colors",
                      active
                        ? "bg-white/15 text-white"
                        : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {link.label}
                    <ArrowRight className="h-5 w-5 opacity-60" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto">
            <Link
              href="/finder"
              onClick={() => setIsOpen(false)}
              className="btn-shine flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent py-4 text-center text-lg font-bold text-white shadow-xl shadow-primary/40"
            >
              Find My Laptop
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-6 text-center text-sm text-white/50">
              India&apos;s trusted engineering laptop guide
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
