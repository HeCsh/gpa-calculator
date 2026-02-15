import type { CourseType, GradeLetter } from "@/lib/gpa/types";

interface DefaultCourse {
  name: string;
  courseType: CourseType;
  credits: number;
  isAG: boolean;
}

// Popular courses by grade level and semester
// Based on typical US high school schedules
const DEFAULT_COURSES: Record<string, DefaultCourse[]> = {
  // 9th Grade
  "9-1": [
    { name: "English 9", courseType: "Regular", credits: 1, isAG: true },
    { name: "Algebra 1", courseType: "Regular", credits: 1, isAG: true },
    { name: "Biology", courseType: "Regular", credits: 1, isAG: true },
    { name: "World History", courseType: "Regular", credits: 1, isAG: true },
    { name: "Spanish 1", courseType: "Regular", credits: 1, isAG: true },
    { name: "PE", courseType: "Regular", credits: 1, isAG: false },
  ],
  "9-2": [
    { name: "English 9", courseType: "Regular", credits: 1, isAG: true },
    { name: "Algebra 1", courseType: "Regular", credits: 1, isAG: true },
    { name: "Biology", courseType: "Regular", credits: 1, isAG: true },
    { name: "World History", courseType: "Regular", credits: 1, isAG: true },
    { name: "Spanish 1", courseType: "Regular", credits: 1, isAG: true },
    { name: "PE", courseType: "Regular", credits: 1, isAG: false },
  ],

  // 10th Grade
  "10-1": [
    { name: "English 10", courseType: "Regular", credits: 1, isAG: true },
    { name: "Geometry", courseType: "Regular", credits: 1, isAG: true },
    { name: "Chemistry", courseType: "Regular", credits: 1, isAG: true },
    { name: "US History", courseType: "Regular", credits: 1, isAG: true },
    { name: "Spanish 2", courseType: "Regular", credits: 1, isAG: true },
    { name: "Art", courseType: "Regular", credits: 1, isAG: true },
  ],
  "10-2": [
    { name: "English 10", courseType: "Regular", credits: 1, isAG: true },
    { name: "Geometry", courseType: "Regular", credits: 1, isAG: true },
    { name: "Chemistry", courseType: "Regular", credits: 1, isAG: true },
    { name: "US History", courseType: "Regular", credits: 1, isAG: true },
    { name: "Spanish 2", courseType: "Regular", credits: 1, isAG: true },
    { name: "Art", courseType: "Regular", credits: 1, isAG: true },
  ],

  // 11th Grade
  "11-1": [
    { name: "AP English Language", courseType: "AP", credits: 1, isAG: true },
    { name: "Algebra 2 / Trigonometry", courseType: "Regular", credits: 1, isAG: true },
    { name: "AP US History", courseType: "AP", credits: 1, isAG: true },
    { name: "Physics", courseType: "Regular", credits: 1, isAG: true },
    { name: "Spanish 3", courseType: "Regular", credits: 1, isAG: true },
    { name: "Elective", courseType: "Regular", credits: 1, isAG: true },
  ],
  "11-2": [
    { name: "AP English Language", courseType: "AP", credits: 1, isAG: true },
    { name: "Algebra 2 / Trigonometry", courseType: "Regular", credits: 1, isAG: true },
    { name: "AP US History", courseType: "AP", credits: 1, isAG: true },
    { name: "Physics", courseType: "Regular", credits: 1, isAG: true },
    { name: "Spanish 3", courseType: "Regular", credits: 1, isAG: true },
    { name: "Elective", courseType: "Regular", credits: 1, isAG: true },
  ],

  // 12th Grade
  "12-1": [
    { name: "AP English Literature", courseType: "AP", credits: 1, isAG: true },
    { name: "Pre-Calculus", courseType: "Regular", credits: 1, isAG: true },
    { name: "AP Government", courseType: "AP", credits: 1, isAG: true },
    { name: "AP Biology", courseType: "AP", credits: 1, isAG: true },
    { name: "Spanish 4", courseType: "Honors", credits: 1, isAG: true },
    { name: "Elective", courseType: "Regular", credits: 1, isAG: true },
  ],
  "12-2": [
    { name: "AP English Literature", courseType: "AP", credits: 1, isAG: true },
    { name: "Pre-Calculus", courseType: "Regular", credits: 1, isAG: true },
    { name: "AP Economics", courseType: "AP", credits: 1, isAG: true },
    { name: "AP Biology", courseType: "AP", credits: 1, isAG: true },
    { name: "Spanish 4", courseType: "Honors", credits: 1, isAG: true },
    { name: "Elective", courseType: "Regular", credits: 1, isAG: true },
  ],
};

export function getDefaultCourses(
  gradeLevel: string,
  semester: string
): DefaultCourse[] {
  const key = `${gradeLevel}-${semester}`;
  return DEFAULT_COURSES[key] || DEFAULT_COURSES["9-1"];
}

export const GRADE_LEVELS = [
  { value: "9", label: "9th Grade (Freshman)" },
  { value: "10", label: "10th Grade (Sophomore)" },
  { value: "11", label: "11th Grade (Junior)" },
  { value: "12", label: "12th Grade (Senior)" },
];

export const SEMESTERS = [
  { value: "1", label: "Semester 1" },
  { value: "2", label: "Semester 2" },
];
