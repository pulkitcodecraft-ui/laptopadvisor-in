import type { LaptopSpecs } from "@/lib/firebase/laptops";

export type RamUpgradeable = "yes" | "no" | "partial";

export type CatalogEnrichment = {
  ramUpgradeable: RamUpgradeable;
  ramUpgradeNote: string;
  price?: number;
  priceLabel?: string;
  budgetRange?: string;
  priceSource?: string;
  specs?: Partial<LaptopSpecs>;
  description?: string;
};

/** Curated overrides — prices from Amazon/Flipkart/Samsung India, Jun 2026 */
export const CATALOG_ENRICHMENT: Record<string, CatalogEnrichment> = {
  "motorola-moto-book-60": {
    ramUpgradeable: "partial",
    ramUpgradeNote: "16GB soldered on most SKUs — verify before buying",
  },
  "apple-macbook-air-13-m5": {
    ramUpgradeable: "no",
    ramUpgradeNote: "Unified memory — choose 16GB or 24GB at purchase",
  },
  "motorola-moto-book-60-pro": {
    ramUpgradeable: "no",
    ramUpgradeNote: "LPDDR5X soldered — not user-upgradeable",
  },
  "asus-vivobook-15": {
    ramUpgradeable: "yes",
    ramUpgradeNote: "1 free SO-DIMM slot — upgrade to 24GB+ later",
  },
  "lenovo-loq-15-rtx-3050a": {
    ramUpgradeable: "yes",
    ramUpgradeNote: "Dual SO-DIMM slots — expand to 32GB for ML & gaming",
    price: 77500,
    priceLabel: "₹70k - ₹84k",
    budgetRange: "70000-100000",
    priceSource: "Amazon & Flipkart India · Jun 2026",
    specs: {
      storage: "512GB SSD",
      weight: "2.38 kg",
    },
    description:
      "RTX 3050 6GB at a student-friendly price — solid for CAD, CUDA notebooks, and 1080p gaming. Dual RAM slots; thermals are fine for long study sessions.",
  },
  "asus-tuf-gaming-f16": {
    ramUpgradeable: "yes",
    ramUpgradeNote: "DDR5 SO-DIMM — upgrade to 32GB for heavy CAD/ML",
    price: 93000,
    priceLabel: "₹87k - ₹99k",
    budgetRange: "70000-100000",
    priceSource: "Flipkart & Croma India · Jun 2026",
    specs: {
      storage: "512GB SSD",
      weight: "2.20 kg",
    },
    description:
      "16-inch RTX 4050 gaming rig — bigger screen for split-pane coding and better thermals than 14-inch ultrabooks. Strong pick for Mech/ECE with gaming.",
  },
  "asus-tuf-gaming-a15": {
    ramUpgradeable: "yes",
    ramUpgradeNote: "Dual DDR5 slots — easy RAM upgrade path",
  },
  "apple-macbook-pro-14-m5": {
    ramUpgradeable: "no",
    ramUpgradeNote: "Unified memory soldered — configure at purchase",
  },
  "apple-macbook-neo-2026": {
    ramUpgradeable: "no",
    ramUpgradeNote: "8GB unified soldered — not upgradeable after purchase",
    price: 72000,
    priceLabel: "₹64k - ₹80k",
    budgetRange: "70000-100000",
    priceSource: "Apple India & Amazon · Jun 2026",
    specs: {
      storage: "256GB SSD",
      weight: "1.24 kg",
    },
    description:
      "Cheapest way into macOS — great battery and build, but 8GB limits heavy Chrome + Docker. Fine for notes and light coding; not for CAD or serious ML.",
  },
  "lenovo-ideapad-slim-3-15-snapdragon": {
    ramUpgradeable: "no",
    ramUpgradeNote: "Onboard LPDDR5X — soldered, not upgradeable",
    price: 61500,
    priceLabel: "₹57k - ₹72k",
    budgetRange: "50000-70000",
    priceSource: "Flipkart & Reliance Digital · Jun 2026",
    specs: {
      ram: "16GB LPDDR5X",
      storage: "512GB SSD",
      weight: "1.55 kg",
      battery: "Long (12-14 Hr)",
    },
    description:
      "Copilot+ PC with Snapdragon X — exceptional battery for all-day campus use. ARM Windows limits some engineering software; verify your branch tools first.",
  },
  "asus-vivobook-s16": {
    ramUpgradeable: "yes",
    ramUpgradeNote: "DDR4 SO-DIMM slot — can add more RAM later",
  },
  "asus-vivobook-s14": {
    ramUpgradeable: "no",
    ramUpgradeNote: "LPDDR5X soldered on this SKU",
  },
  "ideapad-slim-3": {
    ramUpgradeable: "no",
    ramUpgradeNote: "LPDDR5 soldered — pick 16GB at purchase",
  },
  "acer-aspire-7-gaming": {
    ramUpgradeable: "yes",
    ramUpgradeNote: "Dual DDR4 slots — widely serviced, easy upgrade",
  },
  "hp-victus-15-ryzen-5-rtx-3050": {
    ramUpgradeable: "yes",
    ramUpgradeNote: "Ships 8GB — add a stick to 16GB immediately",
  },
  "lenovo-yoga-slim-7-aura": {
    ramUpgradeable: "no",
    ramUpgradeNote: "LPDDR5x soldered — Lunar Lake ultrabook",
  },
  "samsung-galaxy-book4": {
    ramUpgradeable: "no",
    ramUpgradeNote: "LPDDR4x soldered — 16GB fixed on this model",
    price: 60500,
    priceLabel: "₹56k - ₹65k",
    budgetRange: "50000-70000",
    priceSource: "Amazon & Flipkart India · Jun 2026",
    specs: {
      storage: "512GB SSD",
      weight: "1.55 kg",
    },
    description:
      "Reliable Samsung build with RJ45 Ethernet — rare on thin laptops. Good everyday coding machine; RAM is not upgradeable so 16GB is the ceiling.",
  },
  "samsung-galaxy-book5-ai": {
    ramUpgradeable: "no",
    ramUpgradeNote: "LPDDR5x onboard — AI PC, not upgradeable",
    price: 96000,
    priceLabel: "₹88k - ₹1.04L",
    budgetRange: "70000-100000",
    priceSource: "Samsung India official · Jun 2026",
    specs: {
      storage: "512GB SSD",
      weight: "1.55 kg",
    },
    description:
      "Galaxy AI + Core Ultra 7 with OLED — premium everyday laptop with Copilot+ features. Soldered RAM; pick 16GB at purchase.",
  },
  "asus-vivobook-go-15-oled": {
    ramUpgradeable: "no",
    ramUpgradeNote: "LPDDR5 soldered — 8GB only on base model",
  },
};

export function inferRamUpgradeFromLabel(
  ram: string,
): Pick<CatalogEnrichment, "ramUpgradeable" | "ramUpgradeNote"> | null {
  if (!ram || ram === "—") return null;
  if (/unified|lpddr/i.test(ram)) {
    return {
      ramUpgradeable: "no",
      ramUpgradeNote: "Soldered memory — choose capacity at purchase",
    };
  }
  if (ram.includes("*")) {
    return {
      ramUpgradeable: "yes",
      ramUpgradeNote: "User-accessible RAM slot(s)",
    };
  }
  return null;
}

export function applyCatalogEnrichment<
  T extends {
    slug: string;
    price: number;
    priceLabel?: string;
    budgetRange: string;
    specs: LaptopSpecs;
    description?: string;
  },
>(laptop: T): T & { priceSource?: string } {
  const extra = CATALOG_ENRICHMENT[laptop.slug];
  const inferred = inferRamUpgradeFromLabel(laptop.specs.ram);

  const ramUpgradeable =
    extra?.ramUpgradeable ?? inferred?.ramUpgradeable ?? "partial";
  const ramUpgradeNote =
    extra?.ramUpgradeNote ??
    inferred?.ramUpgradeNote ??
    "Confirm with retailer before buying";

  return {
    ...laptop,
    price: extra?.price ?? laptop.price,
    priceLabel: extra?.priceLabel ?? laptop.priceLabel,
    budgetRange: extra?.budgetRange ?? laptop.budgetRange,
    description: extra?.description ?? laptop.description,
    priceSource: extra?.priceSource,
    specs: {
      ...laptop.specs,
      ...extra?.specs,
      ramUpgradeable,
      ramUpgradeNote,
    },
  };
}
