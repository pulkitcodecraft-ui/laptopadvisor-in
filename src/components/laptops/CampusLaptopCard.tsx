"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Plus, Sparkles } from "lucide-react";
import LaptopImage from "@/components/ui/LaptopImage";
import CampusSpecGrid from "@/components/laptops/CampusSpecGrid";
import type { CatalogLaptop } from "@/lib/laptopCatalog";
import { formatIndianPrice } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CampusLaptopCardProps = {
  laptop: CatalogLaptop;
  selectionMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  compareEnabled?: boolean;
  isInCompare?: boolean;
  onToggleCompare?: () => void;
  compareDisabled?: boolean;
};

export default function CampusLaptopCard({
  laptop,
  selectionMode = false,
  isSelected = false,
  onSelect,
  compareEnabled = false,
  isInCompare = false,
  onToggleCompare,
  compareDisabled = false,
}: CampusLaptopCardProps) {
  const displayPrice =
    laptop.priceLabel ??
    (laptop.price > 0 ? formatIndianPrice(laptop.price) : null);

  const selected = isSelected || isInCompare;

  const inner = (
    <article
      tabIndex={selectionMode ? 0 : undefined}
      className={cn(
        "kit-laptop-card group/card",
        selected && "kit-laptop-card--selected",
      )}
    >
      <div className="kit-card-shine" aria-hidden />

      <div className="kit-card-top">
        {laptop.tags.length > 0 && (
          <div className="kit-card-tags">
            {laptop.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="kit-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {compareEnabled && !selectionMode && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!compareDisabled || isInCompare) onToggleCompare?.();
            }}
            disabled={compareDisabled && !isInCompare}
            aria-pressed={isInCompare}
            aria-label={isInCompare ? "Remove from compare" : "Add to compare"}
            className={cn(
              "kit-compare-btn",
              isInCompare && "kit-compare-btn--active",
              compareDisabled && !isInCompare && "opacity-40",
            )}
          >
            {isInCompare ? (
              <Check className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            )}
          </button>
        )}
      </div>

      <div className="kit-card-main">
        <div className="kit-card-media-col">
          <div className="kit-card-media">
            <div className="kit-card-media-glow" aria-hidden />
            <LaptopImage
              src={laptop.image}
              alt={`${laptop.brand} ${laptop.name}`}
              nameOrSlug={laptop.slug || laptop.name}
              presentation="card"
              sizes="(max-width: 900px) 92vw, 44vw"
            />
          </div>
          {displayPrice && (
            <p className="kit-card-price">{displayPrice}</p>
          )}
        </div>

        <div className="kit-card-details">
          <h3 className="kit-card-title">{laptop.name}</h3>
          {laptop.specs && (
            <CampusSpecGrid specs={laptop.specs} variant="kit" />
          )}
        </div>
      </div>

      {laptop.description && (
        <p className="kit-card-desc">{laptop.description}</p>
      )}

      {!selectionMode && (
        <div className="kit-card-actions">
          <a
            href={laptop.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="kit-btn kit-btn-outline"
          >
            Buy Directly
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <Link href="/finder/" className="kit-btn kit-btn-solid">
            <Sparkles className="h-4 w-4" />
            Find Match
          </Link>
        </div>
      )}
    </article>
  );

  if (selectionMode) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.();
          }
        }}
        className="h-full cursor-pointer"
      >
        {inner}
      </div>
    );
  }

  return inner;
}
