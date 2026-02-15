import type { Course, GPAProfile, GPAResult, CourseBreakdown } from "./types";

function buildBreakdown(
  course: Course,
  profile: GPAProfile,
  boost: number,
  excluded: boolean,
  excludeReason?: string
): CourseBreakdown {
  const basePoints = profile.gradeScale[course.grade];
  const finalPoints = excluded ? 0 : Math.min(basePoints + boost, profile.maxGPA);
  return {
    courseId: course.id,
    courseName: course.name,
    grade: course.grade,
    courseType: course.courseType,
    basePoints,
    boost: excluded ? 0 : boost,
    finalPoints,
    credits: course.credits,
    qualityPoints: finalPoints * course.credits,
    excluded,
    excludeReason,
  };
}

export function calculateUCCapped(
  courses: Course[],
  profile: GPAProfile
): GPAResult {
  // Filter to A-G courses only
  const agCourses = courses.filter((c) => c.isAG !== false);
  const nonAGCourses = courses.filter((c) => c.isAG === false);

  // Determine which courses get honors boost
  // Sort by grade level (10th first, then 11th) to apply cap correctly
  const honorsEligible = agCourses.filter(
    (c) =>
      c.courseType !== "Regular" &&
      c.courseType !== "IB_SL" &&
      profile.gradeScale[c.grade] >= 2.0 // C or better
  );

  // Split by grade level for capping
  const from10th = honorsEligible.filter((c) => c.gradeLevel === "10");
  const fromOther = honorsEligible.filter((c) => c.gradeLevel !== "10");

  // Apply caps: max 4 semesters from 10th, max 8 total
  const maxFrom10th = Math.min(from10th.length, 4);
  const remaining = 8 - maxFrom10th;
  const maxFromOther = Math.min(fromOther.length, remaining);

  const boostedCourseIds = new Set<string>();
  from10th.slice(0, maxFrom10th).forEach((c) => boostedCourseIds.add(c.id));
  fromOther.slice(0, maxFromOther).forEach((c) => boostedCourseIds.add(c.id));

  const breakdown: CourseBreakdown[] = [];

  for (const course of agCourses) {
    const boost = boostedCourseIds.has(course.id)
      ? profile.boostSystem[course.courseType]
      : 0;
    breakdown.push(buildBreakdown(course, profile, boost, false));
  }

  for (const course of nonAGCourses) {
    breakdown.push(
      buildBreakdown(course, profile, 0, true, "Not an A-G course")
    );
  }

  const included = breakdown.filter((b) => !b.excluded);
  const totalCredits = included.reduce((sum, b) => sum + b.credits, 0);
  const totalQualityPoints = included.reduce(
    (sum, b) => sum + b.qualityPoints,
    0
  );
  const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

  return {
    gpa: Math.round(gpa * 100) / 100,
    profileId: profile.id,
    profileName: profile.name,
    totalCredits,
    totalQualityPoints,
    breakdown,
  };
}

export function calculateUCUncapped(
  courses: Course[],
  profile: GPAProfile
): GPAResult {
  const agCourses = courses.filter((c) => c.isAG !== false);
  const nonAGCourses = courses.filter((c) => c.isAG === false);

  const breakdown: CourseBreakdown[] = [];

  for (const course of agCourses) {
    const isHonorsEligible =
      course.courseType !== "Regular" &&
      course.courseType !== "IB_SL" &&
      profile.gradeScale[course.grade] >= 2.0;

    const boost = isHonorsEligible
      ? profile.boostSystem[course.courseType]
      : 0;
    breakdown.push(buildBreakdown(course, profile, boost, false));
  }

  for (const course of nonAGCourses) {
    breakdown.push(
      buildBreakdown(course, profile, 0, true, "Not an A-G course")
    );
  }

  const included = breakdown.filter((b) => !b.excluded);
  const totalCredits = included.reduce((sum, b) => sum + b.credits, 0);
  const totalQualityPoints = included.reduce(
    (sum, b) => sum + b.qualityPoints,
    0
  );
  const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

  return {
    gpa: Math.round(gpa * 100) / 100,
    profileId: profile.id,
    profileName: profile.name,
    totalCredits,
    totalQualityPoints,
    breakdown,
  };
}
