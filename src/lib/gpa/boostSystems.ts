import type { BoostSystem } from "./types";

// No boosts — all courses treated equally
export const UNWEIGHTED_BOOST: BoostSystem = {
  Regular: 0.0,
  Honors: 0.0,
  AP: 0.0,
  IB_HL: 0.0,
  IB_SL: 0.0,
  "Dual Enrollment": 0.0,
};

// Standard weighted (5.0 max)
export const STANDARD_WEIGHTED_BOOST: BoostSystem = {
  Regular: 0.0,
  Honors: 0.5,
  AP: 1.0,
  IB_HL: 1.0,
  IB_SL: 0.5,
  "Dual Enrollment": 0.5,
};

// UC honors boost (+1 for eligible advanced courses)
export const UC_HONORS_BOOST: BoostSystem = {
  Regular: 0.0,
  Honors: 1.0,
  AP: 1.0,
  IB_HL: 1.0,
  IB_SL: 0.0,
  "Dual Enrollment": 1.0,
};
