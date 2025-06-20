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

vi.mock("../../../components/PrintActions", () => ({
  default: ({ onPreviewContract, onPreviewCashOrder }: any) => (
    <div data-testid="print-buttons">
      <button data-testid="contract-button" onClick={onPreviewContract}>
        {"Preview Contract PDF"}
      </button>
      <button data-testid="cash-order-button" onClick={onPreviewCashOrder}>
        {"Preview Cash Order PDF"}
      </button>
    </div>
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
      organizationId: '10',
      name: "Test company",
      shortName: "Company",
      edrpouCode: "32228978",
      legalAddress: "Some street",
      phone: "0362",
      bankAccount: "UA112222220000000000000000000",
      bankName: "Big Bank",
      foundationDoc: "Document",
      directorPosition: "director",
      directorFullName: "John Doe",
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
      organizationId: '10',
      name: "Test company",
      shortName: "Company",
      edrpouCode: "32228978",
      legalAddress: "Some street",
      phone: "0362",
      bankAccount: "UA112222220000000000000000000",
      bankName: "Big Bank",
      foundationDoc: "Document",
      directorPosition: "director",
      directorFullName: "John Doe",
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

    const editButtons = screen.getAllByText("Edit");
    const copyButtons = screen.getAllByText("Copy");
    const deleteButtons = screen.getAllByText("Delete");

    expect(editButtons).toHaveLength(2);
    expect(copyButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  it("renders PrintActions component for each contract", () => {
    render(<ContractTable {...defaultProps} />);

    const contractButtons = screen.getAllByText("Preview Contract PDF");
    const cashButtons = screen.getAllByText("Preview Cash Order PDF");

    expect(contractButtons).toHaveLength(2);
    expect(cashButtons).toHaveLength(2);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(<ContractTable {...defaultProps} />);

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockContracts[0]);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(<ContractTable {...defaultProps} />);

    const copyButtons = screen.getAllByText("Copy");
    fireEvent.click(copyButtons[1]);
    expect(mockOnCopy).toHaveBeenCalledWith(mockContracts[1]);
    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<ContractTable {...defaultProps} />);

    const deleteButtons = screen.getAllByText("Delete");
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
