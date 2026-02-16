import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer } from "../Footer";

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

describe("Footer", () => {
  it("renders the footer element", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("renders the GPA Calculator brand link", () => {
    render(<Footer />);
    const brandLinks = screen.getAllByText("GPA Calculator");
    // The first one is the brand link in footer
    const brandLink = brandLinks[0].closest("a");
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders the GraduationCap icon", () => {
    render(<Footer />);
    expect(screen.getByTestId("graduation-cap")).toBeInTheDocument();
  });

  it("renders Tools navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Tools")).toBeInTheDocument();

    const calcLink = screen.getAllByRole("link").find(
      (link) => link.getAttribute("href") === "/gpa-calculator"
    );
    expect(calcLink).toBeTruthy();

    const howItWorksLink = screen.getAllByRole("link").find(
      (link) => link.getAttribute("href") === "/how-it-works"
    );
    expect(howItWorksLink).toBeTruthy();

    const scaleLink = screen.getAllByRole("link").find(
      (link) => link.getAttribute("href") === "/gpa-scale"
    );
    expect(scaleLink).toBeTruthy();
  });

  it("renders GPA Types navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("GPA Types")).toBeInTheDocument();

    const weightedLink = screen.getAllByRole("link").find(
      (link) => link.getAttribute("href") === "/weighted-gpa-calculator"
    );
    expect(weightedLink).toBeTruthy();

    const ucLink = screen.getAllByRole("link").find(
      (link) => link.getAttribute("href") === "/uc-gpa-calculator"
    );
    expect(ucLink).toBeTruthy();

    const apLink = screen.getAllByRole("link").find(
      (link) => link.getAttribute("href") === "/ap-gpa-calculator"
    );
    expect(apLink).toBeTruthy();
  });

  it("renders Resources navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Resources")).toBeInTheDocument();

    const goodGpaLink = screen.getAllByRole("link").find(
      (link) => link.getAttribute("href") === "/good-gpa"
    );
    expect(goodGpaLink).toBeTruthy();

    const collegeLink = screen.getAllByRole("link").find(
      (link) => link.getAttribute("href") === "/college-gpa-requirements"
    );
    expect(collegeLink).toBeTruthy();
  });

  it("has navigation sections with nav elements", () => {
    const { container } = render(<Footer />);
    const navElements = container.querySelectorAll("nav");
    expect(navElements.length).toBe(3);
  });

  it("renders the copyright notice", () => {
    render(<Footer />);
    expect(screen.getByText(/GPA Calculator\. Free to use/)).toBeInTheDocument();
  });
});
