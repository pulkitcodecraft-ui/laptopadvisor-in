"use client";

import Link from "next/link";
import { GitCompare, X } from "lucide-react";

type CompareSelectionBarProps = {
  count: number;
  max: number;
  onClear: () => void;
};

export default function CompareSelectionBar({
  count,
  max,
  onClear,
}: CompareSelectionBarProps) {
  if (count === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-40 px-4 pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:bottom-6 md:px-6 md:pb-0"
      style={{ bottom: 0 }}
    >
      <div className="pointer-events-auto mx-auto flex max-w-2xl items-center gap-3 rounded-2xl border border-[var(--color-teal)]/30 bg-card/95 p-3 shadow-[0_20px_50px_-20px_rgba(46,230,184,0.35)] backdrop-blur-xl md:p-4 dark:bg-[#13131e]/95">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-teal)]/15 text-[var(--color-teal)]">
            <GitCompare className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-text">
              {count} laptop{count !== 1 ? "s" : ""} selected
            </p>
            <p className="text-xs text-muted">
              Pick up to {max} · tap Compare when ready
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-red-400/40 hover:text-red-400"
          aria-label="Clear selection"
        >
          <X className="h-4 w-4" />
        </button>

        <Link
          href="/compare/"
          className="premium-btn premium-btn-solid shrink-0 !min-h-10 !px-4 !py-2.5 text-sm"
        >
          Compare
        </Link>
      </div>
    </div>
  );
}
