"use client";

import { useMemo, useCallback, useEffect } from "react";
import { nanoid } from "nanoid";
import type {
  Course,
  GPAProfile,
  GPAResult,
  BoostSystem,
  College,
  Semester,
} from "@/lib/gpa/types";
import { calculateGPA, calculateMultipleGPAs } from "@/lib/gpa/calculator";
import { DEFAULT_PROFILES } from "@/data/gpaProfiles";
import { getProfilesForCollege } from "@/data/collegeGPAMap";
import { getDefaultCourses } from "@/data/defaultCourses";
import { useLocalStorage } from "./useLocalStorage";
import { useSemesterManager } from "./useSemesterManager";

const DEFAULT_COLLEGE: College = {
  id: "uc-san-diego",
  name: "University of California, San Diego",
  state: "CA",
  system: "uc",
};

export function useGPACalculator() {
  const [courses, setCourses, coursesLoaded] = useLocalStorage<Course[]>("gpa-courses", []);
  const [selectedCollege, setSelectedCollege] =
    useLocalStorage<College | null>("gpa-selected-college", DEFAULT_COLLEGE);
  const [customBoosts, setCustomBoosts] = useLocalStorage<
    Partial<BoostSystem>
  >("gpa-custom-boosts", {});
  const [selectedGradeLevel, setSelectedGradeLevel] = useLocalStorage<string>(
    "gpa-grade-level",
    "9"
  );
  const [selectedSemester, setSelectedSemester] = useLocalStorage<string>(
    "gpa-semester-number",
    "1"
  );
  const [hasAutoPopulated, setHasAutoPopulated] = useLocalStorage<boolean>(
    "gpa-auto-populated",
    false
  );

  const semesterManager = useSemesterManager();

  // Auto-populate courses on first visit
  useEffect(() => {
    if (coursesLoaded && !hasAutoPopulated && courses.length === 0) {
      const defaults = getDefaultCourses(selectedGradeLevel, selectedSemester);
      const newCourses: Course[] = defaults.map((dc) => ({
        id: nanoid(8),
        name: dc.name,
        grade: "A" as const,
        courseType: dc.courseType,
        credits: dc.credits,
        semesterId: semesterManager.activeSemesterId,
        isAG: dc.isAG,
        gradeLevel: selectedGradeLevel as Course["gradeLevel"],
      }));
      setCourses(newCourses);
      setHasAutoPopulated(true);
    }
  }, [coursesLoaded, hasAutoPopulated, courses.length, selectedGradeLevel, selectedSemester, semesterManager.activeSemesterId, setCourses, setHasAutoPopulated]);

  // Populate courses for a given semester
  const populateCoursesForSemester = useCallback(
    (semesterId: string, gradeLevel: string, semesterNum: string) => {
      const defaults = getDefaultCourses(gradeLevel, semesterNum);
      const newCourses: Course[] = defaults.map((dc) => ({
        id: nanoid(8),
        name: dc.name,
        grade: "A" as const,
        courseType: dc.courseType,
        credits: dc.credits,
        semesterId,
        isAG: dc.isAG,
        gradeLevel: gradeLevel as Course["gradeLevel"],
      }));
      // Replace courses for the target semester only
      setCourses((prev) => [
        ...prev.filter((c) => c.semesterId !== semesterId),
        ...newCourses,
      ]);
    },
    [setCourses]
  );

  // Re-populate when grade/semester dropdown changes
  const repopulateCourses = useCallback(
    (gradeLevel: string, semester: string) => {
      populateCoursesForSemester(
        semesterManager.activeSemesterId,
        gradeLevel,
        semester
      );
    },
    [semesterManager.activeSemesterId, populateCoursesForSemester]
  );

  // Wrap addSemester to auto-populate courses for the new semester
  const addSemesterWithCourses = useCallback(
    (name: string, gradeLevel?: Semester["gradeLevel"]) => {
      const newSem = semesterManager.addSemester(name, gradeLevel);
      // Parse semester number from the name
      const semMatch = name.match(/Sem[- ]*(\d+)/i);
      const semNum = semMatch ? semMatch[1] : "1";
      const grade = gradeLevel || "9";
      populateCoursesForSemester(newSem.id, grade, semNum);
      // Update the grade/semester selectors to match the new semester
      setSelectedGradeLevel(grade);
      setSelectedSemester(semNum);
    },
    [semesterManager, populateCoursesForSemester, setSelectedGradeLevel, setSelectedSemester]
  );

  const shortLabelMap: Record<string, string> = {
    "9": "9th",
    "10": "10th",
    "11": "11th",
    "12": "12th",
  };

  const handleGradeLevelChange = useCallback(
    (gradeLevel: string) => {
      setSelectedGradeLevel(gradeLevel);
      semesterManager.updateSemester(semesterManager.activeSemesterId, {
        name: `${shortLabelMap[gradeLevel] ?? gradeLevel} Gr, Sem-${selectedSemester}`,
        gradeLevel: gradeLevel as Semester["gradeLevel"],
      });
      repopulateCourses(gradeLevel, selectedSemester);
    },
    [setSelectedGradeLevel, selectedSemester, repopulateCourses, semesterManager]
  );

  const handleSemesterChange = useCallback(
    (semester: string) => {
      setSelectedSemester(semester);
      semesterManager.updateSemester(semesterManager.activeSemesterId, {
        name: `${shortLabelMap[selectedGradeLevel] ?? selectedGradeLevel} Gr, Sem-${semester}`,
      });
      repopulateCourses(selectedGradeLevel, semester);
    },
    [setSelectedSemester, selectedGradeLevel, repopulateCourses, semesterManager]
  );

  // Determine which GPA profiles to calculate based on selected college
  // Always show college-branded profiles first, then Standard Unweighted & Weighted
  const activeProfilesData = useMemo(() => {
    const standardUW = DEFAULT_PROFILES[0]; // standard-unweighted
    const standardW = DEFAULT_PROFILES[1];  // standard-weighted

    if (!selectedCollege) {
      return { profiles: DEFAULT_PROFILES, hasCollegeSpecific: false };
    }

    const collegeProfiles = getProfilesForCollege(selectedCollege.id, selectedCollege.system);
    const collegeName = selectedCollege.name;

    // Brand college-specific profiles (exclude standard ones — they're appended separately)
    const STANDARD_IDS = new Set(["standard-unweighted", "standard-weighted"]);
    const branded = collegeProfiles
      .filter((p) => !STANDARD_IDS.has(p.id))
      .map((p) => ({
        ...p,
        id: `college-${p.id}`,
        name: `${collegeName} ${p.shortName} GPA`,
      }));

    // Always append Standard Unweighted and Standard Weighted at the end
    return { profiles: [...branded, standardUW, standardW], hasCollegeSpecific: branded.length > 0 };
  }, [selectedCollege]);

  const activeProfiles = activeProfilesData.profiles;
  const collegeUsesStandardGPA = selectedCollege !== null && !activeProfilesData.hasCollegeSpecific;

  // Get courses for active semester
  const activeSemesterCourses = useMemo(
    () =>
      courses.filter(
        (c) => c.semesterId === semesterManager.activeSemesterId
      ),
    [courses, semesterManager.activeSemesterId]
  );

  // Calculate GPA for active semester (skipGradeFilter so UC shows actual GPA, flagged)
  const semesterResults: GPAResult[] = useMemo(() => {
    if (activeSemesterCourses.length === 0) return [];
    const boosts = Object.keys(customBoosts).length > 0 ? customBoosts : undefined;
    return calculateMultipleGPAs(activeSemesterCourses, activeProfiles, boosts, true);
  }, [activeSemesterCourses, activeProfiles, customBoosts]);

  // Calculate cumulative GPA (all courses) and enrich breakdown with semester labels
  const cumulativeResults: GPAResult[] = useMemo(() => {
    if (courses.length === 0) return [];
    const boosts = Object.keys(customBoosts).length > 0 ? customBoosts : undefined;
    const results = calculateMultipleGPAs(courses, activeProfiles, boosts);

    // Build a map from courseId → abbreviated semester label (e.g. "Gr9S1")
    const semMap = new Map(semesterManager.semesters.map((s) => [s.id, s]));
    const courseSemLabel = new Map<string, string>();
    for (const c of courses) {
      const sem = semMap.get(c.semesterId);
      if (sem) {
        const grMatch = sem.name.match(/(\d+)\w*/);
        const smMatch = sem.name.match(/Sem[- ]*(\d+)/i);
        const gr = grMatch ? grMatch[1] : "?";
        const sn = smMatch ? smMatch[1] : "?";
        courseSemLabel.set(c.id, `Gr${gr}S${sn}`);
      }
    }

    // Compute per-semester GPA trend for each profile
    const semesterOrder = semesterManager.semesters;
    const coursesBySemester = new Map<string, Course[]>();
    for (const c of courses) {
      const arr = coursesBySemester.get(c.semesterId) || [];
      arr.push(c);
      coursesBySemester.set(c.semesterId, arr);
    }

    // Attach labels to breakdown entries + semester trend
    // For UC profiles with no eligible credits, recalculate with skipGradeFilter
    return results.map((r) => {
      // Find the matching profile from activeProfiles
      const profile = activeProfiles.find(
        (p) => p.id === r.profileId
      );

      // If UC profile has 0 eligible credits, show GPA from all courses greyed out
      const isUCProfile = profile && /^(college-)?uc-/.test(profile.id);
      let result = r;
      if (isUCProfile && r.totalCredits === 0 && courses.length > 0) {
        const fallback = calculateGPA(courses, profile, boosts, true);
        result = { ...fallback, notCountedByUC: true };
      }

      const semesterTrend = profile
        ? semesterOrder
            .filter((s) => coursesBySemester.has(s.id))
            .map((s) => {
              const semCourses = coursesBySemester.get(s.id)!;
              // Calculate with skipGradeFilter to get actual GPA value
              const semResult = calculateGPA(semCourses, profile, boosts, true);
              const grMatch = s.name.match(/(\d+)\w*/);
              const smMatch = s.name.match(/Sem[- ]*(\d+)/i);
              const gr = grMatch ? grMatch[1] : "?";
              const sn = smMatch ? smMatch[1] : "?";
              return {
                label: `Gr${gr}S${sn}`,
                semesterId: s.id,
                gpa: semResult.gpa,
                notCountedByUC: semResult.notCountedByUC,
              };
            })
        : undefined;

      return {
        ...result,
        semesterTrend,
        breakdown: result.breakdown.map((b) => ({
          ...b,
          semesterLabel: courseSemLabel.get(b.courseId),
        })),
      };
    });
  }, [courses, activeProfiles, customBoosts, semesterManager.semesters]);

  const addCourse = useCallback(
    (course: Omit<Course, "id">) => {
      setCourses((prev) => [...prev, { ...course, id: nanoid(8) }]);
    },
    [setCourses]
  );

  const removeCourse = useCallback(
    (id: string) => {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    },
    [setCourses]
  );

  const updateCourse = useCallback(
    (id: string, updates: Partial<Course>) => {
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
      );
    },
    [setCourses]
  );

  // Wrap removeSemester to also delete courses for that semester
  const removeSemesterWithCourses = useCallback(
    (id: string) => {
      semesterManager.removeSemester(id);
      setCourses((prev) => prev.filter((c) => c.semesterId !== id));
    },
    [semesterManager, setCourses]
  );

  const clearCourses = useCallback(
    (semesterId?: string) => {
      if (semesterId) {
        setCourses((prev) => prev.filter((c) => c.semesterId !== semesterId));
      } else {
        setCourses([]);
      }
    },
    [setCourses]
  );

  return {
    // Course management
    courses,
    activeSemesterCourses,
    addCourse,
    removeCourse,
    updateCourse,
    clearCourses,

    // College selection
    selectedCollege,
    setSelectedCollege,

    // Grade/semester selection
    selectedGradeLevel,
    setSelectedGradeLevel: handleGradeLevelChange,
    selectedSemester,
    setSelectedSemester: handleSemesterChange,

    // GPA profiles
    activeProfiles,
    collegeUsesStandardGPA,

    // Boost customization
    customBoosts,
    setCustomBoosts,

    // Results
    semesterResults,
    cumulativeResults,

    // Semester management (override addSemester/removeSemester)
    ...semesterManager,
    addSemester: addSemesterWithCourses,
    removeSemester: removeSemesterWithCourses,
  };
}
