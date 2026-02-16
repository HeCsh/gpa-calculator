import { describe, it, expect } from "vitest";
import {
  UNWEIGHTED_BOOST,
  STANDARD_WEIGHTED_BOOST,
  UC_HONORS_BOOST,
} from "@/lib/gpa/boostSystems";
import { COURSE_TYPES } from "@/lib/gpa/types";
import type { CourseType } from "@/lib/gpa/types";

describe("UNWEIGHTED_BOOST", () => {
  it("has an entry for every CourseType", () => {
    for (const ct of COURSE_TYPES) {
      expect(UNWEIGHTED_BOOST[ct]).toBeDefined();
    }
  });

  it("all values are 0.0 (no boosts)", () => {
    for (const ct of COURSE_TYPES) {
      expect(UNWEIGHTED_BOOST[ct]).toBe(0.0);
    }
  });

  it.each<CourseType>([
    "Regular",
    "Honors",
    "AP",
    "IB_HL",
    "IB_SL",
    "Dual Enrollment",
  ])("%s boost is exactly 0", (courseType) => {
    expect(UNWEIGHTED_BOOST[courseType]).toBe(0);
  });
});

describe("STANDARD_WEIGHTED_BOOST", () => {
  it("has an entry for every CourseType", () => {
    for (const ct of COURSE_TYPES) {
      expect(STANDARD_WEIGHTED_BOOST[ct]).toBeDefined();
    }
  });

  describe("no boost courses", () => {
    it("Regular gets 0.0 boost", () => {
      expect(STANDARD_WEIGHTED_BOOST["Regular"]).toBe(0.0);
    });
  });

  describe("half-point boost courses (+0.5)", () => {
    it("Honors gets 0.5 boost", () => {
      expect(STANDARD_WEIGHTED_BOOST["Honors"]).toBe(0.5);
    });

    it("IB_SL gets 0.5 boost", () => {
      expect(STANDARD_WEIGHTED_BOOST["IB_SL"]).toBe(0.5);
    });

    it("Dual Enrollment gets 0.5 boost", () => {
      expect(STANDARD_WEIGHTED_BOOST["Dual Enrollment"]).toBe(0.5);
    });
  });

  describe("full-point boost courses (+1.0)", () => {
    it("AP gets 1.0 boost", () => {
      expect(STANDARD_WEIGHTED_BOOST["AP"]).toBe(1.0);
    });

    it("IB_HL gets 1.0 boost", () => {
      expect(STANDARD_WEIGHTED_BOOST["IB_HL"]).toBe(1.0);
    });
  });

  it("AP boost is double the Honors boost", () => {
    expect(STANDARD_WEIGHTED_BOOST["AP"]).toBe(
      STANDARD_WEIGHTED_BOOST["Honors"] * 2
    );
  });

  it("IB_HL boost is greater than IB_SL boost", () => {
    expect(STANDARD_WEIGHTED_BOOST["IB_HL"]).toBeGreaterThan(
      STANDARD_WEIGHTED_BOOST["IB_SL"]
    );
  });

  it("all boosts are non-negative", () => {
    for (const ct of COURSE_TYPES) {
      expect(STANDARD_WEIGHTED_BOOST[ct]).toBeGreaterThanOrEqual(0);
    }
  });

  it("maximum boost is 1.0 (for a 5.0 scale)", () => {
    const maxBoost = Math.max(...COURSE_TYPES.map((ct) => STANDARD_WEIGHTED_BOOST[ct]));
    expect(maxBoost).toBe(1.0);
  });
});

describe("UC_HONORS_BOOST", () => {
  it("has an entry for every CourseType", () => {
    for (const ct of COURSE_TYPES) {
      expect(UC_HONORS_BOOST[ct]).toBeDefined();
    }
  });

  describe("no boost courses", () => {
    it("Regular gets 0.0 boost", () => {
      expect(UC_HONORS_BOOST["Regular"]).toBe(0.0);
    });

    it("IB_SL gets 0.0 boost (not UC-honors eligible)", () => {
      expect(UC_HONORS_BOOST["IB_SL"]).toBe(0.0);
    });
  });

  describe("full-point boost courses (+1.0)", () => {
    it("Honors gets 1.0 boost", () => {
      expect(UC_HONORS_BOOST["Honors"]).toBe(1.0);
    });

    it("AP gets 1.0 boost", () => {
      expect(UC_HONORS_BOOST["AP"]).toBe(1.0);
    });

    it("IB_HL gets 1.0 boost", () => {
      expect(UC_HONORS_BOOST["IB_HL"]).toBe(1.0);
    });

    it("Dual Enrollment gets 1.0 boost", () => {
      expect(UC_HONORS_BOOST["Dual Enrollment"]).toBe(1.0);
    });
  });

  it("UC boosts are either 0 or 1 (binary)", () => {
    for (const ct of COURSE_TYPES) {
      expect([0, 1]).toContain(UC_HONORS_BOOST[ct]);
    }
  });

  describe("comparison with STANDARD_WEIGHTED_BOOST", () => {
    it("Honors gets higher boost in UC than Standard (1.0 vs 0.5)", () => {
      expect(UC_HONORS_BOOST["Honors"]).toBeGreaterThan(
        STANDARD_WEIGHTED_BOOST["Honors"]
      );
    });

    it("IB_SL gets no boost in UC but 0.5 in Standard", () => {
      expect(UC_HONORS_BOOST["IB_SL"]).toBe(0);
      expect(STANDARD_WEIGHTED_BOOST["IB_SL"]).toBe(0.5);
    });

    it("Dual Enrollment gets higher boost in UC than Standard (1.0 vs 0.5)", () => {
      expect(UC_HONORS_BOOST["Dual Enrollment"]).toBeGreaterThan(
        STANDARD_WEIGHTED_BOOST["Dual Enrollment"]
      );
    });

    it("AP boost is the same in both systems (1.0)", () => {
      expect(UC_HONORS_BOOST["AP"]).toBe(STANDARD_WEIGHTED_BOOST["AP"]);
    });
  });
});
