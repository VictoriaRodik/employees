import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContractList from "../../../components/contractComponents/ContractList";
import { useContracts } from "../../../hooks/useContracts";
import { ContractInterface } from "../../../types/contract";

interface ContractTableProps {
  contracts: ContractInterface[];
  onEdit: (contract: ContractInterface) => void;
  onCopy: (contract: ContractInterface) => void;
  onDelete: (id: number) => void;
  onPreviewContract: (contract: ContractInterface) => void;
  onPreviewCashOrder: (contract: ContractInterface) => void;
}

interface ContractFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (contract: ContractInterface) => void;
  initialValues?: ContractInterface;
}

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SortProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

vi.mock("../../../hooks/useContracts", () => ({
  useContracts: vi.fn(),
}));

vi.mock("../../../components/contractComponents/ContractTable", () => ({
  default: ({
    contracts,
    onEdit,
    onCopy,
    onDelete,
    onPreviewContract,
    onPreviewCashOrder,
  }: ContractTableProps) => (
    <div data-testid="contract-table">
      {contracts.map((contract: ContractInterface) => (
        <div key={contract.id}>
          <span>{contract.fullName}</span>
          <button onClick={() => onEdit(contract)}>Edit</button>
          <button onClick={() => onCopy(contract)}>Copy</button>
          <button onClick={() => onDelete(contract.id)}>Delete</button>
          <button onClick={() => onPreviewContract(contract)}>
            Preview Contract
          </button>
          <button onClick={() => onPreviewCashOrder(contract)}>
            Preview Cash Order
          </button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/contractComponents/ContractFormModal", () => {
  const defaultValues: ContractInterface = {
    id: 0,
    fullName: "",
    contractDate: new Date().toLocaleDateString("en-CA"),
    employeeId: "",
    contractEndDate: "",
    contractAmount: "",
    contractContent: "",
    contractNumber: "",
    taxId: "",
    passportNumber: "",
    passportIssueDate: "",
    passportIssuedBy: "",
    organizationId: "1",
    name: "",
    shortName: "",
    edrpouCode: "",
    legalAddress: "",
    phone: "",
    bankAccount: "",
    bankName: "",
    foundationDoc: "",
    directorPosition: "",
    directorFullName: "",
  };

  return {
    default: ({
      open,
      title,
      onSubmit,
      initialValues,
    }: ContractFormModalProps) => {
      const mergedContract: ContractInterface = {
        ...defaultValues,
        ...(initialValues ? { ...initialValues } : {}),
        id: initialValues?.id || 999,
      };

      return open ? (
        <div data-testid="contract-form-modal">
          <h2>{title}</h2>
          <button onClick={() => onSubmit(mergedContract)}>Submit</button>
        </div>
      ) : null;
    },
  };
});

vi.mock("react-pdf", () => ({
  Document: ({ children }: any) => (
    <div data-testid="mock-pdf-document">{children}</div>
  ),
  Page: () => <div data-testid="mock-pdf-page">Mock Page</div>,
  pdfjs: { GlobalWorkerOptions: { workerSrc: "" } },
}));

vi.mock("../../../components/Search", () => ({
  default: ({ value, onChange }: SearchProps) => (
    <input data-testid="search" value={value} onChange={onChange} />
  ),
}));

vi.mock("../../../components/Sort", () => ({
  default: ({ value, onChange, options }: SortProps) => (
    <select data-testid="sort" value={value} onChange={onChange}>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

vi.mock("../../../components/Button", () => ({
  default: ({ onClick, children }: ButtonProps) => (
    <button data-testid="add-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

describe("ContractList", () => {
  const mockContracts: ContractInterface[] = [
    {
      id: 1,
      fullName: "John Doe",
      contractDate: "2025-01-01",
      employeeId: "1",
      contractEndDate: "2025-01-01",
      contractAmount: "1000",
      contractContent: "test",
      contractNumber: "01-01",
      taxId: "1111111111",
      passportNumber: "111111",
      passportIssueDate: "2025-01-01",
      passportIssuedBy: "5600",
      organizationId: "10",
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
      fullName: "Jane Smith",
      contractDate: "2025-02-01",
      employeeId: "2",
      contractEndDate: "2025-02-01",
      contractAmount: "2000",
      contractContent: "test",
      contractNumber: "02-02",
      taxId: "2222222222",
      passportNumber: "222222",
      passportIssueDate: "2025-01-01",
      passportIssuedBy: "5600",
      organizationId: "10",
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

  const mockUseContracts = {
    data: mockContracts,
    isLoading: false,
    error: null,
    createContract: { mutate: vi.fn() },
    updateContract: { mutate: vi.fn() },
    deleteContract: { mutate: vi.fn() },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useContracts as any).mockReturnValue(mockUseContracts);
  });

  it("renders loading state", () => {
    (useContracts as any).mockReturnValue({
      ...mockUseContracts,
      isLoading: true,
    });
    render(<ContractList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useContracts as any).mockReturnValue({
      ...mockUseContracts,
      error: new Error("Test error"),
    });
    render(<ContractList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders contracts table with search and sort", () => {
    render(<ContractList />);
    expect(screen.getByTestId("contract-table")).toBeInTheDocument();
    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByTestId("sort")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("filters contracts based on search", async () => {
    render(<ContractList />);
    fireEvent.change(screen.getByTestId("search"), {
      target: { value: "john" },
    });
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });
  });

  it("sorts contracts based on selection", async () => {
    render(<ContractList />);
    fireEvent.change(screen.getByTestId("sort"), {
      target: { value: "contractDate" },
    });
    await waitFor(() => {
      const contractElements = screen.getAllByText(/John Doe|Jane Smith/);
      expect(contractElements[0]).toHaveTextContent("John Doe");
    });
  });

  it("opens modal for adding new contract", async () => {
    render(<ContractList />);
    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("contract-form-modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal for editing contract", async () => {
    render(<ContractList />);
    fireEvent.click(screen.getAllByText("Edit")[1]);
    expect(screen.getByTestId("contract-form-modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("handles contract copy", async () => {
    render(<ContractList />);
    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("contract-form-modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(mockUseContracts.createContract.mutate).toHaveBeenCalled();
    });
  });

  it("handles contract deletion", async () => {
    render(<ContractList />);
    fireEvent.click(screen.getAllByText("Delete")[1]);
    await waitFor(() => {
      expect(mockUseContracts.deleteContract.mutate).toHaveBeenCalledWith(1);
    });
  });

  it("handles contract update", async () => {
    render(<ContractList />);
    fireEvent.click(screen.getAllByText("Edit")[1]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(mockUseContracts.updateContract.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
  
});
