import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavigationContent from "../../../components/navigation/NavigationContent";

const onDrawerToggleMock = vi.fn();

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    Box: vi.fn(({ children, sx }) => (
      <div style={sx} data-testid="box">
        {children}
      </div>
    )),
    List: vi.fn(({ children }) => <ul data-testid="list">{children}</ul>),
    ListItemButton: vi.fn(({ children, to, onClick }) => (
      <li data-testid={`list-item-${to}`} onClick={onClick}>
        {children}
      </li>
    )),
    ListItemIcon: vi.fn(({ children }) => (
      <span data-testid="list-item-icon">{children}</span>
    )),
    ListItemText: vi.fn(({ primary }) => (
      <span data-testid="list-item-text">{primary}</span>
    )),
    Accordion: vi.fn(({ children }) => (
      <div data-testid="accordion">{children}</div>
    )),
    AccordionSummary: vi.fn(({ children, expandIcon }) => (
      <div data-testid="accordion-summary">
        {children}
        {expandIcon}
      </div>
    )),
    AccordionDetails: vi.fn(({ children }) => (
      <div data-testid="accordion-details">{children}</div>
    )),
  };
});

vi.mock("@mui/icons-material/People", () => ({
  default: () => <span data-testid="people-icon" />,
}));

vi.mock("@mui/icons-material/Description", () => ({
  default: () => <span data-testid="description-icon" />,
}));

vi.mock("@mui/icons-material/LibraryBooks", () => ({
  default: () => <span data-testid="library-books-icon" />,
}));

vi.mock("@mui/icons-material/StickyNote2", () => ({
  default: () => <span data-testid="sticky-note2-icon" />,
}));

vi.mock("@mui/icons-material/KeyboardDoubleArrowDown", () => ({
  default: () => <span data-testid="keyboard-double-arrow-down-icon" />,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Link: vi.fn(({ children, to }) => (
      <a href={to} data-testid={`link-${to}`}>
        {children}
      </a>
    )),
  };
});

describe("NavigationContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders main navigation items", () => {
    render(
      <BrowserRouter>
        <NavigationContent
          isSmUp={true}
          onDrawerToggle={onDrawerToggleMock}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("list-item-/employees")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-/contracts")).toBeInTheDocument();
    expect(screen.getByText("Співробітники")).toBeInTheDocument();
    expect(screen.getByText("Договори")).toBeInTheDocument();
  });

  it("renders order accordion", () => {
    render(
      <BrowserRouter>
        <NavigationContent
          isSmUp={true}
          onDrawerToggle={onDrawerToggleMock}
        />
      </BrowserRouter>
    );

    expect(screen.getAllByTestId("accordion")).toHaveLength(2);
    expect(screen.getByText("Накази")).toBeInTheDocument();
    expect(screen.getByTestId("sticky-note2-icon")).toBeInTheDocument();
  });

  it("renders reference accordion", () => {
    render(
      <BrowserRouter>
        <NavigationContent
          isSmUp={true}
          onDrawerToggle={onDrawerToggleMock}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Довідники")).toBeInTheDocument();
    expect(screen.getByTestId("library-books-icon")).toBeInTheDocument();
  });

  it("calls onDrawerToggle when clicking navigation item on mobile", () => {
    render(
      <BrowserRouter>
        <NavigationContent
          isSmUp={false}
          onDrawerToggle={onDrawerToggleMock}
        />
      </BrowserRouter>
    );

    const employeesLink = screen.getByTestId("list-item-/employees");
    employeesLink.click();

    expect(onDrawerToggleMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onDrawerToggle when clicking navigation item on desktop", () => {
    render(
      <BrowserRouter>
        <NavigationContent
          isSmUp={true}
          onDrawerToggle={onDrawerToggleMock}
        />
      </BrowserRouter>
    );

    const employeesLink = screen.getByTestId("list-item-/employees");
    employeesLink.click();

    expect(onDrawerToggleMock).not.toHaveBeenCalled();
  });

  it("renders order navigation items in accordion", () => {
    render(
      <BrowserRouter>
        <NavigationContent
          isSmUp={true}
          onDrawerToggle={onDrawerToggleMock}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("list-item-/orders")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-/order-settings")).toBeInTheDocument();
    expect(screen.getByText("Створення")).toBeInTheDocument();
    expect(screen.getByText("Налаштування")).toBeInTheDocument();
  });

  it("renders reference navigation items in accordion", () => {
    render(
      <BrowserRouter>
        <NavigationContent
          isSmUp={true}
          onDrawerToggle={onDrawerToggleMock}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("list-item-/organizations")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-/departments")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-/positions")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-/grade-salaries")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-/qualification-grades")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-/work-schedules")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-/employment-types")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-/employment-conditions")).toBeInTheDocument();
  });

  it("renders icons for main navigation items", () => {
    render(
      <BrowserRouter>
        <NavigationContent
          isSmUp={true}
          onDrawerToggle={onDrawerToggleMock}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("people-icon")).toBeInTheDocument();
    expect(screen.getByTestId("description-icon")).toBeInTheDocument();
  });

  it("renders expand icons for accordions", () => {
    render(
      <BrowserRouter>
        <NavigationContent
          isSmUp={true}
          onDrawerToggle={onDrawerToggleMock}
        />
      </BrowserRouter>
    );

    const expandIcons = screen.getAllByTestId("keyboard-double-arrow-down-icon");
    expect(expandIcons).toHaveLength(2);
  });
});
