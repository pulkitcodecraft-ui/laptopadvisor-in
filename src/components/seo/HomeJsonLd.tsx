import { getSiteUrl } from "@/lib/siteUrl";

export function HomeJsonLd() {
  const siteUrl = getSiteUrl();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Engineering Laptop Advisor India",
    url: siteUrl,
    description:
      "India's most trusted laptop guide for engineering students.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/finder?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much should I spend on a laptop for engineering?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most engineering students in India spend ₹50,000–₹80,000 for a laptop that lasts 4 years. CS and AI students may invest more for MacBooks or GPU laptops.",
        },
      },
      {
        "@type": "Question",
        name: "Is MacBook good for engineering students in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MacBooks are excellent for CS, AI, and Data Science but may not run Windows-only software like SolidWorks or STAAD Pro. Check your branch requirements first.",
        },
      },
      {
        "@type": "Question",
        name: "How much RAM do engineering students need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "16GB RAM is the minimum in 2025. Mechanical, civil, and AI students benefit from 16GB+ for CAD and ML workloads.",
        },
      },
      {
        "@type": "Question",
        name: "Should I buy a gaming laptop for coding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Only if you game daily. Gaming laptops are heavier, have shorter battery life, and are overkill for most coding and coursework.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I get student discounts on laptops in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Apple Education Store, Microsoft student offers, Amazon/Flipkart sale events, and campus stores at IITs and NITs offer student discounts.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
