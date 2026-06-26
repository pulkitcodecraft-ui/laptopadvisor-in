"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  COMPARE_STORAGE_KEY,
  clearCompareIds,
  MAX_COMPARE_LAPTOPS,
  readCompareIds,
  toggleCompareId,
} from "@/lib/compareSelection";

function subscribeCompareIds(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === COMPARE_STORAGE_KEY) {
      onStoreChange();
    }
  };
  const onCustom = () => onStoreChange();

  window.addEventListener("storage", onStorage);
  window.addEventListener("compare-selection-change", onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("compare-selection-change", onCustom);
  };
}

export function useCompareSelection() {
  const ids = useSyncExternalStore(
    subscribeCompareIds,
    readCompareIds,
    () => [],
  );

  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const toggle = useCallback((id: string) => toggleCompareId(id), []);

  const clear = useCallback(() => {
    clearCompareIds();
  }, []);

  const isSelected = useCallback((id: string) => ids.includes(id), [ids]);

  return {
    ids,
    hydrated,
    count: ids.length,
    max: MAX_COMPARE_LAPTOPS,
    isFull: ids.length >= MAX_COMPARE_LAPTOPS,
    toggle,
    clear,
    isSelected,
  };
}
