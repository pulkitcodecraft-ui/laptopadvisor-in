import { slugify } from "@/lib/constants";

/**
 * Curated product-style images (neutral background, object-contain friendly).
 * Keys are laptop slugs. Update with official Amazon/media URLs when available.
 */
export const LAPTOP_IMAGE_CATALOG: Record<string, string> = {
  "lenovo-ideapad-slim-5":
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85&fit=crop",
  "apple-macbook-air-m2":
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=85&fit=crop",
  "asus-vivobook-16":
    "https://images.unsplash.com/photo-1588872917328-466556784846?w=800&q=85&fit=crop",
  "hp-victus-15":
    "https://images.unsplash.com/photo-1603302576837-37561b547382?w=800&q=85&fit=crop",
  "lenovo-loq-15":
    "https://images.unsplash.com/photo-1525547719578-a2d4ac8915e2?w=800&q=85&fit=crop",
  "acer-aspire-5":
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=85&fit=crop",
  "dell-g15":
    "https://images.unsplash.com/photo-1603302576837-37561b547382?w=800&q=85&fit=crop",
  "asus-vivobook-pro-15":
    "https://images.unsplash.com/photo-1588872917328-466556784846?w=800&q=85&fit=crop",
  "hp-pavilion-15":
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85&fit=crop",
  "asus-zenbook-14":
    "https://images.unsplash.com/photo-1525547719578-a2d4ac8915e2?w=800&q=85&fit=crop",
  "lenovo-thinkpad-e14":
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85&fit=crop",
  "asus-vivobook-15":
    "https://images.unsplash.com/photo-1588872917328-466556784846?w=800&q=85&fit=crop",
  "asus-tuf-a15":
    "https://images.unsplash.com/photo-1603302576837-37561b547382?w=800&q=85&fit=crop",
};

/** Models using generic stock photos — replace with official product renders when sourced. */
export const STOCK_PHOTO_ONLY_SLUGS = new Set([
  "dell-g15",
  "asus-vivobook-pro-15",
  "hp-pavilion-15",
  "asus-zenbook-14",
  "lenovo-thinkpad-e14",
  "asus-vivobook-15",
  "asus-tuf-a15",
]);

export function resolveLaptopImage(nameOrSlug: string, fallbackUrl = ""): string {
  if (!nameOrSlug && fallbackUrl) return fallbackUrl;

  const slug = slugify(nameOrSlug);
  if (LAPTOP_IMAGE_CATALOG[slug]) return LAPTOP_IMAGE_CATALOG[slug];

  const byPartial = Object.entries(LAPTOP_IMAGE_CATALOG).find(([key]) =>
    slug.includes(key) || key.includes(slug),
  );
  if (byPartial) return byPartial[1];

  return fallbackUrl;
}

export function hasRealProductImage(nameOrSlug: string): boolean {
  const slug = slugify(nameOrSlug);
  return Boolean(LAPTOP_IMAGE_CATALOG[slug]) && !STOCK_PHOTO_ONLY_SLUGS.has(slug);
}
