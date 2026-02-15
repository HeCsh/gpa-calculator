"use client";

import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { BoostSystem, GPAProfile } from "@/lib/gpa/types";
import { COURSE_TYPES, COURSE_TYPE_LABELS } from "@/lib/gpa/types";

interface BoostEditorProps {
  activeProfile: GPAProfile;
  customBoosts: Partial<BoostSystem>;
  onChange: (boosts: Partial<BoostSystem>) => void;
}

export function BoostEditor({
  activeProfile,
  customBoosts,
  onChange,
}: BoostEditorProps) {
  const getEffectiveBoost = (key: keyof BoostSystem) => {
    return customBoosts[key] ?? activeProfile.boostSystem[key];
  };

  const isCustomized = (key: keyof BoostSystem) => {
    return (
      customBoosts[key] !== undefined &&
      customBoosts[key] !== activeProfile.boostSystem[key]
    );
  };

  const handleReset = () => {
    onChange({});
  };

  const hasCustomizations = Object.keys(customBoosts).length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4 mr-2" />
          Edit Boosts
          {hasCustomizations && (
            <span className="ml-1 h-2 w-2 rounded-full bg-blue-500 inline-block" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Course Boosts</DialogTitle>
          <DialogDescription>
            Adjust how much each course type adds to your weighted GPA. Changes
            apply to all GPA calculations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {COURSE_TYPES.map((type) => (
            <div key={type} className="flex items-center justify-between gap-4">
              <Label className="flex-1">
                {COURSE_TYPE_LABELS[type]}
                {isCustomized(type) && (
                  <span className="text-xs text-blue-500 ml-1">(custom)</span>
                )}
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">+</span>
                <Input
                  type="number"
                  step={0.1}
                  min={0}
                  max={2}
                  value={getEffectiveBoost(type)}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) {
                      onChange({ ...customBoosts, [type]: val });
                    }
                  }}
                  className="w-20 text-center"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-md bg-muted p-3">
          <h4 className="text-sm font-medium mb-1">How Boosts Work</h4>
          <p className="text-xs text-muted-foreground">
            Boost values are added to your base grade points. For example, if you
            earned an A (4.0 points) in an AP course with a +1.0 boost, your
            weighted grade points would be 5.0.
          </p>
        </div>

        {hasCustomizations && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset to defaults
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
