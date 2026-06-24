# Deployment Guide — Engineering Laptop Advisor India

## Prerequisites

- Node.js 18+
- Firebase CLI: `npm install -g firebase-tools`
- A Firebase project at [console.firebase.google.com](https://console.firebase.google.com)

## 1. Firebase Project Setup

1. Create a new Firebase project
2. Enable **Authentication** → Google sign-in
3. Create a **Firestore** database (production mode)
4. Enable **Storage**
5. Copy web app config to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_SITE_URL=https://your-domain.web.app
```

6. Update `.firebaserc` with your project ID
7. Deploy Firestore rules: `firebase deploy --only firestore:rules`

## 2. Admin Access

Add admin users by creating documents in Firestore:

```
Collection: admins
Document ID: {user-uid-from-firebase-auth}
Fields: { email: "admin@example.com" }
```

Or set custom claims via Firebase Admin SDK: `{ admin: true }`

## 3. Local Development

```bash
cd engineering-laptop-advisor
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

The app works without Firebase using sample laptop/deal data.

## 4. Build & Deploy

```bash
npm run build          # Static export to /out
npm run deploy         # Build + deploy to Firebase Hosting
```

Or hosting only:

```bash
npm run deploy:hosting
```

## 5. GitHub Actions Secret

1. Firebase Console → Project Settings → Service Accounts
2. Generate new private key (JSON)
3. GitHub repo → Settings → Secrets → `FIREBASE_SERVICE_ACCOUNT`
4. Paste the entire JSON contents

The workflow at `.github/workflows/deploy.yml` deploys on push to `main`.

## 6. Seed Initial Laptop Data

Use Firebase Console or a script to add documents to the `laptops` collection:

```json
{
  "name": "Lenovo IdeaPad Slim 5",
  "brand": "Lenovo",
  "slug": "lenovo-ideapad-slim-5",
  "price": 58990,
  "specs": {
    "ram": "16GB",
    "storage": "512GB SSD",
    "processor": "AMD Ryzen 5 7530U",
    "gpu": "Integrated",
    "display": "15.6\" FHD",
    "battery": "8 hours",
    "weight": "1.65 kg"
  },
  "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
  "affiliateUrl": "https://www.amazon.in/dp/EXAMPLE?tag=yourtag-21",
  "rating": 4.4,
  "tags": ["Best Value", "Coding"],
  "isRecommended": true,
  "branches": ["computer-science", "data-science"],
  "budgetRange": "50000-70000",
  "updatedAt": "2025-06-24T00:00:00.000Z"
}
```

Upload images via the admin panel at `/admin` after signing in.

## 7. Custom Domain

Firebase Hosting → Add custom domain → follow DNS verification steps.

Update `NEXT_PUBLIC_SITE_URL` to your custom domain for correct OG/sitemap URLs.
