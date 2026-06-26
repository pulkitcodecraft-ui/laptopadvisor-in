#!/usr/bin/env node
/**
 * Builds src/lib/laptopCatalog.ts from _import/laptops-preview.json
 * and copies matched images into public/laptops/
 *
 * Usage: node scripts/build-laptop-catalog.mjs
 */

import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const IMPORT_JSON = join(ROOT, "_import", "laptops-preview.json");
const IMAGE_SRC_DIR = join(ROOT, "_import", "images", "campuslooms wala");
const PUBLIC_LAPTOPS = join(ROOT, "public", "laptops");
const OUT_FILE = join(ROOT, "src", "lib", "laptopCatalog.ts");

/** Laptop name → source filename in zip (blank = no image) */
const IMAGE_FILES = {
  "Motorola Moto Book 60": "Mototbook-Background-Removed.png",
  'Apple MacBook Air 13" (M5)': "MacBook-Air-Image.webp",
  "Motorola Moto Book 60 Pro": "Moto-60-Pro-Background-Removed.png",
  "ASUS Vivobook 15": "assu-vivobook.png",
  "Lenovo LOQ 15 (RTX 3050A)": "lenovo-loq-Background-Removed.png",
  "ASUS TUF Gaming F16": "Asus-TUF-F16-Background-Removed.png",
  "ASUS TUF Gaming A15": "",
  'Apple MacBook Pro 14" (M5)': "pro.webp",
  "Apple MacBook Neo (2026)": "neo.webp",
  'Lenovo IdeaPad Slim 3 15" (Snapdragon)': "Slip-Remove-Background.png",
  "ASUS Vivobook S16": "Asus-Vivobook-16-Background-Removed.png",
  "ASUS Vivobook S14": "Vivobook-S24-Background-Removed.png",
  "IdeaPad Slim 3": "Slip-Remove-Background.png",
  "Acer Aspire 7 Gaming": "acer-aspire-7-Background-Removed.png",
  "HP Victus 15 (Ryzen 5, RTX 3050)": "Victus-Remove-Background.png",
  "Lenovo Yoga Slim 7 Aura": "lenovo-yoga-Background-Removed.png",
  "Samsung Galaxy Book4": "",
  "Samsung Galaxy Book5 AI": "Book-5-Background-Removed.png",
  "ASUS Vivobook Go 15 OLED": "assu-vivobook.png",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseBrand(name) {
  const brands = [
    "Motorola",
    "Apple",
    "ASUS",
    "Lenovo",
    "HP",
    "Acer",
    "Samsung",
  ];
  for (const b of brands) {
    if (name.startsWith(b)) return b;
  }
  return name.split(" ")[0];
}

function parseIndianAmount(token) {
  const t = token.trim().toLowerCase().replace(/[₹,\s]/g, "");
  if (!t) return 0;
  if (t.endsWith("l")) return Math.round(parseFloat(t) * 100000);
  if (t.endsWith("k")) return Math.round(parseFloat(t) * 1000);
  return Math.round(parseFloat(t));
}

function parsePriceRange(priceRange) {
  if (!priceRange || priceRange === "N/A") {
    return { price: 0, priceLabel: undefined, budgetRange: "50000-70000" };
  }

  const parts = priceRange.split(/\s*-\s*/);
  const nums = parts
    .map((part) => {
      const match = part.match(/[\d.]+[kKlL]?/);
      return match ? parseIndianAmount(match[0]) : 0;
    })
    .filter((n) => n > 0);

  const min = nums[0] ?? 0;
  const max = nums[1] ?? min;
  const mid = max ? Math.round((min + max) / 2) : min;

  let budgetRange = "50000-70000";
  if (mid < 50000) budgetRange = "under-50000";
  else if (mid <= 70000) budgetRange = "50000-70000";
  else if (mid <= 100000) budgetRange = "70000-100000";
  else budgetRange = "100000-plus";

  return { price: mid, priceLabel: priceRange, budgetRange };
}

function parseCpu(cpu) {
  if (!cpu || cpu === "N/A") {
    return { processor: "—", gpu: "—" };
  }
  const parts = cpu.split(" / ");
  return {
    processor: parts[0]?.trim() || cpu,
    gpu: parts[1]?.trim() || "Integrated",
  };
}

function parseTags(categories) {
  if (!categories) return ["General"];
  return categories
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
}

function parseBranches(categories) {
  const tags = parseTags(categories).join(" ").toLowerCase();
  const branches = new Set(["computer-science"]);

  if (tags.includes("gaming") || tags.includes("ml")) {
    branches.add("ai");
    branches.add("mechanical");
    branches.add("electronics");
  }
  if (tags.includes("design") || tags.includes("3d")) {
    branches.add("architecture");
    branches.add("mechanical");
  }
  if (tags.includes("video")) {
    branches.add("data-science");
    branches.add("ai");
  }
  if (tags.includes("coding")) {
    branches.add("computer-science");
    branches.add("data-science");
  }
  if (tags.includes("general")) {
    branches.add("electrical");
    branches.add("civil");
  }

  return [...branches];
}

function specOrDash(value) {
  if (!value || value === "N/A") return "—";
  return String(value).trim();
}

function ratingFor(row) {
  if (row.Description && row.Description !== "N/A" && row.Description.length > 80) {
    return 4.6;
  }
  if (row.Description && row.Description !== "N/A") return 4.4;
  return 4.2;
}

mkdirSync(PUBLIC_LAPTOPS, { recursive: true });

const { rows } = JSON.parse(readFileSync(IMPORT_JSON, "utf8"));
const catalog = [];

for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  const name = row.Name;
  const slug = slugify(name);
  const brand = parseBrand(name);
  const { price, priceLabel, budgetRange } = parsePriceRange(row["Price Range"]);
  const { processor, gpu } = parseCpu(row.CPU);
  const tags = parseTags(row.Categories);
  const branches = parseBranches(row.Categories);
  const sourceFile = IMAGE_FILES[name] ?? "";
  let image = "";

  if (sourceFile) {
    const srcPath = join(IMAGE_SRC_DIR, sourceFile);
    if (existsSync(srcPath)) {
      const ext = sourceFile.includes(".") ? sourceFile.slice(sourceFile.lastIndexOf(".")) : ".png";
      const destName = `${slug}${ext}`;
      copyFileSync(srcPath, join(PUBLIC_LAPTOPS, destName));
      image = `/laptops/${destName}`;
    }
  }

  catalog.push({
    id: `catalog-${i + 1}`,
    name,
    brand,
    slug,
    price,
    priceLabel,
    specs: {
      processor,
      gpu,
      display: specOrDash(row.Display),
      ram: specOrDash(row.RAM),
      battery: specOrDash(row.Battery),
      storage: specOrDash(row.Storage),
      weight: specOrDash(row.Weight),
    },
    image,
    description:
      row.Description && row.Description !== "N/A" ? row.Description : undefined,
    affiliateUrl: "https://www.amazon.in",
    rating: ratingFor(row),
    tags,
    isRecommended: Boolean(row.Description && row.Description !== "N/A" && row.Description.length > 60),
    branches,
    budgetRange,
  });
}

const ts = `/**
 * Auto-generated from Laptop_Database_For_Cursor.xlsx
 * Regenerate: node scripts/build-laptop-catalog.mjs
 */
import type { Laptop } from "@/lib/firebase/laptops";
import { applyCatalogEnrichment } from "@/lib/catalogEnrichment";

export type CatalogLaptop = Laptop & {
  priceLabel?: string;
  description?: string;
};

const LAPTOP_CATALOG_RAW: CatalogLaptop[] = ${JSON.stringify(
  catalog.map((l) => ({ ...l, updatedAt: "2026-06-24T00:00:00.000Z" })),
  null,
  2,
).replace(/"updatedAt": "([^"]+)"/g, 'updatedAt: new Date("$1")')};

export const LAPTOP_CATALOG: CatalogLaptop[] =
  LAPTOP_CATALOG_RAW.map(applyCatalogEnrichment);

export const LAPTOPS_WITH_IMAGES = LAPTOP_CATALOG.filter((l) => l.image).length;
export const LAPTOPS_MISSING_IMAGES = LAPTOP_CATALOG.filter((l) => !l.image).map(
  (l) => l.name,
);
`;

writeFileSync(OUT_FILE, ts, "utf8");
writeFileSync(
  join(ROOT, "_import", "laptop-catalog.json"),
  JSON.stringify(catalog, null, 2),
  "utf8",
);

console.log(`✅ Wrote ${catalog.length} laptops → src/lib/laptopCatalog.ts`);
console.log(`   With images: ${catalog.filter((l) => l.image).length}`);
console.log(`   Missing images: ${catalog.filter((l) => !l.image).map((l) => l.name).join(", ") || "none"}`);
