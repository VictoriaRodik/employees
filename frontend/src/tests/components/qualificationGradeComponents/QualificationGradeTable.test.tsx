import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import QualificationGradeTable from "../../../components/qualificationGradeComponents/QualificationGradeTable";
import { QualificationGradeInterface } from "../../../types/qualificationGrade";

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

describe("QualificationGradeTable", () => {
  const mockQualificationGrades: QualificationGradeInterface[] = [
    { id: 1, grade: "IT QualificationGrade" },
    { id: 2, grade: "HR QualificationGrade" },
    { id: 3, grade: "Finance QualificationGrade" },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders qualificationGrades table", () => {
    render(
      <QualificationGradeTable
        qualificationGrades={mockQualificationGrades}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT QualificationGrade")).toBeInTheDocument();
    expect(screen.getByText("HR QualificationGrade")).toBeInTheDocument();
    expect(screen.getByText("Finance QualificationGrade")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <QualificationGradeTable
        qualificationGrades={mockQualificationGrades}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders action buttons for each qualificationGrade", () => {
    render(
      <QualificationGradeTable
        qualificationGrades={mockQualificationGrades}
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
      <QualificationGradeTable
        qualificationGrades={mockQualificationGrades}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockQualificationGrades[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <QualificationGradeTable
        qualificationGrades={mockQualificationGrades}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockQualificationGrades[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <QualificationGradeTable
        qualificationGrades={mockQualificationGrades}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockQualificationGrades[0].id);
  });

  it("renders empty table when no qualificationGrades", () => {
    render(
      <QualificationGradeTable
        qualificationGrades={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT QualificationGrade")).not.toBeInTheDocument();
  });

  it("displays qualificationGrade names correctly", () => {
    render(
      <QualificationGradeTable
        qualificationGrades={mockQualificationGrades}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT QualificationGrade")).toBeInTheDocument();
    expect(screen.getByText("HR QualificationGrade")).toBeInTheDocument();
    expect(screen.getByText("Finance QualificationGrade")).toBeInTheDocument();
  });
});
