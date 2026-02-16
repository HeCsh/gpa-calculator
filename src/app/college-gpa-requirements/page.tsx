import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { QuickAnswer } from "@/components/shared/QuickAnswer";
import { FAQSection } from "@/components/shared/FAQSection";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { COLLEGE_REQUIREMENTS_FAQS } from "@/data/seoContent";
import { COLLEGE_REQUIREMENTS } from "@/data/collegeRequirements";

export const metadata: Metadata = {
  title: "College GPA Requirements 2025-2026 — GPA Needed for 50+ Schools",
  description:
    "See the average GPA and acceptance rate for 50+ popular US colleges. Find out what GPA you need for Ivy League, UC, state universities, and more.",
  alternates: {
    canonical: "/college-gpa-requirements",
  },
};

const TIER_LABELS: Record<string, string> = {
  ivy: "Ivy League",
  top20: "Top 20",
  top50: "Top 50",
  flagship: "Flagship State",
  state: "State University",
};

export default function CollegeGPARequirementsPage() {
  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Breadcrumbs items={[{ label: "College GPA Requirements", href: "/college-gpa-requirements" }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        College GPA Requirements
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Average GPAs and acceptance rates for 50+ popular US colleges and
        universities. Use this data to set your GPA target.
      </p>

      <QuickAnswer
        question="What GPA do I need for college?"
        answer="It depends on the school: Ivy League needs 3.9+, top-50 schools need 3.5-3.8, state universities need 3.0-3.5, and many schools accept 2.5+. Check the table below for specific colleges."
      />

      <Separator className="my-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Average GPA by College
        </h2>
        <p className="text-muted-foreground mb-4">
          This table shows the average unweighted GPA of admitted students and the
          overall acceptance rate for each school. Use our{" "}
          <Link href="/gpa-calculator" className="text-primary hover:underline">
            GPA calculator
          </Link>{" "}
          to see where you stand.
        </p>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">College</th>
                <th className="px-4 py-2 text-left font-medium">Tier</th>
                <th className="px-4 py-2 text-right font-medium">Avg GPA</th>
                <th className="px-4 py-2 text-right font-medium">Accept Rate</th>
              </tr>
            </thead>
            <tbody>
              {COLLEGE_REQUIREMENTS.map((college) => (
                <tr key={college.name} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-2 font-medium">{college.name}</td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {TIER_LABELS[college.tier]}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">
                    {college.avgGPA.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">
                    {college.acceptanceRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Data represents approximate averages for the 2024-2025 admissions cycle.
          Actual requirements vary by applicant pool and may change year to year.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">How to Use This Data</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
          <li>
            <strong>Set a target GPA</strong> — find your dream school and aim
            for their average admitted GPA or higher.
          </li>
          <li>
            <strong>Build a balanced list</strong> — include reach schools
            (your GPA is below average), match schools (at average), and safety
            schools (above average).
          </li>
          <li>
            <strong>Consider weighted vs unweighted</strong> — the GPAs shown
            are unweighted. Your{" "}
            <Link href="/weighted-gpa-calculator" className="text-primary hover:underline">
              weighted GPA
            </Link>{" "}
            will be higher if you take AP/Honors courses.
          </li>
          <li>
            <strong>Check UC-specific requirements</strong> — UC schools use
            their own{" "}
            <Link href="/uc-gpa-calculator" className="text-primary hover:underline">
              GPA calculation
            </Link>{" "}
            that differs from the standard scale.
          </li>
        </ul>
      </section>

      <FAQSection faqs={COLLEGE_REQUIREMENTS_FAQS} />

      <Separator className="my-8" />

      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">Calculate Your GPA</h2>
        <p className="text-muted-foreground mb-6">
          See how your GPA compares to these college averages. Target any school
          and get your GPA calculated their way.
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
            "@type": "ItemList",
            name: "College GPA Requirements",
            description: "Average GPA requirements for 50+ US colleges",
            numberOfItems: COLLEGE_REQUIREMENTS.length,
            itemListElement: COLLEGE_REQUIREMENTS.slice(0, 10).map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
              description: `Average GPA: ${c.avgGPA.toFixed(2)}, Acceptance Rate: ${c.acceptanceRate}%`,
            })),
          }),
        }}
      />
    </article>
  );
}
