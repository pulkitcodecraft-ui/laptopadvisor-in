import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export async function signInWithGoogle(): Promise<User> {
  if (!auth) throw new Error("Firebase Auth not configured");
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOut(): Promise<void> {
  if (!auth) throw new Error("Firebase Auth not configured");
  await firebaseSignOut(auth);
}

export { onAuthStateChanged };
