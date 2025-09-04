import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QualificationGradeList from "../../../components/qualificationGradeComponents/QualificationGradeList";
import { useQualificationGrades } from "../../../hooks/useQualificationGrades";
import { QualificationGradeInterface } from "../../../types/qualificationGrade";

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

interface QualificationGradeTableProps {
  qualificationGrades: QualificationGradeInterface[];
  onEdit: (qualificationGrade: QualificationGradeInterface) => void;
  onCopy: (qualificationGrade: QualificationGradeInterface) => void;
  onDelete: (id: number) => void;
}

interface QualificationGradeFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (qualificationGrade: QualificationGradeInterface) => void;
  initialValues?: QualificationGradeInterface;
}

vi.mock("../../../hooks/useQualificationGrades", () => ({
  useQualificationGrades: vi.fn(),
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

vi.mock("../../../components/qualificationGradeComponents/QualificationGradeTable", () => ({
  default: ({ qualificationGrades, onEdit, onCopy, onDelete }: QualificationGradeTableProps) => (
    <div data-testid="qualificationGrade-table">
      {qualificationGrades.map((emp: QualificationGradeInterface) => (
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

vi.mock("../../../components/qualificationGradeComponents/QualificationGradeFormModal", () => {
  const defaultValues: QualificationGradeInterface = {
    id: 0,
    grade: "",
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: QualificationGradeFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as QualificationGradeInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("QualificationGradeList", () => {
  const mockQualificationGrades: QualificationGradeInterface[] = [
    {
      id: 1,
      grade: "Some qualificationGrade",
    },
    {
      id: 2,
      grade: "Some qualificationGrade2",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useQualificationGrades as any).mockReturnValue({ isLoading: true });
    render(<QualificationGradeList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useQualificationGrades as any).mockReturnValue({ error: true });
    render(<QualificationGradeList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders qualificationGrades and components when loaded", () => {
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
      isLoading: false,
      error: null,
    });
    render(<QualificationGradeList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("qualificationGrade-table")).toBeInTheDocument();
    expect(screen.getByText("Some qualificationGrade")).toBeInTheDocument();
    expect(screen.getByText("Some qualificationGrade2")).toBeInTheDocument();
  });

  it.skip("filters qualificationGrades by search", async () => {
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
      isLoading: false,
      error: null,
    });
    render(<QualificationGradeList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some qualificationGrade" },
    });
    expect(screen.getByText("Some qualificationGrade")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some qualificationGrade2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts qualificationGrades by selected field", async () => {
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
      isLoading: false,
      error: null,
    });
    render(<QualificationGradeList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "qualificationGradeName" },
    });
    const table = screen.getByTestId("qualificationGrade-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some qualificationGrade2");
    expect(rows[0].textContent).toContain("Some qualificationGrade");
  });

  it("opens modal to add qualificationGrade", () => {
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
      isLoading: false,
      error: null,
    });
    render(<QualificationGradeList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit qualificationGrade", () => {
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
      isLoading: false,
      error: null,
    });
    render(<QualificationGradeList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy qualificationGrade", () => {
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
      isLoading: false,
      error: null,
    });
    render(<QualificationGradeList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("deletes qualificationGrade", () => {
    const deleteQualificationGrade = { mutate: vi.fn() };
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
      isLoading: false,
      error: null,
      deleteQualificationGrade,
    });
    render(<QualificationGradeList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteQualificationGrade.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new qualificationGrade", async () => {
    const createQualificationGrade = { mutate: vi.fn() };
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
      isLoading: false,
      error: null,
      createQualificationGrade,
    });
    render(<QualificationGradeList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createQualificationGrade.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing qualificationGrade", async () => {
    const updateQualificationGrade = { mutate: vi.fn() };
    (useQualificationGrades as any).mockReturnValue({
      data: mockQualificationGrades,
      isLoading: false,
      error: null,
      updateQualificationGrade,
    });
    render(<QualificationGradeList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateQualificationGrade.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
