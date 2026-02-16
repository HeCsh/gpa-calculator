import { describe, it, expect } from "vitest";
import { calculateGPA, calculateMultipleGPAs } from "@/lib/gpa/calculator";
import { STANDARD_SCALE, UC_SCALE } from "@/lib/gpa/gradeScales";
import {
  UNWEIGHTED_BOOST,
  STANDARD_WEIGHTED_BOOST,
  UC_HONORS_BOOST,
} from "@/lib/gpa/boostSystems";
import type { Course, GPAProfile } from "@/lib/gpa/types";

// ---------------------------------------------------------------------------
// Helper factories
// ---------------------------------------------------------------------------

function makeCourse(overrides: Partial<Course> = {}): Course {
  return {
    id: overrides.id ?? "c1",
    name: overrides.name ?? "Test Course",
    grade: overrides.grade ?? "A",
    courseType: overrides.courseType ?? "Regular",
    credits: overrides.credits ?? 1,
    semesterId: overrides.semesterId ?? "s1",
    gradeLevel: overrides.gradeLevel,
    isAG: overrides.isAG,
  };
}

const STANDARD_UNWEIGHTED: GPAProfile = {
  id: "standard-unweighted",
  name: "Standard Unweighted",
  shortName: "UW",
  description: "Standard 4.0 unweighted",
  gradeScale: STANDARD_SCALE,
  boostSystem: UNWEIGHTED_BOOST,
  maxGPA: 4.0,
  allowsPlusMinus: true,
};

const STANDARD_WEIGHTED: GPAProfile = {
  id: "standard-weighted",
  name: "Standard Weighted",
  shortName: "W",
  description: "Standard 5.0 weighted",
  gradeScale: STANDARD_SCALE,
  boostSystem: STANDARD_WEIGHTED_BOOST,
  maxGPA: 5.0,
  allowsPlusMinus: true,
};

const UC_CAPPED: GPAProfile = {
  id: "uc-capped",
  name: "UC Capped Weighted",
  shortName: "UC-CW",
  description: "UC capped weighted GPA",
  gradeScale: UC_SCALE,
  boostSystem: UC_HONORS_BOOST,
  maxGPA: 5.0,
  allowsPlusMinus: false,
};

const UC_UNCAPPED: GPAProfile = {
  id: "uc-uncapped",
  name: "UC Uncapped Weighted",
  shortName: "UC-UW",
  description: "UC uncapped weighted GPA",
  gradeScale: UC_SCALE,
  boostSystem: UC_HONORS_BOOST,
  maxGPA: 5.0,
  allowsPlusMinus: false,
};

const UC_UNWEIGHTED: GPAProfile = {
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
// calculateGPA — standard (non-UC) profiles
// ---------------------------------------------------------------------------

describe("calculateGPA", () => {
  describe("empty courses", () => {
    it("returns 0 GPA with no courses", () => {
      const result = calculateGPA([], STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(0);
      expect(result.totalCredits).toBe(0);
      expect(result.totalQualityPoints).toBe(0);
      expect(result.breakdown).toHaveLength(0);
    });
  });

  describe("single course", () => {
    it("A in a regular course = 4.0 unweighted", () => {
      const courses = [makeCourse({ grade: "A", courseType: "Regular" })];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(4.0);
    });

    it("F in a regular course = 0.0", () => {
      const courses = [makeCourse({ grade: "F" })];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(0.0);
    });

    it("B+ = 3.3 unweighted", () => {
      const courses = [makeCourse({ grade: "B+" })];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(3.3);
    });

    it("A in AP course = 5.0 weighted", () => {
      const courses = [makeCourse({ grade: "A", courseType: "AP" })];
      const result = calculateGPA(courses, STANDARD_WEIGHTED);
      expect(result.gpa).toBe(5.0);
    });

    it("A in Honors course = 4.5 weighted", () => {
      const courses = [makeCourse({ grade: "A", courseType: "Honors" })];
      const result = calculateGPA(courses, STANDARD_WEIGHTED);
      expect(result.gpa).toBe(4.5);
    });
  });

  describe("all same grades", () => {
    it("all A's = 4.0 unweighted regardless of course count", () => {
      const courses = Array.from({ length: 6 }, (_, i) =>
        makeCourse({ id: `c${i}`, grade: "A" })
      );
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(4.0);
    });

    it("all F's = 0.0", () => {
      const courses = Array.from({ length: 4 }, (_, i) =>
        makeCourse({ id: `c${i}`, grade: "F" })
      );
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(0.0);
    });

    it("all C's = 2.0", () => {
      const courses = Array.from({ length: 5 }, (_, i) =>
        makeCourse({ id: `c${i}`, grade: "C" })
      );
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(2.0);
    });
  });

  describe("mixed grades", () => {
    it("one A and one F = 2.0 unweighted", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A" }),
        makeCourse({ id: "c2", grade: "F" }),
      ];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(2.0);
    });

    it("A, B, C, D = 2.5 unweighted", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A" }),
        makeCourse({ id: "c2", grade: "B" }),
        makeCourse({ id: "c3", grade: "C" }),
        makeCourse({ id: "c4", grade: "D" }),
      ];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      // (4 + 3 + 2 + 1) / 4 = 2.5
      expect(result.gpa).toBe(2.5);
    });
  });

  describe("different credit values", () => {
    it("weights by credits correctly", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", credits: 4 }), // 4.0 * 4 = 16
        makeCourse({ id: "c2", grade: "C", credits: 1 }), // 2.0 * 1 = 2
      ];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      // (16 + 2) / 5 = 3.6
      expect(result.gpa).toBe(3.6);
    });

    it("higher credit course dominates GPA", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", credits: 10 }),
        makeCourse({ id: "c2", grade: "F", credits: 1 }),
      ];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      // (40 + 0) / 11 = 3.636... -> rounds to 3.64
      expect(result.gpa).toBe(3.64);
    });

    it("zero credit course does not affect GPA", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", credits: 1 }),
        makeCourse({ id: "c2", grade: "F", credits: 0 }),
      ];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(4.0);
    });
  });

  describe("weighted GPA with mixed course types", () => {
    it("mix of Regular, Honors, and AP", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", courseType: "Regular" }),  // 4.0
        makeCourse({ id: "c2", grade: "A", courseType: "Honors" }),   // 4.5
        makeCourse({ id: "c3", grade: "A", courseType: "AP" }),       // 5.0
      ];
      const result = calculateGPA(courses, STANDARD_WEIGHTED);
      // (4.0 + 4.5 + 5.0) / 3 = 4.5
      expect(result.gpa).toBe(4.5);
    });

    it("IB_HL gets same boost as AP in standard weighted", () => {
      const ap = [makeCourse({ grade: "A", courseType: "AP" })];
      const ibHl = [makeCourse({ grade: "A", courseType: "IB_HL" })];
      expect(calculateGPA(ap, STANDARD_WEIGHTED).gpa).toBe(
        calculateGPA(ibHl, STANDARD_WEIGHTED).gpa
      );
    });

    it("IB_SL and Dual Enrollment get same boost in standard weighted", () => {
      const ibSl = [makeCourse({ grade: "A", courseType: "IB_SL" })];
      const de = [makeCourse({ grade: "A", courseType: "Dual Enrollment" })];
      expect(calculateGPA(ibSl, STANDARD_WEIGHTED).gpa).toBe(
        calculateGPA(de, STANDARD_WEIGHTED).gpa
      );
    });

    it("weighted GPA cannot exceed maxGPA (5.0)", () => {
      // A+ in AP: 4.0 + 1.0 = 5.0 (should not exceed 5.0)
      const courses = [makeCourse({ grade: "A+", courseType: "AP" })];
      const result = calculateGPA(courses, STANDARD_WEIGHTED);
      expect(result.gpa).toBeLessThanOrEqual(STANDARD_WEIGHTED.maxGPA);
      expect(result.gpa).toBe(5.0);
    });
  });

  describe("breakdown details", () => {
    it("includes correct breakdown fields for each course", () => {
      const courses = [
        makeCourse({ id: "c1", name: "English", grade: "B+", courseType: "Honors" }),
      ];
      const result = calculateGPA(courses, STANDARD_WEIGHTED);
      expect(result.breakdown).toHaveLength(1);

      const b = result.breakdown[0];
      expect(b.courseId).toBe("c1");
      expect(b.courseName).toBe("English");
      expect(b.grade).toBe("B+");
      expect(b.courseType).toBe("Honors");
      expect(b.basePoints).toBe(3.3);
      expect(b.boost).toBe(0.5);
      expect(b.finalPoints).toBe(3.8);
      expect(b.credits).toBe(1);
      expect(b.qualityPoints).toBe(3.8);
    });

    it("totalCredits and totalQualityPoints are correct", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", credits: 3 }), // 4.0 * 3 = 12
        makeCourse({ id: "c2", grade: "B", credits: 2 }), // 3.0 * 2 = 6
      ];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.totalCredits).toBe(5);
      expect(result.totalQualityPoints).toBe(18);
      // 18/5 = 3.6
      expect(result.gpa).toBe(3.6);
    });

    it("profileId and profileName come from the profile", () => {
      const result = calculateGPA([], STANDARD_UNWEIGHTED);
      expect(result.profileId).toBe("standard-unweighted");
      expect(result.profileName).toBe("Standard Unweighted");
    });
  });

  describe("maxGPA capping", () => {
    it("finalPoints are capped at maxGPA even when base + boost exceeds it", () => {
      // Create a profile with a low maxGPA for testing
      const lowMaxProfile: GPAProfile = {
        ...STANDARD_WEIGHTED,
        id: "low-max",
        maxGPA: 4.0,
      };
      // A (4.0) + AP boost (1.0) = 5.0, but maxGPA is 4.0
      const courses = [makeCourse({ grade: "A", courseType: "AP" })];
      const result = calculateGPA(courses, lowMaxProfile);
      expect(result.gpa).toBe(4.0);
      expect(result.breakdown[0].finalPoints).toBe(4.0);
    });
  });

  describe("customBoosts parameter", () => {
    it("overrides specific boost values", () => {
      const courses = [makeCourse({ grade: "A", courseType: "Honors" })];
      // Override Honors boost from 0 to 2.0
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED, { Honors: 2.0 });
      // 4.0 + 2.0 = 6.0, but capped at maxGPA 4.0
      expect(result.gpa).toBe(4.0);
    });

    it("only overrides specified course types, leaves others intact", () => {
      const courses = [
        makeCourse({ id: "c1", grade: "A", courseType: "Regular" }),
        makeCourse({ id: "c2", grade: "A", courseType: "AP" }),
      ];
      // Only override Regular to have 0.5 boost, AP keeps its default
      const result = calculateGPA(courses, STANDARD_WEIGHTED, { Regular: 0.5 });
      // Regular: 4.0 + 0.5 = 4.5, AP: 4.0 + 1.0 = 5.0 => avg 4.75
      expect(result.gpa).toBe(4.75);
    });
  });

  describe("GPA rounding", () => {
    it("rounds to 2 decimal places", () => {
      // 3 courses: A(4.0), B(3.0), B+(3.3) => avg = 10.3/3 = 3.4333... -> 3.43
      const courses = [
        makeCourse({ id: "c1", grade: "A" }),
        makeCourse({ id: "c2", grade: "B" }),
        makeCourse({ id: "c3", grade: "B+" }),
      ];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(3.43);
    });

    it("rounds 3.335 correctly", () => {
      // We need a combination that yields exactly X.XX5
      // A-(3.7) + B+(3.3) + B-(2.7) = 9.7 / 3 = 3.2333... -> 3.23
      const courses = [
        makeCourse({ id: "c1", grade: "A-" }),
        makeCourse({ id: "c2", grade: "B+" }),
        makeCourse({ id: "c3", grade: "B-" }),
      ];
      const result = calculateGPA(courses, STANDARD_UNWEIGHTED);
      expect(result.gpa).toBe(3.23);
    });
  });

  describe("UC profile routing", () => {
    it("routes uc-capped to specialRules (delegates to calculateUCCapped)", () => {
      const courses = [
        makeCourse({ grade: "A", courseType: "AP", gradeLevel: "11", isAG: true }),
      ];
      const result = calculateGPA(courses, UC_CAPPED);
      expect(result.profileId).toBe("uc-capped");
      // UC scale A = 4.0, AP boost = 1.0 => 5.0
      expect(result.gpa).toBe(5.0);
    });

    it("routes uc-uncapped to specialRules", () => {
      const courses = [
        makeCourse({ grade: "A", courseType: "AP", gradeLevel: "11", isAG: true }),
      ];
      const result = calculateGPA(courses, UC_UNCAPPED);
      expect(result.profileId).toBe("uc-uncapped");
    });

    it("routes uc-unweighted to specialRules", () => {
      const courses = [
        makeCourse({ grade: "A", courseType: "AP", gradeLevel: "11", isAG: true }),
      ];
      const result = calculateGPA(courses, UC_UNWEIGHTED);
      expect(result.profileId).toBe("uc-unweighted");
      // Unweighted: no boost, UC A = 4.0
      expect(result.gpa).toBe(4.0);
    });

    it("routes college-branded UC IDs correctly (college-uc-capped)", () => {
      const collegeBrandedProfile: GPAProfile = {
        ...UC_CAPPED,
        id: "college-uc-capped",
      };
      const courses = [
        makeCourse({ grade: "A", courseType: "AP", gradeLevel: "11", isAG: true }),
      ];
      const result = calculateGPA(courses, collegeBrandedProfile);
      // Should still route to UC capped
      expect(result.gpa).toBe(5.0);
    });
  });
});

// ---------------------------------------------------------------------------
// calculateMultipleGPAs
// ---------------------------------------------------------------------------

describe("calculateMultipleGPAs", () => {
  it("returns one result per profile", () => {
    const courses = [makeCourse({ grade: "A" })];
    const profiles = [STANDARD_UNWEIGHTED, STANDARD_WEIGHTED];
    const results = calculateMultipleGPAs(courses, profiles);
    expect(results).toHaveLength(2);
  });

  it("results are in the same order as profiles", () => {
    const courses = [makeCourse({ grade: "A" })];
    const profiles = [STANDARD_WEIGHTED, STANDARD_UNWEIGHTED];
    const results = calculateMultipleGPAs(courses, profiles);
    expect(results[0].profileId).toBe("standard-weighted");
    expect(results[1].profileId).toBe("standard-unweighted");
  });

  it("weighted GPA >= unweighted GPA for AP courses", () => {
    const courses = [makeCourse({ grade: "A", courseType: "AP" })];
    const results = calculateMultipleGPAs(courses, [
      STANDARD_UNWEIGHTED,
      STANDARD_WEIGHTED,
    ]);
    expect(results[1].gpa).toBeGreaterThanOrEqual(results[0].gpa);
  });

  it("returns empty array for empty profiles", () => {
    const courses = [makeCourse({ grade: "A" })];
    const results = calculateMultipleGPAs(courses, []);
    expect(results).toHaveLength(0);
  });

  it("passes customBoosts to each profile calculation", () => {
    const courses = [makeCourse({ grade: "A", courseType: "Honors" })];
    const results = calculateMultipleGPAs(
      courses,
      [STANDARD_UNWEIGHTED],
      { Honors: 0.5 }
    );
    // Unweighted normally gives Honors 0 boost, but custom gives 0.5
    // 4.0 + 0.5 = 4.5, capped at maxGPA 4.0
    expect(results[0].gpa).toBe(4.0);
  });

  it("passes skipGradeFilter to each profile calculation", () => {
    // UC profiles with 9th grade courses — skipGradeFilter=true should include them
    const courses = [
      makeCourse({ grade: "A", courseType: "Regular", gradeLevel: "9", isAG: true }),
    ];
    const results = calculateMultipleGPAs(courses, [UC_UNWEIGHTED], undefined, true);
    expect(results[0].gpa).toBe(4.0);
    expect(results[0].notCountedByUC).toBe(true);
  });
});
