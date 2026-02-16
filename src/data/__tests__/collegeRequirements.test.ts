import { describe, it, expect } from "vitest";
import {
  COLLEGE_REQUIREMENTS,
  type CollegeRequirement,
} from "@/data/collegeRequirements";

describe("COLLEGE_REQUIREMENTS", () => {
  it("should be a non-empty array", () => {
    expect(COLLEGE_REQUIREMENTS.length).toBeGreaterThan(0);
  });

  it("should have all required fields on every entry", () => {
    for (const req of COLLEGE_REQUIREMENTS) {
      expect(req).toHaveProperty("name");
      expect(req).toHaveProperty("avgGPA");
      expect(req).toHaveProperty("acceptanceRate");
      expect(req).toHaveProperty("tier");

      expect(typeof req.name).toBe("string");
      expect(req.name.length).toBeGreaterThan(0);

      expect(typeof req.avgGPA).toBe("number");
      expect(typeof req.acceptanceRate).toBe("number");
      expect(typeof req.tier).toBe("string");
    }
  });

  it("should have valid avgGPA values between 0 and 4.0", () => {
    for (const req of COLLEGE_REQUIREMENTS) {
      expect(req.avgGPA).toBeGreaterThanOrEqual(0);
      expect(req.avgGPA).toBeLessThanOrEqual(4.0);
    }
  });

  it("should have valid acceptanceRate values between 0 and 100", () => {
    for (const req of COLLEGE_REQUIREMENTS) {
      expect(req.acceptanceRate).toBeGreaterThan(0);
      expect(req.acceptanceRate).toBeLessThanOrEqual(100);
    }
  });

  it("should have valid tier values", () => {
    const validTiers = ["ivy", "top20", "top50", "flagship", "state"];
    for (const req of COLLEGE_REQUIREMENTS) {
      expect(validTiers).toContain(req.tier);
    }
  });

  it("should have no duplicate college names", () => {
    const names = COLLEGE_REQUIREMENTS.map((r) => r.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it("should have Ivy League colleges in the ivy tier", () => {
    const ivyColleges = COLLEGE_REQUIREMENTS.filter((r) => r.tier === "ivy");
    expect(ivyColleges.length).toBe(8);
    const ivyNames = ivyColleges.map((r) => r.name);
    expect(ivyNames).toContain("Harvard University");
    expect(ivyNames).toContain("Yale University");
    expect(ivyNames).toContain("Princeton University");
  });

  it("should have Ivy League colleges with higher GPAs than state schools", () => {
    const ivyColleges = COLLEGE_REQUIREMENTS.filter((r) => r.tier === "ivy");
    const stateColleges = COLLEGE_REQUIREMENTS.filter(
      (r) => r.tier === "state"
    );

    const avgIvyGPA =
      ivyColleges.reduce((sum, r) => sum + r.avgGPA, 0) / ivyColleges.length;
    const avgStateGPA =
      stateColleges.reduce((sum, r) => sum + r.avgGPA, 0) /
      stateColleges.length;

    expect(avgIvyGPA).toBeGreaterThan(avgStateGPA);
  });

  it("should have Ivy League colleges with lower acceptance rates than state schools", () => {
    const ivyColleges = COLLEGE_REQUIREMENTS.filter((r) => r.tier === "ivy");
    const stateColleges = COLLEGE_REQUIREMENTS.filter(
      (r) => r.tier === "state"
    );

    const avgIvyRate =
      ivyColleges.reduce((sum, r) => sum + r.acceptanceRate, 0) /
      ivyColleges.length;
    const avgStateRate =
      stateColleges.reduce((sum, r) => sum + r.acceptanceRate, 0) /
      stateColleges.length;

    expect(avgIvyRate).toBeLessThan(avgStateRate);
  });

  it("should have at least one college in each tier", () => {
    const tiers = ["ivy", "top20", "top50", "flagship", "state"];
    for (const tier of tiers) {
      const count = COLLEGE_REQUIREMENTS.filter((r) => r.tier === tier).length;
      expect(count).toBeGreaterThan(0);
    }
  });

  it("should have avgGPA with at most two decimal places", () => {
    for (const req of COLLEGE_REQUIREMENTS) {
      const decimalPart = req.avgGPA.toString().split(".")[1] || "";
      expect(decimalPart.length).toBeLessThanOrEqual(2);
    }
  });
});
