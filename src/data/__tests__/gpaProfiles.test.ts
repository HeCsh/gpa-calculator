import { describe, it, expect } from "vitest";
import {
  GPA_PROFILES,
  DEFAULT_PROFILES,
  getProfilesForSystem,
} from "@/data/gpaProfiles";

describe("GPA_PROFILES", () => {
  const profileIds = Object.keys(GPA_PROFILES);
  const profiles = Object.values(GPA_PROFILES);

  it("should have at least one profile defined", () => {
    expect(profileIds.length).toBeGreaterThan(0);
  });

  it("should have matching keys and IDs", () => {
    for (const [key, profile] of Object.entries(GPA_PROFILES)) {
      expect(profile.id).toBe(key);
    }
  });

  it("should have all required fields on every profile", () => {
    for (const profile of profiles) {
      expect(profile).toHaveProperty("id");
      expect(profile).toHaveProperty("name");
      expect(profile).toHaveProperty("shortName");
      expect(profile).toHaveProperty("description");
      expect(profile).toHaveProperty("gradeScale");
      expect(profile).toHaveProperty("boostSystem");
      expect(profile).toHaveProperty("maxGPA");
      expect(profile).toHaveProperty("allowsPlusMinus");

      expect(typeof profile.id).toBe("string");
      expect(typeof profile.name).toBe("string");
      expect(typeof profile.shortName).toBe("string");
      expect(typeof profile.description).toBe("string");
      expect(typeof profile.maxGPA).toBe("number");
      expect(typeof profile.allowsPlusMinus).toBe("boolean");
    }
  });

  it("should have non-empty string fields", () => {
    for (const profile of profiles) {
      expect(profile.id.length).toBeGreaterThan(0);
      expect(profile.name.length).toBeGreaterThan(0);
      expect(profile.shortName.length).toBeGreaterThan(0);
      expect(profile.description.length).toBeGreaterThan(0);
    }
  });

  it("should have valid maxGPA values", () => {
    for (const profile of profiles) {
      expect(profile.maxGPA).toBeGreaterThan(0);
      expect(profile.maxGPA).toBeLessThanOrEqual(5.0);
    }
  });

  it("should contain standard-unweighted and standard-weighted profiles", () => {
    expect(GPA_PROFILES["standard-unweighted"]).toBeDefined();
    expect(GPA_PROFILES["standard-weighted"]).toBeDefined();
  });

  it("should contain UC profile variants", () => {
    expect(GPA_PROFILES["uc-capped"]).toBeDefined();
    expect(GPA_PROFILES["uc-uncapped"]).toBeDefined();
    expect(GPA_PROFILES["uc-unweighted"]).toBeDefined();
  });

  it("should have unweighted profiles with maxGPA of 4.0", () => {
    expect(GPA_PROFILES["standard-unweighted"].maxGPA).toBe(4.0);
    expect(GPA_PROFILES["uc-unweighted"].maxGPA).toBe(4.0);
  });

  it("should have weighted profiles with maxGPA of 5.0", () => {
    expect(GPA_PROFILES["standard-weighted"].maxGPA).toBe(5.0);
    expect(GPA_PROFILES["uc-capped"].maxGPA).toBe(5.0);
    expect(GPA_PROFILES["uc-uncapped"].maxGPA).toBe(5.0);
  });

  it("should have standard profiles that allow plus/minus grades", () => {
    expect(GPA_PROFILES["standard-unweighted"].allowsPlusMinus).toBe(true);
    expect(GPA_PROFILES["standard-weighted"].allowsPlusMinus).toBe(true);
  });

  it("should have UC profiles that do not allow plus/minus grades", () => {
    expect(GPA_PROFILES["uc-capped"].allowsPlusMinus).toBe(false);
    expect(GPA_PROFILES["uc-uncapped"].allowsPlusMinus).toBe(false);
    expect(GPA_PROFILES["uc-unweighted"].allowsPlusMinus).toBe(false);
  });
});

describe("UC profile special rules", () => {
  it("should have specialRules on uc-capped profile", () => {
    const ucCapped = GPA_PROFILES["uc-capped"];
    expect(ucCapped.specialRules).toBeDefined();
    expect(ucCapped.specialRules!.maxHonorsSemesters).toBe(8);
    expect(ucCapped.specialRules!.maxHonorsFrom10thGrade).toBe(4);
    expect(ucCapped.specialRules!.ignorePlusMinus).toBe(true);
    expect(ucCapped.specialRules!.aGCoursesOnly).toBe(true);
  });

  it("should have specialRules on uc-uncapped profile without honor caps", () => {
    const ucUncapped = GPA_PROFILES["uc-uncapped"];
    expect(ucUncapped.specialRules).toBeDefined();
    expect(ucUncapped.specialRules!.ignorePlusMinus).toBe(true);
    expect(ucUncapped.specialRules!.aGCoursesOnly).toBe(true);
    // uc-uncapped should not have maxHonorsSemesters
    expect(ucUncapped.specialRules!.maxHonorsSemesters).toBeUndefined();
  });

  it("should not have specialRules on standard profiles", () => {
    expect(GPA_PROFILES["standard-unweighted"].specialRules).toBeUndefined();
    expect(GPA_PROFILES["standard-weighted"].specialRules).toBeUndefined();
  });
});

describe("DEFAULT_PROFILES", () => {
  it("should be an array of two profiles", () => {
    expect(DEFAULT_PROFILES).toHaveLength(2);
  });

  it("should contain standard-unweighted and standard-weighted", () => {
    const ids = DEFAULT_PROFILES.map((p) => p.id);
    expect(ids).toContain("standard-unweighted");
    expect(ids).toContain("standard-weighted");
  });
});

describe("getProfilesForSystem", () => {
  it("should return UC profiles for 'uc' system", () => {
    const ucProfiles = getProfilesForSystem("uc");
    const ids = ucProfiles.map((p) => p.id);
    expect(ids).toContain("uc-capped");
    expect(ids).toContain("uc-uncapped");
    expect(ids).toContain("uc-unweighted");
    expect(ids).toContain("standard-unweighted");
  });

  it("should return standard profiles for 'csu' system", () => {
    const csuProfiles = getProfilesForSystem("csu");
    const ids = csuProfiles.map((p) => p.id);
    expect(ids).toContain("standard-weighted");
    expect(ids).toContain("standard-unweighted");
  });

  it("should return standard profiles for default/generic system", () => {
    const genericProfiles = getProfilesForSystem("generic");
    const ids = genericProfiles.map((p) => p.id);
    expect(ids).toContain("standard-unweighted");
    expect(ids).toContain("standard-weighted");
  });

  it("should return standard profiles for unknown system", () => {
    const unknownProfiles = getProfilesForSystem("unknown");
    const ids = unknownProfiles.map((p) => p.id);
    expect(ids).toContain("standard-unweighted");
    expect(ids).toContain("standard-weighted");
  });

  it("should always return non-empty arrays", () => {
    expect(getProfilesForSystem("uc").length).toBeGreaterThan(0);
    expect(getProfilesForSystem("csu").length).toBeGreaterThan(0);
    expect(getProfilesForSystem("generic").length).toBeGreaterThan(0);
    expect(getProfilesForSystem("unknown").length).toBeGreaterThan(0);
  });
});
