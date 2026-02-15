export type GradeLetter =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "F";

export type CourseType =
  | "Regular"
  | "Honors"
  | "AP"
  | "IB_HL"
  | "IB_SL"
  | "Dual Enrollment";

export const COURSE_TYPES: CourseType[] = [
  "Regular",
  "Honors",
  "AP",
  "IB_HL",
  "IB_SL",
  "Dual Enrollment",
];

export const COURSE_TYPE_LABELS: Record<CourseType, string> = {
  Regular: "Regular",
  Honors: "Honors",
  AP: "AP",
  IB_HL: "IB Higher Level",
  IB_SL: "IB Standard Level",
  "Dual Enrollment": "Dual Enrollment",
};

export const GRADE_OPTIONS: GradeLetter[] = [
  "A+", "A", "A-",
  "B+", "B", "B-",
  "C+", "C", "C-",
  "D+", "D", "D-",
  "F",
];

export interface Course {
  id: string;
  name: string;
  grade: GradeLetter;
  courseType: CourseType;
  credits: number;
  semesterId: string;
  isAG?: boolean; // For UC: is this an A-G course?
  gradeLevel?: "9" | "10" | "11" | "12";
}

export type GradeScale = Record<GradeLetter, number>;

export type BoostSystem = Record<CourseType, number>;

export interface SpecialRules {
  maxHonorsSemesters?: number;
  maxHonorsFrom10thGrade?: number;
  ignorePlusMinus?: boolean;
  aGCoursesOnly?: boolean;
}

export interface GPAProfile {
  id: string;
  name: string;
  shortName: string;
  description: string;
  gradeScale: GradeScale;
  boostSystem: BoostSystem;
  specialRules?: SpecialRules;
  maxGPA: number;
  allowsPlusMinus: boolean;
}

export interface College {
  id: string;
  name: string;
  state: string;
  system: string; // e.g. "uc", "csu", "ivy", "generic"
}

export interface School {
  id: string;
  name: string;
  state: string;
  gpaProfileId: string;
}

export interface Semester {
  id: string;
  name: string;
  gradeLevel?: "9" | "10" | "11" | "12";
}

export interface CourseBreakdown {
  courseId: string;
  courseName: string;
  grade: GradeLetter;
  courseType: CourseType;
  basePoints: number;
  boost: number;
  finalPoints: number;
  credits: number;
  qualityPoints: number;
  excluded?: boolean;
  excludeReason?: string;
}

export interface GPAResult {
  gpa: number;
  profileId: string;
  profileName: string;
  totalCredits: number;
  totalQualityPoints: number;
  breakdown: CourseBreakdown[];
}
