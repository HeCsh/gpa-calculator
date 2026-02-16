export interface CollegeRequirement {
  name: string;
  avgGPA: number;
  acceptanceRate: number;
  tier: "ivy" | "top20" | "top50" | "flagship" | "state";
}

export const COLLEGE_REQUIREMENTS: CollegeRequirement[] = [
  // Ivy League
  { name: "Harvard University", avgGPA: 3.97, acceptanceRate: 3.2, tier: "ivy" },
  { name: "Yale University", avgGPA: 3.95, acceptanceRate: 4.4, tier: "ivy" },
  { name: "Princeton University", avgGPA: 3.96, acceptanceRate: 3.5, tier: "ivy" },
  { name: "Columbia University", avgGPA: 3.94, acceptanceRate: 3.9, tier: "ivy" },
  { name: "University of Pennsylvania", avgGPA: 3.93, acceptanceRate: 5.4, tier: "ivy" },
  { name: "Brown University", avgGPA: 3.92, acceptanceRate: 5.0, tier: "ivy" },
  { name: "Dartmouth College", avgGPA: 3.91, acceptanceRate: 6.2, tier: "ivy" },
  { name: "Cornell University", avgGPA: 3.89, acceptanceRate: 7.3, tier: "ivy" },

  // Top 20
  { name: "Stanford University", avgGPA: 3.96, acceptanceRate: 3.7, tier: "top20" },
  { name: "MIT", avgGPA: 3.96, acceptanceRate: 3.9, tier: "top20" },
  { name: "Caltech", avgGPA: 3.97, acceptanceRate: 3.2, tier: "top20" },
  { name: "Duke University", avgGPA: 3.94, acceptanceRate: 5.0, tier: "top20" },
  { name: "Northwestern University", avgGPA: 3.92, acceptanceRate: 5.6, tier: "top20" },
  { name: "Johns Hopkins University", avgGPA: 3.91, acceptanceRate: 6.5, tier: "top20" },
  { name: "Rice University", avgGPA: 3.91, acceptanceRate: 7.7, tier: "top20" },
  { name: "Vanderbilt University", avgGPA: 3.90, acceptanceRate: 5.6, tier: "top20" },
  { name: "University of Chicago", avgGPA: 3.93, acceptanceRate: 5.2, tier: "top20" },
  { name: "Georgetown University", avgGPA: 3.89, acceptanceRate: 12.0, tier: "top20" },
  { name: "Emory University", avgGPA: 3.88, acceptanceRate: 11.0, tier: "top20" },
  { name: "Carnegie Mellon University", avgGPA: 3.89, acceptanceRate: 11.0, tier: "top20" },
  { name: "University of Notre Dame", avgGPA: 3.89, acceptanceRate: 12.0, tier: "top20" },
  { name: "Washington University in St. Louis", avgGPA: 3.90, acceptanceRate: 10.0, tier: "top20" },

  // Top 50
  { name: "UC Berkeley", avgGPA: 3.89, acceptanceRate: 11.6, tier: "top50" },
  { name: "UCLA", avgGPA: 3.90, acceptanceRate: 8.6, tier: "top50" },
  { name: "University of Michigan", avgGPA: 3.86, acceptanceRate: 15.0, tier: "top50" },
  { name: "University of Virginia", avgGPA: 3.85, acceptanceRate: 16.3, tier: "top50" },
  { name: "Georgia Tech", avgGPA: 3.85, acceptanceRate: 16.0, tier: "top50" },
  { name: "NYU", avgGPA: 3.80, acceptanceRate: 12.2, tier: "top50" },
  { name: "UNC Chapel Hill", avgGPA: 3.82, acceptanceRate: 17.0, tier: "top50" },
  { name: "Boston University", avgGPA: 3.75, acceptanceRate: 14.0, tier: "top50" },
  { name: "Tufts University", avgGPA: 3.85, acceptanceRate: 10.0, tier: "top50" },
  { name: "UC San Diego", avgGPA: 3.82, acceptanceRate: 24.0, tier: "top50" },
  { name: "UC Santa Barbara", avgGPA: 3.78, acceptanceRate: 26.0, tier: "top50" },
  { name: "UC Davis", avgGPA: 3.75, acceptanceRate: 37.0, tier: "top50" },
  { name: "UC Irvine", avgGPA: 3.76, acceptanceRate: 21.0, tier: "top50" },
  { name: "University of Florida", avgGPA: 3.79, acceptanceRate: 23.0, tier: "top50" },
  { name: "University of Wisconsin-Madison", avgGPA: 3.75, acceptanceRate: 43.0, tier: "top50" },
  { name: "University of Illinois Urbana-Champaign", avgGPA: 3.73, acceptanceRate: 43.0, tier: "top50" },

  // Flagship State Schools
  { name: "Penn State University", avgGPA: 3.55, acceptanceRate: 55.0, tier: "flagship" },
  { name: "Ohio State University", avgGPA: 3.60, acceptanceRate: 53.0, tier: "flagship" },
  { name: "University of Texas at Austin", avgGPA: 3.70, acceptanceRate: 29.0, tier: "flagship" },
  { name: "University of Minnesota", avgGPA: 3.55, acceptanceRate: 60.0, tier: "flagship" },
  { name: "University of Washington", avgGPA: 3.72, acceptanceRate: 44.0, tier: "flagship" },
  { name: "Purdue University", avgGPA: 3.55, acceptanceRate: 53.0, tier: "flagship" },
  { name: "Indiana University", avgGPA: 3.45, acceptanceRate: 73.0, tier: "flagship" },
  { name: "University of Arizona", avgGPA: 3.35, acceptanceRate: 84.0, tier: "flagship" },
  { name: "Arizona State University", avgGPA: 3.30, acceptanceRate: 88.0, tier: "flagship" },

  // State
  { name: "San Diego State University", avgGPA: 3.50, acceptanceRate: 34.0, tier: "state" },
  { name: "San Jose State University", avgGPA: 3.30, acceptanceRate: 62.0, tier: "state" },
  { name: "Cal Poly San Luis Obispo", avgGPA: 3.75, acceptanceRate: 28.0, tier: "state" },
  { name: "CSU Long Beach", avgGPA: 3.40, acceptanceRate: 37.0, tier: "state" },
  { name: "CSU Fullerton", avgGPA: 3.30, acceptanceRate: 48.0, tier: "state" },
];
