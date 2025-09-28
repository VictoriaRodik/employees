import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GradeSalaryList from "../../../components/gradeSalaryComponents/GradeSalaryList";
import { useGradeSalaries } from "../../../hooks/useGradeSalaries";
import { GradeSalaryInterface } from "../../../types/gradeSalary";

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

interface GradeSalaryTableProps {
  gradeSalaries: GradeSalaryInterface[];
  onEdit: (gradeSalary: GradeSalaryInterface) => void;
  onCopy: (gradeSalary: GradeSalaryInterface) => void;
  onDelete: (id: number) => void;
}

interface GradeSalaryFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (gradeSalary: GradeSalaryInterface) => void;
  initialValues?: GradeSalaryInterface;
}

vi.mock("../../../hooks/useGradeSalaries", () => ({
  useGradeSalaries: vi.fn(),
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

vi.mock("../../../components/gradeSalaryComponents/GradeSalaryTable", () => ({
  default: ({ gradeSalaries, onEdit, onCopy, onDelete }: GradeSalaryTableProps) => (
    <div data-testid="gradeSalary-table">
      {gradeSalaries.map((emp: GradeSalaryInterface) => (
        <div key={emp.id}>
          <span>{emp.grade}</span>
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onCopy(emp)}>Copy</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/gradeSalaryComponents/GradeSalaryFormModal", () => {
  const defaultValues: GradeSalaryInterface = {
    id: 0,
    grade: "",
    baseSalary: 0,
    effectiveFrom: "",
    gradeId: 0,
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: GradeSalaryFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as GradeSalaryInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("GradeSalaryList", () => {
  const mockGradeSalaries: GradeSalaryInterface[] = [
    {
      id: 1,
      grade: "Some gradeSalary",
      baseSalary: 10000,
      effectiveFrom: "2021-01-01",
      gradeId: 0,
    },
    {
      id: 2,
      grade: "Some gradeSalary2",
      baseSalary: 10000,
      effectiveFrom: "2021-01-01",
      gradeId: 0,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useGradeSalaries as any).mockReturnValue({ isLoading: true });
    render(<GradeSalaryList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useGradeSalaries as any).mockReturnValue({ error: true });
    render(<GradeSalaryList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders gradeSalaries and components when loaded", () => {
    (useGradeSalaries as any).mockReturnValue({
      data: mockGradeSalaries,
      isLoading: false,
      error: null,
    });
    render(<GradeSalaryList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("gradeSalary-table")).toBeInTheDocument();
    expect(screen.getByText("Some gradeSalary")).toBeInTheDocument();
    expect(screen.getByText("Some gradeSalary2")).toBeInTheDocument();
  });

  it.skip("filters gradeSalaries by search", async () => {
    (useGradeSalaries as any).mockReturnValue({
      data: mockGradeSalaries,
      isLoading: false,
      error: null,
    });
    render(<GradeSalaryList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some gradeSalary" },
    });
    expect(screen.getByText("Some gradeSalary")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some gradeSalary2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts gradeSalaries by selected field", async () => {
    (useGradeSalaries as any).mockReturnValue({
      data: mockGradeSalaries,
      isLoading: false,
      error: null,
    });
    render(<GradeSalaryList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "gradeSalaryName" },
    });
    const table = screen.getByTestId("gradeSalary-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some gradeSalary2");
    expect(rows[0].textContent).toContain("Some gradeSalary");
  });

  it("opens modal to add gradeSalary", () => {
    (useGradeSalaries as any).mockReturnValue({
      data: mockGradeSalaries,
      isLoading: false,
      error: null,
    });
    render(<GradeSalaryList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit gradeSalary", () => {
    (useGradeSalaries as any).mockReturnValue({
      data: mockGradeSalaries,
      isLoading: false,
      error: null,
    });
    render(<GradeSalaryList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy gradeSalary", () => {
    (useGradeSalaries as any).mockReturnValue({
      data: mockGradeSalaries,
      isLoading: false,
      error: null,
    });
    render(<GradeSalaryList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Копіювання")).toBeInTheDocument();
  });

  it("deletes gradeSalary", () => {
    const deleteGradeSalary = { mutate: vi.fn() };
    (useGradeSalaries as any).mockReturnValue({
      data: mockGradeSalaries,
      isLoading: false,
      error: null,
      deleteGradeSalary,
    });
    render(<GradeSalaryList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteGradeSalary.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new gradeSalary", async () => {
    const createGradeSalary = { mutate: vi.fn() };
    (useGradeSalaries as any).mockReturnValue({
      data: mockGradeSalaries,
      isLoading: false,
      error: null,
      createGradeSalary,
    });
    render(<GradeSalaryList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createGradeSalary.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing gradeSalary", async () => {
    const updateGradeSalary = { mutate: vi.fn() };
    (useGradeSalaries as any).mockReturnValue({
      data: mockGradeSalaries,
      isLoading: false,
      error: null,
      updateGradeSalary,
    });
    render(<GradeSalaryList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateGradeSalary.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
