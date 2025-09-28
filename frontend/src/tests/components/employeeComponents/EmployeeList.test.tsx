import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmployeeList from "../../../components/employeeComponents/EmployeeList";
import { useEmployees } from "../../../hooks/useEmployees";
import { EmployeeInterface } from "../../../types/employee";

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

interface EmployeeTableProps {
  employees: EmployeeInterface[];
  onEdit: (employee: EmployeeInterface) => void;
  onCopy: (employee: EmployeeInterface) => void;
  onDelete: (id: number) => void;
}

interface EmployeeFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (employee: EmployeeInterface) => void;
  initialValues?: EmployeeInterface;
}

vi.mock("../../../hooks/useEmployees", () => ({
  useEmployees: vi.fn(),
}));

vi.mock("../../../hooks/useUrlSearchParams", () => ({
  useUrlSearchParams: () => ({
    searchParams: { get: vi.fn(() => "") },
    setSearchParams: vi.fn(),
  }),
}));

vi.mock("../../../components/Search", () => ({
  default: ({ value, onChange }: SearchProps) => (
    <input data-testid="search-input" value={value} onChange={onChange} />
  ),
}));

vi.mock("../../../components/Sort", () => ({
  default: ({ value, onChange, options }: SortProps) => (
    <select data-testid="sort-select" value={value} onChange={onChange}>
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

vi.mock("../../../components/employeeComponents/EmployeeTable", () => ({
  default: ({ employees, onEdit, onCopy, onDelete }: EmployeeTableProps) => (
    <div data-testid="employee-table">
      {employees.map((emp: EmployeeInterface) => (
        <div key={emp.id}>
          <span>{emp.fullName}</span>
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onCopy(emp)}>Copy</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/employeeComponents/EmployeeFormModal", () => {
  const defaultValues: EmployeeInterface = {
    id: 0,
    taxId: "",
    fullName: "",
    address: "",
    passportSeries: "",
    passportNumber: "",
    passportIssueDate: new Date().toLocaleDateString("en-CA"),
    passportIssuedBy: "",
    personnelNumber: "",
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: EmployeeFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as EmployeeInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("EmployeeList", () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useEmployees as any).mockReturnValue({ isLoading: true });
    render(<EmployeeList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useEmployees as any).mockReturnValue({ error: true });
    render(<EmployeeList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders employees and components when loaded", () => {
    (useEmployees as any).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
    });
    render(<EmployeeList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("employee-table")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it.skip("filters employees by search", async () => {
    (useEmployees as any).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
    });
    render(<EmployeeList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "john" },
    });
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts employees by selected field", async () => {
    (useEmployees as any).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
    });
    render(<EmployeeList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "personnelNumber" },
    });
    const table = screen.getByTestId("employee-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("John Doe");
    expect(rows[0].textContent).toContain("Jane Smith");
  });

  it("opens modal to add employee", () => {
    (useEmployees as any).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
    });
    render(<EmployeeList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit employee", () => {
    (useEmployees as any).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
    });
    render(<EmployeeList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy employee", () => {
    (useEmployees as any).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
    });
    render(<EmployeeList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Копіювання")).toBeInTheDocument();
  });

  it("deletes employee", () => {
    const deleteEmployee = { mutate: vi.fn() };
    (useEmployees as any).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
      deleteEmployee,
    });
    render(<EmployeeList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteEmployee.mutate).toHaveBeenCalledWith(2);
  });

  it("submits new employee", async () => {
    const createEmployee = { mutate: vi.fn() };
    (useEmployees as any).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
      createEmployee,
    });
    render(<EmployeeList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createEmployee.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing employee", async () => {
    const updateEmployee = { mutate: vi.fn() };
    (useEmployees as any).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
      updateEmployee,
    });
    render(<EmployeeList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateEmployee.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 2 })
      );
    });
  });
});
