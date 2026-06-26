"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GraduationCap, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  {
    id: "laptops",
    href: "/laptops/",
    label: "Laptops",
    icon: Laptop,
    match: (p: string) => p.startsWith("/laptops") || p === "/",
  },
  {
    id: "offers",
    label: "Student Offers",
    icon: GraduationCap,
    comingSoon: true,
    match: () => false,
  },
] as const;

export default function MobileTabBar() {
  const pathname = usePathname();
  const [showHint, setShowHint] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  function revealComingSoon() {
    setShowHint(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowHint(false), 2200);
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 md:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="relative mx-auto flex max-w-xs items-stretch justify-around px-2 pt-1">
        {TABS.map((tab) => {
          const { label, icon: Icon, match } = tab;
          const comingSoon = "comingSoon" in tab && tab.comingSoon;
          const active = !comingSoon && match(pathname);

          if (comingSoon) {
            return (
              <li key={tab.id} className="relative flex-1">
                <button
                  type="button"
                  onClick={revealComingSoon}
                  className="flex min-h-[52px] w-full flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-semibold text-muted transition-colors active:scale-95"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                  {label}
                </button>
                <span
                  role="status"
                  className={cn(
                    "pointer-events-none absolute bottom-[calc(100%+4px)] left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--color-kit-yellow)]/35 bg-card px-2.5 py-1 text-[10px] font-semibold text-[var(--color-kit-yellow)] shadow-lg transition-all duration-300",
                    showHint
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-1 scale-95 opacity-0",
                  )}
                >
                  Coming soon…
                </span>
              </li>
            );
          }

          if ("href" in tab) {
            return (
              <li key={tab.id} className="flex-1">
                <Link
                  href={tab.href}
                  className={cn(
                  "flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition-colors active:scale-95",
                  active ? "text-primary" : "text-muted",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-xl transition-colors",
                    active && "bg-primary/10 text-primary",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.25 : 2} />
                </span>
                {label}
              </Link>
            </li>
          );
          }

          return null;
        })}
      </ul>
    </nav>
  );
}
