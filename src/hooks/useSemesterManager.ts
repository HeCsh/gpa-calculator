"use client";

import { useCallback } from "react";
import { nanoid } from "nanoid";
import type { Semester } from "@/lib/gpa/types";
import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_SEMESTERS: Semester[] = [
  { id: "sem-1", name: "9th Gr, Sem-1", gradeLevel: "9" },
];

export function useSemesterManager() {
  const [semesters, setSemesters] = useLocalStorage<Semester[]>(
    "gpa-semesters",
    DEFAULT_SEMESTERS
  );
  const [activeSemesterId, setActiveSemesterId] = useLocalStorage<string>(
    "gpa-active-semester",
    "sem-1"
  );

  const addSemester = useCallback(
    (name: string, gradeLevel?: Semester["gradeLevel"]) => {
      const newSemester: Semester = {
        id: nanoid(8),
        name,
        gradeLevel,
      };
      setSemesters((prev) => [...prev, newSemester]);
      setActiveSemesterId(newSemester.id);
      return newSemester;
    },
    [setSemesters, setActiveSemesterId]
  );

  const removeSemester = useCallback(
    (id: string) => {
      let fallbackId = "";
      setSemesters((prev) => {
        const filtered = prev.filter((s) => s.id !== id);
        if (filtered.length === 0) return prev; // Don't remove last semester
        fallbackId = filtered[0].id;
        return filtered;
      });
      setActiveSemesterId((prev) => {
        if (prev === id) {
          return fallbackId || prev;
        }
        return prev;
      });
    },
    [setSemesters, setActiveSemesterId]
  );

  const updateSemester = useCallback(
    (id: string, updates: Partial<Omit<Semester, "id">>) => {
      setSemesters((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    [setSemesters]
  );

  return {
    semesters,
    activeSemesterId,
    setActiveSemesterId,
    addSemester,
    removeSemester,
    updateSemester,
  };
}
