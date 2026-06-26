import type { Metadata } from "next";
import CategorizedLaptopBrowse from "@/components/laptops/CategorizedLaptopBrowse";

export const metadata: Metadata = {
  title: "Browse Laptops",
  description:
    "Browse 19 engineering laptops by category — Coding & Dev, Gaming & ML, Design & 3D, General Studies, and Video Editing.",
};

export default function LaptopsPage() {
  return (
    <div className="section-container py-12 sm:py-16">
      <CategorizedLaptopBrowse
        showHeader
        title="All Laptop Recommendations"
        subtitle="Categories from our curated Excel database. Filter by what you actually need — coding, CAD, gaming, or everyday college work."
      />
    </div>
  );
}
