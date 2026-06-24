import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  hover = false,
  onClick,
}: CardProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-border bg-card p-5 sm:p-6",
        hover &&
          "cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_18px_50px_-18px_rgba(124,58,237,0.35)] dark:hover:shadow-[0_18px_50px_-18px_rgba(124,58,237,0.45)]",
        onClick && "text-left",
        className,
      )}
    >
      {children}
    </Component>
  );
}
