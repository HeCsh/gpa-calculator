import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "How GPA Calculation Works",
  description:
    "Learn how different GPA systems work — unweighted, weighted, and UC GPA. Understand grade scales, course boosts, and special rules.",
  alternates: {
    canonical: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        How GPA Calculation Works
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        A complete guide to understanding the different GPA systems used by high
        schools and colleges across the US.
      </p>

      <Separator className="my-8" />

      {/* Unweighted GPA */}
      <section id="unweighted" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Unweighted GPA (4.0 Scale)
        </h2>
        <p className="text-muted-foreground mb-4">
          The unweighted GPA is the most widely used grading system. It treats
          all courses equally — an A in a regular English class is worth the
          same as an A in{" "}
          <Link href="/ap-gpa-calculator" className="text-primary hover:underline">
            AP Physics
          </Link>
          . The scale runs from 0.0 to 4.0.
        </p>

        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">Grade</th>
                <th className="px-4 py-2 text-left font-medium">Points</th>
                <th className="px-4 py-2 text-left font-medium">Grade</th>
                <th className="px-4 py-2 text-left font-medium">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">A+ / A</td>
                <td className="px-4 py-2 font-mono">4.0</td>
                <td className="px-4 py-2">C+</td>
                <td className="px-4 py-2 font-mono">2.3</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">A-</td>
                <td className="px-4 py-2 font-mono">3.7</td>
                <td className="px-4 py-2">C</td>
                <td className="px-4 py-2 font-mono">2.0</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">B+</td>
                <td className="px-4 py-2 font-mono">3.3</td>
                <td className="px-4 py-2">C-</td>
                <td className="px-4 py-2 font-mono">1.7</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">B</td>
                <td className="px-4 py-2 font-mono">3.0</td>
                <td className="px-4 py-2">D+</td>
                <td className="px-4 py-2 font-mono">1.3</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">B-</td>
                <td className="px-4 py-2 font-mono">2.7</td>
                <td className="px-4 py-2">D / D-</td>
                <td className="px-4 py-2 font-mono">1.0 / 0.7</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2" colSpan={2}></td>
                <td className="px-4 py-2">F</td>
                <td className="px-4 py-2 font-mono">0.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg bg-muted/50 p-4 text-sm">
          <strong>How to calculate:</strong> Multiply each course&apos;s grade
          points by its credits. Add them all up, then divide by total credits.
          <br />
          <em className="text-muted-foreground">
            Example: A (4.0) in a 1-credit course + B (3.0) in a 1-credit
            course = 7.0 / 2 = 3.50 GPA
          </em>
        </div>
      </section>

      {/* Weighted GPA */}
      <section id="weighted" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Weighted GPA (5.0 Scale)
        </h2>
        <p className="text-muted-foreground mb-4">
          The{" "}
          <Link href="/weighted-gpa-calculator" className="text-primary hover:underline">
            weighted GPA
          </Link>{" "}
          rewards students for taking challenging courses. It
          adds extra &quot;boost&quot; points to your grade based on the course difficulty
          level. This means your GPA can exceed 4.0.
        </p>

        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">
                  Course Type
                </th>
                <th className="px-4 py-2 text-left font-medium">Boost</th>
                <th className="px-4 py-2 text-left font-medium">
                  A is worth
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Regular</td>
                <td className="px-4 py-2 font-mono">+0.0</td>
                <td className="px-4 py-2 font-mono">4.0</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Honors</td>
                <td className="px-4 py-2 font-mono text-emerald-600">+0.5</td>
                <td className="px-4 py-2 font-mono">4.5</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">AP</td>
                <td className="px-4 py-2 font-mono text-emerald-600">+1.0</td>
                <td className="px-4 py-2 font-mono">5.0</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">IB Higher Level</td>
                <td className="px-4 py-2 font-mono text-emerald-600">+1.0</td>
                <td className="px-4 py-2 font-mono">5.0</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">IB Standard Level</td>
                <td className="px-4 py-2 font-mono text-emerald-600">+0.5</td>
                <td className="px-4 py-2 font-mono">4.5</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Dual Enrollment</td>
                <td className="px-4 py-2 font-mono text-emerald-600">+0.5</td>
                <td className="px-4 py-2 font-mono">4.5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground">
          Note: These are the most common boost values, but your school may use
          different amounts. Use our calculator&apos;s &quot;Edit Boosts&quot; feature to match
          your school&apos;s exact system.
        </p>
      </section>

      {/* UC GPA */}
      <section id="uc-gpa" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">UC GPA System</h2>
        <p className="text-muted-foreground mb-4">
          The University of California has its own{" "}
          <Link href="/uc-gpa-calculator" className="text-primary hover:underline">
            GPA calculation system
          </Link>{" "}
          with specific rules. Understanding this is crucial if you&apos;re applying to
          any UC school (Berkeley, UCLA, San Diego, etc.).
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">
          UC Capped Weighted GPA
        </h3>
        <p className="text-muted-foreground mb-3">
          This is the primary GPA used for UC admissions eligibility. Key
          rules:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-4 ml-2">
          <li>
            Only <strong>a-g approved courses</strong> count (History, English,
            Math, Lab Science, Language, Arts, College-Prep Elective)
          </li>
          <li>
            <strong>No plus/minus distinctions</strong> — A+, A, and A- all
            count as 4.0
          </li>
          <li>
            <strong>+1.0 boost</strong> for UC-approved honors courses (AP, IB,
            certain honors, dual enrollment)
          </li>
          <li>
            <strong>Maximum 8 semester courses</strong> can receive the honors
            boost
          </li>
          <li>
            <strong>Maximum 4 of those 8</strong> can be from 10th grade
          </li>
          <li>
            Only courses from <strong>10th and 11th grade</strong> count
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 mt-6">
          UC Uncapped Weighted GPA
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Same as capped, but with no limit on the number of honors points.
          Every eligible honors course gets the +1.0 boost. Some UC campuses
          consider this alongside the capped GPA.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">
          UC Unweighted GPA
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          A simple 4.0 scale with no boosts and no plus/minus distinctions.
          Only a-g courses from 10th and 11th grade count.
        </p>
      </section>

      {/* Course Types */}
      <section id="course-types" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Course Types Explained</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Regular / Standard</h3>
            <p className="text-sm text-muted-foreground">
              Standard-level high school courses with no additional GPA weight.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Honors</h3>
            <p className="text-sm text-muted-foreground">
              Advanced courses with deeper content and higher expectations.
              Typically available starting in 10th grade. Usually +0.5 boost.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">AP (Advanced Placement)</h3>
            <p className="text-sm text-muted-foreground">
              College-level courses designed by the College Board with a
              standardized end-of-year exam. Usually +1.0 boost.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">IB Higher Level (HL)</h3>
            <p className="text-sm text-muted-foreground">
              Part of the International Baccalaureate program. 240+ teaching
              hours with greater depth. Usually +1.0 boost.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">IB Standard Level (SL)</h3>
            <p className="text-sm text-muted-foreground">
              Foundation-level IB courses with 150 teaching hours. Boost varies
              by school (often +0.5 or none).
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Dual Enrollment</h3>
            <p className="text-sm text-muted-foreground">
              College courses taken at a local college while still in high
              school. Usually +0.5 boost.
            </p>
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section id="how-to-calculate" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Calculate Your GPA: Step by Step
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground ml-2">
          <li>
            <strong>List your courses</strong> with the letter grade you earned
            and the course type (Regular, Honors, AP, etc.)
          </li>
          <li>
            <strong>Convert each grade to points</strong> using the grade scale
            (e.g., A = 4.0, B+ = 3.3)
          </li>
          <li>
            <strong>Add the boost</strong> for weighted GPA (e.g., AP gets +1.0,
            so an A becomes 5.0)
          </li>
          <li>
            <strong>Multiply by credits</strong> — each course&apos;s final
            points times its credit value
          </li>
          <li>
            <strong>Add up all quality points</strong> and divide by total
            credits
          </li>
        </ol>
      </section>

      <Separator className="my-8" />

      {/* Related Pages */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Related Calculators</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/weighted-gpa-calculator"
            className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-semibold mb-1">Weighted GPA Calculator</h3>
            <p className="text-sm text-muted-foreground">
              See how AP, IB, and Honors courses boost your GPA on a 5.0 scale.
            </p>
          </Link>
          <Link
            href="/uc-gpa-calculator"
            className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-semibold mb-1">UC GPA Calculator</h3>
            <p className="text-sm text-muted-foreground">
              Calculate your Capped, Uncapped, and Unweighted UC GPA.
            </p>
          </Link>
          <Link
            href="/ap-gpa-calculator"
            className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-semibold mb-1">AP GPA Calculator</h3>
            <p className="text-sm text-muted-foreground">
              See how Advanced Placement courses impact your weighted GPA.
            </p>
          </Link>
        </div>
      </section>

      <Separator className="my-8" />

      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">Try It Yourself</h2>
        <Button asChild size="lg">
          <Link href="/gpa-calculator">
            Open the Calculator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* JSON-LD structured data — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How GPA Calculation Works",
            description:
              "A complete guide to understanding unweighted, weighted, and UC GPA systems.",
            author: {
              "@type": "Organization",
              name: "GPA Calculator",
              url: "https://thegpacalculator.net",
            },
          }),
        }}
      />
      {/* JSON-LD structured data — HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Calculate Your GPA",
            description:
              "Step-by-step guide to calculating your high school GPA for college applications.",
            step: [
              {
                "@type": "HowToStep",
                name: "List your courses",
                text: "List your courses with the letter grade you earned and the course type (Regular, Honors, AP, IB, or Dual Enrollment).",
              },
              {
                "@type": "HowToStep",
                name: "Convert grades to points",
                text: "Convert each letter grade to grade points using the standard scale (A = 4.0, B+ = 3.3, B = 3.0, etc.).",
              },
              {
                "@type": "HowToStep",
                name: "Add course type boosts",
                text: "For weighted GPA, add the boost for your course type: Honors +0.5, AP/IB HL +1.0, IB SL/Dual Enrollment +0.5.",
              },
              {
                "@type": "HowToStep",
                name: "Multiply by credits",
                text: "Multiply each course's final grade points by its credit value to get quality points.",
              },
              {
                "@type": "HowToStep",
                name: "Calculate your GPA",
                text: "Add up all quality points and divide by total credits. The result is your GPA.",
              },
            ],
          }),
        }}
      />
    </article>
  );
}
