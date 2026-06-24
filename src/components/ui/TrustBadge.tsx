import {
  BadgeCheck,
  BookOpen,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "No Sponsored Rankings" },
  { icon: BookOpen, label: "Student Focused" },
  { icon: RefreshCw, label: "Updated Daily" },
  { icon: BadgeCheck, label: "Independent Reviews" },
] as const;

export default function TrustBadge() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/70 px-3.5 py-3 backdrop-blur transition-colors hover:border-primary/25 dark:bg-card/80"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
            <Icon className="h-4 w-4 text-primary" />
          </span>
          <span className="text-xs font-semibold leading-tight text-text">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
