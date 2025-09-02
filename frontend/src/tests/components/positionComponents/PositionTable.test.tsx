import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PositionTable from "../../../components/positionComponents/PositionTable";
import { PositionInterface } from "../../../types/position";

vi.mock("../../../components/Table", () => ({
  default: ({ data, columns, renderActions }: any) => (
    <table>
      <thead>
        <tr>
          {columns.map((col: any) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, index: number) => (
          <tr key={index}>
            {columns.map((col: any) => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
            <td>{renderActions && renderActions(row)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

vi.mock("../../../components/Actions", () => ({
  default: ({ onEdit, onCopy, onDelete }: any) => (
    <div data-testid="actions">
      <button data-testid="edit-button" onClick={() => onEdit()}>
        Edit
      </button>
      <button data-testid="copy-button" onClick={() => onCopy()}>
        Copy
      </button>
      <button data-testid="delete-button" onClick={() => onDelete()}>
        Delete
      </button>
    </div>
  ),
}));

describe("PositionTable", () => {
  const mockPositions: PositionInterface[] = [
    { id: 1, positionName: "IT Position" },
    { id: 2, positionName: "HR Position" },
    { id: 3, positionName: "Finance Position" },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders positions table", () => {
    render(
      <PositionTable
        positions={mockPositions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT Position")).toBeInTheDocument();
    expect(screen.getByText("HR Position")).toBeInTheDocument();
    expect(screen.getByText("Finance Position")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <PositionTable
        positions={mockPositions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders actions for each position", () => {
    render(
      <PositionTable
        positions={mockPositions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const actions = screen.getAllByTestId("actions");
    expect(actions).toHaveLength(3);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <PositionTable
        positions={mockPositions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockPositions[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <PositionTable
        positions={mockPositions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockPositions[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <PositionTable
        positions={mockPositions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockPositions[0].id);
  });

  it("renders empty table when no positions", () => {
    render(
      <PositionTable
        positions={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT Position")).not.toBeInTheDocument();
  });

  it("displays position names correctly", () => {
    render(
      <PositionTable
        positions={mockPositions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT Position")).toBeInTheDocument();
    expect(screen.getByText("HR Position")).toBeInTheDocument();
    expect(screen.getByText("Finance Position")).toBeInTheDocument();
  });
});
