import type { MetadataRoute } from "next";
import { getAllBranchSlugs } from "@/lib/branchData";
import { getAllCollegeSlugs } from "@/lib/collegeData";
import { getAllGuideSlugs } from "@/lib/guideData";
import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-static";

const siteUrl = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/finder",
    "/laptops",
    "/compare",
    "/deals",
    "/guides",
    "/about",
    "/contact",
    "/privacy",
    "/disclosure",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const branchPages = getAllBranchSlugs().map((slug) => ({
    url: `${siteUrl}/branch/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const collegePages = getAllCollegeSlugs().map((slug) => ({
    url: `${siteUrl}/college/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guidePages = getAllGuideSlugs().map((slug) => ({
    url: `${siteUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...branchPages, ...collegePages, ...guidePages];
}
