export const COMPARE_STORAGE_KEY = "laptopadvisor-compare-ids";
export const MAX_COMPARE_LAPTOPS = 3;

export function readCompareIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string").slice(0, MAX_COMPARE_LAPTOPS);
  } catch {
    localStorage.removeItem(COMPARE_STORAGE_KEY);
    return [];
  }
}

export function writeCompareIds(ids: string[]): string[] {
  const next = ids.slice(0, MAX_COMPARE_LAPTOPS);
  if (typeof window !== "undefined") {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("compare-selection-change"));
  }
  return next;
}

export function toggleCompareId(id: string): {
  ids: string[];
  added: boolean;
  limited: boolean;
} {
  const current = readCompareIds();
  const exists = current.includes(id);

  if (exists) {
    const ids = writeCompareIds(current.filter((x) => x !== id));
    return { ids, added: false, limited: false };
  }

  if (current.length >= MAX_COMPARE_LAPTOPS) {
    return { ids: current, added: false, limited: true };
  }

  const ids = writeCompareIds([...current, id]);
  return { ids, added: true, limited: false };
}

export function clearCompareIds(): void {
  writeCompareIds([]);
}
