import type { Deal } from "@/lib/firebase/deals";
import { LAPTOP_CATALOG, type CatalogLaptop } from "@/lib/laptopCatalog";

export type { CatalogLaptop };

/** Primary laptop dataset (from Laptop_Database_For_Cursor.xlsx) */
export const SAMPLE_LAPTOPS: CatalogLaptop[] = LAPTOP_CATALOG;

export function findLaptopBySlug(slug: string): CatalogLaptop | undefined {
  return SAMPLE_LAPTOPS.find((l) => l.slug === slug);
}

export function findLaptopByName(name: string): CatalogLaptop | undefined {
  const normalized = name.toLowerCase().trim();

  const exact = SAMPLE_LAPTOPS.find(
    (l) => l.name.toLowerCase() === normalized,
  );
  if (exact) return exact;

  return SAMPLE_LAPTOPS.find(
    (l) =>
      normalized.includes(l.name.toLowerCase()) ||
      l.name.toLowerCase().includes(normalized),
  );
}

export const SAMPLE_DEALS: Deal[] = [
  {
    id: "deal-1",
    laptopId: "catalog-1",
    laptopName: "Motorola Moto Book 60",
    originalPrice: 60000,
    dealPrice: 54500,
    discount: 9,
    platform: "Amazon.in",
    affiliateUrl: "https://www.amazon.in",
    validUntil: new Date("2026-07-01T00:00:00.000Z"),
    isActive: true,
  },
  {
    id: "deal-2",
    laptopId: "catalog-2",
    laptopName: 'Apple MacBook Air 13" (M5)',
    originalPrice: 120000,
    dealPrice: 107500,
    discount: 10,
    platform: "Amazon.in",
    affiliateUrl: "https://www.amazon.in",
    validUntil: new Date("2026-06-29T00:00:00.000Z"),
    isActive: true,
  },
  {
    id: "deal-3",
    laptopId: "catalog-16",
    laptopName: "HP Victus 15 (Ryzen 5, RTX 3050)",
    originalPrice: 72000,
    dealPrice: 67500,
    discount: 6,
    platform: "Flipkart",
    affiliateUrl: "https://www.flipkart.com",
    validUntil: new Date("2026-06-27T00:00:00.000Z"),
    isActive: true,
  },
];
