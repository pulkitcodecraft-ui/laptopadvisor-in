"use client";

import { useState } from "react";
import Image from "next/image";
import { formatImageUrl, generatePlaceholder } from "@/lib/imageUtils";
import { cn } from "@/lib/utils";

interface LaptopImageProps {
  src: string;
  alt: string;
  brand: string;
  width?: number;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export default function LaptopImage({
  src,
  alt,
  brand,
  width = 600,
  className,
  fill = false,
  sizes,
  priority = false,
}: LaptopImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageSrc =
    error || !src ? generatePlaceholder(brand) : formatImageUrl(src, width);

  return (
    <div className={cn("relative overflow-hidden", fill && "h-full w-full", className)}>
      {!loaded && (
        <div className="absolute inset-0 animate-shimmer" />
      )}
      <Image
        src={imageSrc}
        alt={alt}
        fill={fill}
        {...(fill ? {} : { width, height: Math.round(width * 0.75) })}
        className={cn(
          "object-contain p-4 transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
        sizes={sizes ?? (fill ? "100vw" : `${width}px`)}
        priority={priority}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
      />
    </div>
  );
}
