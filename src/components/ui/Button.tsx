import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "btn-shine bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 border border-transparent",
  secondary:
    "bg-white/80 text-text border border-border backdrop-blur hover:border-primary/40 hover:text-primary hover:shadow-md",
  ghost:
    "bg-transparent text-primary border border-transparent hover:bg-primary/5",
  dark:
    "btn-shine bg-text text-white border border-transparent hover:bg-ink-2 shadow-lg shadow-black/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm min-h-[40px] rounded-full",
  md: "px-5 py-2.5 text-sm min-h-[44px] rounded-full",
  lg: "px-7 py-3.5 text-base min-h-[52px] rounded-full",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  href,
  className,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
