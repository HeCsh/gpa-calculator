import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { TOP_COLLEGES, getCollegeById } from "@/data/topColleges";

interface Props {
  params: Promise<{ college: string }>;
}

export function generateStaticParams() {
  return TOP_COLLEGES.map((c) => ({ college: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { college: collegeId } = await params;
  const college = getCollegeById(collegeId);
  if (!college) return {};

  return {
    title: `GPA Calculator for ${college.name} — 2025-2026`,
    description: `Free GPA calculator for ${college.name} applicants. Average admitted GPA: ${college.avgGPA.toFixed(2)}. Calculate your GPA and see if you're competitive for ${college.name}.`,
    alternates: {
      canonical: `/gpa-calculator/${collegeId}`,
    },
  };
}

export default async function CollegePage({ params }: Props) {
  const { college: collegeId } = await params;
  const college = getCollegeById(collegeId);
  if (!college) notFound();

  const isUC = college.system === "uc";

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "GPA Calculator", href: "/gpa-calculator" },
          { label: college.name, href: `/gpa-calculator/${collegeId}` },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        GPA Calculator for {college.name}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        {college.description}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg border p-4 text-center">
          <div className="text-3xl font-bold text-primary tabular-nums">
            {college.avgGPA.toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Avg Admitted GPA (Unweighted)
          </p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <div className="text-3xl font-bold tabular-nums">
            {college.acceptanceRate}%
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Acceptance Rate
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <Button asChild size="lg">
          <Link href={`/gpa-calculator?college=${collegeId}`}>
            Calculate Your GPA for {college.name.split(" ")[0]}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Separator className="my-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          GPA Requirements for {college.name}
        </h2>
        <p className="text-muted-foreground mb-4">
          The average unweighted GPA for admitted students at {college.name} is{" "}
          <strong>{college.avgGPA.toFixed(2)}</strong> with an acceptance rate of{" "}
          <strong>{college.acceptanceRate}%</strong>. To be competitive, aim for
          a GPA at or above this average.
        </p>
        {isUC && (
          <p className="text-muted-foreground mb-4">
            {college.name} uses the{" "}
            <Link href="/uc-gpa-calculator" className="text-primary hover:underline">
              UC GPA system
            </Link>
            , which calculates Capped Weighted, Uncapped Weighted, and Unweighted
            GPAs from your 10th and 11th grade a-g courses. Our calculator
            automatically uses the UC system when you select this school.
          </p>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Tips for {college.name} Applicants
        </h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
          {college.tips.map((tip) => (
            <li key={tip}>
              <strong>{tip.split(" — ")[0]}</strong>
              {tip.includes(" — ") && ` — ${tip.split(" — ")[1]}`}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/good-gpa"
            className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-semibold mb-1">What Is a Good GPA?</h3>
            <p className="text-sm text-muted-foreground">
              See GPA ranges by college tier and national percentiles.
            </p>
          </Link>
          <Link
            href="/college-gpa-requirements"
            className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-semibold mb-1">College GPA Requirements</h3>
            <p className="text-sm text-muted-foreground">
              Compare GPAs across 50+ popular US colleges.
            </p>
          </Link>
          {isUC ? (
            <Link
              href="/uc-gpa-calculator"
              className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-semibold mb-1">UC GPA Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Learn how the UC GPA system works in detail.
              </p>
            </Link>
          ) : (
            <Link
              href="/weighted-gpa-calculator"
              className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-semibold mb-1">Weighted GPA Calculator</h3>
              <p className="text-sm text-muted-foreground">
                See how AP and Honors courses boost your GPA.
              </p>
            </Link>
          )}
          <Link
            href="/gpa-scale"
            className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-semibold mb-1">GPA Scale Reference</h3>
            <p className="text-sm text-muted-foreground">
              Full grade-to-points conversion tables.
            </p>
          </Link>
        </div>
      </section>

      <Separator className="my-8" />

      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">
          Calculate Your GPA for {college.name}
        </h2>
        <p className="text-muted-foreground mb-6">
          Enter your courses and see your GPA calculated using{" "}
          {isUC ? "the UC GPA system" : "the standard grading system"}.
        </p>
        <Button asChild size="lg">
          <Link href={`/gpa-calculator?college=${collegeId}`}>
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
            name: `GPA Calculator for ${college.name}`,
            description: `Calculate your GPA for ${college.name}. Average admitted GPA: ${college.avgGPA.toFixed(2)}.`,
            url: `https://thegpacalculator.net/gpa-calculator/${collegeId}`,
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
