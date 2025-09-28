import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PositionList from "../../../components/positionComponents/PositionList";
import { usePositions } from "../../../hooks/usePositions";
import { PositionInterface } from "../../../types/position";

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

interface PositionTableProps {
  positions: PositionInterface[];
  onEdit: (position: PositionInterface) => void;
  onCopy: (position: PositionInterface) => void;
  onDelete: (id: number) => void;
}

interface PositionFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (position: PositionInterface) => void;
  initialValues?: PositionInterface;
}

vi.mock("../../../hooks/usePositions", () => ({
  usePositions: vi.fn(),
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

vi.mock("../../../components/positionComponents/PositionTable", () => ({
  default: ({ positions, onEdit, onCopy, onDelete }: PositionTableProps) => (
    <div data-testid="position-table">
      {positions.map((emp: PositionInterface) => (
        <div key={emp.id}>
          <span>{emp.positionName}</span>
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onCopy(emp)}>Copy</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/positionComponents/PositionFormModal", () => {
  const defaultValues: PositionInterface = {
    id: 0,
    positionName: "",
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: PositionFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as PositionInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("PositionList", () => {
  const mockPositions: PositionInterface[] = [
    {
      id: 1,
      positionName: "Some position",
    },
    {
      id: 2,
      positionName: "Some position2",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (usePositions as any).mockReturnValue({ isLoading: true });
    render(<PositionList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (usePositions as any).mockReturnValue({ error: true });
    render(<PositionList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders positions and components when loaded", () => {
    (usePositions as any).mockReturnValue({
      data: mockPositions,
      isLoading: false,
      error: null,
    });
    render(<PositionList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("position-table")).toBeInTheDocument();
    expect(screen.getByText("Some position")).toBeInTheDocument();
    expect(screen.getByText("Some position2")).toBeInTheDocument();
  });

  it.skip("filters positions by search", async () => {
    (usePositions as any).mockReturnValue({
      data: mockPositions,
      isLoading: false,
      error: null,
    });
    render(<PositionList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some position" },
    });
    expect(screen.getByText("Some position")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some position2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts positions by selected field", async () => {
    (usePositions as any).mockReturnValue({
      data: mockPositions,
      isLoading: false,
      error: null,
    });
    render(<PositionList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "positionName" },
    });
    const table = screen.getByTestId("position-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some position2");
    expect(rows[0].textContent).toContain("Some position");
  });

  it("opens modal to add position", () => {
    (usePositions as any).mockReturnValue({
      data: mockPositions,
      isLoading: false,
      error: null,
    });
    render(<PositionList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit position", () => {
    (usePositions as any).mockReturnValue({
      data: mockPositions,
      isLoading: false,
      error: null,
    });
    render(<PositionList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy position", () => {
    (usePositions as any).mockReturnValue({
      data: mockPositions,
      isLoading: false,
      error: null,
    });
    render(<PositionList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Копіювання")).toBeInTheDocument();
  });

  it("deletes position", () => {
    const deletePosition = { mutate: vi.fn() };
    (usePositions as any).mockReturnValue({
      data: mockPositions,
      isLoading: false,
      error: null,
      deletePosition,
    });
    render(<PositionList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deletePosition.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new position", async () => {
    const createPosition = { mutate: vi.fn() };
    (usePositions as any).mockReturnValue({
      data: mockPositions,
      isLoading: false,
      error: null,
      createPosition,
    });
    render(<PositionList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createPosition.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing position", async () => {
    const updatePosition = { mutate: vi.fn() };
    (usePositions as any).mockReturnValue({
      data: mockPositions,
      isLoading: false,
      error: null,
      updatePosition,
    });
    render(<PositionList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updatePosition.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
