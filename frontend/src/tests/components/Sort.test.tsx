import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Sort from "../../components/Sort";
import { SelectChangeEvent } from "@mui/material";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    Select: vi.fn(({ value, onChange, children }) => (
      <select
        data-testid="select"
        value={value}
        onChange={(e) =>
          onChange({
            target: { value: e.target.value },
          } as SelectChangeEvent<string>)
        }
      >
        {children}
      </select>
    )),
    MenuItem: vi.fn(({ value, children, disabled }) => (
      <option data-testid={`option-${value}`} value={value} disabled={disabled}>
        {children}
      </option>
    )),
  };
});

describe("Sort", () => {
  const mockOptions = [
    { value: "name", label: "By Name" },
    { value: "number", label: "By Number" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders select with provided value", () => {
    render(<Sort value="name" options={mockOptions} onChange={() => {}} />);
    const select = screen.getByTestId("select");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("name");
  });

  it("renders all options including placeholder", () => {
    render(<Sort value="name" options={mockOptions} onChange={() => {}} />);
    expect(screen.getByTestId("option-")).toHaveTextContent("Сортувати");
    expect(screen.getByTestId("option-")).toBeDisabled();
    expect(screen.getByTestId("option-name")).toHaveTextContent("By Name");
    expect(screen.getByTestId("option-number")).toHaveTextContent("By Number");
    expect(screen.getAllByTestId(/option-/).length).toBe(3);
  });

  it("renders custom placeholder when provided", () => {
    render(
      <Sort
        value="name"
        options={mockOptions}
        onChange={() => {}}
        placeholder="Sort By"
      />
    );
    expect(screen.getByTestId("option-")).toHaveTextContent("Sort By");
    expect(screen.getByTestId("option-")).toBeDisabled();
  });

  it("supports empty value", () => {
    render(<Sort value="" options={mockOptions} onChange={() => {}} />);
    const select = screen.getByTestId("select");
    expect(select).toHaveValue("");
    expect(screen.getAllByTestId(/option-/).length).toBe(3);
    expect(screen.getByTestId("option-")).toBeInTheDocument();
    expect(screen.getByTestId("option-name")).toBeInTheDocument();
    expect(screen.getByTestId("option-number")).toBeInTheDocument();
  });

  it("calls onChange when selection changes", () => {
    const onChange = vi.fn();
    render(<Sort value="name" options={mockOptions} onChange={onChange} />);
    const select = screen.getByTestId("select");
    fireEvent.change(select, { target: { value: "number" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: "number" } })
    );
  });

  it("renders correctly with empty options array", () => {
    render(<Sort value="" options={[]} onChange={() => {}} />);
    const select = screen.getByTestId("select");
    expect(select).toHaveValue("");
    expect(screen.getAllByTestId(/option-/).length).toBe(1);
    expect(screen.getByTestId("option-")).toHaveTextContent("Сортувати");
  });
});
