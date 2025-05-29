import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    Box: vi.fn(({ children, sx }) => (
      <div style={sx} data-testid="box">
        {children}
      </div>
    )),
    AppBar: vi.fn(({ children }) => (
      <div data-testid="app-bar">{children}</div>
    )),
    Toolbar: vi.fn(({ children }) => (
      <div data-testid="toolbar">{children}</div>
    )),
    Typography: vi.fn(({ children }) => (
      <span data-testid="typography">{children}</span>
    )),
    IconButton: vi.fn(({ children, onClick }) => (
      <button data-testid="icon-button" onClick={onClick}>
        {children}
      </button>
    )),
  };
});

vi.mock("@mui/icons-material/Brightness4", () => ({
  default: () => <span data-testid="brightness4-icon" />,
}));

vi.mock("@mui/icons-material/Brightness7", () => ({
  default: () => <span data-testid="brightness7-icon" />,
}));

vi.mock("@mui/icons-material/Menu", () => ({
  default: () => <span data-testid="menu-icon" />,
}));

const onMenuClickMock = vi.fn();
const toggleThemeMock = vi.fn();

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the layout structure with AppBar, Drawers, and main content", () => {
    render(
      <Header
        onMenuClick={onMenuClickMock}
        isDarkMode={false}
        toggleTheme={toggleThemeMock}
        showMenuButton={false}
      />
    );
    expect(screen.getAllByTestId("box")[0]).toBeInTheDocument();
    expect(screen.getByTestId("app-bar")).toBeInTheDocument();
    expect(screen.getByTestId("toolbar")).toBeInTheDocument();
    expect(screen.getByTestId("typography")).toBeInTheDocument();
    expect(screen.getByTestId("icon-button")).toBeInTheDocument();
    expect(screen.getByTestId("brightness4-icon")).toBeInTheDocument();
  });

  it("renders AppBar with title, menu button, and theme toggle", () => {
    render(
      <Header
        onMenuClick={onMenuClickMock}
        isDarkMode={false}
        toggleTheme={toggleThemeMock}
        showMenuButton={true}
      />
    );
    expect(screen.getByTestId("typography")).toHaveTextContent(
      "Система управління договорами"
    );
    expect(screen.getAllByTestId("icon-button")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("icon-button")[1]).toBeInTheDocument();
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
    expect(screen.getByTestId("brightness4-icon")).toBeInTheDocument();
  });

  it("calls onMenuClick when menu button is clicked", () => {
    render(
      <Header
        onMenuClick={onMenuClickMock}
        isDarkMode={false}
        toggleTheme={toggleThemeMock}
        showMenuButton={true}
      />
    );
    const menuButton = screen.getAllByTestId("icon-button")[0];
    fireEvent.click(menuButton);
    expect(onMenuClickMock).toHaveBeenCalledTimes(1);
  });

  it("shows Brightness7Icon when in dark mode", () => {
    render(
      <Header
        onMenuClick={onMenuClickMock}
        isDarkMode={true}
        toggleTheme={toggleThemeMock}
        showMenuButton={true}
      />
    );
    expect(screen.getByTestId("brightness7-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("brightness4-icon")).not.toBeInTheDocument();
  });
});
