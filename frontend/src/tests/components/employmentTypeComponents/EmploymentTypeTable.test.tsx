import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmploymentTypeTable from "../../../components/employmentTypeComponents/EmploymentTypeTable";
import { EmploymentTypeInterface } from "../../../types/employmentType";

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

describe("EmploymentTypeTable", () => {
  const mockEmploymentTypes: EmploymentTypeInterface[] = [
    { id: 1, employmentTypeName: "IT EmploymentType" },
    { id: 2, employmentTypeName: "HR EmploymentType" },
    { id: 3, employmentTypeName: "Finance EmploymentType" },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders employmentTypes table", () => {
    render(
      <EmploymentTypeTable
        employmentTypes={mockEmploymentTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT EmploymentType")).toBeInTheDocument();
    expect(screen.getByText("HR EmploymentType")).toBeInTheDocument();
    expect(screen.getByText("Finance EmploymentType")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <EmploymentTypeTable
        employmentTypes={mockEmploymentTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders actions for each employmentType", () => {
    render(
      <EmploymentTypeTable
        employmentTypes={mockEmploymentTypes}
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
      <EmploymentTypeTable
        employmentTypes={mockEmploymentTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockEmploymentTypes[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <EmploymentTypeTable
        employmentTypes={mockEmploymentTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockEmploymentTypes[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <EmploymentTypeTable
        employmentTypes={mockEmploymentTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockEmploymentTypes[0].id);
  });

  it("renders empty table when no employmentTypes", () => {
    render(
      <EmploymentTypeTable
        employmentTypes={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT EmploymentType")).not.toBeInTheDocument();
  });

  it("displays employmentType names correctly", () => {
    render(
      <EmploymentTypeTable
        employmentTypes={mockEmploymentTypes}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT EmploymentType")).toBeInTheDocument();
    expect(screen.getByText("HR EmploymentType")).toBeInTheDocument();
    expect(screen.getByText("Finance EmploymentType")).toBeInTheDocument();
  });
});
