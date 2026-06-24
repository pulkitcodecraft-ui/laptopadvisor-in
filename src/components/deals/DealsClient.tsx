"use client";

import { useEffect, useState } from "react";
import { Clock, ExternalLink, Tag } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { LaptopCardSkeleton } from "@/components/ui/LaptopCardSkeleton";
import { getActiveDeals, type Deal } from "@/lib/firebase/deals";
import { formatIndianPrice } from "@/lib/constants";

export default function DealsClient() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveDeals().then((data) => {
      setDeals(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <LaptopCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {deals.map((deal, i) => (
        <ScrollReveal key={deal.id} index={i}>
          <Card hover className="flex h-full flex-col">
          <div className="mb-4 flex items-start justify-between">
            <Badge variant="green">{deal.discount}% OFF</Badge>
            <Badge variant="gray">{deal.platform}</Badge>
          </div>

          <h3 className="text-lg font-semibold text-text">{deal.laptopName}</h3>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              {formatIndianPrice(deal.dealPrice)}
            </span>
            <span className="text-sm text-muted line-through">
              {formatIndianPrice(deal.originalPrice)}
            </span>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />
            Valid until {deal.validUntil.toLocaleDateString("en-IN")}
          </p>

          <div className="mt-auto pt-5">
            <Button href={deal.affiliateUrl} className="w-full">
              <Tag className="mr-2 h-4 w-4" />
              View Deal
              <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-70" />
            </Button>
          </div>
        </Card>
        </ScrollReveal>
      ))}
    </div>
  );
}
