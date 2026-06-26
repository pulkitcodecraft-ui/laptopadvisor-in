#!/usr/bin/env node
/**
 * Seeds Firestore with laptop catalog + deals from Excel import.
 * Run first: node scripts/build-laptop-catalog.mjs
 *
 * Usage:
 *   npm run firebase:seed
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_JSON = join(__dirname, "..", "_import", "laptop-catalog.json");

const PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  process.env.FIREBASE_PROJECT_ID ||
  "demo-laptop-advisor";

const EMULATOR =
  process.env.FIREBASE_AUTH_EMULATOR_HOST !== undefined ||
  process.env.FIRESTORE_EMULATOR_HOST !== undefined ||
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true";

if (EMULATOR) {
  process.env.FIRESTORE_EMULATOR_HOST =
    process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8080";
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

function loadCatalog() {
  if (!existsSync(CATALOG_JSON)) {
    console.error(
      "❌ Missing _import/laptop-catalog.json — run: node scripts/build-laptop-catalog.mjs",
    );
    process.exit(1);
  }
  return JSON.parse(readFileSync(CATALOG_JSON, "utf8"));
}

const deals = [
  {
    laptopId: "motorola-moto-book-60",
    laptopName: "Motorola Moto Book 60",
    originalPrice: 60000,
    dealPrice: 54500,
    discount: 9,
    platform: "Amazon.in",
    affiliateUrl: "https://www.amazon.in",
    validUntil: Timestamp.fromDate(new Date(Date.now() + 7 * 86400000)),
    isActive: true,
  },
  {
    laptopId: "apple-macbook-air-13-m5",
    laptopName: 'Apple MacBook Air 13" (M5)',
    originalPrice: 120000,
    dealPrice: 107500,
    discount: 10,
    platform: "Amazon.in",
    affiliateUrl: "https://www.amazon.in",
    validUntil: Timestamp.fromDate(new Date(Date.now() + 5 * 86400000)),
    isActive: true,
  },
  {
    laptopId: "hp-victus-15-ryzen-5-rtx-3050",
    laptopName: "HP Victus 15 (Ryzen 5, RTX 3050)",
    originalPrice: 72000,
    dealPrice: 67500,
    discount: 6,
    platform: "Flipkart",
    affiliateUrl: "https://www.flipkart.com",
    validUntil: Timestamp.fromDate(new Date(Date.now() + 3 * 86400000)),
    isActive: true,
  },
];

async function seed() {
  const db = initAdmin();
  const laptops = loadCatalog();
  console.log(`🌱 Seeding project: ${PROJECT_ID} (${laptops.length} laptops)`);

  for (const laptop of laptops) {
    const payload = { ...laptop };
    delete payload.id;
    const ref = db.collection("laptops").doc(laptop.slug);
    await ref.set({ ...payload, updatedAt: Timestamp.now() });
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
