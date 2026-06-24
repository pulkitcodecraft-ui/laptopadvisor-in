"use client";

import { useState } from "react";
import Image from "next/image";
import { Laptop } from "lucide-react";
import {
  generateLaptopOutlineFallback,
  resolveLaptopImageUrl,
} from "@/lib/imageUtils";
import { cn } from "@/lib/utils";

interface LaptopImageProps {
  src: string;
  alt: string;
  nameOrSlug: string;
  width?: number;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export default function LaptopImage({
  src,
  alt,
  nameOrSlug,
  width = 600,
  className,
  fill = false,
  sizes,
  priority = false,
}: LaptopImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const imageSrc = useFallback
    ? generateLaptopOutlineFallback()
    : resolveLaptopImageUrl(src, nameOrSlug, width);

  const showOutlineIcon = useFallback && loaded;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-surface/80 to-card",
        fill && "h-full w-full",
        className,
      )}
    >
      {!loaded && <div className="absolute inset-0 animate-shimmer" />}
      {showOutlineIcon ? (
        <div className="flex flex-col items-center gap-2 p-8 opacity-60">
          <Laptop className="h-16 w-16 text-muted" strokeWidth={1.25} />
          <span className="text-xs text-muted">Image unavailable</span>
        </div>
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          fill={fill}
          {...(fill ? {} : { width, height: Math.round(width * 0.75) })}
          className={cn(
            "object-contain p-6 transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
          )}
          sizes={sizes ?? (fill ? "100vw" : `${width}px`)}
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setUseFallback(true);
            setLoaded(true);
          }}
        />
      )}
    </div>
  );
}
