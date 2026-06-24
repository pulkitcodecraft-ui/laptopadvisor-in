import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/config";

export interface Review {
  id: string;
  laptopId: string;
  college: string;
  branch: string;
  rating: number;
  pros: string[];
  cons: string[];
  content: string;
  authorName: string;
  createdAt: Date;
  approved: boolean;
}

function mapReview(id: string, data: Record<string, unknown>): Review {
  const createdAt = data.createdAt as Timestamp | undefined;
  return {
    id,
    laptopId: data.laptopId as string,
    college: data.college as string,
    branch: data.branch as string,
    rating: data.rating as number,
    pros: (data.pros as string[]) ?? [],
    cons: (data.cons as string[]) ?? [],
    content: data.content as string,
    authorName: data.authorName as string,
    createdAt: createdAt?.toDate() ?? new Date(),
    approved: (data.approved as boolean) ?? false,
  };
}

export async function addReview(
  data: Omit<Review, "id" | "createdAt" | "approved">,
  userId: string,
): Promise<string> {
  if (!db) throw new Error("Firebase not configured");
  const ref = await addDoc(collection(db, "reviews"), {
    ...data,
    userId,
    approved: false,
    createdAt: Timestamp.now(),
  });
  return ref.id;
}

export async function getReviewsForLaptop(laptopId: string): Promise<Review[]> {
  if (!isFirebaseConfigured() || !db) return [];

  try {
    const q = query(
      collection(db, "reviews"),
      where("laptopId", "==", laptopId),
      where("approved", "==", true),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => mapReview(d.id, d.data()));
  } catch {
    return [];
  }
}

export async function approveReview(reviewId: string): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  await updateDoc(doc(db, "reviews", reviewId), { approved: true });
}
