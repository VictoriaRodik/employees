import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WorkScheduleTable from "../../../components/workScheduleComponents/WorkSheduleTable";
import { WorkScheduleInterface } from "../../../types/workSchedule";

interface ActionsProps {
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

vi.mock("../../../components/Actions", () => ({
  default: ({ onEdit, onCopy, onDelete }: ActionsProps) => (
    <div data-testid="action-buttons">
      <button data-testid="edit-button" onClick={onEdit}>
        Edit
      </button>
      <button data-testid="copy-button" onClick={onCopy}>
        Copy
      </button>
      <button data-testid="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  ),
}));

describe("WorkScheduleTable", () => {
  const mockWorkSchedules: WorkScheduleInterface[] = [
    { id: 1, workScheduleName: "IT WorkSchedule", hoursPerWeek: 40 },
    { id: 2, workScheduleName: "HR WorkSchedule", hoursPerWeek: 40 },
    { id: 3, workScheduleName: "Finance WorkSchedule", hoursPerWeek: 40 },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders workSchedules table", () => {
    render(
      <WorkScheduleTable
        workSchedules={mockWorkSchedules}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT WorkSchedule")).toBeInTheDocument();
    expect(screen.getByText("HR WorkSchedule")).toBeInTheDocument();
    expect(screen.getByText("Finance WorkSchedule")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <WorkScheduleTable
        workSchedules={mockWorkSchedules}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Годин на тиждень")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders action buttons for each workSchedule", () => {
    render(
      <WorkScheduleTable
        workSchedules={mockWorkSchedules}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const actionButtons = screen.getAllByTestId("action-buttons");
    expect(actionButtons).toHaveLength(3);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <WorkScheduleTable
        workSchedules={mockWorkSchedules}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockWorkSchedules[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <WorkScheduleTable
        workSchedules={mockWorkSchedules}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockWorkSchedules[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <WorkScheduleTable
        workSchedules={mockWorkSchedules}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockWorkSchedules[0].id);
  });

  it("renders empty table when no workSchedules", () => {
    render(
      <WorkScheduleTable
        workSchedules={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Годин на тиждень")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT WorkSchedule")).not.toBeInTheDocument();
  });

  it("displays workSchedule names correctly", () => {
    render(
      <WorkScheduleTable
        workSchedules={mockWorkSchedules}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT WorkSchedule")).toBeInTheDocument();
    expect(screen.getByText("HR WorkSchedule")).toBeInTheDocument();
    expect(screen.getByText("Finance WorkSchedule")).toBeInTheDocument();
  });

  it("displays workSchedule hoursPerWeek correctly", () => {
    render(
      <WorkScheduleTable
        workSchedules={mockWorkSchedules}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getAllByText("40")).toHaveLength(3);
  });
});
