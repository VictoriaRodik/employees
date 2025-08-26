import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "../../components/Layout";
import { useTheme } from "../../hooks/useTheme";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    Box: vi.fn(({ children, sx }) => (
      <div style={sx} data-testid="box">
        {children}
      </div>
    )),
    useMediaQuery: () => true,
    useTheme: () => ({
      palette: {
        mode: "light",
      },
      breakpoints: {
        up: (key: string) => key === "sm",
      },
    }),
  };
});

vi.mock("../../components/Header", () => ({
  default: vi.fn(({ onMenuClick, isDarkMode, toggleTheme, showMenuButton }) => (
    <div data-testid="app-bar">
      <button
        data-testid="menu-button"
        onClick={onMenuClick}
        style={{ display: showMenuButton ? "block" : "none" }}
      >
        Menu
      </button>
      <span data-testid="typography">SVARTA HRM</span>
      <button data-testid="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  )),
}));

vi.mock("../../components/NavigationDrawer", () => ({
  default: vi.fn(({ mobileOpen, onDrawerToggle, drawerWidth }) => (
    <div
      data-testid={mobileOpen ? "temporary-drawer" : "permanent-drawer"}
      style={{ width: drawerWidth, display: mobileOpen ? "block" : "none" }}
      onClick={onDrawerToggle}
    >
      <ul data-testid="list">
        <li data-testid="list-item-/employees">Співробітники</li>
        <li data-testid="list-item-/contracts">Договори</li>
      </ul>
    </div>
  )),
}));

vi.mock("../../components/MainContent", () => ({
  default: vi.fn(() => (
    <div data-testid="container">
      <div data-testid="outlet">Main Content</div>
    </div>
  )),
}));

vi.mock("../../hooks/useTokenExpiration", () => ({
  default: vi.fn(),
}));

const mockToggleTheme = vi.fn();
vi.mock("../../hooks/useTheme", () => ({
  useTheme: vi.fn(),
}));

describe("Layout", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useTheme).mockReturnValue({
      isDarkMode: false,
      toggleTheme: mockToggleTheme,
    });
  });

  it("renders the layout structure with Header, Navigation, and MainContent", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByTestId("app-bar")).toBeInTheDocument();
    expect(screen.getByTestId("permanent-drawer")).toBeInTheDocument();
    expect(screen.getByTestId("list")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });

  it("renders Header with correct title and menu button", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByTestId("typography")).toHaveTextContent(
      "SVARTA HRM"
    );
    const menuButton = screen.getByTestId("menu-button");
    expect(menuButton).toBeInTheDocument();
  });

  it("toggles the drawer when menu button is clicked", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const menuButton = screen.getByTestId("menu-button");
    expect(screen.getByTestId("permanent-drawer")).toBeInTheDocument();
    expect(screen.queryByTestId("temporary-drawer")).not.toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(screen.getByTestId("temporary-drawer")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("temporary-drawer"));
    expect(screen.queryByTestId("temporary-drawer")).not.toBeInTheDocument();
    expect(screen.getByTestId("permanent-drawer")).toBeInTheDocument();
  });

  it("calls toggleTheme when theme toggle button is clicked", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const themeToggleButton = screen.getByTestId("theme-toggle");
    expect(themeToggleButton).toHaveTextContent("Dark Mode");
    fireEvent.click(themeToggleButton);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it("renders NavigationDrawer with correct list items", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByTestId("list-item-/employees")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-/contracts")).toBeInTheDocument();
  });

  it("renders MainContent with outlet", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByTestId("container")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toHaveTextContent("Main Content");
  });

  it("applies correct styles to Box component", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveStyle({
      display: "flex",
      minHeight: "100vh",
    });
  });


  

  it("renders with correct drawer width", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const drawer = screen.getByTestId("permanent-drawer");
    expect(drawer).toHaveStyle({ width: 240 });

    fireEvent.click(screen.getByTestId("menu-button"));
    const tempDrawer = screen.getByTestId("temporary-drawer");
    expect(tempDrawer).toHaveStyle({ width: 240 });
  });
});
