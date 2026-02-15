import type { GPAProfile } from "@/lib/gpa/types";
import { GPA_PROFILES, getProfilesForSystem } from "./gpaProfiles";

// Maps college system affiliations to relevant GPA profiles
const SYSTEM_PROFILE_MAP: Record<string, string[]> = {
  uc: ["uc-capped", "uc-uncapped", "uc-unweighted", "standard-unweighted"],
  csu: ["standard-weighted", "standard-unweighted"],
  ivy: ["standard-unweighted", "standard-weighted"],
  generic: ["standard-unweighted", "standard-weighted"],
};

// Per-college overrides (college id → profile ids)
const COLLEGE_OVERRIDES: Record<string, string[]> = {
  // Add specific overrides here as needed, e.g.:
  // "mit": ["standard-unweighted"],
};

export function getProfilesForCollege(
  collegeId: string,
  system: string
): GPAProfile[] {
  // Check for per-college override first
  const overrideIds = COLLEGE_OVERRIDES[collegeId];
  if (overrideIds) {
    return overrideIds
      .map((id) => GPA_PROFILES[id])
      .filter(Boolean);
  }

  // Fall back to system-level mapping
  return getProfilesForSystem(system);
}

export function getPrimaryProfileForSystem(system: string): GPAProfile {
  const profileIds = SYSTEM_PROFILE_MAP[system] || SYSTEM_PROFILE_MAP.generic;
  return GPA_PROFILES[profileIds[0]];
}
