import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPA Calculator — Calculate Your Weighted & Unweighted GPA",
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
  return children;
}
