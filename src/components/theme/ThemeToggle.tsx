"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card/70 text-text backdrop-blur transition-colors hover:border-primary/30 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {!mounted ? (
        <span className="h-5 w-5" aria-hidden />
      ) : (
        <>
          <Sun
            className={cn(
              "absolute h-5 w-5 transition-all duration-200 ease-out",
              isDark
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100",
            )}
            aria-hidden
          />
          <Moon
            className={cn(
              "absolute h-5 w-5 transition-all duration-200 ease-out",
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0",
            )}
            aria-hidden
          />
        </>
      )}
    </button>
  );
}
