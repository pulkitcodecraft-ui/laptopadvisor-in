"use client";

import { useState } from "react";
import Image from "next/image";
import PremiumLaptopSilhouette from "@/components/laptops/PremiumLaptopSilhouette";
import { resolveLaptopImageUrl } from "@/lib/imageUtils";
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
  compact?: boolean;
  presentation?: "default" | "card";
}

function PremiumCardFallback() {
  return <PremiumLaptopSilhouette className="premium-card-fallback-icon" />;
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
  compact = false,
  presentation = "default",
}: LaptopImageProps) {
  const imageSrc = resolveLaptopImageUrl(src, nameOrSlug, width);
  const hasImage = Boolean(imageSrc);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const isCard = presentation === "card";

  const showFallback = !hasImage || failed;

  if (isCard) {
    return (
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center",
          className,
        )}
      >
        {showFallback ? (
          <PremiumCardFallback />
        ) : (
          <>
            {!loaded && <PremiumCardFallback />}
            <Image
              src={imageSrc!}
              alt={alt}
              width={280}
              height={196}
              className={cn(
                "premium-card-product-image object-contain transition-opacity duration-300",
                loaded ? "opacity-100" : "absolute opacity-0",
              )}
              sizes={sizes ?? "(max-width: 680px) 90vw, 280px"}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => {
                setFailed(true);
                setLoaded(true);
              }}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "bg-gradient-to-b from-surface/90 to-card dark:from-surface/95 dark:to-card",
        fill && "h-full w-full",
        className,
      )}
    >
      {!loaded && !showFallback && (
        <div className="absolute inset-0 animate-shimmer" />
      )}

      {showFallback ? (
        <PremiumCardFallback />
      ) : (
        <Image
          src={imageSrc!}
          alt={alt}
          fill={fill}
          {...(fill ? {} : { width, height: Math.round(width * 0.75) })}
          className={cn(
            "object-contain object-center transition-opacity duration-300",
            compact ? "p-2" : "p-5 sm:p-6",
            loaded ? "opacity-100" : "opacity-0",
          )}
          sizes={
            sizes ??
            (fill
              ? "(max-width: 768px) 100vw, 280px"
              : `${width}px`)
          }
          priority={priority}
          loading={priority ? undefined : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setFailed(true);
            setLoaded(true);
          }}
        />
      )}
    </div>
  );
}
