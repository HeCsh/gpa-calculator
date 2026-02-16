import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { QuickAnswer } from "@/components/shared/QuickAnswer";
import { FAQSection } from "@/components/shared/FAQSection";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { GPA_SCALE_FAQS } from "@/data/seoContent";

export const metadata: Metadata = {
  title: "GPA Scale — Letter Grade to GPA Conversion Chart 2025-2026",
  description:
    "Complete GPA scale reference. Convert letter grades to GPA on 4.0 unweighted, 5.0 weighted, and UC scales. Includes percentage conversion chart.",
  alternates: {
    canonical: "/gpa-scale",
  },
};

export default function GPAScalePage() {
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Breadcrumbs items={[{ label: "GPA Scale", href: "/gpa-scale" }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        GPA Scale
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Complete reference for converting letter grades, percentages, and grade
        points across different GPA scales used by US high schools and colleges.
      </p>

      <QuickAnswer
        question="What is the 4.0 GPA scale?"
        answer="The 4.0 scale converts letter grades to points: A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0. Most schools also use +/- grades (A- = 3.7, B+ = 3.3, etc.)."
      />

      <Separator className="my-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Standard 4.0 GPA Scale (Unweighted)</h2>
        <p className="text-muted-foreground mb-4">
          The standard unweighted scale treats all courses equally. This is the most
          widely used GPA scale and is the basis for all other scales.
        </p>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">Letter Grade</th>
                <th className="px-4 py-2 text-left font-medium">Grade Points</th>
                <th className="px-4 py-2 text-left font-medium">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="px-4 py-2">A+</td><td className="px-4 py-2 font-mono">4.0</td><td className="px-4 py-2">97 – 100%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">A</td><td className="px-4 py-2 font-mono">4.0</td><td className="px-4 py-2">93 – 96%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">A-</td><td className="px-4 py-2 font-mono">3.7</td><td className="px-4 py-2">90 – 92%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">B+</td><td className="px-4 py-2 font-mono">3.3</td><td className="px-4 py-2">87 – 89%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">B</td><td className="px-4 py-2 font-mono">3.0</td><td className="px-4 py-2">83 – 86%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">B-</td><td className="px-4 py-2 font-mono">2.7</td><td className="px-4 py-2">80 – 82%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">C+</td><td className="px-4 py-2 font-mono">2.3</td><td className="px-4 py-2">77 – 79%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">C</td><td className="px-4 py-2 font-mono">2.0</td><td className="px-4 py-2">73 – 76%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">C-</td><td className="px-4 py-2 font-mono">1.7</td><td className="px-4 py-2">70 – 72%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">D+</td><td className="px-4 py-2 font-mono">1.3</td><td className="px-4 py-2">67 – 69%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">D</td><td className="px-4 py-2 font-mono">1.0</td><td className="px-4 py-2">60 – 66%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">D-</td><td className="px-4 py-2 font-mono">0.7</td><td className="px-4 py-2">57 – 59%</td></tr>
              <tr className="border-t"><td className="px-4 py-2">F</td><td className="px-4 py-2 font-mono">0.0</td><td className="px-4 py-2">Below 57%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Weighted GPA Scale (5.0)</h2>
        <p className="text-muted-foreground mb-4">
          The{" "}
          <Link href="/weighted-gpa-calculator" className="text-primary hover:underline">
            weighted GPA scale
          </Link>{" "}
          adds boost points for advanced courses. Here&apos;s how each course type
          affects your grade points:
        </p>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">Grade</th>
                <th className="px-4 py-2 text-left font-medium">Regular</th>
                <th className="px-4 py-2 text-left font-medium">Honors (+0.5)</th>
                <th className="px-4 py-2 text-left font-medium">AP/IB HL (+1.0)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="px-4 py-2">A</td><td className="px-4 py-2 font-mono">4.0</td><td className="px-4 py-2 font-mono text-emerald-600">4.5</td><td className="px-4 py-2 font-mono text-emerald-600">5.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">A-</td><td className="px-4 py-2 font-mono">3.7</td><td className="px-4 py-2 font-mono text-emerald-600">4.2</td><td className="px-4 py-2 font-mono text-emerald-600">4.7</td></tr>
              <tr className="border-t"><td className="px-4 py-2">B+</td><td className="px-4 py-2 font-mono">3.3</td><td className="px-4 py-2 font-mono text-emerald-600">3.8</td><td className="px-4 py-2 font-mono text-emerald-600">4.3</td></tr>
              <tr className="border-t"><td className="px-4 py-2">B</td><td className="px-4 py-2 font-mono">3.0</td><td className="px-4 py-2 font-mono text-emerald-600">3.5</td><td className="px-4 py-2 font-mono text-emerald-600">4.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">B-</td><td className="px-4 py-2 font-mono">2.7</td><td className="px-4 py-2 font-mono text-emerald-600">3.2</td><td className="px-4 py-2 font-mono text-emerald-600">3.7</td></tr>
              <tr className="border-t"><td className="px-4 py-2">C+</td><td className="px-4 py-2 font-mono">2.3</td><td className="px-4 py-2 font-mono text-emerald-600">2.8</td><td className="px-4 py-2 font-mono text-emerald-600">3.3</td></tr>
              <tr className="border-t"><td className="px-4 py-2">C</td><td className="px-4 py-2 font-mono">2.0</td><td className="px-4 py-2 font-mono text-emerald-600">2.5</td><td className="px-4 py-2 font-mono text-emerald-600">3.0</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">UC GPA Scale</h2>
        <p className="text-muted-foreground mb-4">
          The{" "}
          <Link href="/uc-gpa-calculator" className="text-primary hover:underline">
            UC GPA system
          </Link>{" "}
          ignores plus/minus distinctions. All grades within a letter (A+, A, A-)
          receive the same points:
        </p>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">Letter Grade</th>
                <th className="px-4 py-2 text-left font-medium">Standard Scale</th>
                <th className="px-4 py-2 text-left font-medium">UC Scale</th>
                <th className="px-4 py-2 text-left font-medium">UC + Honors</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="px-4 py-2">A+ / A / A-</td><td className="px-4 py-2 font-mono">4.0 / 4.0 / 3.7</td><td className="px-4 py-2 font-mono">4.0</td><td className="px-4 py-2 font-mono text-emerald-600">5.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">B+ / B / B-</td><td className="px-4 py-2 font-mono">3.3 / 3.0 / 2.7</td><td className="px-4 py-2 font-mono">3.0</td><td className="px-4 py-2 font-mono text-emerald-600">4.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">C+ / C / C-</td><td className="px-4 py-2 font-mono">2.3 / 2.0 / 1.7</td><td className="px-4 py-2 font-mono">2.0</td><td className="px-4 py-2 font-mono text-emerald-600">3.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">D+ / D / D-</td><td className="px-4 py-2 font-mono">1.3 / 1.0 / 0.7</td><td className="px-4 py-2 font-mono">1.0</td><td className="px-4 py-2 font-mono">1.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">F</td><td className="px-4 py-2 font-mono">0.0</td><td className="px-4 py-2 font-mono">0.0</td><td className="px-4 py-2 font-mono">0.0</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          UC honors boost (+1.0) is capped at 8 semesters. Only a-g courses from
          10th–11th grade count. See{" "}
          <Link href="/uc-gpa-calculator" className="text-primary hover:underline">
            UC GPA Calculator
          </Link>{" "}
          for full details.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Percentage to GPA Conversion</h2>
        <p className="text-muted-foreground mb-4">
          If your school uses percentage grades, here&apos;s how to convert them to the
          4.0 GPA scale:
        </p>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">Percentage</th>
                <th className="px-4 py-2 text-left font-medium">Letter</th>
                <th className="px-4 py-2 text-left font-medium">GPA</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="px-4 py-2">97 – 100</td><td className="px-4 py-2">A+</td><td className="px-4 py-2 font-mono">4.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">93 – 96</td><td className="px-4 py-2">A</td><td className="px-4 py-2 font-mono">4.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">90 – 92</td><td className="px-4 py-2">A-</td><td className="px-4 py-2 font-mono">3.7</td></tr>
              <tr className="border-t"><td className="px-4 py-2">87 – 89</td><td className="px-4 py-2">B+</td><td className="px-4 py-2 font-mono">3.3</td></tr>
              <tr className="border-t"><td className="px-4 py-2">83 – 86</td><td className="px-4 py-2">B</td><td className="px-4 py-2 font-mono">3.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">80 – 82</td><td className="px-4 py-2">B-</td><td className="px-4 py-2 font-mono">2.7</td></tr>
              <tr className="border-t"><td className="px-4 py-2">77 – 79</td><td className="px-4 py-2">C+</td><td className="px-4 py-2 font-mono">2.3</td></tr>
              <tr className="border-t"><td className="px-4 py-2">73 – 76</td><td className="px-4 py-2">C</td><td className="px-4 py-2 font-mono">2.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">70 – 72</td><td className="px-4 py-2">C-</td><td className="px-4 py-2 font-mono">1.7</td></tr>
              <tr className="border-t"><td className="px-4 py-2">67 – 69</td><td className="px-4 py-2">D+</td><td className="px-4 py-2 font-mono">1.3</td></tr>
              <tr className="border-t"><td className="px-4 py-2">60 – 66</td><td className="px-4 py-2">D</td><td className="px-4 py-2 font-mono">1.0</td></tr>
              <tr className="border-t"><td className="px-4 py-2">Below 60</td><td className="px-4 py-2">F</td><td className="px-4 py-2 font-mono">0.0</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <FAQSection faqs={GPA_SCALE_FAQS} />

      <Separator className="my-8" />

      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">Calculate Your GPA</h2>
        <p className="text-muted-foreground mb-6">
          Enter your grades and see your GPA on every scale — unweighted, weighted, and UC.
        </p>
        <Button asChild size="lg">
          <Link href="/gpa-calculator">
            Open the Calculator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <LastUpdated />
    </article>
  );
}
