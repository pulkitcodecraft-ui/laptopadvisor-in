import type { LaptopSpecs } from "@/lib/firebase/laptops";
import { RamUpgradeBadge } from "@/components/ui/RamUpgradeBadge";
import { cn } from "@/lib/utils";

function formatCpuGpu(specs: LaptopSpecs): string {
  const cpu = specs.processor;
  const gpu = specs.gpu;
  if (gpu && gpu !== "—" && gpu !== "Integrated" && !cpu.includes("/")) {
    return `${cpu} / ${gpu}`;
  }
  return cpu;
}

type CampusSpecGridProps = {
  specs: LaptopSpecs;
  compact?: boolean;
  variant?: "default" | "kit";
};

export default function CampusSpecGrid({
  specs,
  compact = false,
  variant = "default",
}: CampusSpecGridProps) {
  const ramDisplay = specs.ram.replace(/\*$/, "");
  const ramExpandable = specs.ram.includes("*");

  const kitCells = [
    { label: "CPU", value: formatCpuGpu(specs) },
    { label: "Display", value: specs.display },
    {
      label: "RAM",
      value: ramExpandable ? `${ramDisplay}*` : ramDisplay,
    },
    { label: "Battery", value: specs.battery },
    { label: "Storage", value: specs.storage },
    { label: "Weight", value: specs.weight },
  ];

  const compactCells = [
    {
      label: "RAM",
      value: ramExpandable ? `${ramDisplay}*` : ramDisplay,
    },
    { label: "Storage", value: specs.storage },
    { label: "Battery", value: specs.battery },
    { label: "Weight", value: specs.weight },
  ];

  if (variant === "kit") {
    return (
      <div>
        <div className="kit-spec-grid">
          {kitCells.map(({ label, value }) => (
            <div key={label} className="kit-spec-cell">
              <span className="kit-spec-label">{label}</span>
              <span className="kit-spec-value">{value}</span>
            </div>
          ))}
        </div>
        {specs.ramUpgradeable && (
          <RamUpgradeBadge
            upgradeable={specs.ramUpgradeable}
            note={specs.ramUpgradeNote}
            compact
            inline
          />
        )}
      </div>
    );
  }

  const cells = compact ? compactCells : kitCells;

  return (
    <div className={cn(!compact && "mb-0")}>
      <div
        className={cn(
          compact ? "premium-specs-compact" : "premium-specs",
        )}
      >
        {cells.map(({ label, value }) => (
          <div
            key={label}
            className={cn(
              compact ? "flex items-start gap-2.5" : "premium-spec-cell",
            )}
          >
            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  compact
                    ? "text-xs font-semibold text-[var(--color-text-low)]"
                    : "premium-spec-label",
                )}
              >
                {label}
              </span>
              <span
                className={cn(
                  compact
                    ? "mt-0.5 block break-words text-sm font-semibold leading-snug text-text"
                    : "premium-spec-value",
                )}
              >
                {value}
              </span>
            </span>
          </div>
        ))}
      </div>
      {specs.ramUpgradeable && (
        <RamUpgradeBadge
          upgradeable={specs.ramUpgradeable}
          note={specs.ramUpgradeNote}
          compact
          inline={compact}
        />
      )}
    </div>
  );
}
