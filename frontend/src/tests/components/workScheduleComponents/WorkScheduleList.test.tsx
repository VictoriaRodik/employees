import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WorkScheduleList from "../../../components/workScheduleComponents/WorkScheduleList";
import { useWorkSchedules } from "../../../hooks/useWorkSchedules";
import { WorkScheduleInterface } from "../../../types/workSchedule";

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

interface WorkScheduleTableProps {
  workSchedules: WorkScheduleInterface[];
  onEdit: (workSchedule: WorkScheduleInterface) => void;
  onCopy: (workSchedule: WorkScheduleInterface) => void;
  onDelete: (id: number) => void;
}

interface WorkScheduleFormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (workSchedule: WorkScheduleInterface) => void;
  initialValues?: WorkScheduleInterface;
}

vi.mock("../../../hooks/useWorkSchedules", () => ({
  useWorkSchedules: vi.fn(),
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

vi.mock("../../../components/workScheduleComponents/WorkSheduleTable", () => ({
  default: ({ workSchedules, onEdit, onCopy, onDelete }: WorkScheduleTableProps) => (
    <div data-testid="workSchedule-table">
      {workSchedules.map((workSchedule: WorkScheduleInterface) => (
        <div key={workSchedule.id}>
          <span>{workSchedule.workScheduleName}</span>
          <span>{workSchedule.hoursPerWeek}</span>
          <button onClick={() => onEdit(workSchedule)}>Edit</button>
          <button onClick={() => onCopy(workSchedule)}>Copy</button>
          <button onClick={() => onDelete(workSchedule.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));


vi.mock("../../../components/workScheduleComponents/WorkScheduleFormModal", () => {
  const defaultValues: WorkScheduleInterface = {
    id: 0,
    workScheduleName: "",
    hoursPerWeek: 40,
  };

  return {
    default: ({
      open,
      title,
      onClose,
      onSubmit,
      initialValues,
    }: WorkScheduleFormModalProps) =>
      open ? (
        <div data-testid="modal">
          <h1>{title}</h1>
          <button
            onClick={() =>
              onSubmit({
                ...defaultValues,
                ...(initialValues || {}),
                id: initialValues?.id || 0,
              } as WorkScheduleInterface)
            }
          >
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

describe("WorkScheduleList", () => {
  const mockWorkSchedules: WorkScheduleInterface[] = [
    {
      id: 1,
      workScheduleName: "Some workSchedule",
      hoursPerWeek: 40,
    },
    {
      id: 2,
      workScheduleName: "Some workSchedule2",
      hoursPerWeek: 40,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useWorkSchedules as any).mockReturnValue({ isLoading: true });
    render(<WorkScheduleList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useWorkSchedules as any).mockReturnValue({ error: true });
    render(<WorkScheduleList />);
    expect(screen.getByText("Помилка при завантаженні")).toBeInTheDocument();
  });

  it("renders workSchedules and components when loaded", () => {
    (useWorkSchedules as any).mockReturnValue({
      data: mockWorkSchedules,
      isLoading: false,
      error: null,
    });
    render(<WorkScheduleList />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-select")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("workSchedule-table")).toBeInTheDocument();
    expect(screen.getByText("Some workSchedule")).toBeInTheDocument();
    expect(screen.getByText("Some workSchedule2")).toBeInTheDocument();
  });

  it.skip("filters workSchedules by search", async () => {
    (useWorkSchedules as any).mockReturnValue({
      data: mockWorkSchedules,
      isLoading: false,
      error: null,
    });
    render(<WorkScheduleList />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Some workSchedule" },
    });
    expect(screen.getByText("Some workSchedule")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Some workSchedule2")).not.toBeInTheDocument();
    });
  });

  it.skip("sorts workSchedules by selected field", async () => {
    (useWorkSchedules as any).mockReturnValue({
      data: mockWorkSchedules,
      isLoading: false,
      error: null,
    });
    render(<WorkScheduleList />);

    fireEvent.change(screen.getByTestId("sort-select"), {
      target: { value: "workScheduleName" },
    });
    const table = screen.getByTestId("workSchedule-table");
    const rows = table.children;
    expect(rows[1].textContent).toContain("Some workSchedule2");
    expect(rows[0].textContent).toContain("Some workSchedule");
  });

  it("opens modal to add workSchedule", () => {
    (useWorkSchedules as any).mockReturnValue({
      data: mockWorkSchedules,
      isLoading: false,
      error: null,
    });
    render(<WorkScheduleList />);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("opens modal to edit workSchedule", () => {
    (useWorkSchedules as any).mockReturnValue({
      data: mockWorkSchedules,
      isLoading: false,
      error: null,
    });
    render(<WorkScheduleList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Редагування")).toBeInTheDocument();
  });

  it("opens modal to copy workSchedule", () => {
    (useWorkSchedules as any).mockReturnValue({
      data: mockWorkSchedules,
      isLoading: false,
      error: null,
    });
    render(<WorkScheduleList />);

    fireEvent.click(screen.getAllByText("Copy")[1]);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Введення")).toBeInTheDocument();
  });

  it("deletes workSchedule", () => {
    const deleteWorkSchedule = { mutate: vi.fn() };
    (useWorkSchedules as any).mockReturnValue({
      data: mockWorkSchedules,
      isLoading: false,
      error: null,
      deleteWorkSchedule,
    });
    render(<WorkScheduleList />);

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(deleteWorkSchedule.mutate).toHaveBeenCalledWith(1);
  });

  it("submits new workSchedule", async () => {
    const createWorkSchedule = { mutate: vi.fn() };
    (useWorkSchedules as any).mockReturnValue({
      data: mockWorkSchedules,
      isLoading: false,
      error: null,
      createWorkSchedule,
    });
    render(<WorkScheduleList />);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(createWorkSchedule.mutate).toHaveBeenCalled();
    });
  });

  it("updates existing workSchedule", async () => {
    const updateWorkSchedule = { mutate: vi.fn() };
    (useWorkSchedules as any).mockReturnValue({
      data: mockWorkSchedules,
      isLoading: false,
      error: null,
      updateWorkSchedule,
    });
    render(<WorkScheduleList />);

    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(updateWorkSchedule.mutate).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 })
      );
    });
  });
});
