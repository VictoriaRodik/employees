import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeTable from "../../../components/employeeComponents/EmployeeTable";
import { EmployeeInterface } from "../../../types/employee";

vi.mock("../../../components/Table", () => ({
  default: ({ data, columns, renderActions }: any) => (
    <table data-testid="general-table">
      <thead>
        <tr>
          {columns.map((col: any) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            {columns.map((col: any) => (
              <td key={col.key}>{item[col.key]}</td>
            ))}
            <td>{renderActions(item)}</td>
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

describe("EmployeeTable", () => {
  const mockEmployees: EmployeeInterface[] = [
    {
      id: 1,
      fullName: "John Doe",
      personnelNumber: "001",
      taxId: "1234567890",
      address: "123 Main St",
      passportSeries: "AB",
      passportNumber: "123456",
      passportIssueDate: "2023-01-01",
      passportIssuedBy: "Local Office",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      personnelNumber: "002",
      taxId: "0987654321",
      address: "456 Oak Ave",
      passportSeries: "CD",
      passportNumber: "654321",
      passportIssueDate: "2022-12-01",
      passportIssuedBy: "City Hall",
    },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  const defaultProps = {
    employees: mockEmployees,
    onEdit: mockOnEdit,
    onCopy: mockOnCopy,
    onDelete: mockOnDelete,
  };

  it("renders table with correct columns and data", () => {
    render(<EmployeeTable {...defaultProps} />);

    const table = screen.getByTestId("general-table");
    expect(table).toBeInTheDocument();

    expect(screen.getByText("ПІБ")).toBeInTheDocument();
    expect(screen.getByText("Табельний номер")).toBeInTheDocument();
    expect(screen.getByText("ІПН")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("001")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("002")).toBeInTheDocument();
    expect(screen.getByText("0987654321")).toBeInTheDocument();
  });

  it("renders Actions component for each employee", () => {
    render(<EmployeeTable {...defaultProps} />);

    const actions = screen.getAllByTestId("actions");
    expect(actions).toHaveLength(2);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(<EmployeeTable {...defaultProps} />);

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockEmployees[0]);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(<EmployeeTable {...defaultProps} />);

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[1]);
    expect(mockOnCopy).toHaveBeenCalledWith(mockEmployees[1]);
    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<EmployeeTable {...defaultProps} />);

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockEmployees[0].id);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("renders empty table when no employees are provided", () => {
    render(<EmployeeTable {...defaultProps} employees={[]} />);

    const table = screen.getByTestId("general-table");
    expect(table).toBeInTheDocument();
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});
