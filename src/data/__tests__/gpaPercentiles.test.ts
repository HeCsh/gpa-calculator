import { describe, it, expect } from "vitest";
import {
  getUnweightedPercentile,
  getWeightedPercentile,
  getPercentileForProfile,
} from "@/data/gpaPercentiles";

describe("getUnweightedPercentile", () => {
  it("should return 98 for a 4.0 GPA", () => {
    expect(getUnweightedPercentile(4.0)).toBe(98);
  });

  it("should return 0 for a 0.0 GPA", () => {
    expect(getUnweightedPercentile(0.0)).toBe(0);
  });

  it("should return 58 for a 3.0 GPA (national average)", () => {
    expect(getUnweightedPercentile(3.0)).toBe(58);
  });

  it("should return known values at table anchor points", () => {
    expect(getUnweightedPercentile(3.5)).toBe(83);
    expect(getUnweightedPercentile(2.5)).toBe(30);
    expect(getUnweightedPercentile(2.0)).toBe(11);
    expect(getUnweightedPercentile(1.0)).toBe(2);
  });

  it("should interpolate between table values", () => {
    // Between 3.0 (58) and 3.1 (65): midpoint 3.05 should be ~62
    const mid = getUnweightedPercentile(3.05);
    expect(mid).toBeGreaterThan(58);
    expect(mid).toBeLessThan(65);
  });

  it("should interpolate correctly at quarter points", () => {
    // Between 3.0 (58) and 3.1 (65): 3.025 is 25% of the way
    const quarter = getUnweightedPercentile(3.025);
    expect(quarter).toBeGreaterThanOrEqual(58);
    expect(quarter).toBeLessThanOrEqual(65);
  });

  it("should return the top percentile for GPA above 4.0", () => {
    expect(getUnweightedPercentile(4.5)).toBe(98);
    expect(getUnweightedPercentile(5.0)).toBe(98);
  });

  it("should return 0 for negative GPA", () => {
    expect(getUnweightedPercentile(-1.0)).toBe(0);
  });

  it("should return monotonically increasing percentiles for increasing GPA", () => {
    const gpas = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];
    for (let i = 1; i < gpas.length; i++) {
      expect(getUnweightedPercentile(gpas[i])).toBeGreaterThanOrEqual(
        getUnweightedPercentile(gpas[i - 1])
      );
    }
  });

  it("should return values between 0 and 100 inclusive", () => {
    const testValues = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];
    for (const gpa of testValues) {
      const pct = getUnweightedPercentile(gpa);
      expect(pct).toBeGreaterThanOrEqual(0);
      expect(pct).toBeLessThanOrEqual(100);
    }
  });
});

describe("getWeightedPercentile", () => {
  it("should return 99 for a 5.0 weighted GPA", () => {
    expect(getWeightedPercentile(5.0)).toBe(99);
  });

  it("should return 0 for a 0.0 GPA", () => {
    expect(getWeightedPercentile(0.0)).toBe(0);
  });

  it("should return 90 for a 4.0 weighted GPA", () => {
    expect(getWeightedPercentile(4.0)).toBe(90);
  });

  it("should return known values at table anchor points", () => {
    expect(getWeightedPercentile(3.0)).toBe(40);
    expect(getWeightedPercentile(2.0)).toBe(6);
    expect(getWeightedPercentile(4.8)).toBe(98);
  });

  it("should interpolate between table values", () => {
    // Between 3.0 (40) and 3.2 (52): midpoint 3.1 should be ~46
    const mid = getWeightedPercentile(3.1);
    expect(mid).toBeGreaterThan(40);
    expect(mid).toBeLessThan(52);
  });

  it("should return the top percentile for GPA above 5.0", () => {
    expect(getWeightedPercentile(5.5)).toBe(99);
    expect(getWeightedPercentile(6.0)).toBe(99);
  });

  it("should return 0 for negative GPA", () => {
    expect(getWeightedPercentile(-1.0)).toBe(0);
  });

  it("should return monotonically increasing percentiles for increasing GPA", () => {
    const gpas = [0.0, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
    for (let i = 1; i < gpas.length; i++) {
      expect(getWeightedPercentile(gpas[i])).toBeGreaterThanOrEqual(
        getWeightedPercentile(gpas[i - 1])
      );
    }
  });

  it("should return values between 0 and 100 inclusive", () => {
    const testValues = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
    for (const gpa of testValues) {
      const pct = getWeightedPercentile(gpa);
      expect(pct).toBeGreaterThanOrEqual(0);
      expect(pct).toBeLessThanOrEqual(100);
    }
  });
});

describe("getPercentileForProfile", () => {
  it("should return unweighted percentile for standard-unweighted profile", () => {
    expect(getPercentileForProfile("standard-unweighted", 3.5)).toBe(
      getUnweightedPercentile(3.5)
    );
  });

  it("should return weighted percentile for standard-weighted profile", () => {
    expect(getPercentileForProfile("standard-weighted", 4.0)).toBe(
      getWeightedPercentile(4.0)
    );
  });

  it("should return null for UC profile IDs", () => {
    expect(getPercentileForProfile("uc-capped", 3.5)).toBeNull();
    expect(getPercentileForProfile("uc-uncapped", 3.5)).toBeNull();
    expect(getPercentileForProfile("uc-unweighted", 3.5)).toBeNull();
  });

  it("should return null for unknown profile IDs", () => {
    expect(getPercentileForProfile("unknown-profile", 3.5)).toBeNull();
    expect(getPercentileForProfile("", 3.5)).toBeNull();
  });
});
