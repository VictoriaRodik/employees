import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ReferenceSourceTable from "../../../components/referenceSourceComponents/ReferenceSourceTable";
import { ReferenceSourceInterface } from "../../../types/referenceSource";

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

describe("ReferenceSourceTable", () => {
  const mockReferenceSources: ReferenceSourceInterface[] = [
    { id: 1, tableName: "IT ReferenceSource" },
    { id: 2, tableName: "HR ReferenceSource" },
    { id: 3, tableName: "Finance ReferenceSource" },
  ];

  const mockOnEdit = vi.fn();
  const mockOnCopy = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders referenceSources table", () => {
    render(
      <ReferenceSourceTable
        referenceSources={mockReferenceSources}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT ReferenceSource")).toBeInTheDocument();
    expect(screen.getByText("HR ReferenceSource")).toBeInTheDocument();
    expect(screen.getByText("Finance ReferenceSource")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <ReferenceSourceTable
        referenceSources={mockReferenceSources}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
  });

  it("renders action buttons for each referenceSource", () => {
    render(
      <ReferenceSourceTable
        referenceSources={mockReferenceSources}
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
      <ReferenceSourceTable
        referenceSources={mockReferenceSources}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockReferenceSources[0]);
  });

  it("calls onCopy when copy button is clicked", () => {
    render(
      <ReferenceSourceTable
        referenceSources={mockReferenceSources}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const copyButtons = screen.getAllByTestId("copy-button");
    fireEvent.click(copyButtons[0]);

    expect(mockOnCopy).toHaveBeenCalledWith(mockReferenceSources[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <ReferenceSourceTable
        referenceSources={mockReferenceSources}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockReferenceSources[0].id);
  });

  it("renders empty table when no referenceSources", () => {
    render(
      <ReferenceSourceTable
        referenceSources={[]}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Назва")).toBeInTheDocument();
    expect(screen.getByText("Дії")).toBeInTheDocument();
    expect(screen.queryByText("IT ReferenceSource")).not.toBeInTheDocument();
  });

  it("displays referenceSource names correctly", () => {
    render(
      <ReferenceSourceTable
        referenceSources={mockReferenceSources}
        onEdit={mockOnEdit}
        onCopy={mockOnCopy}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("IT ReferenceSource")).toBeInTheDocument();
    expect(screen.getByText("HR ReferenceSource")).toBeInTheDocument();
    expect(screen.getByText("Finance ReferenceSource")).toBeInTheDocument();
  });
});
