import { cn } from "@/lib/utils";

type BadgeVariant = "blue" | "purple" | "green" | "gray" | "gradient";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  blue: "bg-primary/10 text-primary ring-1 ring-inset ring-primary/15",
  purple: "bg-accent/10 text-accent ring-1 ring-inset ring-accent/15",
  green: "bg-success/10 text-success ring-1 ring-inset ring-success/15",
  gray: "bg-surface text-muted ring-1 ring-inset ring-border",
  gradient:
    "bg-gradient-to-r from-primary to-accent text-white shadow-sm shadow-primary/30",
};

export default function Badge({
  children,
  variant = "blue",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
