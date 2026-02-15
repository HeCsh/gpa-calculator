"use client";

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

export function SemesterTabs({
  semesters,
  activeSemesterId,
  onSelect,
  onAdd,
  onRemove,
}: SemesterTabsProps) {
  const handleAdd = () => {
    const num = semesters.length + 1;
    onAdd(`Semester ${num}`);
  };

  // Ensure the active ID matches an existing semester to avoid Tabs errors
  const safeActiveId =
    semesters.some((s) => s.id === activeSemesterId)
      ? activeSemesterId
      : semesters[0]?.id ?? "";

  return (
    <div className="flex items-center gap-2">
      <Tabs value={safeActiveId} onValueChange={onSelect} className="flex-1">
        <TabsList className="h-auto flex-wrap justify-start">
          {semesters.map((sem) => (
            <TabsTrigger
              key={sem.id}
              value={sem.id}
              className="flex items-center gap-1 text-xs"
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
  );
}
