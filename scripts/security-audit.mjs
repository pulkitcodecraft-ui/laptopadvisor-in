#!/usr/bin/env node
/**
 * Read-only security audit of the production Firestore.
 * Lists every collection + document so you can spot anything you didn't create.
 * Usage: npm run firebase:audit
 */
import { readFileSync, existsSync } from "fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const KEY = "./serviceAccountKey.json";
if (!existsSync(KEY)) {
  console.error("No serviceAccountKey.json found. Cannot audit.");
  process.exit(1);
}
const sa = JSON.parse(readFileSync(KEY, "utf8"));
if (!getApps().length) {
  initializeApp({ credential: cert(sa), projectId: sa.project_id });
}
const db = getFirestore();

const EXPECTED = {
  laptops: 4,
  deals: 2,
  reviews: "any (user-submitted, must have approved:false until you approve)",
  admins: "your UID(s) only",
};

async function audit() {
  console.log(`\nAuditing project: ${sa.project_id}\n`);
  const collections = await db.listCollections();
  if (collections.length === 0) {
    console.log("Database is empty.");
    return;
  }

  for (const col of collections) {
    const snap = await col.get();
    const expected = EXPECTED[col.id];
    console.log(`\n=== Collection: "${col.id}" — ${snap.size} docs ===`);
    console.log(`   expected: ${expected ?? "UNKNOWN COLLECTION — investigate!"}`);
    snap.forEach((doc) => {
      const d = doc.data();
      const preview =
        col.id === "reviews"
          ? `approved=${d.approved} userId=${d.userId ?? "?"} author=${d.authorName ?? "?"}`
          : col.id === "admins"
            ? `(admin entry)`
            : d.name || d.laptopName || JSON.stringify(d).slice(0, 60);
      console.log(`   - ${doc.id}: ${preview}`);
    });
  }
  console.log("\nDone. Anything outside laptops/deals/reviews/admins is suspicious.\n");
}

audit().catch((e) => {
  console.error("Audit failed:", e.message);
  process.exit(1);
});
