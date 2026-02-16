import { LAST_UPDATED } from "@/data/seoContent";

export function LastUpdated() {
  return (
    <p className="text-xs text-muted-foreground mt-8">
      Last updated: {LAST_UPDATED}
    </p>
  );
}
