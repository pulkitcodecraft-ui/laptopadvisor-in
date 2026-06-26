"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItemProps = {
  label: string;
  href: string;
  active?: boolean;
  comingSoon?: boolean;
  onNavigate?: () => void;
  variant?: "pill" | "menu";
};

export function NavItem({
  label,
  href,
  active = false,
  comingSoon = false,
  onNavigate,
  variant = "pill",
}: NavItemProps) {
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

  const hint = (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none absolute left-1/2 top-[calc(100%+6px)] z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--color-kit-yellow)]/35 bg-card px-3 py-1 text-[11px] font-semibold text-[var(--color-kit-yellow)] shadow-lg transition-all duration-300",
        showHint
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-1 scale-95 opacity-0",
      )}
    >
      Coming soon…
    </span>
  );

  if (comingSoon) {
    return (
      <div className="relative w-full">
        <button
          type="button"
          onClick={revealComingSoon}
          className={cn(
            variant === "menu"
              ? "flex min-h-[56px] w-full items-center justify-between rounded-2xl border border-border bg-card/80 px-5 py-4 text-base font-semibold text-muted backdrop-blur active:scale-[0.99] sm:text-lg dark:border-white/10 dark:bg-white/5 dark:text-white/80"
              : "relative rounded-full px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-text active:scale-[0.98]",
          )}
        >
          {label}
          {variant === "menu" && <ArrowRight className="h-5 w-5 opacity-40" />}
        </button>
        {hint}
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        className={cn(
          "flex min-h-[56px] items-center justify-between rounded-2xl border px-5 py-4 text-base font-semibold backdrop-blur transition-colors active:scale-[0.99] sm:text-lg",
          active
            ? "border-primary/30 bg-primary/10 text-primary dark:border-white/20 dark:bg-white/15 dark:text-white"
            : "border-border bg-card/80 text-text hover:bg-card dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white",
        )}
      >
        {label}
        <ArrowRight className="h-5 w-5 opacity-60" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active ? "text-primary" : "text-muted hover:text-text",
      )}
    >
      {active && (
        <span className="absolute inset-0 -z-10 rounded-full bg-primary/10" />
      )}
      {label}
    </Link>
  );
}
