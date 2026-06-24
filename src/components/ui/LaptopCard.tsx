import { Star, ArrowUpRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import LaptopImage from "@/components/ui/LaptopImage";
import { formatIndianPrice } from "@/lib/constants";

interface LaptopCardProps {
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  tags: string[];
  affiliateUrl: string;
  isRecommended?: boolean;
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
}: LaptopCardProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_22px_60px_-22px_rgba(79,70,229,0.4)]">
      {isRecommended && (
        <div className="absolute left-3 top-3 z-10">
          <Badge variant="gradient">★ Recommended</Badge>
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface via-white to-primary/5">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.05]">
          <LaptopImage
            src={image}
            alt={`${brand} ${name}`}
            brand={brand}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            {brand}
          </p>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-amber-700">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        <h3 className="mt-1.5 text-lg font-bold leading-snug text-text">
          {name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="gray">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <div className="mb-3 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-text">
              {formatIndianPrice(price)}
            </span>
            <span className="text-xs text-muted">approx</span>
          </div>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35"
          >
            Check Price
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
