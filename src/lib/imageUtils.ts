import { resolveLaptopImage } from "@/lib/laptopImages";

export function formatImageUrl(url: string, width: number): string {
  if (!url) return "";

  if (url.startsWith("data:")) return url;

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

/** Clean laptop outline — used when image URL is missing or fails to load. */
export function generateLaptopOutlineFallback(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" fill="none">
    <rect width="400" height="300" fill="#f6f7fb"/>
    <rect x="72" y="168" width="256" height="14" rx="4" fill="#cbd5e1" opacity="0.6"/>
    <rect x="88" y="72" width="224" height="144" rx="10" stroke="#94a3b8" stroke-width="3" fill="#e2e8f0" opacity="0.5"/>
    <rect x="104" y="88" width="192" height="112" rx="4" fill="#94a3b8" opacity="0.15"/>
    <path d="M120 200h160" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function resolveLaptopImageUrl(
  image: string | undefined,
  nameOrSlug: string,
  width = 600,
): string {
  const resolved = image || resolveLaptopImage(nameOrSlug);
  if (!resolved) return generateLaptopOutlineFallback();
  return formatImageUrl(resolved, width);
}

/** @deprecated Use generateLaptopOutlineFallback */
export function generatePlaceholder(): string {
  return generateLaptopOutlineFallback();
}
