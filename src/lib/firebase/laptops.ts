import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/config";
import { SAMPLE_LAPTOPS } from "@/lib/sampleLaptops";

export interface LaptopSpecs {
  ram: string;
  storage: string;
  processor: string;
  gpu: string;
  display: string;
  battery: string;
  weight: string;
}

export interface Laptop {
  id: string;
  name: string;
  brand: string;
  slug: string;
  price: number;
  specs: LaptopSpecs;
  image: string;
  affiliateUrl: string;
  rating: number;
  tags: string[];
  isRecommended: boolean;
  branches: string[];
  budgetRange: string;
  updatedAt: Date;
}

export interface LaptopFilters {
  branch?: string;
  budget?: string;
  gaming?: string;
}

function mapDoc(id: string, data: Record<string, unknown>): Laptop {
  const updatedAt = data.updatedAt as Timestamp | undefined;
  return {
    id,
    name: data.name as string,
    brand: data.brand as string,
    slug: data.slug as string,
    price: data.price as number,
    specs: data.specs as LaptopSpecs,
    image: data.image as string,
    affiliateUrl: data.affiliateUrl as string,
    rating: data.rating as number,
    tags: (data.tags as string[]) ?? [],
    isRecommended: (data.isRecommended as boolean) ?? false,
    branches: (data.branches as string[]) ?? [],
    budgetRange: data.budgetRange as string,
    updatedAt: updatedAt?.toDate() ?? new Date(),
  };
}

function filterSampleLaptops(filters?: LaptopFilters): Laptop[] {
  let results = [...SAMPLE_LAPTOPS];

  if (filters?.branch) {
    results = results.filter((l) => l.branches.includes(filters.branch!));
  }
  if (filters?.budget) {
    results = results.filter((l) => l.budgetRange === filters.budget);
  }
  if (filters?.gaming === "regular") {
    results = results.filter((l) =>
      l.tags.some((t) => t.toLowerCase().includes("gaming") || l.specs.gpu !== "Integrated"),
    );
  }

  return results;
}

export async function getLaptops(filters?: LaptopFilters): Promise<Laptop[]> {
  if (!isFirebaseConfigured() || !db) {
    return filterSampleLaptops(filters);
  }

  try {
    const q = query(collection(db, "laptops"), orderBy("updatedAt", "desc"));
    const snapshot = await getDocs(q);
    let laptops = snapshot.docs.map((d) => mapDoc(d.id, d.data()));

    if (filters?.branch) {
      laptops = laptops.filter((l) => l.branches.includes(filters.branch!));
    }
    if (filters?.budget) {
      laptops = laptops.filter((l) => l.budgetRange === filters.budget);
    }

    return laptops.length ? laptops : filterSampleLaptops(filters);
  } catch {
    return filterSampleLaptops(filters);
  }
}

export async function getLaptopBySlug(slug: string): Promise<Laptop | null> {
  if (!isFirebaseConfigured() || !db) {
    return SAMPLE_LAPTOPS.find((l) => l.slug === slug) ?? null;
  }

  try {
    const q = query(collection(db, "laptops"), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return SAMPLE_LAPTOPS.find((l) => l.slug === slug) ?? null;
    }
    const docSnap = snapshot.docs[0];
    return mapDoc(docSnap.id, docSnap.data());
  } catch {
    return SAMPLE_LAPTOPS.find((l) => l.slug === slug) ?? null;
  }
}

export async function addLaptop(data: Omit<Laptop, "id">): Promise<string> {
  if (!db) throw new Error("Firebase not configured");
  const ref = await addDoc(collection(db, "laptops"), {
    ...data,
    updatedAt: Timestamp.fromDate(data.updatedAt),
  });
  return ref.id;
}

export async function updateLaptop(
  id: string,
  data: Partial<Laptop>,
): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  const payload = { ...data } as Record<string, unknown>;
  if (data.updatedAt) {
    payload.updatedAt = Timestamp.fromDate(data.updatedAt);
  }
  await updateDoc(doc(db, "laptops", id), payload);
}

export async function deleteLaptop(id: string): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  await deleteDoc(doc(db, "laptops", id));
}
