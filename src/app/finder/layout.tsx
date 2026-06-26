import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find My Laptop",
  description:
    "Answer 6 quick questions and get personalised laptop picks from our curated database of 19 engineering laptops.",
};

export default function FinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
