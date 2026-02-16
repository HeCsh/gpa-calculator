import { describe, it, expect } from "vitest";
import { TOP_COLLEGES, getCollegeById } from "@/data/topColleges";

describe("TOP_COLLEGES", () => {
  it("should be a non-empty array", () => {
    expect(TOP_COLLEGES.length).toBeGreaterThan(0);
  });

  it("should have all required fields on every college", () => {
    for (const college of TOP_COLLEGES) {
      expect(college).toHaveProperty("id");
      expect(college).toHaveProperty("name");
      expect(college).toHaveProperty("avgGPA");
      expect(college).toHaveProperty("acceptanceRate");
      expect(college).toHaveProperty("system");
      expect(college).toHaveProperty("description");
      expect(college).toHaveProperty("tips");

      expect(typeof college.id).toBe("string");
      expect(college.id.length).toBeGreaterThan(0);

      expect(typeof college.name).toBe("string");
      expect(college.name.length).toBeGreaterThan(0);

      expect(typeof college.avgGPA).toBe("number");
      expect(typeof college.acceptanceRate).toBe("number");
      expect(typeof college.system).toBe("string");
      expect(typeof college.description).toBe("string");
      expect(college.description.length).toBeGreaterThan(0);

      expect(Array.isArray(college.tips)).toBe(true);
      expect(college.tips.length).toBeGreaterThan(0);
      for (const tip of college.tips) {
        expect(typeof tip).toBe("string");
        expect(tip.length).toBeGreaterThan(0);
      }
    }
  });

  it("should have valid avgGPA values between 0 and 4.0", () => {
    for (const college of TOP_COLLEGES) {
      expect(college.avgGPA).toBeGreaterThanOrEqual(0);
      expect(college.avgGPA).toBeLessThanOrEqual(4.0);
    }
  });

  it("should have valid acceptanceRate values between 0 and 100", () => {
    for (const college of TOP_COLLEGES) {
      expect(college.acceptanceRate).toBeGreaterThan(0);
      expect(college.acceptanceRate).toBeLessThanOrEqual(100);
    }
  });

  it("should have no duplicate IDs", () => {
    const ids = TOP_COLLEGES.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have no duplicate names", () => {
    const names = TOP_COLLEGES.map((c) => c.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it("should have valid system values", () => {
    const validSystems = ["ivy", "generic", "uc", "csu"];
    for (const college of TOP_COLLEGES) {
      expect(validSystems).toContain(college.system);
    }
  });

  it("should contain known Ivy League colleges", () => {
    const ivyIds = TOP_COLLEGES.filter((c) => c.system === "ivy").map(
      (c) => c.id
    );
    expect(ivyIds).toContain("harvard");
    expect(ivyIds).toContain("yale");
    expect(ivyIds).toContain("princeton");
    expect(ivyIds).toContain("columbia");
    expect(ivyIds).toContain("upenn");
    expect(ivyIds).toContain("brown");
    expect(ivyIds).toContain("dartmouth");
    expect(ivyIds).toContain("cornell");
  });

  it("should contain known UC colleges", () => {
    const ucIds = TOP_COLLEGES.filter((c) => c.system === "uc").map(
      (c) => c.id
    );
    expect(ucIds).toContain("uc-berkeley");
    expect(ucIds).toContain("ucla");
    expect(ucIds).toContain("uc-san-diego");
  });
});

describe("getCollegeById", () => {
  it("should return the correct college for a valid ID", () => {
    const harvard = getCollegeById("harvard");
    expect(harvard).toBeDefined();
    expect(harvard!.name).toBe("Harvard University");
    expect(harvard!.system).toBe("ivy");
  });

  it("should return the correct college for a UC school", () => {
    const ucBerkeley = getCollegeById("uc-berkeley");
    expect(ucBerkeley).toBeDefined();
    expect(ucBerkeley!.name).toBe("UC Berkeley");
    expect(ucBerkeley!.system).toBe("uc");
  });

  it("should return undefined for a non-existent ID", () => {
    expect(getCollegeById("nonexistent")).toBeUndefined();
  });

  it("should return undefined for an empty string", () => {
    expect(getCollegeById("")).toBeUndefined();
  });

  it("should be case-sensitive", () => {
    expect(getCollegeById("Harvard")).toBeUndefined();
    expect(getCollegeById("HARVARD")).toBeUndefined();
  });

  it("should return a matching object from the TOP_COLLEGES array", () => {
    for (const college of TOP_COLLEGES) {
      const found = getCollegeById(college.id);
      expect(found).toBeDefined();
      expect(found).toBe(college);
    }
  });
});
