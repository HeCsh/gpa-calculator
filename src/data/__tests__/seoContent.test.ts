import { describe, it, expect } from "vitest";
import {
  ACADEMIC_YEAR,
  LAST_UPDATED,
  BASE_URL,
  GPA_TYPE_INFO,
  FEATURES,
  FAQS,
  UC_FAQS,
  WEIGHTED_FAQS,
  AP_FAQS,
  HOW_IT_WORKS_FAQS,
  GOOD_GPA_FAQS,
  GPA_SCALE_FAQS,
  COLLEGE_REQUIREMENTS_FAQS,
} from "@/data/seoContent";

describe("SEO constants", () => {
  it("should have a valid ACADEMIC_YEAR string", () => {
    expect(typeof ACADEMIC_YEAR).toBe("string");
    expect(ACADEMIC_YEAR.length).toBeGreaterThan(0);
    // Should match a pattern like "2025-2026"
    expect(ACADEMIC_YEAR).toMatch(/^\d{4}-\d{4}$/);
  });

  it("should have a valid LAST_UPDATED string", () => {
    expect(typeof LAST_UPDATED).toBe("string");
    expect(LAST_UPDATED.length).toBeGreaterThan(0);
  });

  it("should have a valid BASE_URL", () => {
    expect(typeof BASE_URL).toBe("string");
    expect(BASE_URL).toMatch(/^https?:\/\//);
  });
});

describe("GPA_TYPE_INFO", () => {
  it("should be a non-empty array", () => {
    expect(GPA_TYPE_INFO.length).toBeGreaterThan(0);
  });

  it("should have required fields on every entry", () => {
    for (const info of GPA_TYPE_INFO) {
      expect(info).toHaveProperty("title");
      expect(info).toHaveProperty("description");
      expect(info).toHaveProperty("icon");
      expect(info).toHaveProperty("href");

      expect(typeof info.title).toBe("string");
      expect(info.title.length).toBeGreaterThan(0);

      expect(typeof info.description).toBe("string");
      expect(info.description.length).toBeGreaterThan(0);

      expect(typeof info.icon).toBe("string");

      expect(typeof info.href).toBe("string");
      expect(info.href).toMatch(/^\//); // Should start with /
    }
  });

  it("should have entries for unweighted, weighted, and UC GPA types", () => {
    const titles = GPA_TYPE_INFO.map((i) => i.title.toLowerCase());
    expect(titles.some((t) => t.includes("unweighted"))).toBe(true);
    expect(titles.some((t) => t.includes("weighted"))).toBe(true);
    expect(titles.some((t) => t.includes("uc"))).toBe(true);
  });

  it("should have valid icon values", () => {
    const validIcons = ["scale", "trophy", "graduation"];
    for (const info of GPA_TYPE_INFO) {
      expect(validIcons).toContain(info.icon);
    }
  });
});

describe("FEATURES", () => {
  it("should be a non-empty array", () => {
    expect(FEATURES.length).toBeGreaterThan(0);
  });

  it("should have title and description on every entry", () => {
    for (const feature of FEATURES) {
      expect(typeof feature.title).toBe("string");
      expect(feature.title.length).toBeGreaterThan(0);

      expect(typeof feature.description).toBe("string");
      expect(feature.description.length).toBeGreaterThan(0);
    }
  });

  it("should have unique titles", () => {
    const titles = FEATURES.map((f) => f.title);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });
});

function describeFAQArray(name: string, faqs: { question: string; answer: string }[]) {
  describe(name, () => {
    it("should be a non-empty array", () => {
      expect(faqs.length).toBeGreaterThan(0);
    });

    it("should have question and answer on every entry", () => {
      for (const faq of faqs) {
        expect(faq).toHaveProperty("question");
        expect(faq).toHaveProperty("answer");

        expect(typeof faq.question).toBe("string");
        expect(faq.question.length).toBeGreaterThan(0);

        expect(typeof faq.answer).toBe("string");
        expect(faq.answer.length).toBeGreaterThan(0);
      }
    });

    it("should have questions ending with a question mark", () => {
      for (const faq of faqs) {
        expect(faq.question.trim()).toMatch(/\?$/);
      }
    });

    it("should have unique questions", () => {
      const questions = faqs.map((f) => f.question);
      const uniqueQuestions = new Set(questions);
      expect(uniqueQuestions.size).toBe(questions.length);
    });

    it("should have answers with at least 20 characters", () => {
      for (const faq of faqs) {
        expect(faq.answer.length).toBeGreaterThanOrEqual(20);
      }
    });
  });
}

describeFAQArray("FAQS", FAQS);
describeFAQArray("UC_FAQS", UC_FAQS);
describeFAQArray("WEIGHTED_FAQS", WEIGHTED_FAQS);
describeFAQArray("AP_FAQS", AP_FAQS);
describeFAQArray("HOW_IT_WORKS_FAQS", HOW_IT_WORKS_FAQS);
describeFAQArray("GOOD_GPA_FAQS", GOOD_GPA_FAQS);
describeFAQArray("GPA_SCALE_FAQS", GPA_SCALE_FAQS);
describeFAQArray("COLLEGE_REQUIREMENTS_FAQS", COLLEGE_REQUIREMENTS_FAQS);
