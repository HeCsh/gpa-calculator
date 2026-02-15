"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Course, GradeLetter, CourseType } from "@/lib/gpa/types";
import { GRADE_OPTIONS, COURSE_TYPES, COURSE_TYPE_LABELS } from "@/lib/gpa/types";

interface CourseEntryProps {
  course: Course;
  onUpdate: (updates: Partial<Course>) => void;
  onRemove: () => void;
  showAG?: boolean;
}

export function CourseEntry({
  course,
  onUpdate,
  onRemove,
  showAG = false,
}: CourseEntryProps) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center py-2">
      <div className={showAG ? "col-span-3" : "col-span-4"}>
        <Input
          placeholder="Course name"
          value={course.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
        />
      </div>

      <div className="col-span-2">
        <Select
          value={course.grade}
          onValueChange={(v) => onUpdate({ grade: v as GradeLetter })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GRADE_OPTIONS.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-3">
        <Select
          value={course.courseType}
          onValueChange={(v) => onUpdate({ courseType: v as CourseType })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COURSE_TYPES.map((ct) => (
              <SelectItem key={ct} value={ct}>
                {COURSE_TYPE_LABELS[ct]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-1">
        <Input
          type="number"
          min={0.5}
          max={2}
          step={0.5}
          value={course.credits}
          onChange={(e) =>
            onUpdate({ credits: parseFloat(e.target.value) || 1 })
          }
          title="Credits"
        />
      </div>

      {showAG && (
        <div className="col-span-1 flex justify-center">
          <label className="flex items-center gap-1 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={course.isAG !== false}
              onChange={(e) => onUpdate({ isAG: e.target.checked })}
              className="rounded"
            />
            a-g
          </label>
        </div>
      )}

      <div className={showAG ? "col-span-1" : "col-span-2 flex justify-end"}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
