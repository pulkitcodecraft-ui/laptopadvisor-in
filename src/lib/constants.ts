export const BRANCHES = [
  "Computer Science",
  "AI",
  "Data Science",
  "Mechanical",
  "Civil",
  "Electrical",
  "Electronics",
  "Chemical",
  "Engineering Physics",
  "Aerospace",
  "Architecture",
  "Biotechnology",
] as const;

export type Branch = (typeof BRANCHES)[number];

export const COLLEGES = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Roorkee",
  "IIT Guwahati",
  "BITS Pilani",
  "NIT Trichy",
  "IIIT Hyderabad",
] as const;

export type College = (typeof COLLEGES)[number];

export const BUDGET_RANGES = [
  {
    label: "Under ₹50,000",
    value: "under-50000",
    description: "Tight budget, need to be smart",
  },
  {
    label: "₹50,000–₹70,000",
    value: "50000-70000",
    description: "Mid-range, most popular choice",
  },
  {
    label: "₹70,000–₹1,00,000",
    value: "70000-100000",
    description: "Willing to invest for quality",
  },
  {
    label: "₹1,00,000+",
    value: "100000-plus",
    description: "Premium, future-proof",
  },
] as const;

export type BudgetRange = (typeof BUDGET_RANGES)[number]["value"];

export const NAV_LINKS = [
  { label: "Laptops", href: "/laptops" },
  { label: "Student Offers", href: "#", comingSoon: true },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatIndianPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
