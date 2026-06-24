"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import LaptopCard from "@/components/ui/LaptopCard";
import { getLaptops, type Laptop } from "@/lib/firebase/laptops";
import { formatIndianPrice } from "@/lib/constants";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLaptops().then((data) => {
      setLaptops(data);
      setLoading(false);
    });
  }, []);

  function toggleLaptop(laptop: Laptop) {
    setSelected((prev) => {
      const exists = prev.find((l) => l.id === laptop.id);
      if (exists) return prev.filter((l) => l.id !== laptop.id);
      if (prev.length >= 3) return prev;
      return [...prev, laptop];
    });
  }

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-xl bg-surface"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {selected.length > 0 && (
        <Card className="overflow-x-auto">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-text">
              Comparing {selected.length} laptop{selected.length > 1 ? "s" : ""}
            </h3>
            <button
              type="button"
              onClick={() => setSelected([])}
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
                <td className="py-3 pr-4 font-medium text-muted">Price</td>
                {selected.map((l) => (
                  <td key={l.id} className="py-3 pr-4 font-bold text-primary">
                    {formatIndianPrice(l.price)}
                  </td>
                ))}
              </tr>
              {SPEC_LABELS.map(({ key, label }) => (
                <tr key={key} className="border-b border-border">
                  <td className="py-3 pr-4 font-medium text-muted">{label}</td>
                  {selected.map((l) => (
                    <td key={l.id} className="py-3 pr-4 text-text">
                      {l.specs[key]}
                    </td>
                  ))}
                </tr>
              ))}
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
      )}

      <div>
        <p className="mb-4 text-sm text-muted">
          Select up to 3 laptops to compare ({selected.length}/3 selected)
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {laptops.map((laptop) => {
            const isSelected = selected.some((l) => l.id === laptop.id);
            const isDisabled = !isSelected && selected.length >= 3;

            return (
              <div
                key={laptop.id}
                role="button"
                tabIndex={0}
                onClick={() => !isDisabled && toggleLaptop(laptop)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!isDisabled) toggleLaptop(laptop);
                  }
                }}
                className={`relative cursor-pointer ${isDisabled ? "pointer-events-none opacity-50" : ""}`}
              >
                  <LaptopCard
                    name={laptop.name}
                    brand={laptop.brand}
                    price={laptop.price}
                    image={laptop.image}
                    rating={laptop.rating}
                    tags={laptop.tags}
                    affiliateUrl={laptop.affiliateUrl}
                    isRecommended={laptop.isRecommended}
                  />
                {isSelected && (
                  <Badge variant="blue" className="absolute right-4 top-4 z-10">
                    Selected
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selected.length === 0 && (
        <div className="text-center">
          <Button href="/finder" size="lg">
            Not sure? Take the Finder Quiz →
          </Button>
        </div>
      )}
    </div>
  );
}
