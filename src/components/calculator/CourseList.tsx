"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course, GradeLetter, CourseType } from "@/lib/gpa/types";
import { CourseEntry } from "./CourseEntry";

interface CourseListProps {
  courses: Course[];
  semesterId: string;
  gradeLevel?: string;
  onAdd: (course: Omit<Course, "id">) => void;
  onUpdate: (id: string, updates: Partial<Course>) => void;
  onRemove: (id: string) => void;
  showAG?: boolean;
}

export function CourseList({
  courses,
  semesterId,
  gradeLevel,
  onAdd,
  onUpdate,
  onRemove,
  showAG = false,
}: CourseListProps) {
  const handleAddCourse = () => {
    onAdd({
      name: "",
      grade: "A" as GradeLetter,
      courseType: "Regular" as CourseType,
      credits: 1,
      semesterId,
      isAG: true,
      gradeLevel: (gradeLevel as Course["gradeLevel"]) || undefined,
    });
  };

  return (
    <div>
      {/* Header row */}
      <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-2 border-b">
        <div className={showAG ? "col-span-3" : "col-span-4"}>
          Course
        </div>
        <div className="col-span-2">Grade</div>
        <div className="col-span-3">Type</div>
        <div className="col-span-1">Credits</div>
        {showAG && <div className="col-span-1 text-center">a-g</div>}
        <div className={showAG ? "col-span-1" : "col-span-2"} />
      </div>

      {/* Course rows */}
      {courses.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          No courses added yet. Click the button below to add your first course.
        </div>
      ) : (
        courses.map((course) => (
          <CourseEntry
            key={course.id}
            course={course}
            onUpdate={(updates) => onUpdate(course.id, updates)}
            onRemove={() => onRemove(course.id)}
            showAG={showAG}
          />
        ))
      )}

      <Button
        onClick={handleAddCourse}
        variant="outline"
        className="mt-4 w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Course
      </Button>
    </div>
  );
}
