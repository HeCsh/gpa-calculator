import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "UC GPA Calculator — Calculate Your Capped & Uncapped UC GPA",
  description:
    "Free UC GPA calculator for high school students applying to University of California schools. Calculate your UC Capped Weighted, Uncapped Weighted, and Unweighted GPA with a-g course validation.",
  alternates: {
    canonical: "/uc-gpa-calculator",
  },
};

export default function UCGPACalculatorPage() {
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        UC GPA Calculator
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Calculate your GPA the way the University of California does. Supports
        UC Capped Weighted, Uncapped Weighted, and Unweighted GPA with full a-g
        course validation.
      </p>

      <div className="flex gap-4 mb-8">
        <Button asChild size="lg">
          <Link href="/gpa-calculator">
            Calculate Your UC GPA
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Separator className="my-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          How the UC GPA System Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The University of California uses its own GPA calculation system that
          differs from most high schools. If you&apos;re applying to UC Berkeley,
          UCLA, UC San Diego, UC Davis, or any other UC campus, understanding
          this system is critical.
        </p>
        <p className="text-muted-foreground mb-4">
          UC calculates three different GPAs from your transcript. Our{" "}
          <Link href="/gpa-calculator" className="text-primary hover:underline">
            GPA calculator
          </Link>{" "}
          computes all three automatically when you select any UC school as your
          target.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">UC Capped Weighted GPA</h2>
        <p className="text-muted-foreground mb-4">
          This is the primary GPA used for UC admissions eligibility screening.
          It gives a +1.0 boost for UC-approved honors courses but caps the
          total bonus at 8 semesters, with no more than 4 from 10th grade.
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
          <li>Only <strong>a-g approved courses</strong> count</li>
          <li>Only grades from <strong>10th and 11th grade</strong> are included</li>
          <li><strong>No plus/minus</strong> — A+, A, and A- all count as 4.0</li>
          <li><strong>+1.0 boost</strong> for AP, IB, and UC-approved honors courses</li>
          <li><strong>Maximum 8 semester courses</strong> with honors boost (max 4 from 10th grade)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">UC Uncapped Weighted GPA</h2>
        <p className="text-muted-foreground mb-4">
          Same rules as the capped version, but without any limit on the number
          of honors points. Every eligible honors course gets the +1.0 boost.
          Some UC campuses use this alongside the capped GPA during holistic
          review.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">UC Unweighted GPA</h2>
        <p className="text-muted-foreground mb-4">
          A straight 4.0 scale with no course type boosts and no plus/minus
          distinctions. Only a-g courses from 10th and 11th grade count. This
          gives UC a baseline view of your academic performance.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">What Are a-g Courses?</h2>
        <p className="text-muted-foreground mb-4">
          The UC system requires courses in seven specific subject areas,
          labeled (a) through (g):
        </p>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">Category</th>
                <th className="px-4 py-2 text-left font-medium">Subject</th>
                <th className="px-4 py-2 text-left font-medium">Years Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="px-4 py-2">(a)</td><td className="px-4 py-2">History / Social Science</td><td className="px-4 py-2">2 years</td></tr>
              <tr className="border-t"><td className="px-4 py-2">(b)</td><td className="px-4 py-2">English</td><td className="px-4 py-2">4 years</td></tr>
              <tr className="border-t"><td className="px-4 py-2">(c)</td><td className="px-4 py-2">Mathematics</td><td className="px-4 py-2">3 years</td></tr>
              <tr className="border-t"><td className="px-4 py-2">(d)</td><td className="px-4 py-2">Lab Science</td><td className="px-4 py-2">2 years</td></tr>
              <tr className="border-t"><td className="px-4 py-2">(e)</td><td className="px-4 py-2">Language Other Than English</td><td className="px-4 py-2">2 years</td></tr>
              <tr className="border-t"><td className="px-4 py-2">(f)</td><td className="px-4 py-2">Visual / Performing Arts</td><td className="px-4 py-2">1 year</td></tr>
              <tr className="border-t"><td className="px-4 py-2">(g)</td><td className="px-4 py-2">College-Prep Elective</td><td className="px-4 py-2">1 year</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Only courses that are a-g approved by UC count toward your UC GPA. Our
          calculator lets you mark each course as a-g or not.
        </p>
      </section>

      <Separator className="my-8" />

      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">Calculate Your UC GPA Now</h2>
        <p className="text-muted-foreground mb-6">
          Select any UC campus as your target college and see your Capped,
          Uncapped, and Unweighted GPA calculated instantly.
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
            name: "UC GPA Calculator",
            description:
              "Calculate your UC Capped Weighted, Uncapped Weighted, and Unweighted GPA for University of California admissions.",
            url: "https://thegpacalculator.net/uc-gpa-calculator",
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
