import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmploymentTypeList from "../../../components/employmentTypeComponents/EmploymentTypeList";
import { useEmploymentTypes } from "../../../hooks/useEmploymentTypes";
import { EmploymentTypeInterface } from "../../../types/employmentType";

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

interface EmploymentTypeTableProps {
  employmentTypes: EmploymentTypeInterface[];
  onEdit: (employmentType: EmploymentTypeInterface) => void;
  onCopy: (employmentType: EmploymentTypeInterface) => void;
  onDelete: (id: number) => void;
}

interface EmploymentTypeFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (employmentType: EmploymentTypeInterface) => void;
  initialValues?: EmploymentTypeInterface;
}

vi.mock("../../../hooks/useEmploymentTypes", () => ({
  useEmploymentTypes: vi.fn(),
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

vi.mock("../../../components/employmentTypeComponents/EmploymentTypeTable", () => ({
  default: ({ employmentTypes, onEdit, onCopy, onDelete }: EmploymentTypeTableProps) => (
    <div data-testid="employmentType-table">
      {employmentTypes.map((emp: EmploymentTypeInterface) => (
        <div key={emp.id}>
          <span>{emp.employmentTypeName}</span>
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onCopy(emp)}>Copy</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/employmentTypeComponents/EmploymentTypeFormModal", () => {
  const defaultValues: EmploymentTypeInterface = {
    id: 0,
    employmentTypeName: "",
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: EmploymentTypeFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as EmploymentTypeInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("EmploymentTypeList", () => {
  const mockEmploymentTypes: EmploymentTypeInterface[] = [
    {
      id: 1,
      employmentTypeName: "Some employmentType",
    },
    {
      id: 2,
      employmentTypeName: "Some employmentType2",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useEmploymentTypes as any).mockReturnValue({ isLoading: true });
    render(<EmploymentTypeList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useEmploymentTypes as any).mockReturnValue({ error: true });
    render(<EmploymentTypeList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders employmentTypes and components when loaded", () => {
    (useEmploymentTypes as any).mockReturnValue({
      data: mockEmploymentTypes,
      isLoading: false,
      error: null,
    });
    render(<EmploymentTypeList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("employmentType-table")).toBeInTheDocument();
    expect(screen.getByText("Some employmentType")).toBeInTheDocument();
    expect(screen.getByText("Some employmentType2")).toBeInTheDocument();
  });

  it.skip("filters employmentTypes by search", async () => {
    (useEmploymentTypes as any).mockReturnValue({
      data: mockEmploymentTypes,
      isLoading: false,
      error: null,
    });
    render(<EmploymentTypeList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some employmentType" },
    });
    expect(screen.getByText("Some employmentType")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some employmentType2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts employmentTypes by selected field", async () => {
    (useEmploymentTypes as any).mockReturnValue({
      data: mockEmploymentTypes,
      isLoading: false,
      error: null,
    });
    render(<EmploymentTypeList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "employmentTypeName" },
    });
    const table = screen.getByTestId("employmentType-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some employmentType2");
    expect(rows[0].textContent).toContain("Some employmentType");
  });

  it("opens modal to add employmentType", () => {
    (useEmploymentTypes as any).mockReturnValue({
      data: mockEmploymentTypes,
      isLoading: false,
      error: null,
    });
    render(<EmploymentTypeList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit employmentType", () => {
    (useEmploymentTypes as any).mockReturnValue({
      data: mockEmploymentTypes,
      isLoading: false,
      error: null,
    });
    render(<EmploymentTypeList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy employmentType", () => {
    (useEmploymentTypes as any).mockReturnValue({
      data: mockEmploymentTypes,
      isLoading: false,
      error: null,
    });
    render(<EmploymentTypeList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("deletes employmentType", () => {
    const deleteEmploymentType = { mutate: vi.fn() };
    (useEmploymentTypes as any).mockReturnValue({
      data: mockEmploymentTypes,
      isLoading: false,
      error: null,
      deleteEmploymentType,
    });
    render(<EmploymentTypeList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteEmploymentType.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new employmentType", async () => {
    const createEmploymentType = { mutate: vi.fn() };
    (useEmploymentTypes as any).mockReturnValue({
      data: mockEmploymentTypes,
      isLoading: false,
      error: null,
      createEmploymentType,
    });
    render(<EmploymentTypeList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createEmploymentType.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing employmentType", async () => {
    const updateEmploymentType = { mutate: vi.fn() };
    (useEmploymentTypes as any).mockReturnValue({
      data: mockEmploymentTypes,
      isLoading: false,
      error: null,
      updateEmploymentType,
    });
    render(<EmploymentTypeList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateEmploymentType.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
