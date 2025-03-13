import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../../components/Search";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    TextField: vi.fn(({ label, value, onChange, fullWidth }) => (
      <input
        data-testid="text-field"
        placeholder={label}
        value={value}
        onChange={onChange}
        type="text"
        style={{ width: fullWidth ? "100%" : "auto" }}
      />
    )),
  };
});

describe("Search", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default placeholder when none is provided", () => {
    render(<Search value="" onChange={() => {}} />);
    const input = screen.getByTestId("text-field");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Пошук...");
  });

  it("renders with custom placeholder when provided", () => {
    render(
      <Search value="" onChange={() => {}} placeholder="Search Employees" />
    );
    const input = screen.getByTestId("text-field");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Search Employees");
  });

  it("displays the provided value", () => {
    render(<Search value="John" onChange={() => {}} />);
    const input = screen.getByTestId("text-field");
    expect(input).toHaveValue("John");
  });

  it("calls onChange when input value changes", () => {
    const onChange = vi.fn();
    render(<Search value="" onChange={onChange} />);
    const input = screen.getByTestId("text-field");
    fireEvent.change(input, { target: { value: "Jane" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
