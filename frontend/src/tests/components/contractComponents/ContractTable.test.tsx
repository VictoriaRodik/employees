import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ContractTable from "../../../components/contractComponents/ContractTable";
import { ContractInterface } from "../../../types/contract";

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
            <td>{item.contractNumber}</td>
            <td>{item.contractDate}</td>
            <td>{item.contractAmount}</td>
            <td>{renderActions(item)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

describe("ContractTable", () => {
  const mockContracts: ContractInterface[] = [
    {
      id: 1,
      contractDate: "2025-01-01",
      contractEndDate: "2025-01-01",
      contractAmount: "1000",
      contractContent: "test",
      contractNumber: "01-01",
      employeeId: "1",
      taxId: "1234567890",
      fullName: "John Doe",
      address: "123 Main St",
      passportSeries: "AB",
      passportNumber: "123456",
      passportIssueDate: "2023-01-01",
      passportIssuedBy: "5600",
    },
    {
      id: 2,
      contractDate: "2025-02-01",
      contractEndDate: "2025-02-01",
      contractAmount: "2000",
      contractContent: "test",
      contractNumber: "02-02",
      employeeId: "2",
      fullName: "Jane Smith",
      taxId: "0987654321",
      address: "456 Oak Ave",
      passportSeries: "CD",
      passportNumber: "654321",
      passportIssueDate: "2022-12-01",
      passportIssuedBy: "5600",
    },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();
  const mockPreviewContract = vi.fn();
  const mockPreviewCashOrder = vi.fn();

  const defaultProps = {
    contracts: mockContracts,
    onEdit: mockOnEdit,
    onCopy: mockOnCopy,
    onDelete: mockOnDelete,
    onPreviewContract: mockPreviewContract,
    onPreviewCashOrder: mockPreviewCashOrder,
  };

  it("renders table with correct columns and data", () => {
    render(<ContractTable {...defaultProps} />);

    const table = screen.getByTestId("general-table");
    expect(table).toBeInTheDocument();


    expect(screen.getByText("ПІБ")).toBeInTheDocument();
    expect(screen.getByText("Номер договору")).toBeInTheDocument();
    expect(screen.getByText("Дата договору")).toBeInTheDocument();
    expect(screen.getByText("Сума")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("01-01")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("02-02")).toBeInTheDocument();
    expect(screen.getByText("2025-02-01")).toBeInTheDocument();
  });

  it("renders Actions component for each contract", () => {
    render(<ContractTable {...defaultProps} />);

    const editButtons = screen.getAllByTitle("Edit");
    const copyButtons = screen.getAllByTitle("Copy");
    const deleteButtons = screen.getAllByTitle("Delete");

    expect(editButtons).toHaveLength(2);
    expect(copyButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  it("renders PrintActions component for each contract", () => {
    render(<ContractTable {...defaultProps} />);

    const contractButtons = screen.getAllByTitle("Preview Contract PDF");
    const cashButtons = screen.getAllByTitle("Preview Cash Order PDF");

    expect(contractButtons).toHaveLength(2);
    expect(cashButtons).toHaveLength(2);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(<ContractTable {...defaultProps} />);

    const editButtons = screen.getAllByTitle("Edit");
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockContracts[0]);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(<ContractTable {...defaultProps} />);

    const copyButtons = screen.getAllByTitle("Copy");
    fireEvent.click(copyButtons[1]);
    expect(mockOnCopy).toHaveBeenCalledWith(mockContracts[1]);
    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<ContractTable {...defaultProps} />);

    const deleteButtons = screen.getAllByTitle("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockContracts[0].id); // 1
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("renders empty table when no contracts are provided", () => {
    render(<ContractTable {...defaultProps} contracts={[]} />);

    const table = screen.getByTestId("general-table");
    expect(table).toBeInTheDocument();
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});
