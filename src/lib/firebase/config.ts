import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  type Firestore,
} from "firebase/firestore";
import {
  getStorage,
  connectStorageEmulator,
  type FirebaseStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      firebaseConfig.projectId !== "your_project",
  );
}

export function isFirebaseEmulator(): boolean {
  return process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true";
}

function createApp(): FirebaseApp {
  if (getApps().length) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;
let emulatorsConnected = false;

function connectEmulators(firebaseApp: FirebaseApp) {
  if (emulatorsConnected || !isFirebaseEmulator()) return;

  connectAuthEmulator(getAuth(firebaseApp), "http://127.0.0.1:9099", {
    disableWarnings: true,
  });
  connectFirestoreEmulator(getFirestore(firebaseApp), "127.0.0.1", 8080);
  connectStorageEmulator(getStorage(firebaseApp), "127.0.0.1", 9199);
  emulatorsConnected = true;
}

function initFirebase() {
  if (typeof window === "undefined" || !isFirebaseConfigured()) return;

  app = createApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  if (firebaseConfig.measurementId && !isFirebaseEmulator()) {
    try {
      analytics = getAnalytics(app);
    } catch {
      analytics = null;
    }
  }

  connectEmulators(app);
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!app && typeof window !== "undefined") initFirebase();
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (!auth && typeof window !== "undefined") initFirebase();
  return auth;
}

export function getFirebaseDb(): Firestore | null {
  if (!db && typeof window !== "undefined") initFirebase();
  return db;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  if (!storage && typeof window !== "undefined") initFirebase();
  return storage;
}

export { app, db, auth, storage, analytics };
