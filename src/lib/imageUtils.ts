const BRAND_COLORS: Record<string, string> = {
  lenovo: "#E2231A",
  apple: "#555555",
  hp: "#0096D6",
  asus: "#00539B",
  acer: "#83B81A",
  dell: "#007DB8",
  default: "#2563EB",
};

export function formatImageUrl(url: string, width: number): string {
  if (!url) return generatePlaceholder("Laptop");

  if (url.includes("firebasestorage.googleapis.com")) {
    return url;
  }

  if (url.includes("unsplash.com")) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}w=${width}&q=80&fit=crop`;
  }

  if (url.includes("placehold.co")) {
    return url.replace(/width=\d+/, `width=${width}`);
  }

  return url;
}

export function generatePlaceholder(brand: string): string {
  const key = brand.toLowerCase().split(" ")[0];
  const color = BRAND_COLORS[key] ?? BRAND_COLORS.default;
  const initial = brand.charAt(0).toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#f8fafc"/>
    <rect x="80" y="60" width="240" height="160" rx="12" fill="${color}" opacity="0.15"/>
    <rect x="100" y="80" width="200" height="120" rx="8" fill="${color}" opacity="0.3"/>
    <text x="200" y="260" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" font-weight="600" fill="${color}">${initial}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
