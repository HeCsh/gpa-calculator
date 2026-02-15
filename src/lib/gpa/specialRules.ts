import type { Course, GPAProfile, GPAResult, CourseBreakdown } from "./types";

// UC GPA only counts 10th and 11th grade courses
const UC_ELIGIBLE_GRADES = new Set(["10", "11"]);

function isUCGradeEligible(course: Course): boolean {
  return course.gradeLevel != null && UC_ELIGIBLE_GRADES.has(course.gradeLevel);
}

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

function splitUCCourses(
  courses: Course[],
  skipGradeFilter = false
): { eligible: Course[]; excluded: Course[]; hasGradeExcluded: boolean } {
  const eligible: Course[] = [];
  const excluded: Course[] = [];
  let hasGradeExcluded = false;

  for (const c of courses) {
    if (c.isAG === false) {
      excluded.push(c);
    } else if (!isUCGradeEligible(c)) {
      hasGradeExcluded = true;
      if (skipGradeFilter) {
        eligible.push(c); // Include for display but flag it
      } else {
        excluded.push(c);
      }
    } else {
      eligible.push(c);
    }
  }

  return { eligible, excluded, hasGradeExcluded };
}

function buildExcludedBreakdown(courses: Course[], profile: GPAProfile): CourseBreakdown[] {
  return courses.map((course) => {
    const reason = course.isAG === false
      ? "Not an A-G course"
      : "Only 10th & 11th grade count for UC GPA";
    return buildBreakdown(course, profile, 0, true, reason);
  });
}

function computeResult(
  breakdown: CourseBreakdown[],
  profile: GPAProfile
): GPAResult {
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

export function calculateUCCapped(
  courses: Course[],
  profile: GPAProfile,
  skipGradeFilter = false
): GPAResult {
  const { eligible, excluded, hasGradeExcluded } = splitUCCourses(courses, skipGradeFilter);

  // Determine which courses get honors boost
  const honorsEligible = eligible.filter(
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

  for (const course of eligible) {
    const boost = boostedCourseIds.has(course.id)
      ? profile.boostSystem[course.courseType]
      : 0;
    breakdown.push(buildBreakdown(course, profile, boost, false));
  }

  breakdown.push(...buildExcludedBreakdown(excluded, profile));

  const result = computeResult(breakdown, profile);
  if (skipGradeFilter && hasGradeExcluded) {
    result.notCountedByUC = true;
  }
  return result;
}

export function calculateUCUncapped(
  courses: Course[],
  profile: GPAProfile,
  skipGradeFilter = false
): GPAResult {
  const { eligible, excluded, hasGradeExcluded } = splitUCCourses(courses, skipGradeFilter);

  const breakdown: CourseBreakdown[] = [];

  for (const course of eligible) {
    const isHonorsEligible =
      course.courseType !== "Regular" &&
      course.courseType !== "IB_SL" &&
      profile.gradeScale[course.grade] >= 2.0;

    const boost = isHonorsEligible
      ? profile.boostSystem[course.courseType]
      : 0;
    breakdown.push(buildBreakdown(course, profile, boost, false));
  }

  breakdown.push(...buildExcludedBreakdown(excluded, profile));

  const result = computeResult(breakdown, profile);
  if (skipGradeFilter && hasGradeExcluded) {
    result.notCountedByUC = true;
  }
  return result;
}

export function calculateUCUnweighted(
  courses: Course[],
  profile: GPAProfile,
  skipGradeFilter = false
): GPAResult {
  const { eligible, excluded, hasGradeExcluded } = splitUCCourses(courses, skipGradeFilter);

  const breakdown: CourseBreakdown[] = [];

  for (const course of eligible) {
    breakdown.push(buildBreakdown(course, profile, 0, false));
  }

  breakdown.push(...buildExcludedBreakdown(excluded, profile));

  const result = computeResult(breakdown, profile);
  if (skipGradeFilter && hasGradeExcluded) {
    result.notCountedByUC = true;
  }
  return result;
}
