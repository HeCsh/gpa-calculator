"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Semester } from "@/lib/gpa/types";

interface SemesterTabsProps {
  semesters: Semester[];
  activeSemesterId: string;
  onSelect: (id: string) => void;
  onAdd: (name: string, gradeLevel?: Semester["gradeLevel"]) => void;
  onRemove: (id: string) => void;
}

const GRADE_ORDER = ["9", "10", "11", "12"];
const GRADE_LABELS: Record<string, string> = {
  "9": "9th Grade",
  "10": "10th Grade",
  "11": "11th Grade",
  "12": "12th Grade",
};

const SHORT_LABELS: Record<string, string> = {
  "9": "9th",
  "10": "10th",
  "11": "11th",
  "12": "12th",
};

// All 8 possible semesters in chronological order
const ALL_SEMESTERS = GRADE_ORDER.flatMap((g) => [
  { name: `${SHORT_LABELS[g]} Gr, Sem-1`, gradeLevel: g },
  { name: `${SHORT_LABELS[g]} Gr, Sem-2`, gradeLevel: g },
]);

function getNextSemester(
  semesters: Semester[]
): { name: string; gradeLevel: Semester["gradeLevel"] } | null {
  // Collect all existing semester names
  const existingNames = new Set(semesters.map((s) => s.name));

  if (existingNames.size >= 8) {
    return null; // All 8 semesters exist
  }

  // Find the last semester and try to continue chronologically from there
  const last = semesters[semesters.length - 1];
  const lastIdx = ALL_SEMESTERS.findIndex((s) => s.name === last?.name);

  // Search forward from after the last semester, then wrap around
  for (let i = 1; i <= ALL_SEMESTERS.length; i++) {
    const candidate = ALL_SEMESTERS[(lastIdx + i) % ALL_SEMESTERS.length];
    if (!existingNames.has(candidate.name)) {
      return {
        name: candidate.name,
        gradeLevel: candidate.gradeLevel as Semester["gradeLevel"],
      };
    }
  }

  // If no match by name (e.g. custom-named semesters), find any missing slot
  for (const slot of ALL_SEMESTERS) {
    if (!existingNames.has(slot.name)) {
      return {
        name: slot.name,
        gradeLevel: slot.gradeLevel as Semester["gradeLevel"],
      };
    }
  }

  return null;
}

export function SemesterTabs({
  semesters,
  activeSemesterId,
  onSelect,
  onAdd,
  onRemove,
}: SemesterTabsProps) {
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    const next = getNextSemester(semesters);
    if (!next) {
      setError("All 8 semesters (9th–12th grade) have been added.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    setError(null);
    onAdd(next.name, next.gradeLevel);
  };

  // Ensure the active ID matches an existing semester to avoid Tabs errors
  const safeActiveId =
    semesters.some((s) => s.id === activeSemesterId)
      ? activeSemesterId
      : semesters[0]?.id ?? "";

  return (
    <div>
      <div className="flex items-center gap-2">
        <Tabs value={safeActiveId} onValueChange={onSelect} className="min-w-0">
          <TabsList className="h-auto justify-start overflow-x-auto flex-nowrap w-auto">
            {semesters.map((sem) => (
              <TabsTrigger
                key={sem.id}
                value={sem.id}
                className="flex items-center gap-1 text-xs whitespace-nowrap shrink-0"
              >
                {sem.name}
                {semesters.length > 1 && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onRemove(sem.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        e.preventDefault();
                        onRemove(sem.id);
                      }
                    }}
                    className="ml-1 opacity-50 hover:opacity-100 inline-flex"
                  >
                    <X className="h-3 w-3" />
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button variant="ghost" size="sm" onClick={handleAdd} className="shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
}
