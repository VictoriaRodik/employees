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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item.fullName}</td>
            <td>{item.personnelNumber}</td>
            <td>{item.taxId}</td>
            <td>{renderActions(item)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

vi.mock("@mui/material", () => ({
  IconButton: ({ children, onClick }: any) => (
    <button data-testid="more-button" onClick={onClick}>
      {children}
    </button>
  ),
  Dialog: ({ open, children }: any) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogActions: ({ children }: any) => (
    <div data-testid="dialog-actions">{children}</div>
  ),
  useMediaQuery: () => true,
  useTheme: () => ({
    breakpoints: {
      up: (key: string) => key === "sm",
    },
  }),
}));

vi.mock("@mui/icons-material/MoreHoriz", () => ({
  default: () => <span data-testid="more-horiz-icon">More</span>,
}));

vi.mock("../../../components/ActionButtons", () => ({
  default: ({ onEdit, onCopy, onDelete }: any) => (
    <div data-testid="action-buttons">
      <button data-testid="edit-button" onClick={onEdit}>
        {"Edit"}
      </button>
      <button data-testid="copy-button" onClick={onCopy}>
        {"Copy"}
      </button>
      <button data-testid="delete-button" onClick={onDelete}>
        {"Delete"}
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
    expect(screen.getByText("Actions")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("001")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("002")).toBeInTheDocument();
    expect(screen.getByText("0987654321")).toBeInTheDocument();
  });

  it("renders Actions component for each employee", () => {
    render(<EmployeeTable {...defaultProps} />);

    const editButtons = screen.getAllByText("Edit");
    const copyButtons = screen.getAllByText("Copy");
    const deleteButtons = screen.getAllByText("Delete");

    expect(editButtons).toHaveLength(2);
    expect(copyButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(<EmployeeTable {...defaultProps} />);

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockEmployees[0]);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(<EmployeeTable {...defaultProps} />);

    const copyButtons = screen.getAllByText("Copy");
    fireEvent.click(copyButtons[1]);
    expect(mockOnCopy).toHaveBeenCalledWith(mockEmployees[1]);
    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<EmployeeTable {...defaultProps} />);

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockEmployees[0].id); // 1
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
