import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Breadcrumbs } from "../Breadcrumbs";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("lucide-react", () => ({
  ChevronRight: (props: any) => <svg data-testid="chevron-right" {...props} />,
}));

describe("Breadcrumbs", () => {
  it("always includes Home as the first breadcrumb", () => {
    render(<Breadcrumbs items={[{ label: "Calculator", href: "/gpa-calculator" }]} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Home");
    expect(links[0]).toHaveAttribute("href", "/");
  });

  it("renders all provided breadcrumb items", () => {
    const items = [
      { label: "Tools", href: "/tools" },
      { label: "GPA Calculator", href: "/gpa-calculator" },
    ];
    render(<Breadcrumbs items={items} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Tools")).toBeInTheDocument();
    expect(screen.getByText("GPA Calculator")).toBeInTheDocument();
  });

  it("renders intermediate items as links and the last item as plain text", () => {
    const items = [
      { label: "Tools", href: "/tools" },
      { label: "GPA Calculator", href: "/gpa-calculator" },
    ];
    render(<Breadcrumbs items={items} />);

    // Home and Tools should be links
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent("Home");
    expect(links[1]).toHaveTextContent("Tools");

    // Last item should be a span, not a link
    const lastItem = screen.getByText("GPA Calculator");
    expect(lastItem.tagName).toBe("SPAN");
  });

  it("renders chevron separators between items", () => {
    const items = [
      { label: "Tools", href: "/tools" },
      { label: "Calculator", href: "/gpa-calculator" },
    ];
    render(<Breadcrumbs items={items} />);

    const chevrons = screen.getAllByTestId("chevron-right");
    // 3 total items (Home + 2), so 2 chevrons
    expect(chevrons).toHaveLength(2);
  });

  it("generates BreadcrumbList JSON-LD schema", () => {
    const items = [{ label: "GPA Calculator", href: "/gpa-calculator" }];
    const { container } = render(<Breadcrumbs items={items} />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();

    const schema = JSON.parse(script!.textContent!);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(2);

    expect(schema.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://thegpacalculator.net",
    });
    expect(schema.itemListElement[1]).toEqual({
      "@type": "ListItem",
      position: 2,
      name: "GPA Calculator",
      item: "https://thegpacalculator.net/gpa-calculator",
    });
  });

  it("has a nav element with Breadcrumb aria-label", () => {
    render(<Breadcrumbs items={[{ label: "Test", href: "/test" }]} />);
    expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
  });
});
