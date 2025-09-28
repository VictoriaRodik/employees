import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContractFormModal from "../../../components/contractComponents/ContractFormModal";
import { useEmployees } from "../../../hooks/useEmployees";
import { useOrganizations } from "../../../hooks/useOrganizations";
import { ContractInterface } from "../../../types/contract";
import { EmployeeInterface } from "../../../types/employee";
import { OrganizationInterface } from "../../../types/organization";

vi.mock("../../../hooks/useEmployees", () => ({
  useEmployees: vi.fn(),
}));

vi.mock("../../../hooks/useOrganizations", () => ({
  useOrganizations: vi.fn(),
}));

vi.mock("../../../components/Modal", () => ({
  default: ({ open, title, children }: any) => (
    <div data-testid="modal" role="dialog" aria-label={title}>
      {open && (
        <>
          <h1>{title}</h1>
          {children}
        </>
      )}
    </div>
  ),
}));

vi.mock("../../../components/EmployeeSelector", () => ({
  default: ({ value, onChange, label, error, helperText }: any) => (
    <div data-testid="employee-selector">
      <label>{label}</label>
      <input
        data-testid="employee-input"
        value={value}
        readOnly
        placeholder="Оберіть співробітника..."
      />
      <button
        data-testid="employee-select-button"
        onClick={() => {
          // Симулюємо вибір співробітника
          onChange(1, "John Doe");
        }}
      >
        Вибрати співробітника
      </button>
      {error && <div data-testid="employee-error">{helperText}</div>}
    </div>
  ),
}));

describe("ContractFormModal", () => {
  const mockEmployees: EmployeeInterface[] = [
    {
      id: 1,
      fullName: "John Doe",
      personnelNumber: "001",
      taxId: "1234567890",
      address: "",
      passportSeries: "AB",
      passportNumber: "123456",
      passportIssueDate: "2023-01-01",
      passportIssuedBy: "5600",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      personnelNumber: "002",
      taxId: "0987654321",
      address: "",
      passportSeries: "CD",
      passportNumber: "654321",
      passportIssueDate: "2022-12-01",
      passportIssuedBy: "5600",
    },
  ];

  const mockOrganizations: OrganizationInterface[] = [
    {
      id: 10,
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
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: "Test Modal",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useEmployees as any).mockReturnValue({ data: mockEmployees });
    (useOrganizations as any).mockReturnValue({ data: mockOrganizations });
  });

  it("renders Modal with correct props when open", () => {
    render(<ContractFormModal {...defaultProps} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(1);
    expect(screen.getByTestId("employee-selector")).toBeInTheDocument();
  });

  it("does not render Modal content when closed", () => {
    render(<ContractFormModal {...defaultProps} open={false} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders ContractForm with passed props", () => {
    const initialValues: ContractInterface = {
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
    };

    render(
      <ContractFormModal {...defaultProps} initialValues={initialValues} />
    );

    const selectElement = screen.getAllByRole("combobox")[0];
    fireEvent.mouseDown(selectElement);
    const options = screen.getAllByRole("option");

    expect(selectElement).toBeInTheDocument();
    expect(screen.getByTestId("employee-selector")).toBeInTheDocument();
    options.forEach((option) => {
      expect(option).toBeInTheDocument();
    });

    const dateInput = screen.getByLabelText(
      "Дата контракту"
    ) as HTMLInputElement;
    const employeeInput = screen.getByTestId("employee-input") as HTMLInputElement;
    
    expect(dateInput.value).toBe("2025-01-01");
    expect(employeeInput.value).toBe("John Doe");
    expect(screen.getByText("Зберегти зміни")).toBeInTheDocument();
  });

  it("passes onSubmit to ContractForm and calls it with valid data", async () => {
    render(<ContractFormModal {...defaultProps} />);

    await userEvent.click(screen.getByTestId("employee-select-button"));

    const selectOrg = screen.getAllByRole("combobox")[0];
    fireEvent.mouseDown(selectOrg);
    const optionOrg = screen.getAllByRole("option")[0];
    fireEvent.click(optionOrg);

    fireEvent.change(screen.getByLabelText("Дата контракту"), {
      target: { value: "2025-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Дата закінчення контракту"), {
      target: { value: "2025-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Сума контракту"), {
      target: { value: "1000" },
    });

    fireEvent.change(screen.getByLabelText("Номер контракту"), {
      target: { value: "01-01" },
    });

    fireEvent.change(screen.getByLabelText("Зміст контракту"), {
      target: { value: "test" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Додати" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          contractDate: "2025-01-01",
          contractEndDate: "2025-01-01",
          contractAmount: "1000",
          contractContent: "test",
          contractNumber: "01-01",
          employeeId: 1,
          organizationId: 10,
        }),
        expect.any(Object)
      );
    });
  });
});
