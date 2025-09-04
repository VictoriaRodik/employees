import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmploymentConditionList from "../../../components/employmentConditionComponents/EmploymentConditionList";
import { EmploymentConditionInterface } from "../../../types/employmentCondition";
import { useEmploymentConditions } from "../../../hooks/useEmploymentConditions";

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

interface employmentConditionTableProps {
  employmentConditions: EmploymentConditionInterface[];
  onEdit: (employmentCondition: EmploymentConditionInterface) => void;
  onCopy: (employmentCondition: EmploymentConditionInterface) => void;
  onDelete: (id: number) => void;
}

interface employmentConditionFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (employmentCondition: EmploymentConditionInterface) => void;
  initialValues?: EmploymentConditionInterface;
}

vi.mock(
  import("../../../hooks/useEmploymentConditions"),
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useEmploymentConditions: vi.fn(),
    };
  }
);

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

vi.mock(
  "../../../components/employmentConditionComponents/EmploymentConditionTable",
  () => ({
    default: ({
      employmentConditions,
      onEdit,
      onCopy,
      onDelete,
    }: employmentConditionTableProps) => (
      <div data-testid="employmentCondition-table">
        {employmentConditions.map((emp: EmploymentConditionInterface) => (
          <div key={emp.id}>
            <span>{emp.employmentConditionName}</span>
            <button onClick={() => onEdit(emp)}>Edit</button>
            <button onClick={() => onCopy(emp)}>Copy</button>
            <button onClick={() => onDelete(emp.id)}>Delete</button>
          </div>
        ))}
      </div>
    ),
  })
);

vi.mock(
  "../../../components/employmentConditionComponents/employmentConditionFormModal",
  () => {
    const defaultValues: EmploymentConditionInterface = {
      id: 0,
      employmentConditionName: "",
    };

    return {
      default: ({
        open,
        title,
        onClose,
        onSubmit,
        initialValues,
      }: employmentConditionFormModalProps) =>
        open ? (
          <div data-testid="modal">
            <h1>{title}</h1>
            <button
              onClick={() =>
                onSubmit({
                  ...defaultValues,
                  ...(initialValues || {}),
                  id: initialValues?.id || 0,
                } as EmploymentConditionInterface)
              }
            >
              Submit
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        ) : null,
    };
  }
);

describe("employmentConditionList", () => {
  const mockEmploymentConditions: EmploymentConditionInterface[] = [
    {
      id: 1,
      employmentConditionName: "Some employmentCondition",
    },
    {
      id: 2,
      employmentConditionName: "Some employmentCondition2",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useEmploymentConditions as any).mockReturnValue({ isLoading: true });
    render(<EmploymentConditionList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useEmploymentConditions as any).mockReturnValue({ error: true });
    render(<EmploymentConditionList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders employmentConditions and components when loaded", () => {
    (useEmploymentConditions as any).mockReturnValue({
      data: mockEmploymentConditions,
      isLoading: false,
      error: null,
    });
    render(<EmploymentConditionList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("employmentCondition-table")).toBeInTheDocument();
    expect(screen.getByText("Some employmentCondition")).toBeInTheDocument();
    expect(screen.getByText("Some employmentCondition2")).toBeInTheDocument();
  });

  it.skip("filters employmentConditions by search", async () => {
    (useEmploymentConditions as any).mockReturnValue({
      data: mockEmploymentConditions,
      isLoading: false,
      error: null,
    });
    render(<EmploymentConditionList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some employmentCondition" },
    });
    expect(screen.getByText("Some employmentCondition")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText("Some employmentCondition2")
      ).not.toBeInTheDocument();
    });
  });

  it.skip("sorts employmentConditions by selected field", async () => {
    (useEmploymentConditions as any).mockReturnValue({
      data: mockEmploymentConditions,
      isLoading: false,
      error: null,
    });
    render(<EmploymentConditionList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "employmentConditionName" },
    });
    const table = screen.getByTestId("employmentCondition-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some employmentCondition2");
    expect(rows[0].textContent).toContain("Some employmentCondition");
  });

  it("opens modal to add employmentCondition", () => {
    (useEmploymentConditions as any).mockReturnValue({
      data: mockEmploymentConditions,
      isLoading: false,
      error: null,
    });
    render(<EmploymentConditionList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit employmentCondition", () => {
    (useEmploymentConditions as any).mockReturnValue({
      data: mockEmploymentConditions,
      isLoading: false,
      error: null,
    });
    render(<EmploymentConditionList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy employmentCondition", () => {
    (useEmploymentConditions as any).mockReturnValue({
      data: mockEmploymentConditions,
      isLoading: false,
      error: null,
    });
    render(<EmploymentConditionList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("deletes employmentCondition", () => {
    const deleteEmploymentCondition = { mutate: vi.fn() };
    (useEmploymentConditions as any).mockReturnValue({
      data: mockEmploymentConditions,
      isLoading: false,
      error: null,
      deleteEmploymentCondition,
    });
    render(<EmploymentConditionList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteEmploymentCondition.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new employmentCondition", async () => {
    const createEmploymentCondition = { mutate: vi.fn() };
    (useEmploymentConditions as any).mockReturnValue({
      data: mockEmploymentConditions,
      isLoading: false,
      error: null,
      createEmploymentCondition,
    });
    render(<EmploymentConditionList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createEmploymentCondition.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing employmentCondition", async () => {
    const updateEmploymentCondition = { mutate: vi.fn() };
    (useEmploymentConditions as any).mockReturnValue({
      data: mockEmploymentConditions,
      isLoading: false,
      error: null,
      updateEmploymentCondition,
    });
    render(<EmploymentConditionList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateEmploymentCondition.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
