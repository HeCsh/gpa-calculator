import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { QuickAnswer } from "@/components/shared/QuickAnswer";
import { FAQSection } from "@/components/shared/FAQSection";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { WEIGHTED_FAQS } from "@/data/seoContent";

export const metadata: Metadata = {
  title: "Weighted GPA Calculator 2025-2026 — Calculate Your 5.0 Scale GPA",
  description:
    "Free weighted GPA calculator for high school students. See how AP, IB, Honors, and Dual Enrollment courses boost your GPA on a 5.0 scale. Customize boost values to match your school.",
  alternates: {
    canonical: "/weighted-gpa-calculator",
  },
};

export default function WeightedGPACalculatorPage() {
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Breadcrumbs items={[{ label: "Weighted GPA Calculator", href: "/weighted-gpa-calculator" }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Weighted GPA Calculator
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Calculate your weighted GPA on a 5.0 scale. See how AP, IB, Honors, and
        Dual Enrollment courses boost your GPA above the standard 4.0.
      </p>

      <QuickAnswer
        question="What is a good weighted GPA?"
        answer="A weighted GPA of 4.0+ on a 5.0 scale is considered good. For competitive colleges, aim for 4.3+. The national average weighted GPA is approximately 3.38."
      />

      <div className="flex gap-4 mb-8">
        <Button asChild size="lg">
          <Link href="/gpa-calculator">
            Calculate Your Weighted GPA
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Separator className="my-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          What Is a Weighted GPA?
        </h2>
        <p className="text-muted-foreground mb-4">
          A weighted GPA gives extra credit for taking challenging courses. While
          a standard{" "}
          <Link href="/how-it-works#unweighted" className="text-primary hover:underline">
            unweighted GPA
          </Link>{" "}
          tops out at 4.0, a weighted GPA can go up to 5.0 (or higher at some
          schools). This rewards students who challenge themselves with advanced
          coursework.
        </p>
        <p className="text-muted-foreground mb-4">
          Most high schools report a weighted GPA on transcripts. Many colleges
          also consider weighted GPA to evaluate course rigor alongside
          academic performance.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Standard Boost Values</h2>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">Course Type</th>
                <th className="px-4 py-2 text-left font-medium">Boost</th>
                <th className="px-4 py-2 text-left font-medium">A is worth</th>
                <th className="px-4 py-2 text-left font-medium">B is worth</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="px-4 py-2">Regular</td><td className="px-4 py-2 font-mono">+0.0</td><td className="px-4 py-2 font-mono">4.0</td><td className="px-4 py-2 font-mono">3.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">Honors</td><td className="px-4 py-2 font-mono text-emerald-600">+0.5</td><td className="px-4 py-2 font-mono">4.5</td><td className="px-4 py-2 font-mono">3.5</td></tr>
              <tr className="border-t"><td className="px-4 py-2">AP (Advanced Placement)</td><td className="px-4 py-2 font-mono text-emerald-600">+1.0</td><td className="px-4 py-2 font-mono">5.0</td><td className="px-4 py-2 font-mono">4.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">IB Higher Level</td><td className="px-4 py-2 font-mono text-emerald-600">+1.0</td><td className="px-4 py-2 font-mono">5.0</td><td className="px-4 py-2 font-mono">4.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">IB Standard Level</td><td className="px-4 py-2 font-mono text-emerald-600">+0.5</td><td className="px-4 py-2 font-mono">4.5</td><td className="px-4 py-2 font-mono">3.5</td></tr>
              <tr className="border-t"><td className="px-4 py-2">Dual Enrollment</td><td className="px-4 py-2 font-mono text-emerald-600">+0.5</td><td className="px-4 py-2 font-mono">4.5</td><td className="px-4 py-2 font-mono">3.5</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          These are the most common values, but your school may differ. Our{" "}
          <Link href="/gpa-calculator" className="text-primary hover:underline">
            GPA calculator
          </Link>{" "}
          lets you customize boost values to match your school&apos;s exact system.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Weighted vs Unweighted GPA
        </h2>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium"></th>
                <th className="px-4 py-2 text-left font-medium">Unweighted</th>
                <th className="px-4 py-2 text-left font-medium">Weighted</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="px-4 py-2 font-medium">Scale</td><td className="px-4 py-2">0.0 – 4.0</td><td className="px-4 py-2">0.0 – 5.0+</td></tr>
              <tr className="border-t"><td className="px-4 py-2 font-medium">Course difficulty</td><td className="px-4 py-2">Ignored</td><td className="px-4 py-2">Rewarded with boosts</td></tr>
              <tr className="border-t"><td className="px-4 py-2 font-medium">Best for</td><td className="px-4 py-2">Baseline comparison</td><td className="px-4 py-2">Showing course rigor</td></tr>
              <tr className="border-t"><td className="px-4 py-2 font-medium">Used by</td><td className="px-4 py-2">Most college admissions</td><td className="px-4 py-2">High school transcripts</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground">
          Our calculator shows you both simultaneously so you can see how your
          GPA looks under each system. Learn more on our{" "}
          <Link href="/how-it-works" className="text-primary hover:underline">
            how it works
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Tips to Improve Your Weighted GPA
        </h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
          <li>
            <strong>Take AP or IB courses</strong> — even a B in an AP class
            (4.0 weighted) is worth the same as an A in a regular class
          </li>
          <li>
            <strong>Consider Honors versions</strong> of required classes — the
            +0.5 boost adds up over multiple semesters
          </li>
          <li>
            <strong>Don&apos;t overload</strong> — a lower grade in a harder
            class can hurt more than the boost helps
          </li>
          <li>
            <strong>Balance your schedule</strong> — colleges value consistent
            performance across semesters
          </li>
        </ul>
      </section>

      <FAQSection faqs={WEIGHTED_FAQS} />

      <Separator className="my-8" />

      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">
          Calculate Your Weighted GPA Now
        </h2>
        <p className="text-muted-foreground mb-6">
          Add your courses, select course types, and see your weighted GPA
          calculated instantly. Customize boost values to match your school.
        </p>
        <Button asChild size="lg">
          <Link href="/gpa-calculator">
            Open the Calculator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <LastUpdated />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Weighted GPA Calculator",
            description:
              "Calculate your weighted GPA on a 5.0 scale with AP, IB, Honors, and Dual Enrollment course boosts.",
            url: "https://thegpacalculator.net/weighted-gpa-calculator",
            isPartOf: {
              "@type": "WebSite",
              name: "GPA Calculator",
              url: "https://thegpacalculator.net",
            },
          }),
        }}
      />
    </article>
  );
}
