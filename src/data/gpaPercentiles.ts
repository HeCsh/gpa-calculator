/**
 * National GPA Percentile Lookup Tables
 *
 * Sources:
 * - NCES 2019 NAEP High School Transcript Study (nces.ed.gov)
 * - ACT National Graduating Class Profile Report 2024 (act.org)
 * - College Board / BigFuture GPA data (collegeboard.org)
 *
 * National average unweighted GPA ≈ 3.0 (B average)
 * Distribution is slightly left-skewed due to 4.0 ceiling and grade inflation.
 */

// Unweighted GPA (4.0 scale) → national percentile
// Keyed at every 0.1 increment; interpolated between known anchor points
const UNWEIGHTED_PERCENTILES: [number, number][] = [
  [4.0, 98],
  [3.9, 96],
  [3.8, 93],
  [3.7, 90],
  [3.6, 87],
  [3.5, 83],
  [3.4, 79],
  [3.3, 75],
  [3.2, 70],
  [3.1, 65],
  [3.0, 58],
  [2.9, 52],
  [2.8, 46],
  [2.7, 40],
  [2.6, 35],
  [2.5, 30],
  [2.4, 25],
  [2.3, 21],
  [2.2, 17],
  [2.1, 14],
  [2.0, 11],
  [1.9, 9],
  [1.8, 7],
  [1.7, 6],
  [1.6, 5],
  [1.5, 4],
  [1.0, 2],
  [0.5, 1],
  [0.0, 0],
];

// Weighted GPA (5.0 scale) → national percentile
// Average weighted GPA ≈ 3.38; wider spread due to boost points
const WEIGHTED_PERCENTILES: [number, number][] = [
  [5.0, 99],
  [4.8, 98],
  [4.6, 97],
  [4.4, 96],
  [4.2, 94],
  [4.0, 90],
  [3.8, 84],
  [3.6, 75],
  [3.4, 64],
  [3.2, 52],
  [3.0, 40],
  [2.8, 30],
  [2.6, 22],
  [2.4, 15],
  [2.2, 10],
  [2.0, 6],
  [1.5, 3],
  [1.0, 1],
  [0.0, 0],
];

function interpolate(table: [number, number][], gpa: number): number {
  if (gpa >= table[0][0]) return table[0][1];
  if (gpa <= table[table.length - 1][0]) return table[table.length - 1][1];

  for (let i = 0; i < table.length - 1; i++) {
    const [hiGPA, hiPct] = table[i];
    const [loGPA, loPct] = table[i + 1];
    if (gpa <= hiGPA && gpa >= loGPA) {
      const ratio = (gpa - loGPA) / (hiGPA - loGPA);
      return Math.round(loPct + ratio * (hiPct - loPct));
    }
  }
  return 0;
}

/**
 * Returns the estimated national percentile for an unweighted GPA (4.0 scale).
 */
export function getUnweightedPercentile(gpa: number): number {
  return interpolate(UNWEIGHTED_PERCENTILES, gpa);
}

/**
 * Returns the estimated national percentile for a weighted GPA (5.0 scale).
 */
export function getWeightedPercentile(gpa: number): number {
  return interpolate(WEIGHTED_PERCENTILES, gpa);
}

/**
 * Returns the percentile for a given profile ID and GPA, or null if not applicable.
 */
export function getPercentileForProfile(
  profileId: string,
  gpa: number
): number | null {
  if (profileId === "standard-unweighted") {
    return getUnweightedPercentile(gpa);
  }
  if (profileId === "standard-weighted") {
    return getWeightedPercentile(gpa);
  }
  return null;
}
