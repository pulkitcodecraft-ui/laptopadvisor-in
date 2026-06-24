import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/config";
import { SAMPLE_DEALS } from "@/lib/sampleLaptops";

export interface Deal {
  id: string;
  laptopId: string;
  laptopName: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  platform: string;
  affiliateUrl: string;
  validUntil: Date;
  isActive: boolean;
}

function mapDeal(id: string, data: Record<string, unknown>): Deal {
  const validUntil = data.validUntil as Timestamp | undefined;
  return {
    id,
    laptopId: data.laptopId as string,
    laptopName: data.laptopName as string,
    originalPrice: data.originalPrice as number,
    dealPrice: data.dealPrice as number,
    discount: data.discount as number,
    platform: data.platform as string,
    affiliateUrl: data.affiliateUrl as string,
    validUntil: validUntil?.toDate() ?? new Date(),
    isActive: (data.isActive as boolean) ?? true,
  };
}

export async function getActiveDeals(): Promise<Deal[]> {
  if (!isFirebaseConfigured() || !db) {
    return SAMPLE_DEALS.filter((d) => d.isActive);
  }

  try {
    const now = Timestamp.now();
    const q = query(
      collection(db, "deals"),
      where("isActive", "==", true),
      where("validUntil", ">", now),
      orderBy("validUntil", "asc"),
    );
    const snapshot = await getDocs(q);
    const deals = snapshot.docs.map((d) => mapDeal(d.id, d.data()));
    return deals.length ? deals : SAMPLE_DEALS.filter((d) => d.isActive);
  } catch {
    return SAMPLE_DEALS.filter((d) => d.isActive);
  }
}

export async function addDeal(
  data: Omit<Deal, "id">,
): Promise<string> {
  if (!db) throw new Error("Firebase not configured");
  const ref = await addDoc(collection(db, "deals"), {
    ...data,
    validUntil: Timestamp.fromDate(data.validUntil),
  });
  return ref.id;
}

export async function updateDeal(
  id: string,
  data: Partial<Deal>,
): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  const payload = { ...data } as Record<string, unknown>;
  if (data.validUntil) {
    payload.validUntil = Timestamp.fromDate(data.validUntil);
  }
  await updateDoc(doc(db, "deals", id), payload);
}
