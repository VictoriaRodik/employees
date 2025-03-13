import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Table from "../../components/Table";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    TableContainer: vi.fn(({ children }) => (
      <div data-testid="table-container">{children}</div>
    )),
    Paper: vi.fn(), // No need to render anything specific, just mock it
    Table: vi.fn(({ children }) => (
      <table data-testid="table">{children}</table>
    )),
    TableHead: vi.fn(({ children }) => (
      <thead data-testid="table-head">{children}</thead>
    )),
    TableBody: vi.fn(({ children }) => (
      <tbody data-testid="table-body">{children}</tbody>
    )),
    TableRow: vi.fn(({ children }) => (
      <tr data-testid="table-row">{children}</tr>
    )),
    TableCell: vi.fn(({ children }) => (
      <td data-testid="table-cell">{children}</td>
    )),
  };
});

interface TestData {
  id: number;
  name: string;
  number: number;
}

describe("GeneralTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders an empty table when no data or columns are provided", () => {
    render(<Table columns={[]} data={[]} />);
    expect(screen.getByTestId("table")).toBeInTheDocument();
    expect(screen.getByTestId("table-head")).toBeInTheDocument();
    expect(screen.getByTestId("table-body")).toBeInTheDocument();
    expect(screen.queryAllByTestId("table-row").length).toBe(1);
    expect(screen.queryAllByTestId("table-cell").length).toBe(0);
  });

  it("renders table with correct column headers", () => {
    const columns: { key: keyof TestData; label: string }[] = [
      { key: "name", label: "Name" },
      { key: "number", label: "Number" },
    ];
    render(<Table columns={columns} data={[]} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Number")).toBeInTheDocument();
    expect(screen.queryAllByTestId("table-row").length).toBe(1);
    expect(screen.queryAllByTestId("table-cell").length).toBe(2);
  });

  it("renders table with data rows", () => {
    const columns: { key: keyof TestData; label: string }[] = [
      { key: "name", label: "Name" },
      { key: "number", label: "Number" },
    ];
    const data: TestData[] = [
      { id: 1, name: "John", number: 30 },
      { id: 2, name: "Jane", number: 25 },
    ];
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Number")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.queryAllByTestId("table-row").length).toBe(3);
    expect(screen.queryAllByTestId("table-cell").length).toBe(6);
  });

  it("renders actions column when renderActions is provided", () => {
    const columns: { key: keyof TestData; label: string }[] = [
      { key: "name", label: "Name" },
    ];
    const data: TestData[] = [{ id: 1, name: "John", number: 30 }];
    const renderActions = vi.fn((item: TestData) => (
      <button>Edit {item.name}</button>
    ));
    render(
      <Table columns={columns} data={data} renderActions={renderActions} />
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Edit John")).toBeInTheDocument();
    expect(renderActions).toHaveBeenCalledWith(data[0]);
    expect(screen.queryAllByTestId("table-row").length).toBe(2);
    expect(screen.queryAllByTestId("table-cell").length).toBe(4);
  });
});
