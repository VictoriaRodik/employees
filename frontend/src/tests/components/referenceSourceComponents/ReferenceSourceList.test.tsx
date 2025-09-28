import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReferenceSourceList from "../../../components/referenceSourceComponents/ReferenceSourceList";
import { useReferenceSources } from "../../../hooks/useReferenceSources";
import { ReferenceSourceInterface } from "../../../types/referenceSource";

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

interface ReferenceSourceTableProps {
  referenceSources: ReferenceSourceInterface[];
  onEdit: (referenceSource: ReferenceSourceInterface) => void;
  onCopy: (referenceSource: ReferenceSourceInterface) => void;
  onDelete: (id: number) => void;
}

interface ReferenceSourceFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (referenceSource: ReferenceSourceInterface) => void;
  initialValues?: ReferenceSourceInterface;
}

vi.mock("../../../hooks/useReferenceSources", () => ({
  useReferenceSources: vi.fn(),
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

vi.mock("../../../components/referenceSourceComponents/ReferenceSourceTable", () => ({
  default: ({ referenceSources, onEdit, onCopy, onDelete }: ReferenceSourceTableProps) => (
    <div data-testid="referenceSource-table">
      {referenceSources.map((emp: ReferenceSourceInterface) => (
        <div key={emp.id}>
          <span>{emp.tableName}</span>
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onCopy(emp)}>Copy</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/referenceSourceComponents/ReferenceSourceFormModal", () => {
  const defaultValues: ReferenceSourceInterface = {
    id: 0,
    tableName: "",
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: ReferenceSourceFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as ReferenceSourceInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("ReferenceSourceList", () => {
  const mockReferenceSources: ReferenceSourceInterface[] = [
    {
      id: 1,
      tableName: "Some referenceSource",
    },
    {
      id: 2,
      tableName: "Some referenceSource2",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useReferenceSources as any).mockReturnValue({ isLoading: true });
    render(<ReferenceSourceList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useReferenceSources as any).mockReturnValue({ error: true });
    render(<ReferenceSourceList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders referenceSources and components when loaded", () => {
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
      isLoading: false,
      error: null,
    });
    render(<ReferenceSourceList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("referenceSource-table")).toBeInTheDocument();
    expect(screen.getByText("Some referenceSource")).toBeInTheDocument();
    expect(screen.getByText("Some referenceSource2")).toBeInTheDocument();
  });

  it.skip("filters referenceSources by search", async () => {
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
      isLoading: false,
      error: null,
    });
    render(<ReferenceSourceList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some referenceSource" },
    });
    expect(screen.getByText("Some referenceSource")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some referenceSource2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts referenceSources by selected field", async () => {
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
      isLoading: false,
      error: null,
    });
    render(<ReferenceSourceList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "referenceSourceName" },
    });
    const table = screen.getByTestId("referenceSource-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some referenceSource2");
    expect(rows[0].textContent).toContain("Some referenceSource");
  });

  it("opens modal to add referenceSource", () => {
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
      isLoading: false,
      error: null,
    });
    render(<ReferenceSourceList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit referenceSource", () => {
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
      isLoading: false,
      error: null,
    });
    render(<ReferenceSourceList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy referenceSource", () => {
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
      isLoading: false,
      error: null,
    });
    render(<ReferenceSourceList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Копіювання")).toBeInTheDocument();
  });

  it("deletes referenceSource", () => {
    const deleteReferenceSource = { mutate: vi.fn() };
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
      isLoading: false,
      error: null,
      deleteReferenceSource,
    });
    render(<ReferenceSourceList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteReferenceSource.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new referenceSource", async () => {
    const createReferenceSource = { mutate: vi.fn() };
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
      isLoading: false,
      error: null,
      createReferenceSource,
    });
    render(<ReferenceSourceList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createReferenceSource.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing referenceSource", async () => {
    const updateReferenceSource = { mutate: vi.fn() };
    (useReferenceSources as any).mockReturnValue({
      data: mockReferenceSources,
      isLoading: false,
      error: null,
      updateReferenceSource,
    });
    render(<ReferenceSourceList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateReferenceSource.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
