/**
 * Auto-generated from Laptop_Database_For_Cursor.xlsx
 * Regenerate: node scripts/build-laptop-catalog.mjs
 */
import type { Laptop } from "@/lib/firebase/laptops";
import { applyCatalogEnrichment } from "@/lib/catalogEnrichment";

export type CatalogLaptop = Laptop & {
  priceLabel?: string;
  description?: string;
};

const LAPTOP_CATALOG_RAW: CatalogLaptop[] = [
  {
    "id": "catalog-1",
    "name": "Motorola Moto Book 60",
    "brand": "Motorola",
    "slug": "motorola-moto-book-60",
    "price": 54500,
    "priceLabel": "₹49k - ₹60k",
    "specs": {
      "processor": "5 210H",
      "gpu": "Graphics",
      "display": "14\" (OLED, 120Hz)",
      "ram": "16GB DDR5*",
      "battery": "Standard (5-6 Hr)",
      "storage": "512GB SSD",
      "weight": "1.40 kg"
    },
    "image": "/laptops/motorola-moto-book-60.png",
    "description": "The hidden gem of the entire list. Under ₹55k, you get a full-metal chassis, MIL-STD-810H durability, a 2.8K 120Hz OLED with 100% DCI-P3 (a display quality that laptops at...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "General",
      "Coding & Dev",
      "Design & 3D"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "architecture",
      "mechanical",
      "data-science",
      "electrical",
      "civil"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-2",
    "name": "Apple MacBook Air 13\" (M5)",
    "brand": "Apple",
    "slug": "apple-macbook-air-13-m5",
    "price": 107500,
    "priceLabel": "₹95k - ₹1.2L",
    "specs": {
      "processor": "M5 Chip",
      "gpu": "Integrated",
      "display": "13.6\" (Retina)",
      "ram": "16GB Unified",
      "battery": "Ultra (16-18 Hr)",
      "storage": "512GB SSD",
      "weight": "1.24 kg"
    },
    "image": "/laptops/apple-macbook-air-13-m5.webp",
    "description": "The single easiest laptop recommendation for most college students — silent, incredibly fast, 18-hour real battery, and the display is excellent for design work. The M...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "Coding & Dev",
      "General",
      "Design & 3D",
      "Video Editing"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "architecture",
      "mechanical",
      "data-science",
      "ai",
      "electrical",
      "civil"
    ],
    "budgetRange": "100000-plus",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-3",
    "name": "Motorola Moto Book 60 Pro",
    "brand": "Motorola",
    "slug": "motorola-moto-book-60-pro",
    "price": 80000,
    "priceLabel": "₹70k - ₹90k",
    "specs": {
      "processor": "Ultra 5 225H",
      "gpu": "Arc",
      "display": "14\" (OLED, 120Hz)",
      "ram": "16GB LPDDR5X",
      "battery": "Standard (5-6 Hr)",
      "storage": "512GB SSD",
      "weight": "1.39 kg"
    },
    "image": "/laptops/motorola-moto-book-60-pro.png",
    "description": "Massively underrated. At ₹70-90k, no other Windows laptop gives you a full-metal MIL-STD-810H body, a 2.8K 120Hz OLED with 100% DCI-P3, and a Core Ultra H-series chip...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "General",
      "Coding & Dev",
      "Design & 3D",
      "Video Editing"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "architecture",
      "mechanical",
      "data-science",
      "ai",
      "electrical",
      "civil"
    ],
    "budgetRange": "70000-100000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-4",
    "name": "ASUS Vivobook 15",
    "brand": "ASUS",
    "slug": "asus-vivobook-15",
    "price": 59000,
    "priceLabel": "₹55k - ₹63k",
    "specs": {
      "processor": "i5-13420H",
      "gpu": "UHD",
      "display": "15.6\" (FHD)",
      "ram": "16GB DDR4*",
      "battery": "Standard (5-6 Hr)",
      "storage": "512GB SSD",
      "weight": "1.70 kg"
    },
    "image": "/laptops/asus-vivobook-15.png",
    "description": "The most straightforward first-year coding pick: widely available, well-serviced, and fast enough for VS Code, Python, web dev, and college work. The 16GB DDR4 is...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "General",
      "Coding & Dev"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "data-science",
      "electrical",
      "civil"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-5",
    "name": "Lenovo LOQ 15 (RTX 3050A)",
    "brand": "Lenovo",
    "slug": "lenovo-loq-15-rtx-3050a",
    "price": 0,
    "specs": {
      "processor": "i5-12450HX",
      "gpu": "RTX 3050A",
      "display": "15.6\" (FHD, 144Hz)",
      "ram": "16GB DDR5*",
      "battery": "Perf (3-4 Hr)",
      "storage": "—",
      "weight": "—"
    },
    "image": "/laptops/lenovo-loq-15-rtx-3050a.png",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.2,
    "tags": [
      "Gaming & ML",
      "Coding & Dev",
      "Video Editing"
    ],
    "isRecommended": false,
    "branches": [
      "computer-science",
      "ai",
      "mechanical",
      "electronics",
      "data-science"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-6",
    "name": "ASUS TUF Gaming F16",
    "brand": "ASUS",
    "slug": "asus-tuf-gaming-f16",
    "price": 0,
    "specs": {
      "processor": "5 210H",
      "gpu": "RTX 4050 6GB",
      "display": "16\" (FHD, 144Hz)",
      "ram": "16GB DDR5*",
      "battery": "Perf (4 Hr)",
      "storage": "—",
      "weight": "—"
    },
    "image": "/laptops/asus-tuf-gaming-f16.png",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.2,
    "tags": [
      "Gaming & ML",
      "Coding & Dev",
      "Video Editing"
    ],
    "isRecommended": false,
    "branches": [
      "computer-science",
      "ai",
      "mechanical",
      "electronics",
      "data-science"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-7",
    "name": "ASUS TUF Gaming A15",
    "brand": "ASUS",
    "slug": "asus-tuf-gaming-a15",
    "price": 56500,
    "priceLabel": "₹53k - ₹60k",
    "specs": {
      "processor": "Ryzen 7 7435HS",
      "gpu": "RTX 2050 4GB",
      "display": "15.6\" (FHD, 144Hz)",
      "ram": "16GB DDR5*",
      "battery": "Standard (5-6 Hr)",
      "storage": "512GB SSD",
      "weight": "2.2 kg"
    },
    "image": "",
    "description": "The only laptop under ₹60k with a discrete Nvidia GPU — the RTX 2050 is a minimal GPU but enough for light CAD, running CUDA, and casual gaming at low-medium settings...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "Gaming & ML",
      "Coding & Dev"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "ai",
      "mechanical",
      "electronics",
      "data-science"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-8",
    "name": "Apple MacBook Pro 14\" (M5)",
    "brand": "Apple",
    "slug": "apple-macbook-pro-14-m5",
    "price": 230000,
    "priceLabel": "₹1.6L - ₹3L",
    "specs": {
      "processor": "M5 Pro",
      "gpu": "Integrated",
      "display": "14.2\" (Retina XDR, 120Hz)",
      "ram": "16GB Unified",
      "battery": "Ultra (18+ Hr)",
      "storage": "512GB SSD",
      "weight": "1.55 kg"
    },
    "image": "/laptops/apple-macbook-pro-14-m5.webp",
    "description": "For CS, design, and media students who need sustained performance without compromise. The M5 Pro chip handles 4K exports, Xcode builds, and large codebases...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "Coding & Dev",
      "Design & 3D",
      "Video Editing"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "architecture",
      "mechanical",
      "data-science",
      "ai"
    ],
    "budgetRange": "100000-plus",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-9",
    "name": "Apple MacBook Neo (2026)",
    "brand": "Apple",
    "slug": "apple-macbook-neo-2026",
    "price": 0,
    "specs": {
      "processor": "A18 Pro",
      "gpu": "Integrated",
      "display": "13\" (Retina)",
      "ram": "8GB Unified",
      "battery": "Ultra (14-16 Hr)",
      "storage": "—",
      "weight": "—"
    },
    "image": "/laptops/apple-macbook-neo-2026.webp",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.2,
    "tags": [
      "General",
      "Coding & Dev",
      "Video Editing"
    ],
    "isRecommended": false,
    "branches": [
      "computer-science",
      "data-science",
      "ai",
      "electrical",
      "civil"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-10",
    "name": "Lenovo IdeaPad Slim 3 15\" (Snapdragon)",
    "brand": "Lenovo",
    "slug": "lenovo-ideapad-slim-3-15-snapdragon",
    "price": 0,
    "specs": {
      "processor": "Qualcomm Snapdragon X Plus (8-Core)",
      "gpu": "Integrated",
      "display": "15.3\" (WUXGA)",
      "ram": "—",
      "battery": "—",
      "storage": "—",
      "weight": "—"
    },
    "image": "/laptops/lenovo-ideapad-slim-3-15-snapdragon.png",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.2,
    "tags": [
      "General"
    ],
    "isRecommended": false,
    "branches": [
      "computer-science",
      "electrical",
      "civil"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-11",
    "name": "ASUS Vivobook S16",
    "brand": "ASUS",
    "slug": "asus-vivobook-s16",
    "price": 83500,
    "priceLabel": "₹77k - ₹90k",
    "specs": {
      "processor": "i5-13420H",
      "gpu": "UHD",
      "display": "16\" (OLED)",
      "ram": "16GB DDR4*",
      "battery": "Standard (6-7 Hr)",
      "storage": "512GB SSD",
      "weight": "1.88 kg"
    },
    "image": "/laptops/asus-vivobook-s16.png",
    "description": "A 16-inch OLED display at under ₹90k is genuinely rare and makes reading, coding, and media consumption a pleasure. The large screen and full numpad suit students who...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "General",
      "Coding & Dev"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "data-science",
      "electrical",
      "civil"
    ],
    "budgetRange": "70000-100000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-12",
    "name": "ASUS Vivobook S14",
    "brand": "ASUS",
    "slug": "asus-vivobook-s14",
    "price": 85000,
    "priceLabel": "₹80k - ₹90k",
    "specs": {
      "processor": "Ultra 7 255H",
      "gpu": "iGPU",
      "display": "14\" (FHD)",
      "ram": "16GB LPDDR5X",
      "battery": "Long (10-12 Hr)",
      "storage": "512GB SSD",
      "weight": "1.4 kg"
    },
    "image": "/laptops/asus-vivobook-s14.png",
    "description": "The Core Ultra 7 255H is a proper high-performance H-series chip — excellent for compiling, running VMs, and heavy multitasking. At this price though, the Moto Book 6...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "General",
      "Coding & Dev"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "data-science",
      "electrical",
      "civil"
    ],
    "budgetRange": "70000-100000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-13",
    "name": "IdeaPad Slim 3",
    "brand": "IdeaPad",
    "slug": "ideapad-slim-3",
    "price": 57500,
    "priceLabel": "₹52k - ₹63k",
    "specs": {
      "processor": "i5-13420H",
      "gpu": "UHD",
      "display": "15.6\" (FHD)",
      "ram": "16GB LPDDR5",
      "battery": "Standard (6-7 Hr)",
      "storage": "512GB SSD",
      "weight": "1.62 kg"
    },
    "image": "/laptops/ideapad-slim-3.png",
    "description": "Same i5-13420H as the Vivobook 15 but slightly lighter and often cheaper. The trade-off: RAM is soldered and cannot be upgraded — stick to the Vivobook 15 if you plan to...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "Coding & Dev",
      "General"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "data-science",
      "electrical",
      "civil"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-14",
    "name": "Acer Aspire 7 Gaming",
    "brand": "Acer",
    "slug": "acer-aspire-7-gaming",
    "price": 66500,
    "priceLabel": "₹60k - ₹73k",
    "specs": {
      "processor": "i5-12450H",
      "gpu": "RTX 3050",
      "display": "15.6\" (FHD, 144Hz)",
      "ram": "16GB DDR4*",
      "battery": "Perf (4 Hr)",
      "storage": "512GB SSD",
      "weight": "2.1 kg"
    },
    "image": "/laptops/acer-aspire-7-gaming.png",
    "description": "The most affordable RTX 3050 option — a meaningful step up for Mech/Civil CAD, basic ML, and 1080p gaming. Upgradeable RAM and widely available service centers make it...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "Gaming & ML",
      "Coding & Dev",
      "Video Editing"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "ai",
      "mechanical",
      "electronics",
      "data-science"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-15",
    "name": "HP Victus 15 (Ryzen 5, RTX 3050)",
    "brand": "HP",
    "slug": "hp-victus-15-ryzen-5-rtx-3050",
    "price": 67500,
    "priceLabel": "₹63k - ₹72k",
    "specs": {
      "processor": "Ryzen 5 5600H",
      "gpu": "RTX 3050 4GB",
      "display": "15.6\" (FHD, 144Hz)",
      "ram": "8GB DDR5*",
      "battery": "Perf (4-5 Hr)",
      "storage": "512GB SSD",
      "weight": "2.29 kg"
    },
    "image": "/laptops/hp-victus-15-ryzen-5-rtx-3050.png",
    "description": "An RTX 3050 under ₹65k — decent for 1080p gaming and basic CAD. Important caveat: this ships with 8GB RAM which is genuinely insufficient for coding + gaming...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "Gaming & ML"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "ai",
      "mechanical",
      "electronics"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-16",
    "name": "Lenovo Yoga Slim 7 Aura",
    "brand": "Lenovo",
    "slug": "lenovo-yoga-slim-7-aura",
    "price": 110000,
    "priceLabel": "₹1L - ₹1.2L",
    "specs": {
      "processor": "Ultra 5 226V",
      "gpu": "Arc 130V",
      "display": "15.3\" (OLED)",
      "ram": "16GB LPDDR5x",
      "battery": "Ultra (14-16 Hr)",
      "storage": "1TB SSD",
      "weight": "1.5 kg"
    },
    "image": "/laptops/lenovo-yoga-slim-7-aura.png",
    "description": "The closest Windows answer to the MacBook Air — Lunar Lake chip delivers exceptional battery life, the 2.8K display (especially the OLED SKU) is gorgeous for design work, an...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "General",
      "Coding & Dev",
      "Design & 3D"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "architecture",
      "mechanical",
      "data-science",
      "electrical",
      "civil"
    ],
    "budgetRange": "100000-plus",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-17",
    "name": "Samsung Galaxy Book4",
    "brand": "Samsung",
    "slug": "samsung-galaxy-book4",
    "price": 0,
    "specs": {
      "processor": "i5-1335U",
      "gpu": "Iris Xe",
      "display": "15.6\" (FHD)",
      "ram": "16GB LPDDR4x",
      "battery": "Standard (6-7 Hr)",
      "storage": "—",
      "weight": "—"
    },
    "image": "",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.2,
    "tags": [
      "General",
      "Coding & Dev"
    ],
    "isRecommended": false,
    "branches": [
      "computer-science",
      "data-science",
      "electrical",
      "civil"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-18",
    "name": "Samsung Galaxy Book5 AI",
    "brand": "Samsung",
    "slug": "samsung-galaxy-book5-ai",
    "price": 0,
    "specs": {
      "processor": "Ultra 7 255U",
      "gpu": "Arc",
      "display": "15.6\" (OLED)",
      "ram": "16GB LPDDR5x",
      "battery": "Long (10-12 Hr)",
      "storage": "—",
      "weight": "—"
    },
    "image": "/laptops/samsung-galaxy-book5-ai.png",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.2,
    "tags": [
      "General",
      "Coding & Dev"
    ],
    "isRecommended": false,
    "branches": [
      "computer-science",
      "data-science",
      "electrical",
      "civil"
    ],
    "budgetRange": "50000-70000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  },
  {
    "id": "catalog-19",
    "name": "ASUS Vivobook Go 15 OLED",
    "brand": "ASUS",
    "slug": "asus-vivobook-go-15-oled",
    "price": 46000,
    "priceLabel": "₹43k - ₹49k",
    "specs": {
      "processor": "Ryzen 5 7520U",
      "gpu": "AMD Radeon",
      "display": "15.6\" (OLED)",
      "ram": "8GB LPDDR5",
      "battery": "Standard (6-7 Hr)",
      "storage": "512GB SSD",
      "weight": "1.63 kg"
    },
    "image": "/laptops/asus-vivobook-go-15-oled.png",
    "description": "The best OLED screen you can get under ₹45k — genuinely reduces eye strain during long study sessions. The Ryzen 5 handles everyday college tasks well, but note the 8G...",
    "affiliateUrl": "https://www.amazon.in",
    "rating": 4.6,
    "tags": [
      "General"
    ],
    "isRecommended": true,
    "branches": [
      "computer-science",
      "electrical",
      "civil"
    ],
    "budgetRange": "under-50000",
    updatedAt: new Date("2026-06-24T00:00:00.000Z")
  }
];

export const LAPTOP_CATALOG: CatalogLaptop[] =
  LAPTOP_CATALOG_RAW.map(applyCatalogEnrichment);

export const LAPTOPS_WITH_IMAGES = LAPTOP_CATALOG.filter((l) => l.image).length;
export const LAPTOPS_MISSING_IMAGES = LAPTOP_CATALOG.filter((l) => !l.image).map(
  (l) => l.name,
);
