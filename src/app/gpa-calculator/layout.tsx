import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPA Calculator 2025-2026 — Calculate Your Weighted & Unweighted GPA",
  description:
    "Free online GPA calculator for high school students. Calculate your unweighted, weighted, and UC GPA instantly. Supports AP, IB, Honors, and Dual Enrollment courses.",
  alternates: {
    canonical: "/gpa-calculator",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "GPA Calculator",
            url: "https://thegpacalculator.net/gpa-calculator",
            description:
              "Free online GPA calculator for high school students. Calculate your unweighted, weighted, and UC GPA instantly.",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Any",
            featureList: [
              "Unweighted GPA (4.0 scale)",
              "Weighted GPA (5.0 scale)",
              "UC Capped Weighted GPA",
              "UC Uncapped Weighted GPA",
              "Custom boost values",
              "Semester and cumulative GPA",
              "National percentile ranking",
              "Semester trend charts",
            ],
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </>
  );
}
