import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 sm:mb-12",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "type-label mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 normal-case tracking-wide text-primary dark:border-primary/25 dark:bg-primary/10",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
          {eyebrow}
        </span>
      )}
      <h2 className="type-section-title text-text">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "type-body-sm mt-3 max-w-2xl text-muted sm:mt-4 sm:text-base sm:leading-relaxed",
            align === "center" ? "mx-auto max-w-xl" : "",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
