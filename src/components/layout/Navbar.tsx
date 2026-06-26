"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Laptop, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { NavItem } from "@/components/layout/NavItem";
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

  const isLinkActive = (href: string) => {
    if (href === "/laptops") {
      return pathname.startsWith("/laptops") || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/95 md:bg-background/75 md:backdrop-blur-xl md:backdrop-saturate-150 dark:bg-background/95 dark:md:bg-background/80"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="section-container flex items-center justify-between py-2.5 sm:py-4">
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
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavItem
                label={link.label}
                href={link.href}
                comingSoon={"comingSoon" in link && link.comingSoon}
                active={!("comingSoon" in link) && isLinkActive(link.href)}
              />
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-card/70 text-text backdrop-blur active:scale-95"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-40 origin-top transition-all duration-300 md:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl dark:bg-mesh" />
        <div className="bg-grid absolute inset-0 opacity-50 dark:bg-grid-dark dark:opacity-40" />
        <div className="relative flex h-full flex-col px-5 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] pt-[calc(5.5rem+env(safe-area-inset-top,0px))] sm:px-6">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.label}
                className={cn(
                  "transition-all duration-500",
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: isOpen ? `${i * 60 + 80}ms` : "0ms" }}
              >
                <NavItem
                  label={link.label}
                  href={link.href}
                  comingSoon={"comingSoon" in link && link.comingSoon}
                  active={!("comingSoon" in link) && isLinkActive(link.href)}
                  onNavigate={() => setIsOpen(false)}
                  variant="menu"
                />
              </li>
            ))}
          </ul>

          <p className="mt-auto pt-10 text-center text-sm text-muted dark:text-white/50">
            India&apos;s trusted engineering laptop guide
          </p>
        </div>
      </div>
    </header>
  );
}
