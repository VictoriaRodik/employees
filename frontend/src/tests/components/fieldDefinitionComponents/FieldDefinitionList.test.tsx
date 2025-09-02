import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FieldDefinitionList from "../../../components/fieldDefinitionComponents/FieldDefinitionList";
import { useFieldDefinitions } from "../../../hooks/useFieldDefinitions";
import { FieldDefinitionInterface } from "../../../types/fieldDefinition";

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

interface FieldDefinitionTableProps {
  fieldDefinitions: FieldDefinitionInterface[];
  onEdit: (fieldDefinition: FieldDefinitionInterface) => void;
  onCopy: (fieldDefinition: FieldDefinitionInterface) => void;
  onDelete: (id: number) => void;
}

interface FieldDefinitionFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (fieldDefinition: FieldDefinitionInterface) => void;
  initialValues?: FieldDefinitionInterface;
}

vi.mock("../../../hooks/useFieldDefinitions", () => ({
  useFieldDefinitions: vi.fn(),
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

vi.mock("../../../components/fieldDefinitionComponents/FieldDefinitionTable", () => ({
  default: ({ fieldDefinitions, onEdit, onCopy, onDelete }: FieldDefinitionTableProps) => (
    <div data-testid="fieldDefinition-table">
      {fieldDefinitions.map((emp: FieldDefinitionInterface) => (
        <div key={emp.id}>
          <span>{emp.fieldName}</span>
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onCopy(emp)}>Copy</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/fieldDefinitionComponents/FieldDefinitionFormModal", () => {
  const defaultValues: FieldDefinitionInterface = {
    id: 0,
    fieldName: "",
    fieldType: "number",
    orderIndex: 0,
    referenceSourceId: null,
    referenceSourceName: null
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: FieldDefinitionFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as FieldDefinitionInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("FieldDefinitionList", () => {
  const mockFieldDefinitions: FieldDefinitionInterface[] = [
    {
      id: 1,
      fieldName: "Some fieldDefinition",
      fieldType: "number",
      orderIndex: 0,
      referenceSourceId: null,
      referenceSourceName: null
    },
    {
      id: 2,
      fieldName: "Some fieldDefinition2",
      fieldType: "number",
      orderIndex: 0,
      referenceSourceId: null,
      referenceSourceName: null
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useFieldDefinitions as any).mockReturnValue({ isLoading: true });
    render(<FieldDefinitionList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useFieldDefinitions as any).mockReturnValue({ error: true });
    render(<FieldDefinitionList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders fieldDefinitions and components when loaded", () => {
    (useFieldDefinitions as any).mockReturnValue({
      data: mockFieldDefinitions,
      isLoading: false,
      error: null,
    });
    render(<FieldDefinitionList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("fieldDefinition-table")).toBeInTheDocument();
    expect(screen.getByText("Some fieldDefinition")).toBeInTheDocument();
    expect(screen.getByText("Some fieldDefinition2")).toBeInTheDocument();
  });

  it.skip("filters fieldDefinitions by search", async () => {
    (useFieldDefinitions as any).mockReturnValue({
      data: mockFieldDefinitions,
      isLoading: false,
      error: null,
    });
    render(<FieldDefinitionList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some fieldDefinition" },
    });
    expect(screen.getByText("Some fieldDefinition")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some fieldDefinition2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts fieldDefinitions by selected field", async () => {
    (useFieldDefinitions as any).mockReturnValue({
      data: mockFieldDefinitions,
      isLoading: false,
      error: null,
    });
    render(<FieldDefinitionList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "fieldDefinitionName" },
    });
    const table = screen.getByTestId("fieldDefinition-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some fieldDefinition2");
    expect(rows[0].textContent).toContain("Some fieldDefinition");
  });

  it("opens modal to add fieldDefinition", () => {
    (useFieldDefinitions as any).mockReturnValue({
      data: mockFieldDefinitions,
      isLoading: false,
      error: null,
    });
    render(<FieldDefinitionList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit fieldDefinition", () => {
    (useFieldDefinitions as any).mockReturnValue({
      data: mockFieldDefinitions,
      isLoading: false,
      error: null,
    });
    render(<FieldDefinitionList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy fieldDefinition", () => {
    (useFieldDefinitions as any).mockReturnValue({
      data: mockFieldDefinitions,
      isLoading: false,
      error: null,
    });
    render(<FieldDefinitionList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("deletes fieldDefinition", () => {
    const deleteFieldDefinition = { mutate: vi.fn() };
    (useFieldDefinitions as any).mockReturnValue({
      data: mockFieldDefinitions,
      isLoading: false,
      error: null,
      deleteFieldDefinition,
    });
    render(<FieldDefinitionList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteFieldDefinition.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new fieldDefinition", async () => {
    const createFieldDefinition = { mutate: vi.fn() };
    (useFieldDefinitions as any).mockReturnValue({
      data: mockFieldDefinitions,
      isLoading: false,
      error: null,
      createFieldDefinition,
    });
    render(<FieldDefinitionList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createFieldDefinition.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing fieldDefinition", async () => {
    const updateFieldDefinition = { mutate: vi.fn() };
    (useFieldDefinitions as any).mockReturnValue({
      data: mockFieldDefinitions,
      isLoading: false,
      error: null,
      updateFieldDefinition,
    });
    render(<FieldDefinitionList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateFieldDefinition.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
