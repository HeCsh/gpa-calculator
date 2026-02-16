import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "../Header";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("lucide-react", () => ({
  GraduationCap: (props: any) => <svg data-testid="graduation-cap" {...props} />,
}));

describe("Header", () => {
  it("renders a header element", () => {
    const { container } = render(<Header />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });

  it("renders the GraduationCap logo icon", () => {
    render(<Header />);
    expect(screen.getByTestId("graduation-cap")).toBeInTheDocument();
  });

  it("renders the brand name linking to home", () => {
    render(<Header />);
    const brandLink = screen.getByText("GPA Calculator").closest("a");
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders the Calculator navigation link", () => {
    render(<Header />);
    const calcLink = screen.getByText("Calculator");
    expect(calcLink.closest("a")).toHaveAttribute("href", "/gpa-calculator");
  });

  it("renders the How It Works navigation link", () => {
    render(<Header />);
    const howLink = screen.getByText("How It Works");
    expect(howLink.closest("a")).toHaveAttribute("href", "/how-it-works");
  });

  it("has a nav element for navigation links", () => {
    const { container } = render(<Header />);
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("is sticky with z-50 positioning", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("sticky", "top-0", "z-50");
  });
});
