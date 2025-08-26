import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavigationDrawer from "../../../components/navigation/NavigationDrawer";

let mediaQueryValue = true;

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    Box: vi.fn(({ children, sx }) => (
      <div style={sx} data-testid="box">
        {children}
      </div>
    )),

    Toolbar: vi.fn(({ children }) => (
      <div data-testid="toolbar">{children}</div>
    )),

    Drawer: vi.fn(({ children, sx, variant, open }) => (
      <div
        style={sx}
        data-testid={
          variant === "permanent" ? "permanent-drawer" : "temporary-drawer"
        }
        data-open={open}
      >
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
    useMediaQuery: () => mediaQueryValue,
  };
});

vi.mock("@mui/icons-material/People", () => ({
  default: () => <span data-testid="people-icon" />,
}));

vi.mock("@mui/icons-material/Description", () => ({
  default: () => <span data-testid="description-icon" />,
}));

vi.mock("@mui/icons-material/Brightness4", () => ({
  default: () => <span data-testid="brightness4-icon" />,
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
    Outlet: vi.fn(() => <div data-testid="outlet" />),
  };
});

const onDrawerToggleMock = vi.fn();

describe("NavigationDrawer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the permanent drawer on the desktop", () => {
    render(
      <BrowserRouter>
        <NavigationDrawer
          onDrawerToggle={onDrawerToggleMock}
          mobileOpen={false}
          drawerWidth={240}
        />
      </BrowserRouter>
    );
    expect(screen.getAllByTestId("box")[0]).toBeInTheDocument();
    expect(screen.getByTestId("permanent-drawer")).toBeInTheDocument();
    expect(screen.getByTestId("toolbar")).toBeInTheDocument();
  });

  it("renders permanent drawer with navigation links", () => {
    render(
      <BrowserRouter>
        <NavigationDrawer
          onDrawerToggle={onDrawerToggleMock}
          mobileOpen={false}
          drawerWidth={240}
        />
      </BrowserRouter>
    );
    const lists = screen.getAllByTestId("list");
    expect(lists.length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("list-item-/employees")).toHaveLength(1);
    expect(screen.getAllByTestId("list-item-/contracts")).toHaveLength(1);
    expect(screen.getAllByText("Співробітники")).toHaveLength(1);
    expect(screen.getAllByText("Договори")).toHaveLength(1);
    expect(screen.getAllByTestId("people-icon")).toHaveLength(1);
    expect(screen.getAllByTestId("description-icon")).toHaveLength(1);
  });

  it("renders temporary drawer when menu button is clicked on mobile", () => {
    mediaQueryValue = false;
    render(
      <BrowserRouter>
        <NavigationDrawer
          onDrawerToggle={onDrawerToggleMock}
          mobileOpen={true}
          drawerWidth={240}
        />
      </BrowserRouter>
    );
    const temporaryDrawer = screen.getByTestId("temporary-drawer");
    expect(temporaryDrawer).toHaveAttribute("data-open", "true");
  });

  it("renders temporary drawer with navigation links", () => {
    mediaQueryValue = false;
    render(
      <BrowserRouter>
        <NavigationDrawer
          onDrawerToggle={onDrawerToggleMock}
          mobileOpen={true}
          drawerWidth={240}
        />
      </BrowserRouter>
    );
    const lists = screen.getAllByTestId("list");
    expect(lists.length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("list-item-/employees")).toHaveLength(1);
    expect(screen.getAllByTestId("list-item-/contracts")).toHaveLength(1);
    expect(screen.getAllByText("Співробітники")).toHaveLength(1);
    expect(screen.getAllByText("Договори")).toHaveLength(1);
    expect(screen.getAllByTestId("people-icon")).toHaveLength(1);
    expect(screen.getAllByTestId("description-icon")).toHaveLength(1);
  });
  it("calls onDrawerToggle when a list item is clicked in mobile view", () => {
    mediaQueryValue = false;
    render(
      <BrowserRouter>
        <NavigationDrawer
          onDrawerToggle={onDrawerToggleMock}
          mobileOpen={true}
          drawerWidth={240}
        />
      </BrowserRouter>
    );
    const listItem = screen.getByTestId("list-item-/employees");
    listItem.click();
    expect(onDrawerToggleMock).toHaveBeenCalledTimes(1);
  });
});
