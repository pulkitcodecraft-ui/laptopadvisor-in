import { resolveLaptopImage } from "@/lib/laptopImages";

export function formatImageUrl(url: string, width: number): string {
  if (!url) return "";

  if (url.startsWith("data:") || url.startsWith("/")) return url;

  if (url.includes("firebasestorage.googleapis.com")) {
    return url;
  }

  if (url.includes("unsplash.com")) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}w=${width}&q=85&fit=crop`;
  }

  if (url.includes("placehold.co")) {
    return url.replace(/width=\d+/, `width=${width}`);
  }

  return url;
}

export function resolveLaptopImageUrl(
  image: string | undefined,
  nameOrSlug: string,
  width = 600,
): string | null {
  const resolved = (image || resolveLaptopImage(nameOrSlug, "")).trim();
  if (!resolved) return null;
  return formatImageUrl(resolved, width);
}

/** @deprecated */
export function generateLaptopOutlineFallback(): string {
  return "";
}

/** @deprecated */
export function generatePlaceholder(): string {
  return "";
}
