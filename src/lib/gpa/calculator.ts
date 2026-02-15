import type { Course, GPAProfile, GPAResult, CourseBreakdown } from "./types";
import { calculateUCCapped, calculateUCUncapped, calculateUCUnweighted } from "./specialRules";

export function calculateGPA(
  courses: Course[],
  profile: GPAProfile,
  customBoosts?: Partial<GPAProfile["boostSystem"]>,
  skipGradeFilter = false
): GPAResult {
  const effectiveProfile = customBoosts
    ? {
        ...profile,
        boostSystem: { ...profile.boostSystem, ...customBoosts },
      }
    : profile;

  // UC special calculations (check both original and college-branded IDs)
  const baseId = profile.id.replace(/^college-/, "");
  if (baseId === "uc-capped") {
    return calculateUCCapped(courses, effectiveProfile, skipGradeFilter);
  }
  if (baseId === "uc-uncapped") {
    return calculateUCUncapped(courses, effectiveProfile, skipGradeFilter);
  }
  if (baseId === "uc-unweighted") {
    return calculateUCUnweighted(courses, effectiveProfile, skipGradeFilter);
  }

  // Standard calculation
  const breakdown: CourseBreakdown[] = courses.map((course) => {
    const basePoints = effectiveProfile.gradeScale[course.grade];
    const boost = effectiveProfile.boostSystem[course.courseType];
    const finalPoints = Math.min(basePoints + boost, effectiveProfile.maxGPA);
    const qualityPoints = finalPoints * course.credits;

    return {
      courseId: course.id,
      courseName: course.name,
      grade: course.grade,
      courseType: course.courseType,
      basePoints,
      boost,
      finalPoints,
      credits: course.credits,
      qualityPoints,
    };
  });

  const totalCredits = breakdown.reduce((sum, b) => sum + b.credits, 0);
  const totalQualityPoints = breakdown.reduce(
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

export function calculateMultipleGPAs(
  courses: Course[],
  profiles: GPAProfile[],
  customBoosts?: Partial<GPAProfile["boostSystem"]>,
  skipGradeFilter = false
): GPAResult[] {
  return profiles.map((profile) => calculateGPA(courses, profile, customBoosts, skipGradeFilter));
}
