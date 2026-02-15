import type { GPAProfile } from "@/lib/gpa/types";
import { STANDARD_SCALE, UC_SCALE } from "@/lib/gpa/gradeScales";
import {
  UNWEIGHTED_BOOST,
  STANDARD_WEIGHTED_BOOST,
  UC_HONORS_BOOST,
} from "@/lib/gpa/boostSystems";

export const GPA_PROFILES: Record<string, GPAProfile> = {
  "standard-unweighted": {
    id: "standard-unweighted",
    name: "Standard Unweighted GPA",
    shortName: "Unweighted",
    description:
      "The traditional 4.0 scale. All courses are treated equally regardless of difficulty. An A is always worth 4.0 points, whether the course is Regular or AP.",
    gradeScale: STANDARD_SCALE,
    boostSystem: UNWEIGHTED_BOOST,
    maxGPA: 4.0,
    allowsPlusMinus: true,
  },

  "standard-weighted": {
    id: "standard-weighted",
    name: "Standard Weighted GPA",
    shortName: "Weighted",
    description:
      "A 5.0 scale that rewards students for taking challenging courses. Honors courses add +0.5 to your grade points, while AP and IB Higher Level courses add +1.0. This means an A in an AP class is worth 5.0 instead of 4.0.",
    gradeScale: STANDARD_SCALE,
    boostSystem: STANDARD_WEIGHTED_BOOST,
    maxGPA: 5.0,
    allowsPlusMinus: true,
  },

  "uc-capped": {
    id: "uc-capped",
    name: "UC Capped Weighted GPA",
    shortName: "UC Capped",
    description:
      'The primary GPA used by University of California admissions. It adds +1.0 for honors-level courses but caps the total at 8 semesters of extra points (max 4 from 10th grade). Only "a-g" approved courses count, and +/- grades are ignored (A- counts the same as A).',
    gradeScale: UC_SCALE,
    boostSystem: UC_HONORS_BOOST,
    maxGPA: 5.0,
    allowsPlusMinus: false,
    specialRules: {
      maxHonorsSemesters: 8,
      maxHonorsFrom10thGrade: 4,
      ignorePlusMinus: true,
      aGCoursesOnly: true,
    },
  },

  "uc-uncapped": {
    id: "uc-uncapped",
    name: "UC Uncapped Weighted GPA",
    shortName: "UC Uncapped",
    description:
      "Similar to UC Capped but with no limit on the number of honors points. Every eligible honors-level course gets +1.0, with no cap. Still only counts a-g courses and ignores +/- grades.",
    gradeScale: UC_SCALE,
    boostSystem: UC_HONORS_BOOST,
    maxGPA: 5.0,
    allowsPlusMinus: false,
    specialRules: {
      ignorePlusMinus: true,
      aGCoursesOnly: true,
    },
  },

  "uc-unweighted": {
    id: "uc-unweighted",
    name: "UC Unweighted GPA",
    shortName: "UC Unweighted",
    description:
      "The UC unweighted GPA uses a simple 4.0 scale with no course-type boosts and no +/- distinctions. A- and A+ both count as 4.0.",
    gradeScale: UC_SCALE,
    boostSystem: UNWEIGHTED_BOOST,
    maxGPA: 4.0,
    allowsPlusMinus: false,
  },
};

export const DEFAULT_PROFILES = [
  GPA_PROFILES["standard-unweighted"],
  GPA_PROFILES["standard-weighted"],
];

export function getProfilesForSystem(system: string): GPAProfile[] {
  switch (system) {
    case "uc":
      return [
        GPA_PROFILES["uc-capped"],
        GPA_PROFILES["uc-uncapped"],
        GPA_PROFILES["uc-unweighted"],
        GPA_PROFILES["standard-unweighted"],
      ];
    case "csu":
      return [
        GPA_PROFILES["standard-weighted"],
        GPA_PROFILES["standard-unweighted"],
      ];
    default:
      return [
        GPA_PROFILES["standard-unweighted"],
        GPA_PROFILES["standard-weighted"],
      ];
  }
}
