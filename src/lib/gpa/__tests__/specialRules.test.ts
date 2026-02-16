import { describe, it, expect } from "vitest";
import {
  calculateUCCapped,
  calculateUCUncapped,
  calculateUCUnweighted,
} from "@/lib/gpa/specialRules";
import { UC_SCALE } from "@/lib/gpa/gradeScales";
import { UC_HONORS_BOOST, UNWEIGHTED_BOOST } from "@/lib/gpa/boostSystems";
import type { Course, GPAProfile } from "@/lib/gpa/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCourse(overrides: Partial<Course> = {}): Course {
  return {
    id: overrides.id ?? "c1",
    name: overrides.name ?? "Course",
    grade: overrides.grade ?? "A",
    courseType: overrides.courseType ?? "Regular",
    credits: overrides.credits ?? 1,
    semesterId: overrides.semesterId ?? "s1",
    gradeLevel: overrides.gradeLevel ?? "11",
    isAG: overrides.isAG ?? true,
  };
}

const UC_WEIGHTED_PROFILE: GPAProfile = {
  id: "uc-capped",
  name: "UC Capped Weighted",
  shortName: "UC-CW",
  description: "UC capped weighted GPA",
  gradeScale: UC_SCALE,
  boostSystem: UC_HONORS_BOOST,
  maxGPA: 5.0,
  allowsPlusMinus: false,
};

const UC_UNCAPPED_PROFILE: GPAProfile = {
  id: "uc-uncapped",
  name: "UC Uncapped Weighted",
  shortName: "UC-UW",
  description: "UC uncapped weighted GPA",
  gradeScale: UC_SCALE,
  boostSystem: UC_HONORS_BOOST,
  maxGPA: 5.0,
  allowsPlusMinus: false,
};

const UC_UNWEIGHTED_PROFILE: GPAProfile = {
  id: "uc-unweighted",
  name: "UC Unweighted",
  shortName: "UC-U",
  description: "UC unweighted GPA",
  gradeScale: UC_SCALE,
  boostSystem: UNWEIGHTED_BOOST,
  maxGPA: 4.0,
  allowsPlusMinus: false,
};

// ---------------------------------------------------------------------------
// Grade level filtering (10th & 11th only)
// ---------------------------------------------------------------------------

describe("UC grade level filtering", () => {
  it("includes 10th grade courses", () => {
    const courses = [makeCourse({ gradeLevel: "10" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    expect(result.breakdown.filter((b) => !b.excluded)).toHaveLength(1);
    expect(result.gpa).toBe(4.0);
  });

  it("includes 11th grade courses", () => {
    const courses = [makeCourse({ gradeLevel: "11" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    expect(result.breakdown.filter((b) => !b.excluded)).toHaveLength(1);
  });

  it("excludes 9th grade courses", () => {
    const courses = [makeCourse({ gradeLevel: "9" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    const included = result.breakdown.filter((b) => !b.excluded);
    expect(included).toHaveLength(0);
    expect(result.gpa).toBe(0);
  });

  it("excludes 12th grade courses", () => {
    const courses = [makeCourse({ gradeLevel: "12" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    const included = result.breakdown.filter((b) => !b.excluded);
    expect(included).toHaveLength(0);
  });

  it("excludes courses with no gradeLevel set", () => {
    // Must explicitly set gradeLevel on the Course object (bypass makeCourse default)
    const course: Course = {
      id: "c1",
      name: "Course",
      grade: "A",
      courseType: "Regular",
      credits: 1,
      semesterId: "s1",
      isAG: true,
    };
    const result = calculateUCUnweighted([course], UC_UNWEIGHTED_PROFILE);
    const included = result.breakdown.filter((b) => !b.excluded);
    expect(included).toHaveLength(0);
  });

  it("mixes eligible and ineligible grade levels correctly", () => {
    const courses = [
      makeCourse({ id: "c1", gradeLevel: "9", grade: "A" }),
      makeCourse({ id: "c2", gradeLevel: "10", grade: "B" }),
      makeCourse({ id: "c3", gradeLevel: "11", grade: "C" }),
      makeCourse({ id: "c4", gradeLevel: "12", grade: "A" }),
    ];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    const included = result.breakdown.filter((b) => !b.excluded);
    const excluded = result.breakdown.filter((b) => b.excluded);
    expect(included).toHaveLength(2); // 10th and 11th
    expect(excluded).toHaveLength(2); // 9th and 12th
    // (3.0 + 2.0) / 2 = 2.5
    expect(result.gpa).toBe(2.5);
  });

  it("excluded courses have correct excludeReason about grade levels", () => {
    const courses = [makeCourse({ gradeLevel: "9" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    const excluded = result.breakdown.find((b) => b.excluded);
    expect(excluded?.excludeReason).toContain("10th & 11th grade");
  });
});

// ---------------------------------------------------------------------------
// A-G course filtering
// ---------------------------------------------------------------------------

describe("UC A-G filtering", () => {
  it("excludes courses explicitly marked as not A-G (isAG === false)", () => {
    const courses = [makeCourse({ isAG: false, gradeLevel: "11" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    const excluded = result.breakdown.filter((b) => b.excluded);
    expect(excluded).toHaveLength(1);
    expect(excluded[0].excludeReason).toContain("A-G");
  });

  it("includes courses with isAG === true", () => {
    const courses = [makeCourse({ isAG: true, gradeLevel: "11" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    expect(result.breakdown.filter((b) => !b.excluded)).toHaveLength(1);
  });

  it("includes courses with isAG === undefined (default)", () => {
    const courses = [makeCourse({ isAG: undefined, gradeLevel: "11" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    expect(result.breakdown.filter((b) => !b.excluded)).toHaveLength(1);
  });

  it("A-G exclusion takes priority: isAG=false + gradeLevel=11 still excluded", () => {
    const courses = [makeCourse({ isAG: false, gradeLevel: "11" })];
    const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
    expect(result.breakdown[0].excluded).toBe(true);
    expect(result.breakdown[0].excludeReason).toContain("A-G");
  });
});

// ---------------------------------------------------------------------------
// skipGradeFilter flag
// ---------------------------------------------------------------------------

describe("skipGradeFilter", () => {
  it("includes grade-ineligible courses when skipGradeFilter=true", () => {
    const courses = [makeCourse({ gradeLevel: "9", grade: "A" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE, true);
    const included = result.breakdown.filter((b) => !b.excluded);
    expect(included).toHaveLength(1);
    expect(result.gpa).toBe(4.0);
  });

  it("sets notCountedByUC flag when grade-ineligible courses exist and skipGradeFilter=true", () => {
    const courses = [makeCourse({ gradeLevel: "9" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE, true);
    expect(result.notCountedByUC).toBe(true);
  });

  it("does not set notCountedByUC when all courses are grade-eligible", () => {
    const courses = [makeCourse({ gradeLevel: "11" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE, true);
    expect(result.notCountedByUC).toBeUndefined();
  });

  it("still excludes isAG=false courses even with skipGradeFilter=true", () => {
    const courses = [makeCourse({ isAG: false, gradeLevel: "9" })];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE, true);
    expect(result.breakdown[0].excluded).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// calculateUCUnweighted
// ---------------------------------------------------------------------------

describe("calculateUCUnweighted", () => {
  it("gives no boost to any course type", () => {
    const courses = [
      makeCourse({ id: "c1", grade: "A", courseType: "AP", gradeLevel: "11" }),
      makeCourse({ id: "c2", grade: "A", courseType: "Honors", gradeLevel: "11" }),
      makeCourse({ id: "c3", grade: "A", courseType: "Regular", gradeLevel: "11" }),
    ];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    // All should be 4.0, no boosts
    expect(result.gpa).toBe(4.0);
    for (const b of result.breakdown.filter((x) => !x.excluded)) {
      expect(b.boost).toBe(0);
    }
  });

  it("uses UC scale (no plus/minus)", () => {
    const courses = [
      makeCourse({ id: "c1", grade: "A-", gradeLevel: "11" }),
      makeCourse({ id: "c2", grade: "B+", gradeLevel: "11" }),
    ];
    const result = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    // UC: A- = 4.0, B+ = 3.0 => (4+3)/2 = 3.5
    expect(result.gpa).toBe(3.5);
  });

  it("empty eligible courses returns 0", () => {
    const result = calculateUCUnweighted([], UC_UNWEIGHTED_PROFILE);
    expect(result.gpa).toBe(0);
    expect(result.totalCredits).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// calculateUCUncapped
// ---------------------------------------------------------------------------

describe("calculateUCUncapped", () => {
  it("gives boost to eligible honor courses with no semester cap", () => {
    // 10 AP courses in 11th grade, all should get boost
    const courses = Array.from({ length: 10 }, (_, i) =>
      makeCourse({
        id: `c${i}`,
        grade: "A",
        courseType: "AP",
        gradeLevel: "11",
      })
    );
    const result = calculateUCUncapped(courses, UC_UNCAPPED_PROFILE);
    // All get boost: 4.0 + 1.0 = 5.0 each
    expect(result.gpa).toBe(5.0);
    for (const b of result.breakdown.filter((x) => !x.excluded)) {
      expect(b.boost).toBe(1.0);
    }
  });

  it("does not boost Regular courses", () => {
    const courses = [
      makeCourse({ grade: "A", courseType: "Regular", gradeLevel: "11" }),
    ];
    const result = calculateUCUncapped(courses, UC_UNCAPPED_PROFILE);
    expect(result.breakdown[0].boost).toBe(0);
    expect(result.gpa).toBe(4.0);
  });

  it("does not boost IB_SL courses", () => {
    const courses = [
      makeCourse({ grade: "A", courseType: "IB_SL", gradeLevel: "11" }),
    ];
    const result = calculateUCUncapped(courses, UC_UNCAPPED_PROFILE);
    expect(result.breakdown[0].boost).toBe(0);
    expect(result.gpa).toBe(4.0);
  });

  it("boosts Honors, AP, IB_HL, and Dual Enrollment", () => {
    const types = ["Honors", "AP", "IB_HL", "Dual Enrollment"] as const;
    for (const ct of types) {
      const courses = [makeCourse({ grade: "A", courseType: ct, gradeLevel: "11" })];
      const result = calculateUCUncapped(courses, UC_UNCAPPED_PROFILE);
      expect(result.breakdown[0].boost).toBe(1.0);
    }
  });

  it("does not boost courses with grade below C (below 2.0 on UC scale)", () => {
    // D grade = 1.0 on UC scale, below 2.0 threshold
    const courses = [
      makeCourse({ grade: "D", courseType: "AP", gradeLevel: "11" }),
    ];
    const result = calculateUCUncapped(courses, UC_UNCAPPED_PROFILE);
    expect(result.breakdown[0].boost).toBe(0);
    expect(result.gpa).toBe(1.0);
  });

  it("boosts course with exactly C grade (2.0 on UC scale)", () => {
    const courses = [
      makeCourse({ grade: "C", courseType: "AP", gradeLevel: "11" }),
    ];
    const result = calculateUCUncapped(courses, UC_UNCAPPED_PROFILE);
    expect(result.breakdown[0].boost).toBe(1.0);
    expect(result.gpa).toBe(3.0); // 2.0 + 1.0
  });

  it("does not boost F grade even in AP", () => {
    const courses = [
      makeCourse({ grade: "F", courseType: "AP", gradeLevel: "11" }),
    ];
    const result = calculateUCUncapped(courses, UC_UNCAPPED_PROFILE);
    expect(result.breakdown[0].boost).toBe(0);
    expect(result.gpa).toBe(0.0);
  });
});

// ---------------------------------------------------------------------------
// calculateUCCapped
// ---------------------------------------------------------------------------

describe("calculateUCCapped", () => {
  describe("basic honors boost", () => {
    it("boosts eligible AP course in 11th grade", () => {
      const courses = [
        makeCourse({ grade: "A", courseType: "AP", gradeLevel: "11" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      expect(result.breakdown[0].boost).toBe(1.0);
      expect(result.gpa).toBe(5.0);
    });

    it("does not boost Regular courses", () => {
      const courses = [
        makeCourse({ grade: "A", courseType: "Regular", gradeLevel: "11" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      expect(result.breakdown[0].boost).toBe(0);
    });

    it("does not boost IB_SL courses", () => {
      const courses = [
        makeCourse({ grade: "A", courseType: "IB_SL", gradeLevel: "11" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      expect(result.breakdown[0].boost).toBe(0);
    });

    it("does not boost courses below C grade", () => {
      const courses = [
        makeCourse({ grade: "D", courseType: "AP", gradeLevel: "11" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      expect(result.breakdown[0].boost).toBe(0);
    });
  });

  describe("8-semester total cap", () => {
    it("boosts up to 8 honors courses", () => {
      const courses = Array.from({ length: 8 }, (_, i) =>
        makeCourse({
          id: `c${i}`,
          grade: "A",
          courseType: "AP",
          gradeLevel: "11",
        })
      );
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      const boosted = result.breakdown.filter((b) => b.boost > 0);
      expect(boosted).toHaveLength(8);
    });

    it("caps at 8 even with more eligible courses", () => {
      const courses = Array.from({ length: 12 }, (_, i) =>
        makeCourse({
          id: `c${i}`,
          grade: "A",
          courseType: "AP",
          gradeLevel: "11",
        })
      );
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      const boosted = result.breakdown.filter((b) => b.boost > 0);
      expect(boosted).toHaveLength(8);
    });

    it("non-boosted courses still count toward GPA (just without boost)", () => {
      const courses = Array.from({ length: 10 }, (_, i) =>
        makeCourse({
          id: `c${i}`,
          grade: "A",
          courseType: "AP",
          gradeLevel: "11",
        })
      );
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      // 8 boosted: 5.0 each, 2 unboosted: 4.0 each
      // (8*5 + 2*4) / 10 = 48/10 = 4.8
      expect(result.gpa).toBe(4.8);
      expect(result.totalCredits).toBe(10);
    });
  });

  describe("max 4 semesters from 10th grade", () => {
    it("allows up to 4 boosts from 10th grade", () => {
      const courses = Array.from({ length: 4 }, (_, i) =>
        makeCourse({
          id: `c${i}`,
          grade: "A",
          courseType: "AP",
          gradeLevel: "10",
        })
      );
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      const boosted = result.breakdown.filter((b) => b.boost > 0);
      expect(boosted).toHaveLength(4);
    });

    it("caps 10th grade boosts at 4 even with more courses", () => {
      const courses = Array.from({ length: 6 }, (_, i) =>
        makeCourse({
          id: `c${i}`,
          grade: "A",
          courseType: "AP",
          gradeLevel: "10",
        })
      );
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      const boosted = result.breakdown.filter((b) => b.boost > 0);
      expect(boosted).toHaveLength(4);
    });

    it("remaining cap slots go to 11th grade after 10th grade fill", () => {
      const courses = [
        // 4 from 10th grade
        ...Array.from({ length: 4 }, (_, i) =>
          makeCourse({
            id: `g10-${i}`,
            grade: "A",
            courseType: "AP",
            gradeLevel: "10",
          })
        ),
        // 6 from 11th grade
        ...Array.from({ length: 6 }, (_, i) =>
          makeCourse({
            id: `g11-${i}`,
            grade: "A",
            courseType: "AP",
            gradeLevel: "11",
          })
        ),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      const boosted = result.breakdown.filter((b) => b.boost > 0);
      // 4 from 10th + 4 from 11th = 8 total
      expect(boosted).toHaveLength(8);

      const boosted10th = result.breakdown.filter(
        (b) => b.boost > 0 && b.courseId.startsWith("g10")
      );
      const boosted11th = result.breakdown.filter(
        (b) => b.boost > 0 && b.courseId.startsWith("g11")
      );
      expect(boosted10th).toHaveLength(4);
      expect(boosted11th).toHaveLength(4);
    });

    it("if fewer than 4 from 10th, remaining slots all go to 11th", () => {
      const courses = [
        // 2 from 10th grade
        ...Array.from({ length: 2 }, (_, i) =>
          makeCourse({
            id: `g10-${i}`,
            grade: "A",
            courseType: "AP",
            gradeLevel: "10",
          })
        ),
        // 10 from 11th grade
        ...Array.from({ length: 10 }, (_, i) =>
          makeCourse({
            id: `g11-${i}`,
            grade: "A",
            courseType: "AP",
            gradeLevel: "11",
          })
        ),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      const boosted = result.breakdown.filter((b) => b.boost > 0);
      // 2 from 10th + 6 from 11th = 8 total
      expect(boosted).toHaveLength(8);

      const boosted11th = result.breakdown.filter(
        (b) => b.boost > 0 && b.courseId.startsWith("g11")
      );
      expect(boosted11th).toHaveLength(6);
    });

    it("only 10th grade AP courses, more than 4, caps at 4 total boosts", () => {
      const courses = Array.from({ length: 8 }, (_, i) =>
        makeCourse({
          id: `c${i}`,
          grade: "A",
          courseType: "AP",
          gradeLevel: "10",
        })
      );
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      const boosted = result.breakdown.filter((b) => b.boost > 0);
      // Max 4 from 10th, no 11th to fill remaining 4 slots
      expect(boosted).toHaveLength(4);
    });
  });

  describe("mixed course types and grade levels", () => {
    it("Regular courses never get boost even within cap", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", courseType: "Regular", gradeLevel: "11" }),
        makeCourse({ id: "c2", grade: "A", courseType: "AP", gradeLevel: "11" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      const regularBreakdown = result.breakdown.find((b) => b.courseId === "c1");
      const apBreakdown = result.breakdown.find((b) => b.courseId === "c2");
      expect(regularBreakdown?.boost).toBe(0);
      expect(apBreakdown?.boost).toBe(1.0);
    });

    it("Honors and Dual Enrollment get boost in UC capped", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", courseType: "Honors", gradeLevel: "11" }),
        makeCourse({ id: "c2", grade: "A", courseType: "Dual Enrollment", gradeLevel: "11" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      for (const b of result.breakdown) {
        expect(b.boost).toBe(1.0);
      }
    });

    it("real-world scenario: typical student mix", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", courseType: "Regular", gradeLevel: "10" }),
        makeCourse({ id: "c2", grade: "B", courseType: "Honors", gradeLevel: "10" }),
        makeCourse({ id: "c3", grade: "A", courseType: "AP", gradeLevel: "10" }),
        makeCourse({ id: "c4", grade: "A-", courseType: "Regular", gradeLevel: "11" }),
        makeCourse({ id: "c5", grade: "B+", courseType: "AP", gradeLevel: "11" }),
        makeCourse({ id: "c6", grade: "A", courseType: "AP", gradeLevel: "11" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      // UC scale: A=4, A-=4, B=3, B+=3
      // Honors 10th B=3: boosted (3+1=4)
      // AP 10th A=4: boosted (4+1=5)
      // AP 11th B+=3: boosted (3+1=4)
      // AP 11th A=4: boosted (4+1=5)
      // Regular: no boost (4 + 4)
      // (4 + 4 + 5 + 4 + 4 + 5) / 6 = 26/6 = 4.333... -> 4.33
      expect(result.gpa).toBe(4.33);
    });
  });

  describe("excluded course breakdown", () => {
    it("excluded courses have 0 finalPoints and 0 qualityPoints", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", gradeLevel: "9" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      const excluded = result.breakdown.find((b) => b.excluded);
      expect(excluded).toBeDefined();
      expect(excluded!.finalPoints).toBe(0);
      expect(excluded!.qualityPoints).toBe(0);
      expect(excluded!.boost).toBe(0);
    });

    it("excluded courses still show basePoints from grade scale", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", gradeLevel: "9" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      const excluded = result.breakdown.find((b) => b.excluded);
      expect(excluded!.basePoints).toBe(4.0);
    });

    it("non-AG courses have correct exclude reason", () => {
      const courses = [
        makeCourse({ isAG: false, gradeLevel: "11" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      expect(result.breakdown[0].excludeReason).toBe("Not an A-G course");
    });

    it("grade-ineligible courses have correct exclude reason", () => {
      const courses = [
        makeCourse({ gradeLevel: "12" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      expect(result.breakdown[0].excludeReason).toBe(
        "Only 10th & 11th grade count for UC GPA"
      );
    });
  });

  describe("edge cases", () => {
    it("empty courses returns 0 GPA", () => {
      const result = calculateUCCapped([], UC_WEIGHTED_PROFILE);
      expect(result.gpa).toBe(0);
      expect(result.totalCredits).toBe(0);
    });

    it("all courses excluded returns 0 GPA", () => {
      const courses = [
        makeCourse({ id: "c1", gradeLevel: "9" }),
        makeCourse({ id: "c2", isAG: false, gradeLevel: "11" }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      expect(result.gpa).toBe(0);
    });

    it("all F grades with AP boost: F is below C threshold, no boost", () => {
      const courses = Array.from({ length: 5 }, (_, i) =>
        makeCourse({
          id: `c${i}`,
          grade: "F",
          courseType: "AP",
          gradeLevel: "11",
        })
      );
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      expect(result.gpa).toBe(0);
      for (const b of result.breakdown) {
        expect(b.boost).toBe(0);
      }
    });

    it("courses with varying credits weight correctly", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", courseType: "AP", gradeLevel: "11", credits: 5 }),
        makeCourse({ id: "c2", grade: "B", courseType: "Regular", gradeLevel: "11", credits: 1 }),
      ];
      const result = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
      // AP A: (4+1)*5=25, Regular B: 3*1=3 => 28/6 = 4.6666... -> 4.67
      expect(result.gpa).toBe(4.67);
    });
  });
});

// ---------------------------------------------------------------------------
// calculateUCUncapped vs calculateUCCapped comparison
// ---------------------------------------------------------------------------

describe("UC capped vs uncapped comparison", () => {
  it("uncapped GPA >= capped GPA when more than 8 honors courses", () => {
    const courses = Array.from({ length: 12 }, (_, i) =>
      makeCourse({
        id: `c${i}`,
        grade: "A",
        courseType: "AP",
        gradeLevel: "11",
      })
    );
    const capped = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
    const uncapped = calculateUCUncapped(courses, UC_UNCAPPED_PROFILE);
    expect(uncapped.gpa).toBeGreaterThanOrEqual(capped.gpa);
  });

  it("capped and uncapped are equal when 8 or fewer honors courses", () => {
    const courses = Array.from({ length: 6 }, (_, i) =>
      makeCourse({
        id: `c${i}`,
        grade: "A",
        courseType: "AP",
        gradeLevel: "11",
      })
    );
    const capped = calculateUCCapped(courses, UC_WEIGHTED_PROFILE);
    const uncapped = calculateUCUncapped(courses, UC_UNCAPPED_PROFILE);
    expect(capped.gpa).toBe(uncapped.gpa);
  });

  it("unweighted is always <= weighted for courses with boosts", () => {
    const courses = [
      makeCourse({ id: "c1", grade: "A", courseType: "AP", gradeLevel: "11" }),
      makeCourse({ id: "c2", grade: "B", courseType: "Honors", gradeLevel: "11" }),
    ];
    const unweighted = calculateUCUnweighted(courses, UC_UNWEIGHTED_PROFILE);
    const uncapped = calculateUCUncapped(courses, UC_UNCAPPED_PROFILE);
    expect(unweighted.gpa).toBeLessThanOrEqual(uncapped.gpa);
  });
});

// ---------------------------------------------------------------------------
// skipGradeFilter across all UC calculation types
// ---------------------------------------------------------------------------

describe("skipGradeFilter across UC calculations", () => {
  const ninth = [
    makeCourse({ id: "c1", grade: "A", courseType: "AP", gradeLevel: "9" }),
  ];

  it("calculateUCCapped includes 9th grader with skipGradeFilter=true", () => {
    const result = calculateUCCapped(ninth, UC_WEIGHTED_PROFILE, true);
    expect(result.breakdown.filter((b) => !b.excluded)).toHaveLength(1);
    expect(result.notCountedByUC).toBe(true);
  });

  it("calculateUCUncapped includes 9th grader with skipGradeFilter=true", () => {
    const result = calculateUCUncapped(ninth, UC_UNCAPPED_PROFILE, true);
    expect(result.breakdown.filter((b) => !b.excluded)).toHaveLength(1);
    expect(result.notCountedByUC).toBe(true);
  });

  it("calculateUCUnweighted includes 9th grader with skipGradeFilter=true", () => {
    const result = calculateUCUnweighted(ninth, UC_UNWEIGHTED_PROFILE, true);
    expect(result.breakdown.filter((b) => !b.excluded)).toHaveLength(1);
    expect(result.notCountedByUC).toBe(true);
  });
});
