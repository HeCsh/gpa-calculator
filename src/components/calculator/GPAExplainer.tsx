"use client";

import { Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { GPAProfile } from "@/lib/gpa/types";
import { COURSE_TYPES, COURSE_TYPE_LABELS } from "@/lib/gpa/types";

interface GPAExplainerProps {
  profiles: GPAProfile[];
}

export function GPAExplainer({ profiles }: GPAExplainerProps) {
  if (profiles.length === 0) return null;

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Info className="h-4 w-4 text-blue-500" />
        <h3 className="font-semibold text-sm">How Your GPA Is Calculated</h3>
      </div>

      <Accordion type="multiple" className="space-y-0">
        {profiles.map((profile) => (
          <AccordionItem key={profile.id} value={profile.id}>
            <AccordionTrigger className="text-sm py-2">
              {profile.name}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-3">
                {profile.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Course Type Boosts
                </h4>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  {COURSE_TYPES.map((type) => (
                    <div key={type} className="flex justify-between">
                      <span className="text-muted-foreground">
                        {COURSE_TYPE_LABELS[type]}
                      </span>
                      <span className="font-mono">
                        {profile.boostSystem[type] === 0
                          ? "—"
                          : `+${profile.boostSystem[type].toFixed(1)}`}
                      </span>
                    </div>
                  ))}
                </div>

                {profile.specialRules && (
                  <div className="mt-2 pt-2 border-t">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                      Special Rules
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {profile.specialRules.ignorePlusMinus && (
                        <li>
                          Plus/minus grades are ignored (A- = A = A+ = 4.0)
                        </li>
                      )}
                      {profile.specialRules.aGCoursesOnly && (
                        <li>Only a-g approved courses are counted</li>
                      )}
                      {profile.specialRules.maxHonorsSemesters && (
                        <li>
                          Maximum {profile.specialRules.maxHonorsSemesters}{" "}
                          semesters of honors points
                        </li>
                      )}
                      {profile.specialRules.maxHonorsFrom10thGrade && (
                        <li>
                          Maximum {profile.specialRules.maxHonorsFrom10thGrade}{" "}
                          honors semesters from 10th grade
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                  Max GPA: <strong>{profile.maxGPA.toFixed(1)}</strong> |{" "}
                  {profile.allowsPlusMinus
                    ? "Uses +/- grades"
                    : "No +/- grades"}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
