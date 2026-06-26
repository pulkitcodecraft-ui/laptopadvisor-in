import { slugify } from "@/lib/constants";
import { LAPTOP_CATALOG } from "@/lib/laptopCatalog";

/** Local product images under /public/laptops (from campuslooms zip). */
export const LOCAL_LAPTOP_IMAGES: Record<string, string> = Object.fromEntries(
  LAPTOP_CATALOG.filter((l) => l.image).map((l) => [l.slug, l.image]),
);

export function resolveLaptopImage(nameOrSlug: string, fallbackUrl = ""): string {
  if (!nameOrSlug && fallbackUrl) return fallbackUrl;

  const slug = slugify(nameOrSlug);
  if (LOCAL_LAPTOP_IMAGES[slug]) return LOCAL_LAPTOP_IMAGES[slug];

  const byPartial = Object.entries(LOCAL_LAPTOP_IMAGES).find(
    ([key]) => slug.includes(key) || key.includes(slug),
  );
  if (byPartial) return byPartial[1];

  return fallbackUrl;
}

export function hasRealProductImage(nameOrSlug: string): boolean {
  const slug = slugify(nameOrSlug);
  return Boolean(LOCAL_LAPTOP_IMAGES[slug]);
}

export function getLaptopsMissingImages(): string[] {
  return LAPTOP_CATALOG.filter((l) => !l.image).map((l) => l.name);
}

/** @deprecated Use LOCAL_LAPTOP_IMAGES */
export const LAPTOP_IMAGE_CATALOG = LOCAL_LAPTOP_IMAGES;

/** @deprecated */
export const STOCK_PHOTO_ONLY_SLUGS = new Set<string>();
