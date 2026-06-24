# Connect Firebase — Step by Step

Your app is **already configured for local Firebase Emulators** via `.env.local`.
You can develop immediately without a cloud project, then switch to production when ready.

---

## Option A — Local emulators (start now, no cloud account needed)

### Terminal 1 — Start emulators
```bash
cd engineering-laptop-advisor
npm run firebase:emulators
```

### Terminal 2 — Seed sample data
```bash
npm run firebase:seed
```

### Terminal 3 — Run the app
```bash
npm run dev
```

Open:
- App: http://localhost:3000
- Emulator UI: http://localhost:4000

Your `.env.local` already has:
```
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
```

---

## Option B — Connect to a real Firebase project (production)

### 1. Create Firebase project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Add project** → name it e.g. `laptop-advisor-india`
3. Disable Google Analytics (optional) → **Create project**

### 2. Register web app
1. Project Overview → **Web** icon (`</>`)
2. App nickname: `LaptopAdvisor Web`
3. Copy the `firebaseConfig` object values

### 3. Enable services
| Service | Path in Console |
|---------|-----------------|
| **Authentication** | Build → Authentication → Get started → Enable **Google** |
| **Firestore** | Build → Firestore → Create database → Start in **test mode** (we deploy rules next) |
| **Storage** | Build → Storage → Get started |

### 4. Update `.env.local`
Replace demo values and **turn off emulators**:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false

NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 5. Update `.firebaserc`
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### 6. Login & deploy rules
```bash
npx firebase login
npm run firebase:deploy-rules
```

### 7. Seed production data
1. Firebase Console → Project Settings → Service Accounts
2. **Generate new private key** → save as `serviceAccountKey.json` (never commit!)
3. Run:
```bash
set FIREBASE_SERVICE_ACCOUNT=./serviceAccountKey.json
npm run firebase:seed
```

### 8. Add yourself as admin
Firebase Console → Firestore → Start collection:
```
Collection: admins
Document ID: <your-google-uid-after-sign-in>
Fields: { email: "you@gmail.com" }
```

Or sign in once at `/admin`, copy your UID from the Firebase Auth emulator/console, then add the admin doc.

---

## Verify connection

1. Open http://localhost:3000/deals — should show Firestore deals (not just static fallback)
2. Open http://localhost:3000/admin — sign in with Google
3. Check browser console — no Firebase config errors

---

## npm scripts reference

| Command | Description |
|---------|-------------|
| `npm run firebase:emulators` | Start Auth, Firestore, Storage emulators |
| `npm run firebase:seed` | Seed laptops + deals |
| `npm run firebase:deploy-rules` | Deploy Firestore + Storage rules |
| `npm run deploy` | Build + deploy to Firebase Hosting |

---

## Troubleshooting

**"Firebase not configured"** — Check `.env.local` exists and restart `npm run dev`

**Emulator connection refused** — Start emulators first: `npm run firebase:emulators`

**Admin access denied** — Add your UID to the `admins` collection in Firestore

**CORS on Storage upload** — Deploy storage rules: `npm run firebase:deploy-rules`
