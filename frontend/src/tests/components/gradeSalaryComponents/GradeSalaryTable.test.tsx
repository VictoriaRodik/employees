import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GradeSalaryTable from "../../../components/gradeSalaryComponents/GradeSalaryTable";
import { GradeSalaryInterface } from "../../../types/gradeSalary";

interface ActionButtonsProps {
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

vi.mock("../../../components/ActionButtons", () => ({
  default: ({ onEdit, onCopy, onDelete }: ActionButtonsProps) => (
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

describe("GradeSalaryTable", () => {
  const mockGradeSalaries: GradeSalaryInterface[] = [
    {
      id: 1, grade: "IT GradeSalary",
      gradeId: 0,
      baseSalary: 0,
      effectiveFrom: ""
    },
    {
      id: 2,
      grade: "HR GradeSalary",
      gradeId: 0,
      baseSalary: 0,
      effectiveFrom: ""
    },
    {
      id: 3,
      grade: "Finance GradeSalary",
      gradeId: 0,
      baseSalary: 0,
      effectiveFrom: ""
    },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders gradeSalarys table", () => {
    render(
      <GradeSalaryTable
        gradeSalaries={mockGradeSalaries}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT GradeSalary")).toBeInTheDocument();
    expect(screen.getByText("HR GradeSalary")).toBeInTheDocument();
    expect(screen.getByText("Finance GradeSalary")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <GradeSalaryTable
        gradeSalaries={mockGradeSalaries}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Назва відділу")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders action buttons for each gradeSalary", () => {
    render(
      <GradeSalaryTable
        gradeSalaries={mockGradeSalaries}
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
      <GradeSalaryTable
        gradeSalaries={mockGradeSalaries}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockGradeSalaries[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <GradeSalaryTable
        gradeSalaries={mockGradeSalaries}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockGradeSalaries[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <GradeSalaryTable
        gradeSalaries={mockGradeSalaries}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockGradeSalaries[0].id);
  });

  it("renders empty table when no gradeSalarys", () => {
    render(
      <GradeSalaryTable
        gradeSalaries={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Назва відділу")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT GradeSalary")).not.toBeInTheDocument();
  });

  it("displays gradeSalary IDs correctly", () => {
    render(
      <GradeSalaryTable
        gradeSalaries={mockGradeSalaries}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays gradeSalary names correctly", () => {
    render(
      <GradeSalaryTable
        gradeSalaries={mockGradeSalaries}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT GradeSalary")).toBeInTheDocument();
    expect(screen.getByText("HR GradeSalary")).toBeInTheDocument();
    expect(screen.getByText("Finance GradeSalary")).toBeInTheDocument();
  });
});
