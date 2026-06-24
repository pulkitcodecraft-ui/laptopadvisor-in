import type { LaptopSpecs } from "@/lib/firebase/laptops";

export function LaptopCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-[4/3] animate-shimmer" />
      <div className="space-y-4 p-5">
        <div className="flex justify-between">
          <div className="h-3 w-16 animate-shimmer rounded" />
          <div className="h-5 w-12 animate-shimmer rounded-full" />
        </div>
        <div className="h-5 w-3/4 animate-shimmer rounded" />
        <div className="flex gap-2">
          <div className="h-6 w-16 animate-shimmer rounded-full" />
          <div className="h-6 w-14 animate-shimmer rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-3 pt-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-2.5 w-10 animate-shimmer rounded" />
              <div className="h-4 w-full animate-shimmer rounded" />
            </div>
          ))}
        </div>
        <div className="h-4 w-full animate-shimmer rounded" />
        <div className="h-8 w-28 animate-shimmer rounded" />
        <div className="flex gap-2 pt-1">
          <div className="h-11 flex-1 animate-shimmer rounded-full" />
          <div className="h-11 flex-1 animate-shimmer rounded-full" />
        </div>
      </div>
    </div>
  );
}

interface SpecGridProps {
  specs: LaptopSpecs;
}

export function LaptopSpecGrid({ specs }: SpecGridProps) {
  const items = [
    { label: "CPU", value: specs.processor },
    { label: "Display", value: specs.display },
    { label: "RAM", value: specs.ram },
    { label: "Battery", value: specs.battery },
    { label: "Storage", value: specs.storage },
    { label: "Weight", value: specs.weight },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-border py-4">
      {items.map(({ label, value }) => (
        <div key={label}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
            {label}
          </p>
          <p className="mt-0.5 text-sm font-semibold leading-snug text-text">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
