"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ArrowUpRight, GitCompareArrows } from "lucide-react";
import Badge from "@/components/ui/Badge";
import LaptopImage from "@/components/ui/LaptopImage";
import { LaptopSpecGrid } from "@/components/ui/LaptopCardSkeleton";
import type { LaptopSpecs } from "@/lib/firebase/laptops";
import { formatIndianPrice } from "@/lib/constants";
import { cardHoverMotion } from "@/lib/motion";

interface LaptopCardProps {
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  tags: string[];
  affiliateUrl: string;
  isRecommended?: boolean;
  specs?: LaptopSpecs;
  description?: string;
  priceLabel?: string;
  showCompareLink?: boolean;
  selectionMode?: boolean;
}

export default function LaptopCard({
  name,
  brand,
  price,
  image,
  rating,
  tags,
  affiliateUrl,
  isRecommended = false,
  specs,
  description,
  priceLabel,
  showCompareLink = true,
  selectionMode = false,
}: LaptopCardProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const displayPrice = priceLabel ?? (price > 0 ? formatIndianPrice(price) : null);

  return (
    <motion.div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-[250ms] hover:border-primary/30 hover:shadow-[0_22px_60px_-22px_rgba(124,58,237,0.4)] dark:hover:shadow-[0_22px_60px_-22px_rgba(124,58,237,0.5)]"
      {...cardHoverMotion(reducedMotion)}
    >
      {isRecommended && (
        <div className="absolute left-3 top-3 z-10">
          <Badge variant="gradient">★ Recommended</Badge>
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[250ms] ease-out group-hover:scale-105">
          <LaptopImage
            src={image}
            alt={`${brand} ${name}`}
            nameOrSlug={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            {brand}
          </p>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 dark:bg-amber-500/15">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        <h3 className="mt-1.5 text-lg font-bold leading-snug text-text">{name}</h3>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="gray">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {specs && <div className="mt-4"><LaptopSpecGrid specs={specs} /></div>}

        {description && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}

        <div className="mt-auto pt-4">
          {displayPrice && (
            <div className="mb-3 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-text">{displayPrice}</span>
              {!priceLabel && price > 0 && (
                <span className="text-xs text-muted">approx</span>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => selectionMode && e.stopPropagation()}
              className="btn-shine flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35"
            >
              Check Price
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {showCompareLink && (
              <Link
                href="/compare"
                onClick={(e) => selectionMode && e.stopPropagation()}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/40 hover:text-primary dark:bg-surface/50"
              >
                <GitCompareArrows className="h-4 w-4" />
                Compare
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
