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

export type RamUpgradeable = "yes" | "no" | "partial";

export interface LaptopSpecs {
  ram: string;
  storage: string;
  processor: string;
  gpu: string;
  display: string;
  battery: string;
  weight: string;
  ramUpgradeable?: RamUpgradeable;
  ramUpgradeNote?: string;
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
  description?: string;
  priceLabel?: string;
  priceSource?: string;
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
    description: data.description as string | undefined,
    priceLabel: data.priceLabel as string | undefined,
    priceSource: data.priceSource as string | undefined,
    updatedAt: updatedAt?.toDate() ?? new Date(),
  };
}

function applyFilters(laptops: Laptop[], filters?: LaptopFilters): Laptop[] {
  let results = [...laptops];

  if (filters?.branch) {
    results = results.filter((l) => l.branches.includes(filters.branch!));
  }
  if (filters?.budget) {
    results = results.filter((l) => l.budgetRange === filters.budget);
  }
  if (filters?.gaming === "regular") {
    results = results.filter(
      (l) =>
        l.tags.some((t) => t.toLowerCase().includes("gaming")) ||
        (l.specs.gpu !== "Integrated" &&
          l.specs.gpu !== "—" &&
          !l.specs.gpu.toLowerCase().includes("integrated")),
    );
  }

  return results;
}

function filterSampleLaptops(filters?: LaptopFilters): Laptop[] {
  return applyFilters(SAMPLE_LAPTOPS, filters);
}

export async function getLaptops(filters?: LaptopFilters): Promise<Laptop[]> {
  const catalog = filterSampleLaptops(filters);

  if (!isFirebaseConfigured() || !db) {
    return catalog;
  }

  try {
    const q = query(collection(db, "laptops"), orderBy("updatedAt", "desc"));
    const snapshot = await getDocs(q);
    const remote = snapshot.docs.map((d) => mapDoc(d.id, d.data()));

    if (!remote.length || remote.length < catalog.length) {
      return catalog;
    }

    const merged = new Map(catalog.map((l) => [l.slug, l]));
    for (const laptop of remote) {
      if (merged.has(laptop.slug)) {
        merged.set(laptop.slug, { ...merged.get(laptop.slug)!, ...laptop });
      }
    }

    return applyFilters([...merged.values()], filters);
  } catch {
    return catalog;
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
