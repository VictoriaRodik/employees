import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DepartmentList from "../../../components/departmentComponents/DepartmentList";
import { useDepartments } from "../../../hooks/useDepartments";
import { DepartmentInterface } from "../../../types/department";

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

interface DepartmentTableProps {
  departments: DepartmentInterface[];
  onEdit: (department: DepartmentInterface) => void;
  onCopy: (department: DepartmentInterface) => void;
  onDelete: (id: number) => void;
}

interface DepartmentFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (department: DepartmentInterface) => void;
  initialValues?: DepartmentInterface;
}

vi.mock("../../../hooks/useDepartments", () => ({
  useDepartments: vi.fn(),
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

vi.mock("../../../components/departmentComponents/DepartmentTable", () => ({
  default: ({ departments, onEdit, onCopy, onDelete }: DepartmentTableProps) => (
    <div data-testid="department-table">
      {departments.map((emp: DepartmentInterface) => (
        <div key={emp.id}>
          <span>{emp.departmentName}</span>
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onCopy(emp)}>Copy</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/departmentComponents/DepartmentFormModal", () => {
  const defaultValues: DepartmentInterface = {
    id: 0,
    departmentName: "",
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: DepartmentFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as DepartmentInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("DepartmentList", () => {
  const mockDepartments: DepartmentInterface[] = [
    {
      id: 1,
      departmentName: "Some department",
    },
    {
      id: 2,
      departmentName: "Some department2",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useDepartments as any).mockReturnValue({ isLoading: true });
    render(<DepartmentList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useDepartments as any).mockReturnValue({ error: true });
    render(<DepartmentList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders departments and components when loaded", () => {
    (useDepartments as any).mockReturnValue({
      data: mockDepartments,
      isLoading: false,
      error: null,
    });
    render(<DepartmentList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("department-table")).toBeInTheDocument();
    expect(screen.getByText("Some department")).toBeInTheDocument();
    expect(screen.getByText("Some department2")).toBeInTheDocument();
  });

  it.skip("filters departments by search", async () => {
    (useDepartments as any).mockReturnValue({
      data: mockDepartments,
      isLoading: false,
      error: null,
    });
    render(<DepartmentList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some department" },
    });
    expect(screen.getByText("Some department")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some department2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts departments by selected field", async () => {
    (useDepartments as any).mockReturnValue({
      data: mockDepartments,
      isLoading: false,
      error: null,
    });
    render(<DepartmentList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "departmentName" },
    });
    const table = screen.getByTestId("department-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some department2");
    expect(rows[0].textContent).toContain("Some department");
  });

  it("opens modal to add department", () => {
    (useDepartments as any).mockReturnValue({
      data: mockDepartments,
      isLoading: false,
      error: null,
    });
    render(<DepartmentList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit department", () => {
    (useDepartments as any).mockReturnValue({
      data: mockDepartments,
      isLoading: false,
      error: null,
    });
    render(<DepartmentList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy department", () => {
    (useDepartments as any).mockReturnValue({
      data: mockDepartments,
      isLoading: false,
      error: null,
    });
    render(<DepartmentList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Копіювання")).toBeInTheDocument();
  });

  it("deletes department", () => {
    const deleteDepartment = { mutate: vi.fn() };
    (useDepartments as any).mockReturnValue({
      data: mockDepartments,
      isLoading: false,
      error: null,
      deleteDepartment,
    });
    render(<DepartmentList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteDepartment.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new department", async () => {
    const createDepartment = { mutate: vi.fn() };
    (useDepartments as any).mockReturnValue({
      data: mockDepartments,
      isLoading: false,
      error: null,
      createDepartment,
    });
    render(<DepartmentList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createDepartment.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing department", async () => {
    const updateDepartment = { mutate: vi.fn() };
    (useDepartments as any).mockReturnValue({
      data: mockDepartments,
      isLoading: false,
      error: null,
      updateDepartment,
    });
    render(<DepartmentList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateDepartment.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
