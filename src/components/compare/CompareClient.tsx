"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CategoryFilterBar from "@/components/laptops/CategoryFilterBar";
import CampusLaptopCard from "@/components/laptops/CampusLaptopCard";
import { LaptopCardSkeleton } from "@/components/ui/LaptopCardSkeleton";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { LAPTOP_CATALOG } from "@/lib/laptopCatalog";
import {
  countLaptopsByCategory,
  filterLaptopsByCategory,
} from "@/lib/laptopCategories";
import { getLaptops, type Laptop } from "@/lib/firebase/laptops";
import { formatIndianPrice } from "@/lib/constants";
import {
  readCompareIds,
  writeCompareIds,
  MAX_COMPARE_LAPTOPS,
} from "@/lib/compareSelection";

const SPEC_LABELS: { key: keyof Laptop["specs"]; label: string }[] = [
  { key: "processor", label: "Processor" },
  { key: "ram", label: "RAM" },
  { key: "storage", label: "Storage" },
  { key: "gpu", label: "GPU" },
  { key: "display", label: "Display" },
  { key: "battery", label: "Battery" },
  { key: "weight", label: "Weight" },
];

export default function CompareClient() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [selected, setSelected] = useState<Laptop[]>([]);
  const [categoryId, setCategoryId] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLaptops()
      .then((data) => {
        const list = data.length > 0 ? data : LAPTOP_CATALOG;
        setLaptops(list);

        const storedIds = readCompareIds();
        if (storedIds.length > 0) {
          const preselected = storedIds
            .map((id) => list.find((l) => l.id === id))
            .filter((l): l is Laptop => Boolean(l));
          if (preselected.length > 0) {
            setSelected(preselected);
          }
        }

        setLoading(false);
      })
      .catch(() => {
        const list = LAPTOP_CATALOG;
        setLaptops(list);

        const storedIds = readCompareIds();
        if (storedIds.length > 0) {
          const preselected = storedIds
            .map((id) => list.find((l) => l.id === id))
            .filter((l): l is Laptop => Boolean(l));
          if (preselected.length > 0) {
            setSelected(preselected);
          }
        }

        setLoading(false);
      });
  }, []);

  const counts = useMemo(() => countLaptopsByCategory(laptops), [laptops]);

  const filtered = useMemo(
    () => filterLaptopsByCategory(laptops, categoryId),
    [laptops, categoryId],
  );

  function toggleLaptop(laptop: Laptop) {
    setSelected((prev) => {
      const exists = prev.find((l) => l.id === laptop.id);
      let next: Laptop[];

      if (exists) {
        next = prev.filter((l) => l.id !== laptop.id);
      } else if (prev.length >= MAX_COMPARE_LAPTOPS) {
        return prev;
      } else {
        next = [...prev, laptop];
      }

      writeCompareIds(next.map((l) => l.id));
      return next;
    });
  }

  function clearSelection() {
    setSelected([]);
    writeCompareIds([]);
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <LaptopCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {selected.length > 0 && (
        <ScrollReveal variant="section">
          <Card className="overflow-x-auto">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-text">
                Comparing {selected.length} laptop
                {selected.length > 1 ? "s" : ""}
              </h3>
              <button
                type="button"
                onClick={clearSelection}
                className="text-sm text-muted hover:text-primary"
              >
                Clear all
              </button>
            </div>
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 pr-4 font-medium text-muted">Spec</th>
                  {selected.map((l) => (
                    <th key={l.id} className="pb-3 pr-4 font-semibold text-text">
                      <div className="flex items-start justify-between gap-2">
                        <span>{l.name}</span>
                        <button
                          type="button"
                          onClick={() => toggleLaptop(l)}
                          className="shrink-0 text-muted hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 font-medium text-muted">Categories</td>
                  {selected.map((l) => (
                    <td key={l.id} className="py-3 pr-4 text-text">
                      {l.tags.join(", ")}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 font-medium text-muted">Price</td>
                  {selected.map((l) => (
                    <td key={l.id} className="py-3 pr-4 font-bold text-primary">
                      {l.priceLabel ?? formatIndianPrice(l.price)}
                    </td>
                  ))}
                </tr>
                {SPEC_LABELS.map(({ key, label }) => (
                  <tr key={key} className="border-b border-border">
                    <td className="py-3 pr-4 font-medium text-muted">{label}</td>
                    {selected.map((l) => (
                      <td key={l.id} className="py-3 pr-4 text-text">
                        {key === "ram"
                          ? l.specs.ram.replace(/\*$/, "")
                          : l.specs[key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 font-medium text-muted">RAM upgrade</td>
                  {selected.map((l) => (
                    <td key={l.id} className="py-3 pr-4 text-text">
                      {l.specs.ramUpgradeable === "yes" && (
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          Yes — {l.specs.ramUpgradeNote ?? "SO-DIMM slot"}
                        </span>
                      )}
                      {l.specs.ramUpgradeable === "no" && (
                        <span className="font-medium text-rose-600 dark:text-rose-400">
                          No — soldered
                        </span>
                      )}
                      {l.specs.ramUpgradeable === "partial" && (
                        <span className="text-amber-700 dark:text-amber-300">
                          Check SKU — {l.specs.ramUpgradeNote}
                        </span>
                      )}
                      {!l.specs.ramUpgradeable && "—"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-muted">Rating</td>
                  {selected.map((l) => (
                    <td key={l.id} className="py-3 pr-4 text-text">
                      {l.rating}/5
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Card>
        </ScrollReveal>
      )}

      <div>
        <p className="mb-4 text-sm text-muted">
          Tap <span className="font-semibold text-text">Add to compare</span> on
          any card — up to {MAX_COMPARE_LAPTOPS} laptops ({selected.length}/
          {MAX_COMPARE_LAPTOPS} selected)
        </p>
        <CategoryFilterBar
          activeId={categoryId}
          counts={counts}
          onChange={setCategoryId}
        />

        <div className="kit-laptop-list">
          {filtered.map((laptop) => {
            const isSelected = selected.some((l) => l.id === laptop.id);
            const isDisabled = !isSelected && selected.length >= MAX_COMPARE_LAPTOPS;

            return (
              <CampusLaptopCard
                key={laptop.id}
                laptop={laptop}
                compareEnabled
                isInCompare={isSelected}
                compareDisabled={isDisabled}
                onToggleCompare={() => !isDisabled && toggleLaptop(laptop)}
              />
            );
          })}
        </div>
      </div>

      {selected.length === 0 && (
        <div className="text-center">
          <Button href="/finder/" size="lg">
            Not sure? Take the Finder Quiz →
          </Button>
        </div>
      )}
    </div>
  );
}
