import { describe, it, expect } from "vitest";
import {
  getDefaultCourses,
  GRADE_LEVELS,
  SEMESTERS,
} from "@/data/defaultCourses";

describe("GRADE_LEVELS", () => {
  it("should have four grade levels", () => {
    expect(GRADE_LEVELS).toHaveLength(4);
  });

  it("should have values 9 through 12", () => {
    const values = GRADE_LEVELS.map((g) => g.value);
    expect(values).toEqual(["9", "10", "11", "12"]);
  });

  it("should have non-empty labels on all entries", () => {
    for (const level of GRADE_LEVELS) {
      expect(typeof level.label).toBe("string");
      expect(level.label.length).toBeGreaterThan(0);
    }
  });
});

describe("SEMESTERS", () => {
  it("should have two semesters", () => {
    expect(SEMESTERS).toHaveLength(2);
  });

  it("should have values 1 and 2", () => {
    const values = SEMESTERS.map((s) => s.value);
    expect(values).toEqual(["1", "2"]);
  });

  it("should have non-empty labels on all entries", () => {
    for (const semester of SEMESTERS) {
      expect(typeof semester.label).toBe("string");
      expect(semester.label.length).toBeGreaterThan(0);
    }
  });
});

describe("getDefaultCourses", () => {
  it("should return courses for every grade level and semester combination", () => {
    for (const grade of GRADE_LEVELS) {
      for (const semester of SEMESTERS) {
        const courses = getDefaultCourses(grade.value, semester.value);
        expect(courses.length).toBeGreaterThan(0);
      }
    }
  });

  it("should return courses with all required fields", () => {
    for (const grade of GRADE_LEVELS) {
      for (const semester of SEMESTERS) {
        const courses = getDefaultCourses(grade.value, semester.value);
        for (const course of courses) {
          expect(course).toHaveProperty("name");
          expect(course).toHaveProperty("courseType");
          expect(course).toHaveProperty("credits");
          expect(course).toHaveProperty("isAG");

          expect(typeof course.name).toBe("string");
          expect(course.name.length).toBeGreaterThan(0);

          expect(typeof course.courseType).toBe("string");
          expect(typeof course.credits).toBe("number");
          expect(typeof course.isAG).toBe("boolean");
        }
      }
    }
  });

  it("should return courses with valid courseType values", () => {
    const validTypes = [
      "Regular",
      "Honors",
      "AP",
      "IB_HL",
      "IB_SL",
      "Dual Enrollment",
    ];
    for (const grade of GRADE_LEVELS) {
      for (const semester of SEMESTERS) {
        const courses = getDefaultCourses(grade.value, semester.value);
        for (const course of courses) {
          expect(validTypes).toContain(course.courseType);
        }
      }
    }
  });

  it("should return courses with positive credit values", () => {
    for (const grade of GRADE_LEVELS) {
      for (const semester of SEMESTERS) {
        const courses = getDefaultCourses(grade.value, semester.value);
        for (const course of courses) {
          expect(course.credits).toBeGreaterThan(0);
        }
      }
    }
  });

  it("should return 9th grade courses as all Regular type", () => {
    const courses9s1 = getDefaultCourses("9", "1");
    for (const course of courses9s1) {
      expect(course.courseType).toBe("Regular");
    }
  });

  it("should have AP courses in 11th and 12th grade", () => {
    const courses11 = getDefaultCourses("11", "1");
    const courses12 = getDefaultCourses("12", "1");

    const hasAP11 = courses11.some((c) => c.courseType === "AP");
    const hasAP12 = courses12.some((c) => c.courseType === "AP");

    expect(hasAP11).toBe(true);
    expect(hasAP12).toBe(true);
  });

  it("should have Honors courses in 12th grade", () => {
    const courses12 = getDefaultCourses("12", "1");
    const hasHonors = courses12.some((c) => c.courseType === "Honors");
    expect(hasHonors).toBe(true);
  });

  it("should fallback to 9-1 for invalid grade/semester combinations", () => {
    const fallback = getDefaultCourses("13", "1");
    const default91 = getDefaultCourses("9", "1");
    expect(fallback).toEqual(default91);
  });

  it("should fallback to 9-1 for completely invalid keys", () => {
    const fallback = getDefaultCourses("abc", "xyz");
    const default91 = getDefaultCourses("9", "1");
    expect(fallback).toEqual(default91);
  });

  it("should have PE as non a-g in 9th grade", () => {
    const courses9 = getDefaultCourses("9", "1");
    const pe = courses9.find((c) => c.name === "PE");
    expect(pe).toBeDefined();
    expect(pe!.isAG).toBe(false);
  });

  it("should have mostly a-g courses in upper grades", () => {
    for (const grade of ["10", "11", "12"]) {
      const courses = getDefaultCourses(grade, "1");
      const agCount = courses.filter((c) => c.isAG).length;
      expect(agCount).toBe(courses.length); // all a-g in 10-12
    }
  });
});
