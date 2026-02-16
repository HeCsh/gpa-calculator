import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QuickAnswer } from "../QuickAnswer";

describe("QuickAnswer", () => {
  it("renders the question text", () => {
    render(
      <QuickAnswer question="What is a good GPA?" answer="A GPA of 3.5 or higher." />
    );
    expect(screen.getByText("What is a good GPA?")).toBeInTheDocument();
  });

  it("renders the answer text", () => {
    render(
      <QuickAnswer question="What is a good GPA?" answer="A GPA of 3.5 or higher." />
    );
    expect(screen.getByText("A GPA of 3.5 or higher.")).toBeInTheDocument();
  });

  it("applies font-semibold to the question", () => {
    render(
      <QuickAnswer question="Test question" answer="Test answer" />
    );
    const question = screen.getByText("Test question");
    expect(question).toHaveClass("font-semibold");
  });

  it("applies muted foreground styling to the answer", () => {
    render(
      <QuickAnswer question="Test question" answer="Test answer" />
    );
    const answer = screen.getByText("Test answer");
    expect(answer).toHaveClass("text-muted-foreground", "text-sm");
  });

  it("has a left border accent styling on the container", () => {
    const { container } = render(
      <QuickAnswer question="Q" answer="A" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("border-l-4", "border-primary");
  });
});
