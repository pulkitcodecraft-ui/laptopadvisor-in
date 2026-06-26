export const COMPARE_STORAGE_KEY = "laptopadvisor-compare-ids";
export const MAX_COMPARE_LAPTOPS = 3;

const EMPTY_COMPARE_IDS: string[] = [];

let cachedRaw: string | null | undefined;
let cachedIds: string[] = EMPTY_COMPARE_IDS;

function parseCompareIds(raw: string | null): string[] {
  if (!raw) return EMPTY_COMPARE_IDS;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return EMPTY_COMPARE_IDS;

    const ids = parsed
      .filter((id): id is string => typeof id === "string")
      .slice(0, MAX_COMPARE_LAPTOPS);

    return ids.length > 0 ? ids : EMPTY_COMPARE_IDS;
  } catch {
    if (typeof window !== "undefined") {
      localStorage.removeItem(COMPARE_STORAGE_KEY);
    }
    return EMPTY_COMPARE_IDS;
  }
}

function syncCompareCache(): string[] {
  if (typeof window === "undefined") return EMPTY_COMPARE_IDS;

  const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
  if (raw === cachedRaw) return cachedIds;

  cachedRaw = raw;
  const next = parseCompareIds(raw);
  cachedIds = next;
  return cachedIds;
}

export function readCompareIds(): string[] {
  return syncCompareCache();
}

export function writeCompareIds(ids: string[]): string[] {
  const next = ids.slice(0, MAX_COMPARE_LAPTOPS);
  const serialized = JSON.stringify(next);

  if (typeof window !== "undefined") {
    localStorage.setItem(COMPARE_STORAGE_KEY, serialized);
    cachedRaw = serialized;
    cachedIds = next.length > 0 ? next : EMPTY_COMPARE_IDS;
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

/** Stable empty snapshot for useSyncExternalStore SSR hydration. */
export function getCompareIdsSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY_COMPARE_IDS;
  return syncCompareCache();
}

export { EMPTY_COMPARE_IDS };
