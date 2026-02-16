import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/data/seoContent", () => ({
  LAST_UPDATED: "February 2026",
}));

import { LastUpdated } from "../LastUpdated";

describe("LastUpdated", () => {
  it("renders the last updated date text", () => {
    render(<LastUpdated />);
    expect(screen.getByText(/Last updated: February 2026/)).toBeInTheDocument();
  });

  it("has muted styling", () => {
    render(<LastUpdated />);
    const el = screen.getByText(/Last updated/);
    expect(el).toHaveClass("text-xs", "text-muted-foreground");
  });
});
