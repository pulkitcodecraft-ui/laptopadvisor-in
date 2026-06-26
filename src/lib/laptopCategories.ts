
/** Exact category labels from Laptop_Database_For_Cursor.xlsx */
export const EXCEL_CATEGORY_TAGS = [
  "General",
  "Coding & Dev",
  "Design & 3D",
  "Gaming & ML",
  "Video Editing",
] as const;

export type ExcelCategoryTag = (typeof EXCEL_CATEGORY_TAGS)[number];

export type LaptopCategoryFilter = {
  id: string;
  label: string;
  tag?: ExcelCategoryTag;
};

export const LAPTOP_CATEGORY_FILTERS: LaptopCategoryFilter[] = [
  { id: "all", label: "All Recommendations" },
  { id: "coding-dev", label: "Coding & Dev", tag: "Coding & Dev" },
  { id: "design-3d", label: "Design & 3D", tag: "Design & 3D" },
  { id: "general", label: "General Studies", tag: "General" },
  { id: "gaming-ml", label: "Gaming & ML", tag: "Gaming & ML" },
  { id: "video-editing", label: "Video Editing", tag: "Video Editing" },
];

export type LaptopSortOption = "relevance" | "price-asc" | "price-desc";

export function laptopHasCategory(
  laptop: { tags: string[] },
  tag: ExcelCategoryTag,
): boolean {
  return laptop.tags.includes(tag);
}

export function filterLaptopsByCategory<T extends { tags: string[] }>(
  laptops: T[],
  categoryId: string,
): T[] {
  if (categoryId === "all") return laptops;
  const filter = LAPTOP_CATEGORY_FILTERS.find((c) => c.id === categoryId);
  if (!filter?.tag) return laptops;
  return laptops.filter((l) => laptopHasCategory(l, filter.tag!));
}

export function countLaptopsByCategory<T extends { tags: string[] }>(
  laptops: T[],
): Record<string, number> {
  const counts: Record<string, number> = { all: laptops.length };
  for (const filter of LAPTOP_CATEGORY_FILTERS) {
    if (!filter.tag) continue;
    counts[filter.id] = laptops.filter((l) =>
      laptopHasCategory(l, filter.tag!),
    ).length;
  }
  return counts;
}

export function sortLaptops<T extends { price: number; isRecommended?: boolean; rating?: number }>(
  laptops: T[],
  sort: LaptopSortOption,
): T[] {
  const copy = [...laptops];
  if (sort === "price-asc") {
    return copy.sort((a, b) => (a.price || 999999) - (b.price || 999999));
  }
  if (sort === "price-desc") {
    return copy.sort((a, b) => (b.price || 0) - (a.price || 0));
  }
  return copy.sort((a, b) => {
    if (a.isRecommended !== b.isRecommended) {
      return a.isRecommended ? -1 : 1;
    }
    return (b.rating ?? 0) - (a.rating ?? 0);
  });
}

export function getCategoryBadgeColor(tag: string): string {
  switch (tag) {
    case "Gaming & ML":
      return "border-emerald-400/50 text-emerald-600 dark:text-emerald-300";
    case "Coding & Dev":
      return "border-sky-400/50 text-sky-700 dark:text-sky-300";
    case "Design & 3D":
      return "border-violet-400/50 text-violet-700 dark:text-violet-300";
    case "Video Editing":
      return "border-rose-400/50 text-rose-700 dark:text-rose-300";
    case "General":
    default:
      return "border-amber-400/55 text-amber-700 dark:text-amber-300";
  }
}
