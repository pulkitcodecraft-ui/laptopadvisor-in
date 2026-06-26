"use client";

import { cn } from "@/lib/utils";
import { LAPTOP_CATEGORY_FILTERS } from "@/lib/laptopCategories";

const MOBILE_SHORT_LABELS: Record<string, string> = {
  all: "All",
  "coding-dev": "Coding",
  "design-3d": "Design",
  general: "General",
  "gaming-ml": "Gaming",
  "video-editing": "Video",
};

type CategoryFilterBarProps = {
  activeId: string;
  counts: Record<string, number>;
  onChange: (id: string) => void;
};

export default function CategoryFilterBar({
  activeId,
  counts,
  onChange,
}: CategoryFilterBarProps) {
  return (
    <div className="scroll-fade-x relative -mx-1">
      <div className="scroll-snap-x flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide">
        {LAPTOP_CATEGORY_FILTERS.map((filter) => {
          const active = activeId === filter.id;
          const count = counts[filter.id] ?? 0;
          const shortLabel = MOBILE_SHORT_LABELS[filter.id] ?? filter.label;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChange(filter.id)}
              className={cn(
                "min-h-[44px] shrink-0 snap-start rounded-full px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] sm:px-4",
                active
                  ? "bg-[var(--color-teal)] text-[#06231c] shadow-[0_0_24px_-4px_rgba(46,230,184,0.45)]"
                  : "border border-border bg-card/60 text-muted hover:border-[var(--color-teal)]/40 hover:text-text",
              )}
            >
              <span className="sm:hidden">{shortLabel}</span>
              <span className="hidden sm:inline">{filter.label}</span>
              <span
                className={cn(
                  "ml-1 tabular-nums sm:ml-1.5",
                  active ? "text-black/70" : "text-muted",
                )}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
