#!/usr/bin/env node
/**
 * Seeds Firestore with sample laptops and deals.
 * Usage:
 *   npm run firebase:seed              (uses emulators if running)
 *   FIREBASE_SERVICE_ACCOUNT=./key.json npm run firebase:seed
 */

import { readFileSync, existsSync } from "fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

const PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  process.env.FIREBASE_PROJECT_ID ||
  "demo-laptop-advisor";

const EMULATOR = process.env.FIREBASE_AUTH_EMULATOR_HOST !== undefined ||
  process.env.FIRESTORE_EMULATOR_HOST !== undefined ||
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true";

if (EMULATOR) {
  process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8080";
  process.env.FIREBASE_AUTH_EMULATOR_HOST =
    process.env.FIREBASE_AUTH_EMULATOR_HOST || "127.0.0.1:9099";
  console.log("📡 Using Firebase Emulators");
}

function initAdmin() {
  if (getApps().length) return getFirestore();

  const serviceAccountPath =
    process.env.FIREBASE_SERVICE_ACCOUNT ||
    (existsSync("./serviceAccountKey.json") ? "./serviceAccountKey.json" : null);

  if (serviceAccountPath && existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id || PROJECT_ID,
    });
  } else if (EMULATOR) {
    initializeApp({ projectId: PROJECT_ID });
  } else {
    console.error(
      "❌ No service account found. Download it from Firebase Console:\n" +
        "   Project Settings → Service accounts → Generate new private key\n" +
        "   Save as: engineering-laptop-advisor/serviceAccountKey.json\n" +
        "   Then run: npm run firebase:seed\n",
    );
    process.exit(1);
  }

  return getFirestore();
}

const laptops = [
  {
    name: "Lenovo IdeaPad Slim 5",
    brand: "Lenovo",
    slug: "lenovo-ideapad-slim-5",
    price: 58990,
    specs: {
      ram: "16GB",
      storage: "512GB SSD",
      processor: "AMD Ryzen 5 7530U",
      gpu: "Integrated Radeon",
      display: '15.6" FHD IPS',
      battery: "Up to 8 hours",
      weight: "1.65 kg",
    },
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    affiliateUrl: "https://www.amazon.in",
    rating: 4.4,
    tags: ["Best Value", "Coding", "Lightweight"],
    isRecommended: true,
    branches: ["computer-science", "data-science", "electrical"],
    budgetRange: "50000-70000",
  },
  {
    name: "Apple MacBook Air M2",
    brand: "Apple",
    slug: "apple-macbook-air-m2",
    price: 99900,
    specs: {
      ram: "8GB",
      storage: "256GB SSD",
      processor: "Apple M2",
      gpu: "8-core GPU",
      display: '13.6" Liquid Retina',
      battery: "Up to 18 hours",
      weight: "1.24 kg",
    },
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    affiliateUrl: "https://www.amazon.in",
    rating: 4.8,
    tags: ["Premium", "Battery King", "CS Favourite"],
    isRecommended: true,
    branches: ["computer-science", "ai", "data-science"],
    budgetRange: "100000-plus",
  },
  {
    name: "HP Victus 15",
    brand: "HP",
    slug: "hp-victus-15",
    price: 67990,
    specs: {
      ram: "16GB",
      storage: "512GB SSD",
      processor: "Intel Core i5-13420H",
      gpu: "NVIDIA RTX 3050",
      display: '15.6" FHD 144Hz',
      battery: "Up to 6 hours",
      weight: "2.29 kg",
    },
    image: "https://images.unsplash.com/photo-1603302576837-37561b547382?w=600&q=80",
    affiliateUrl: "https://www.amazon.in",
    rating: 4.3,
    tags: ["Gaming", "CAD", "Mechanical"],
    isRecommended: false,
    branches: ["mechanical", "ai", "electronics"],
    budgetRange: "50000-70000",
  },
  {
    name: "Lenovo LOQ 15",
    brand: "Lenovo",
    slug: "lenovo-loq-15",
    price: 74990,
    specs: {
      ram: "16GB",
      storage: "512GB SSD",
      processor: "AMD Ryzen 7 7840HS",
      gpu: "NVIDIA RTX 4050",
      display: '15.6" FHD 144Hz',
      battery: "Up to 5 hours",
      weight: "2.38 kg",
    },
    image: "https://images.unsplash.com/photo-1525547719578-a2d4ac8915e2?w=600&q=80",
    affiliateUrl: "https://www.amazon.in",
    rating: 4.5,
    tags: ["AI/ML", "Gaming", "GPU"],
    isRecommended: true,
    branches: ["ai", "mechanical", "computer-science"],
    budgetRange: "70000-100000",
  },
];

const deals = [
  {
    laptopId: "lenovo-ideapad-slim-5",
    laptopName: "Lenovo IdeaPad Slim 5",
    originalPrice: 64990,
    dealPrice: 58990,
    discount: 9,
    platform: "Amazon.in",
    affiliateUrl: "https://www.amazon.in",
    validUntil: Timestamp.fromDate(new Date(Date.now() + 7 * 86400000)),
    isActive: true,
  },
  {
    laptopId: "apple-macbook-air-m2",
    laptopName: "MacBook Air M2",
    originalPrice: 114900,
    dealPrice: 99900,
    discount: 13,
    platform: "Amazon.in",
    affiliateUrl: "https://www.amazon.in",
    validUntil: Timestamp.fromDate(new Date(Date.now() + 5 * 86400000)),
    isActive: true,
  },
];

async function seed() {
  const db = initAdmin();
  console.log(`🌱 Seeding project: ${PROJECT_ID}`);

  for (const laptop of laptops) {
    const ref = db.collection("laptops").doc(laptop.slug);
    await ref.set({ ...laptop, updatedAt: Timestamp.now() });
    console.log(`  ✓ laptop: ${laptop.name}`);
  }

  for (const deal of deals) {
    const ref = db.collection("deals").doc(deal.laptopId);
    await ref.set(deal);
    console.log(`  ✓ deal: ${deal.laptopName}`);
  }

  console.log("\n✅ Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
