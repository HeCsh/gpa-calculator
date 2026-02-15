"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CollegeSearch } from "@/components/calculator/CollegeSearch";
import { GradeSemesterSelector } from "@/components/calculator/GradeSemesterSelector";
import { CourseList } from "@/components/calculator/CourseList";
import { GPAResults } from "@/components/calculator/GPAResults";
import { BoostEditor } from "@/components/calculator/BoostEditor";
import { GPAExplainer } from "@/components/calculator/GPAExplainer";
import { SemesterTabs } from "@/components/calculator/SemesterTabs";
import { useGPACalculator } from "@/hooks/useGPACalculator";

export default function CalculatorPage() {
  const {
    activeSemesterCourses,
    addCourse,
    removeCourse,
    updateCourse,
    selectedCollege,
    setSelectedCollege,
    selectedGradeLevel,
    setSelectedGradeLevel,
    selectedSemester,
    setSelectedSemester,
    activeProfiles,
    customBoosts,
    setCustomBoosts,
    semesterResults,
    cumulativeResults,
    semesters,
    activeSemesterId,
    setActiveSemesterId,
    addSemester,
    removeSemester,
    courses,
  } = useGPACalculator();

  const [viewMode, setViewMode] = useState<"semester" | "cumulative">(
    "semester"
  );

  const hasUCProfile = activeProfiles.some((p) => p.id.startsWith("uc-"));

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">GPA Calculator</h1>
        <p className="text-muted-foreground">
          Add your courses, select your target college, and see your GPA
          calculated instantly.
        </p>
      </div>

      {/* College Selection */}
      <div className="mb-6">
        <CollegeSearch
          value={selectedCollege}
          onChange={setSelectedCollege}
        />
        {selectedCollege && (
          <p className="text-xs text-muted-foreground mt-2">
            Showing GPA calculations for{" "}
            <strong>{selectedCollege.name}</strong>
            {selectedCollege.system === "uc" &&
              " using the UC GPA system"}
          </p>
        )}
      </div>

      {/* Grade Level & Semester Selection */}
      <div className="mb-6">
        <GradeSemesterSelector
          gradeLevel={selectedGradeLevel}
          semester={selectedSemester}
          onGradeLevelChange={setSelectedGradeLevel}
          onSemesterChange={setSelectedSemester}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Changing grade or semester will load typical courses for that period.
          You can then edit the courses and grades below.
        </p>
      </div>

      <Separator className="my-6" />

      {/* Semester Management */}
      <div className="mb-4">
        <SemesterTabs
          semesters={semesters}
          activeSemesterId={activeSemesterId}
          onSelect={setActiveSemesterId}
          onAdd={addSemester}
          onRemove={removeSemester}
        />
      </div>

      {/* Course Entry */}
      <div className="mb-8">
        <CourseList
          courses={activeSemesterCourses}
          semesterId={activeSemesterId}
          onAdd={addCourse}
          onUpdate={updateCourse}
          onRemove={removeCourse}
          showAG={hasUCProfile}
          showGradeLevel={hasUCProfile}
        />
      </div>

      <Separator className="my-6" />

      {/* Results */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Tabs
            value={viewMode}
            onValueChange={(v) =>
              setViewMode(v as "semester" | "cumulative")
            }
          >
            <TabsList>
              <TabsTrigger value="semester">Semester GPA</TabsTrigger>
              <TabsTrigger value="cumulative" disabled={courses.length === 0}>
                Cumulative GPA
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {activeProfiles.length > 0 && (
            <BoostEditor
              activeProfile={activeProfiles[0]}
              customBoosts={customBoosts}
              onChange={setCustomBoosts}
            />
          )}
        </div>

        {viewMode === "semester" ? (
          <GPAResults results={semesterResults} label="Semester GPA" />
        ) : (
          <GPAResults results={cumulativeResults} label="Cumulative GPA" />
        )}
      </div>

      {/* Explanation */}
      <GPAExplainer profiles={activeProfiles} />
    </div>
  );
}
