import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FAQSection } from "../FAQSection";

const sampleFaqs = [
  { question: "What is GPA?", answer: "Grade Point Average." },
  { question: "How is GPA calculated?", answer: "Sum of grade points divided by credits." },
  { question: "What is a 4.0 GPA?", answer: "A perfect unweighted GPA." },
];

describe("FAQSection", () => {
  it("renders the default heading", () => {
    render(<FAQSection faqs={sampleFaqs} />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("renders a custom heading when provided", () => {
    render(<FAQSection faqs={sampleFaqs} heading="Common Questions" />);
    expect(screen.getByText("Common Questions")).toBeInTheDocument();
    expect(screen.queryByText("Frequently Asked Questions")).not.toBeInTheDocument();
  });

  it("renders all FAQ questions", () => {
    render(<FAQSection faqs={sampleFaqs} />);
    for (const faq of sampleFaqs) {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    }
  });

  it("renders all FAQ answers", () => {
    render(<FAQSection faqs={sampleFaqs} />);
    for (const faq of sampleFaqs) {
      expect(screen.getByText(faq.answer)).toBeInTheDocument();
    }
  });

  it("generates FAQPage JSON-LD schema", () => {
    const { container } = render(<FAQSection faqs={sampleFaqs} />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();

    const schema = JSON.parse(script!.textContent!);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(3);

    expect(schema.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "What is GPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grade Point Average.",
      },
    });
  });

  it("handles an empty FAQ array", () => {
    const { container } = render(<FAQSection faqs={[]} />);

    // Heading should still render
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();

    // JSON-LD should have empty mainEntity
    const script = container.querySelector('script[type="application/ld+json"]');
    const schema = JSON.parse(script!.textContent!);
    expect(schema.mainEntity).toHaveLength(0);
  });
});
