import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "AP GPA Calculator — How AP Classes Affect Your GPA",
  description:
    "Free AP GPA calculator. See how Advanced Placement courses boost your weighted GPA. Calculate the impact of AP classes on your college application GPA.",
  alternates: {
    canonical: "/ap-gpa-calculator",
  },
};

export default function APGPACalculatorPage() {
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        AP GPA Calculator
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        See exactly how your Advanced Placement courses affect your GPA.
        Calculate the boost from AP classes and plan your course load
        strategically.
      </p>

      <div className="flex gap-4 mb-8">
        <Button asChild size="lg">
          <Link href="/gpa-calculator">
            Calculate Your AP GPA
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Separator className="my-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          How AP Classes Affect Your GPA
        </h2>
        <p className="text-muted-foreground mb-4">
          Advanced Placement (AP) courses are college-level classes offered in
          high school through the College Board. On a{" "}
          <Link href="/weighted-gpa-calculator" className="text-primary hover:underline">
            weighted GPA scale
          </Link>
          , AP classes typically receive a +1.0 boost — the highest boost of any
          course type.
        </p>
        <p className="text-muted-foreground mb-4">
          This means an A in an AP class is worth 5.0 points instead of 4.0,
          and even a B in AP (4.0 weighted) matches an A in a regular course on
          the weighted scale.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">AP Grade Point Values</h2>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">Grade</th>
                <th className="px-4 py-2 text-left font-medium">Unweighted</th>
                <th className="px-4 py-2 text-left font-medium">AP Weighted (+1.0)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="px-4 py-2">A+ / A</td><td className="px-4 py-2 font-mono">4.0</td><td className="px-4 py-2 font-mono text-emerald-600">5.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">A-</td><td className="px-4 py-2 font-mono">3.7</td><td className="px-4 py-2 font-mono text-emerald-600">4.7</td></tr>
              <tr className="border-t"><td className="px-4 py-2">B+</td><td className="px-4 py-2 font-mono">3.3</td><td className="px-4 py-2 font-mono text-emerald-600">4.3</td></tr>
              <tr className="border-t"><td className="px-4 py-2">B</td><td className="px-4 py-2 font-mono">3.0</td><td className="px-4 py-2 font-mono text-emerald-600">4.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">B-</td><td className="px-4 py-2 font-mono">2.7</td><td className="px-4 py-2 font-mono text-emerald-600">3.7</td></tr>
              <tr className="border-t"><td className="px-4 py-2">C+</td><td className="px-4 py-2 font-mono">2.3</td><td className="px-4 py-2 font-mono text-emerald-600">3.3</td></tr>
              <tr className="border-t"><td className="px-4 py-2">C</td><td className="px-4 py-2 font-mono">2.0</td><td className="px-4 py-2 font-mono text-emerald-600">3.0</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          AP Courses and UC GPA
        </h2>
        <p className="text-muted-foreground mb-4">
          If you&apos;re applying to{" "}
          <Link href="/uc-gpa-calculator" className="text-primary hover:underline">
            University of California schools
          </Link>
          , AP courses receive a +1.0 boost in the UC system as well. However,
          UC has additional rules:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
          <li>Plus/minus grades are not used (A- counts the same as A)</li>
          <li>Maximum 8 semester courses can receive the honors boost (capped GPA)</li>
          <li>Only a-g approved courses count</li>
          <li>Only 10th and 11th grade courses are included</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Is It Worth Taking AP Classes?
        </h2>
        <p className="text-muted-foreground mb-4">
          From a GPA perspective, AP classes are almost always beneficial for
          your weighted GPA — even if you earn a slightly lower grade. Here&apos;s
          a comparison:
        </p>
        <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
          <p>
            <strong>Scenario A:</strong> A in Regular = 4.0 unweighted, 4.0 weighted
          </p>
          <p>
            <strong>Scenario B:</strong> B+ in AP = 3.3 unweighted, 4.3 weighted
          </p>
          <p className="text-muted-foreground italic">
            The AP class gives you a higher weighted GPA even with a lower
            letter grade. However, your unweighted GPA would be lower.
          </p>
        </div>
        <p className="text-muted-foreground mt-4">
          The best approach is to take AP courses in subjects you&apos;re strong in,
          where you can maintain at least a B or better. Use our{" "}
          <Link href="/gpa-calculator" className="text-primary hover:underline">
            GPA calculator
          </Link>{" "}
          to model different scenarios before choosing your courses.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Most Popular AP Courses</h2>
        <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>AP English Language</li>
              <li>AP English Literature</li>
              <li>AP US History</li>
              <li>AP World History</li>
              <li>AP Government</li>
              <li>AP Psychology</li>
            </ul>
          </div>
          <div>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>AP Calculus AB/BC</li>
              <li>AP Statistics</li>
              <li>AP Biology</li>
              <li>AP Chemistry</li>
              <li>AP Physics</li>
              <li>AP Computer Science</li>
            </ul>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">
          Calculate Your GPA with AP Courses
        </h2>
        <p className="text-muted-foreground mb-6">
          Add your AP courses alongside your regular classes and see exactly how
          they impact your weighted and unweighted GPA.
        </p>
        <Button asChild size="lg">
          <Link href="/gpa-calculator">
            Open the Calculator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "AP GPA Calculator",
            description:
              "Calculate how Advanced Placement courses affect your weighted and unweighted GPA.",
            url: "https://thegpacalculator.net/ap-gpa-calculator",
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
