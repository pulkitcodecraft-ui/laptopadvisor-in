"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import CategoryFilterBar from "@/components/laptops/CategoryFilterBar";
import CampusLaptopCard from "@/components/laptops/CampusLaptopCard";
import CompareSelectionBar from "@/components/laptops/CompareSelectionBar";
import SectionHeader from "@/components/ui/SectionHeader";
import { useCompareSelection } from "@/hooks/useCompareSelection";
import { LAPTOP_CATALOG, type CatalogLaptop } from "@/lib/laptopCatalog";
import {
  countLaptopsByCategory,
  filterLaptopsByCategory,
  LAPTOP_CATEGORY_FILTERS,
  sortLaptops,
  type LaptopSortOption,
} from "@/lib/laptopCategories";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { value: LaptopSortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const PAGE_SIZE = 4;

type CategorizedLaptopBrowseProps = {
  laptops?: CatalogLaptop[];
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
};

export default function CategorizedLaptopBrowse({
  laptops = LAPTOP_CATALOG,
  showHeader = true,
  title = "Engineering Laptop Picks",
  subtitle = "Same categories as our Excel database — Coding & Dev, Design & 3D, Gaming & ML, General, and Video Editing.",
}: CategorizedLaptopBrowseProps) {
  const [categoryId, setCategoryId] = useState("all");
  const [sort, setSort] = useState<LaptopSortOption>("relevance");
  const [page, setPage] = useState(0);
  const [compareHint, setCompareHint] = useState("");
  const {
    count: compareCount,
    hydrated: compareHydrated,
    isFull: compareFull,
    toggle: toggleCompare,
    clear: clearCompare,
    isSelected: isInCompare,
  } = useCompareSelection();

  const counts = useMemo(() => countLaptopsByCategory(laptops), [laptops]);

  const filtered = useMemo(() => {
    const byCategory = filterLaptopsByCategory(laptops, categoryId);
    return sortLaptops(byCategory, sort);
  }, [laptops, categoryId, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  const activeFilter = LAPTOP_CATEGORY_FILTERS.find((f) => f.id === categoryId);

  useEffect(() => {
    if (!compareHint) return;
    const timer = setTimeout(() => setCompareHint(""), 2800);
    return () => clearTimeout(timer);
  }, [compareHint]);

  function handleCategoryChange(nextCategoryId: string) {
    setCategoryId(nextCategoryId);
    setPage(0);
  }

  function handleSortChange(nextSort: LaptopSortOption) {
    setSort(nextSort);
    setPage(0);
  }

  function handleToggleCompare(laptop: CatalogLaptop) {
    const result = toggleCompare(laptop.id);
    if (result.limited) {
      setCompareHint("Max 3 laptops — remove one to add another.");
    }
  }

  return (
    <div
      className={cn(
        "space-y-6",
        compareHydrated && compareCount > 0 && "pb-24 md:pb-20",
      )}
    >
      {showHeader && (
        <SectionHeader
          eyebrow="Browse by use case"
          title={title}
          subtitle={subtitle}
        />
      )}

      <div className="space-y-4">
        <CategoryFilterBar
          activeId={categoryId}
          counts={counts}
          onChange={handleCategoryChange}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="type-caption">
              Showing{" "}
              <span className="font-semibold text-text">{filtered.length}</span>{" "}
              laptop{filtered.length !== 1 ? "s" : ""}
              {activeFilter && activeFilter.id !== "all"
                ? ` · ${activeFilter.label}`
                : ""}
              {filtered.length > PAGE_SIZE && (
                <>
                  {" "}
                  · page {safePage + 1} of {pageCount}
                </>
              )}
            </p>
            <Link
              href="/compare/"
              className="text-sm font-semibold text-[var(--color-teal)] transition-colors hover:text-[var(--color-teal-deep)]"
            >
              {compareCount > 0
                ? `Compare ${compareCount} selected →`
                : "Open compare tool →"}
            </Link>
          </div>

          <div className="relative shrink-0">
            <label htmlFor="laptop-sort" className="sr-only">
              Sort laptops
            </label>
            <select
              id="laptop-sort"
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as LaptopSortOption)}
              className="min-h-[44px] w-full min-w-[168px] appearance-none rounded-xl border border-border bg-card py-2.5 pl-3 pr-9 text-sm font-medium text-text focus:border-[var(--color-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/20 sm:min-w-[180px]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </div>

        {compareHint && (
          <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm font-medium text-amber-800 dark:text-amber-200">
            {compareHint}
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted">
          No laptops in this category.
        </div>
      ) : (
        <>
          <div className="kit-laptop-list">
            {visible.map((laptop) => (
              <div key={laptop.id} className="cv-auto-compact">
                <CampusLaptopCard
                  laptop={laptop}
                  compareEnabled={compareHydrated}
                  isInCompare={isInCompare(laptop.id)}
                  compareDisabled={compareFull && !isInCompare(laptop.id)}
                  onToggleCompare={() => handleToggleCompare(laptop)}
                />
              </div>
            ))}
          </div>

          {pageCount > 1 && (
            <nav
              className="flex items-center justify-center gap-2 pt-2"
              aria-label="Laptop pages"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={safePage === 0}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-[var(--color-teal)]/40 hover:text-text disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  className={cn(
                    "inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-semibold transition-all",
                    i === safePage
                      ? "bg-[var(--color-teal)] text-[#06231c] shadow-[0_0_20px_-4px_rgba(46,230,184,0.5)]"
                      : "border border-border text-muted hover:border-[var(--color-teal)]/40 hover:text-text",
                  )}
                  aria-current={i === safePage ? "page" : undefined}
                >
                  {i + 1}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={safePage >= pageCount - 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-[var(--color-teal)]/40 hover:text-text disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          )}
        </>
      )}

      {compareHydrated && (
        <CompareSelectionBar
          count={compareCount}
          max={3}
          onClear={clearCompare}
        />
      )}
    </div>
  );
}
