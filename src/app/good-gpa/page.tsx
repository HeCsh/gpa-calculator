import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { QuickAnswer } from "@/components/shared/QuickAnswer";
import { FAQSection } from "@/components/shared/FAQSection";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { GOOD_GPA_FAQS } from "@/data/seoContent";

export const metadata: Metadata = {
  title: "What Is a Good GPA? 2025-2026 Guide by College Tier",
  description:
    "Find out what GPA you need for college. See GPA ranges by college tier, national percentiles, and tips to improve your GPA for the 2025-2026 school year.",
  alternates: {
    canonical: "/good-gpa",
  },
};

export default function GoodGPAPage() {
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Breadcrumbs items={[{ label: "What Is a Good GPA?", href: "/good-gpa" }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        What Is a Good GPA?
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        What counts as a &quot;good&quot; GPA depends on where you want to go to college.
        Here&apos;s a breakdown by college tier, plus national percentile data to see
        where you stand.
      </p>

      <QuickAnswer
        question="What is a good GPA for college?"
        answer="A 3.5+ unweighted GPA is good for most colleges. For Ivy League and top-20 schools, aim for 3.8+. For state universities, 3.0-3.5 is typically competitive. The national average is 3.0."
      />

      <Separator className="my-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">GPA Ranges by College Tier</h2>
        <p className="text-muted-foreground mb-4">
          Different college tiers have different GPA expectations. This table shows
          typical unweighted GPA ranges for admitted students:
        </p>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">College Tier</th>
                <th className="px-4 py-2 text-left font-medium">Unweighted GPA</th>
                <th className="px-4 py-2 text-left font-medium">Weighted GPA</th>
                <th className="px-4 py-2 text-left font-medium">Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Ivy League / Top 10</td>
                <td className="px-4 py-2 font-mono">3.9 – 4.0</td>
                <td className="px-4 py-2 font-mono">4.5 – 5.0</td>
                <td className="px-4 py-2 text-muted-foreground">Harvard, MIT, Stanford</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Top 20</td>
                <td className="px-4 py-2 font-mono">3.8 – 3.95</td>
                <td className="px-4 py-2 font-mono">4.3 – 4.8</td>
                <td className="px-4 py-2 text-muted-foreground">Duke, Northwestern, Vanderbilt</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Top 50</td>
                <td className="px-4 py-2 font-mono">3.5 – 3.8</td>
                <td className="px-4 py-2 font-mono">4.0 – 4.5</td>
                <td className="px-4 py-2 text-muted-foreground">Boston U, Tulane, Wisconsin</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Flagship State Schools</td>
                <td className="px-4 py-2 font-mono">3.3 – 3.7</td>
                <td className="px-4 py-2 font-mono">3.8 – 4.3</td>
                <td className="px-4 py-2 text-muted-foreground">UC Davis, UMN, Penn State</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">State Universities</td>
                <td className="px-4 py-2 font-mono">2.8 – 3.3</td>
                <td className="px-4 py-2 font-mono">3.2 – 3.8</td>
                <td className="px-4 py-2 text-muted-foreground">CSU system, most state schools</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Open Admission</td>
                <td className="px-4 py-2 font-mono">2.0+</td>
                <td className="px-4 py-2 font-mono">2.5+</td>
                <td className="px-4 py-2 text-muted-foreground">Community colleges</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">National GPA Percentiles</h2>
        <p className="text-muted-foreground mb-4">
          Where does your GPA rank nationally? Use this table to estimate your
          percentile among US high school students:
        </p>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">Unweighted GPA</th>
                <th className="px-4 py-2 text-left font-medium">Percentile</th>
                <th className="px-4 py-2 text-left font-medium">What It Means</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">4.0</td>
                <td className="px-4 py-2">Top 2%</td>
                <td className="px-4 py-2 text-muted-foreground">Outstanding — competitive for any school</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">3.7</td>
                <td className="px-4 py-2">Top 10%</td>
                <td className="px-4 py-2 text-muted-foreground">Excellent — competitive for top 20 schools</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">3.5</td>
                <td className="px-4 py-2">Top 17%</td>
                <td className="px-4 py-2 text-muted-foreground">Very good — competitive for top 50 schools</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">3.0</td>
                <td className="px-4 py-2">Top 42%</td>
                <td className="px-4 py-2 text-muted-foreground">Average — competitive for most state schools</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">2.5</td>
                <td className="px-4 py-2">Top 70%</td>
                <td className="px-4 py-2 text-muted-foreground">Below average — limited options at selective schools</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono">2.0</td>
                <td className="px-4 py-2">Top 89%</td>
                <td className="px-4 py-2 text-muted-foreground">Minimum for many colleges</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Source: NCES NAEP High School Transcript Study and ACT National Profile Report.
          Use our{" "}
          <Link href="/gpa-calculator" className="text-primary hover:underline">
            GPA calculator
          </Link>{" "}
          to find your exact percentile.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Tips to Improve Your GPA</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-3 ml-2">
          <li>
            <strong>Focus on current classes first</strong> — raising your grades
            in this semester&apos;s courses has the most immediate impact on your GPA.
          </li>
          <li>
            <strong>Take weighted courses strategically</strong> — AP and Honors
            classes boost your{" "}
            <Link href="/weighted-gpa-calculator" className="text-primary hover:underline">
              weighted GPA
            </Link>{" "}
            even with a slightly lower letter grade.
          </li>
          <li>
            <strong>Use grade replacement</strong> — if your school allows it,
            retaking a course replaces the old grade in your GPA.
          </li>
          <li>
            <strong>Plan ahead with our calculator</strong> — model future
            semesters to see what grades you need to reach your target GPA.
          </li>
          <li>
            <strong>Check college-specific requirements</strong> — some schools
            like UCs use a{" "}
            <Link href="/uc-gpa-calculator" className="text-primary hover:underline">
              different GPA scale
            </Link>
            .
          </li>
        </ul>
      </section>

      <FAQSection faqs={GOOD_GPA_FAQS} />

      <Separator className="my-8" />

      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">Find Out Where You Stand</h2>
        <p className="text-muted-foreground mb-6">
          Calculate your GPA and see your national percentile instantly.
        </p>
        <Button asChild size="lg">
          <Link href="/gpa-calculator">
            Calculate Your GPA
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <LastUpdated />
    </article>
  );
}
