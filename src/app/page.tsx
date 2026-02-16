import Link from "next/link";
import { ArrowRight, Calculator, BookOpen, Settings2, Clock, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FEATURES, GPA_TYPE_INFO, FAQS } from "@/data/seoContent";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";

const ICONS = [Calculator, BarChart3, Settings2, Clock, BookOpen, Shield];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <Breadcrumbs items={[]} />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Calculate Your{" "}
            <span className="text-primary">High School GPA</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-left">
            Free GPA calculator that supports weighted, unweighted, UC&apos;s and other college GPA
            systems. Target any US college and see your GPA calculated their way. Customize the boost values to match your school&apos;s exact system.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/gpa-calculator">
                Calculate Your GPA
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* GPA Types */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            GPA Systems We Support
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {GPA_TYPE_INFO.map((info) => (
              <Link key={info.title} href={info.href} className="block">
                <Card className="text-center cursor-pointer transition-colors hover:bg-muted/80 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
            <Link href="/gpa-calculator" className="block">
              <Card className="text-center cursor-pointer transition-colors hover:bg-muted/80 h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Custom GPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get the GPA for any college in US. We automatically fetch the
                    grading criterion for all the top colleges. Define the weights
                    and boosts and compute any custom GPA for any college worldwide.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Everything You Need
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FEATURES.map((feature, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={feature.title} className="flex gap-3">
                  <div className="shrink-0 mt-1">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <FAQSection faqs={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Calculate Your GPA?
          </h2>
          <p className="text-muted-foreground mb-8">
            It takes less than a minute. No sign-up required.
          </p>
          <Button asChild size="lg">
            <Link href="/gpa-calculator">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* JSON-LD structured data — WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "GPA Calculator",
            url: "https://thegpacalculator.net",
            description:
              "Free GPA calculator for high school students. Calculate weighted, unweighted, and UC GPA.",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </div>
  );
}
