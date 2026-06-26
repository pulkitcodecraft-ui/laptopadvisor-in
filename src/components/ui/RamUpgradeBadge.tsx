import { ArrowUpCircle, Lock, HelpCircle } from "lucide-react";
import type { RamUpgradeable } from "@/lib/firebase/laptops";

const CONFIG: Record<
  RamUpgradeable,
  {
    label: string;
    short: string;
    className: string;
    Icon: typeof ArrowUpCircle;
  }
> = {
  yes: {
    label: "RAM upgradeable",
    short: "Upgradeable",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
    Icon: ArrowUpCircle,
  },
  no: {
    label: "RAM not upgradeable",
    short: "Soldered",
    className:
      "border-rose-500/25 bg-rose-500/10 text-rose-800 dark:text-rose-200",
    Icon: Lock,
  },
  partial: {
    label: "RAM upgrade — check SKU",
    short: "Verify SKU",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-100",
    Icon: HelpCircle,
  },
};

export function RamUpgradeBadge({
  upgradeable,
  note,
  compact = false,
  inline = false,
}: {
  upgradeable: RamUpgradeable;
  note?: string;
  compact?: boolean;
  inline?: boolean;
}) {
  const { label, short, className, Icon } = CONFIG[upgradeable];

  if (inline) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${className}`}
        title={note}
      >
        <Icon className="h-3 w-3 shrink-0" aria-hidden />
        {short}
      </span>
    );
  }

  return (
    <div
      className={`flex items-start gap-2 rounded-lg border px-3 py-2 ${className}`}
      title={note}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs font-semibold">{compact ? short : label}</p>
        {note && !compact && (
          <p className="mt-0.5 text-[11px] leading-snug opacity-90">{note}</p>
        )}
      </div>
    </div>
  );
}

export function ramUpgradeLabel(upgradeable: RamUpgradeable): string {
  return CONFIG[upgradeable].label;
}
