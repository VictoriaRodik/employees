import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DepartmentTable from "../../../components/departmentComponents/DepartmentTable";
import { DepartmentInterface } from "../../../types/department";

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

describe("DepartmentTable", () => {
  const mockDepartments: DepartmentInterface[] = [
    { id: 1, departmentName: "IT Department" },
    { id: 2, departmentName: "HR Department" },
    { id: 3, departmentName: "Finance Department" },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders departments table", () => {
    render(
      <DepartmentTable
        departments={mockDepartments}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT Department")).toBeInTheDocument();
    expect(screen.getByText("HR Department")).toBeInTheDocument();
    expect(screen.getByText("Finance Department")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <DepartmentTable
        departments={mockDepartments}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders actions for each department", () => {
    render(
      <DepartmentTable
        departments={mockDepartments}
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
      <DepartmentTable
        departments={mockDepartments}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockDepartments[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <DepartmentTable
        departments={mockDepartments}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockDepartments[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <DepartmentTable
        departments={mockDepartments}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockDepartments[0].id);
  });

  it("renders empty table when no departments", () => {
    render(
      <DepartmentTable
        departments={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT Department")).not.toBeInTheDocument();
  });

  it("displays department names correctly", () => {
    render(
      <DepartmentTable
        departments={mockDepartments}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT Department")).toBeInTheDocument();
    expect(screen.getByText("HR Department")).toBeInTheDocument();
    expect(screen.getByText("Finance Department")).toBeInTheDocument();
  });
});
