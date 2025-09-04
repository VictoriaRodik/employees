import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmploymentConditionTable from "../../../components/employmentConditionComponents/EmploymentConditionTable";
import { EmploymentConditionInterface } from "../../../types/employmentCondition";

interface ActionButtonsProps {
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

vi.mock("../../../components/Actions", () => ({
  default: ({ onEdit, onCopy, onDelete }: ActionButtonsProps) => (
    <div data-testid="actions">
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

describe("EmploymentConditionTable", () => {
  const mockEmploymentConditions: EmploymentConditionInterface[] = [
    { id: 1, employmentConditionName: "IT EmploymentCondition" },
    { id: 2, employmentConditionName: "HR EmploymentCondition" },
    { id: 3, employmentConditionName: "Finance EmploymentCondition" },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders employmentconditions table", () => {
    render(
      <EmploymentConditionTable
        employmentConditions={mockEmploymentConditions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT EmploymentCondition")).toBeInTheDocument();
    expect(screen.getByText("HR EmploymentCondition")).toBeInTheDocument();
    expect(screen.getByText("Finance EmploymentCondition")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <EmploymentConditionTable
        employmentConditions={mockEmploymentConditions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders action buttons for each employmentcondition", () => {
    render(
      <EmploymentConditionTable
        employmentConditions={mockEmploymentConditions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const actionButtons = screen.getAllByTestId("actions");
    expect(actionButtons).toHaveLength(3);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <EmploymentConditionTable
        employmentConditions={mockEmploymentConditions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalled();
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <EmploymentConditionTable
        employmentConditions={mockEmploymentConditions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalled();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <EmploymentConditionTable
        employmentConditions={mockEmploymentConditions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalled();
  });

  it("renders empty table when no employmentConditions", () => {
    render(
      <EmploymentConditionTable
        employmentConditions={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT EmploymentCondition")).not.toBeInTheDocument();
  });

  it("displays employmentCondition names correctly", () => {
    render(
      <EmploymentConditionTable
        employmentConditions={mockEmploymentConditions}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT EmploymentCondition")).toBeInTheDocument();
    expect(screen.getByText("HR EmploymentCondition")).toBeInTheDocument();
    expect(screen.getByText("Finance EmploymentCondition")).toBeInTheDocument();
  });
});
