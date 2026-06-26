"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import LaptopCard from "@/components/ui/LaptopCard";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { LAPTOP_CATALOG } from "@/lib/laptopCatalog";
import CategorizedLaptopBrowse from "@/components/laptops/CategorizedLaptopBrowse";
import { sectionFadeVariants } from "@/lib/motion";

type LaptopGridProps = {
  laptops?: typeof LAPTOP_CATALOG;
  limit?: number;
  showHeader?: boolean;
  showViewAll?: boolean;
};

export default function LaptopGrid({
  laptops = LAPTOP_CATALOG,
  limit,
  showHeader = true,
  showViewAll = true,
}: LaptopGridProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const items = limit ? laptops.slice(0, limit) : laptops;

  return (
    <>
      {showHeader && (
        <motion.div {...sectionFadeVariants(reducedMotion)}>
          <SectionHeader
            eyebrow="Top Picks"
            title="Laptops Students Actually Buy"
            subtitle="Real specs, RAM upgrade info, and verified India prices — curated for engineering students."
          />
        </motion.div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((laptop, i) => (
          <ScrollReveal key={laptop.id} index={i}>
            <LaptopCard
              name={laptop.name}
              brand={laptop.brand}
              price={laptop.price}
              priceLabel={laptop.priceLabel}
              image={laptop.image}
              rating={laptop.rating}
              tags={laptop.tags}
              affiliateUrl={laptop.affiliateUrl}
              isRecommended={laptop.isRecommended}
              specs={laptop.specs}
              description={laptop.description}
              priceSource={laptop.priceSource}
            />
          </ScrollReveal>
        ))}
      </div>

      {showViewAll && limit && laptops.length > limit && (
        <ScrollReveal index={limit} className="mt-10 flex justify-center">
          <Button href="/compare" variant="secondary" size="lg">
            Compare all {laptops.length} laptops
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </ScrollReveal>
      )}
    </>
  );
}

export function FeaturedLaptopsSection() {
  return (
    <section className="border-y border-border bg-surface py-16 sm:py-24">
      <div className="section-container">
        <CategorizedLaptopBrowse
          title="Laptops Students Actually Buy"
          subtitle="Tap a category to filter — tags match our Excel sheet exactly (Coding & Dev, Gaming & ML, Design & 3D, General, Video Editing)."
        />
      </div>
    </section>
  );
}
