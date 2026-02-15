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
import { calculateMultipleGPAs } from "@/lib/gpa/calculator";
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

  // Re-populate when grade/semester changes
  const repopulateCourses = useCallback(
    (gradeLevel: string, semester: string) => {
      const defaults = getDefaultCourses(gradeLevel, semester);
      const newCourses: Course[] = defaults.map((dc) => ({
        id: nanoid(8),
        name: dc.name,
        grade: "A" as const,
        courseType: dc.courseType,
        credits: dc.credits,
        semesterId: semesterManager.activeSemesterId,
        isAG: dc.isAG,
        gradeLevel: gradeLevel as Course["gradeLevel"],
      }));
      // Replace courses for the active semester only
      setCourses((prev) => [
        ...prev.filter((c) => c.semesterId !== semesterManager.activeSemesterId),
        ...newCourses,
      ]);
    },
    [semesterManager.activeSemesterId, setCourses]
  );

  const gradeLabelMap: Record<string, string> = {
    "9": "9th Grade",
    "10": "10th Grade",
    "11": "11th Grade",
    "12": "12th Grade",
  };

  const handleGradeLevelChange = useCallback(
    (gradeLevel: string) => {
      setSelectedGradeLevel(gradeLevel);
      semesterManager.updateSemester(semesterManager.activeSemesterId, {
        name: `${gradeLabelMap[gradeLevel] ?? gradeLevel} — Sem ${selectedSemester}`,
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
        name: `${gradeLabelMap[selectedGradeLevel] ?? selectedGradeLevel} — Sem ${semester}`,
      });
      repopulateCourses(selectedGradeLevel, semester);
    },
    [setSelectedSemester, selectedGradeLevel, repopulateCourses, semesterManager]
  );

  // Determine which GPA profiles to calculate based on selected college
  const activeProfiles: GPAProfile[] = useMemo(() => {
    if (selectedCollege) {
      return getProfilesForCollege(selectedCollege.id, selectedCollege.system);
    }
    return DEFAULT_PROFILES;
  }, [selectedCollege]);

  // Get courses for active semester
  const activeSemesterCourses = useMemo(
    () =>
      courses.filter(
        (c) => c.semesterId === semesterManager.activeSemesterId
      ),
    [courses, semesterManager.activeSemesterId]
  );

  // Calculate GPA for active semester
  const semesterResults: GPAResult[] = useMemo(() => {
    if (activeSemesterCourses.length === 0) return [];
    const boosts = Object.keys(customBoosts).length > 0 ? customBoosts : undefined;
    return calculateMultipleGPAs(activeSemesterCourses, activeProfiles, boosts);
  }, [activeSemesterCourses, activeProfiles, customBoosts]);

  // Calculate cumulative GPA (all courses)
  const cumulativeResults: GPAResult[] = useMemo(() => {
    if (courses.length === 0) return [];
    const boosts = Object.keys(customBoosts).length > 0 ? customBoosts : undefined;
    return calculateMultipleGPAs(courses, activeProfiles, boosts);
  }, [courses, activeProfiles, customBoosts]);

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

    // Boost customization
    customBoosts,
    setCustomBoosts,

    // Results
    semesterResults,
    cumulativeResults,

    // Semester management
    ...semesterManager,
  };
}
