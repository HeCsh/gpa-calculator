"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GRADE_LEVELS, SEMESTERS } from "@/data/defaultCourses";

interface GradeSemesterSelectorProps {
  gradeLevel: string;
  semester: string;
  onGradeLevelChange: (value: string) => void;
  onSemesterChange: (value: string) => void;
}

export function GradeSemesterSelector({
  gradeLevel,
  semester,
  onGradeLevelChange,
  onSemesterChange,
}: GradeSemesterSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 space-y-2">
        <label className="text-sm font-medium">Grade Level</label>
        <Select value={gradeLevel} onValueChange={onGradeLevelChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GRADE_LEVELS.map((gl) => (
              <SelectItem key={gl.value} value={gl.value}>
                {gl.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 space-y-2">
        <label className="text-sm font-medium">Semester</label>
        <Select value={semester} onValueChange={onSemesterChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SEMESTERS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
