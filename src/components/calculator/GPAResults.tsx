"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { GPAResult } from "@/lib/gpa/types";
import { COURSE_TYPE_LABELS } from "@/lib/gpa/types";
import { getPercentileForProfile } from "@/data/gpaPercentiles";
import { GPATrendChart } from "./GPATrendChart";

interface GPAResultsProps {
  results: GPAResult[];
  label: string;
}

function getGPAColor(gpa: number, max: number): string {
  const ratio = gpa / max;
  if (ratio >= 0.9) return "text-emerald-600";
  if (ratio >= 0.75) return "text-blue-600";
  if (ratio >= 0.6) return "text-amber-600";
  return "text-red-600";
}

export function GPAResults({ results, label }: GPAResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Add courses above to see your {label} GPA
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{label}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((result) => {
          const maxGPA = result.breakdown.some(
            (b) => b.finalPoints > 4.0
          )
            ? 5.0
            : 4.0;

          const notCounted = result.notCountedByUC === true;

          const percentile = !notCounted
            ? getPercentileForProfile(result.profileId, result.gpa)
            : null;

          return (
            <Card
              key={result.profileId}
              className={notCounted ? "opacity-60" : ""}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {result.profileName}
                </CardTitle>
                <CardDescription>
                  {result.totalCredits} credits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-4xl font-bold tabular-nums ${
                    notCounted
                      ? "text-muted-foreground"
                      : getGPAColor(result.gpa, maxGPA)
                  }`}
                >
                  {result.gpa.toFixed(2)}
                </div>
                {notCounted && (
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    UCs do not count this semester toward your GPA.
                  </p>
                )}
                {percentile !== null && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Top {100 - percentile}% nationally
                  </p>
                )}

                {result.semesterTrend && result.semesterTrend.length >= 2 && (
                  <GPATrendChart
                    data={result.semesterTrend}
                    maxGPA={maxGPA}
                  />
                )}

                <Accordion type="single" collapsible className="mt-3">
                  <AccordionItem value="breakdown" className="border-none">
                    <AccordionTrigger className="text-sm py-2">
                      View breakdown
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-1 text-sm">
                        {result.breakdown.map((b) => (
                          <div
                            key={b.courseId}
                            className={`flex items-center justify-between py-1 ${
                              b.excluded ? "opacity-50" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="truncate">
                                {b.courseName || "Untitled"}
                                {b.semesterLabel && (
                                  <span className="text-muted-foreground ml-1">
                                    ({b.semesterLabel})
                                  </span>
                                )}
                              </span>
                              {b.courseType !== "Regular" && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] px-1 py-0 shrink-0"
                                >
                                  {COURSE_TYPE_LABELS[b.courseType]}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-2 tabular-nums">
                              <span className="text-muted-foreground">
                                {b.grade}
                              </span>
                              <span>{b.basePoints.toFixed(1)}</span>
                              {b.boost > 0 && (
                                <span className="text-emerald-600">
                                  +{b.boost.toFixed(1)}
                                </span>
                              )}
                              <span className="font-medium">
                                = {b.finalPoints.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                        {result.breakdown.some((b) => b.excluded) && (
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            Grayed-out courses are excluded from this
                            calculation.
                          </p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
