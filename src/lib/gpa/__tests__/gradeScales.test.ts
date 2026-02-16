import { describe, it, expect } from "vitest";
import { STANDARD_SCALE, UC_SCALE } from "@/lib/gpa/gradeScales";
import type { GradeLetter } from "@/lib/gpa/types";
import { GRADE_OPTIONS } from "@/lib/gpa/types";

describe("STANDARD_SCALE", () => {
  describe("A grades", () => {
    it("A+ maps to 4.0", () => {
      expect(STANDARD_SCALE["A+"]).toBe(4.0);
    });

    it("A maps to 4.0", () => {
      expect(STANDARD_SCALE["A"]).toBe(4.0);
    });

    it("A- maps to 3.7", () => {
      expect(STANDARD_SCALE["A-"]).toBe(3.7);
    });

    it("A+ and A are equal (both 4.0, no extra credit for plus)", () => {
      expect(STANDARD_SCALE["A+"]).toBe(STANDARD_SCALE["A"]);
    });

    it("A- is less than A", () => {
      expect(STANDARD_SCALE["A-"]).toBeLessThan(STANDARD_SCALE["A"]);
    });
  });

  describe("B grades", () => {
    it("B+ maps to 3.3", () => {
      expect(STANDARD_SCALE["B+"]).toBe(3.3);
    });

    it("B maps to 3.0", () => {
      expect(STANDARD_SCALE["B"]).toBe(3.0);
    });

    it("B- maps to 2.7", () => {
      expect(STANDARD_SCALE["B-"]).toBe(2.7);
    });
  });

  describe("C grades", () => {
    it("C+ maps to 2.3", () => {
      expect(STANDARD_SCALE["C+"]).toBe(2.3);
    });

    it("C maps to 2.0", () => {
      expect(STANDARD_SCALE["C"]).toBe(2.0);
    });

    it("C- maps to 1.7", () => {
      expect(STANDARD_SCALE["C-"]).toBe(1.7);
    });
  });

  describe("D grades", () => {
    it("D+ maps to 1.3", () => {
      expect(STANDARD_SCALE["D+"]).toBe(1.3);
    });

    it("D maps to 1.0", () => {
      expect(STANDARD_SCALE["D"]).toBe(1.0);
    });

    it("D- maps to 0.7", () => {
      expect(STANDARD_SCALE["D-"]).toBe(0.7);
    });
  });

  describe("F grade", () => {
    it("F maps to 0.0", () => {
      expect(STANDARD_SCALE["F"]).toBe(0.0);
    });

    it("F is the lowest possible grade", () => {
      for (const grade of GRADE_OPTIONS) {
        expect(STANDARD_SCALE[grade]).toBeGreaterThanOrEqual(STANDARD_SCALE["F"]);
      }
    });
  });

  describe("general properties", () => {
    it("has all 13 grade letters", () => {
      expect(Object.keys(STANDARD_SCALE)).toHaveLength(13);
    });

    it("covers every GradeLetter from GRADE_OPTIONS", () => {
      for (const grade of GRADE_OPTIONS) {
        expect(STANDARD_SCALE[grade]).toBeDefined();
      }
    });

    it("all values are between 0.0 and 4.0", () => {
      for (const grade of GRADE_OPTIONS) {
        expect(STANDARD_SCALE[grade]).toBeGreaterThanOrEqual(0.0);
        expect(STANDARD_SCALE[grade]).toBeLessThanOrEqual(4.0);
      }
    });

    it("grades are in descending order A+ > A- > B+ > B > B- > ... > F", () => {
      const ordered: GradeLetter[] = [
        "A+", "A", "A-",
        "B+", "B", "B-",
        "C+", "C", "C-",
        "D+", "D", "D-",
        "F",
      ];
      for (let i = 0; i < ordered.length - 1; i++) {
        expect(STANDARD_SCALE[ordered[i]]).toBeGreaterThanOrEqual(
          STANDARD_SCALE[ordered[i + 1]]
        );
      }
    });

    it("plus variants are worth 0.3 more than base (except A+)", () => {
      const pairs: [GradeLetter, GradeLetter][] = [
        ["B+", "B"],
        ["C+", "C"],
        ["D+", "D"],
      ];
      for (const [plus, base] of pairs) {
        expect(STANDARD_SCALE[plus] - STANDARD_SCALE[base]).toBeCloseTo(0.3);
      }
    });

    it("minus variants are worth 0.3 less than base", () => {
      const pairs: [GradeLetter, GradeLetter][] = [
        ["A", "A-"],
        ["B", "B-"],
        ["C", "C-"],
        ["D", "D-"],
      ];
      for (const [base, minus] of pairs) {
        expect(STANDARD_SCALE[base] - STANDARD_SCALE[minus]).toBeCloseTo(0.3);
      }
    });
  });
});

describe("UC_SCALE", () => {
  describe("no plus/minus distinction", () => {
    it("A+, A, A- all map to 4.0", () => {
      expect(UC_SCALE["A+"]).toBe(4.0);
      expect(UC_SCALE["A"]).toBe(4.0);
      expect(UC_SCALE["A-"]).toBe(4.0);
    });

    it("B+, B, B- all map to 3.0", () => {
      expect(UC_SCALE["B+"]).toBe(3.0);
      expect(UC_SCALE["B"]).toBe(3.0);
      expect(UC_SCALE["B-"]).toBe(3.0);
    });

    it("C+, C, C- all map to 2.0", () => {
      expect(UC_SCALE["C+"]).toBe(2.0);
      expect(UC_SCALE["C"]).toBe(2.0);
      expect(UC_SCALE["C-"]).toBe(2.0);
    });

    it("D+, D, D- all map to 1.0", () => {
      expect(UC_SCALE["D+"]).toBe(1.0);
      expect(UC_SCALE["D"]).toBe(1.0);
      expect(UC_SCALE["D-"]).toBe(1.0);
    });
  });

  describe("F grade", () => {
    it("F maps to 0.0", () => {
      expect(UC_SCALE["F"]).toBe(0.0);
    });
  });

  describe("general properties", () => {
    it("has all 13 grade letters", () => {
      expect(Object.keys(UC_SCALE)).toHaveLength(13);
    });

    it("covers every GradeLetter from GRADE_OPTIONS", () => {
      for (const grade of GRADE_OPTIONS) {
        expect(UC_SCALE[grade]).toBeDefined();
      }
    });

    it("all values are whole numbers (no decimals like 3.3 or 3.7)", () => {
      for (const grade of GRADE_OPTIONS) {
        expect(UC_SCALE[grade] % 1).toBe(0);
      }
    });

    it("only uses values 0, 1, 2, 3, 4", () => {
      const validValues = new Set([0, 1, 2, 3, 4]);
      for (const grade of GRADE_OPTIONS) {
        expect(validValues.has(UC_SCALE[grade])).toBe(true);
      }
    });
  });

  describe("comparison with STANDARD_SCALE", () => {
    it("UC A- is higher than Standard A- (4.0 vs 3.7)", () => {
      expect(UC_SCALE["A-"]).toBeGreaterThan(STANDARD_SCALE["A-"]);
    });

    it("UC B+ is lower than Standard B+ (3.0 vs 3.3)", () => {
      expect(UC_SCALE["B+"]).toBeLessThan(STANDARD_SCALE["B+"]);
    });

    it("UC B- is higher than Standard B- (3.0 vs 2.7)", () => {
      expect(UC_SCALE["B-"]).toBeGreaterThan(STANDARD_SCALE["B-"]);
    });

    it("both scales agree on A, B, C, D, F base grades", () => {
      const baseGrades: GradeLetter[] = ["A", "B", "C", "D", "F"];
      for (const grade of baseGrades) {
        expect(UC_SCALE[grade]).toBe(STANDARD_SCALE[grade]);
      }
    });
  });
});
