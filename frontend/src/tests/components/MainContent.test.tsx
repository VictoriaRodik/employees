import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MainContent from "../../components/MainContent";

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
    Container: vi.fn(({ children }) => (
      <div data-testid="container">{children}</div>
    )),
  };
});
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

describe("MainContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the main content", () => {
    render(<MainContent drawerWidth={240} />);
    expect(screen.getAllByTestId("box")[0]).toBeInTheDocument();
    expect(screen.getByTestId("container")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});
